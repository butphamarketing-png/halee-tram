import type { ApiRequest, ApiResponse } from "./_lib/http";
import { buildRobotsTxt, getServerSiteUrl } from "../server/lib/seo-sitemap-server";
import { fetchCmsPayload } from "../server/lib/cms-payload-server";

export default async function handler(_req: ApiRequest, res: ApiResponse) {
  let base = getServerSiteUrl();
  let extra = "";

  try {
    const payload = await fetchCmsPayload();
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
