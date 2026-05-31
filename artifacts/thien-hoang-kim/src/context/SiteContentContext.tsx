import {
  createContext,
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
import {
  loadSiteContent,
  publishContentToApi,
  saveContentToStorage,
} from "@/lib/site-content-storage";
import { isAdminLocation } from "@/config/admin";
import { getAdminToken } from "@/lib/admin-auth";
import type { SiteContent } from "@/types/site-content";

type SiteContentContextValue = {
  content: SiteContent;
  loading: boolean;
  isDirty: boolean;
  updateContent: (updater: (prev: SiteContent) => SiteContent) => void;
  saveContent: () => void;
  resetContent: () => void;
  publishContent: () => Promise<boolean>;
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

function applySeoMeta(seo: SiteContent["settings"]["seo"]) {
  document.title = seo.title;
  const setMeta = (name: string, content: string) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };
  setMeta("description", seo.description);
  setMeta("keywords", seo.keywords);
  let og = document.querySelector('meta[property="og:image"]');
  if (!og) {
    og = document.createElement("meta");
    og.setAttribute("property", "og:image");
    document.head.appendChild(og);
  }
  og.setAttribute("content", seo.ogImage);
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [loading, setLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const savedSnapshot = useRef(JSON.stringify(DEFAULT_SITE_CONTENT));

  useEffect(() => {
    let active = true;
    loadSiteContent({ preferLocal: isAdmin }).then((data) => {
      if (active) {
        setContent(data);
        savedSnapshot.current = JSON.stringify(data);
        setIsDirty(false);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [isAdmin]);

  useEffect(() => {
    if (isAdminLocation(location)) return;
    if (!loading) applySeoMeta(content.settings.seo);
  }, [content.settings.seo, location, loading]);

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
    const ok = await publishContentToApi(content, getAdminToken());
    if (ok) {
      saveContentToStorage(content);
      savedSnapshot.current = JSON.stringify(content);
      setIsDirty(false);
    }
    return ok;
  }, [content]);

  const value = useMemo(
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

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used within SiteContentProvider");
  return ctx;
}
