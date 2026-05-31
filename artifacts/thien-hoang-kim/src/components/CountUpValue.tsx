import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

function parseStatValue(raw: string) {
  const match = raw.trim().match(/^(\d+)(.*)$/);
  if (!match) return { end: 0, suffix: raw };
  return { end: Number.parseInt(match[1], 10), suffix: match[2] };
}

type CountUpValueProps = {
  value: string;
  className?: string;
  durationMs?: number;
};

export function CountUpValue({ value, className, durationMs = 1800 }: CountUpValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  const { end, suffix } = useMemo(() => parseStatValue(value), [value]);
  const [display, setDisplay] = useState(1);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isInView || hasRun.current || end <= 0) return;
    hasRun.current = true;

    const start = 1;
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - (1 - t) ** 3;
      const current = Math.round(start + (end - start) * eased);
      setDisplay(Math.max(1, Math.min(current, end)));
      if (t < 1) requestAnimationFrame(tick);
      else setDisplay(end);
    };

    requestAnimationFrame(tick);
  }, [isInView, end, durationMs]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {end > 0 ? display : value}
      {end > 0 ? suffix : null}
    </span>
  );
}
