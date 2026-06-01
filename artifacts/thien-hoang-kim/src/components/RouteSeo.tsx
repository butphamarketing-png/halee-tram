import { useEffect } from "react";
import { useLocation } from "wouter";
import { isAdminLocation } from "@/config/admin";
import { useSiteContent } from "@/context/SiteContentContext";
import { applyPageSeo, resolveRouteSeo } from "@/lib/seo";

/** Cập nhật title, meta description, OG… theo từng trang */
export function RouteSeo() {
  const [location] = useLocation();
  const { content, loading } = useSiteContent();

  useEffect(() => {
    if (isAdminLocation(location) || loading) return;
    const path = location.split("#")[0] || "/";
    const meta = resolveRouteSeo(path, content);
    applyPageSeo(meta);
  }, [location, content, loading]);

  return null;
}
