import { useRef, useState } from "react";
import { ExternalLink, ImagePlus } from "lucide-react";
import { AdminMediaPicker } from "@/admin/components/AdminMediaPicker";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AdminField } from "@/admin/components/AdminField";
import { AdminImageField } from "@/admin/components/AdminImageField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { useSiteContent } from "@/context/SiteContentContext";
import { AdminSeoPanel } from "@/admin/components/AdminSeoPanel";
import { getSiteBaseUrl } from "@/lib/seo-sitemap";
import { DEFAULT_ARTICLE_SEO } from "@/lib/seo";
import { slugify } from "@/lib/slug";
import type { ArticleSeo, SiteArticle } from "@/types/site-content";

const CATEGORIES = ["Kiến thức", "Tin tức", "Dịch vụ", "Công nghệ", "Spa"];

function newArticle(): SiteArticle {
  const title = "Bài viết mới";
  return {
    id: crypto.randomUUID(),
    slug: slugify(title),
    category: "Kiến thức",
    image: "",
    title,
    date: new Date().toLocaleDateString("vi-VN"),
    description: "",
    body: "",
    published: true,
    seo: { ...DEFAULT_ARTICLE_SEO },
  };
}

export function AdminArticlesPage() {
  const { content, updateContent } = useSiteContent();
  const [expanded, setExpanded] = useState<string | null>(content.articles[0]?.id ?? null);
  const [mediaPickerFor, setMediaPickerFor] = useState<string | null>(null);
  const bodyRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});

  const updateArticle = (index: number, patch: Partial<SiteArticle>) => {
    updateContent((p) => {
      const list = [...p.articles];
      list[index] = { ...list[index], ...patch };
      return { ...p, articles: list };
    });
  };

  const updateArticleSeo = (index: number, key: keyof ArticleSeo, value: string | boolean) => {
    updateContent((p) => {
      const list = [...p.articles];
      const current = list[index];
      list[index] = {
        ...current,
        seo: { ...current.seo, [key]: value },
      };
      return { ...p, articles: list };
    });
  };

  const siteUrl = getSiteBaseUrl(content.settings.seo.siteUrl);

  return (
    <div>
      <AdminSaveBar />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-primary">Bài viết / Cẩm nang</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {content.articles.filter((a) => a.published).length} bài đang hiển thị · Tổng {content.articles.length} bài
          </p>
        </div>
        <Button
          type="button"
          onClick={() => {
            const article = newArticle();
            updateContent((p) => ({ ...p, articles: [article, ...p.articles] }));
            setExpanded(article.id);
          }}
        >
          + Thêm bài viết
        </Button>
      </div>

      <section className="mb-8 rounded-xl border bg-white p-5 shadow-sm">
        <h3 className="mb-3 font-semibold">Mục Cẩm nang trang chủ</h3>
        <div className="grid gap-3 md:grid-cols-3">
          <AdminField
            label="Tiêu đề mục"
            value={content.handbook.title}
            onChange={(v) => updateContent((p) => ({ ...p, handbook: { ...p.handbook, title: v } }))}
          />
          <AdminField
            label="Nút xem tất cả"
            value={content.handbook.viewAllLabel}
            onChange={(v) => updateContent((p) => ({ ...p, handbook: { ...p.handbook, viewAllLabel: v } }))}
          />
          <AdminField
            label="Link danh sách"
            value={content.handbook.viewAllHref}
            onChange={(v) => updateContent((p) => ({ ...p, handbook: { ...p.handbook, viewAllHref: v } }))}
          />
        </div>
      </section>

      <div className="space-y-3">
        {content.articles.map((a, i) => {
          const open = expanded === a.id;
          return (
            <div key={a.id} className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left hover:bg-muted/40"
                onClick={() => setExpanded(open ? null : a.id)}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-foreground">{a.title || "Chưa có tiêu đề"}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    /tin-tuc/{a.slug} · {a.category} · {a.published ? "Đang hiện" : "Ẩn"}
                  </p>
                </div>
                <span className="text-sm text-primary">{open ? "Thu gọn" : "Chỉnh sửa"}</span>
              </button>

              {open && (
                <div className="space-y-4 border-t px-5 pb-5 pt-4">
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`/tin-tuc/${a.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      <ExternalLink className="mr-1 h-4 w-4" />
                      Xem trên web
                    </a>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-auto text-destructive"
                      onClick={() => {
                        if (confirm("Xóa bài viết này?")) {
                          updateContent((p) => ({ ...p, articles: p.articles.filter((x) => x.id !== a.id) }));
                        }
                      }}
                    >
                      Xóa bài
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`pub-${a.id}`}
                      checked={a.published}
                      onCheckedChange={(v) => updateArticle(i, { published: v === true })}
                    />
                    <Label htmlFor={`pub-${a.id}`} className="cursor-pointer text-sm font-medium">
                      Hiển thị trên website
                    </Label>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <AdminField
                      label="Tiêu đề"
                      value={a.title}
                      onChange={(v) => updateArticle(i, { title: v })}
                    />
                    <AdminField
                      label="Slug (URL)"
                      value={a.slug}
                      onChange={(v) => updateArticle(i, { slug: slugify(v) })}
                    />
                    <label className="text-xs font-semibold text-muted-foreground">
                      Danh mục
                      <select
                        className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                        value={a.category}
                        onChange={(e) => updateArticle(i, { category: e.target.value })}
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </label>
                    <AdminField label="Ngày đăng" value={a.date} onChange={(v) => updateArticle(i, { date: v })} />
                    <div className="md:col-span-2">
                      <AdminImageField
                        label="Ảnh đại diện"
                        value={a.image}
                        onChange={(v) => updateArticle(i, { image: v })}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <AdminField
                        label="Mô tả ngắn (hiện trên thẻ bài)"
                        value={a.description}
                        onChange={(v) => updateArticle(i, { description: v })}
                        multiline
                      />
                    </div>

                    <div className="md:col-span-2">
                      <AdminSeoPanel
                        metaTitle={a.seo?.metaTitle ?? ""}
                        metaDescription={a.seo?.metaDescription ?? ""}
                        focusKeyphrase={a.seo?.focusKeyphrase ?? ""}
                        keywords={a.seo?.keywords ?? ""}
                        canonicalUrl={a.seo?.canonicalUrl ?? ""}
                        ogImage={a.seo?.ogImage ?? a.image}
                        ogTitle={a.seo?.ogTitle ?? ""}
                        ogDescription={a.seo?.ogDescription ?? ""}
                        robots={a.seo?.robots ?? "index,follow"}
                        noindex={a.seo?.noindex ?? false}
                        nofollow={a.seo?.nofollow ?? false}
                        h1={a.title}
                        bodyText={a.body}
                        slug={a.slug}
                        hasImage={Boolean(a.image || a.seo?.ogImage)}
                        previewPath={`/tin-tuc/${a.slug}`}
                        previewUrl={`${siteUrl}/tin-tuc/${a.slug}`}
                        siteName={content.settings.seo.siteName}
                        onChange={(key, value) => updateArticleSeo(i, key as keyof ArticleSeo, value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Nội dung chi tiết
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setMediaPickerFor(a.id)}
                        >
                          <ImagePlus className="mr-1 h-4 w-4" />
                          Chèn ảnh từ kho
                        </Button>
                      </div>
                      <p className="mb-2 text-xs text-muted-foreground">
                        Mỗi đoạn cách nhau 1 dòng trống. Ảnh trong bài: dòng riêng dạng{" "}
                        <code className="rounded bg-muted px-1">![mô tả](url)</code>
                      </p>
                      <textarea
                        ref={(el) => {
                          bodyRefs.current[a.id] = el;
                        }}
                        className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={a.body}
                        onChange={(e) => updateArticle(i, { body: e.target.value })}
                      />
                      <AdminMediaPicker
                        open={mediaPickerFor === a.id}
                        onOpenChange={(v) => !v && setMediaPickerFor(null)}
                        title="Chèn ảnh vào nội dung bài"
                        filter="image"
                        onSelect={(url) => {
                          const snippet = `\n\n![${a.title || "Ảnh"}](${url})\n\n`;
                          const el = bodyRefs.current[a.id];
                          if (el) {
                            const start = el.selectionStart;
                            const end = el.selectionEnd;
                            const next =
                              a.body.slice(0, start) + snippet + a.body.slice(end);
                            updateArticle(i, { body: next });
                          } else {
                            updateArticle(i, { body: (a.body ? `${a.body}\n\n` : "") + snippet.trim() });
                          }
                          setMediaPickerFor(null);
                        }}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => updateArticle(i, { slug: slugify(a.title) })}
                  >
                    Tạo slug từ tiêu đề
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
