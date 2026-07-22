import type { ArticleSeo } from "@/types/site-content";

/** Leaf module — no imports from seo.ts / site-content (avoids circular TDZ). */
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
