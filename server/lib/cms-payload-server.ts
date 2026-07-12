import type { CmsPayload } from "./seo-sitemap-server";
import { getAdminClient } from "./supabase-admin";

export async function fetchCmsPayload(): Promise<CmsPayload | null> {
  try {
    const supabase = getAdminClient();
    const { data } = await supabase.from("site_content").select("payload").eq("id", 1).maybeSingle();
    return (data?.payload as CmsPayload | null) ?? null;
  } catch {
    return null;
  }
}
