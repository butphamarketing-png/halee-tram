import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "So sánh",
  afterAlt = "So sánh",
  className,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const dragging = useRef(false);

  const syncWidth = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    syncWidth();
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(syncWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, [syncWidth]);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPosition((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [setFromClientX]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group/slider relative h-full w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl bg-black/5",
        className,
      )}
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest("[data-range-track]")) return;
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
    >
      <img src={beforeSrc} alt={beforeAlt} className="absolute inset-0 h-full w-full object-cover" draggable={false} />

      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img
          src={afterSrc}
          alt={afterAlt}
          className="absolute left-0 top-0 h-full max-w-none object-cover"
          style={{ width: containerWidth || "100%" }}
          draggable={false}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 z-[1] w-[2px] -translate-x-1/2 bg-white/95 shadow-[0_0_12px_rgba(0,0,0,0.35)]"
        style={{ left: `${position}%` }}
      >
        <div
          className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-primary shadow-[0_4px_20px_rgba(0,0,0,0.35)] ring-2 ring-gold/45"
          aria-hidden
        >
          <span className="flex gap-0.5 opacity-90">
            <span className="h-3 w-0.5 rounded-full bg-white/90" />
            <span className="h-3 w-0.5 rounded-full bg-white/90" />
          </span>
        </div>
      </div>

      <div
        data-range-track
        className="absolute inset-x-0 bottom-0 z-10 px-5 pb-4 pt-12"
        style={{
          background:
            "linear-gradient(to top, rgba(7,26,20,0.7) 0%, rgba(7,26,20,0.25) 50%, transparent 100%)",
        }}
      >
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          onPointerDown={(e) => e.stopPropagation()}
          className="before-after-range h-1 w-full cursor-ew-resize appearance-none rounded-full bg-white/35"
          aria-label="Kéo ngang để xem kết quả"
        />
      </div>
    </div>
  );
}
