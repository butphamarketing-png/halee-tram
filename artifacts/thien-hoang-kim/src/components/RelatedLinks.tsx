import { Link } from "wouter";
import type { InternalLinkSuggestion } from "@/lib/seo-internal-links";

export function RelatedLinks({
  title = "Có thể bạn quan tâm",
  items,
}: {
  title?: string;
  items: InternalLinkSuggestion[];
}) {
  if (!items.length) return null;
  const services = items.filter((i) => i.kind === "service");
  const articles = items.filter((i) => i.kind === "article");

  return (
    <aside className="mt-12 rounded-2xl border border-primary/10 bg-secondary/30 p-6">
      <h2 className="font-serif text-xl font-semibold text-primary">{title}</h2>
      {services.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Dịch vụ liên quan</p>
          <ul className="mt-2 space-y-2">
            {services.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-base font-medium text-primary underline-offset-2 hover:underline">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {articles.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Bài viết liên quan</p>
          <ul className="mt-2 space-y-2">
            {articles.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-sm leading-snug text-foreground/85 underline-offset-2 hover:underline hover:text-primary">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
