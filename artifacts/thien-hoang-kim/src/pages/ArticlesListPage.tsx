import { useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowRight, Calendar } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { useSiteContent } from "@/context/SiteContentContext";

const LISTING_COPY: Record<
  string,
  { title: string; description: string; crumbs: { label: string; href?: string }[] }
> = {
  all: {
    title: "Tin tức & Kiến thức làm đẹp",
    description: "Cẩm nang nails, nối mi, uốn mi và đào tạo nghề từ Halee Trâm Quận 7.",
    crumbs: [
      { label: "Trang chủ", href: "/" },
      { label: "Tin tức" },
    ],
  },
  "Kiến thức": {
    title: "Kiến thức làm đẹp",
    description: "Kiến thức chăm sóc nails, mi, chân mày và spa chân từ chuyên viên Halee Trâm.",
    crumbs: [
      { label: "Trang chủ", href: "/" },
      { label: "Tin tức", href: "/tin-tuc" },
      { label: "Kiến thức" },
    ],
  },
  "Tin tức": {
    title: "Tin tức Halee Trâm",
    description: "Cập nhật dịch vụ, ưu đãi và sự kiện tại Halee Trâm Quận 7.",
    crumbs: [
      { label: "Trang chủ", href: "/" },
      { label: "Tin tức", href: "/tin-tuc" },
      { label: "Tin tức salon" },
    ],
  },
};

/** Category pills that map to crawlable paths (no ?cat= thin URLs). */
const PATH_FILTERS = [
  { label: "Tất cả", href: "/tin-tuc", match: "all" as const },
  { label: "Kiến thức", href: "/tin-tuc/kien-thuc", match: "Kiến thức" as const },
  { label: "Tin tức", href: "/tin-tuc/tin-tuc", match: "Tin tức" as const },
];

export default function ArticlesListPage() {
  const { content } = useSiteContent();
  const [, paramsKienThuc] = useRoute("/tin-tuc/kien-thuc");
  const [, paramsTinTuc] = useRoute("/tin-tuc/tin-tuc");
  const [topicFilter, setTopicFilter] = useState<string | null>(null);

  const pathFilter = paramsKienThuc ? "Kiến thức" : paramsTinTuc ? "Tin tức" : "all";
  const copy = LISTING_COPY[pathFilter] ?? LISTING_COPY.all;

  const topicOptions = useMemo(() => {
    const set = new Set(
      content.articles.filter((a) => a.published).map((a) => a.category).filter(Boolean),
    );
    return [...set].filter((c) => c !== "Kiến thức" && c !== "Tin tức").sort();
  }, [content.articles]);

  const published = content.articles.filter((a) => {
    if (!a.published) return false;
    if (pathFilter !== "all" && a.category !== pathFilter) return false;
    if (topicFilter && a.category !== topicFilter) return false;
    return true;
  });

  return (
    <SiteLayout>
      <PageHero eyebrow="Tin tức" title={copy.title} description={copy.description} crumbs={copy.crumbs} />
      <div className="container mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="mb-4 flex flex-wrap gap-2">
          {PATH_FILTERS.map((f) => (
            <Link key={f.href} href={f.href}>
              <span
                className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                  pathFilter === f.match ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}
              >
                {f.label}
              </span>
            </Link>
          ))}
        </div>
        {pathFilter === "all" && topicOptions.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTopicFilter(null)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                !topicFilter ? "bg-primary/15 text-primary" : "bg-muted/70 text-muted-foreground"
              }`}
            >
              Chủ đề: tất cả
            </button>
            {topicOptions.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setTopicFilter(cat === topicFilter ? null : cat)}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  topicFilter === cat ? "bg-primary/15 text-primary" : "bg-muted/70 text-muted-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {published.map((article) => (
            <Link
              key={article.id}
              href={`/tin-tuc/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground">
                  {article.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {article.date}
                </p>
                <h2 className="mt-2 font-serif text-lg font-bold leading-snug text-primary group-hover:underline">
                  {article.title}
                </h2>
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
