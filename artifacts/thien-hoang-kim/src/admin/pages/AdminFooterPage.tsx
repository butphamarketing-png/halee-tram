import { Button } from "@/components/ui/button";
import { AdminField } from "@/admin/components/AdminField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { useSiteContent } from "@/context/SiteContentContext";
import type { SiteLink } from "@/types/site-content";

function LinkListEditor({
  title,
  links,
  onChange,
}: {
  title: string;
  links: SiteLink[];
  onChange: (links: SiteLink[]) => void;
}) {
  return (
    <section className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => onChange([...links, { label: "Liên kết mới", href: "/" }])}
        >
          + Thêm
        </Button>
      </div>
      <div className="space-y-3">
        {links.map((link, i) => (
          <div key={i} className="grid gap-2 rounded-lg border p-3 md:grid-cols-[1fr_1fr_auto]">
            <AdminField
              label="Nhãn"
              value={link.label}
              onChange={(v) => {
                const next = [...links];
                next[i] = { ...next[i], label: v };
                onChange(next);
              }}
            />
            <AdminField
              label="URL"
              value={link.href}
              onChange={(v) => {
                const next = [...links];
                next[i] = { ...next[i], href: v };
                onChange(next);
              }}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="self-end text-destructive"
              onClick={() => onChange(links.filter((_, j) => j !== i))}
            >
              Xóa
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AdminFooterPage() {
  const { content, updateContent } = useSiteContent();
  const f = content.footer;

  return (
    <div className="space-y-6">
      <AdminSaveBar />
      <h2 className="font-serif text-2xl font-semibold text-primary">Footer & liên kết</h2>

      <section className="rounded-xl border bg-white p-5 shadow-sm">
        <AdminField
          label="Bản quyền (dòng cuối footer)"
          value={f.copyright}
          onChange={(v) => updateContent((p) => ({ ...p, footer: { ...p.footer, copyright: v } }))}
        />
      </section>

      <section className="rounded-xl border bg-white p-5 shadow-sm">
        <AdminField
          label="Tiêu đề cột dịch vụ nổi bật"
          value={f.featuredTitle}
          onChange={(v) => updateContent((p) => ({ ...p, footer: { ...p.footer, featuredTitle: v } }))}
        />
      </section>

      <LinkListEditor
        title="Danh sách dịch vụ footer"
        links={f.featuredServices}
        onChange={(featuredServices) =>
          updateContent((p) => ({ ...p, footer: { ...p.footer, featuredServices } }))
        }
      />

      <section className="rounded-xl border bg-white p-5 shadow-sm">
        <AdminField
          label="Tiêu đề cột liên kết nhanh"
          value={f.quickLinksTitle}
          onChange={(v) => updateContent((p) => ({ ...p, footer: { ...p.footer, quickLinksTitle: v } }))}
        />
      </section>

      <LinkListEditor
        title="Danh sách liên kết nhanh"
        links={f.quickLinks}
        onChange={(quickLinks) => updateContent((p) => ({ ...p, footer: { ...p.footer, quickLinks } }))}
      />

      <section className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Dịch vụ form đặt lịch</h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              updateContent((p) => ({
                ...p,
                bookingServices: [...p.bookingServices, { value: `dv-${Date.now()}`, label: "Dịch vụ mới" }],
              }))
            }
          >
            + Thêm dịch vụ
          </Button>
        </div>
        <div className="space-y-3">
          {content.bookingServices.map((s, i) => (
            <div key={s.value} className="grid gap-2 rounded-lg border p-3 md:grid-cols-[1fr_1fr_auto]">
              <AdminField
                label="Mã (value)"
                value={s.value}
                onChange={(v) => {
                  const list = [...content.bookingServices];
                  list[i] = { ...list[i], value: v };
                  updateContent((p) => ({ ...p, bookingServices: list }));
                }}
              />
              <AdminField
                label="Tên hiển thị"
                value={s.label}
                onChange={(v) => {
                  const list = [...content.bookingServices];
                  list[i] = { ...list[i], label: v };
                  updateContent((p) => ({ ...p, bookingServices: list }));
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="self-end text-destructive"
                onClick={() =>
                  updateContent((p) => ({
                    ...p,
                    bookingServices: p.bookingServices.filter((_, j) => j !== i),
                  }))
                }
              >
                Xóa
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
