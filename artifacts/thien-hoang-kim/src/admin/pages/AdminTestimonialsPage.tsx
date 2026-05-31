import { Button } from "@/components/ui/button";
import { AdminField } from "@/admin/components/AdminField";
import { AdminImageField } from "@/admin/components/AdminImageField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { useSiteContent } from "@/context/SiteContentContext";

export function AdminTestimonialsPage() {
  const { content, updateContent } = useSiteContent();

  return (
    <div>
      <AdminSaveBar />
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-primary">Đánh giá khách hàng</h2>
        <Button
          type="button"
          onClick={() =>
            updateContent((p) => ({
              ...p,
              testimonials: [
                ...p.testimonials,
                { id: crypto.randomUUID(), name: "", initials: "", avatar: "", text: "" },
              ],
            }))
          }
        >
          + Thêm đánh giá
        </Button>
      </div>
      <div className="space-y-4">
        {content.testimonials.map((t, i) => (
          <div key={t.id} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-3 flex justify-between">
              <span className="font-semibold">{t.name || `#${i + 1}`}</span>
              <Button type="button" variant="ghost" size="sm" onClick={() => updateContent((p) => ({ ...p, testimonials: p.testimonials.filter((x) => x.id !== t.id) }))}>
                Xóa
              </Button>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <AdminField label="Tên" value={t.name} onChange={(v) => updateContent((p) => { const list = [...p.testimonials]; list[i] = { ...list[i], name: v }; return { ...p, testimonials: list }; })} />
              <AdminField label="Viết tắt" value={t.initials} onChange={(v) => updateContent((p) => { const list = [...p.testimonials]; list[i] = { ...list[i], initials: v }; return { ...p, testimonials: list }; })} />
              <AdminImageField label="Avatar" value={t.avatar} onChange={(v) => updateContent((p) => { const list = [...p.testimonials]; list[i] = { ...list[i], avatar: v }; return { ...p, testimonials: list }; })} />
              <div className="md:col-span-2">
                <AdminField label="Nội dung" value={t.text} onChange={(v) => updateContent((p) => { const list = [...p.testimonials]; list[i] = { ...list[i], text: v }; return { ...p, testimonials: list }; })} multiline />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
