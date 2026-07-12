import { getPageContent, getServiceCatalog, getServiceItem } from "@/lib/site-cms";
import { buildBreadcrumbs, buildJsonLdGraph, jsonLdScript, type SchemaContext } from "@/lib/seo-schema";
import { getSiteBaseUrl } from "@/lib/seo-sitemap";
import type { ArticleSeo, SiteArticle, SiteContent, SiteSeo } from "@/types/site-content";

export type { SchemaContext } from "@/lib/seo-schema";

export type PageSeoMeta = {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  twitterCard: string;
  robots: string;
  canonical: string;
};

export const SEO_TITLE_MAX = 60;
export const SEO_DESCRIPTION_MAX = 160;

export const DEFAULT_ARTICLE_SEO: ArticleSeo = {
  metaTitle: "",
  metaDescription: "",
  focusKeyphrase: "",
  keywords: "",
  canonicalUrl: "",
  ogImage: "",
  ogTitle: "",
  ogDescription: "",
  robots: "index,follow",
  noindex: false,
  nofollow: false,
};

export function buildRobotsDirective(seo: Pick<ArticleSeo, "noindex" | "nofollow" | "robots">, fallback: string) {
  if (seo.noindex && seo.nofollow) return "noindex,nofollow";
  if (seo.noindex) return "noindex,follow";
  if (seo.nofollow) return "index,nofollow";
  return seo.robots?.trim() || fallback || "index,follow";
}

function toAbsoluteUrl(path: string, siteUrl?: string): string {
  const origin = getSiteBaseUrl(siteUrl);
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withBase = basePath ? `${basePath}${normalized}` : normalized;
  return `${origin}${withBase}`;
}

function toAbsoluteAssetUrl(url: string, siteUrl?: string): string {
  if (!url?.trim()) return "";
  if (/^https?:\/\//i.test(url)) return url.trim();
  const origin = getSiteBaseUrl(siteUrl);
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${origin}${path}`;
}

function pick(...values: (string | undefined)[]): string {
  for (const v of values) {
    if (v?.trim()) return v.trim();
  }
  return "";
}

function buildTitle(pageTitle: string, siteName: string, separator = " | "): string {
  const name = siteName || "Halee Trâm";
  if (!pageTitle) return name;
  if (pageTitle.includes(name)) return pageTitle;
  return `${pageTitle}${separator}${name}`;
}

function baseFromGlobal(global: SiteSeo, path: string, robotsOverride?: string): PageSeoMeta {
  const siteName = global.siteName || "Halee Trâm — Nails & Lashes Studio";
  const title = global.title || siteName;
  const description = global.description || "";
  const ogTitle = pick(global.ogTitle, title);
  const ogDescription = pick(global.ogDescription, description);
  const ogImage = global.ogImage || "";
  const canonical = toAbsoluteUrl(path || "/", global.siteUrl);

  return {
    title,
    description,
    keywords: global.keywords || "",
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl: canonical,
    ogType: "website",
    twitterCard: global.twitterCard || "summary_large_image",
    robots: robotsOverride || global.robots || "index,follow",
    canonical,
  };
}

function notFoundMeta(global: SiteSeo, path: string): PageSeoMeta {
  const siteName = global.siteName || "Halee Trâm";
  const sep = global.titleSeparator || " | ";
  const base = baseFromGlobal(global, path, "noindex,nofollow");
  return {
    ...base,
    title: buildTitle("Không tìm thấy trang", siteName, sep),
    ogTitle: buildTitle("Không tìm thấy trang", siteName, sep),
    ogType: "website",
  };
}

export function isKnownPublicPath(path: string, content: SiteContent): boolean {
  const clean = path.split("#")[0].replace(/\/$/, "") || "/";

  if (
    clean === "/" ||
    clean === "/lien-he" ||
    clean === "/khach-hang" ||
    clean === "/dich-vu" ||
    clean === "/lam-dep" ||
    clean === "/dao-tao" ||
    clean === "/bang-gia" ||
    clean === "/tin-tuc" ||
    clean === "/tin-tuc/kien-thuc" ||
    clean === "/tin-tuc/tin-tuc" ||
    clean === "/gioi-thieu/doi-ngu-bac-si"
  ) {
    return true;
  }

  if (getPageContent(content, clean)) return true;

  const articleMatch = clean.match(/^\/tin-tuc\/([^/]+)$/);
  if (articleMatch) {
    return content.articles.some((a) => a.slug === articleMatch[1] && a.published);
  }

  const lamDepMatch = clean.match(/^\/lam-dep\/([^/]+)$/);
  if (lamDepMatch) return Boolean(getServiceItem(content, "lam-dep", lamDepMatch[1]));

  const daoTaoMatch = clean.match(/^\/dao-tao\/([^/]+)$/);
  if (daoTaoMatch) return Boolean(getServiceItem(content, "dao-tao", daoTaoMatch[1]));

  return false;
}

export function resolveArticleSeo(
  article: SiteArticle,
  global: SiteSeo,
  path: string,
): PageSeoMeta {
  const siteName = global.siteName || "Halee Trâm — Nails & Lashes Studio";
  const seo = article.seo ?? DEFAULT_ARTICLE_SEO;
  const sep = global.titleSeparator || " | ";
  const title = pick(seo.metaTitle) || buildTitle(article.title, siteName, sep);
  const description = pick(seo.metaDescription, article.description, global.description);
  const keywords = pick(seo.keywords, seo.focusKeyphrase, global.keywords);
  const ogImage = pick(seo.ogImage, article.image, global.ogImage);
  const ogTitle = pick(seo.ogTitle, seo.metaTitle, article.title, global.ogTitle, title);
  const ogDescription = pick(seo.ogDescription, seo.metaDescription, article.description, global.ogDescription, description);
  const canonical = seo.canonicalUrl?.trim()
    ? seo.canonicalUrl.startsWith("http")
      ? seo.canonicalUrl.trim()
      : toAbsoluteUrl(seo.canonicalUrl, global.siteUrl)
    : toAbsoluteUrl(path, global.siteUrl);

  return {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl: canonical,
    ogType: "article",
    twitterCard: global.twitterCard || "summary_large_image",
    robots: buildRobotsDirective(seo, global.robots || "index,follow"),
    canonical,
  };
}

export function resolveServiceSeo(
  opts: {
    serviceLabel: string;
    titleSuffix: string;
    description: string;
    image: string;
    path: string;
    global: SiteSeo;
    article?: SiteArticle;
  },
): PageSeoMeta {
  if (opts.article) {
    return resolveArticleSeo(opts.article, opts.global, opts.path);
  }

  const siteName = opts.global.siteName || "Halee Trâm — Nails & Lashes Studio";
  const title = buildTitle(`${opts.serviceLabel} — ${opts.titleSuffix}`, siteName, opts.global.titleSeparator);
  const description = pick(opts.description, opts.global.description);
  const canonical = toAbsoluteUrl(opts.path, opts.global.siteUrl);

  return {
    title,
    description,
    keywords: opts.global.keywords || "",
    ogTitle: title,
    ogDescription: description,
    ogImage: pick(opts.image, opts.global.ogImage),
    ogUrl: canonical,
    ogType: "website",
    twitterCard: opts.global.twitterCard || "summary_large_image",
    robots: opts.global.robots || "index,follow",
    canonical,
  };
}

function findArticleForPath(path: string, content: SiteContent): SiteArticle | undefined {
  const clean = path.split("#")[0] || "/";
  const articleMatch = clean.match(/^\/tin-tuc\/([^/]+)$/);
  if (articleMatch) {
    return content.articles.find((a) => a.slug === articleMatch[1] && a.published);
  }
  return undefined;
}

export function resolveRouteSeoContext(path: string, content: SiteContent): SchemaContext {
  const clean = path.split("#")[0] || "/";
  const meta = resolveRouteSeo(clean, content);
  const article = findArticleForPath(clean, content);
  const siteName = content.settings.seo.siteName || content.settings.clinicName;
  const breadcrumbs = buildBreadcrumbs(clean, siteName, content.settings.seo.siteUrl, article, content);
  return { path: clean, meta, breadcrumbs, article };
}

export function resolveRouteSeo(path: string, content: SiteContent): PageSeoMeta {
  const global = content.settings.seo;
  const sep = global.titleSeparator || " | ";
  const clean = path.split("#")[0] || "/";

  const articleMatch = clean.match(/^\/tin-tuc\/([^/]+)$/);
  if (articleMatch) {
    const article = content.articles.find((a) => a.slug === articleMatch[1] && a.published);
    if (article) return resolveArticleSeo(article, global, clean);
    return notFoundMeta(global, clean);
  }

  const lamDepMatch = clean.match(/^\/lam-dep\/([^/]+)$/);
  if (lamDepMatch) {
    const service = getServiceItem(content, "lam-dep", lamDepMatch[1]);
    if (service) {
      const linked = service.articleSlug
        ? content.articles.find((a) => a.slug === service.articleSlug && a.published)
        : undefined;
      return resolveServiceSeo({
        serviceLabel: service.label,
        titleSuffix: "Dịch vụ làm đẹp Quận 7",
        description: service.description || linked?.description || "",
        image: linked?.image || global.ogImage,
        path: clean,
        global,
        article: linked,
      });
    }
    return notFoundMeta(global, clean);
  }

  const daoTaoMatch = clean.match(/^\/dao-tao\/([^/]+)$/);
  if (daoTaoMatch) {
    const service = getServiceItem(content, "dao-tao", daoTaoMatch[1]);
    if (service) {
      const linked = service.articleSlug
        ? content.articles.find((a) => a.slug === service.articleSlug && a.published)
        : undefined;
      return resolveServiceSeo({
        serviceLabel: service.label,
        titleSuffix: "Khóa học nghề làm đẹp TP.HCM",
        description: service.description || linked?.description || "",
        image: linked?.image || global.ogImage,
        path: clean,
        global,
        article: linked,
      });
    }
    return notFoundMeta(global, clean);
  }

  if (clean === "/lam-dep") {
    const cat = getServiceCatalog(content).categories["lam-dep"];
    const base = baseFromGlobal(global, clean);
    return {
      ...base,
      title: buildTitle(cat.title, global.siteName, sep),
      description: pick(cat.description, global.description),
      ogTitle: buildTitle(cat.title, global.siteName, sep),
      ogDescription: pick(cat.description, global.description),
    };
  }

  if (clean === "/dao-tao") {
    const cat = getServiceCatalog(content).categories["dao-tao"];
    const base = baseFromGlobal(global, clean);
    return {
      ...base,
      title: buildTitle(cat.title, global.siteName, sep),
      description: pick(cat.description, global.description),
      ogTitle: buildTitle(cat.title, global.siteName, sep),
      ogDescription: pick(cat.description, global.description),
    };
  }

  const staticPage = getPageContent(content, clean);
  if (staticPage) {
    const base = baseFromGlobal(global, clean);
    return {
      ...base,
      title: buildTitle(staticPage.title, global.siteName, sep),
      description: pick(staticPage.description, global.description),
      ogTitle: buildTitle(staticPage.title, global.siteName, sep),
      ogDescription: pick(staticPage.description, global.description),
    };
  }

  if (clean === "/dich-vu") {
    const base = baseFromGlobal(global, clean);
    return {
      ...base,
      title: buildTitle("Dịch vụ & Đào tạo làm đẹp", global.siteName, sep),
      description: pick(
        "Nails, nối mi, uốn mi, định hình chân mày, spa chân, gội đầu và khóa học nghề tại Halee Trâm Quận 7.",
        global.description,
      ),
      keywords: pick(
        "dịch vụ nails Quận 7, nối mi Quận 7, học nail TP.HCM, khóa nối mi salon",
        global.keywords,
      ),
    };
  }

  if (clean === "/tin-tuc" || clean === "/tin-tuc/kien-thuc" || clean === "/tin-tuc/tin-tuc") {
    const base = baseFromGlobal(global, clean);
    return {
      ...base,
      title: buildTitle("Tin tức & Kiến thức làm đẹp", global.siteName, sep),
      description: pick("Cẩm nang nails, mi và mẹo chăm sóc từ Halee Trâm.", global.description),
    };
  }

  if (clean === "/lien-he") {
    const base = baseFromGlobal(global, clean);
    return {
      ...base,
      title: buildTitle("Liên hệ & Đặt lịch", global.siteName, sep),
      description: pick(
        "Liên hệ Halee Trâm — 793/62 Trần Xuân Soạn, Quận 7. Hotline 0938 162 662. Đặt lịch nails, nối mi hoặc tư vấn khóa học.",
        global.description,
      ),
    };
  }

  if (clean === "/khach-hang") {
    const base = baseFromGlobal(global, clean);
    return {
      ...base,
      title: buildTitle("Thư viện ảnh khách hàng", global.siteName, sep),
      description: pick(
        "Hình ảnh nails, nối mi và kết quả đào tạo thực tế tại Halee Trâm Eyelash / Nail / Academy Quận 7.",
        global.description,
      ),
    };
  }

  if (clean === "/bang-gia") {
    const base = baseFromGlobal(global, clean);
    const pl = content.priceList;
    return {
      ...base,
      title: buildTitle(pl.title || "Bảng giá tham khảo", global.siteName, sep),
      description: pl.description || base.description,
    };
  }

  if (clean === "/gioi-thieu/doi-ngu-bac-si") {
    const base = baseFromGlobal(global, clean);
    return {
      ...base,
      title: buildTitle("Đội ngũ bác sĩ", global.siteName, sep),
    };
  }

  if (!isKnownPublicPath(clean, content)) {
    return notFoundMeta(global, clean);
  }

  return baseFromGlobal(global, clean === "/" ? "/" : clean);
}

function setMetaName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!content) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!content) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  if (!href) return;
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const JSON_LD_ID = "thk-json-ld";

function setJsonLd(json: string) {
  let el = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
  if (!json) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.id = JSON_LD_ID;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = json;
}

export function applyPageSeo(ctx: SchemaContext, content: SiteContent) {
  const { meta } = ctx;
  const global = content.settings.seo;
  const ogImage = toAbsoluteAssetUrl(meta.ogImage, global.siteUrl);
  let articlePublished = "";

  document.title = meta.title;
  document.documentElement.lang = global.locale?.slice(0, 2) || "vi";

  setMetaName("description", meta.description);
  setMetaName("keywords", meta.keywords);
  setMetaName("robots", meta.robots);
  setMetaName("author", global.siteName);

  setMetaProperty("og:site_name", global.siteName);
  setMetaProperty("og:title", meta.ogTitle);
  setMetaProperty("og:description", meta.ogDescription);
  setMetaProperty("og:image", ogImage);
  if (ogImage) setMetaProperty("og:image:alt", meta.ogTitle || meta.title);
  setMetaProperty("og:image:secure_url", ogImage.startsWith("https://") ? ogImage : "");
  setMetaProperty("og:url", meta.ogUrl);
  setMetaProperty("og:type", meta.ogType);
  setMetaProperty("og:locale", global.locale || "vi_VN");

  if (meta.ogType === "article" && ctx.article) {
    const published = ctx.article.date.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (published) {
      const [, d, mo, y] = published;
      articlePublished = `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }
  }
  setMetaProperty("article:published_time", articlePublished);
  setMetaProperty("article:modified_time", articlePublished);
  setMetaProperty("article:section", meta.ogType === "article" ? ctx.article?.category || "" : "");
  setMetaProperty("article:author", meta.ogType === "article" ? content.settings.clinicName : "");

  setMetaProperty("fb:app_id", global.facebookAppId);

  setMetaName("twitter:card", meta.twitterCard);
  setMetaName("twitter:title", meta.ogTitle);
  setMetaName("twitter:description", meta.ogDescription);
  setMetaName("twitter:image", ogImage);
  setMetaName("twitter:image:alt", ogImage ? meta.ogTitle || meta.title : "");

  setCanonical(meta.canonical);

  if (global.googleSiteVerification) {
    setMetaName("google-site-verification", global.googleSiteVerification);
  }
  if (global.bingSiteVerification) {
    setMetaName("msvalidate.01", global.bingSiteVerification);
  }

  const graphs = buildJsonLdGraph(ctx, content);
  setJsonLd(jsonLdScript(graphs));
}

export function normalizeArticleSeo(partial?: Partial<ArticleSeo>): ArticleSeo {
  return {
    metaTitle: partial?.metaTitle?.trim() ?? "",
    metaDescription: partial?.metaDescription?.trim() ?? "",
    focusKeyphrase: partial?.focusKeyphrase?.trim() ?? "",
    keywords: partial?.keywords?.trim() ?? "",
    canonicalUrl: partial?.canonicalUrl?.trim() ?? "",
    ogImage: partial?.ogImage?.trim() ?? "",
    ogTitle: partial?.ogTitle?.trim() ?? "",
    ogDescription: partial?.ogDescription?.trim() ?? "",
    robots: partial?.robots?.trim() || "index,follow",
    noindex: partial?.noindex ?? false,
    nofollow: partial?.nofollow ?? false,
  };
}

export function normalizeSiteSeo(partial: Partial<SiteSeo> | undefined, base: SiteSeo): SiteSeo {
  return {
    siteName: partial?.siteName?.trim() || base.siteName,
    siteUrl: partial?.siteUrl?.trim() || base.siteUrl,
    title: partial?.title?.trim() || base.title,
    description: partial?.description?.trim() || base.description,
    keywords: partial?.keywords?.trim() || base.keywords,
    titleSeparator: partial?.titleSeparator?.trim() || base.titleSeparator || " | ",
    ogImage: partial?.ogImage?.trim() || base.ogImage,
    ogTitle: partial?.ogTitle?.trim() ?? base.ogTitle ?? "",
    ogDescription: partial?.ogDescription?.trim() ?? base.ogDescription ?? "",
    twitterCard: partial?.twitterCard || base.twitterCard || "summary_large_image",
    robots: partial?.robots?.trim() || base.robots || "index,follow",
    locale: partial?.locale?.trim() || base.locale || "vi_VN",
    googleSiteVerification: partial?.googleSiteVerification?.trim() ?? base.googleSiteVerification ?? "",
    bingSiteVerification: partial?.bingSiteVerification?.trim() ?? base.bingSiteVerification ?? "",
    facebookAppId: partial?.facebookAppId?.trim() ?? base.facebookAppId ?? "",
    schemaEnabled: partial?.schemaEnabled ?? base.schemaEnabled ?? true,
    breadcrumbsEnabled: partial?.breadcrumbsEnabled ?? base.breadcrumbsEnabled ?? true,
    organizationType: partial?.organizationType?.trim() || base.organizationType || "BeautySalon",
    organizationLogo: partial?.organizationLogo?.trim() || base.organizationLogo || base.ogImage,
    priceRange: partial?.priceRange?.trim() || base.priceRange || "$$",
    robotsTxtExtra: partial?.robotsTxtExtra?.trim() ?? base.robotsTxtExtra ?? "",
  };
}
