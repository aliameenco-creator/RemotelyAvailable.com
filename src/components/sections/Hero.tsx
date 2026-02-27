"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects — grid hidden on mobile, orbs hidden on mobile */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden hidden sm:block" aria-hidden="true">
        <svg className="absolute inset-0 h-full w-full opacity-60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.04)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-base" />
      </div>

      {/* Gradient orbs — hidden on mobile for performance */}
      <div className="pointer-events-none absolute top-1/4 -left-20 hidden h-96 w-96 rounded-full bg-primary-600/15 blur-[100px] sm:block animate-orb-1" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-1/4 -right-20 hidden h-96 w-96 rounded-full bg-accent-600/15 blur-[100px] sm:block animate-orb-2" aria-hidden="true" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="animate-fade-in-up">
            <span className="mb-6 inline-block rounded-full border border-primary-600/30 bg-primary-600/10 px-4 py-1.5 text-sm font-medium text-primary-400">
              AI Automation Agency
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            We Build{" "}
            <GradientText>AI Systems</GradientText>
            <br />
            That Actually Work
          </h1>

          {/* Subheadline */}
          <p
            className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed sm:text-xl animate-fade-in-up"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            Automations, voice agents, chatbots, and intelligent websites —
            engineered to save your team{" "}
            <span className="text-text-primary font-medium">40+ hours a week</span> and
            drive real business results.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in-up"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            <Button href="/contact" size="lg" icon={<ArrowRight size={18} />}>
              Talk to Us
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              See Our Services
            </Button>
          </div>

          {/* Trust line */}
          <p
            className="mt-6 text-sm text-text-muted animate-fade-in-up"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            No commitment. 30-minute call. Real strategy.
          </p>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up"
        style={{ animationDelay: "0.8s", animationFillMode: "both" }}
      >
        <div className="animate-bounce">
          <ChevronDown size={24} className="text-text-muted" />
        </div>
      </div>
    </section>
  );
}
