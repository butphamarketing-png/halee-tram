import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
};

export function PageHero({ eyebrow, title, description, crumbs }: PageHeroProps) {
  return (
    <div className="page-hero-luxury py-12 md:py-16">
      <div className="container relative z-10 mx-auto px-4 md:px-8">
        {crumbs && crumbs.length > 0 && (
          <nav className="mb-4 flex flex-wrap items-center gap-1 text-xs text-muted-foreground md:text-sm">
            {crumbs.map((c, i) => (
              <span key={`${c.label}-${i}`} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
                {c.href ? (
                  <Link href={c.href} className="hover:text-primary">
                    {c.label}
                  </Link>
                ) : (
                  <span className="font-medium text-foreground">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary/70 sm:text-xs">{eyebrow}</p>
        )}
        <h1 className="font-vietnamese-serif mt-3 text-3xl font-semibold leading-tight text-primary md:text-4xl lg:text-[2.75rem]">
          {title}
        </h1>
        <div className="mt-4 flex items-center gap-2">
          <span className="h-px w-10 bg-gradient-to-r from-primary/40 to-transparent" />
          <span className="text-[8px] text-[#c9a227]/80">◆</span>
        </div>
        {description && (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
