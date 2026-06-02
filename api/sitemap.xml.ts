import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAdminClient } from "./lib/supabase-admin";

const STATIC_PATHS = ["/", "/gioi-thieu", "/dich-vu", "/tin-tuc", "/lien-he"];

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const base =
      process.env.SITE_URL?.replace(/\/$/, "") ?? "https://thienhoangkim.vercel.app";

    const urls = new Set(STATIC_PATHS);
    try {
      const supabase = getAdminClient();
      const { data } = await supabase.from("site_content").select("payload").eq("id", 1).maybeSingle();
      const articles = (data?.payload as { articles?: Array<{ slug?: string; published?: boolean }> })
        ?.articles;
      for (const a of articles ?? []) {
        if (a.published && a.slug) urls.add(`/tin-tuc/${a.slug}`);
      }
    } catch {
      /* static only */
    }

    const body = [...urls]
      .map(
        (path) =>
          `  <url><loc>${base}${path}</loc><changefreq>weekly</changefreq><priority>${path === "/" ? "1.0" : "0.8"}</priority></url>`,
      )
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).send(xml);
  } catch (err) {
    res.status(500).send(`<?xml version="1.0"?><error>${String(err)}</error>`);
  }
}
