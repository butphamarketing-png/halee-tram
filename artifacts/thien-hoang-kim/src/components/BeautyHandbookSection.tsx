import { Link } from "wouter";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/layout/SectionHeading";
import type { SiteArticle } from "@/types/site-content";

type BeautyHandbookSectionProps = {
  articles: SiteArticle[];
  title: string;
  viewAllLabel: string;
  viewAllHref: string;
};

function ArticleCard({ article }: { article: SiteArticle }) {
  const href = `/tin-tuc/${article.slug}`;

  return (
    <Link href={href} className="luxury-card group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl p-2 sm:p-3">
      <div className="relative mb-3 overflow-hidden rounded-xl md:mb-4">
        <img
          src={article.image}
          alt={article.title}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[9px] font-bold tracking-widest text-primary-foreground shadow-sm sm:px-4 sm:py-1.5 sm:text-[10px]">
          {article.category.toUpperCase()}
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold tracking-wider text-muted-foreground sm:text-xs">
          <Calendar className="h-3.5 w-3.5 shrink-0 text-primary" />
          <span className="truncate">{article.date}</span>
        </div>
        <h3 className="mb-2 line-clamp-2 font-serif text-base font-bold leading-tight transition-colors group-hover:text-primary sm:text-lg md:text-xl">
          {article.title}
        </h3>
        <p className="mb-4 line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {article.description}
        </p>
        <span className="flex w-max items-center text-xs font-bold text-primary group-hover:underline sm:text-sm">
          XEM CHI TIẾT
          <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
  const visible = articles.filter((a) => a.published).slice(0, 6);

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
    <section id="cam-nang" className="section-surface-alt scroll-mt-24 border-y border-border/50 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8 flex flex-col items-center gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading title={title} align="left" className="md:mb-0" />
          <div className="hidden shrink-0 md:block">{viewAllButton}</div>
        </div>

        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-6 lg:gap-8">
          {visible.slice(0, 3).map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="min-w-0"
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">{viewAllButton}</div>
      </div>
    </section>
  );
}
