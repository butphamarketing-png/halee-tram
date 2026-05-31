import { Button } from "@/components/ui/button";
import { AdminField } from "@/admin/components/AdminField";
import { AdminImageField } from "@/admin/components/AdminImageField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { useSiteContent } from "@/context/SiteContentContext";

export function AdminArticlesPage() {
  const { content, updateContent } = useSiteContent();

  return (
    <div>
      <AdminSaveBar />
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-primary">Bài viết / Cẩm nang</h2>
        <Button
          type="button"
          onClick={() =>
            updateContent((p) => ({
              ...p,
              articles: [
                ...p.articles,
                {
                  id: crypto.randomUUID(),
                  image: "",
                  title: "Bài viết mới",
                  date: new Date().toLocaleDateString("vi-VN"),
                  description: "",
                },
              ],
            }))
          }
        >
          + Thêm bài
        </Button>
      </div>
      <div className="space-y-4">
        {content.articles.map((a, i) => (
          <div key={a.id} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-3 flex justify-between">
              <span className="font-semibold">#{i + 1}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => updateContent((p) => ({ ...p, articles: p.articles.filter((x) => x.id !== a.id) }))}
              >
                Xóa
              </Button>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <AdminImageField label="Ảnh" value={a.image} onChange={(v) => updateContent((p) => { const list = [...p.articles]; list[i] = { ...list[i], image: v }; return { ...p, articles: list }; })} />
              <AdminField label="Ngày" value={a.date} onChange={(v) => updateContent((p) => { const list = [...p.articles]; list[i] = { ...list[i], date: v }; return { ...p, articles: list }; })} />
              <AdminField label="Tiêu đề" value={a.title} onChange={(v) => updateContent((p) => { const list = [...p.articles]; list[i] = { ...list[i], title: v }; return { ...p, articles: list }; })} />
              <AdminField label="Mô tả" value={a.description} onChange={(v) => updateContent((p) => { const list = [...p.articles]; list[i] = { ...list[i], description: v }; return { ...p, articles: list }; })} multiline />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
