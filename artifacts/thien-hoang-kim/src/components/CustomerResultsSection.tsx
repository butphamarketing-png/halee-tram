import { useState } from "react";
import { motion } from "framer-motion";
import { Images } from "lucide-react";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CustomerAlbumDialog } from "@/components/CustomerAlbumDialog";

export type CustomerResultCase = {
  id?: string;
  label: string;
  cover: string;
  images: string[];
};

type CustomerResultsSectionProps = {
  cases: CustomerResultCase[];
};

export function CustomerResultsSection({ cases }: CustomerResultsSectionProps) {
  const [albumOpen, setAlbumOpen] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState<{ title: string; images: string[] } | null>(null);

  const openAlbum = (item: CustomerResultCase) => {
    const images = item.images?.length ? item.images : [item.cover];
    setActiveAlbum({ title: item.label, images });
    setAlbumOpen(true);
  };

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
        <SectionHeading
          eyebrow="Thư viện"
          title="THƯ VIỆN HÌNH ẢNH"
          subtitle="Album hình ảnh thực tế từ khách hàng và học viên — nhấn để xem chi tiết."
          className="mb-10 md:mb-12"
        />

        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {cases.map((item, i) => (
            <motion.button
              key={item.id ?? item.label}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              onClick={() => openAlbum(item)}
              className="group luxury-card card-hover-lift overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#f4ece1]">
                <img
                  src={item.cover}
                  alt={item.label}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#6e473b]/75 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-3">
                  <p className="font-serif text-sm font-semibold text-white md:text-base">{item.label}</p>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
                    <Images className="h-4 w-4" />
                  </span>
                </div>
                <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  {item.images.length} ảnh
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {activeAlbum && (
        <CustomerAlbumDialog
          open={albumOpen}
          onOpenChange={setAlbumOpen}
          title={activeAlbum.title}
          images={activeAlbum.images}
        />
      )}
    </section>
  );
}
