import type { VercelRequest, VercelResponse } from "@vercel/node";
import { buildRobotsTxt, getServerSiteUrl } from "../server/lib/seo-sitemap-server";
import { getAdminClient } from "../server/lib/supabase-admin";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  let base = getServerSiteUrl();
  let extra = "";

  try {
    const supabase = getAdminClient();
    const { data } = await supabase.from("site_content").select("payload").eq("id", 1).maybeSingle();
    const payload = data?.payload as { settings?: { seo?: { siteUrl?: string; robotsTxtExtra?: string } } } | null;
    const cmsUrl = payload?.settings?.seo?.siteUrl?.trim();
    if (cmsUrl) base = cmsUrl.replace(/\/$/, "");
    extra = payload?.settings?.seo?.robotsTxtExtra?.trim() ?? "";
  } catch {
    /* env defaults */
  }

  const text = buildRobotsTxt(base, extra);

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(text);
}
