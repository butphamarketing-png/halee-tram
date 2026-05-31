import { Link } from "wouter";
import { ArrowRight, Calendar } from "lucide-react";
import { HeaderBrand } from "@/components/HeaderBrand";
import { useSiteContent } from "@/context/SiteContentContext";

export default function ArticlesListPage() {
  const { content, loading } = useSiteContent();
  const published = content.articles.filter((a) => a.published);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-4 md:px-8">
          <Link href="/">
            <HeaderBrand variant="header" />
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:px-8 md:py-16">
        <h1 className="font-serif text-4xl font-semibold text-primary md:text-5xl">
          {content.handbook.title}
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Kiến thức thẩm mỹ, tin tức và mẹo chăm sóc da từ đội ngũ Thiên Hoàng Kim.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

        <p className="mt-10 text-center">
          <Link href="/" className="text-sm font-semibold text-primary hover:underline">
            ← Về trang chủ
          </Link>
        </p>
      </main>
    </div>
  );
}
