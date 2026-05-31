import { Button } from "@/components/ui/button";
import { AdminField } from "@/admin/components/AdminField";
import { AdminImageField } from "@/admin/components/AdminImageField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { useSiteContent } from "@/context/SiteContentContext";

export function AdminCustomersPage() {
  const { content, updateContent } = useSiteContent();

  return (
    <div>
      <AdminSaveBar />
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-primary">Khách hàng thực tế</h2>
        <Button
          type="button"
          onClick={() =>
            updateContent((p) => ({
              ...p,
              customerCases: [
                ...p.customerCases,
                { id: crypto.randomUUID(), label: "", before: "", after: "" },
              ],
            }))
          }
        >
          + Thêm case
        </Button>
      </div>
      <div className="space-y-4">
        {content.customerCases.map((c, i) => (
          <div key={c.id} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-3 flex justify-between">
              <span className="font-semibold">{c.label || `Case ${i + 1}`}</span>
              <Button type="button" variant="ghost" size="sm" onClick={() => updateContent((p) => ({ ...p, customerCases: p.customerCases.filter((x) => x.id !== c.id) }))}>
                Xóa
              </Button>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <AdminField label="Tên dịch vụ" value={c.label} onChange={(v) => updateContent((p) => { const list = [...p.customerCases]; list[i] = { ...list[i], label: v }; return { ...p, customerCases: list }; })} />
              <AdminImageField label="Ảnh Before" value={c.before} onChange={(v) => updateContent((p) => { const list = [...p.customerCases]; list[i] = { ...list[i], before: v }; return { ...p, customerCases: list }; })} />
              <AdminImageField label="Ảnh After" value={c.after} onChange={(v) => updateContent((p) => { const list = [...p.customerCases]; list[i] = { ...list[i], after: v }; return { ...p, customerCases: list }; })} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
