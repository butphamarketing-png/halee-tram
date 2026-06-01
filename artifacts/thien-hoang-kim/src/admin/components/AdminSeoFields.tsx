import { AdminField } from "@/admin/components/AdminField";
import { AdminImageField } from "@/admin/components/AdminImageField";
import { cn } from "@/lib/utils";
import { SEO_DESCRIPTION_MAX, SEO_TITLE_MAX } from "@/lib/seo";

function CharCount({ value, max, ideal }: { value: string; max: number; ideal?: string }) {
  const len = value.length;
  const over = len > max;
  return (
    <p className={cn("text-[11px]", over ? "font-medium text-destructive" : "text-muted-foreground")}>
      {len}/{max} ký tự{ideal ? ` · ${ideal}` : ""}
    </p>
  );
}

type SeoFieldSetProps = {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  robots: string;
  onChange: (key: string, value: string) => void;
  showOg?: boolean;
  previewPath?: string;
};

export function AdminSeoFields({
  metaTitle,
  metaDescription,
  keywords,
  ogImage,
  ogTitle,
  ogDescription,
  robots,
  onChange,
  showOg = true,
  previewPath,
}: SeoFieldSetProps) {
  return (
    <div className="space-y-4 rounded-xl border border-primary/15 bg-[#f8fbf9] p-4">
      <div>
        <p className="text-sm font-semibold text-primary">SEO — Tối ưu Google</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Để trống tiêu đề/mô tả SEO sẽ tự lấy từ nội dung bài viết.
          {previewPath ? (
            <>
              {" "}
              Xem trước:{" "}
              <code className="rounded bg-white px-1 py-0.5 text-[10px]">{previewPath}</code>
            </>
          ) : null}
        </p>
      </div>

      <div className="space-y-1">
        <AdminField
          label="Tiêu đề SEO (meta title)"
          value={metaTitle}
          onChange={(v) => onChange("metaTitle", v)}
        />
        <CharCount value={metaTitle} max={SEO_TITLE_MAX} ideal="khuyến nghị ≤ 60" />
      </div>

      <div className="space-y-1">
        <AdminField
          label="Mô tả SEO (meta description)"
          value={metaDescription}
          onChange={(v) => onChange("metaDescription", v)}
          multiline
        />
        <CharCount value={metaDescription} max={SEO_DESCRIPTION_MAX} ideal="khuyến nghị ≤ 160" />
      </div>

      <AdminField label="Từ khóa (keywords)" value={keywords} onChange={(v) => onChange("keywords", v)} />

      {showOg && (
        <>
          <hr className="border-primary/10" />
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Open Graph / Facebook</p>
          <AdminField label="OG Title" value={ogTitle} onChange={(v) => onChange("ogTitle", v)} />
          <AdminField
            label="OG Description"
            value={ogDescription}
            onChange={(v) => onChange("ogDescription", v)}
            multiline
          />
          <AdminImageField label="OG Image (ảnh chia sẻ)" value={ogImage} onChange={(v) => onChange("ogImage", v)} />
        </>
      )}

      <label className="block space-y-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Robots</span>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          value={robots}
          onChange={(e) => onChange("robots", e.target.value)}
        >
          <option value="index,follow">index, follow (cho Google index)</option>
          <option value="noindex,nofollow">noindex, nofollow (ẩn khỏi Google)</option>
        </select>
      </label>
    </div>
  );
}
