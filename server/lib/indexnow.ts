export type IndexNowResult = {
  ok: boolean;
  submitted: number;
  status?: number;
  error?: string;
  skipped?: boolean;
  reason?: string;
};

export function isIndexNowConfigured(): boolean {
  return Boolean(process.env.INDEXNOW_KEY?.trim() && getIndexNowSiteUrl());
}

function getIndexNowSiteUrl(): string {
  return (
    process.env.SITE_URL?.replace(/\/$/, "") ||
    process.env.VITE_SITE_URL?.replace(/\/$/, "") ||
    ""
  );
}

export function getIndexNowKeyLocation(siteUrl: string): string {
  const base = siteUrl.replace(/\/$/, "");
  return `${base}/api/indexnow-verify`;
}

export async function submitIndexNow(urls: string[], siteUrl: string): Promise<IndexNowResult> {
  const key = process.env.INDEXNOW_KEY?.trim();
  const base = siteUrl.replace(/\/$/, "") || getIndexNowSiteUrl();

  if (!key) {
    return { ok: false, submitted: 0, skipped: true, reason: "INDEXNOW_KEY chưa cấu hình" };
  }
  if (!base) {
    return { ok: false, submitted: 0, skipped: true, reason: "SITE_URL chưa cấu hình" };
  }
  if (!urls.length) {
    return { ok: true, submitted: 0, skipped: true, reason: "Không có URL thay đổi" };
  }

  const host = new URL(base).host;
  const keyLocation = getIndexNowKeyLocation(base);

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key,
        keyLocation,
        urlList: urls,
      }),
    });

    if (res.ok || res.status === 202) {
      return { ok: true, submitted: urls.length, status: res.status };
    }

    const error = (await res.text()).trim() || `HTTP ${res.status}`;
    return { ok: false, submitted: 0, status: res.status, error };
  } catch (err) {
    return { ok: false, submitted: 0, error: String(err) };
  }
}
