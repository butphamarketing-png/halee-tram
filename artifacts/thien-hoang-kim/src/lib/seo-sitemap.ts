import { getServiceCatalog, listEditableStaticPagePaths } from "@/lib/site-cms";
import type { SiteContent } from "@/types/site-content";

export type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

export function getSiteBaseUrl(override?: string): string {
  const fromEnv = override?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const viteSiteUrl = import.meta.env.VITE_SITE_URL as string | undefined;
  if (viteSiteUrl?.trim()) return viteSiteUrl.trim().replace(/\/$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "https://www.haleetram.com";
}

export function collectSitemapEntries(content: SiteContent, baseUrl: string): SitemapEntry[] {
  const base = baseUrl.replace(/\/$/, "");
  const today = new Date().toISOString().slice(0, 10);
  const entries: SitemapEntry[] = [];

  const add = (path: string, priority: number, changefreq: SitemapEntry["changefreq"] = "weekly") => {
    entries.push({
      loc: `${base}${path.startsWith("/") ? path : `/${path}`}`,
      lastmod: today,
      changefreq,
      priority,
    });
  };

  add("/", 1, "daily");
  add("/gioi-thieu", 0.9);
  add("/dich-vu", 0.9);
  add("/lam-dep", 0.9);
  add("/dao-tao", 0.9);
  add("/khach-hang", 0.8);
  add("/bang-gia", 0.8);
  add("/tin-tuc", 0.85);
  add("/lien-he", 0.85);

  for (const path of listEditableStaticPagePaths()) {
    if (path !== "/gioi-thieu") add(path, 0.75);
  }

  add("/gioi-thieu/doi-ngu-bac-si", 0.75);

  const catalog = getServiceCatalog(content);
  for (const id of ["lam-dep", "dao-tao"] as const) {
    const prefix = catalog.categories[id].path;
    for (const item of catalog.items[id]) {
      if (item.seo?.noindex) continue;
      add(`${prefix}/${item.slug}`, 0.8);
    }
  }

  for (const article of content.articles) {
    if (!article.published) continue;
    if (article.seo?.noindex) continue;
    const lastmod = (() => {
      const m = article.date?.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
      if (!m) return today;
      const [, d, mo, y] = m;
      return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
    })();
    entries.push({
      loc: `${base}/tin-tuc/${article.slug}`,
      lastmod,
      changefreq: "monthly",
      priority: 0.7,
    });
  }

  const seen = new Set<string>();
  return entries.filter((e) => {
    if (seen.has(e.loc)) return false;
    seen.add(e.loc);
    return true;
  });
}

export function buildSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map((e) => {
      const parts = [
        "  <url>",
        `    <loc>${escapeXml(e.loc)}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : "",
        e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : "",
        e.priority != null ? `    <priority>${e.priority.toFixed(1)}</priority>` : "",
        "  </url>",
      ].filter(Boolean);
      return parts.join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function buildRobotsTxt(baseUrl: string, extra = ""): string {
  const sitemap = `${baseUrl.replace(/\/$/, "")}/sitemap.xml`;
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /adminbp",
    "Disallow: /adminbp/",
    "",
    `Sitemap: ${sitemap}`,
    extra.trim() ? `\n${extra.trim()}` : "",
    "",
  ].join("\n");
}
