"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// Document-level delegated click tracking so server-rendered elements can
// emit dataLayer events via data-analytics-event / data-analytics-label
// attributes without hydrating.
export function AnalyticsListener() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-analytics-event]"
      );
      if (!target?.dataset.analyticsEvent) return;
      trackEvent(target.dataset.analyticsEvent, {
        label: target.dataset.analyticsLabel,
        page: window.location.pathname,
      });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
