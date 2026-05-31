import { DEFAULT_SITE_CONTENT } from "@/data/site-content.defaults";
import { fetchContentFromSupabase } from "@/lib/supabase-content";
import type { SiteContent } from "@/types/site-content";

const STORAGE_KEY = "thk_site_content_v1";

function mergeContent(partial: Partial<SiteContent>): SiteContent {
  return {
    ...DEFAULT_SITE_CONTENT,
    ...partial,
    settings: {
      ...DEFAULT_SITE_CONTENT.settings,
      ...partial.settings,
      seo: {
        ...DEFAULT_SITE_CONTENT.settings.seo,
        ...partial.settings?.seo,
      },
    },
    home: { ...DEFAULT_SITE_CONTENT.home, ...partial.home },
  };
}

export function loadContentFromStorage(): SiteContent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return mergeContent(JSON.parse(raw) as Partial<SiteContent>);
  } catch {
    return null;
  }
}

export function saveContentToStorage(content: SiteContent): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export function clearContentStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export async function fetchPublishedContent(): Promise<SiteContent | null> {
  try {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    const res = await fetch(`${base}/api/admin/content`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as Partial<SiteContent> | null;
    if (!data || !data.version) return null;
    return mergeContent(data);
  } catch {
    return null;
  }
}

export async function loadSiteContent(options?: { preferLocal?: boolean }): Promise<SiteContent> {
  if (options?.preferLocal) {
    const stored = loadContentFromStorage();
    if (stored) return stored;
  }

  const fromSupabase = await fetchContentFromSupabase();
  if (fromSupabase) return fromSupabase;

  const fromApi = await fetchPublishedContent();
  if (fromApi) return fromApi;

  try {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    const res = await fetch(`${base}/data/site-content.json`, { cache: "no-store" });
    if (res.ok) {
      const data = (await res.json()) as Partial<SiteContent>;
      if (data.version && data.settings) return mergeContent(data);
    }
  } catch {
    /* ignore */
  }

  if (!options?.preferLocal) {
    const stored = loadContentFromStorage();
    if (stored) return stored;
  }

  return DEFAULT_SITE_CONTENT;
}

export async function publishContentToApi(content: SiteContent, token: string): Promise<boolean> {
  try {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    const res = await fetch(`${base}/api/admin/content`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(content),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function exportContentJson(content: SiteContent): void {
  const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `thien-hoang-kim-content-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export { DEFAULT_SITE_CONTENT, STORAGE_KEY };
