"use client";

import { ArrowRight, PhoneCall, Map, Rocket } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { Constellation } from "@/components/effects/Constellation";

const JOURNEY = [
  { icon: PhoneCall, label: "Free 30-min call", meta: "today" },
  { icon: Map, label: "Your custom plan", meta: "within 48 hrs" },
  { icon: Rocket, label: "System live", meta: "in weeks, not months" },
];

function JourneyPath() {
  return (
    <div className="mt-10 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-0">
      {JOURNEY.map(({ icon: Icon, label, meta }, i) => (
        <div key={label} className="flex flex-col items-center sm:flex-row">
          <div className="flex w-44 flex-col items-center gap-2 rounded-xl border border-white/[0.1] bg-bg-card/70 px-4 py-4 backdrop-blur-sm">
            <span
              className={
                "flex h-9 w-9 items-center justify-center rounded-full " +
                (i === 0
                  ? "bg-primary-600/20 text-primary-400"
                  : i === 1
                    ? "bg-accent-600/20 text-accent-400"
                    : "bg-success/15 text-success")
              }
            >
              <Icon size={16} aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold text-text-primary">{label}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
              {meta}
            </span>
          </div>
          {i < JOURNEY.length - 1 && (
            <svg
              viewBox="0 0 40 8"
              className="h-2 w-8 rotate-90 sm:mx-1 sm:rotate-0"
              aria-hidden="true"
            >
              <line
                x1="0"
                y1="4"
                x2="40"
                y2="4"
                stroke="var(--ra-copper)"
                strokeOpacity="0.6"
                strokeWidth="2"
                strokeDasharray="4 5"
                className="wf-flow"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

export function CTABanner() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-bg-base to-accent-900/40" />
      <GradientOrb
        color="primary"
        size="lg"
        animation={1}
        className="top-0 left-1/4 opacity-30"
      />
      <GradientOrb
        color="accent"
        size="md"
        animation={2}
        className="bottom-0 right-1/4 opacity-30"
      />
      <Constellation />

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Ready to Put AI to Work for Your Business?
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Tell us about your business. We&apos;ll map out the AI
              opportunities and show you exactly what&apos;s possible, no
              fluff, no hard sell.
            </p>
            <JourneyPath />
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                href="/contact"
                size="lg"
                icon={<ArrowRight size={18} />}
                analyticsEvent="cta_click"
                analyticsLabel="cta-banner"
              >
                Talk to Us
              </Button>
            </div>
            <p className="mt-4 text-sm text-text-muted">
              No commitment. No hard sell. Just real strategy.
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
