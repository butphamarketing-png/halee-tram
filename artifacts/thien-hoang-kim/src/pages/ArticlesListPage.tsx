import { Link, useRoute } from "wouter";
import { ArrowRight, Calendar } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { useSiteContent } from "@/context/SiteContentContext";

export default function ArticlesListPage() {
  const { content } = useSiteContent();
  const [, paramsKienThuc] = useRoute("/tin-tuc/kien-thuc");
  const [, paramsTinTuc] = useRoute("/tin-tuc/tin-tuc");

  const categoryFilter = paramsKienThuc
    ? "Kiến thức"
    : paramsTinTuc
      ? "Tin tức"
      : undefined;

  const pageTitle = categoryFilter ?? content.handbook.title;
  const published = content.articles.filter(
    (a) => a.published && (!categoryFilter || a.category === categoryFilter),
  );

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Tin tức"
        title={pageTitle}
        description="Kiến thức thẩm mỹ, tin tức và mẹo chăm sóc da từ đội ngũ Thiên Hoàng Kim."
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Tin tức", href: "/tin-tuc" },
          ...(categoryFilter ? [{ label: categoryFilter }] : []),
        ]}
      />
      <div className="container mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/tin-tuc">
            <span className={`rounded-full px-4 py-1.5 text-sm font-semibold ${!categoryFilter ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
              Tất cả
            </span>
          </Link>
          {["Kiến thức", "Tin tức", "Dịch vụ", "Spa"].map((cat) => (
            <Link key={cat} href={cat === "Kiến thức" ? "/tin-tuc/kien-thuc" : cat === "Tin tức" ? "/tin-tuc/tin-tuc" : `/tin-tuc?cat=${encodeURIComponent(cat)}`}>
              <span className={`rounded-full px-4 py-1.5 text-sm font-semibold ${categoryFilter === cat ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                {cat}
              </span>
            </Link>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {published.map((article) => (
            <Link
              key={article.id}
              href={`/tin-tuc/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={article.image} alt={article.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground">
                  {article.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {article.date}
                </p>
                <h2 className="mt-2 font-serif text-lg font-bold leading-snug text-primary group-hover:underline">{article.title}</h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">{article.description}</p>
                <span className="mt-4 flex items-center text-sm font-bold text-primary">
                  Đọc tiếp
                  <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
