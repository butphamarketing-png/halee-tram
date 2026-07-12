import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  buildSitemapXml,
  collectSitemapEntriesFromPayload,
  getServerSiteUrl,
} from "../server/lib/seo-sitemap-server";
import { getAdminClient } from "../server/lib/supabase-admin";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    let base = getServerSiteUrl();
    let payload: Record<string, unknown> | null = null;

    try {
      const supabase = getAdminClient();
      const { data } = await supabase.from("site_content").select("payload").eq("id", 1).maybeSingle();
      payload = (data?.payload as Record<string, unknown> | null) ?? null;
      const cmsUrl = (payload?.settings as { seo?: { siteUrl?: string } } | undefined)?.seo?.siteUrl?.trim();
      if (cmsUrl) base = cmsUrl.replace(/\/$/, "");
    } catch {
      /* static sitemap only */
    }

    const entries = collectSitemapEntriesFromPayload(payload, base);
    const xml = buildSitemapXml(entries);

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).send(xml);
  } catch (err) {
    res.status(500).send(`<?xml version="1.0"?><error>${String(err)}</error>`);
  }
}
