"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpStatProps {
  /** Display value like "500+", "95%", "<48hr" — digits animate, the rest stays. */
  value: string;
  label: string;
}

// Splits "500+" into prefix/number/suffix and counts the number up when the
// stat scrolls into view. Falls back to static text if the value has no digits.
export function CountUpStat({ value, label }: CountUpStatProps) {
  const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
  const target = match ? parseInt(match[2], 10) : 0;
  const prefix = match?.[1] ?? "";
  const suffix = match?.[3] ?? "";

  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (!("IntersectionObserver" in window)) {
      const id = requestAnimationFrame(() => setRun(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRun(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!run) return;
    let raf: number;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);

  return (
    <div
      ref={ref}
      className="spot-card rounded-xl border border-white/[0.08] bg-bg-card p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:border-primary-600/40"
    >
      <p className="font-display text-3xl font-bold text-primary-400 tabular-nums">
        {match ? `${prefix}${run ? n : 0}${suffix}` : value}
      </p>
      <p className="mt-2 text-sm text-text-secondary">{label}</p>
    </div>
  );
}
