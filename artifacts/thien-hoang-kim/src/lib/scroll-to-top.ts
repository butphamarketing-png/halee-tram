/** Cuộn viewport lên đầu trang (tương thích mobile). */
export function scrollToTopInstant() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/** Theo dõi pathname/hash từ wouter và cuộn phù hợp. */
export function handleRouteScroll(location: string) {
  const hash = location.includes("#") ? location.split("#")[1]?.split("?")[0] : "";

  scrollToTopInstant();

  if (!hash) return;

  window.setTimeout(() => {
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}
