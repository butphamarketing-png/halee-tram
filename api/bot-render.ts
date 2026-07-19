import type { ApiRequest, ApiResponse } from "./_lib/http";
import { fetchCmsPayload } from "../server/lib/cms-payload-server";
import { buildJsonLdForPayload } from "../server/lib/seo-schema-server";
import { injectMetaIntoHtml, resolveRouteSeoForPayload } from "../server/lib/seo-render-server";
import { getServerSiteUrl } from "../server/lib/seo-sitemap-server";

function getRequestOrigin(req: ApiRequest): string {
  const proto = String(req.headers["x-forwarded-proto"] || "https");
  const host = String(req.headers["x-forwarded-host"] || req.headers.host || "www.haleetram.com");
  return `${proto}://${host}`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Minimal shell if fetching the built SPA index fails — crawlers still get title/meta/body. */
function fallbackShell(meta: { title: string; description: string; bodyHtml?: string }) {
  const body = meta.bodyHtml || `<p>${escapeHtml(meta.description)}</p>`;
  return `<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(meta.description)}" />
  </head>
  <body>
    <div id="root"></div>
    <main id="thk-ssr-content">
      <h1>${escapeHtml(meta.title)}</h1>
      ${body}
    </main>
  </body>
</html>`;
}

async function fetchIndexHtml(origin: string): Promise<string | null> {
  // Must NOT use a UA containing "bot" — old THK-BotRender matched middleware and looped to 500.
  const headers = {
    "User-Agent": "THK-SSR/1.0",
    "X-THK-Internal": "1",
  };

  for (const path of ["/", "/index.html"]) {
    try {
      const res = await fetch(`${origin}${path}`, { headers });
      if (!res.ok) continue;
      const html = await res.text();
      if (html.includes("</head>") && html.includes("<html")) return html;
    } catch {
      /* try next */
    }
  }
  return null;
}

function parseViDateIso(dateStr: string): string | undefined {
  const m = dateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!m) return undefined;
  const [, d, mo, y] = m;
  return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

function articleBodyHtml(body?: string, description?: string): string {
  if (body?.trim()) {
    const paragraphs = body
      .trim()
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => `<p>${escapeHtml(p).replace(/\n/g, "<br/>")}</p>`)
      .join("\n");
    return paragraphs || `<p>${escapeHtml(description || "")}</p>`;
  }
  return `<p>${escapeHtml(description || "")}</p>`;
}

function injectCrawlableBody(html: string, title: string, bodyHtml: string): string {
  const block = `<main id="thk-ssr-content"><h1>${escapeHtml(title)}</h1>${bodyHtml}</main>`;
  if (/id="thk-ssr-content"/i.test(html)) {
    return html.replace(/<main[^>]*id="thk-ssr-content"[^>]*>[\s\S]*?<\/main>/i, block);
  }
  if (/<div id="root"><\/div>/i.test(html)) {
    return html.replace(/<div id="root"><\/div>/i, `<div id="root"></div>\n    ${block}`);
  }
  if (/<\/body>/i.test(html)) {
    return html.replace(/<\/body>/i, `    ${block}\n  </body>`);
  }
  return `${html}\n${block}`;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  try {
    const rawPath = typeof req.query?.path === "string" ? req.query.path : "/";
    const path = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;

    if (path.startsWith("/adminbp")) {
      res.status(404).send("Not found");
      return;
    }

    const origin = getRequestOrigin(req);
    let baseUrl = getServerSiteUrl();
    let payload = null;

    try {
      payload = await fetchCmsPayload();
      const cmsUrl = payload?.settings?.seo?.siteUrl?.trim();
      if (cmsUrl) baseUrl = cmsUrl.replace(/\/$/, "");
    } catch {
      payload = null;
    }

    const seoSettings = payload?.settings?.seo as
      | {
          googleSiteVerification?: string;
          bingSiteVerification?: string;
          facebookAppId?: string;
          siteUrl?: string;
        }
      | undefined;
    const meta = resolveRouteSeoForPayload(path, payload as never, baseUrl);
    const articleMatch = path.match(/^\/tin-tuc\/([^/]+)$/);
    const article = articleMatch
      ? payload?.articles?.find((item) => item.slug === articleMatch[1] && item.published)
      : undefined;

    const bodyHtml = articleBodyHtml(
      typeof article?.body === "string" ? article.body : undefined,
      meta.description,
    );

    const enriched = {
      ...meta,
      googleSiteVerification: seoSettings?.googleSiteVerification,
      bingSiteVerification: seoSettings?.bingSiteVerification,
      facebookAppId: seoSettings?.facebookAppId,
      ogImageAlt: meta.ogImage ? meta.siteName : undefined,
      articlePublished: article?.date ? parseViDateIso(article.date) : undefined,
      articleSection: article?.category,
      jsonLd: buildJsonLdForPayload(path, meta, payload as never, baseUrl),
    };

    let html = await fetchIndexHtml(origin);
    if (!html) {
      html = fallbackShell({ title: enriched.title, description: enriched.description, bodyHtml });
    }

    html = injectMetaIntoHtml(html, enriched);
    html = injectCrawlableBody(html, enriched.title.replace(/\s*\|\s*Halee Trâm.*$/i, "").trim() || enriched.title, bodyHtml);

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
    res.setHeader("Vary", "User-Agent");
    res.setHeader("X-THK-Bot-Render", "1");
    res.status(200).send(html);
  } catch (err) {
    // Last resort: still 200 with minimal HTML so crawlers are never stuck on 500.
    const message = err instanceof Error ? err.message : String(err);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("X-THK-Bot-Render-Error", message.slice(0, 120));
    res.status(200).send(
      fallbackShell({
        title: "Halee Trâm | Nails, Nối Mi & Đào Tạo",
        description:
          "Halee Trâm Eyelash / Nail / Academy tại Quận 7 — nails, nối mi, uốn mi và khóa đào tạo nghề. Hotline 0938 162 662.",
      }),
    );
  }
}
