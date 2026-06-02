import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { AdminField } from "@/admin/components/AdminField";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useSiteContent } from "@/context/SiteContentContext";
import type { LuckyWheelSegment } from "@/types/site-content";

function SegmentsEditor({
  segments,
  onChange,
}: {
  segments: LuckyWheelSegment[];
  onChange: (next: LuckyWheelSegment[]) => void;
}) {
  return (
    <section className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Phần thưởng & tỷ lệ</h3>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() =>
            onChange([
              ...segments,
              { id: `w-${Date.now()}`, label: "Phần thưởng mới", color: "#c8a96e", weight: 10 },
            ])
          }
        >
          + Thêm
        </Button>
      </div>

      <div className="space-y-3">
        {segments.map((seg, i) => (
          <div
            key={seg.id}
            className="grid gap-2 rounded-lg border p-3 md:grid-cols-[1.2fr_0.7fr_0.6fr_auto]"
          >
            <AdminField
              label="Tên phần thưởng"
              value={seg.label}
              onChange={(v) => {
                const next = [...segments];
                next[i] = { ...next[i], label: v };
                onChange(next);
              }}
            />
            <AdminField
              label="Màu (HEX)"
              value={seg.color}
              onChange={(v) => {
                const next = [...segments];
                next[i] = { ...next[i], color: v };
                onChange(next);
              }}
            />
            <AdminField
              label="Tỷ lệ (%)"
              value={String(seg.weight)}
              onChange={(v) => {
                const weight = Number(v);
                const next = [...segments];
                next[i] = { ...next[i], weight: Number.isFinite(weight) ? weight : 0 };
                onChange(next);
              }}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="self-end text-destructive"
              onClick={() => onChange(segments.filter((_, j) => j !== i))}
            >
              Xóa
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border bg-secondary/20 p-3 text-sm">
        Tổng tỷ lệ hiện tại:{" "}
        <span className="font-semibold">{segments.reduce((s, x) => s + (Number(x.weight) || 0), 0)}%</span>
      </div>
    </section>
  );
}

export function AdminLuckyWheelPage() {
  const { content, updateContent } = useSiteContent();
  const w = content.luckyWheel;

  return (
    <div className="space-y-6">
      <AdminSaveBar />
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-2xl font-semibold text-primary">Vòng quay may mắn</h2>
        <div className="flex items-center gap-2 rounded-full border bg-white px-3 py-2 shadow-sm">
          <span className="text-sm font-medium">Bật</span>
          <Switch
            checked={w.enabled}
            onCheckedChange={(checked) =>
              updateContent((p) => ({ ...p, luckyWheel: { ...p.luckyWheel, enabled: checked } }))
            }
          />
        </div>
      </div>

      <section className="grid gap-4 rounded-xl border bg-white p-6 shadow-sm">
        <AdminField
          label="Tiêu đề popup"
          value={w.title}
          onChange={(v) => updateContent((p) => ({ ...p, luckyWheel: { ...p.luckyWheel, title: v } }))}
        />
        <AdminField
          label="Mô tả (subtitle)"
          value={w.subtitle}
          onChange={(v) => updateContent((p) => ({ ...p, luckyWheel: { ...p.luckyWheel, subtitle: v } }))}
        />
        <AdminField
          label="Tự hiện sau (giây) — 0 = không tự hiện"
          value={String(w.autoShowDelay ?? 5)}
          onChange={(v) => {
            const n = Number(v);
            updateContent((p) => ({
              ...p,
              luckyWheel: { ...p.luckyWheel, autoShowDelay: Number.isFinite(n) ? n : 5 },
            }));
          }}
        />
        <AdminField
          label="Nút quay"
          value={w.spinButtonLabel}
          onChange={(v) =>
            updateContent((p) => ({ ...p, luckyWheel: { ...p.luckyWheel, spinButtonLabel: v } }))
          }
        />
        <AdminField
          label="Text kết quả — tiêu đề"
          value={w.resultHeading}
          onChange={(v) =>
            updateContent((p) => ({ ...p, luckyWheel: { ...p.luckyWheel, resultHeading: v } }))
          }
        />
        <AdminField
          label="Text kết quả — mô tả"
          value={w.resultDescription}
          onChange={(v) =>
            updateContent((p) => ({ ...p, luckyWheel: { ...p.luckyWheel, resultDescription: v } }))
          }
        />
      </section>

      <SegmentsEditor
        segments={w.segments}
        onChange={(segments) => updateContent((p) => ({ ...p, luckyWheel: { ...p.luckyWheel, segments } }))}
      />
    </div>
  );
}

