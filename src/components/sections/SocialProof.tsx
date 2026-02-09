"use client";

import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { stats } from "@/data/navigation";

export function SocialProof() {
  return (
    <section className="relative border-y border-white/[0.06] bg-bg-card py-16">
      <Container>
        <ScrollReveal>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
