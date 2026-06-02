import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const base =
    process.env.SITE_URL?.replace(/\/$/, "") ?? "https://thienhoangkim.vercel.app";
  const text = `User-agent: *
Allow: /
Disallow: /adminbp
Disallow: /adminbp/

Sitemap: ${base}/sitemap.xml
`;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(text);
}
