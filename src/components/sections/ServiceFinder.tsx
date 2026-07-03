"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Clock,
  Megaphone,
  Palette,
  Search,
  ShoppingBag,
  MonitorSmartphone,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import {
  ServiceVignette,
  SERVICE_SLUG_VIGNETTES,
} from "@/components/services/ServiceVignette";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const GOALS = [
  {
    id: "admin",
    icon: Clock,
    label: "Too much manual admin",
    sub: "emails, invoices, follow-ups",
    serviceSlug: "ai-automations",
    why: "Automation pays back fastest here — most clients reclaim 20-40 hours a week within the first month.",
  },
  {
    id: "leads",
    icon: Search,
    label: "Not enough enquiries",
    sub: "invisible on Google",
    serviceSlug: "seo-content",
    why: "SEO and content compound: rank for what buyers search and enquiries arrive while you sleep.",
  },
  {
    id: "website",
    icon: MonitorSmartphone,
    label: "Website doesn't convert",
    sub: "dated, slow, or DIY",
    serviceSlug: "web-development",
    why: "Your site is the first thing every prospect checks — fixing it lifts every other channel at once.",
  },
  {
    id: "social",
    icon: Megaphone,
    label: "Socials are inconsistent",
    sub: "posting when there's time",
    serviceSlug: "social-media-management",
    why: "A managed pipeline posts on-brand content every week without stealing your evenings.",
  },
  {
    id: "brand",
    icon: Palette,
    label: "Brand looks unprofessional",
    sub: "logo, design, materials",
    serviceSlug: "design",
    why: "Consistent design earns trust before you say a word — and makes everything else convert better.",
  },
  {
    id: "shopify",
    icon: ShoppingBag,
    label: "Shopify store eats my time",
    sub: "orders, support, ops",
    serviceSlug: "shopify-automation",
    why: "Store operations are the most automatable work there is — orders, tracking, and support can run themselves.",
  },
] as const;

type Goal = (typeof GOALS)[number];

export function ServiceFinder() {
  const [picked, setPicked] = useState<Goal | null>(null);
  const service = picked
    ? services.find((s) => s.slug === picked.serviceSlug)
    : null;

  function choose(goal: Goal) {
    setPicked(goal);
    trackEvent("service_finder_pick", { goal: goal.id, service: goal.serviceSlug });
  }

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-900/10 to-transparent" />
      <Container className="relative z-10">
        <SectionHeading
          badge="Start Here"
          title="What Should You Fix First?"
          description="Pick your biggest headache — we'll point you at the highest-ROI starting point."
        />

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3">
          {GOALS.map((goal) => {
            const Icon = goal.icon;
            const active = picked?.id === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => choose(goal)}
                className={cn(
                  "flex flex-col items-start gap-2.5 rounded-xl border p-4 text-left",
                  "transition-all duration-200",
                  active
                    ? "border-primary-500 bg-primary-600/15 shadow-[0_0_24px_rgba(227,140,53,0.15)]"
                    : "border-white/[0.1] bg-bg-card hover:border-primary-500/50 hover:bg-primary-600/5 hover:-translate-y-0.5",
                  "active:scale-95"
                )}
              >
                <Icon
                  size={20}
                  className={cn(
                    "transition-transform duration-200",
                    active ? "scale-110 text-primary-400" : "text-primary-400/80"
                  )}
                />
                <span className="text-sm font-semibold leading-snug text-text-primary">
                  {goal.label}
                </span>
                <span className="font-mono text-[10.5px] text-text-muted">
                  {goal.sub}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {picked && service && (
            <motion.div
              key={picked.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mx-auto mt-8 max-w-4xl"
            >
              <div className="grid items-center gap-8 rounded-[var(--radius-card)] border border-primary-600/30 bg-gradient-to-br from-primary-600/10 to-accent-600/10 p-8 sm:p-10 lg:grid-cols-[1fr_auto]">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-400">
                    Your best starting point
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-text-primary sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-text-secondary">
                    {picked.why}
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button
                      href="/contact"
                      analyticsEvent="cta_click"
                      analyticsLabel={`service-finder:${picked.serviceSlug}`}
                      icon={<ArrowRight size={16} />}
                    >
                      Get a Free Plan for This
                    </Button>
                    <Button href={`/services/${service.slug}`} variant="secondary">
                      Explore {service.shortTitle}
                    </Button>
                  </div>
                </div>
                {SERVICE_SLUG_VIGNETTES[service.slug] && (
                  <div className="hidden w-64 lg:block">
                    <ServiceVignette
                      variant={SERVICE_SLUG_VIGNETTES[service.slug]}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
