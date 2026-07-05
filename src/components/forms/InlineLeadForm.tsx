"use client";

import { useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { trackEvent } from "@/lib/analytics";
import { markLeadSubmitted } from "@/lib/leadStorage";
import { cn } from "@/lib/utils";

interface InlineLeadFormProps {
  heading: string;
  subtext?: string;
  /** Passed through to /api/leads so n8n can attribute the lead. */
  source: string;
  buttonLabel?: string;
}

export function InlineLeadForm({
  heading,
  subtext,
  source,
  buttonLabel = "Get My Free Audit",
}: InlineLeadFormProps) {
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
          source,
        }),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      markLeadSubmitted();
      trackEvent("lead_submit", { source });
    } catch {
      setStatus("error");
    }
  }

  const inputClasses = (hasError?: string) =>
    cn(
      "w-full rounded-[var(--radius-button)] border border-bg-subtle bg-bg-base px-4 py-3 text-sm text-text-primary",
      "placeholder:text-text-muted",
      "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
      "transition-colors duration-200",
      hasError && "border-error focus:border-error focus:ring-error"
    );

  return (
    <section className="py-16">
      <Container>
        <div className="mx-auto max-w-3xl rounded-xl border border-primary-600/20 bg-gradient-to-br from-primary-600/10 to-accent-600/10 p-8 sm:p-10">
          {status === "success" ? (
            <div className="py-4 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-7 w-7 text-success" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-text-primary">
                Check your inbox!
              </h3>
              <p className="text-sm text-text-secondary">
                We&apos;ll send your personalized plan within 24 hours.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-600/20 to-accent-600/20">
                  <Sparkles className="h-6 w-6 text-primary-400" />
                </div>
                <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
                  {heading}
                </h2>
                {subtext && (
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-text-secondary">
                    {subtext}
                  </p>
                )}
              </div>

              <form
                onSubmit={handleSubmit}
                className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row sm:items-start"
              >
                <div className="flex-1 space-y-1.5">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name)
                        setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="Your name"
                    aria-label="Your name"
                    className={inputClasses(errors.name)}
                  />
                  {errors.name && (
                    <p className="text-xs text-error">{errors.name}</p>
                  )}
                </div>

                <div className="flex-1 space-y-1.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email)
                        setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="Your email"
                    aria-label="Your email"
                    className={inputClasses(errors.email)}
                  />
                  {errors.email && (
                    <p className="text-xs text-error">{errors.email}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={cn(
                    "shrink-0 rounded-[var(--radius-pill)] px-6 py-3 text-sm font-semibold text-white",
                    "bg-primary-600 hover:bg-primary-500 active:bg-primary-700",
                    "shadow-lg shadow-primary-600/20 hover:shadow-primary-500/30",
                    "transition-all duration-200",
                    "disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                >
                  {status === "loading" ? "Sending..." : buttonLabel}
                </button>
              </form>

              {status === "error" && (
                <p className="mt-3 text-center text-xs text-error">
                  Couldn&apos;t send just now. Please try again or email
                  hello@remotelyavailable.com.
                </p>
              )}
              <p className="mt-4 text-center text-xs text-text-muted">
                No spam, no commitment. Just a genuinely useful plan.
              </p>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
