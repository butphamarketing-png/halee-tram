import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CustomerResultsSection } from "@/components/CustomerResultsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ExamProcessSection } from "@/components/ExamProcessSection";
import { useSiteContent } from "@/context/SiteContentContext";

export default function CustomersPage() {
  const { content } = useSiteContent();

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Khách hàng"
        title="Khách hàng thực tế"
        description="Hình ảnh trước – sau và đánh giá từ khách hàng đã trải nghiệm dịch vụ."
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Khách hàng" }]}
      />
      <CustomerResultsSection cases={content.customerCases} />
      <TestimonialsSection
        backgroundImage={content.home.testimonialsBackground}
        items={content.testimonials}
      />
      <ExamProcessSection steps={content.processSteps} />
    </SiteLayout>
  );
}
