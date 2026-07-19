import { Link, useRoute } from "wouter";
import { Calendar } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { RelatedLinks } from "@/components/RelatedLinks";
import { RichParagraph } from "@/components/RichParagraph";
import { SeoBreadcrumbs } from "@/components/SeoBreadcrumbs";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/context/SiteContentContext";
import { suggestInternalLinks } from "@/lib/seo-internal-links";
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
  const imgLine = /^!\[([^\]]*)\]\(([^)]+)\)\s*$/;
  const related = suggestInternalLinks(article, content, 8);

  return (
    <SiteLayout>
      <article className="container mx-auto max-w-3xl px-4 py-10 md:px-8 md:py-14">
        <SeoBreadcrumbs
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Tin tức", href: "/tin-tuc" },
            { label: article.title },
          ]}
        />
        <p className="text-xs font-bold uppercase tracking-widest text-primary">{article.category}</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-primary md:text-4xl">{article.title}</h1>
        <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          <time dateTime={article.date}>{article.date}</time>
        </p>
        {article.image && (
          <img src={article.image} alt={article.title} className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover shadow-lg" />
        )}
        <p className="mt-8 text-lg font-medium leading-relaxed text-foreground/90">{article.description}</p>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-foreground/85">
          {paragraphs.map((para, idx) => {
            const m = para.match(imgLine);
            if (m) {
              return (
                <figure key={`img-${idx}`} className="my-6">
                  <img
                    src={m[2]}
                    alt={m[1] || article.title}
                    className="w-full rounded-2xl object-cover shadow-md"
                  />
                </figure>
              );
            }
            return <RichParagraph key={`p-${idx}-${para.slice(0, 24)}`} text={para} />;
          })}
        </div>
        {article.faqs && article.faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-xl font-semibold text-primary">Câu hỏi thường gặp</h2>
            <dl className="mt-4 space-y-4">
              {article.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-medium text-foreground">{faq.question}</dt>
                  <dd className="mt-1 text-foreground/85">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        <RelatedLinks items={related} />
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
