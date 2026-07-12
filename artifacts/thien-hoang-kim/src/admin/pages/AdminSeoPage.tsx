import { useMemo } from "react";
import { ExternalLink } from "lucide-react";
import { AdminField } from "@/admin/components/AdminField";
import { AdminImageField } from "@/admin/components/AdminImageField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { AdminSeoPanel } from "@/admin/components/AdminSeoPanel";
import { useSiteContent } from "@/context/SiteContentContext";
import { auditSiteContent, scoreColor, scoreLabel } from "@/lib/seo-audit";
import { findOrphanArticleSlugs } from "@/lib/seo-internal-links";
import { buildRobotsTxt, collectSitemapEntries, getSiteBaseUrl } from "@/lib/seo-sitemap";
import type { SiteSeo } from "@/types/site-content";
import { cn } from "@/lib/utils";

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
  const audit = useMemo(() => auditSiteContent(content), [content]);
  const weakRows = audit.rows.filter((row) => row.score < 80).slice(0, 12);
  const orphanSlugs = useMemo(() => findOrphanArticleSlugs(content), [content]);

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
            focusKeyphrase={seo.focusKeyphrase}
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
              else if (key === "focusKeyphrase") patchSeo({ focusKeyphrase: value });
              else if (key === "keywords") patchSeo({ keywords: value });
              else if (key === "ogImage") patchSeo({ ogImage: value });
              else if (key === "ogTitle") patchSeo({ ogTitle: value });
              else if (key === "ogDescription") patchSeo({ ogDescription: value });
              else if (key === "robots") patchSeo({ robots: value });
            }}
          />
        </section>

        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-2 font-semibold">Kiểm tra SEO toàn site</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Quét {audit.total} URL trong sitemap — phát hiện trang yếu, thiếu OG, tiêu đề trùng.
          </p>
          <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Điểm trung bình</p>
              <p className={cn("text-2xl font-bold", scoreColor(audit.averageScore))}>{audit.averageScore}</p>
              <p className="text-xs">{scoreLabel(audit.averageScore)}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Trang cần cải thiện</p>
              <p className="text-2xl font-bold text-amber-600">{audit.weakPages}</p>
              <p className="text-xs">Điểm &lt; 50</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Thiếu ảnh OG</p>
              <p className="text-2xl font-bold text-red-600">{audit.missingOgCount}</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Tiêu đề trùng</p>
              <p className="text-2xl font-bold text-red-600">{audit.duplicateTitles.length}</p>
            </div>
          </div>
          {audit.duplicateTitles.length > 0 && (
            <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              Tiêu đề trùng: {audit.duplicateTitles.slice(0, 3).join(" · ")}
              {audit.duplicateTitles.length > 3 ? " …" : ""}
            </p>
          )}
          {orphanSlugs.length > 0 && (
            <p className="mb-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
              Bài viết ít liên kết nội bộ ({orphanSlugs.length}):{" "}
              {orphanSlugs.slice(0, 5).map((s) => `/tin-tuc/${s}`).join(" · ")}
              {orphanSlugs.length > 5 ? " …" : ""} — dùng gợi ý link trong trang Bài viết.
            </p>
          )}
          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2">Trang</th>
                  <th className="px-3 py-2">Điểm</th>
                  <th className="px-3 py-2">Vấn đề</th>
                </tr>
              </thead>
              <tbody>
                {weakRows.map((row) => (
                  <tr key={row.path} className="border-t">
                    <td className="px-3 py-2">
                      <p className="font-medium">{row.label}</p>
                      <p className="text-xs text-muted-foreground">{row.path}</p>
                    </td>
                    <td className={cn("px-3 py-2 font-semibold", scoreColor(row.score))}>{row.score}</td>
                    <td className="px-3 py-2 text-xs text-muted-foreground">
                      {row.issues.slice(0, 2).join(" · ") || "Ổn"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
            Sau khi xuất bản, Google/Bing đọc sitemap ({sitemapCount} URL) và robots.txt tự động. Hệ thống tự **ping Google sitemap** và gửi URL thay đổi qua **IndexNow (Bing)**. Bot Facebook/Zalo nhận meta + JSON-LD đúng từng trang qua Edge Middleware.
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
              href={`${baseUrl}/llms.txt`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              <ExternalLink className="h-4 w-4" />
              Mở llms.txt
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
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={seo.llmsTxtEnabled}
                onChange={(e) => setSeo("llmsTxtEnabled", e.target.checked)}
                className="rounded border-input"
              />
              Bật llms.txt (AI crawlers)
            </label>
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
