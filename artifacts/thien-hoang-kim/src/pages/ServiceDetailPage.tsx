import { Link, useRoute } from "wouter";
import { Calendar } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/context/SiteContentContext";
import {
  SERVICE_CATEGORIES,
  getServiceItem,
  type ServiceCategoryId,
} from "@/data/services-catalog";
import { DEFAULT_HERO_IMAGE } from "@/data/pages.defaults";
import NotFound from "@/pages/not-found";

type ServiceDetailPageProps = {
  categoryId: ServiceCategoryId;
};

export default function ServiceDetailPage({ categoryId }: ServiceDetailPageProps) {
  const { content } = useSiteContent();
  const category = SERVICE_CATEGORIES[categoryId];
  const [, params] = useRoute(`${category.path}/:slug`);
  const slug = params?.slug ?? "";

  const service = getServiceItem(categoryId, slug);
  if (!service) return <NotFound />;

  const article = service.articleSlug
    ? content.articles.find((a) => a.slug === service.articleSlug && a.published)
    : undefined;

  const brand = content.settings.clinicName;
  const title = article?.title ?? service.label;
  const description =
    article?.description ??
    service.description ??
    `${service.label} tại ${brand} — tư vấn và đặt lịch qua hotline 0938 162 662.`;
  const image = article?.image ?? DEFAULT_HERO_IMAGE;
  const body =
    article?.body ??
    `Dịch vụ ${service.label} được thực hiện bởi chuyên viên có kinh nghiệm, quy trình vệ sinh chuẩn salon.

Khách hàng được tư vấn phong cách và thời gian làm phù hợp trước khi bắt đầu.

Đặt lịch trước để được phục vụ đúng giờ — liên hệ ${brand}.`;

  const paragraphs = body.split(/\n\n+/).filter(Boolean);

  return (
    <SiteLayout>
      <article className="container mx-auto max-w-3xl px-4 py-10 md:px-8 md:py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">{category.eyebrow}</p>
        <h1 className="mt-3 font-['Noto_Serif','Cormorant_Garamond',serif] text-3xl font-semibold leading-tight text-primary md:text-4xl">
          {title}
        </h1>
        {article?.date && (
          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            {article.date}
          </p>
        )}
        <img src={image} alt={title} className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover object-top shadow-lg" />
        <p className="mt-8 text-lg font-medium leading-relaxed text-foreground/90">{description}</p>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-foreground/85">
          {paragraphs.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/lien-he#dat-lich">
            <Button className="rounded-full bg-primary font-bold">Đặt lịch tư vấn</Button>
          </Link>
          <Link href={category.path}>
            <Button type="button" variant="outline" className="rounded-full">
              Xem dịch vụ khác
            </Button>
          </Link>
        </div>
      </article>
    </SiteLayout>
  );
}
