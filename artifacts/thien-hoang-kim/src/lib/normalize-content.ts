import { DEFAULT_ARTICLES } from "@/data/articles.defaults";
import { DEFAULT_SITE_CONTENT } from "@/data/site-content.defaults";
import { slugify } from "@/lib/slug";
import type { SiteArticle, SiteContent } from "@/types/site-content";

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
      seo: {
        ...base.settings.seo,
        ...partial.settings?.seo,
      },
    },
    home: { ...base.home, ...partial.home },
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
    bookingServices: partial.bookingServices ?? base.bookingServices,
    doctors: partial.doctors ?? base.doctors,
    articles: normalizeArticles(partial.articles),
    testimonials: partial.testimonials ?? base.testimonials,
    customerCases: partial.customerCases ?? base.customerCases,
    processSteps: partial.processSteps ?? base.processSteps,
  };
}
