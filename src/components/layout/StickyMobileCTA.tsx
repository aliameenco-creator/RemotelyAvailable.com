"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

// Mobile-only bottom CTA bar for high-intent programmatic pages. Fixed
// positioning means it never causes layout shift; it slides in after the
// visitor has scrolled past the hero.
export function StickyMobileCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 md:hidden",
        "border-t border-white/[0.08] bg-bg-card/95 backdrop-blur",
        "px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]",
        "transition-transform duration-300 ease-out",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      )}
    >
      <Link
        href="/contact"
        onClick={() =>
          trackEvent("sticky_cta_click", { page: pathname ?? "" })
        }
        className={cn(
          "flex w-full items-center justify-center gap-2",
          "rounded-[var(--radius-pill)] bg-primary-600 px-6 py-3.5",
          "text-sm font-semibold text-[#1a1a1a]",
          "transition-colors hover:bg-primary-400 active:bg-primary-700"
        )}
      >
        Get a Free Strategy Call
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}
