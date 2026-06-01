import { useEffect, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { cn } from "@/lib/utils";

export type DoctorProfile = {
  img: string;
  name: string;
  spec: string;
  exp: string;
  bio: string;
};

type DoctorTeamSectionProps = {
  doctors: DoctorProfile[];
};

function useCardsPerView() {
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setPerView(3);
      else if (window.matchMedia("(min-width: 768px)").matches) setPerView(2);
      else setPerView(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return perView;
}

function TeamArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "customer-carousel-arrow h-11 w-11 shrink-0 rounded-full border-white/80 bg-white/95 text-primary backdrop-blur-sm",
        "transition-all duration-300 hover:border-gold/40 hover:bg-primary hover:text-white",
        "disabled:pointer-events-none disabled:opacity-35",
      )}
      aria-label={direction === "prev" ? "Bác sĩ trước" : "Bác sĩ tiếp theo"}
    >
      <Icon className="h-5 w-5" strokeWidth={1.5} />
    </Button>
  );
}

export function DoctorTeamSection({ doctors }: DoctorTeamSectionProps) {
  const perView = useCardsPerView();
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, doctors.length - perView);
  const canSlide = doctors.length > perView;

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const go = (delta: number) => {
    if (!canSlide) return;
    setIndex((i) => {
      const pages = maxIndex + 1;
      return (i + delta + pages) % pages;
    });
  };

  const visible = doctors.slice(index, index + perView);

  return (
    <section className="section-surface-alt border-t border-border/60 py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="Đội ngũ"
          title="ĐỘI NGŨ BÁC SĨ"
          subtitle="Đội ngũ bác sĩ giàu kinh nghiệm, chuyên môn cao và tận tâm với khách hàng."
          className="mb-12 md:mb-14"
        />

        <div
          className={cn(
            "mx-auto max-w-6xl",
            canSlide ? "flex items-center justify-center gap-4 md:gap-6" : "block",
          )}
        >
          {canSlide && <TeamArrow direction="prev" onClick={() => go(-1)} />}

          <div
            className={cn(
              "grid min-h-[420px] flex-1 gap-6 md:gap-8",
              !canSlide && "mx-auto",
              perView === 1 && "grid-cols-1",
              perView === 2 && "grid-cols-2",
              perView === 3 && "grid-cols-3",
            )}
          >
            <AnimatePresence mode="popLayout">
              {visible.map((doc) => (
                <motion.article
                  key={doc.name}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="card-hover-lift group flex flex-col items-center rounded-3xl border border-border bg-white p-8 text-center shadow-lg"
                >
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl transition-all group-hover:blur-2xl" />
                    <img
                      src={doc.img}
                      alt={doc.name}
                      className="relative z-10 h-48 w-48 rounded-full border-4 border-white object-cover shadow-md"
                    />
                  </div>
                  <h3 className="mb-1 font-serif text-2xl font-bold text-foreground">{doc.name}</h3>
                  <p className="mb-4 text-sm font-medium text-primary">{doc.spec}</p>
                  <div className="mb-4 flex w-full items-center justify-center gap-2 rounded-full bg-secondary/40 px-4 py-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span className="font-bold text-foreground/80">{doc.exp}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{doc.bio}&rdquo;</p>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {canSlide && <TeamArrow direction="next" onClick={() => go(1)} />}
        </div>

        {canSlide && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === index ? "customer-dot-active h-2 w-8" : "h-1.5 w-1.5 bg-primary/20 hover:bg-primary/35",
                )}
                aria-label={`Trang ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
