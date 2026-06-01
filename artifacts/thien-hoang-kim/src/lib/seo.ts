import { getPageContent } from "@/data/pages.defaults";
import { SERVICE_CATEGORIES, getServiceItem } from "@/data/services-catalog";
import type { ArticleSeo, SiteArticle, SiteContent, SiteSeo } from "@/types/site-content";

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
  keywords: "",
  ogImage: "",
  ogTitle: "",
  ogDescription: "",
  robots: "index,follow",
};

function siteBaseUrl(): string {
  if (typeof window === "undefined") return "";
  return window.location.origin;
}

function toAbsoluteUrl(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withBase = base ? `${base}${normalized}` : normalized;
  return `${siteBaseUrl()}${withBase}`;
}

function pick(...values: (string | undefined)[]): string {
  for (const v of values) {
    if (v?.trim()) return v.trim();
  }
  return "";
}

function buildTitle(pageTitle: string, siteName: string): string {
  const name = siteName || "Thiên Hoàng Kim";
  if (!pageTitle) return name;
  if (pageTitle.includes(name)) return pageTitle;
  return `${pageTitle} | ${name}`;
}

function baseFromGlobal(global: SiteSeo, path: string): PageSeoMeta {
  const siteName = global.siteName || "Thiên Hoàng Kim Aesthetic Clinic";
  const title = global.title || siteName;
  const description = global.description || "";
  const ogTitle = pick(global.ogTitle, title);
  const ogDescription = pick(global.ogDescription, description);
  const ogImage = global.ogImage || "";
  const canonical = toAbsoluteUrl(path || "/");

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
    robots: global.robots || "index,follow",
    canonical,
  };
}

export function resolveArticleSeo(
  article: SiteArticle,
  global: SiteSeo,
  path: string,
): PageSeoMeta {
  const siteName = global.siteName || "Thiên Hoàng Kim Aesthetic Clinic";
  const seo = article.seo ?? DEFAULT_ARTICLE_SEO;
  const title = pick(seo.metaTitle) || buildTitle(article.title, siteName);
  const description = pick(seo.metaDescription, article.description, global.description);
  const keywords = pick(seo.keywords, global.keywords);
  const ogImage = pick(seo.ogImage, article.image, global.ogImage);
  const ogTitle = pick(seo.ogTitle, seo.metaTitle, article.title, global.ogTitle, title);
  const ogDescription = pick(seo.ogDescription, seo.metaDescription, article.description, global.ogDescription, description);
  const canonical = toAbsoluteUrl(path);

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
    robots: seo.robots || global.robots || "index,follow",
    canonical,
  };
}

export function resolveServiceSeo(
  opts: {
    serviceLabel: string;
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

  const siteName = opts.global.siteName || "Thiên Hoàng Kim Aesthetic Clinic";
  const title = buildTitle(`${opts.serviceLabel} — Dịch vụ thẩm mỹ`, siteName);
  const description = pick(opts.description, opts.global.description);
  const canonical = toAbsoluteUrl(opts.path);

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

export function resolveRouteSeo(path: string, content: SiteContent): PageSeoMeta {
  const global = content.settings.seo;
  const clean = path.split("#")[0] || "/";

  const articleMatch = clean.match(/^\/tin-tuc\/([^/]+)$/);
  if (articleMatch) {
    const article = content.articles.find((a) => a.slug === articleMatch[1] && a.published);
    if (article) return resolveArticleSeo(article, global, clean);
  }

  const thamMyMatch = clean.match(/^\/tham-my\/([^/]+)$/);
  if (thamMyMatch) {
    const service = getServiceItem("tham-my", thamMyMatch[1]);
    if (service) {
      const linked = service.articleSlug
        ? content.articles.find((a) => a.slug === service.articleSlug && a.published)
        : undefined;
      return resolveServiceSeo({
        serviceLabel: service.label,
        description: service.description || linked?.description || "",
        image: linked?.image || global.ogImage,
        path: clean,
        global,
        article: linked,
      });
    }
  }

  const spaMatch = clean.match(/^\/spa\/([^/]+)$/);
  if (spaMatch) {
    const service = getServiceItem("spa", spaMatch[1]);
    if (service) {
      const linked = service.articleSlug
        ? content.articles.find((a) => a.slug === service.articleSlug && a.published)
        : undefined;
      return resolveServiceSeo({
        serviceLabel: service.label,
        description: service.description || linked?.description || "",
        image: linked?.image || global.ogImage,
        path: clean,
        global,
        article: linked,
      });
    }
  }

  if (clean === "/tham-my") {
    const cat = SERVICE_CATEGORIES["tham-my"];
    const base = baseFromGlobal(global, clean);
    return {
      ...base,
      title: buildTitle(cat.title, global.siteName),
      description: pick(cat.description, global.description),
      ogTitle: buildTitle(cat.title, global.siteName),
      ogDescription: pick(cat.description, global.description),
    };
  }

  if (clean === "/spa") {
    const cat = SERVICE_CATEGORIES.spa;
    const base = baseFromGlobal(global, clean);
    return {
      ...base,
      title: buildTitle(cat.title, global.siteName),
      description: pick(cat.description, global.description),
      ogTitle: buildTitle(cat.title, global.siteName),
      ogDescription: pick(cat.description, global.description),
    };
  }

  const staticPage = getPageContent(clean);
  if (staticPage) {
    const base = baseFromGlobal(global, clean);
    return {
      ...base,
      title: buildTitle(staticPage.title, global.siteName),
      description: pick(staticPage.description, global.description),
      ogTitle: buildTitle(staticPage.title, global.siteName),
      ogDescription: pick(staticPage.description, global.description),
    };
  }

  if (clean === "/dich-vu") {
    const base = baseFromGlobal(global, clean);
    return {
      ...base,
      title: buildTitle("Dịch vụ thẩm mỹ", global.siteName),
      description: pick("Giải pháp thẩm mỹ y khoa và spa chăm sóc da chuyên sâu.", global.description),
    };
  }

  if (clean === "/tin-tuc" || clean === "/tin-tuc/kien-thuc" || clean === "/tin-tuc/tin-tuc") {
    const base = baseFromGlobal(global, clean);
    return {
      ...base,
      title: buildTitle("Tin tức & Kiến thức làm đẹp", global.siteName),
      description: pick("Cẩm nang làm đẹp, tin tức thẩm mỹ và spa từ Thiên Hoàng Kim.", global.description),
    };
  }

  if (clean === "/lien-he") {
    const base = baseFromGlobal(global, clean);
    return {
      ...base,
      title: buildTitle("Liên hệ & Đặt lịch", global.siteName),
    };
  }

  if (clean === "/khach-hang") {
    const base = baseFromGlobal(global, clean);
    return {
      ...base,
      title: buildTitle("Khách hàng thực tế", global.siteName),
    };
  }

  if (clean === "/bang-gia") {
    const base = baseFromGlobal(global, clean);
    return {
      ...base,
      title: buildTitle("Bảng giá tham khảo", global.siteName),
    };
  }

  if (clean === "/gioi-thieu/doi-ngu-bac-si") {
    const base = baseFromGlobal(global, clean);
    return {
      ...base,
      title: buildTitle("Đội ngũ bác sĩ", global.siteName),
    };
  }

  return baseFromGlobal(global, clean === "/" ? "/" : clean);
}

function setMetaName(name: string, content: string) {
  if (!content) return;
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaProperty(property: string, content: string) {
  if (!content) return;
  let el = document.querySelector(`meta[property="${property}"]`);
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

export function applyPageSeo(meta: PageSeoMeta) {
  document.title = meta.title;
  document.documentElement.lang = "vi";

  setMetaName("description", meta.description);
  setMetaName("keywords", meta.keywords);
  setMetaName("robots", meta.robots);

  setMetaProperty("og:title", meta.ogTitle);
  setMetaProperty("og:description", meta.ogDescription);
  setMetaProperty("og:image", meta.ogImage);
  setMetaProperty("og:url", meta.ogUrl);
  setMetaProperty("og:type", meta.ogType);
  setMetaProperty("og:locale", "vi_VN");

  setMetaName("twitter:card", meta.twitterCard);
  setMetaName("twitter:title", meta.ogTitle);
  setMetaName("twitter:description", meta.ogDescription);
  if (meta.ogImage) setMetaName("twitter:image", meta.ogImage);

  setCanonical(meta.canonical);
}

export function normalizeArticleSeo(partial?: Partial<ArticleSeo>): ArticleSeo {
  return {
    metaTitle: partial?.metaTitle?.trim() ?? "",
    metaDescription: partial?.metaDescription?.trim() ?? "",
    keywords: partial?.keywords?.trim() ?? "",
    ogImage: partial?.ogImage?.trim() ?? "",
    ogTitle: partial?.ogTitle?.trim() ?? "",
    ogDescription: partial?.ogDescription?.trim() ?? "",
    robots: partial?.robots?.trim() || "index,follow",
  };
}

export function normalizeSiteSeo(partial: Partial<SiteSeo> | undefined, base: SiteSeo): SiteSeo {
  return {
    siteName: partial?.siteName?.trim() || base.siteName,
    title: partial?.title?.trim() || base.title,
    description: partial?.description?.trim() || base.description,
    keywords: partial?.keywords?.trim() || base.keywords,
    ogImage: partial?.ogImage?.trim() || base.ogImage,
    ogTitle: partial?.ogTitle?.trim() ?? base.ogTitle ?? "",
    ogDescription: partial?.ogDescription?.trim() ?? base.ogDescription ?? "",
    twitterCard: partial?.twitterCard || base.twitterCard || "summary_large_image",
    robots: partial?.robots?.trim() || base.robots || "index,follow",
    locale: partial?.locale?.trim() || base.locale || "vi_VN",
  };
}
