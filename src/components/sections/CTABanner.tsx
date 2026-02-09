"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientOrb } from "@/components/effects/GradientOrb";

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

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Ready to Put AI to Work for Your Business?
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Book a free 30-minute strategy call. We&apos;ll map out the AI
              opportunities in your business and show you exactly what&apos;s
              possible.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="/contact" size="lg" icon={<ArrowRight size={18} />}>
                Book Your Free Strategy Call
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
