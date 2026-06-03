import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CustomerResultsSection } from "@/components/CustomerResultsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { useSiteContent } from "@/context/SiteContentContext";

export default function CustomersPage() {
  const { content } = useSiteContent();

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Thư viện"
        title="Thư Viện Hình Ảnh"
        description="Album hình ảnh thực tế và đánh giá từ khách hàng đã trải nghiệm dịch vụ."
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Thư viện hình ảnh" }]}
      />
      <CustomerResultsSection cases={content.customerCases} />
      <TestimonialsSection
        backgroundImage={content.home.testimonialsBackground}
        items={content.testimonials}
      />
    </SiteLayout>
  );
}
