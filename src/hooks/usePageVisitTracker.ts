"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { leadPopupConfig } from "@/lib/constants";

const STORAGE_KEY = "ra_visited_pages";
const DISMISSED_KEY = "ra_lead_popup_dismissed";
const SUBMITTED_KEY = "ra_lead_popup_submitted";

export function usePageVisitTracker() {
  const pathname = usePathname();
  const [shouldShowPopup, setShouldShowPopup] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed or submitted
    if (
      localStorage.getItem(DISMISSED_KEY) === "true" ||
      localStorage.getItem(SUBMITTED_KEY) === "true"
    ) {
      return;
    }

    // Get existing visited pages set
    const stored = localStorage.getItem(STORAGE_KEY);
    const visitedPages: string[] = stored ? JSON.parse(stored) : [];
    const visitedSet = new Set(visitedPages);

    // Add current page
    visitedSet.add(pathname);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...visitedSet]));

    // Check threshold
    if (visitedSet.size >= leadPopupConfig.pageThreshold) {
      const timer = setTimeout(
        () => setShouldShowPopup(true),
        leadPopupConfig.delayMs
      );
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  function dismiss() {
    setShouldShowPopup(false);
    localStorage.setItem(DISMISSED_KEY, "true");
  }

  function markSubmitted() {
    setShouldShowPopup(false);
    localStorage.setItem(SUBMITTED_KEY, "true");
  }

  return { shouldShowPopup, dismiss, markSubmitted };
}
