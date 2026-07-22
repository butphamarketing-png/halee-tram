/** Server-side sitemap/robots builders (no client imports). */

export type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

type CmsArticle = {
  slug?: string;
  published?: boolean;
  title?: string;
  description?: string;
  body?: string;
  category?: string;
  date?: string;
  image?: string;
  seo?: {
    noindex?: boolean;
    metaTitle?: string;
    metaDescription?: string;
    focusKeyphrase?: string;
    keywords?: string;
  };
};

/** Fallback when CMS unavailable — keeps sitemap & bot-render useful. */
const DEFAULT_SERVICE_PATHS = [
  "/lam-dep/nails",
  "/lam-dep/noi-mi",
  "/lam-dep/uon-mi",
  "/lam-dep/dinh-hinh-chan-may",
  "/lam-dep/cha-got-chan",
  "/lam-dep/goi-dau",
  "/dao-tao/khoa-noi-mi-salon",
  "/dao-tao/khoa-noi-mi-dinh-cu",
  "/dao-tao/khoa-nail-chuyen-nghiep",
  "/dao-tao/khoa-cham-soc-mong",
  "/dao-tao/khoa-dinh-hinh-chan-may",
  "/dao-tao/khoa-hoc-uon-mi",
];

/** Synced by generate-100-local-q7.mjs — originals + batch 100 + batch 200 */
import { DEFAULT_ARTICLE_SLUGS } from "./article-slugs-fallback";

type CmsServiceItem = {
  slug?: string;
  label?: string;
  description?: string;
  articleSlug?: string;
  seo?: {
    noindex?: boolean;
  };
};

export type CmsPayload = {
  articles?: CmsArticle[];
  pages?: Record<string, { title?: string; description?: string }>;
  home?: unknown;
  navigation?: unknown;
  footer?: unknown;
  priceList?: { title?: string; description?: string };
  customers?: unknown;
  testimonials?: unknown[];
  serviceCatalog?: {
    categories?: Record<string, { path?: string; title?: string; description?: string }>;
    items?: Record<string, CmsServiceItem[]>;
  };
  settings?: {
    clinicName?: string;
    phone?: string;
    email?: string;
    address?: string;
    seo?: {
      siteUrl?: string;
      robotsTxtExtra?: string;
      llmsTxtEnabled?: boolean;
      siteName?: string;
      description?: string;
      googleSiteVerification?: string;
      bingSiteVerification?: string;
      facebookAppId?: string;
      ogImage?: string;
      ogTitle?: string;
      ogDescription?: string;
      keywords?: string;
      title?: string;
      titleSeparator?: string;
      twitterCard?: string;
      robots?: string;
      locale?: string;
      schemaEnabled?: boolean;
      breadcrumbsEnabled?: boolean;
      organizationLogo?: string;
      organizationType?: string;
      priceRange?: string;
    };
  };
};

function parseArticleLastmod(dateStr?: string): string | undefined {
  if (!dateStr) return undefined;
  const m = dateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!m) return undefined;
  const [, d, mo, y] = m;
  return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

function sectionChanged(before: unknown, after: unknown): boolean {
  return JSON.stringify(before) !== JSON.stringify(after);
}

function toAbsoluteLoc(baseUrl: string, path: string): string {
  const base = baseUrl.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

const STATIC_SUBPAGES = [
  "/gioi-thieu/cau-chuyen-thuong-hieu",
  "/gioi-thieu/co-so-vat-chat",
  "/tin-tuc/kien-thuc",
  "/tin-tuc/tin-tuc",
];

export function getServerSiteUrl(): string {
  return (
    process.env.SITE_URL?.replace(/\/$/, "") ||
    process.env.VITE_SITE_URL?.replace(/\/$/, "") ||
    "https://www.haleetram.com"
  );
}

export function collectSitemapEntriesFromPayload(payload: CmsPayload | null | undefined, baseUrl: string): SitemapEntry[] {
  const base = baseUrl.replace(/\/$/, "");
  const today = new Date().toISOString().slice(0, 10);
  const entries: SitemapEntry[] = [];

  const add = (
    path: string,
    priority: number,
    changefreq: SitemapEntry["changefreq"] = "weekly",
    lastmod = today,
  ) => {
    entries.push({
      loc: `${base}${path.startsWith("/") ? path : `/${path}`}`,
      lastmod,
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
  add("/gioi-thieu/doi-ngu-bac-si", 0.75);

  for (const path of STATIC_SUBPAGES) {
    add(path, 0.75);
  }

  const catalog = payload?.serviceCatalog;
  let addedServices = 0;
  if (catalog?.categories && catalog?.items) {
    for (const id of ["lam-dep", "dao-tao"]) {
      const prefix = catalog.categories[id]?.path;
      const items = catalog.items[id];
      if (!prefix || !items) continue;
      for (const item of items) {
        if (!item.slug) continue;
        if (item.seo?.noindex) continue;
        add(`${prefix}/${item.slug}`, 0.8);
        addedServices += 1;
      }
    }
  }
  if (addedServices === 0) {
    for (const path of DEFAULT_SERVICE_PATHS) add(path, 0.8);
  }

  let addedArticles = 0;
  for (const article of payload?.articles ?? []) {
    if (!article.published || !article.slug) continue;
    if (article.seo?.noindex) continue;
    add(`/tin-tuc/${article.slug}`, 0.7, "monthly", parseArticleLastmod(article.date) || today);
    addedArticles += 1;
  }
  if (addedArticles === 0) {
    for (const slug of DEFAULT_ARTICLE_SLUGS) {
      add(`/tin-tuc/${slug}`, 0.7, "monthly");
    }
  }

  const seen = new Set<string>();
  return entries.filter((e) => {
    if (seen.has(e.loc)) return false;
    seen.add(e.loc);
    return true;
  });
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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

export function collectChangedUrls(
  oldPayload: CmsPayload | null | undefined,
  newPayload: CmsPayload,
  baseUrl: string,
): string[] {
  if (!oldPayload) {
    return collectSitemapEntriesFromPayload(newPayload, baseUrl).map((entry) => entry.loc);
  }

  const urls = new Set<string>();
  const add = (path: string) => urls.add(toAbsoluteLoc(baseUrl, path));

  if (sectionChanged(oldPayload.settings, newPayload.settings)) add("/");
  if (sectionChanged(oldPayload.home, newPayload.home)) add("/");
  if (sectionChanged(oldPayload.navigation, newPayload.navigation)) add("/");
  if (sectionChanged(oldPayload.footer, newPayload.footer)) add("/");
  if (sectionChanged(oldPayload.priceList, newPayload.priceList)) add("/bang-gia");
  if (sectionChanged(oldPayload.customers, newPayload.customers)) add("/khach-hang");
  if (sectionChanged(oldPayload.testimonials, newPayload.testimonials)) add("/");

  const oldPages = oldPayload.pages ?? {};
  const newPages = newPayload.pages ?? {};
  for (const path of new Set([...Object.keys(oldPages), ...Object.keys(newPages)])) {
    if (sectionChanged(oldPages[path], newPages[path])) add(path);
  }

  const oldArticles = new Map((oldPayload.articles ?? []).map((article) => [article.slug, article]));
  for (const article of newPayload.articles ?? []) {
    if (!article.slug || !article.published || article.seo?.noindex) continue;
    const previous = oldArticles.get(article.slug);
    if (!previous || sectionChanged(previous, article)) add(`/tin-tuc/${article.slug}`);
  }

  for (const categoryId of ["lam-dep", "dao-tao"]) {
    const prefix = newPayload.serviceCatalog?.categories?.[categoryId]?.path ?? `/${categoryId}`;
    const oldItems = oldPayload.serviceCatalog?.items?.[categoryId] ?? [];
    const newItems = newPayload.serviceCatalog?.items?.[categoryId] ?? [];
    const oldMap = new Map(oldItems.map((item) => [item.slug, item]));

    if (
      sectionChanged(
        oldPayload.serviceCatalog?.categories?.[categoryId],
        newPayload.serviceCatalog?.categories?.[categoryId],
      )
    ) {
      add(prefix);
    }

    for (const item of newItems) {
      if (!item.slug) continue;
      const previous = oldMap.get(item.slug);
      if (!previous || sectionChanged(previous, item)) add(`${prefix}/${item.slug}`);
    }
  }

  if (urls.size === 0) add("/");

  return [...urls].slice(0, 100);
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
