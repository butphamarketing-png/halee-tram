import type { VercelRequest, VercelResponse } from "@vercel/node";
import { pingGoogleSitemap } from "../../server/lib/google-sitemap-ping";
import { submitIndexNow } from "../../server/lib/indexnow";
import {
  collectChangedUrls,
  getServerSiteUrl,
  type CmsPayload,
} from "../../server/lib/seo-sitemap-server";
import { getAdminClient } from "../../server/lib/supabase-admin";
import { isAdminAuthed } from "../../server/lib/verify-auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const supabase = getAdminClient();

    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("site_content")
        .select("payload")
        .eq("id", 1)
        .maybeSingle();

      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      res.status(200).json(data?.payload ?? null);
      return;
    }

    if (req.method === "PUT") {
      if (!isAdminAuthed(req)) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const payload =
        typeof req.body === "string"
          ? (JSON.parse(req.body) as CmsPayload)
          : (req.body as CmsPayload);

      const { data: existing } = await supabase
        .from("site_content")
        .select("payload")
        .eq("id", 1)
        .maybeSingle();

      const oldPayload = (existing?.payload as CmsPayload | null) ?? null;

      const { error } = await supabase.from("site_content").upsert({
        id: 1,
        payload,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      const baseUrl =
        payload.settings?.seo?.siteUrl?.trim()?.replace(/\/$/, "") || getServerSiteUrl();
      const changedUrls = collectChangedUrls(oldPayload, payload, baseUrl);
      const indexNow = await submitIndexNow(changedUrls, baseUrl);
      const googlePing = await pingGoogleSitemap(`${baseUrl}/sitemap.xml`);

      res.status(200).json({ ok: true, indexNow, googlePing, changedUrls });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
}
