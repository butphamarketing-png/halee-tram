import { useState } from "react";
import { AdminField } from "@/admin/components/AdminField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { useSiteContent } from "@/context/SiteContentContext";
import { listEditableStaticPagePaths } from "@/lib/site-cms";
import type { SitePageBlock } from "@/types/site-content";

function PageBlocksEditor({
  blocks,
  onChange,
}: {
  blocks: SitePageBlock[];
  onChange: (blocks: SitePageBlock[]) => void;
}) {
  return (
    <div className="space-y-3">
      {blocks.map((block, bi) => (
        <div key={bi} className="rounded-lg border p-3">
          <AdminField
            label={`Khối ${bi + 1} — tiêu đề (tuỳ chọn)`}
            value={block.title ?? ""}
            onChange={(v) => {
              const next = [...blocks];
              next[bi] = { ...next[bi], title: v || undefined };
              onChange(next);
            }}
          />
          {block.paragraphs.map((para, pi) => (
            <div key={pi} className="mt-2">
              <AdminField
                label={`Đoạn ${pi + 1}`}
                value={para}
                multiline
                onChange={(v) => {
                  const next = [...blocks];
                  const paragraphs = [...next[bi].paragraphs];
                  paragraphs[pi] = v;
                  next[bi] = { ...next[bi], paragraphs };
                  onChange(next);
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const PAGE_LABELS: Record<string, string> = {
  "/gioi-thieu": "Giới thiệu",
  "/gioi-thieu/cau-chuyen-thuong-hieu": "Câu chuyện thương hiệu",
  "/gioi-thieu/co-so-vat-chat": "Cơ sở vật chất",
  "/bang-gia": "Bảng giá (nội dung text)",
  "/dich-vu": "Trang dịch vụ tổng",
};

export function AdminPagesPage() {
  const { content, updateContent } = useSiteContent();
  const paths = listEditableStaticPagePaths();
  const [active, setActive] = useState(paths[0] ?? "/gioi-thieu");

  const page = content.pages[active];

  const updatePage = (patch: Partial<{ title: string; eyebrow: string; description: string; blocks: SitePageBlock[] }>) => {
    if (!page) return;
    updateContent((p) => ({
      ...p,
      pages: { ...p.pages, [active]: { ...p.pages[active], ...patch } },
    }));
  };

  if (!page) return null;

  return (
    <div className="space-y-8">
      <AdminSaveBar />
      <h2 className="font-serif text-2xl font-semibold text-primary">Trang nội dung</h2>
      <p className="text-sm text-muted-foreground">Chỉnh giới thiệu, bảng giá text và các trang tĩnh khác.</p>

      <div className="flex flex-wrap gap-2">
        {paths.map((path) => (
          <button
            key={path}
            type="button"
            onClick={() => setActive(path)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${active === path ? "border-primary bg-primary text-primary-foreground" : "bg-white"}`}
          >
            {PAGE_LABELS[path] ?? path}
          </button>
        ))}
      </div>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="mb-4 text-xs text-muted-foreground">Đường dẫn: {active}</p>
        <div className="grid gap-3">
          <AdminField label="Nhãn (eyebrow)" value={page.eyebrow ?? ""} onChange={(v) => updatePage({ eyebrow: v })} />
          <AdminField label="Tiêu đề" value={page.title} onChange={(v) => updatePage({ title: v })} />
          <AdminField label="Mô tả" value={page.description} onChange={(v) => updatePage({ description: v })} multiline />
        </div>
        <div className="mt-4">
          <h4 className="mb-2 font-semibold">Nội dung chi tiết</h4>
          <PageBlocksEditor blocks={page.blocks} onChange={(blocks) => updatePage({ blocks })} />
        </div>
      </section>
    </div>
  );
}
