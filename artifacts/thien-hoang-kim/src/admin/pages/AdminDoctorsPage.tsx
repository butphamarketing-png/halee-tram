import { Button } from "@/components/ui/button";
import { AdminField } from "@/admin/components/AdminField";
import { AdminImageField } from "@/admin/components/AdminImageField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { useSiteContent } from "@/context/SiteContentContext";

export function AdminDoctorsPage() {
  const { content, updateContent } = useSiteContent();

  return (
    <div>
      <AdminSaveBar />
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-primary">Đội ngũ bác sĩ</h2>
        <Button
          type="button"
          onClick={() =>
            updateContent((p) => ({
              ...p,
              doctors: [
                ...p.doctors,
                { id: crypto.randomUUID(), img: "", name: "", spec: "", exp: "", bio: "" },
              ],
            }))
          }
        >
          + Thêm bác sĩ
        </Button>
      </div>
      <div className="space-y-4">
        {content.doctors.map((d, i) => (
          <div key={d.id} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-3 flex justify-between">
              <span className="font-semibold">{d.name || `Bác sĩ ${i + 1}`}</span>
              <Button type="button" variant="ghost" size="sm" onClick={() => updateContent((p) => ({ ...p, doctors: p.doctors.filter((x) => x.id !== d.id) }))}>
                Xóa
              </Button>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <AdminImageField label="Ảnh" value={d.img} onChange={(v) => updateContent((p) => { const list = [...p.doctors]; list[i] = { ...list[i], img: v }; return { ...p, doctors: list }; })} />
              <AdminField label="Họ tên" value={d.name} onChange={(v) => updateContent((p) => { const list = [...p.doctors]; list[i] = { ...list[i], name: v }; return { ...p, doctors: list }; })} />
              <AdminField label="Chuyên khoa" value={d.spec} onChange={(v) => updateContent((p) => { const list = [...p.doctors]; list[i] = { ...list[i], spec: v }; return { ...p, doctors: list }; })} />
              <AdminField label="Kinh nghiệm" value={d.exp} onChange={(v) => updateContent((p) => { const list = [...p.doctors]; list[i] = { ...list[i], exp: v }; return { ...p, doctors: list }; })} />
              <div className="md:col-span-2">
                <AdminField label="Giới thiệu" value={d.bio} onChange={(v) => updateContent((p) => { const list = [...p.doctors]; list[i] = { ...list[i], bio: v }; return { ...p, doctors: list }; })} multiline />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
