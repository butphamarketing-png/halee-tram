import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { DEFAULT_SITE_CONTENT } from "../src/data/site-content.defaults";
import { mergeSiteContent } from "../src/lib/normalize-content";
import { buildRobotsTxt, getSiteBaseUrl } from "../src/lib/seo-sitemap";
import type { SiteContent } from "../src/types/site-content";

async function loadPublishedContent(): Promise<SiteContent> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return DEFAULT_SITE_CONTENT;

  try {
    const supabase = createClient(url, key);
    const { data } = await supabase.from("site_content").select("payload").eq("id", 1).maybeSingle();
    if (data?.payload && typeof data.payload === "object") {
      return mergeSiteContent(data.payload as Partial<SiteContent>);
    }
  } catch {
    /* fallback */
  }
  return DEFAULT_SITE_CONTENT;
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const content = await loadPublishedContent();
    const baseUrl = getSiteBaseUrl(
      content.settings.seo.siteUrl || process.env.SITE_URL || "https://thienhoangkim.vercel.app",
    );
    const text = buildRobotsTxt(baseUrl, content.settings.seo.robotsTxtExtra);

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).send(text);
  } catch (err) {
    res.status(500).send(`User-agent: *\nDisallow: /\n# Error: ${String(err)}`);
  }
}
