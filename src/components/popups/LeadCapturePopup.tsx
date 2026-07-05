"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Mail,
  Megaphone,
  MoreHorizontal,
  PhoneMissed,
  Users,
  X,
} from "lucide-react";
import { usePageVisitTracker } from "@/hooks/usePageVisitTracker";
import { trackEvent } from "@/lib/analytics";
import { markLeadSubmitted } from "@/lib/leadStorage";
import { cn } from "@/lib/utils";

const PAIN_POINTS = [
  { id: "emails", label: "Answering emails & enquiries", icon: Mail },
  { id: "invoices", label: "Invoices & admin paperwork", icon: FileText },
  { id: "missed-calls", label: "Missed calls & follow-ups", icon: PhoneMissed },
  { id: "content", label: "Social & content creation", icon: Megaphone },
  { id: "leads", label: "Chasing & qualifying leads", icon: Users },
  { id: "other", label: "Something else entirely", icon: MoreHorizontal },
] as const;

type PainId = (typeof PAIN_POINTS)[number]["id"];

const FIX_COPY: Record<PainId, string> = {
  emails: "an inbox that answers itself",
  invoices: "paperwork that files itself",
  "missed-calls": "a phone line that never misses",
  content: "a content engine that posts weekly",
  leads: "leads that qualify themselves",
  other: "your biggest time drain",
};

export function LeadCapturePopup() {
  const { shouldShowPopup, trigger, dismiss } = usePageVisitTracker();
  const [step, setStep] = useState<"pain" | "contact">("pain");
  const [pain, setPain] = useState<PainId | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    if (shouldShowPopup) {
      trackEvent("lead_popup_shown", { trigger: trigger ?? "unknown" });
    }
  }, [shouldShowPopup, trigger]);

  function handleDismiss() {
    trackEvent("lead_popup_dismissed", {
      trigger: trigger ?? "unknown",
      step,
    });
    dismiss();
  }

  function choosePain(id: PainId) {
    setPain(id);
    setStep("contact");
    trackEvent("lead_popup_step", { painPoint: id });
  }

  function validate(): boolean {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim() || name.trim().length < 2)
      newErrors.name = "Please enter your name";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Please enter a valid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          source: "website-lead-popup",
          painPoint: pain ?? undefined,
        }),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      trackEvent("lead_submit", { source: "popup", painPoint: pain ?? "" });
      // Persist immediately so the popup never re-shows, but don't hide it
      // yet: shouldShowPopup must stay true for the success screen to
      // actually render before the auto-close below.
      markLeadSubmitted();

      // Auto-close after 3.5 seconds, once the success screen has been seen
      setTimeout(dismiss, 3500);
    } catch {
      setStatus("error");
    }
  }

  const inputClasses = (hasError?: string) =>
    cn(
      "w-full rounded-[var(--radius-button)] border border-bg-subtle bg-bg-card px-4 py-3 text-sm text-text-primary",
      "placeholder:text-text-muted",
      "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
      "transition-colors duration-200",
      hasError && "border-error focus:border-error focus:ring-error"
    );

  const painLabel = pain
    ? PAIN_POINTS.find((p) => p.id === pain)?.label ?? ""
    : "";

  return (
    <AnimatePresence>
      {shouldShowPopup && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={cn(
                "border-beam relative w-full max-w-md pointer-events-auto",
                "glass bg-bg-card/95 backdrop-blur-xl rounded-[var(--radius-card)]",
                "border border-white/[0.10] shadow-2xl shadow-black/50 p-8"
              )}
            >
              {/* Close button */}
              <button
                onClick={handleDismiss}
                aria-label="Close"
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Step dots */}
              {status !== "success" && (
                <div className="mb-5 flex items-center gap-1.5">
                  <span className="h-1 w-6 rounded-full bg-primary-400" />
                  <span
                    className={cn(
                      "h-1 w-6 rounded-full transition-colors duration-300",
                      step === "contact" ? "bg-primary-400" : "bg-white/[0.12]"
                    )}
                  />
                </div>
              )}

              {status === "success" ? (
                /* Success */
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 className="w-7 h-7 text-success" />
                  </motion.div>
                  <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
                    On its way!
                  </h3>
                  <p className="text-text-secondary text-sm">
                    Your plan for {pain ? FIX_COPY[pain] : "your bottleneck"}{" "}
                    lands in your inbox within 24 hours.
                  </p>
                </div>
              ) : (
                <AnimatePresence mode="wait" initial={false}>
                  {step === "pain" ? (
                    /* Step 1: pick the pain */
                    <motion.div
                      key="pain"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-xl font-display font-semibold text-text-primary mb-1">
                        What&apos;s eating your team&apos;s time?
                      </h3>
                      <p className="text-text-secondary text-sm mb-5">
                        Pick one. We&apos;ll send a specific, free plan to
                        automate it, not a generic brochure.
                      </p>
                      <div className="grid grid-cols-2 gap-2.5">
                        {PAIN_POINTS.map(({ id, label, icon: Icon }, i) => (
                          <motion.button
                            key={id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 + i * 0.05 }}
                            onClick={() => choosePain(id)}
                            className={cn(
                              "flex flex-col items-start gap-2 rounded-xl border border-white/[0.1] bg-bg-base/60 p-3.5 text-left",
                              "transition-all duration-150",
                              "hover:border-primary-500/60 hover:bg-primary-600/10 hover:-translate-y-0.5",
                              "active:scale-95"
                            )}
                          >
                            <Icon size={17} className="text-primary-400" />
                            <span className="text-xs font-medium leading-snug text-text-primary">
                              {label}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    /* Step 2: contact */
                    <motion.div
                      key="contact"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={() => setStep("pain")}
                        className="mb-3 inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary transition-colors"
                      >
                        <ArrowLeft size={12} />
                        {painLabel}
                      </button>
                      <h3 className="text-xl font-display font-semibold text-text-primary mb-1">
                        Where do we send your fix?
                      </h3>
                      <p className="text-text-secondary text-sm mb-5">
                        We&apos;ll reply within 24 hours with 2-3 proven
                        automations for {pain ? FIX_COPY[pain] : "this"}. No
                        spam, ever.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              if (errors.name)
                                setErrors((prev) => ({ ...prev, name: undefined }));
                            }}
                            placeholder="Your name"
                            autoFocus
                            className={inputClasses(errors.name)}
                          />
                          {errors.name && (
                            <p className="text-xs text-error">{errors.name}</p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (errors.email)
                                setErrors((prev) => ({ ...prev, email: undefined }));
                            }}
                            placeholder="Your email"
                            className={inputClasses(errors.email)}
                          />
                          {errors.email && (
                            <p className="text-xs text-error">{errors.email}</p>
                          )}
                        </div>

                        {status === "error" && (
                          <p className="text-xs text-error text-center">
                            Something went wrong. Please try again.
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className={cn(
                            "w-full py-3 rounded-[var(--radius-pill)] text-sm font-medium text-white",
                            "bg-primary-600 hover:bg-primary-500 active:bg-primary-700",
                            "shadow-lg shadow-primary-600/20 hover:shadow-primary-500/30",
                            "transition-all duration-200 hover:scale-[1.015] active:scale-95",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                          )}
                        >
                          {status === "loading" ? "Sending..." : "Send My Free Fix"}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              {status !== "success" && (
                <button
                  onClick={handleDismiss}
                  className="block w-full text-center mt-4 text-xs text-text-faint hover:text-text-muted transition-colors"
                >
                  No thanks, maybe later
                </button>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
