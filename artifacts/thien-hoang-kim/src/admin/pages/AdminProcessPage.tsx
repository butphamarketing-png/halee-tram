import { Button } from "@/components/ui/button";
import { AdminField } from "@/admin/components/AdminField";
import { AdminImageField } from "@/admin/components/AdminImageField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { useSiteContent } from "@/context/SiteContentContext";

export function AdminProcessPage() {
  const { content, updateContent } = useSiteContent();

  return (
    <div>
      <AdminSaveBar />
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-primary">Quy trình thăm khám</h2>
        <Button
          type="button"
          onClick={() =>
            updateContent((p) => ({
              ...p,
              processSteps: [
                ...p.processSteps,
                { id: crypto.randomUUID(), title: "", desc: "", image: "" },
              ],
            }))
          }
        >
          + Thêm bước
        </Button>
      </div>
      <div className="space-y-4">
        {content.processSteps.map((s, i) => (
          <div key={s.id} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-3 flex justify-between">
              <span className="font-semibold">Bước {i + 1}</span>
              <Button type="button" variant="ghost" size="sm" onClick={() => updateContent((p) => ({ ...p, processSteps: p.processSteps.filter((x) => x.id !== s.id) }))}>
                Xóa
              </Button>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <AdminField label="Tiêu đề" value={s.title} onChange={(v) => updateContent((p) => { const list = [...p.processSteps]; list[i] = { ...list[i], title: v }; return { ...p, processSteps: list }; })} />
              <AdminImageField label="Ảnh" value={s.image} onChange={(v) => updateContent((p) => { const list = [...p.processSteps]; list[i] = { ...list[i], image: v }; return { ...p, processSteps: list }; })} />
              <div className="md:col-span-2">
                <AdminField label="Mô tả" value={s.desc} onChange={(v) => updateContent((p) => { const list = [...p.processSteps]; list[i] = { ...list[i], desc: v }; return { ...p, processSteps: list }; })} multiline />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
