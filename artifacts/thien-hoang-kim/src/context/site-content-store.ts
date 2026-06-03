import { createContext } from "react";
import { DEFAULT_SITE_CONTENT } from "@/data/site-content.defaults";
import type { SiteContent } from "@/types/site-content";

export type SiteContentContextValue = {
  content: SiteContent;
  loading: boolean;
  isDirty: boolean;
  updateContent: (updater: (prev: SiteContent) => SiteContent) => void;
  saveContent: () => void;
  resetContent: () => void;
  publishContent: () => Promise<boolean>;
};

/** Tách riêng để HMR không tạo context mới → tránh lỗi "must be used within Provider". */
export const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export const FALLBACK_SITE_CONTENT: SiteContentContextValue = {
  content: DEFAULT_SITE_CONTENT,
  loading: true,
  isDirty: false,
  updateContent: () => {},
  saveContent: () => {},
  resetContent: () => {},
  publishContent: async () => false,
};
