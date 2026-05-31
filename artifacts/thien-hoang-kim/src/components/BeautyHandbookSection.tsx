import { useCallback, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SiteArticle } from "@/types/site-content";

type BeautyHandbookSectionProps = {
  articles: SiteArticle[];
  title: string;
  viewAllLabel: string;
  viewAllHref: string;
};

function ArticleCard({
  article,
  compact,
}: {
  article: SiteArticle;
  compact?: boolean;
}) {
  const href = `/tin-tuc/${article.slug}`;

  return (
    <Link href={href} className="group flex h-full min-w-0 flex-col">
      <div
        className={cn(
          "relative overflow-hidden rounded-xl shadow-md",
          compact ? "mb-2 rounded-lg" : "mb-3 rounded-2xl md:mb-5 md:rounded-3xl",
        )}
      >
        <img
          src={article.image}
          alt={article.title}
          className={cn(
            "w-full object-cover transition-transform duration-700 group-hover:scale-105",
            compact ? "aspect-[3/4]" : "aspect-[4/3]",
          )}
        />
        <div
          className={cn(
            "absolute left-2 top-2 rounded-full bg-primary font-bold tracking-widest text-primary-foreground shadow-sm",
            compact
              ? "px-2 py-0.5 text-[7px]"
              : "left-3 top-3 px-3 py-1 text-[9px] sm:left-4 sm:top-4 sm:px-4 sm:py-1.5 sm:text-[10px]",
          )}
        >
          {article.category.toUpperCase()}
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div
          className={cn(
            "mb-1 flex items-center gap-1 font-semibold tracking-wider text-muted-foreground",
            compact ? "text-[8px]" : "mb-2 gap-2 text-[10px] sm:text-xs",
          )}
        >
          <Calendar className={cn("shrink-0 text-primary", compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5")} />
          <span className="truncate">{article.date}</span>
        </div>
        <h3
          className={cn(
            "font-serif font-bold leading-tight transition-colors group-hover:text-primary",
            compact
              ? "mb-1 line-clamp-3 text-[10px]"
              : "mb-2 text-base sm:text-lg md:text-xl",
          )}
        >
          {article.title}
        </h3>
        {!compact && (
          <p className="mb-3 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm md:mb-5">
            {article.description}
          </p>
        )}
        <span
          className={cn(
            "flex w-max items-center font-bold text-primary group-hover:underline",
            compact ? "text-[8px]" : "text-xs sm:text-sm",
          )}
        >
          XEM CHI TIẾT
          <ArrowRight className={cn(compact ? "ml-0.5 h-2.5 w-2.5" : "ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4")} />
        </span>
      </div>
    </Link>
  );
}

export function BeautyHandbookSection({
  articles,
  title,
  viewAllLabel,
  viewAllHref,
}: BeautyHandbookSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const visible = articles.filter((a) => a.published).slice(0, 6);

  const scroll = useCallback((direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  }, []);

  const arrowClass =
    "customer-carousel-arrow hidden h-9 w-9 shrink-0 rounded-full border-primary/20 bg-white text-primary hover:bg-primary hover:text-white sm:h-10 sm:w-10 md:flex";

  const viewAllButton = (
    <Link href={viewAllHref}>
      <Button className="group h-11 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90 md:h-auto md:px-8">
        {viewAllLabel}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </Link>
  );

  if (!visible.length) return null;

  return (
    <section id="cam-nang" className="scroll-mt-24 border-y border-border bg-white py-10 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="mb-6 text-center font-serif text-2xl font-semibold md:mb-10 md:hidden">{title}</h2>

        <div className="mb-8 hidden md:mb-10 md:flex md:items-center md:justify-between md:gap-6">
          <h2 className="font-serif text-5xl font-semibold">{title}</h2>
          {viewAllButton}
        </div>

        <div className="mb-6 grid grid-cols-3 gap-2 sm:gap-2.5 md:hidden">
          {visible.slice(0, 3).map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="min-w-0"
            >
              <ArticleCard article={article} compact />
            </motion.div>
          ))}
        </div>

        <div className="mb-6 flex justify-center md:hidden">{viewAllButton}</div>

        <div className="hidden items-center gap-6 md:flex">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => scroll(-1)}
            className={arrowClass}
            aria-label="Bài viết trước"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div ref={trackRef} className="flex min-w-0 flex-1 gap-6 overflow-visible">
            {visible.map((article, i) => (
              <motion.div
                key={article.id}
                data-handbook-card
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="min-w-0 flex-1 shrink"
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => scroll(1)}
            className={arrowClass}
            aria-label="Bài viết tiếp theo"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
