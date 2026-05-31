import { AdminField } from "@/admin/components/AdminField";
import { AdminImageField } from "@/admin/components/AdminImageField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { useSiteContent } from "@/context/SiteContentContext";

export function AdminSeoPage() {
  const { content, updateContent } = useSiteContent();
  const seo = content.settings.seo;

  const setSeo = (key: keyof typeof seo, value: string) => {
    updateContent((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        seo: { ...prev.settings.seo, [key]: value },
      },
    }));
  };

  return (
    <div>
      <AdminSaveBar />
      <h2 className="mb-2 font-serif text-2xl font-semibold text-primary">Quản lý SEO</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Tối ưu tiêu đề trang, mô tả và ảnh khi chia sẻ lên Google / Facebook.
      </p>
      <div className="grid max-w-3xl gap-4 rounded-xl border bg-white p-6 shadow-sm">
        <AdminField label="Tiêu đề trang (title)" value={seo.title} onChange={(v) => setSeo("title", v)} />
        <AdminField label="Mô tả (meta description)" value={seo.description} onChange={(v) => setSeo("description", v)} multiline />
        <AdminField label="Từ khóa (keywords)" value={seo.keywords} onChange={(v) => setSeo("keywords", v)} />
        <AdminImageField label="Ảnh chia sẻ (OG image)" value={seo.ogImage} onChange={(v) => setSeo("ogImage", v)} />
      </div>
    </div>
  );
}
