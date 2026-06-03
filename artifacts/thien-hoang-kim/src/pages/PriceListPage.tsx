import { Link } from "wouter";
import { ArrowRight, Phone } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { PriceListGallery } from "@/components/PriceListGallery";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/context/SiteContentContext";
import { formatPhoneDisplay } from "@/lib/format-phone";

export default function PriceListPage() {
  const { content } = useSiteContent();
  const { priceList, settings } = content;

  const crumbs = [
    { label: "Trang chủ", href: "/" },
    { label: priceList.title },
  ];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Bảng giá"
        title={priceList.title}
        description={priceList.description}
        crumbs={crumbs}
      />

      <section className="container mx-auto px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-8 text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            {priceList.note}
          </p>

          <PriceListGallery images={priceList.images} />

          <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-[#e5d8ca] bg-white/80 px-5 py-8 text-center shadow-sm sm:mt-12 sm:flex-row sm:justify-between sm:px-8 sm:text-left">
            <div>
              <p className="font-serif text-lg font-semibold text-primary sm:text-xl">Cần tư vấn giá combo?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Gọi hotline hoặc đặt lịch online — xác nhận trong 15 phút.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/5"
              >
                <Phone className="h-4 w-4" />
                {formatPhoneDisplay(settings.phone)}
              </a>
              <Link href="/lien-he#dat-lich">
                <Button className="w-full rounded-full bg-primary font-bold sm:w-auto">
                  Đặt lịch ngay
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
