import { useMemo } from "react";
import { ExternalLink } from "lucide-react";
import { AdminField } from "@/admin/components/AdminField";
import { AdminImageField } from "@/admin/components/AdminImageField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { AdminSeoPanel } from "@/admin/components/AdminSeoPanel";
import { useSiteContent } from "@/context/SiteContentContext";
import { buildRobotsTxt, collectSitemapEntries, getSiteBaseUrl } from "@/lib/seo-sitemap";
import type { SiteSeo } from "@/types/site-content";

export function AdminSeoPage() {
  const { content, updateContent } = useSiteContent();
  const seo = content.settings.seo;

  const setSeo = <K extends keyof SiteSeo>(key: K, value: SiteSeo[K]) => {
    updateContent((prev) => ({
      ...prev,
      settings: { ...prev.settings, seo: { ...prev.settings.seo, [key]: value } },
    }));
  };

  const patchSeo = (patch: Partial<SiteSeo>) => {
    updateContent((prev) => ({
      ...prev,
      settings: { ...prev.settings, seo: { ...prev.settings.seo, ...patch } },
    }));
  };

  const baseUrl = getSiteBaseUrl(seo.siteUrl);
  const sitemapCount = useMemo(
    () => collectSitemapEntries(content, baseUrl).length,
    [content, baseUrl],
  );
  const robotsPreview = useMemo(
    () => buildRobotsTxt(baseUrl, seo.robotsTxtExtra),
    [baseUrl, seo.robotsTxtExtra],
  );

  return (
    <div>
      <AdminSaveBar />
      <h2 className="mb-2 font-serif text-2xl font-semibold text-primary">Quản lý SEO</h2>
      <p className="mb-6 max-w-3xl text-sm text-muted-foreground">
        Hệ thống SEO nâng cao: phân tích từ khóa, xem trước Google/Facebook, Schema.org, sitemap.xml và robots.txt — tương
        tự Yoast SEO / Rank Math trên WordPress.
      </p>

      <div className="grid max-w-5xl gap-8">
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold">Cấu hình website</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="URL website (canonical gốc)" value={seo.siteUrl} onChange={(v) => setSeo("siteUrl", v)} />
            <AdminField label="Tên website" value={seo.siteName} onChange={(v) => setSeo("siteName", v)} />
            <AdminField label="Ngăn cách title" value={seo.titleSeparator} onChange={(v) => setSeo("titleSeparator", v)} />
            <AdminField label="Locale" value={seo.locale} onChange={(v) => setSeo("locale", v)} />
          </div>
        </section>

        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold">SEO trang chủ & mặc định</h3>
          <AdminSeoPanel
            metaTitle={seo.title}
            metaDescription={seo.description}
            focusKeyphrase=""
            keywords={seo.keywords}
            canonicalUrl=""
            ogImage={seo.ogImage}
            ogTitle={seo.ogTitle}
            ogDescription={seo.ogDescription}
            robots={seo.robots}
            noindex={false}
            nofollow={false}
            previewPath="/"
            previewUrl={baseUrl}
            siteName={seo.siteName}
            h1={seo.title}
            bodyText={seo.description}
            slug=""
            hasImage={Boolean(seo.ogImage)}
            onChange={(key, value) => {
              if (typeof value !== "string") return;
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
          <h3 className="mb-4 font-semibold">Schema.org (JSON-LD)</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Tự động chèn dữ liệu có cấu trúc: Organization, WebSite, BreadcrumbList, Article — giúp Google hiểu phòng
            khám và bài viết.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={seo.schemaEnabled}
                onChange={(e) => setSeo("schemaEnabled", e.target.checked)}
                className="rounded border-input"
              />
              Bật Schema JSON-LD
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={seo.breadcrumbsEnabled}
                onChange={(e) => setSeo("breadcrumbsEnabled", e.target.checked)}
                className="rounded border-input"
              />
              Bật Breadcrumb Schema
            </label>
            <AdminField
              label="Loại tổ chức (schema @type)"
              value={seo.organizationType}
              onChange={(v) => setSeo("organizationType", v)}
            />
            <AdminField label="Khoảng giá (priceRange)" value={seo.priceRange} onChange={(v) => setSeo("priceRange", v)} />
            <div className="md:col-span-2">
              <AdminImageField
                label="Logo tổ chức (schema)"
                value={seo.organizationLogo}
                onChange={(v) => setSeo("organizationLogo", v)}
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold">Search Console & Mạng xã hội</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField
              label="Google Search Console (verification)"
              value={seo.googleSiteVerification}
              onChange={(v) => setSeo("googleSiteVerification", v)}
            />
            <AdminField
              label="Bing Webmaster (msvalidate.01)"
              value={seo.bingSiteVerification}
              onChange={(v) => setSeo("bingSiteVerification", v)}
            />
            <AdminField label="Facebook App ID" value={seo.facebookAppId} onChange={(v) => setSeo("facebookAppId", v)} />
            <label className="block space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Twitter Card</span>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={seo.twitterCard}
                onChange={(e) => setSeo("twitterCard", e.target.value as SiteSeo["twitterCard"])}
              >
                <option value="summary_large_image">Ảnh lớn</option>
                <option value="summary">Ảnh nhỏ</option>
              </select>
            </label>
          </div>
        </section>

        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold">Sitemap & Robots.txt</h3>
          <p className="mb-3 text-sm text-muted-foreground">
            Sau khi xuất bản, Google/Bing đọc sitemap ({sitemapCount} URL) và robots.txt tự động. Nếu đã cấu hình
            `INDEXNOW_KEY` trên Vercel, mỗi lần Xuất bản sẽ tự gửi URL thay đổi cho Bing qua IndexNow. Bot Facebook/Zalo
            nhận meta đúng theo từng trang qua Edge Middleware (không cần cấu hình thêm).
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`${baseUrl}/sitemap.xml`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
            >
              <ExternalLink className="h-4 w-4" />
              Mở sitemap.xml
            </a>
            <a
              href={`${baseUrl}/robots.txt`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              <ExternalLink className="h-4 w-4" />
              Mở robots.txt
            </a>
            <a
              href={`${baseUrl}/api/indexnow-verify`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              <ExternalLink className="h-4 w-4" />
              Kiểm tra IndexNow key
            </a>
          </div>
          <div className="mt-4">
            <AdminField
              label="Nội dung thêm vào robots.txt"
              value={seo.robotsTxtExtra}
              onChange={(v) => setSeo("robotsTxtExtra", v)}
              multiline
            />
          </div>
          <pre className="mt-4 max-h-40 overflow-auto rounded-lg bg-muted/50 p-3 text-xs">{robotsPreview}</pre>
        </section>
      </div>
    </div>
  );
}
