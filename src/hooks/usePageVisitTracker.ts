"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { leadPopupConfig } from "@/lib/constants";
import {
  VISITED_PAGES_KEY,
  getPopupDismissedAt,
  isLeadCaptured,
  markPopupDismissed,
  markLeadSubmitted,
} from "@/lib/leadStorage";

export type PopupTrigger = "pages" | "scroll" | "exit";

export function usePageVisitTracker() {
  const pathname = usePathname();
  const [shouldShowPopup, setShouldShowPopup] = useState(false);
  const [trigger, setTrigger] = useState<PopupTrigger | null>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    // Never show again after a submit; after a dismissal, wait out the cooldown
    if (isLeadCaptured()) return;
    const dismissedAt = getPopupDismissedAt();
    if (
      dismissedAt !== null &&
      Date.now() - dismissedAt <
        leadPopupConfig.dismissCooldownDays * 24 * 60 * 60 * 1000
    ) {
      return;
    }

    // Pointless on the contact page — the visitor is already converting
    if (pathname?.startsWith("/contact")) return;

    function fire(reason: PopupTrigger) {
      if (firedRef.current) return;
      firedRef.current = true;
      setTrigger(reason);
      setShouldShowPopup(true);
    }

    // Trigger 1: distinct pages visited
    const stored = localStorage.getItem(VISITED_PAGES_KEY);
    const visitedPages: string[] = stored ? JSON.parse(stored) : [];
    const visitedSet = new Set(visitedPages);
    visitedSet.add(pathname ?? "/");
    localStorage.setItem(VISITED_PAGES_KEY, JSON.stringify([...visitedSet]));

    let timer: ReturnType<typeof setTimeout> | undefined;
    if (visitedSet.size >= leadPopupConfig.pageThreshold) {
      timer = setTimeout(() => fire("pages"), leadPopupConfig.delayMs);
    }

    // Trigger 2: scroll depth (works on mobile, where exit-intent doesn't)
    function onScroll() {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = (window.scrollY / scrollable) * 100;
      if (depth >= leadPopupConfig.scrollDepthPercent) fire("scroll");
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    // Trigger 3: desktop exit intent (cursor leaves through the top edge)
    function onMouseOut(e: MouseEvent) {
      if (!leadPopupConfig.exitIntent) return;
      if (e.relatedTarget === null && e.clientY <= 0) fire("exit");
    }
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [pathname]);

  function dismiss() {
    setShouldShowPopup(false);
    markPopupDismissed();
  }

  function markSubmitted() {
    setShouldShowPopup(false);
    markLeadSubmitted();
  }

  return { shouldShowPopup, trigger, dismiss, markSubmitted };
}
