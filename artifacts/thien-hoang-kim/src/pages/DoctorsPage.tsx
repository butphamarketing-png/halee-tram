import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { DoctorTeamSection } from "@/components/DoctorTeamSection";
import { useSiteContent } from "@/context/SiteContentContext";

export default function DoctorsPage() {
  const { content } = useSiteContent();

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Giới thiệu"
        title="Đội ngũ nhân viên"
        description="Nhân viên nails, mi và đào tạo — tận tâm và giàu kinh nghiệm."
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Giới thiệu", href: "/gioi-thieu" },
          { label: "Đội ngũ nhân viên" },
        ]}
      />
      <DoctorTeamSection doctors={content.doctors} />
    </SiteLayout>
  );
}
