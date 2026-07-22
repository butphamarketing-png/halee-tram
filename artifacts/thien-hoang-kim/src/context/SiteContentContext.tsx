import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "wouter";
import { DEFAULT_SITE_CONTENT } from "@/data/site-content.defaults";
import { isAdminLocation } from "@/config/admin";
import {
  FALLBACK_SITE_CONTENT,
  SiteContentContext,
  type SiteContentContextValue,
} from "@/context/site-content-store";
import {
  loadSiteContent,
  publishContentToApi,
  saveContentToStorage,
} from "@/lib/site-content-storage";
import { getAdminToken } from "@/lib/admin-auth";
import type { SiteContent } from "@/types/site-content";

/** Splash tối đa — không giữ visitor vì Supabase/API chậm hoặc fail. */
const SPLASH_MAX_MS = 900;
const SPLASH_MIN_MS = 280;

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const isAdmin = isAdminLocation(location);
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [loading, setLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const savedSnapshot = useRef(JSON.stringify(DEFAULT_SITE_CONTENT));

  useEffect(() => {
    let active = true;
    const started = Date.now();

    const finishSplash = () => {
      if (!active) return;
      const elapsed = Date.now() - started;
      const wait = Math.max(0, SPLASH_MIN_MS - elapsed);
      window.setTimeout(() => {
        if (active) setLoading(false);
      }, wait);
    };

    // Không bao giờ kẹt splash quá SPLASH_MAX_MS dù network treo
    const maxTimer = window.setTimeout(() => {
      if (active) setLoading(false);
    }, SPLASH_MAX_MS);

    loadSiteContent({ preferLocal: isAdmin }).then((data) => {
      if (!active) return;
      setContent(data);
      savedSnapshot.current = JSON.stringify(data);
      setIsDirty(false);
      window.clearTimeout(maxTimer);
      finishSplash();
    });

    return () => {
      active = false;
      window.clearTimeout(maxTimer);
    };
  }, [isAdmin]);

  const updateContent = useCallback((updater: (prev: SiteContent) => SiteContent) => {
    setContent((prev) => {
      const next = updater(prev);
      setIsDirty(JSON.stringify(next) !== savedSnapshot.current);
      return next;
    });
  }, []);

  const saveContent = useCallback(() => {
    setContent((current) => {
      saveContentToStorage(current);
      savedSnapshot.current = JSON.stringify(current);
      setIsDirty(false);
      return current;
    });
  }, []);

  const resetContent = useCallback(() => {
    setContent(DEFAULT_SITE_CONTENT);
    saveContentToStorage(DEFAULT_SITE_CONTENT);
    savedSnapshot.current = JSON.stringify(DEFAULT_SITE_CONTENT);
    setIsDirty(false);
  }, []);

  const publishContent = useCallback(async () => {
    const result = await publishContentToApi(content, getAdminToken());
    if (result.ok) {
      saveContentToStorage(content);
      savedSnapshot.current = JSON.stringify(content);
      setIsDirty(false);
    }
    return result;
  }, [content]);

  const value = useMemo<SiteContentContextValue>(
    () => ({
      content,
      loading,
      isDirty,
      updateContent,
      saveContent,
      resetContent,
      publishContent,
    }),
    [content, loading, isDirty, updateContent, saveContent, resetContent, publishContent],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent(): SiteContentContextValue {
  const ctx = useContext(SiteContentContext);
  return ctx ?? FALLBACK_SITE_CONTENT;
}

/** Alias — SEO / HMR-safe */
export function useSiteContentSafe(): SiteContentContextValue {
  return useSiteContent();
}
