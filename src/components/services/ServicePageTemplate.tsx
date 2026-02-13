"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CTABanner } from "@/components/sections/CTABanner";
import { FAQ } from "@/components/sections/FAQ";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { Service } from "@/data/services";

interface ServicePageTemplateProps {
  service: Service;
}

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <GradientOrb
          color="primary"
          size="lg"
          animation={1}
          className="-top-20 -right-20 opacity-20"
        />
        <Container className="relative z-10">
          <ScrollReveal>
            <nav className="mb-8 text-sm text-text-muted">
              <Link href="/" className="hover:text-text-secondary transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link
                href="/services"
                className="hover:text-text-secondary transition-colors"
              >
                Services
              </Link>
              <span className="mx-2">/</span>
              <span className="text-text-secondary">{service.shortTitle}</span>
            </nav>

            <div className="max-w-3xl">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-600/10 text-primary-400">
                <ServiceIcon name={service.icon} size={28} />
              </div>
              <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-2 text-xl text-primary-400 font-medium">
                {service.tagline}
              </p>
              <p className="mt-4 text-lg text-text-secondary leading-relaxed max-w-2xl">
                {service.description}
              </p>
              <div className="mt-8">
                <Button href="/contact" size="lg" icon={<ArrowRight size={18} />}>
                  Talk to Us
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Features */}
      <section className="py-24 bg-bg-card">
        <Container>
          <ScrollReveal>
            <SectionHeading
              badge="What's Included"
              title="Features & Deliverables"
              description="Everything you get when you work with us on this service."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {service.features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.1}>
                <Card className="h-full p-8" hover={false}>
                  <div className="flex gap-4">
                    <CheckCircle2
                      size={22}
                      className="mt-0.5 shrink-0 text-primary-400"
                    />
                    <div>
                      <h3 className="font-display text-lg font-bold text-text-primary">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Tools */}
      {service.tools.length > 0 && (
        <section className="py-16">
          <Container>
            <ScrollReveal>
              <div className="text-center">
                <p className="text-sm font-medium uppercase tracking-wider text-text-muted mb-4">
                  Technologies We Use
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {service.tools.map((tool) => (
                    <Badge key={tool} variant="default">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </section>
      )}

      {/* Process */}
      <section className="py-24 bg-bg-card">
        <Container>
          <ScrollReveal>
            <SectionHeading
              badge="Our Process"
              title={`How We Build Your ${service.shortTitle}`}
              description="A structured, transparent process from start to finish."
            />
          </ScrollReveal>

          <div className="mx-auto max-w-3xl space-y-6">
            {service.process.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1}>
                <div className="flex gap-6 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary-600 bg-bg-base">
                    <span className="text-sm font-bold text-primary-400">
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Service FAQ */}
      <FAQ
        faqs={service.faq}
        badge={service.shortTitle}
        title={`${service.shortTitle} FAQ`}
        description={`Common questions about our ${service.shortTitle.toLowerCase()} service.`}
      />

      <CTABanner />
    </>
  );
}
