"use client";

import { Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="py-24 bg-bg-card">
      <Container>
        <ScrollReveal>
          <SectionHeading
            badge="Client Results"
            title="Trusted by Teams Who Ship"
            description="Real results from real businesses. Here's what our clients say about working with us."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Card className="relative h-full p-8" hover={false}>
                <Quote
                  size={32}
                  className="absolute top-6 right-6 text-primary-600/20"
                />
                <p className="text-text-secondary leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600/20 text-sm font-bold text-primary-400">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-primary">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-text-muted">
                      {testimonial.title}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
