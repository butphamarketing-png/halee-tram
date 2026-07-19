import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export type SeoCrumb = { label: string; href?: string };

export function SeoBreadcrumbs({ items }: { items: SeoCrumb[] }) {
  if (items.length < 2) return null;
  return (
    <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1 text-xs text-muted-foreground md:text-sm">
      {items.map((c, i) => (
        <span key={`${c.label}-${i}`} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
          {c.href && i < items.length - 1 ? (
            <Link href={c.href} className="hover:text-primary">
              {c.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground/80">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
