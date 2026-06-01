import { AdminField } from "@/admin/components/AdminField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { AdminSeoFields } from "@/admin/components/AdminSeoFields";
import { useSiteContent } from "@/context/SiteContentContext";
import type { SiteSeo } from "@/types/site-content";

export function AdminSeoPage() {
  const { content, updateContent } = useSiteContent();
  const seo = content.settings.seo;

  const setSeo = <K extends keyof SiteSeo>(key: K, value: SiteSeo[K]) => {
    updateContent((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        seo: { ...prev.settings.seo, [key]: value },
      },
    }));
  };

  const patchSeo = (patch: Partial<SiteSeo>) => {
    updateContent((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        seo: { ...prev.settings.seo, ...patch },
      },
    }));
  };

  return (
    <div>
      <AdminSaveBar />
      <h2 className="mb-2 font-serif text-2xl font-semibold text-primary">Quản lý SEO</h2>
      <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
        Cấu hình SEO mặc định cho toàn website. Mỗi bài viết có thể ghi đè riêng tại mục Bài viết. Hệ thống tự cập
        nhật title, meta description, keywords, Open Graph và canonical theo từng trang.
      </p>

      <div className="grid max-w-3xl gap-6">
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-foreground">Thông tin thương hiệu</h3>
          <div className="grid gap-4">
            <AdminField
              label="Tên website (site name)"
              value={seo.siteName}
              onChange={(v) => setSeo("siteName", v)}
            />
            <AdminField label="Ngôn ngữ (locale)" value={seo.locale} onChange={(v) => setSeo("locale", v)} />
          </div>
        </section>

        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-foreground">SEO trang chủ & mặc định</h3>
          <AdminSeoFields
            metaTitle={seo.title}
            metaDescription={seo.description}
            keywords={seo.keywords}
            ogImage={seo.ogImage}
            ogTitle={seo.ogTitle}
            ogDescription={seo.ogDescription}
            robots={seo.robots}
            previewPath="/"
            onChange={(key, value) => {
              if (key === "metaTitle") patchSeo({ title: value });
              else if (key === "metaDescription") patchSeo({ description: value });
              else if (key === "keywords") patchSeo({ keywords: value });
              else if (key === "ogImage") patchSeo({ ogImage: value });
              else if (key === "ogTitle") patchSeo({ ogTitle: value });
              else if (key === "ogDescription") patchSeo({ ogDescription: value });
              else if (key === "robots") patchSeo({ robots: value });
            }}
          />
        </section>

        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-foreground">Twitter / X Card</h3>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Loại thẻ Twitter
            </span>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              value={seo.twitterCard}
              onChange={(e) => setSeo("twitterCard", e.target.value as SiteSeo["twitterCard"])}
            >
              <option value="summary_large_image">summary_large_image (ảnh lớn)</option>
              <option value="summary">summary (ảnh nhỏ)</option>
            </select>
          </label>
        </section>

        <section className="rounded-xl border border-dashed border-primary/20 bg-primary/[0.03] p-5 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Trang tự động có SEO riêng</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Bài viết: /tin-tuc/[slug] — dùng SEO từng bài trong Admin → Bài viết</li>
            <li>Dịch vụ: /tham-my/[slug], /spa/[slug]</li>
            <li>Trang nội dung: Giới thiệu, Bảng giá, Liên hệ…</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
