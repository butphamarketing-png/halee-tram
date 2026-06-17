import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminField } from "@/admin/components/AdminField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { useSiteContent } from "@/context/SiteContentContext";
import { getServiceHref } from "@/lib/site-cms";
import type { SitePageBlock, SiteServiceCategoryId } from "@/types/site-content";

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
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-2"
            onClick={() => {
              const next = [...blocks];
              next[bi] = { ...next[bi], paragraphs: [...next[bi].paragraphs, ""] };
              onChange(next);
            }}
          >
            + Đoạn văn
          </Button>
        </div>
      ))}
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => onChange([...blocks, { paragraphs: [""] }])}
      >
        + Khối nội dung
      </Button>
    </div>
  );
}

export function AdminServicesPage() {
  const { content, updateContent } = useSiteContent();
  const catalog = content.serviceCatalog;
  const [activePath, setActivePath] = useState<string | null>(null);

  const updateCategory = (id: SiteServiceCategoryId, field: "title" | "eyebrow" | "description", value: string) => {
    updateContent((p) => ({
      ...p,
      serviceCatalog: {
        ...p.serviceCatalog,
        categories: {
          ...p.serviceCatalog.categories,
          [id]: { ...p.serviceCatalog.categories[id], [field]: value },
        },
      },
    }));
  };

  const updateItem = (id: SiteServiceCategoryId, index: number, patch: Record<string, string>) => {
    updateContent((p) => {
      const items = [...p.serviceCatalog.items[id]];
      items[index] = { ...items[index], ...patch };
      return {
        ...p,
        serviceCatalog: { ...p.serviceCatalog, items: { ...p.serviceCatalog.items, [id]: items } },
      };
    });
  };

  const updatePage = (path: string, patch: Partial<{ title: string; eyebrow: string; description: string; blocks: SitePageBlock[] }>) => {
    updateContent((p) => ({
      ...p,
      pages: {
        ...p.pages,
        [path]: { ...p.pages[path], ...patch },
      },
    }));
  };

  const addItem = (id: SiteServiceCategoryId) => {
    const slug = `dich-vu-moi-${Date.now()}`;
    const path = getServiceHref(catalog, id, slug);
    updateContent((p) => ({
      ...p,
      serviceCatalog: {
        ...p.serviceCatalog,
        items: {
          ...p.serviceCatalog.items,
          [id]: [...p.serviceCatalog.items[id], { slug, label: "Dịch vụ mới", description: "" }],
        },
      },
      pages: {
        ...p.pages,
        [path]: {
          title: "Dịch vụ mới",
          eyebrow: p.serviceCatalog.categories[id].title,
          description: "",
          blocks: [{ paragraphs: [""] }],
        },
      },
    }));
    setActivePath(path);
  };

  return (
    <div className="space-y-8">
      <AdminSaveBar />
      <h2 className="font-serif text-2xl font-semibold text-primary">Dịch vụ & khóa học</h2>

      {(["lam-dep", "dao-tao"] as SiteServiceCategoryId[]).map((categoryId) => (
        <section key={categoryId} className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold">{categoryId === "lam-dep" ? "Làm đẹp" : "Đào tạo"}</h3>
          <div className="grid gap-3 md:grid-cols-3">
            <AdminField label="Tiêu đề danh mục" value={catalog.categories[categoryId].title} onChange={(v) => updateCategory(categoryId, "title", v)} />
            <AdminField label="Nhãn" value={catalog.categories[categoryId].eyebrow} onChange={(v) => updateCategory(categoryId, "eyebrow", v)} />
            <AdminField label="Mô tả" value={catalog.categories[categoryId].description} onChange={(v) => updateCategory(categoryId, "description", v)} multiline />
          </div>

          <div className="mt-4 flex justify-end">
            <Button type="button" size="sm" onClick={() => addItem(categoryId)}>
              + Thêm dịch vụ
            </Button>
          </div>

          <div className="mt-4 space-y-4">
            {catalog.items[categoryId].map((item, i) => {
              const path = getServiceHref(catalog, categoryId, item.slug);
              const page = content.pages[path];
              const open = activePath === path;
              return (
                <div key={item.slug} className="rounded-lg border">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-4 py-3 text-left font-medium"
                    onClick={() => setActivePath(open ? null : path)}
                  >
                    {item.label}
                    <span className="text-xs text-muted-foreground">{path}</span>
                  </button>
                  {open && (
                    <div className="space-y-3 border-t p-4">
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            updateContent((p) => {
                              const items = p.serviceCatalog.items[categoryId].filter((_, idx) => idx !== i);
                              const pages = { ...p.pages };
                              delete pages[path];
                              return {
                                ...p,
                                serviceCatalog: { ...p.serviceCatalog, items: { ...p.serviceCatalog.items, [categoryId]: items } },
                                pages,
                              };
                            })
                          }
                        >
                          Xóa dịch vụ
                        </Button>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        <AdminField label="Tên hiển thị" value={item.label} onChange={(v) => updateItem(categoryId, i, { label: v })} />
                        <AdminField label="Slug URL" value={item.slug} onChange={(v) => updateItem(categoryId, i, { slug: v })} />
                        <AdminField label="Mô tả ngắn" value={item.description ?? ""} onChange={(v) => updateItem(categoryId, i, { description: v })} multiline />
                        <AdminField label="Slug bài viết liên kết" value={item.articleSlug ?? ""} onChange={(v) => updateItem(categoryId, i, { articleSlug: v })} />
                      </div>
                      {page && (
                        <>
                          <AdminField label="Tiêu đề trang" value={page.title} onChange={(v) => updatePage(path, { title: v })} />
                          <AdminField label="Mô tả SEO" value={page.description} onChange={(v) => updatePage(path, { description: v })} multiline />
                          <PageBlocksEditor blocks={page.blocks} onChange={(blocks) => updatePage(path, { blocks })} />
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
