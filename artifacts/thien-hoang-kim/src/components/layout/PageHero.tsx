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
    <div className="border-b border-border bg-gradient-to-b from-[#f4f8f5] to-white py-10 md:py-14">
      <div className="container mx-auto px-4 md:px-8">
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
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80">{eyebrow}</p>
        )}
        <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight text-primary md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
