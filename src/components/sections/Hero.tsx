"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
        aria-hidden="true"
      >
        <source src="/Background.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay to blend video into the page */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg-base/50 via-bg-base/40 to-bg-base" aria-hidden="true" />

      {/* Copper glow behind the headline */}
      <div
        className="ra-glow-copper pointer-events-none absolute left-1/2 top-1/3 hidden h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 sm:block"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <div className="animate-fade-in-up">
            <span className="ra-eyebrow mb-6 inline-block">
              {"// "}A digital agency that delivers results
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-4xl tracking-[-0.02em] sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            We take the{" "}
            <GradientText>busywork</GradientText>
            <br />
            off your plate
          </h1>

          {/* Subheadline */}
          <p
            className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed sm:text-xl animate-fade-in-up"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            Websites, social media, design, SEO, and automation — done for you, so
            your team spends its time{" "}
            <span className="text-text-primary font-medium">where it actually counts</span>.
            We use AI where it makes a real difference.
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
