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
        title="Đội ngũ bác sĩ"
        description="Bác sĩ chuyên môn cao, tận tâm và giàu kinh nghiệm trong lĩnh vực thẩm mỹ."
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Giới thiệu", href: "/gioi-thieu" },
          { label: "Đội ngũ bác sĩ" },
        ]}
      />
      <DoctorTeamSection doctors={content.doctors} />
    </SiteLayout>
  );
}
