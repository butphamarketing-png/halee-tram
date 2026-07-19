import { getServiceCatalog } from "@/lib/site-cms";
import type { SiteArticle, SiteContent } from "@/types/site-content";

export type InternalLinkSuggestion = {
  href: string;
  label: string;
  reason: string;
  kind: "article" | "service";
};

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .trim();
}

function scoreOverlap(a: string, b: string): number {
  const wordsA = new Set(normalize(a).split(/[^a-z0-9]+/).filter((w) => w.length > 2));
  const wordsB = normalize(b).split(/[^a-z0-9]+/).filter((w) => w.length > 2);
  let score = 0;
  for (const w of wordsB) {
    if (wordsA.has(w)) score += 1;
  }
  return score;
}

/** Gợi ý liên kết nội bộ cho bài viết (dịch vụ liên quan + bài cùng chủ đề). */
export function suggestInternalLinks(
  article: SiteArticle,
  content: SiteContent,
  limit = 5,
): InternalLinkSuggestion[] {
  const haystack = [
    article.title,
    article.description,
    article.body,
    article.seo?.focusKeyphrase,
    article.seo?.keywords,
    article.category,
  ]
    .filter(Boolean)
    .join(" ");

  const suggestions: Array<InternalLinkSuggestion & { score: number }> = [];
  const catalog = getServiceCatalog(content);

  for (const categoryId of ["lam-dep", "dao-tao"] as const) {
    const prefix = catalog.categories[categoryId].path;
    for (const item of catalog.items[categoryId]) {
      if (item.seo?.noindex) continue;
      let score = scoreOverlap(haystack, `${item.label} ${item.description ?? ""} ${item.seo?.focusKeyphrase ?? ""}`);
      if (item.articleSlug === article.slug) score += 8;
      if (score > 0) {
        suggestions.push({
          href: `${prefix}/${item.slug}`,
          label: item.label,
          reason: item.articleSlug === article.slug ? "Bài viết gắn với dịch vụ này" : "Từ khóa / chủ đề gần",
          kind: "service",
          score,
        });
      }
    }
  }

  for (const other of content.articles) {
    if (!other.published || other.slug === article.slug || other.seo?.noindex) continue;
    let score = scoreOverlap(
      haystack,
      `${other.title} ${other.description} ${other.seo?.focusKeyphrase ?? ""} ${other.category}`,
    );
    if (other.category && other.category === article.category) score += 3;
    if (score > 0) {
      suggestions.push({
        href: `/tin-tuc/${other.slug}`,
        label: other.title,
        reason: other.category === article.category ? "Cùng chuyên mục" : "Chủ đề liên quan",
        kind: "article",
        score,
      });
    }
  }

  suggestions.sort((a, b) => b.score - a.score);
  const seen = new Set<string>();
  const out: InternalLinkSuggestion[] = [];
  for (const s of suggestions) {
    if (seen.has(s.href)) continue;
    seen.add(s.href);
    out.push({ href: s.href, label: s.label, reason: s.reason, kind: s.kind });
    if (out.length >= limit) break;
  }
  return out;
}

/** Gợi ý bài viết liên quan cho trang dịch vụ / khóa học. */
export function suggestServiceArticleLinks(
  opts: { label: string; description?: string; articleSlug?: string; focusKeyphrase?: string },
  content: SiteContent,
  limit = 6,
): InternalLinkSuggestion[] {
  const haystack = [opts.label, opts.description, opts.focusKeyphrase, opts.articleSlug]
    .filter(Boolean)
    .join(" ");

  const suggestions: Array<InternalLinkSuggestion & { score: number }> = [];

  for (const other of content.articles) {
    if (!other.published || other.seo?.noindex) continue;
    let score = scoreOverlap(
      haystack,
      `${other.title} ${other.description} ${other.seo?.focusKeyphrase ?? ""} ${other.category}`,
    );
    if (opts.articleSlug && other.slug === opts.articleSlug) score += 10;
    if (score > 0) {
      suggestions.push({
        href: `/tin-tuc/${other.slug}`,
        label: other.title,
        reason: other.slug === opts.articleSlug ? "Bài gắn với dịch vụ" : "Chủ đề liên quan",
        kind: "article",
        score,
      });
    }
  }

  suggestions.sort((a, b) => b.score - a.score);
  return suggestions.slice(0, limit).map(({ score: _s, ...rest }) => rest);
}

/** Trang / bài không được bài nào khác đề cập (orphan soft-check qua articleSlug + body). */
export function findOrphanArticleSlugs(content: SiteContent): string[] {
  const linked = new Set<string>();
  for (const categoryId of ["lam-dep", "dao-tao"] as const) {
    for (const item of content.serviceCatalog.items[categoryId]) {
      if (item.articleSlug) linked.add(item.articleSlug);
    }
  }
  for (const a of content.articles) {
    if (!a.published) continue;
    for (const other of content.articles) {
      if (other.slug === a.slug) continue;
      if (other.body.includes(`/tin-tuc/${a.slug}`) || other.body.includes(a.slug)) {
        linked.add(a.slug);
      }
    }
  }
  return content.articles
    .filter((a) => a.published && !a.seo?.noindex && !linked.has(a.slug))
    .map((a) => a.slug);
}
