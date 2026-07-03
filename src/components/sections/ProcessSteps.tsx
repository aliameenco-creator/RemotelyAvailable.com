"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { processSteps } from "@/data/navigation";

export function ProcessSteps() {
  return (
    <section className="py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            badge="How We Work"
            title="From Discovery to Delivery"
            description="A proven process that turns your business challenges into working AI systems, no fluff, no delays."
          />
        </ScrollReveal>

        <div className="relative mx-auto max-w-4xl">
          {/* Connector Line (desktop) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-bg-subtle to-transparent md:block" />

          <div className="grid gap-12 md:gap-16">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.15}>
                <div
                  className={`flex flex-col items-center gap-6 md:flex-row ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      i % 2 === 1 ? "md:text-right" : "md:text-left"
                    } text-center`}
                  >
                    <h3 className="font-display text-xl font-bold text-text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Number */}
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary-600 bg-bg-base">
                    <span className="font-display text-lg font-bold text-primary-400">
                      {step.step}
                    </span>
                  </div>

                  {/* Spacer */}
                  <div className="hidden flex-1 md:block" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
