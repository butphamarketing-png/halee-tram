import { Link } from "wouter";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import {
  SERVICE_CATEGORIES,
  SERVICE_ITEMS,
  getServiceHref,
  type ServiceCategoryId,
} from "@/data/services-catalog";
import { DEFAULT_HERO_IMAGE } from "@/data/pages.defaults";

type ServiceCategoryPageProps = {
  categoryId: ServiceCategoryId;
};

export default function ServiceCategoryPage({ categoryId }: ServiceCategoryPageProps) {
  const category = SERVICE_CATEGORIES[categoryId];
  const items = SERVICE_ITEMS[categoryId];

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
      <div className="container mx-auto px-4 py-10 md:px-8 md:py-14">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:gap-6">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={getServiceHref(categoryId, item.slug)}
              className="group overflow-hidden rounded-2xl border border-primary/15 bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-primary/5">
                <img
                  src={DEFAULT_HERO_IMAGE}
                  alt={item.label}
                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a261c]/75 via-transparent to-transparent" />
              </div>
              <div className="bg-primary px-3 py-3 text-center sm:px-4 sm:py-3.5">
                <p className="text-[11px] font-bold uppercase tracking-wide text-white sm:text-xs md:text-sm">
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
