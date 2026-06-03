import type { PageSeoMeta } from "@/lib/seo";
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

export function buildBreadcrumbs(path: string, siteName: string, article?: SiteArticle): BreadcrumbItem[] {
  const base = typeof window !== "undefined" ? window.location.origin : "";
  const items: BreadcrumbItem[] = [{ name: "Trang chủ", url: `${base}/` }];

  if (path === "/" || !path) return items;

  const segments = path.split("/").filter(Boolean);

  if (segments[0] === "tin-tuc") {
    items.push({ name: "Tin tức", url: `${base}/tin-tuc` });
    if (segments[1] && article) {
      items.push({ name: article.title, url: `${base}${path}` });
    }
    return items;
  }

  if (segments[0] === "lam-dep") {
    items.push({ name: "Dịch vụ làm đẹp", url: `${base}/lam-dep` });
    if (segments[1]) items.push({ name: segments[1].replace(/-/g, " "), url: `${base}${path}` });
    return items;
  }

  if (segments[0] === "dao-tao") {
    items.push({ name: "Đào tạo", url: `${base}/dao-tao` });
    if (segments[1]) items.push({ name: segments[1].replace(/-/g, " "), url: `${base}${path}` });
    return items;
  }

  const labels: Record<string, string> = {
    "gioi-thieu": "Giới thiệu",
    "dich-vu": "Dịch vụ",
    "khach-hang": "Thư viện hình ảnh",
    "bang-gia": "Bảng giá",
    "lien-he": "Liên hệ",
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

export function buildJsonLdGraph(ctx: SchemaContext, content: SiteContent): object[] {
  const { settings } = content;
  const seo = settings.seo;
  if (seo.schemaEnabled === false) return [];

  const graphs: object[] = [];
  const siteUrl = getSiteBaseUrlFromSettings(seo, ctx.meta.canonical);
  const orgId = `${siteUrl}/#organization`;
  const siteId = `${siteUrl}/#website`;

  graphs.push({
    "@type": seo.organizationType || "MedicalBusiness",
    "@id": orgId,
    name: settings.clinicName,
    alternateName: seo.siteName,
    url: siteUrl,
    logo: seo.organizationLogo || seo.ogImage || undefined,
    image: seo.ogImage || undefined,
    telephone: settings.phone,
    email: settings.email || undefined,
    priceRange: seo.priceRange || "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "TP. Hồ Chí Minh",
      addressCountry: "VN",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "20:00",
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
    inLanguage: seo.locale || "vi-VN",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/tin-tuc?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  });

  if (seo.breadcrumbsEnabled !== false && ctx.breadcrumbs.length > 1) {
    graphs.push({
      "@type": "BreadcrumbList",
      itemListElement: ctx.breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: b.url,
      })),
    });
  }

  if (ctx.article && ctx.path.startsWith("/tin-tuc/")) {
    const published = parseViDate(ctx.article.date);
    graphs.push({
      "@type": "Article",
      "@id": `${ctx.meta.canonical}#article`,
      headline: ctx.article.title,
      description: ctx.meta.description,
      image: ctx.meta.ogImage ? [ctx.meta.ogImage] : undefined,
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
          ? { "@type": "ImageObject", url: seo.organizationLogo }
          : undefined,
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": ctx.meta.canonical },
      articleSection: ctx.article.category,
      inLanguage: seo.locale || "vi-VN",
      keywords: ctx.article.seo?.keywords || ctx.article.seo?.focusKeyphrase || undefined,
    });
  } else if (ctx.path === "/") {
    graphs.push({
      "@type": "WebPage",
      "@id": `${ctx.meta.canonical}#webpage`,
      url: ctx.meta.canonical,
      name: ctx.meta.title,
      description: ctx.meta.description,
      isPartOf: { "@id": siteId },
      about: { "@id": orgId },
    });
  }

  return graphs;
}

export function jsonLdScript(graphs: object[]): string {
  if (!graphs.length) return "";
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graphs,
  });
}
