import type { PageSeoMeta } from "@/lib/seo";
import { getServiceItem } from "@/data/services-catalog";
import { getSiteBaseUrl } from "@/lib/seo-sitemap";
import type { SiteArticle, SiteContent, SiteSeo } from "@/types/site-content";

function getSiteBaseUrlFromSettings(seo: SiteSeo, fallbackCanonical: string): string {
  if (seo.siteUrl?.trim()) return getSiteBaseUrl(seo.siteUrl);
  try {
    const u = new URL(fallbackCanonical);
    return u.origin;
  } catch {
    return getSiteBaseUrl();
  }
}

function formatPhoneE164(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return phone;
  if (digits.startsWith("84")) return `+${digits}`;
  if (digits.startsWith("0")) return `+84${digits.slice(1)}`;
  return `+84${digits}`;
}

export type BreadcrumbItem = { name: string; url: string };

export type SchemaContext = {
  path: string;
  meta: PageSeoMeta;
  breadcrumbs: BreadcrumbItem[];
  article?: SiteArticle;
};

function parseViDate(dateStr: string): string | undefined {
  const m = dateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!m) return undefined;
  const [, d, mo, y] = m;
  return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

export function buildBreadcrumbs(
  path: string,
  siteName: string,
  siteUrl: string,
  article?: SiteArticle,
): BreadcrumbItem[] {
  const base = getSiteBaseUrl(siteUrl);
  const items: BreadcrumbItem[] = [{ name: "Trang chủ", url: `${base}/` }];

  if (path === "/" || !path) return items;

  const segments = path.split("/").filter(Boolean);

  if (segments[0] === "tin-tuc") {
    items.push({ name: "Tin tức", url: `${base}/tin-tuc` });
    if (segments[1] === "kien-thuc") {
      items.push({ name: "Kiến thức", url: `${base}/tin-tuc/kien-thuc` });
    } else if (segments[1] === "tin-tuc") {
      items.push({ name: "Tin tức", url: `${base}/tin-tuc/tin-tuc` });
    } else if (segments[1] && article) {
      items.push({ name: article.title, url: `${base}${path}` });
    }
    return items;
  }

  if (segments[0] === "lam-dep") {
    items.push({ name: "Dịch vụ làm đẹp", url: `${base}/lam-dep` });
    if (segments[1]) {
      const service = getServiceItem("lam-dep", segments[1]);
      items.push({
        name: service?.label || segments[1].replace(/-/g, " "),
        url: `${base}${path}`,
      });
    }
    return items;
  }

  if (segments[0] === "dao-tao") {
    items.push({ name: "Đào tạo nghề", url: `${base}/dao-tao` });
    if (segments[1]) {
      const service = getServiceItem("dao-tao", segments[1]);
      items.push({
        name: service?.label || segments[1].replace(/-/g, " "),
        url: `${base}${path}`,
      });
    }
    return items;
  }

  const labels: Record<string, string> = {
    "gioi-thieu": "Giới thiệu",
    "dich-vu": "Dịch vụ",
    "khach-hang": "Thư viện ảnh",
    "bang-gia": "Bảng giá",
    "lien-he": "Liên hệ",
    "cau-chuyen-thuong-hieu": "Câu chuyện thương hiệu",
    "co-so-vat-chat": "Cơ sở vật chất",
    "doi-ngu-bac-si": "Đội ngũ nhân viên",
  };

  let acc = "";
  for (const seg of segments) {
    acc += `/${seg}`;
    items.push({
      name: labels[seg] || seg.replace(/-/g, " "),
      url: `${base}${acc}`,
    });
  }

  if (items.length === 1) items.push({ name: siteName, url: `${base}${path}` });
  return items;
}

function buildServiceSchema(
  categoryId: "lam-dep" | "dao-tao",
  slug: string,
  orgId: string,
  canonical: string,
  fallbackDescription: string,
) {
  const service = getServiceItem(categoryId, slug);
  if (!service) return null;
  return {
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: service.label,
    description: service.description || fallbackDescription,
    provider: { "@id": orgId },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Quận 7, TP. Hồ Chí Minh",
    },
    url: canonical,
  };
}

export function buildJsonLdGraph(ctx: SchemaContext, content: SiteContent): object[] {
  const { settings } = content;
  const seo = settings.seo;
  if (seo.schemaEnabled === false) return [];

  const graphs: object[] = [];
  const siteUrl = getSiteBaseUrlFromSettings(seo, ctx.meta.canonical);
  const orgId = `${siteUrl}/#organization`;
  const siteId = `${siteUrl}/#website`;
  const orgType = seo.organizationType || "BeautySalon";

  graphs.push({
    "@type": [orgType, "LocalBusiness"],
    "@id": orgId,
    name: settings.clinicName,
    alternateName: seo.siteName,
    description: seo.description,
    url: siteUrl,
    logo: seo.organizationLogo ? toAbsoluteAsset(seo.organizationLogo, siteUrl) : undefined,
    image: seo.ogImage ? toAbsoluteAsset(seo.ogImage, siteUrl) : undefined,
    telephone: formatPhoneE164(settings.phone),
    email: settings.email || undefined,
    priceRange: seo.priceRange || "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "793/62 Trần Xuân Soạn, Phường Tân Hưng",
      addressLocality: "Quận 7",
      addressRegion: "TP. Hồ Chí Minh",
      postalCode: "700000",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.745,
      longitude: 106.7015,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "20:00",
    },
    areaServed: {
      "@type": "City",
      name: "Ho Chi Minh City",
    },
    sameAs: [settings.facebookUrl, settings.tiktokUrl, settings.youtubeUrl].filter(
      (u) => u && u !== "#",
    ),
  });

  graphs.push({
    "@type": "WebSite",
    "@id": siteId,
    url: siteUrl,
    name: seo.siteName,
    description: seo.description,
    publisher: { "@id": orgId },
    inLanguage: seo.locale?.replace("_", "-") || "vi-VN",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/tin-tuc?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  });

  const breadcrumbId = `${ctx.meta.canonical}#breadcrumb`;
  if (seo.breadcrumbsEnabled !== false && ctx.breadcrumbs.length > 1) {
    graphs.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: ctx.breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: b.url,
      })),
    });
  }

  graphs.push({
    "@type": "WebPage",
    "@id": `${ctx.meta.canonical}#webpage`,
    url: ctx.meta.canonical,
    name: ctx.meta.title,
    description: ctx.meta.description,
    isPartOf: { "@id": siteId },
    about: ctx.path === "/" ? { "@id": orgId } : undefined,
    breadcrumb:
      seo.breadcrumbsEnabled !== false && ctx.breadcrumbs.length > 1
        ? { "@id": breadcrumbId }
        : undefined,
    inLanguage: seo.locale?.replace("_", "-") || "vi-VN",
  });

  const lamDepMatch = ctx.path.match(/^\/lam-dep\/([^/]+)$/);
  if (lamDepMatch) {
    const serviceSchema = buildServiceSchema(
      "lam-dep",
      lamDepMatch[1],
      orgId,
      ctx.meta.canonical,
      ctx.meta.description,
    );
    if (serviceSchema) graphs.push(serviceSchema);
  }

  const daoTaoMatch = ctx.path.match(/^\/dao-tao\/([^/]+)$/);
  if (daoTaoMatch) {
    const serviceSchema = buildServiceSchema(
      "dao-tao",
      daoTaoMatch[1],
      orgId,
      ctx.meta.canonical,
      ctx.meta.description,
    );
    if (serviceSchema) graphs.push(serviceSchema);
  }

  if (ctx.article && ctx.path.startsWith("/tin-tuc/")) {
    const published = parseViDate(ctx.article.date);
    const image = ctx.meta.ogImage ? toAbsoluteAsset(ctx.meta.ogImage, siteUrl) : undefined;
    graphs.push({
      "@type": "Article",
      "@id": `${ctx.meta.canonical}#article`,
      headline: ctx.article.title,
      description: ctx.meta.description,
      image: image ? [image] : undefined,
      datePublished: published,
      dateModified: published,
      author: {
        "@type": "Organization",
        name: settings.clinicName,
      },
      publisher: {
        "@type": "Organization",
        name: settings.clinicName,
        logo: seo.organizationLogo
          ? { "@type": "ImageObject", url: toAbsoluteAsset(seo.organizationLogo, siteUrl) }
          : undefined,
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": ctx.meta.canonical },
      articleSection: ctx.article.category,
      inLanguage: seo.locale?.replace("_", "-") || "vi-VN",
      keywords: ctx.article.seo?.keywords || ctx.article.seo?.focusKeyphrase || undefined,
    });
  }

  return graphs;
}

function toAbsoluteAsset(url: string, siteUrl: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  const origin = siteUrl.replace(/\/$/, "");
  return `${origin}${url.startsWith("/") ? url : `/${url}`}`;
}

export function jsonLdScript(graphs: object[]): string {
  if (!graphs.length) return "";
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graphs,
  });
}
