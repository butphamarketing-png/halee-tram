import { collectSitemapEntriesFromPayload, getServerSiteUrl } from "./seo-sitemap-server";
import type { CmsPayload } from "./seo-sitemap-server";

export function buildLlmsTxt(payload: CmsPayload | null | undefined, baseUrl: string): string {
  const siteUrl = baseUrl.replace(/\/$/, "");
  const seo = payload?.settings?.seo;
  const clinicName = payload?.settings?.clinicName || seo?.siteName || "Website";
  const description = seo?.description || "";
  const entries = collectSitemapEntriesFromPayload(payload, siteUrl);

  const keyPaths = entries
    .map((entry) => entry.loc.replace(siteUrl, "") || "/")
    .filter((path) => path === "/" || !path.startsWith("/tin-tuc/") || entries.length < 40)
    .slice(0, 60);

  const articlePaths = entries
    .filter((entry) => {
      const path = entry.loc.replace(siteUrl, "");
      return path.startsWith("/tin-tuc/") && path !== "/tin-tuc/kien-thuc" && path !== "/tin-tuc/tin-tuc";
    })
    .slice(0, 120)
    .map((entry) => entry.loc);

  const lines = [
    `# ${clinicName}`,
    "",
    `> ${description}`,
    "",
    "## Contact",
    `- Website: ${siteUrl}`,
    payload?.settings?.phone ? `- Phone: ${payload.settings.phone}` : "",
    payload?.settings?.email ? `- Email: ${payload.settings.email}` : "",
    payload?.settings?.address ? `- Address: ${payload.settings.address}` : "",
    "",
    "## Key pages",
    ...keyPaths.map((path) => `- ${siteUrl}${path}`),
  ];

  if (articlePaths.length) {
    lines.push("", "## Articles", ...articlePaths.map((url) => `- ${url}`));
  }

  lines.push("", "## Sitemap", `- ${siteUrl}/sitemap.xml`);

  return lines.filter(Boolean).join("\n").trim() + "\n";
}

export function getLlmsTxtBaseUrl(payload: CmsPayload | null | undefined): string {
  const cmsUrl = payload?.settings?.seo?.siteUrl?.trim();
  if (cmsUrl) return cmsUrl.replace(/\/$/, "");
  return getServerSiteUrl();
}
