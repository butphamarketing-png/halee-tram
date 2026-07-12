export type GoogleSitemapPingResult = {
  ok: boolean;
  status?: number;
  error?: string;
  skipped?: boolean;
  reason?: string;
};

export async function pingGoogleSitemap(sitemapUrl: string): Promise<GoogleSitemapPingResult> {
  const url = sitemapUrl.trim();
  if (!url) {
    return { ok: false, skipped: true, reason: "SITE_URL chưa cấu hình" };
  }

  try {
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(url)}`;
    const res = await fetch(pingUrl, { method: "GET" });
    if (res.ok || res.status === 200) {
      return { ok: true, status: res.status };
    }
    const error = (await res.text()).trim() || `HTTP ${res.status}`;
    return { ok: false, status: res.status, error };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}
