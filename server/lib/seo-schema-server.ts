/** Server-side JSON-LD builder for bot-render (no client imports). */

import type { RenderedPageSeo } from "./seo-render-server";
import type { CmsPayload } from "./seo-sitemap-server";

type SeoPayload = CmsPayload & {
  settings?: {
    clinicName?: string;
    phone?: string;
    email?: string;
    address?: string;
    facebookUrl?: string;
    tiktokUrl?: string;
    youtubeUrl?: string;
    seo?: {
      siteName?: string;
      siteUrl?: string;
      description?: string;
      ogImage?: string;
      organizationLogo?: string;
      organizationType?: string;
      priceRange?: string;
      locale?: string;
      schemaEnabled?: boolean;
      breadcrumbsEnabled?: boolean;
    };
  };
  articles?: Array<{
    slug?: string;
    published?: boolean;
    title?: string;
    date?: string;
    category?: string;
    seo?: { keywords?: string; focusKeyphrase?: string };
  }>;
  testimonials?: unknown[];
  serviceCatalog?: {
    categories?: Record<string, { path?: string }>;
    items?: Record<string, Array<{ slug?: string; label?: string; description?: string }>>;
  };
};

export type ServerBreadcrumb = { name: string; url: string };

function toAbsoluteAsset(url: string, siteUrl: string): string {
  if (!url?.trim()) return "";
  if (/^https?:\/\//i.test(url)) return url.trim();
  const origin = siteUrl.replace(/\/$/, "");
  return `${origin}${url.startsWith("/") ? url : `/${url}`}`;
}

function formatPhoneE164(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return phone;
  if (digits.startsWith("84")) return `+${digits}`;
  if (digits.startsWith("0")) return `+84${digits.slice(1)}`;
  return `+84${digits}`;
}

function parseViDate(dateStr: string): string | undefined {
  const m = dateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!m) return undefined;
  const [, d, mo, y] = m;
  return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

function getServiceItem(payload: SeoPayload, categoryId: string, slug: string) {
  return payload.serviceCatalog?.items?.[categoryId]?.find((item) => item.slug === slug);
}

export function buildBreadcrumbsForPayload(
  path: string,
  siteName: string,
  siteUrl: string,
  payload: SeoPayload | null | undefined,
  articleTitle?: string,
): ServerBreadcrumb[] {
  const base = siteUrl.replace(/\/$/, "");
  const items: ServerBreadcrumb[] = [{ name: "Trang chủ", url: `${base}/` }];
  if (path === "/" || !path) return items;

  const segments = path.split("/").filter(Boolean);

  if (segments[0] === "tin-tuc") {
    items.push({ name: "Tin tức", url: `${base}/tin-tuc` });
    if (segments[1] === "kien-thuc") items.push({ name: "Kiến thức", url: `${base}/tin-tuc/kien-thuc` });
    else if (segments[1] === "tin-tuc") items.push({ name: "Tin tức", url: `${base}/tin-tuc/tin-tuc` });
    else if (segments[1] && articleTitle) items.push({ name: articleTitle, url: `${base}${path}` });
    return items;
  }

  if (segments[0] === "lam-dep") {
    items.push({ name: "Dịch vụ làm đẹp", url: `${base}/lam-dep` });
    if (segments[1]) {
      const service = payload ? getServiceItem(payload, "lam-dep", segments[1]) : undefined;
      items.push({ name: service?.label || segments[1].replace(/-/g, " "), url: `${base}${path}` });
    }
    return items;
  }

  if (segments[0] === "dao-tao") {
    items.push({ name: "Đào tạo nghề", url: `${base}/dao-tao` });
    if (segments[1]) {
      const service = payload ? getServiceItem(payload, "dao-tao", segments[1]) : undefined;
      items.push({ name: service?.label || segments[1].replace(/-/g, " "), url: `${base}${path}` });
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
    items.push({ name: labels[seg] || seg.replace(/-/g, " "), url: `${base}${acc}` });
  }
  if (items.length === 1) items.push({ name: siteName, url: `${base}${path}` });
  return items;
}

export function buildJsonLdForPayload(
  path: string,
  meta: RenderedPageSeo,
  payload: SeoPayload | null | undefined,
  siteUrl: string,
): string {
  const seo = payload?.settings?.seo;
  if (seo?.schemaEnabled === false) return "";

  const settings = payload?.settings;
  const graphs: object[] = [];
  const orgId = `${siteUrl}/#organization`;
  const siteId = `${siteUrl}/#website`;
  const orgType = seo?.organizationType || "BeautySalon";

  graphs.push({
    "@type": [orgType, "LocalBusiness"],
    "@id": orgId,
    name: settings?.clinicName || seo?.siteName,
    alternateName: seo?.siteName,
    description: seo?.description,
    url: siteUrl,
    logo: seo?.organizationLogo ? toAbsoluteAsset(seo.organizationLogo, siteUrl) : undefined,
    image: seo?.ogImage ? toAbsoluteAsset(seo.ogImage, siteUrl) : undefined,
    telephone: settings?.phone ? formatPhoneE164(settings.phone) : undefined,
    email: settings?.email || undefined,
    priceRange: seo?.priceRange || "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings?.address || "793/62 Trần Xuân Soạn, Phường Tân Hưng",
      addressLocality: "Quận 7",
      addressRegion: "TP. Hồ Chí Minh",
      addressCountry: "VN",
    },
    sameAs: [settings?.facebookUrl, settings?.tiktokUrl, settings?.youtubeUrl].filter(
      (u) => u && u !== "#",
    ),
    ...((payload?.testimonials?.length ?? 0) > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            bestRating: "5",
            worstRating: "1",
            reviewCount: String(payload?.testimonials?.length ?? 1),
          },
        }
      : {}),
  });

  graphs.push({
    "@type": "WebSite",
    "@id": siteId,
    url: siteUrl,
    name: seo?.siteName,
    description: seo?.description,
    publisher: { "@id": orgId },
    inLanguage: seo?.locale?.replace("_", "-") || "vi-VN",
  });

  const articleMatch = path.match(/^\/tin-tuc\/([^/]+)$/);
  const article = articleMatch
    ? payload?.articles?.find((a) => a.slug === articleMatch[1] && a.published)
    : undefined;

  const breadcrumbs = buildBreadcrumbsForPayload(
    path,
    meta.siteName,
    siteUrl,
    payload,
    article?.title,
  );
  const breadcrumbId = `${meta.canonical}#breadcrumb`;

  if (seo?.breadcrumbsEnabled !== false && breadcrumbs.length > 1) {
    graphs.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: b.url,
      })),
    });
  }

  graphs.push({
    "@type": "WebPage",
    "@id": `${meta.canonical}#webpage`,
    url: meta.canonical,
    name: meta.title,
    description: meta.description,
    isPartOf: { "@id": siteId },
    about: path === "/" ? { "@id": orgId } : undefined,
    breadcrumb:
      seo?.breadcrumbsEnabled !== false && breadcrumbs.length > 1 ? { "@id": breadcrumbId } : undefined,
    inLanguage: seo?.locale?.replace("_", "-") || "vi-VN",
  });

  const lamDepMatch = path.match(/^\/lam-dep\/([^/]+)$/);
  if (lamDepMatch) {
    const service = payload ? getServiceItem(payload, "lam-dep", lamDepMatch[1]) : undefined;
    if (service) {
      graphs.push({
        "@type": "Service",
        "@id": `${meta.canonical}#service`,
        name: service.label,
        description: service.description || meta.description,
        provider: { "@id": orgId },
        url: meta.canonical,
      });
    }
  }

  const daoTaoMatch = path.match(/^\/dao-tao\/([^/]+)$/);
  if (daoTaoMatch) {
    const service = payload ? getServiceItem(payload, "dao-tao", daoTaoMatch[1]) : undefined;
    if (service) {
      graphs.push({
        "@type": "Course",
        "@id": `${meta.canonical}#course`,
        name: service.label,
        description: service.description || meta.description,
        provider: { "@id": orgId },
        url: meta.canonical,
      });
    }
  }

  if (article && path.startsWith("/tin-tuc/")) {
    const published = article.date ? parseViDate(article.date) : undefined;
    const image = meta.ogImage ? toAbsoluteAsset(meta.ogImage, siteUrl) : undefined;
    graphs.push({
      "@type": "Article",
      "@id": `${meta.canonical}#article`,
      headline: article.title,
      description: meta.description,
      image: image ? [image] : undefined,
      datePublished: published,
      dateModified: published,
      author: { "@type": "Organization", name: settings?.clinicName },
      publisher: {
        "@type": "Organization",
        name: settings?.clinicName,
        logo: seo?.organizationLogo
          ? { "@type": "ImageObject", url: toAbsoluteAsset(seo.organizationLogo, siteUrl) }
          : undefined,
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": meta.canonical },
      articleSection: article.category,
      keywords: article.seo?.keywords || article.seo?.focusKeyphrase,
    });
  }

  if (!graphs.length) return "";
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graphs });
}
