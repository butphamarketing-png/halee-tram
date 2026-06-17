import { DEFAULT_PAGES, buildDefaultPages } from "@/data/cms-defaults";
import { SERVICE_CATEGORIES, SERVICE_ITEMS } from "@/data/services-catalog";
import type { SitePageContent } from "@/types/site-content";

export type { SitePageContent } from "@/types/site-content";
export type PageBlock = SitePageContent["blocks"][number];

const intro =
  `${import.meta.env.BASE_URL}gioithieu.1.png`.replace(/([^:]\/)\/+/g, "$1");

/** @deprecated Dùng getPageContent(content, path) từ site-cms */
export const ALL_PAGES: Record<string, SitePageContent> = DEFAULT_PAGES;

/** @deprecated Dùng getPageContent(content, path) từ site-cms */
export function getPageContent(path: string): SitePageContent | null {
  const normalized = path.replace(/\/$/, "") || "/";
  return DEFAULT_PAGES[normalized] ?? null;
}

export { SERVICE_CATEGORIES, SERVICE_ITEMS, buildDefaultPages };
export const DEFAULT_HERO_IMAGE = intro;
