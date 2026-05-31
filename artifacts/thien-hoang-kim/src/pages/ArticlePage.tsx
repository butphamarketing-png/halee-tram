import { Link, useRoute } from "wouter";
import { Calendar } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/context/SiteContentContext";
import NotFound from "@/pages/not-found";

export default function ArticlePage() {
  const { content } = useSiteContent();
  const [, params] = useRoute("/tin-tuc/:slug");
  const slug = params?.slug;

  const article = content.articles.find((a) => a.slug === slug && a.published);

  if (!article) {
    return <NotFound />;
  }

  const paragraphs = article.body.split(/\n\n+/).filter(Boolean);

  return (
    <SiteLayout>
      <article className="container mx-auto max-w-3xl px-4 py-10 md:px-8 md:py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">{article.category}</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-primary md:text-4xl">{article.title}</h1>
        <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          {article.date}
        </p>
        {article.image && (
          <img src={article.image} alt={article.title} className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover shadow-lg" />
        )}
        <p className="mt-8 text-lg font-medium leading-relaxed text-foreground/90">{article.description}</p>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-foreground/85">
          {paragraphs.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/lien-he#dat-lich">
            <Button className="rounded-full bg-primary font-bold">Đặt lịch tư vấn</Button>
          </Link>
          <Link href="/tin-tuc">
            <Button type="button" variant="outline" className="rounded-full">
              Xem bài viết khác
            </Button>
          </Link>
        </div>
      </article>
    </SiteLayout>
  );
}
