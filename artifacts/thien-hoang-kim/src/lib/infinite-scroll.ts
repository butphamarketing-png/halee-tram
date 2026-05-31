/** Scroll ngang: tới cuối/đầu thì quay về đầu/cuối (carousel vòng). */
export function scrollCarouselLoop(el: HTMLElement, direction: -1 | 1, step: number) {
  const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
  if (maxScroll <= 0) return;

  const atEnd = el.scrollLeft >= maxScroll - 6;
  const atStart = el.scrollLeft <= 6;

  if (direction === 1 && atEnd) {
    el.scrollTo({ left: 0, behavior: "smooth" });
    return;
  }
  if (direction === -1 && atStart) {
    el.scrollTo({ left: maxScroll, behavior: "smooth" });
    return;
  }

  el.scrollBy({ left: direction * step, behavior: "smooth" });
}
