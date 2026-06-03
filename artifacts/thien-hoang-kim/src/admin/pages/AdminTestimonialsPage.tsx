import { Button } from "@/components/ui/button";
import { AdminField } from "@/admin/components/AdminField";
import { AdminImageField } from "@/admin/components/AdminImageField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { useSiteContent } from "@/context/SiteContentContext";

function parseImageList(raw: string): string[] {
  return raw
    .split(/\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function joinImageList(images: string[]): string {
  return images.join("\n");
}

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
                { id: crypto.randomUUID(), name: "", initials: "", avatar: "", text: "", albumImages: [] },
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
              <AdminImageField label="Ảnh preview (khung điện thoại)" value={t.avatar} onChange={(v) => updateContent((p) => { const list = [...p.testimonials]; list[i] = { ...list[i], avatar: v }; return { ...p, testimonials: list }; })} />
              <div className="md:col-span-2">
                <AdminField label="Mô tả (dưới tên)" value={t.text} onChange={(v) => updateContent((p) => { const list = [...p.testimonials]; list[i] = { ...list[i], text: v }; return { ...p, testimonials: list }; })} multiline />
              </div>
              <div className="md:col-span-2">
                <AdminField
                  label="Album ảnh (mỗi URL một dòng)"
                  value={joinImageList(t.albumImages)}
                  onChange={(v) =>
                    updateContent((p) => {
                      const list = [...p.testimonials];
                      list[i] = { ...list[i], albumImages: parseImageList(v) };
                      return { ...p, testimonials: list };
                    })
                  }
                  multiline
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
