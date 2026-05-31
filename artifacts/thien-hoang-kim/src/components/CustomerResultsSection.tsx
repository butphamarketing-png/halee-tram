import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CustomerResultCase = {
  label: string;
  before: string;
  after: string;
};

type CustomerResultsSectionProps = {
  cases: CustomerResultCase[];
};

const SIDE_SIZE = "w-[min(38vw,168px)] sm:w-[190px] md:w-[210px] lg:w-[250px] xl:w-[280px]";
const CENTER_W = "w-[min(94vw,380px)] sm:w-[min(92vw,400px)] md:w-[360px] lg:w-[380px] xl:w-[400px]";
const CENTER_FRAME =
  "aspect-[3/4] md:aspect-auto md:h-[288px] lg:h-[304px] xl:h-[320px]";

function CarouselArrow({
  direction,
  onClick,
  className,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={onClick}
      className={cn(
        "customer-carousel-arrow h-11 w-11 shrink-0 rounded-full border-white/80 bg-white/95 text-primary backdrop-blur-sm",
        "transition-all duration-300 hover:border-gold/40 hover:bg-primary hover:text-white hover:shadow-[0_8px_28px_hsl(158_60%_25%_/_0.35)]",
        className,
      )}
      aria-label={direction === "prev" ? "Kết quả trước" : "Kết quả tiếp theo"}
    >
      <Icon className="h-5 w-5" strokeWidth={1.5} />
    </Button>
  );
}

function SideColumn({
  item,
  direction,
  onClick,
}: {
  item: CustomerResultCase;
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const fadeClass = direction === "prev" ? "customer-side-img-prev" : "customer-side-img-next";

  const square = (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-2xl bg-white",
        "shadow-[0_8px_28px_rgba(15,48,36,0.08)] ring-1 ring-primary/[0.09]",
        "opacity-90 transition-all duration-500 ease-out",
        "group-hover/sidecol:opacity-100 group-hover/sidecol:shadow-[0_14px_36px_rgba(15,48,36,0.14)] group-hover/sidecol:ring-primary/20",
        SIDE_SIZE,
      )}
    >
      <img
        src={item.before}
        alt=""
        className={cn(
          "h-full w-full object-cover transition duration-700 ease-out group-hover/sidecol:scale-[1.025]",
          fadeClass,
        )}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/25"
      />
    </button>
  );

  const title = (
    <p className="mt-3.5 text-center font-serif text-base font-semibold tracking-wide text-primary/70 transition-colors duration-300 group-hover/sidecol:text-primary md:text-lg">
      {item.label}
    </p>
  );

  if (direction === "prev") {
    return (
      <div className="group/sidecol hidden shrink-0 grid-cols-[auto_auto] gap-x-3 gap-y-0 md:grid">
        <CarouselArrow direction="prev" onClick={onClick} className="self-center" />
        {square}
        <div aria-hidden className="col-start-1" />
        <div className="col-start-2">{title}</div>
      </div>
    );
  }

  return (
    <div className="group/sidecol hidden shrink-0 grid-cols-[auto_auto] gap-x-3 gap-y-0 md:grid">
      {square}
      <CarouselArrow direction="next" onClick={onClick} className="self-center" />
      <div className="col-start-1">{title}</div>
      <div aria-hidden className="col-start-2" />
    </div>
  );
}

export function CustomerResultsSection({ cases }: CustomerResultsSectionProps) {
  const [index, setIndex] = useState(0);
  const total = cases.length;

  const go = (delta: number) => {
    setIndex((i) => (i + delta + total) % total);
  };

  const current = cases[index];
  const prev = cases[(index - 1 + total) % total];
  const next = cases[(index + 1 + total) % total];

  return (
    <section
      id="khach-hang"
      className="customer-results-bg relative scroll-mt-24 overflow-hidden border-t border-primary/[0.08] py-16 md:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-32 max-w-[50%] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/55 to-transparent"
      />

      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-12">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.38em] text-primary/55">
            Thực tế
          </p>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-primary md:text-[2.5rem] md:leading-tight">
            KHÁCH HÀNG THỰC TẾ
          </h2>
          <div className="mx-auto mt-4 flex items-center justify-center gap-3" aria-hidden>
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="h-1 w-1 rounded-full bg-gold/70" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-[15px]">
            Hàng nghìn khách hàng đã thay đổi diện mạo và tự tin hơn cùng Thiên Hoàng Kim.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-3 md:justify-between md:gap-6 lg:max-w-7xl lg:gap-10">
          <SideColumn item={prev} direction="prev" onClick={() => go(-1)} />

          <div className={cn("grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-3 md:block", CENTER_W)}>
            <CarouselArrow
              direction="prev"
              onClick={() => go(-1)}
              className="col-start-1 row-start-1 self-center md:hidden"
            />

            <div
              className={cn(
                "customer-center-luxury relative col-start-2 row-start-1 overflow-hidden rounded-2xl bg-primary/[0.04]",
                CENTER_FRAME,
              )}
            >
              <p className="pointer-events-none absolute inset-x-0 top-0 z-[2] bg-gradient-to-b from-black/65 via-black/20 to-transparent px-5 pb-10 pt-4 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-white/90 sm:text-xs">
                Trượt ngang để thấy sự thay đổi thần kỳ
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <BeforeAfterSlider
                    beforeSrc={current.before}
                    afterSrc={current.after}
                    demoOnScroll
                  />
                </motion.div>
              </AnimatePresence>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30"
              />
            </div>

            <CarouselArrow
              direction="next"
              onClick={() => go(1)}
              className="col-start-3 row-start-1 self-center md:hidden"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="col-start-2 row-start-2 mt-4 text-center"
              >
                <p className="font-serif text-lg font-semibold tracking-wide text-primary md:text-xl">
                  {current.label}
                </p>
                <div className="mx-auto mt-2 h-px w-8 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="col-start-2 row-start-3 mt-4 flex items-center justify-center gap-2.5">
              {cases.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === index
                      ? "customer-dot-active h-2 w-8"
                      : "h-1.5 w-1.5 bg-primary/18 hover:bg-primary/35",
                  )}
                  aria-label={`Kết quả ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <SideColumn item={next} direction="next" onClick={() => go(1)} />
        </div>
      </div>
    </section>
  );
}
