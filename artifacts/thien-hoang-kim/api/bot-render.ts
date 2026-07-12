import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchCmsPayload } from "../server/lib/cms-payload-server";
import { buildJsonLdForPayload } from "../server/lib/seo-schema-server";
import { injectMetaIntoHtml, resolveRouteSeoForPayload } from "../server/lib/seo-render-server";
import { getServerSiteUrl } from "../server/lib/seo-sitemap-server";

function getRequestOrigin(req: VercelRequest): string {
  const proto = (req.headers["x-forwarded-proto"] as string) || "https";
  const host = (req.headers["x-forwarded-host"] as string) || (req.headers.host as string);
  return `${proto}://${host}`;
}

async function fetchIndexHtml(origin: string): Promise<string> {
  const res = await fetch(`${origin}/index.html`, {
    headers: { "User-Agent": "THK-BotRender/1.0" },
  });
  if (!res.ok) throw new Error(`index.html fetch failed: ${res.status}`);
  return res.text();
}

function parseViDateIso(dateStr: string): string | undefined {
  const m = dateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!m) return undefined;
  const [, d, mo, y] = m;
  return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const rawPath = typeof req.query.path === "string" ? req.query.path : "/";
    const path = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;

    if (path.startsWith("/adminbp")) {
      res.status(404).send("Not found");
      return;
    }

    const origin = getRequestOrigin(req);
    let baseUrl = getServerSiteUrl();
    const payload = await fetchCmsPayload();
    const cmsUrl = payload?.settings?.seo?.siteUrl?.trim();
    if (cmsUrl) baseUrl = cmsUrl.replace(/\/$/, "");

    const seoSettings = payload?.settings?.seo;
    const meta = resolveRouteSeoForPayload(path, payload, baseUrl);
    const articleMatch = path.match(/^\/tin-tuc\/([^/]+)$/);
    const article = articleMatch
      ? payload?.articles?.find((item) => item.slug === articleMatch[1] && item.published)
      : undefined;

    const enriched = {
      ...meta,
      googleSiteVerification: seoSettings?.googleSiteVerification,
      bingSiteVerification: seoSettings?.bingSiteVerification,
      facebookAppId: seoSettings?.facebookAppId,
      ogImageAlt: meta.ogImage ? meta.siteName : undefined,
      articlePublished: article?.date ? parseViDateIso(article.date) : undefined,
      articleSection: article?.category,
      jsonLd: buildJsonLdForPayload(path, meta, payload, baseUrl),
    };

    const html = injectMetaIntoHtml(await fetchIndexHtml(origin), enriched);

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
    res.setHeader("Vary", "User-Agent");
    res.status(200).send(html);
  } catch (err) {
    res.status(500).send(`Bot render error: ${String(err)}`);
  }
}
