"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Gift, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import {
  getToastDismissedAt,
  isLeadCaptured,
  markLeadSubmitted,
  markToastDismissed,
} from "@/lib/leadStorage";
import { cn } from "@/lib/utils";

const COOLDOWN_DAYS = 7;
const DWELL_MS = 20000;
const SCROLL_DEPTH = 45;

const ELIGIBLE_PREFIXES = [
  "/services",
  "/locations",
  "/automations",
  "/ai-automation-systems",
];

// Compact bottom-left lead magnet, desktop only. Fires on 20s dwell or 45%
// scroll — a second, softer chance at the lead with a different offer than
// the popup quiz.
export function SlideInLeadToast() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isLocation = pathname?.startsWith("/locations") ?? false;

  useEffect(() => {
    if (!pathname || !ELIGIBLE_PREFIXES.some((p) => pathname.startsWith(p)))
      return;
    if (isLeadCaptured()) return;
    const dismissedAt = getToastDismissedAt();
    if (
      dismissedAt !== null &&
      Date.now() - dismissedAt < COOLDOWN_DAYS * 24 * 60 * 60 * 1000
    )
      return;

    let fired = false;
    function fire(triggerName: string) {
      if (fired) return;
      fired = true;
      setVisible(true);
      trackEvent("lead_toast_shown", { trigger: triggerName, page: pathname ?? "" });
    }

    const timer = setTimeout(() => fire("dwell"), DWELL_MS);
    function onScroll() {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if ((window.scrollY / scrollable) * 100 >= SCROLL_DEPTH) fire("scroll");
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  function handleDismiss() {
    setVisible(false);
    markToastDismissed();
    trackEvent("lead_toast_dismissed", { page: pathname ?? "" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      name.trim().length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      setErrorMsg("Add your name and a valid email first.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          source: `slide-in:${pathname}`,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      markLeadSubmitted();
      trackEvent("lead_submit", { source: "slide-in", page: pathname ?? "" });
      setTimeout(() => setVisible(false), 3000);
    } catch {
      setErrorMsg(
        "Couldn't send just now. Please try again or email hello@remotelyavailable.com."
      );
      setStatus("error");
    }
  }

  const inputClasses =
    "w-full rounded-lg border border-bg-subtle bg-bg-base/70 px-3 py-2 text-xs text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "fixed bottom-6 left-6 z-[55] hidden w-[330px] md:block",
            "rounded-[var(--radius-card)] border border-white/[0.12] bg-bg-card/95 backdrop-blur-xl",
            "p-5 shadow-2xl shadow-black/50"
          )}
        >
          <button
            onClick={handleDismiss}
            aria-label="Close"
            className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-white/5 hover:text-text-primary"
          >
            <X size={14} />
          </button>

          {status === "success" ? (
            <div className="flex items-center gap-3 py-2">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-success" />
              <p className="text-sm text-text-secondary">
                Done! Check your inbox in the next 24 hours.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-600/25 to-accent-600/25">
                  <Gift size={16} className="text-primary-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {isLocation
                      ? "3 quick-win automations for local businesses"
                      : "The 5 automations most teams launch first"}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-text-muted">
                    Free, specific, and yours in one email. No follow-up
                    sequence, promise.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-4 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="Name"
                    aria-label="Your name"
                    className={inputClasses}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="Email"
                    aria-label="Your email"
                    className={inputClasses}
                  />
                </div>
                {status === "error" && (
                  <p className="text-[11px] text-error">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={cn(
                    "w-full rounded-lg bg-primary-600 py-2 text-xs font-semibold text-[#1a1a1a]",
                    "transition-all duration-150 hover:bg-primary-400 hover:scale-[1.02] active:scale-95",
                    "disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                >
                  {status === "loading" ? "Sending…" : "Send It Over"}
                </button>
              </form>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
