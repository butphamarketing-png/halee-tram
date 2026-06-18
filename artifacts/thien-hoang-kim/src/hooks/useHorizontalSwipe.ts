import { useCallback, useRef, type TouchEvent } from "react";

type UseHorizontalSwipeOptions = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  enabled?: boolean;
  threshold?: number;
};

export function useHorizontalSwipe({
  onSwipeLeft,
  onSwipeRight,
  enabled = true,
  threshold = 48,
}: UseHorizontalSwipeOptions) {
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const didSwipeRef = useRef(false);

  const onTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    startRef.current = { x: touch.clientX, y: touch.clientY };
    didSwipeRef.current = false;
  }, []);

  const onTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!enabled || !startRef.current) return;
      const touch = e.changedTouches[0];
      if (!touch) return;

      const dx = touch.clientX - startRef.current.x;
      const dy = touch.clientY - startRef.current.y;
      startRef.current = null;

      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.2) return;

      didSwipeRef.current = true;
      if (dx < 0) onSwipeLeft?.();
      else onSwipeRight?.();

      window.setTimeout(() => {
        didSwipeRef.current = false;
      }, 400);
    },
    [enabled, onSwipeLeft, onSwipeRight, threshold],
  );

  return { onTouchStart, onTouchEnd, didSwipeRef };
}
