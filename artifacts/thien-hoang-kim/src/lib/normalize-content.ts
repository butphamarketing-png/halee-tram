import { DEFAULT_ARTICLES } from "@/data/articles.defaults";
import { DEFAULT_SITE_CONTENT } from "@/data/site-content.defaults";
import { normalizeArticleSeo, normalizeSiteSeo } from "@/lib/seo";
import { slugify } from "@/lib/slug";
import type { SiteArticle, SiteContent, SiteCustomerCase, SiteTestimonial } from "@/types/site-content";

function normalizeTestimonials(items?: SiteTestimonial[]): SiteTestimonial[] {
  const base = DEFAULT_SITE_CONTENT.testimonials;
  if (!items?.length) return base;
  return items.map((t, i) => {
    const fallback = base[i] ?? base[0];
    const albumImages =
      t.albumImages?.length ? t.albumImages : fallback?.albumImages?.length ? fallback.albumImages : [t.avatar || fallback.avatar];
    return {
      id: t.id || fallback.id,
      name: t.name || fallback.name,
      initials: t.initials || fallback.initials,
      avatar: t.avatar || fallback.avatar,
      text: t.text || fallback.text,
      albumImages,
      category: t.category ?? fallback?.category ?? "service",
    };
  });
}

function normalizeCustomerCases(items?: SiteCustomerCase[]): SiteCustomerCase[] {
  const base = DEFAULT_SITE_CONTENT.customerCases;
  if (!items?.length) return base;
  return items.map((c, i) => {
    const fallback = base[i] ?? base[0];
    const legacy = c as SiteCustomerCase & { before?: string; after?: string };
    const images =
      c.images?.length
        ? c.images
        : legacy.before || legacy.after
          ? [legacy.before, legacy.after].filter(Boolean) as string[]
          : fallback.images;
    const cover = c.cover || legacy.before || images[0] || fallback.cover;
    return {
      id: c.id || fallback.id,
      label: c.label || fallback.label,
      cover,
      images: images.length ? images : [cover],
    };
  });
}

export function normalizeArticles(articles?: SiteArticle[]): SiteArticle[] {
  if (!articles?.length) return DEFAULT_ARTICLES;

  const defaultById = new Map(DEFAULT_ARTICLES.map((a) => [a.id, a]));

  return articles.map((a) => {
    const fallback = defaultById.get(a.id);
    const title = a.title || fallback?.title || "Bài viết";
    return {
      id: a.id,
      slug: a.slug || fallback?.slug || slugify(title),
      category: a.category || fallback?.category || "Kiến thức",
      image: a.image || fallback?.image || DEFAULT_SITE_CONTENT.home.heroSlides[0]?.src || "",
      title,
      date: a.date || fallback?.date || new Date().toLocaleDateString("vi-VN"),
      description: a.description || fallback?.description || "",
      body: a.body || fallback?.body || a.description || "",
      published: a.published ?? fallback?.published ?? true,
      seo: normalizeArticleSeo(a.seo ?? fallback?.seo),
    };
  });
}

export function mergeSiteContent(partial: Partial<SiteContent>): SiteContent {
  const base = DEFAULT_SITE_CONTENT;
  return {
    ...base,
    ...partial,
    version: partial.version ?? base.version,
    settings: {
      ...base.settings,
      ...partial.settings,
      seo: normalizeSiteSeo(partial.settings?.seo, base.settings.seo),
    },
    home: {
      ...base.home,
      ...partial.home,
      featuredServiceImages: partial.home?.featuredServiceImages ?? base.home.featuredServiceImages,
      heroSlides: partial.home?.heroSlides ?? base.home.heroSlides,
    },
    footer: {
      ...base.footer,
      ...partial.footer,
      featuredServices: partial.footer?.featuredServices ?? base.footer.featuredServices,
      quickLinks: partial.footer?.quickLinks ?? base.footer.quickLinks,
      designCreditLabel: partial.footer?.designCreditLabel ?? base.footer.designCreditLabel,
      designCreditUrl: partial.footer?.designCreditUrl ?? base.footer.designCreditUrl,
      copyright: (partial.footer?.copyright ?? base.footer.copyright).replace(
        /\s*Design by Butphamarketing\.com\s*$/i,
        "",
      ),
    },
    handbook: { ...base.handbook, ...partial.handbook },
    priceList: {
      ...base.priceList,
      ...partial.priceList,
      images: partial.priceList?.images?.length ? partial.priceList.images : base.priceList.images,
    },
    bookingServices: partial.bookingServices ?? base.bookingServices,
    doctors: partial.doctors ?? base.doctors,
    articles: normalizeArticles(partial.articles),
    testimonials: normalizeTestimonials(partial.testimonials),
    customerCases: normalizeCustomerCases(partial.customerCases),
    processSteps: partial.processSteps ?? base.processSteps,
    luckyWheel: { ...base.luckyWheel, ...partial.luckyWheel },
    navigation: partial.navigation?.length ? partial.navigation : base.navigation,
    pages: { ...base.pages, ...partial.pages },
    serviceCatalog: partial.serviceCatalog
      ? {
          categories: {
            "lam-dep": { ...base.serviceCatalog.categories["lam-dep"], ...partial.serviceCatalog.categories?.["lam-dep"] },
            "dao-tao": { ...base.serviceCatalog.categories["dao-tao"], ...partial.serviceCatalog.categories?.["dao-tao"] },
          },
          items: {
            "lam-dep": partial.serviceCatalog.items?.["lam-dep"] ?? base.serviceCatalog.items["lam-dep"],
            "dao-tao": partial.serviceCatalog.items?.["dao-tao"] ?? base.serviceCatalog.items["dao-tao"],
          },
        }
      : base.serviceCatalog,
  };
}
