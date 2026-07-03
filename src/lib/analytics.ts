declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type AnalyticsEvent =
  | "cta_click"
  | "lead_submit"
  | "lead_popup_shown"
  | "lead_popup_dismissed"
  | "sticky_cta_click"
  | "whatsapp_click";

/** Push a conversion event to the GTM dataLayer. No-op on the server. */
export function trackEvent(
  event: AnalyticsEvent | string,
  params: Record<string, string | number | undefined> = {}
) {
  if (typeof window === "undefined") return;
  (window.dataLayer ||= []).push({ event, ...params });
}
