import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import type { NavItem } from "@/config/navigation";
import { useSiteContentSafe } from "@/context/SiteContentContext";
import { getMainNav } from "@/lib/site-cms";
import { cn } from "@/lib/utils";
import { dropdownPanelClass, navTriggerClass } from "./nav-styles";

function isActivePath(location: string, href: string) {
  if (href === "/") return location === "/" || location === "";
  return location === href || location.startsWith(`${href}/`);
}

function SimpleDropdown({ items }: { items: { label: string; href: string }[] }) {
  return (
    <div className="min-w-[240px] rounded-lg border border-border bg-white py-2 shadow-xl">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block px-4 py-2.5 text-sm font-medium text-foreground/90 transition-colors hover:bg-secondary/50 hover:text-primary"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function MegaDropdown({ columns }: { columns: NonNullable<NavItem["columns"]> }) {
  return (
    <div className="w-[min(92vw,560px)] rounded-lg border border-border bg-white p-4 shadow-xl">
      <div className="grid grid-cols-2 gap-6">
        {columns.map((col) => (
          <div key={col.title}>
            <p className="mb-3 border-b border-border pb-2 text-xs font-bold tracking-wide text-primary">
              {col.title}
            </p>
            <ul className="space-y-1">
              {col.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-2 py-1.5 text-sm text-foreground/85 transition-colors hover:bg-secondary/40 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function NavEntry({ item, location }: { item: NavItem; location: string }) {
  const active = isActivePath(location, item.href);
  const hasMenu = Boolean(item.children?.length || item.columns?.length);

  if (!hasMenu) {
    return (
      <Link href={item.href} className={navTriggerClass(active)}>
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group relative flex shrink-0 items-center">
      <Link href={item.href} className={navTriggerClass(active)}>
        {item.label}
        <ChevronRight className="h-3 w-3 shrink-0 rotate-90 opacity-70" aria-hidden />
      </Link>
      <div className={dropdownPanelClass()}>
        {item.columns ? <MegaDropdown columns={item.columns} /> : null}
        {item.children ? <SimpleDropdown items={item.children} /> : null}
      </div>
    </div>
  );
}

export function DesktopNav() {
  const [location] = useLocation();
  const { content } = useSiteContentSafe();
  const nav = getMainNav(content);

  return (
    <nav
      className="hidden min-w-0 flex-1 flex-nowrap items-stretch justify-center gap-3 xl:flex 2xl:gap-4"
      aria-label="Menu chính"
    >
      {nav.map((item) => (
        <NavEntry key={item.label} item={item} location={location} />
      ))}
    </nav>
  );
}
