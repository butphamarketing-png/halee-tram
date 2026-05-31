import { useEffect, useState } from "react";

/** Adds a CSS class after `delayMs`, optionally repeating. */
export function useDelayedClass(delayMs: number, repeatMs?: number) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let repeatTimer: ReturnType<typeof setInterval> | undefined;

    const startTimer = setTimeout(() => {
      setActive(true);
      if (repeatMs) {
        repeatTimer = setInterval(() => {
          setActive(false);
          requestAnimationFrame(() => setActive(true));
        }, repeatMs);
      }
    }, delayMs);

    return () => {
      clearTimeout(startTimer);
      if (repeatTimer) clearInterval(repeatTimer);
    };
  }, [delayMs, repeatMs]);

  return active;
}
