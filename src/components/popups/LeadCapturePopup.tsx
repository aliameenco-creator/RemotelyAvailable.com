"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, CheckCircle2 } from "lucide-react";
import { usePageVisitTracker } from "@/hooks/usePageVisitTracker";
import { leadPopupConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function LeadCapturePopup() {
  const { shouldShowPopup, dismiss, markSubmitted } = usePageVisitTracker();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

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
        }),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      markSubmitted();

      // Auto-close after 3 seconds
      setTimeout(dismiss, 3000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {shouldShowPopup && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
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
                "relative w-full max-w-md pointer-events-auto",
                "glass bg-bg-card/95 backdrop-blur-xl rounded-[var(--radius-card)]",
                "border border-white/[0.10] shadow-2xl shadow-black/50 p-8"
              )}
            >
              {/* Close button */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {status === "success" ? (
                /* Success State */
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7 text-success" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
                    Check your inbox!
                  </h3>
                  <p className="text-text-secondary text-sm">
                    We&apos;ll send your personalized AI automation blueprint within 24 hours.
                  </p>
                </div>
              ) : (
                /* Form State */
                <>
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600/20 to-accent-600/20 flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-6 h-6 text-primary-400" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
                      {leadPopupConfig.heading}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {leadPopupConfig.subtext}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Your name"
                        className={cn(
                          "w-full rounded-[var(--radius-button)] border border-bg-subtle bg-bg-card px-4 py-3 text-sm text-text-primary",
                          "placeholder:text-text-muted",
                          "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
                          "transition-colors duration-200",
                          errors.name && "border-error focus:border-error focus:ring-error"
                        )}
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
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="Your email"
                        className={cn(
                          "w-full rounded-[var(--radius-button)] border border-bg-subtle bg-bg-card px-4 py-3 text-sm text-text-primary",
                          "placeholder:text-text-muted",
                          "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
                          "transition-colors duration-200",
                          errors.email && "border-error focus:border-error focus:ring-error"
                        )}
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
                        "transition-all duration-200",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                    >
                      {status === "loading" ? "Sending..." : "Get My Free Blueprint"}
                    </button>
                  </form>

                  <button
                    onClick={dismiss}
                    className="block w-full text-center mt-4 text-xs text-text-faint hover:text-text-muted transition-colors"
                  >
                    No thanks, maybe later
                  </button>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
