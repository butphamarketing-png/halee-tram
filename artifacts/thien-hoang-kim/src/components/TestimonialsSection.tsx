import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CustomerAlbumDialog } from "@/components/CustomerAlbumDialog";
import { useSiteContent } from "@/context/SiteContentContext";
import type { TestimonialCategory } from "@/types/site-content";
import { cn } from "@/lib/utils";

export type Testimonial = {
  id?: string;
  name: string;
  initials: string;
  text: string;
  avatar: string;
  albumImages?: string[];
  category?: TestimonialCategory;
};

type TestimonialsSectionProps = {
  items: Testimonial[];
  backgroundImage?: string;
};

const CATEGORY_GROUPS: { key: TestimonialCategory; title: string; subtitle: string }[] = [
  {
    key: "student",
    title: "Feedback học viên",
    subtitle: "Học viên chia sẻ sau khi hoàn thành khóa học tại Halee Trâm",
  },
  {
    key: "service",
    title: "Feedback khách hàng làm dịch vụ",
    subtitle: "Khách hàng đánh giá sau khi sử dụng dịch vụ nails, mi tại studio",
  },
];

function PhonePreviewCard({
  previewSrc,
  headerName,
  category,
  onClick,
}: {
  previewSrc: string;
  headerName: string;
  category: TestimonialCategory;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group mx-auto w-full max-w-[240px] text-left transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
    >
      <div className="rounded-[1.75rem] border-[3px] border-[#2b2b2b] bg-[#2b2b2b] p-1.5 shadow-[0_12px_32px_rgba(110,71,59,0.18)] transition-shadow group-hover:shadow-[0_18px_40px_rgba(110,71,59,0.24)]">
        <div className="overflow-hidden rounded-[1.35rem] bg-white">
          <div className="flex items-center justify-between bg-[#6e473b] px-3 py-2 text-[10px] font-medium text-white">
            <span className="truncate">{headerName}</span>
            <span className="shrink-0 opacity-80">●●●</span>
          </div>
          <div className="relative bg-[#f4ece1]">
            <img
              src={previewSrc}
              alt={headerName}
              className="aspect-[9/14] w-full object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] font-medium text-primary/70 group-hover:text-primary">
        {category === "student" ? "Xem album học viên →" : "Xem album khách hàng →"}
      </p>
    </button>
  );
}

function TestimonialGrid({
  items,
  category,
  onOpenAlbum,
}: {
  items: Testimonial[];
  category: TestimonialCategory;
  onOpenAlbum: (item: Testimonial) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
      {items.map((t, i) => (
        <motion.div
          key={t.id ?? t.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="flex flex-col items-center"
        >
          <PhonePreviewCard
            previewSrc={t.avatar}
            headerName={t.name}
            category={category}
            onClick={() => onOpenAlbum(t)}
          />
          <div className={cn("mt-4 w-full max-w-[240px] text-center")}>
            <p className="font-serif text-base font-semibold text-primary md:text-lg">{t.name}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground md:text-sm">{t.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function TestimonialsSection({ items, backgroundImage }: TestimonialsSectionProps) {
  const clinicName = useSiteContent().content.settings.clinicName;
  const [albumOpen, setAlbumOpen] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState<{ title: string; images: string[] } | null>(null);

  const openAlbum = (item: Testimonial) => {
    const images = item.albumImages?.length ? item.albumImages : [item.avatar];
    setActiveAlbum({ title: item.name, images });
    setAlbumOpen(true);
  };

  return (
    <section className="relative overflow-hidden bg-primary/5 py-16 pb-12 md:py-20 md:pb-16">
      {backgroundImage && (
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
          <img src={backgroundImage} className="h-full w-full object-cover" alt="" />
        </div>
      )}

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <SectionHeading
          title={`KHÁCH HÀNG NÓI GÌ VỀ ${clinicName}`}
          subtitle="Nhấn vào từng ô để xem album hình ảnh"
          className="mb-10 md:mb-12"
        />

        <div className="space-y-14 md:space-y-16">
          {CATEGORY_GROUPS.map((group) => {
            const groupItems = items.filter((t) => (t.category ?? "service") === group.key);
            if (!groupItems.length) return null;

            return (
              <div key={group.key}>
                <div className="mb-8 text-center md:mb-10">
                  <h3 className="font-serif text-xl font-bold uppercase tracking-wide text-primary md:text-2xl">
                    {group.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">{group.subtitle}</p>
                </div>
                <TestimonialGrid items={groupItems} category={group.key} onOpenAlbum={openAlbum} />
              </div>
            );
          })}
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
