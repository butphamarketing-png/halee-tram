import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { handleRouteScroll } from "@/lib/scroll-to-top";

/** Cuộn lên đầu khi đổi trang (menu, slug bài viết, liên kết nội bộ). */
export function ScrollToTop() {
  const [location] = useLocation();
  const prev = useRef<string | null>(null);

  useEffect(() => {
    if (prev.current === location) return;
    prev.current = location;
    handleRouteScroll(location);
  }, [location]);

  return null;
}
