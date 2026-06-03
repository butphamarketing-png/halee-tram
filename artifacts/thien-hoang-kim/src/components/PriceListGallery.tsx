import { useState } from "react";
import { motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SitePriceListImage } from "@/types/site-content";
import { cn } from "@/lib/utils";

type PriceListGalleryProps = {
  images: SitePriceListImage[];
};

export function PriceListGallery({ images }: PriceListGalleryProps) {
  const [active, setActive] = useState<SitePriceListImage | null>(null);

  if (!images.length) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-white/60 px-6 py-12 text-center text-muted-foreground">
        Bảng giá đang được cập nhật. Vui lòng gọi hotline để được tư vấn.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-10">
        {images.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
            onClick={() => setActive(item)}
            className="group relative w-full overflow-hidden rounded-2xl border border-[#e5d8ca] bg-white text-left shadow-[0_8px_32px_rgba(110,71,59,0.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(110,71,59,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f4ece1] sm:aspect-[2/3]">
              <img
                src={item.src}
                alt={item.alt || item.title}
                className="h-full w-full object-contain object-center p-2 transition duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#6e473b]/25 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-primary shadow-md opacity-0 transition group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </span>
            </div>
            <div className="border-t border-[#e5d8ca]/80 px-4 py-3 sm:px-5 sm:py-4">
              <p className="font-serif text-base font-semibold text-primary sm:text-lg">{item.title}</p>
              {item.category && (
                <p className="mt-0.5 text-xs uppercase tracking-wider text-[#c9a66b]">{item.category}</p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">Bấm để xem phóng to</p>
            </div>
          </motion.button>
        ))}
      </div>

      <Dialog open={Boolean(active)} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent
          className={cn(
            "max-h-[96vh] w-[min(96vw,920px)] gap-0 overflow-hidden rounded-2xl border-[#e5d8ca] p-0",
          )}
        >
          <div className="flex items-center justify-between border-b border-border bg-[#f4ece1]/50 px-4 py-3 sm:px-5">
            <DialogTitle className="font-serif text-base font-semibold text-primary sm:text-lg">
              {active?.title}
            </DialogTitle>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="rounded-full p-1.5 text-muted-foreground transition hover:bg-white hover:text-primary"
              aria-label="Đóng"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="max-h-[calc(96vh-56px)] overflow-auto bg-[#f4ece1]/30 p-3 sm:p-5">
            {active && (
              <img
                src={active.src}
                alt={active.alt || active.title}
                className="mx-auto h-auto w-full max-w-full rounded-xl object-contain shadow-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
