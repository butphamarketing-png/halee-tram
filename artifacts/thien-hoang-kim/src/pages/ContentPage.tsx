import { Link, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { getPageContent } from "@/data/pages.defaults";
import NotFound from "@/pages/not-found";

export default function ContentPage() {
  const [location] = useLocation();
  const page = getPageContent(location.split("#")[0]);

  if (!page) return <NotFound />;

  const crumbs = [
    { label: "Trang chủ", href: "/" },
    { label: page.title },
  ];

  return (
    <SiteLayout>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} crumbs={crumbs} />
      <div className="container mx-auto px-4 py-10 sm:px-6 md:px-8 md:py-16">
        <div className="mx-auto max-w-3xl space-y-8 md:space-y-10">
          {page.blocks.map((block, i) => (
            <div key={i}>
              {block.title && (
                <h2 className="mb-4 font-serif text-2xl font-semibold text-primary">{block.title}</h2>
              )}
              {block.paragraphs.map((para) => (
                <p key={para.slice(0, 30)} className="mb-4 text-base leading-relaxed text-foreground/85">
                  {para}
                </p>
              ))}
            </div>
          ))}
          <Link href="/lien-he#dat-lich">
            <Button className="rounded-full bg-primary font-bold">
              Đặt lịch tư vấn miễn phí
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
