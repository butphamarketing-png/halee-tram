export function scrollToBooking(): void {
  const el = document.getElementById("dat-lich");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }
  window.location.href = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/lien-he#dat-lich`;
}
