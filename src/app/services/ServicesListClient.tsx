"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ServiceFinder } from "@/components/sections/ServiceFinder";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { services } from "@/data/services";
import {
  ServiceVignette,
  SERVICE_SLUG_VIGNETTES,
} from "@/components/services/ServiceVignette";

export function ServicesListClient() {
  return (
    <>
      {/* Services List */}
      <section className="pb-24">
        <Container>
          <div className="grid gap-8">
            {services.map((service, i) => (
              <ScrollReveal key={service.slug} delay={i * 0.1}>
                <Link href={`/services/${service.slug}`} className="block group">
                  <div className="glass glass-hover rounded-2xl p-8 md:p-10 transition-all duration-300">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
                      {/* Icon */}
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-600/10 text-primary-400 transition-colors group-hover:bg-primary-600/20">
                        <ServiceIcon name={service.icon} size={28} />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h2 className="font-display text-2xl font-bold text-text-primary">
                          {service.title}
                        </h2>
                        <p className="mt-2 text-text-secondary leading-relaxed max-w-2xl">
                          {service.description}
                        </p>

                        {/* Feature pills */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {service.features.slice(0, 3).map((f) => (
                            <span
                              key={f.title}
                              className="rounded-full border border-bg-subtle bg-bg-surface px-3 py-1 text-xs text-text-muted"
                            >
                              {f.title}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Vignette */}
                      {SERVICE_SLUG_VIGNETTES[service.slug] && (
                        <div className="hidden w-56 shrink-0 self-center lg:block">
                          <ServiceVignette
                            variant={SERVICE_SLUG_VIGNETTES[service.slug]}
                          />
                        </div>
                      )}

                      {/* Arrow */}
                      <div className="flex items-center text-primary-400 transition-transform group-hover:translate-x-1">
                        <ArrowUpRight size={24} />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Not sure? Interactive finder */}
      <ServiceFinder />
    </>
  );
}
