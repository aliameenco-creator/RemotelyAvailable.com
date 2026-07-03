"use client";

import { useEffect } from "react";

// One document-level mousemove listener that feeds cursor coordinates to any
// element carrying the .spot-card class (CSS paints the actual glow). Keeps
// the Card primitive a server component across 500+ static pages.
export function SpotlightListener() {
  useEffect(() => {
    let raf = 0;
    function onMove(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        ".spot-card"
      );
      if (!el) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
        el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
      });
    }
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return null;
}
