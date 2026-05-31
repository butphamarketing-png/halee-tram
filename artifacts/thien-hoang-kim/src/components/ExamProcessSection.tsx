import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useBookingDialog } from "@/context/BookingDialogContext";
import { cn } from "@/lib/utils";

export type ExamProcessStep = {
  title: string;
  desc: string;
  image: string;
};

type ExamProcessSectionProps = {
  steps: ExamProcessStep[];
};

export function ExamProcessSection({ steps }: ExamProcessSectionProps) {
  const { openBookingDialog } = useBookingDialog();

  return (
    <section className="border-t border-border bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="mb-3 font-serif text-3xl font-semibold text-primary md:mb-4 md:text-5xl">
            QUY TRÌNH THĂM KHÁM
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            Chuẩn Y Khoa – An Toàn – Cá Nhân Hóa – Hiệu Quả
          </p>
        </div>

        <div className="relative mt-10 md:mt-16">
          <div className="pointer-events-none absolute left-[8%] right-[8%] top-[52px] hidden h-px bg-border lg:block" />

          <ul className="grid grid-cols-3 gap-x-2 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:gap-x-5 lg:grid-cols-6 lg:gap-x-4 lg:gap-y-0">
            {steps.map((step, i) => (
              <li key={step.title} className="relative list-none">
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    delay: i * 0.22,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="card-hover-lift group flex flex-col items-center px-0.5 text-center sm:px-1"
                >
                  <div className="relative mb-3 sm:mb-4">
                    <div
                      className={cn(
                        "overflow-hidden rounded-full bg-muted shadow-md ring-2 ring-white",
                        "h-[72px] w-[72px] sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-[104px] lg:w-[104px]",
                        "transition-transform duration-300 group-hover:scale-[1.03]",
                      )}
                    >
                      <img
                        src={step.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.22 + 0.12, duration: 0.4 }}
                      className={cn(
                        "absolute -bottom-1.5 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full font-bold text-white shadow-md",
                        "h-7 w-7 text-[11px] sm:h-8 sm:w-8 sm:text-xs",
                        i === 2 ? "bg-primary" : "bg-primary/90",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.span>
                  </div>

                  <h3 className="mb-1.5 text-[9px] font-bold leading-tight text-foreground transition-colors group-hover:text-primary sm:mb-2 sm:text-[11px] md:text-xs lg:text-sm">
                    {step.title}
                  </h3>
                  <p className="text-[8px] leading-snug text-muted-foreground sm:text-[10px] md:text-xs lg:text-sm lg:leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 text-center md:mt-16">
          <Button
            type="button"
            size="lg"
            onClick={openBookingDialog}
            className="h-12 rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground shadow-xl hover:bg-primary/90 md:h-14 md:px-10 md:text-base"
          >
            <Calendar className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            ĐẶT LỊCH THĂM KHÁM NGAY
          </Button>
        </div>
      </div>
    </section>
  );
}
