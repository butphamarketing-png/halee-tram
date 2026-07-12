import { useMemo } from "react";
import { AlertCircle, CheckCircle2, Circle } from "lucide-react";
import { AdminField } from "@/admin/components/AdminField";
import { AdminImageField } from "@/admin/components/AdminImageField";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  analyzeSeo,
  scoreColor,
  scoreLabel,
  type SeoCheckStatus,
} from "@/lib/seo-analysis";
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

function StatusIcon({ status }: { status: SeoCheckStatus }) {
  if (status === "good") return <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />;
  if (status === "bad") return <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />;
  return <Circle className="h-4 w-4 shrink-0 text-amber-500" />;
}

function GooglePreview({ title, url, description }: { title: string; url: string; description: string }) {
  const displayTitle = title || "Tiêu đề trang";
  const displayDesc = description || "Mô tả meta sẽ hiển thị tại đây trên kết quả Google.";
  return (
    <div className="rounded-lg border bg-white p-4">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Xem trước Google</p>
      <p className="truncate text-sm text-[#1a0dab]">{displayTitle}</p>
      <p className="truncate text-xs text-[#006621]">{url}</p>
      <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-[#545454]">{displayDesc}</p>
    </div>
  );
}

function SocialPreview({
  title,
  description,
  image,
  siteName,
}: {
  title: string;
  description: string;
  image: string;
  siteName: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <p className="border-b px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Xem trước Facebook / Zalo
      </p>
      {image ? (
        <div className="aspect-[1.91/1] bg-muted">
          <img src={image} alt="" className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="flex aspect-[1.91/1] items-center justify-center bg-muted text-xs text-muted-foreground">
          Chưa có ảnh OG
        </div>
      )}
      <div className="border-t bg-[#f2f3f5] px-3 py-2">
        <p className="text-[10px] uppercase text-muted-foreground">{siteName}</p>
        <p className="line-clamp-1 text-sm font-semibold text-foreground">{title || "OG Title"}</p>
        <p className="line-clamp-2 text-xs text-muted-foreground">{description || "OG Description"}</p>
      </div>
    </div>
  );
}

export type AdminSeoPanelProps = {
  metaTitle: string;
  metaDescription: string;
  focusKeyphrase: string;
  keywords: string;
  canonicalUrl: string;
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  robots: string;
  noindex: boolean;
  nofollow: boolean;
  onChange: (key: string, value: string | boolean) => void;
  previewPath?: string;
  previewUrl?: string;
  siteName?: string;
  h1?: string;
  bodyText?: string;
  slug?: string;
  hasImage?: boolean;
  showAdvanced?: boolean;
};

export function AdminSeoPanel({
  metaTitle,
  metaDescription,
  focusKeyphrase,
  keywords,
  canonicalUrl,
  ogImage,
  ogTitle,
  ogDescription,
  robots,
  noindex,
  nofollow,
  onChange,
  previewPath = "/",
  previewUrl,
  siteName = "Halee Trâm",
  h1 = "",
  bodyText = "",
  slug = "",
  hasImage = false,
  showAdvanced = true,
}: AdminSeoPanelProps) {
  const resolvedTitle = metaTitle.trim() || h1;
  const resolvedDesc = metaDescription.trim();
  const displayUrl = previewUrl || `haleetram.vercel.app${previewPath}`;

  const analysis = useMemo(
    () =>
      analyzeSeo({
        focusKeyphrase,
        metaTitle: resolvedTitle,
        metaDescription: resolvedDesc,
        slug,
        h1: h1 || resolvedTitle,
        bodyText,
        hasImage: hasImage || Boolean(ogImage),
        canonicalUrl,
      }),
    [focusKeyphrase, resolvedTitle, resolvedDesc, slug, h1, bodyText, hasImage, ogImage, canonicalUrl],
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 rounded-xl border border-primary/20 bg-gradient-to-br from-[#f4ece1] to-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">Điểm SEO</p>
          <p className="text-xs text-muted-foreground">Phân tích giống Yoast SEO / Rank Math</p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-full border-4 bg-white text-lg font-bold",
              analysis.score >= 80 ? "border-emerald-500" : analysis.score >= 50 ? "border-amber-500" : "border-red-500",
            )}
          >
            <span className={scoreColor(analysis.score)}>{analysis.score}</span>
          </div>
          <div>
            <p className={cn("font-semibold", scoreColor(analysis.score))}>{scoreLabel(analysis.score)}</p>
            <p className="text-xs text-muted-foreground">{analysis.checks.filter((c) => c.status === "good").length}/{analysis.checks.length} tiêu chí đạt</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <GooglePreview title={resolvedTitle} url={displayUrl} description={resolvedDesc} />
        <SocialPreview
          title={ogTitle || resolvedTitle}
          description={ogDescription || resolvedDesc}
          image={ogImage}
          siteName={siteName}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(displayUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium hover:bg-muted"
        >
          Rich Results Test
        </a>
        <a
          href={`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(displayUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium hover:bg-muted"
        >
          Facebook Debugger
        </a>
        <a
          href={`${previewUrl?.replace(/\/$/, "") || ""}/api/bot-render?path=${encodeURIComponent(previewPath || "/")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium hover:bg-muted"
        >
          Xem HTML bot-render
        </a>
      </div>

      <ul className="space-y-2 rounded-lg border bg-white p-3">
        {analysis.checks.map((check) => (
          <li key={check.id} className="flex gap-2 text-sm">
            <StatusIcon status={check.status} />
            <div>
              <span className="font-medium text-foreground">{check.label}</span>
              {check.hint ? <p className="text-xs text-muted-foreground">{check.hint}</p> : null}
            </div>
          </li>
        ))}
      </ul>

      <div className="space-y-4 rounded-xl border border-primary/15 bg-[#f4ece1] p-4">
        <AdminField
          label="Từ khóa chính (Focus keyphrase)"
          value={focusKeyphrase}
          onChange={(v) => onChange("focusKeyphrase", v)}
        />
        <div className="space-y-1">
          <AdminField label="Tiêu đề SEO (meta title)" value={metaTitle} onChange={(v) => onChange("metaTitle", v)} />
          <CharCount value={metaTitle || h1} max={SEO_TITLE_MAX} ideal="khuyến nghị ≤ 60" />
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
        <AdminField label="Từ khóa phụ (keywords)" value={keywords} onChange={(v) => onChange("keywords", v)} />

        {showAdvanced && (
          <>
            <AdminField
              label="Canonical URL (tùy chọn)"
              value={canonicalUrl}
              onChange={(v) => onChange("canonicalUrl", v)}
            />
            <hr className="border-primary/10" />
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Open Graph</p>
            <AdminField label="OG Title" value={ogTitle} onChange={(v) => onChange("ogTitle", v)} />
            <AdminField
              label="OG Description"
              value={ogDescription}
              onChange={(v) => onChange("ogDescription", v)}
              multiline
            />
            <AdminImageField label="OG Image" value={ogImage} onChange={(v) => onChange("ogImage", v)} />
          </>
        )}

        <div className="flex flex-wrap gap-6 pt-1">
          <div className="flex items-center gap-2">
            <Checkbox
              id="seo-noindex"
              checked={noindex}
              onCheckedChange={(v) => onChange("noindex", v === true)}
            />
            <Label htmlFor="seo-noindex" className="cursor-pointer text-sm">
              Noindex (ẩn khỏi Google)
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="seo-nofollow"
              checked={nofollow}
              onCheckedChange={(v) => onChange("nofollow", v === true)}
            />
            <Label htmlFor="seo-nofollow" className="cursor-pointer text-sm">
              Nofollow
            </Label>
          </div>
        </div>

        {!noindex && !nofollow && (
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Robots (nâng cao)</span>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              value={robots}
              onChange={(e) => onChange("robots", e.target.value)}
            >
              <option value="index,follow">index, follow</option>
              <option value="noindex,nofollow">noindex, nofollow</option>
            </select>
          </label>
        )}
      </div>
    </div>
  );
}
