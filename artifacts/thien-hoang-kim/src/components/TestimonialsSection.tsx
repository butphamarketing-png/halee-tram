import { useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { scrollCarouselLoop } from "@/lib/infinite-scroll";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { cn } from "@/lib/utils";

export type Testimonial = {
  name: string;
  initials: string;
  text: string;
  avatar: string;
};

type TestimonialsSectionProps = {
  items: Testimonial[];
  backgroundImage?: string;
};

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="card-hover-lift flex h-full min-w-0 flex-col rounded-2xl border border-border bg-white p-3.5 shadow-sm sm:p-4 lg:rounded-[1.75rem] lg:p-6">
      <div className="mb-2 flex items-center gap-2.5 lg:mb-4 lg:gap-3">
        <Avatar className="h-9 w-9 shrink-0 ring-2 ring-primary/15 ring-offset-2 ring-offset-white sm:h-10 sm:w-10 lg:h-12 lg:w-12">
          <AvatarImage src={t.avatar} alt={t.name} className="object-cover" />
          <AvatarFallback className="bg-secondary/60 text-xs font-bold text-primary lg:text-sm">
            {t.initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 text-left">
          <p className="truncate text-xs font-bold text-foreground lg:text-sm">{t.name}</p>
          <p className="text-[10px] text-muted-foreground lg:text-[11px]">Khách hàng VIP</p>
          <div className="mt-0.5 text-xs tracking-wide text-amber-400 lg:mt-1 lg:text-sm" aria-label="5 sao">
            ★★★★★
          </div>
        </div>
      </div>
      <p className="flex-1 text-[10px] italic leading-relaxed text-foreground/80 sm:text-[11px] lg:text-sm">
        &ldquo;{t.text}&rdquo;
      </p>
    </article>
  );
}

export function TestimonialsSection({ items, backgroundImage }: TestimonialsSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const isWide = window.matchMedia("(min-width: 1024px)").matches;
    const card = el.querySelector<HTMLElement>("[data-testimonial-card]");
    const step = isWide
      ? card
        ? card.offsetWidth + 16
        : el.clientWidth / Math.max(1, Math.min(4, items.length))
      : el.clientWidth;
    scrollCarouselLoop(el, direction, step);
  }, [items.length]);

  return (
    <section className="relative overflow-hidden bg-primary/5 py-16 pb-12 md:py-20 md:pb-16">
      {backgroundImage && (
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
          <img src={backgroundImage} className="h-full w-full object-cover" alt="" />
        </div>
      )}

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <SectionHeading
          title="KHÁCH HÀNG NÓI GÌ VỀ THIÊN HOÀNG KIM"
          subtitle="Hơn 10.000 khách hàng đã tin tưởng và lựa chọn"
          className="mb-8 md:mb-12"
        />

        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => scroll(-1)}
            className="customer-carousel-arrow h-9 w-9 shrink-0 rounded-full border-primary/20 bg-white text-primary hover:bg-primary hover:text-white sm:h-10 sm:w-10 lg:h-11 lg:w-11"
            aria-label="Đánh giá trước"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          <div
            ref={trackRef}
            className={cn(
              "flex min-w-0 flex-1 gap-3 overflow-x-auto scroll-smooth",
              "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              "snap-x snap-mandatory lg:gap-4 lg:snap-proximity",
            )}
          >
            {items.map((t, i) => (
              <motion.div
                key={t.name}
                data-testimonial-card
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={cn(
                  "w-[calc((100%-0.75rem)/2)] shrink-0 snap-start",
                  "lg:w-[calc((100%-3rem)/4)] lg:max-w-none lg:flex-none",
                )}
              >
                <TestimonialCard t={t} />
              </motion.div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => scroll(1)}
            className="customer-carousel-arrow h-9 w-9 shrink-0 rounded-full border-primary/20 bg-white text-primary hover:bg-primary hover:text-white sm:h-10 sm:w-10 lg:h-11 lg:w-11"
            aria-label="Đánh giá tiếp theo"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
