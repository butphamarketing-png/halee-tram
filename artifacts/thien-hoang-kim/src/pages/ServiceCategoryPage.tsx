import { Link } from "wouter";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { useSiteContent } from "@/context/SiteContentContext";
import { getServiceCatalog, getServiceHref } from "@/lib/site-cms";
import type { SiteServiceCategoryId } from "@/types/site-content";
import { DEFAULT_HERO_IMAGE } from "@/data/pages.defaults";

type ServiceCategoryPageProps = {
  categoryId: SiteServiceCategoryId;
};

export default function ServiceCategoryPage({ categoryId }: ServiceCategoryPageProps) {
  const { content } = useSiteContent();
  const catalog = getServiceCatalog(content);
  const category = catalog.categories[categoryId];
  const items = catalog.items[categoryId];

  return (
    <SiteLayout>
      <PageHero
        eyebrow={category.eyebrow}
        title={category.title}
        description={category.description}
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Dịch vụ", href: "/dich-vu" },
          { label: category.title },
        ]}
      />
      <div className="section-surface-alt container mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:gap-6">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={getServiceHref(catalog, categoryId, item.slug)}
              className="service-card-luxury group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-primary/5">
                <img
                  src={DEFAULT_HERO_IMAGE}
                  alt={item.label}
                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a261c]/80 via-[#0a261c]/10 to-transparent" />
              </div>
              <div className="bg-gradient-to-r from-primary to-[#5a3a30] px-3 py-3.5 text-center sm:px-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white sm:text-xs md:text-sm">
                  {item.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
