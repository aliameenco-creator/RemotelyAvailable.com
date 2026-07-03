"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { services } from "@/data/services";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import {
  ServiceVignette,
  SERVICE_SLUG_VIGNETTES,
} from "@/components/services/ServiceVignette";

export function ServicesGrid() {
  return (
    <section className="py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading
            badge="What We Do"
            title="Everything your business needs to grow"
            description="From websites and social media to design, SEO, and automation, we handle the work that moves your business forward, and use AI where it genuinely helps."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ScrollReveal key={service.slug} delay={i * 0.1}>
              <Link href={`/services/${service.slug}`} className="block h-full">
                <Card className="group h-full p-8" glow>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600/10 text-primary-400 transition-[background,transform] duration-200 ease-out group-hover:bg-primary-600/20 group-hover:-rotate-6 group-hover:scale-110">
                    <ServiceIcon name={service.icon} size={24} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    {service.shortTitle}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    {service.tagline}
                  </p>
                  {SERVICE_SLUG_VIGNETTES[service.slug] && (
                    <div className="mt-4 flex h-[104px] flex-col justify-center">
                      <ServiceVignette
                        variant={SERVICE_SLUG_VIGNETTES[service.slug]}
                      />
                    </div>
                  )}
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary-400 transition-colors group-hover:text-primary-300">
                    Learn more
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
