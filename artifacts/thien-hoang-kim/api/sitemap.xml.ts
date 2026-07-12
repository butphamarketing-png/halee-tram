import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchCmsPayload } from "../server/lib/cms-payload-server";
import {
  buildSitemapXml,
  collectSitemapEntriesFromPayload,
  getServerSiteUrl,
} from "../server/lib/seo-sitemap-server";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    let base = getServerSiteUrl();
    let payload = null;

    try {
      payload = await fetchCmsPayload();
      const cmsUrl = payload?.settings?.seo?.siteUrl?.trim();
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
