/** Server-side route SEO + HTML meta injection for social/search crawlers. */

import { getServerSiteUrl } from "./seo-sitemap-server";
import type { CmsPayload } from "./seo-sitemap-server";

export type RenderedPageSeo = {
  title: string;
  description: string;
  keywords: string;
  robots: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageAlt?: string;
  ogUrl: string;
  ogType: string;
  twitterCard: string;
  siteName: string;
  locale: string;
  googleSiteVerification?: string;
  bingSiteVerification?: string;
  facebookAppId?: string;
  articlePublished?: string;
  articleSection?: string;
  jsonLd?: string;
};

type CmsSeo = {
  siteName?: string;
  siteUrl?: string;
  title?: string;
  description?: string;
  keywords?: string;
  titleSeparator?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: string;
  robots?: string;
  locale?: string;
};

type CmsArticleSeo = {
  noindex?: boolean;
  nofollow?: boolean;
  robots?: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyphrase?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
};

type CmsArticle = {
  slug?: string;
  published?: boolean;
  title?: string;
  description?: string;
  body?: string;
  category?: string;
  image?: string;
  date?: string;
  seo?: CmsArticleSeo;
};

type CmsServiceItem = {
  slug?: string;
  label?: string;
  description?: string;
  articleSlug?: string;
  seo?: CmsArticleSeo;
};

const FALLBACK_SERVICES: Record<string, Record<string, CmsServiceItem>> = {
  "lam-dep": {
    nails: { slug: "nails", label: "Nails", description: "Làm móng, sơn gel, thiết kế nail art theo xu hướng tại Halee Trâm Quận 7." },
    "noi-mi": { slug: "noi-mi", label: "Nối Mi", description: "Nối mi classic, volume, hybrid — tự nhiên, bền và đẹp tại Quận 7." },
    "uon-mi": { slug: "uon-mi", label: "Uốn Mi", description: "Uốn mi (lash lift) tự nhiên, giữ cong lâu tại Halee Trâm Quận 7." },
    "dinh-hinh-chan-may": {
      slug: "dinh-hinh-chan-may",
      label: "Định Hình Chân Mày",
      description: "Tạo dáng, tô viền và định hình chân mày hài hòa khuôn mặt.",
    },
    "cha-got-chan": { slug: "cha-got-chan", label: "Chà Gót Chân", description: "Chà gót, dưỡng da chân mềm mịn và thư giãn tại Quận 7." },
    "goi-dau": { slug: "goi-dau", label: "Gội Đầu", description: "Gội đầu thư giãn, massage da đầu tại Halee Trâm Quận 7." },
  },
  "dao-tao": {
    "khoa-noi-mi-salon": {
      slug: "khoa-noi-mi-salon",
      label: "Khóa Nối Mi Salon",
      description: "Đào tạo nối mi chuyên nghiệp cho môi trường salon tại TP.HCM.",
    },
    "khoa-noi-mi-dinh-cu": {
      slug: "khoa-noi-mi-dinh-cu",
      label: "Khóa Nối Mi Định Cư",
      description: "Khóa nối mi định cư — kỹ năng và chứng chỉ theo chuẩn quốc tế.",
    },
    "khoa-nail-chuyen-nghiep": {
      slug: "khoa-nail-chuyen-nghiep",
      label: "Khóa Nail Chuyên Nghiệp",
      description: "Học nail từ cơ bản đến nâng cao, thực hành trên model thật.",
    },
    "khoa-cham-soc-mong": {
      slug: "khoa-cham-soc-mong",
      label: "Khóa Chăm Sóc Móng",
      description: "Kỹ thuật chăm sóc, dưỡng và phục hồi móng tay chuyên nghiệp.",
    },
    "khoa-dinh-hinh-chan-may": {
      slug: "khoa-dinh-hinh-chan-may",
      label: "Khóa Định Hình Chân Mày",
      description: "Đào tạo kỹ thuật định hình, phun và tô chân mày chuẩn tỷ lệ.",
    },
    "khoa-hoc-uon-mi": {
      slug: "khoa-hoc-uon-mi",
      label: "Khóa Học Uốn Mi",
      description: "Uốn mi an toàn, giữ nếp bền — phù hợp mở dịch vụ hoặc nâng tay nghề.",
    },
  },
};

type SeoPayload = CmsPayload & {
  settings?: {
    clinicName?: string;
    seo?: CmsSeo;
  };
  pages?: Record<string, { title?: string; description?: string }>;
  priceList?: { title?: string; description?: string };
  articles?: CmsArticle[];
  serviceCatalog?: {
    categories?: Record<string, { path?: string; title?: string; description?: string }>;
    items?: Record<string, CmsServiceItem[]>;
  };
};

function pick(...values: (string | undefined)[]): string {
  for (const value of values) {
    if (value?.trim()) return value.trim();
  }
  return "";
}

function toAbsoluteUrl(path: string, siteUrl: string): string {
  const origin = siteUrl.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalized}`;
}

function toAbsoluteAssetUrl(url: string, siteUrl: string): string {
  if (!url?.trim()) return "";
  if (/^https?:\/\//i.test(url)) return url.trim();
  const origin = siteUrl.replace(/\/$/, "");
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${origin}${path}`;
}

function buildTitle(pageTitle: string, siteName: string, separator = " | "): string {
  const name = siteName || "Halee Trâm";
  if (!pageTitle) return name;
  if (pageTitle.includes(name)) return pageTitle;
  return `${pageTitle}${separator}${name}`;
}

function buildRobotsDirective(seo: Pick<CmsArticleSeo, "noindex" | "nofollow" | "robots">, fallback: string) {
  if (seo.noindex && seo.nofollow) return "noindex,nofollow";
  if (seo.noindex) return "noindex,follow";
  if (seo.nofollow) return "index,nofollow";
  return seo.robots?.trim() || fallback || "index,follow";
}

function getGlobalSeo(payload: SeoPayload | null | undefined, baseUrl: string): Required<Pick<CmsSeo, "siteName">> & CmsSeo {
  const seo = payload?.settings?.seo ?? {};
  return {
    siteName: seo.siteName || payload?.settings?.clinicName || "Halee Trâm — Nails & Lashes Studio",
    siteUrl: seo.siteUrl?.trim() || baseUrl,
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    titleSeparator: seo.titleSeparator || " | ",
    ogImage: seo.ogImage,
    ogTitle: seo.ogTitle,
    ogDescription: seo.ogDescription,
    twitterCard: seo.twitterCard || "summary_large_image",
    robots: seo.robots || "index,follow",
    locale: seo.locale || "vi_VN",
  };
}

function baseFromGlobal(global: ReturnType<typeof getGlobalSeo>, path: string, robotsOverride?: string): RenderedPageSeo {
  const siteName = global.siteName;
  const title = global.title || siteName;
  const description = global.description || "";
  const ogTitle = pick(global.ogTitle, title);
  const ogDescription = pick(global.ogDescription, description);
  const canonical = toAbsoluteUrl(path || "/", global.siteUrl || getServerSiteUrl());

  return {
    title,
    description,
    keywords: global.keywords || "",
    ogTitle,
    ogDescription,
    ogImage: toAbsoluteAssetUrl(global.ogImage || "", global.siteUrl || getServerSiteUrl()),
    ogUrl: canonical,
    ogType: "website",
    twitterCard: global.twitterCard || "summary_large_image",
    robots: robotsOverride || global.robots || "index,follow",
    canonical,
    siteName,
    locale: global.locale || "vi_VN",
  };
}

function notFoundMeta(global: ReturnType<typeof getGlobalSeo>, path: string): RenderedPageSeo {
  const base = baseFromGlobal(global, path, "noindex,nofollow");
  const title = buildTitle("Không tìm thấy trang", global.siteName, global.titleSeparator);
  return { ...base, title, ogTitle: title };
}

function getServiceItem(payload: SeoPayload | null | undefined, categoryId: string, slug: string): CmsServiceItem | undefined {
  return (
    payload?.serviceCatalog?.items?.[categoryId]?.find((item) => item.slug === slug) ??
    FALLBACK_SERVICES[categoryId]?.[slug]
  );
}

function resolveArticleSeo(article: CmsArticle, global: ReturnType<typeof getGlobalSeo>, path: string): RenderedPageSeo {
  const seo = article.seo ?? {};
  const title = pick(seo.metaTitle) || buildTitle(article.title || "", global.siteName, global.titleSeparator);
  const description = pick(seo.metaDescription, article.description, global.description);
  const keywords = pick(seo.keywords, seo.focusKeyphrase, global.keywords);
  const siteUrl = global.siteUrl || getServerSiteUrl();
  const ogImage = toAbsoluteAssetUrl(pick(seo.ogImage, article.image, global.ogImage), siteUrl);
  const ogTitle = pick(seo.ogTitle, seo.metaTitle, article.title, global.ogTitle, title);
  const ogDescription = pick(seo.ogDescription, seo.metaDescription, article.description, global.ogDescription, description);
  const canonical = seo.canonicalUrl?.trim()
    ? seo.canonicalUrl.startsWith("http")
      ? seo.canonicalUrl.trim()
      : toAbsoluteUrl(seo.canonicalUrl, siteUrl)
    : toAbsoluteUrl(path, siteUrl);

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
    siteName: global.siteName,
    locale: global.locale || "vi_VN",
  };
}

function resolveServiceSeo(opts: {
  serviceLabel: string;
  titleSuffix: string;
  description: string;
  image: string;
  path: string;
  global: ReturnType<typeof getGlobalSeo>;
  article?: CmsArticle;
  serviceSeo?: CmsArticleSeo;
}): RenderedPageSeo {
  const seo = opts.serviceSeo;
  const hasServiceSeo =
    Boolean(seo) &&
    Boolean(
      seo?.metaTitle?.trim() ||
        seo?.metaDescription?.trim() ||
        seo?.focusKeyphrase?.trim() ||
        seo?.ogImage?.trim() ||
        seo?.canonicalUrl?.trim() ||
        seo?.noindex ||
        seo?.nofollow,
    );

  if (hasServiceSeo && seo) {
    const title =
      pick(seo.metaTitle) ||
      buildTitle(`${opts.serviceLabel} — ${opts.titleSuffix}`, opts.global.siteName, opts.global.titleSeparator);
    const description = pick(seo.metaDescription, opts.description, opts.article?.description, opts.global.description);
    const siteUrl = opts.global.siteUrl || getServerSiteUrl();
    const ogImage = toAbsoluteAssetUrl(pick(seo.ogImage, opts.image, opts.article?.image, opts.global.ogImage), siteUrl);
    const canonical = seo.canonicalUrl?.trim()
      ? seo.canonicalUrl.startsWith("http")
        ? seo.canonicalUrl.trim()
        : toAbsoluteUrl(seo.canonicalUrl, siteUrl)
      : toAbsoluteUrl(opts.path, siteUrl);

    return {
      title,
      description,
      keywords: pick(seo.keywords, seo.focusKeyphrase, opts.global.keywords),
      ogTitle: pick(seo.ogTitle, seo.metaTitle, title),
      ogDescription: pick(seo.ogDescription, seo.metaDescription, description),
      ogImage,
      ogUrl: canonical,
      ogType: "website",
      twitterCard: opts.global.twitterCard || "summary_large_image",
      robots: buildRobotsDirective(seo, opts.global.robots || "index,follow"),
      canonical,
      siteName: opts.global.siteName,
      locale: opts.global.locale || "vi_VN",
    };
  }

  if (opts.article) return resolveArticleSeo(opts.article, opts.global, opts.path);

  const title = buildTitle(`${opts.serviceLabel} — ${opts.titleSuffix}`, opts.global.siteName, opts.global.titleSeparator);
  const description = pick(opts.description, opts.global.description);
  const siteUrl = opts.global.siteUrl || getServerSiteUrl();
  const canonical = toAbsoluteUrl(opts.path, siteUrl);

  return {
    title,
    description,
    keywords: opts.global.keywords || "",
    ogTitle: title,
    ogDescription: description,
    ogImage: toAbsoluteAssetUrl(pick(opts.image, opts.global.ogImage), siteUrl),
    ogUrl: canonical,
    ogType: "website",
    twitterCard: opts.global.twitterCard || "summary_large_image",
    robots: opts.global.robots || "index,follow",
    canonical,
    siteName: opts.global.siteName,
    locale: opts.global.locale || "vi_VN",
  };
}

export function resolveRouteSeoForPayload(path: string, payload: SeoPayload | null | undefined, baseUrl: string): RenderedPageSeo {
  const global = getGlobalSeo(payload, baseUrl);
  const clean = path.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";

  const articleMatch = clean.match(/^\/tin-tuc\/([^/]+)$/);
  if (articleMatch) {
    const article = payload?.articles?.find((item) => item.slug === articleMatch[1] && item.published);
    if (article) return resolveArticleSeo(article, global, clean);
    return notFoundMeta(global, clean);
  }

  const lamDepMatch = clean.match(/^\/lam-dep\/([^/]+)$/);
  if (lamDepMatch) {
    const service = getServiceItem(payload, "lam-dep", lamDepMatch[1]);
    if (service) {
      const linked = service.articleSlug
        ? payload?.articles?.find((item) => item.slug === service.articleSlug && item.published)
        : undefined;
      return resolveServiceSeo({
        serviceLabel: service.label || "",
        titleSuffix: "Dịch vụ làm đẹp Quận 7",
        description: service.description || linked?.description || "",
        image: linked?.image || global.ogImage || "",
        path: clean,
        global,
        article: linked,
        serviceSeo: service.seo,
      });
    }
    return notFoundMeta(global, clean);
  }

  const daoTaoMatch = clean.match(/^\/dao-tao\/([^/]+)$/);
  if (daoTaoMatch) {
    const service = getServiceItem(payload, "dao-tao", daoTaoMatch[1]);
    if (service) {
      const linked = service.articleSlug
        ? payload?.articles?.find((item) => item.slug === service.articleSlug && item.published)
        : undefined;
      return resolveServiceSeo({
        serviceLabel: service.label || "",
        titleSuffix: "Khóa học nghề làm đẹp TP.HCM",
        description: service.description || linked?.description || "",
        image: linked?.image || global.ogImage || "",
        path: clean,
        global,
        article: linked,
        serviceSeo: service.seo,
      });
    }
    return notFoundMeta(global, clean);
  }

  if (clean === "/lam-dep") {
    const cat = payload?.serviceCatalog?.categories?.["lam-dep"];
    const base = baseFromGlobal(global, clean);
    const title = buildTitle(cat?.title || "Làm đẹp", global.siteName, global.titleSeparator);
    return {
      ...base,
      title,
      description: pick(cat?.description, global.description),
      ogTitle: title,
      ogDescription: pick(cat?.description, global.description),
    };
  }

  if (clean === "/dao-tao") {
    const cat = payload?.serviceCatalog?.categories?.["dao-tao"];
    const base = baseFromGlobal(global, clean);
    const title = buildTitle(cat?.title || "Đào tạo", global.siteName, global.titleSeparator);
    return {
      ...base,
      title,
      description: pick(cat?.description, global.description),
      ogTitle: title,
      ogDescription: pick(cat?.description, global.description),
    };
  }

  const staticPage = payload?.pages?.[clean];
  if (staticPage) {
    const base = baseFromGlobal(global, clean);
    const title = buildTitle(staticPage.title || "", global.siteName, global.titleSeparator);
    return {
      ...base,
      title,
      description: pick(staticPage.description, global.description),
      ogTitle: title,
      ogDescription: pick(staticPage.description, global.description),
    };
  }

  if (clean === "/dich-vu") {
    const base = baseFromGlobal(global, clean);
    const title = buildTitle("Dịch vụ & Đào tạo làm đẹp", global.siteName, global.titleSeparator);
    return {
      ...base,
      title,
      description: pick(
        "Nails, nối mi, uốn mi, định hình chân mày, spa chân, gội đầu và khóa học nghề tại Halee Trâm Quận 7.",
        global.description,
      ),
      ogTitle: title,
      keywords: pick("dịch vụ nails Quận 7, nối mi Quận 7, học nail TP.HCM, khóa nối mi salon", global.keywords),
    };
  }

  if (clean === "/tin-tuc" || clean === "/tin-tuc/kien-thuc" || clean === "/tin-tuc/tin-tuc") {
    const base = baseFromGlobal(global, clean);
    const title = buildTitle("Tin tức & Kiến thức làm đẹp", global.siteName, global.titleSeparator);
    return {
      ...base,
      title,
      description: pick("Cẩm nang nails, mi và mẹo chăm sóc từ Halee Trâm.", global.description),
      ogTitle: title,
    };
  }

  if (clean === "/lien-he") {
    const base = baseFromGlobal(global, clean);
    const title = buildTitle("Liên hệ & Đặt lịch", global.siteName, global.titleSeparator);
    return {
      ...base,
      title,
      description: pick(
        "Liên hệ Halee Trâm — 793/62 Trần Xuân Soạn, Quận 7. Hotline 0938 162 662. Đặt lịch nails, nối mi hoặc tư vấn khóa học.",
        global.description,
      ),
      ogTitle: title,
    };
  }

  if (clean === "/khach-hang") {
    const base = baseFromGlobal(global, clean);
    const title = buildTitle("Thư viện ảnh khách hàng", global.siteName, global.titleSeparator);
    return {
      ...base,
      title,
      description: pick(
        "Hình ảnh nails, nối mi và kết quả đào tạo thực tế tại Halee Trâm Eyelash / Nail / Academy Quận 7.",
        global.description,
      ),
      ogTitle: title,
    };
  }

  if (clean === "/bang-gia") {
    const base = baseFromGlobal(global, clean);
    const title = buildTitle(payload?.priceList?.title || "Bảng giá tham khảo", global.siteName, global.titleSeparator);
    return {
      ...base,
      title,
      description: payload?.priceList?.description || base.description,
      ogTitle: title,
    };
  }

  if (clean === "/gioi-thieu/doi-ngu-bac-si") {
    const base = baseFromGlobal(global, clean);
    const title = buildTitle("Đội ngũ bác sĩ", global.siteName, global.titleSeparator);
    return { ...base, title, ogTitle: title };
  }

  return baseFromGlobal(global, clean === "/" ? "/" : clean);
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

export function injectMetaIntoHtml(html: string, meta: RenderedPageSeo): string {
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(/<meta\s+name="description"[^>]*>/gi, "")
    .replace(/<meta\s+name="keywords"[^>]*>/gi, "")
    .replace(/<meta\s+name="robots"[^>]*>/gi, "")
    .replace(/<meta\s+name="google-site-verification"[^>]*>/gi, "")
    .replace(/<meta\s+name="msvalidate\.01"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:[^"]+"[^>]*>/gi, "")
    .replace(/<meta\s+property="article:[^"]+"[^>]*>/gi, "")
    .replace(/<meta\s+property="fb:app_id"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:[^"]+"[^>]*>/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>/gi, "")
    .replace(/<script[^>]*id="thk-json-ld"[^>]*>[\s\S]*?<\/script>/gi, "");

  const tags = [
    meta.description ? `<meta name="description" content="${escapeHtml(meta.description)}" />` : "",
    meta.keywords ? `<meta name="keywords" content="${escapeHtml(meta.keywords)}" />` : "",
    `<meta name="robots" content="${escapeHtml(meta.robots)}" />`,
    meta.googleSiteVerification
      ? `<meta name="google-site-verification" content="${escapeHtml(meta.googleSiteVerification)}" />`
      : "",
    meta.bingSiteVerification
      ? `<meta name="msvalidate.01" content="${escapeHtml(meta.bingSiteVerification)}" />`
      : "",
    `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(meta.siteName)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.ogTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.ogDescription)}" />`,
    `<meta property="og:type" content="${escapeHtml(meta.ogType)}" />`,
    `<meta property="og:url" content="${escapeHtml(meta.ogUrl)}" />`,
    meta.ogImage ? `<meta property="og:image" content="${escapeHtml(meta.ogImage)}" />` : "",
    meta.ogImage ? `<meta property="og:image:secure_url" content="${escapeHtml(meta.ogImage)}" />` : "",
    meta.ogImageAlt ? `<meta property="og:image:alt" content="${escapeHtml(meta.ogImageAlt)}" />` : "",
    `<meta property="og:locale" content="${escapeHtml(meta.locale)}" />`,
    meta.facebookAppId ? `<meta property="fb:app_id" content="${escapeHtml(meta.facebookAppId)}" />` : "",
    meta.articlePublished
      ? `<meta property="article:published_time" content="${escapeHtml(meta.articlePublished)}" />`
      : "",
    meta.articleSection ? `<meta property="article:section" content="${escapeHtml(meta.articleSection)}" />` : "",
    `<meta name="twitter:card" content="${escapeHtml(meta.twitterCard)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.ogTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.ogDescription)}" />`,
    meta.ogImage ? `<meta name="twitter:image" content="${escapeHtml(meta.ogImage)}" />` : "",
    meta.ogImageAlt ? `<meta name="twitter:image:alt" content="${escapeHtml(meta.ogImageAlt)}" />` : "",
    meta.jsonLd
      ? `<script id="thk-json-ld" type="application/ld+json">${meta.jsonLd}</script>`
      : "",
  ]
    .filter(Boolean)
    .join("\n    ");

  return out.replace("</head>", `    ${tags}\n  </head>`);
}
