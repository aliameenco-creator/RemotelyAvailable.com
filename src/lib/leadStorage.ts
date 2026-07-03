// Shared localStorage keys for lead-capture state so the popup and inline
// forms stay in sync (an inline submit also suppresses the popup).

export const VISITED_PAGES_KEY = "ra_visited_pages";
export const POPUP_DISMISSED_KEY = "ra_lead_popup_dismissed";
export const LEAD_SUBMITTED_KEY = "ra_lead_popup_submitted";
export const TOAST_DISMISSED_KEY = "ra_lead_toast_dismissed";

export function markLeadSubmitted() {
  try {
    localStorage.setItem(LEAD_SUBMITTED_KEY, "true");
  } catch {
    // localStorage unavailable (private mode) — non-fatal
  }
}

export function isLeadCaptured(): boolean {
  try {
    return localStorage.getItem(LEAD_SUBMITTED_KEY) === "true";
  } catch {
    return false;
  }
}

/**
 * Popup dismissal timestamp in ms, or null if never dismissed / expired.
 * Legacy "true" values (pre-cooldown) are migrated to the current time.
 */
export function getPopupDismissedAt(): number | null {
  try {
    const raw = localStorage.getItem(POPUP_DISMISSED_KEY);
    if (!raw) return null;
    if (raw === "true") {
      const now = Date.now();
      localStorage.setItem(POPUP_DISMISSED_KEY, String(now));
      return now;
    }
    const ts = Number(raw);
    return Number.isFinite(ts) ? ts : null;
  } catch {
    return null;
  }
}

export function markPopupDismissed() {
  try {
    localStorage.setItem(POPUP_DISMISSED_KEY, String(Date.now()));
  } catch {
    // non-fatal
  }
}

export function getToastDismissedAt(): number | null {
  try {
    const ts = Number(localStorage.getItem(TOAST_DISMISSED_KEY));
    return Number.isFinite(ts) && ts > 0 ? ts : null;
  } catch {
    return null;
  }
}

export function markToastDismissed() {
  try {
    localStorage.setItem(TOAST_DISMISSED_KEY, String(Date.now()));
  } catch {
    // non-fatal
  }
}
