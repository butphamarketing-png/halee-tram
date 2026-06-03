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

export function AdminCustomersPage() {
  const { content, updateContent } = useSiteContent();

  return (
    <div>
      <AdminSaveBar />
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-primary">Thư viện hình ảnh</h2>
        <Button
          type="button"
          onClick={() =>
            updateContent((p) => ({
              ...p,
              customerCases: [
                ...p.customerCases,
                { id: crypto.randomUUID(), label: "", cover: "", images: [] },
              ],
            }))
          }
        >
          + Thêm album
        </Button>
      </div>
      <div className="space-y-4">
        {content.customerCases.map((c, i) => (
          <div key={c.id} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-3 flex justify-between">
              <span className="font-semibold">{c.label || `Album ${i + 1}`}</span>
              <Button type="button" variant="ghost" size="sm" onClick={() => updateContent((p) => ({ ...p, customerCases: p.customerCases.filter((x) => x.id !== c.id) }))}>
                Xóa
              </Button>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <AdminField label="Tên album" value={c.label} onChange={(v) => updateContent((p) => { const list = [...p.customerCases]; list[i] = { ...list[i], label: v }; return { ...p, customerCases: list }; })} />
              <AdminImageField label="Ảnh bìa" value={c.cover} onChange={(v) => updateContent((p) => { const list = [...p.customerCases]; list[i] = { ...list[i], cover: v }; return { ...p, customerCases: list }; })} />
              <div className="md:col-span-2">
                <AdminField
                  label="Ảnh trong album (mỗi URL một dòng)"
                  value={joinImageList(c.images)}
                  onChange={(v) =>
                    updateContent((p) => {
                      const list = [...p.customerCases];
                      list[i] = { ...list[i], images: parseImageList(v) };
                      return { ...p, customerCases: list };
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
