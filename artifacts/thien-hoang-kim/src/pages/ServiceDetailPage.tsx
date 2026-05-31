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

  const title = article?.title ?? service.label;
  const description =
    article?.description ??
    service.description ??
    `Tư vấn và điều trị ${service.label.toLowerCase()} an toàn, hiệu quả tại Thiên Hoàng Kim.`;
  const image = article?.image ?? DEFAULT_HERO_IMAGE;
  const body =
    article?.body ??
    `Dịch vụ ${service.label} được thực hiện bởi bác sĩ có chứng chỉ hành nghề, quy trình vô trùng và theo dõi sau điều trị.

Khách hàng được thăm khám, phân tích và lên phác đồ cá nhân trước khi tiến hành.

Đặt lịch tư vấn miễn phí để được bác sĩ đánh giá tình trạng và báo giá chi tiết.`;

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
