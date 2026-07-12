import { analyzeSeo, scoreColor, scoreLabel } from "@/lib/seo-analysis";
import { resolveRouteSeo } from "@/lib/seo";
import { collectSitemapEntries, getSiteBaseUrl } from "@/lib/seo-sitemap";
import { getPageContent, getServiceItem } from "@/lib/site-cms";
import type { SiteArticle, SiteContent } from "@/types/site-content";

export type SeoAuditRow = {
  path: string;
  label: string;
  score: number;
  title: string;
  robots: string;
  issues: string[];
  hasOgImage: boolean;
};

export type SeoAuditSummary = {
  total: number;
  averageScore: number;
  weakPages: number;
  duplicateTitles: string[];
  noindexCount: number;
  missingOgCount: number;
  rows: SeoAuditRow[];
};

function pathLabel(path: string, content: SiteContent): string {
  if (path === "/") return "Trang chủ";
  const articleMatch = path.match(/^\/tin-tuc\/([^/]+)$/);
  if (articleMatch) {
    const article = content.articles.find((a) => a.slug === articleMatch[1]);
    return article ? `Bài viết: ${article.title}` : `Bài viết /${articleMatch[1]}`;
  }
  const lamDepMatch = path.match(/^\/lam-dep\/([^/]+)$/);
  if (lamDepMatch) return getServiceItem(content, "lam-dep", lamDepMatch[1])?.label || path;
  const daoTaoMatch = path.match(/^\/dao-tao\/([^/]+)$/);
  if (daoTaoMatch) return getServiceItem(content, "dao-tao", daoTaoMatch[1])?.label || path;
  const page = getPageContent(content, path);
  if (page?.title) return page.title;
  return path;
}

function auditArticle(article: SiteArticle, meta: ReturnType<typeof resolveRouteSeo>, path: string) {
  const seo = article.seo;
  return analyzeSeo({
    focusKeyphrase: seo?.focusKeyphrase || "",
    metaTitle: meta.title,
    metaDescription: meta.description,
    slug: article.slug,
    h1: article.title,
    bodyText: `${article.description} ${article.body}`,
    hasImage: Boolean(seo?.ogImage || article.image),
    canonicalUrl: seo?.canonicalUrl || meta.canonical,
  });
}

function collectIssues(
  analysis: ReturnType<typeof analyzeSeo>,
  meta: ReturnType<typeof resolveRouteSeo>,
  siteUrl: string,
): string[] {
  const issues = analysis.checks
    .filter((check) => check.status === "bad")
    .map((check) => check.label + (check.hint ? ` — ${check.hint}` : ""));

  if (meta.robots.includes("noindex")) issues.push("Trang đang noindex");
  if (!meta.ogImage) issues.push("Thiếu ảnh OG");
  if (!meta.description.trim()) issues.push("Thiếu meta description");

  const canonical = meta.canonical;
  if (canonical && siteUrl && !canonical.startsWith(siteUrl.replace(/\/$/, ""))) {
    issues.push("Canonical khác domain site");
  }

  return issues;
}

export function auditSiteContent(content: SiteContent): SeoAuditSummary {
  const siteUrl = getSiteBaseUrl(content.settings.seo.siteUrl);
  const entries = collectSitemapEntries(content, siteUrl);
  const titleCounts = new Map<string, number>();
  const rows: SeoAuditRow[] = [];

  for (const entry of entries) {
    const path = new URL(entry.loc).pathname;
    const meta = resolveRouteSeo(path, content);
    titleCounts.set(meta.title, (titleCounts.get(meta.title) || 0) + 1);

    let analysis;
    const articleMatch = path.match(/^\/tin-tuc\/([^/]+)$/);
    if (articleMatch) {
      const article = content.articles.find((a) => a.slug === articleMatch[1] && a.published);
      if (article) {
        analysis = auditArticle(article, meta, path);
      }
    }

    const serviceMatch = path.match(/^\/(lam-dep|dao-tao)\/([^/]+)$/);
    if (!analysis && serviceMatch) {
      const service = getServiceItem(content, serviceMatch[1] as "lam-dep" | "dao-tao", serviceMatch[2]);
      if (service) {
        analysis = analyzeSeo({
          focusKeyphrase: service.seo?.focusKeyphrase || "",
          metaTitle: meta.title,
          metaDescription: meta.description,
          slug: service.slug,
          h1: service.label,
          bodyText: `${service.description || ""} ${service.seo?.metaDescription || ""}`,
          hasImage: Boolean(meta.ogImage),
          canonicalUrl: service.seo?.canonicalUrl || meta.canonical,
        });
      }
    }

    if (!analysis) {
      analysis = analyzeSeo({
        focusKeyphrase: path === "/" ? content.settings.seo.focusKeyphrase || "" : "",
        metaTitle: meta.title,
        metaDescription: meta.description,
        slug: path.split("/").filter(Boolean).pop() || "",
        h1: meta.title,
        bodyText: meta.description,
        hasImage: Boolean(meta.ogImage),
        canonicalUrl: meta.canonical,
      });
    }

    rows.push({
      path,
      label: pathLabel(path, content),
      score: analysis.score,
      title: meta.title,
      robots: meta.robots,
      issues: collectIssues(analysis, meta, siteUrl),
      hasOgImage: Boolean(meta.ogImage),
    });
  }

  rows.sort((a, b) => a.score - b.score);

  const duplicateTitles = [...titleCounts.entries()]
    .filter(([, count]) => count > 1)
    .map(([title]) => title);

  for (const row of rows) {
    if (duplicateTitles.includes(row.title)) {
      row.issues.push("Tiêu đề SEO trùng với trang khác");
    }
  }

  const averageScore = rows.length
    ? Math.round(rows.reduce((sum, row) => sum + row.score, 0) / rows.length)
    : 0;

  return {
    total: rows.length,
    averageScore,
    weakPages: rows.filter((row) => row.score < 50).length,
    duplicateTitles,
    noindexCount: rows.filter((row) => row.robots.includes("noindex")).length,
    missingOgCount: rows.filter((row) => !row.hasOgImage).length,
    rows,
  };
}

export { scoreColor, scoreLabel };
