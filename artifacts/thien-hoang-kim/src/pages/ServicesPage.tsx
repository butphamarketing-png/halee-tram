import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { MAIN_NAV } from "@/config/navigation";
import { SERVICE_CATEGORIES } from "@/data/services-catalog";

export default function ServicesPage() {
  const servicesNav = MAIN_NAV.find((n) => n.href === "/dich-vu");
  const categoryPaths = [SERVICE_CATEGORIES["tham-my"].path, SERVICE_CATEGORIES.spa.path];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Dịch vụ"
        title="Dịch vụ thẩm mỹ"
        description="Giải pháp thẩm mỹ y khoa và spa chăm sóc da chuyên sâu."
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Dịch vụ" }]}
      />
      <div className="container mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          {servicesNav?.columns?.map((col, index) => (
            <div key={col.title} className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between gap-3 border-b border-border pb-3">
                <h2 className="font-serif text-xl font-semibold text-primary">{col.title}</h2>
                <Link
                  href={categoryPaths[index] ?? "/dich-vu"}
                  className="shrink-0 text-xs font-semibold uppercase tracking-wide text-primary hover:underline"
                >
                  Xem tất cả
                </Link>
              </div>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-primary/5 hover:text-primary"
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
