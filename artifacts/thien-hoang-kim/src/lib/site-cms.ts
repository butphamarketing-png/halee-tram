import type { NavItem, NavLinkItem, NavMegaColumn } from "@/config/navigation";
import {
  DEFAULT_NAVIGATION,
  DEFAULT_PAGES,
  DEFAULT_SERVICE_CATALOG,
  buildDefaultPages,
} from "@/data/cms-defaults";
import type {
  SiteContent,
  SitePageContent,
  SiteServiceCatalog,
  SiteServiceCategoryId,
  SiteServiceItem,
} from "@/types/site-content";

export function getServiceCatalog(content: SiteContent): SiteServiceCatalog {
  return content.serviceCatalog ?? DEFAULT_SERVICE_CATALOG;
}

export function getServiceHref(
  catalog: SiteServiceCatalog,
  categoryId: SiteServiceCategoryId,
  slug: string,
): string {
  return `${catalog.categories[categoryId].path}/${slug}`;
}

export function getServiceItem(
  content: SiteContent,
  categoryId: SiteServiceCategoryId,
  slug: string,
): SiteServiceItem | null {
  const catalog = getServiceCatalog(content);
  return catalog.items[categoryId].find((s) => s.slug === slug) ?? null;
}

export function buildNavServiceItems(content: SiteContent, categoryId: SiteServiceCategoryId): NavLinkItem[] {
  const catalog = getServiceCatalog(content);
  return catalog.items[categoryId].map((item) => ({
    label: item.label,
    href: `${catalog.categories[categoryId].path}/${item.slug}`,
  }));
}

export function getMainNav(content: SiteContent): NavItem[] {
  const nav = content.navigation?.length ? content.navigation : DEFAULT_NAVIGATION;
  const catalog = getServiceCatalog(content);

  return nav.map((item) => {
    if (item.href !== "/dich-vu") return item;
    const columns: NavMegaColumn[] = (["lam-dep", "dao-tao"] as SiteServiceCategoryId[]).map((id) => ({
      title: catalog.categories[id].title,
      items: buildNavServiceItems(content, id),
    }));
    return { ...item, columns };
  });
}

export function getSitePages(content: SiteContent): Record<string, SitePageContent> {
  const catalog = getServiceCatalog(content);
  const base = { ...DEFAULT_PAGES, ...buildDefaultPages(catalog) };
  return { ...base, ...content.pages };
}

export function getPageContent(content: SiteContent, path: string): SitePageContent | null {
  const normalized = path.split("#")[0].replace(/\/$/, "") || "/";
  const pages = getSitePages(content);
  return pages[normalized] ?? null;
}

export function listEditableStaticPagePaths(): string[] {
  return Object.keys(DEFAULT_PAGES).filter((p) => !p.startsWith("/lam-dep/") && !p.startsWith("/dao-tao/"));
}

export function listServicePagePaths(content: SiteContent): string[] {
  const catalog = getServiceCatalog(content);
  const paths: string[] = [];
  for (const id of ["lam-dep", "dao-tao"] as SiteServiceCategoryId[]) {
    for (const item of catalog.items[id]) {
      paths.push(`${catalog.categories[id].path}/${item.slug}`);
    }
  }
  return paths;
}
