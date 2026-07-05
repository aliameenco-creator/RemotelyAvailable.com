"use client";

import { ArrowRight, ShoppingBag } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ServiceFinder } from "@/components/sections/ServiceFinder";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { ServiceHeroScene } from "@/components/services/ServiceHeroScene";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

// Shopify has a bespoke page (not in the services data file) but belongs in
// the hub list so all six offers live side by side.
const SHOPIFY_ROW = {
  slug: "shopify-automation",
  title: "Shopify Email Automation",
  tagline: "Recover abandoned carts and drive repeat revenue on autopilot.",
  description:
    "Automated Klaviyo email flows for Shopify stores: abandoned cart recovery, welcome series, win-backs, and post-purchase upsells that pay for themselves.",
  chips: ["Abandoned cart recovery", "5 automated flows", "Money-back guarantee"],
  isNew: true,
};

function ServiceRow({
  index,
  slug,
  title,
  tagline,
  description,
  chips,
  icon,
  isNew = false,
}: {
  index: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  chips: string[];
  icon?: React.ReactNode;
  isNew?: boolean;
}) {
  return (
    <ScrollReveal>
      <div
        id={slug}
        className="grid scroll-mt-32 items-center gap-10 lg:grid-cols-2 lg:gap-16"
      >
        <div>
          <div className="flex items-center gap-4">
            <span
              className="font-display text-6xl font-bold italic leading-none text-white/[0.07]"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {icon && (
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600/10 text-primary-400">
                {icon}
              </span>
            )}
          </div>
          <h2 className="mt-4 flex flex-wrap items-center gap-3 font-display text-3xl font-bold text-text-primary">
            {title}
            {isNew && (
              <span className="rounded-full bg-primary-600/20 border border-primary-600/30 px-2 py-0.5 text-[11px] font-medium text-primary-400">
                New
              </span>
            )}
          </h2>
          <p className="mt-2 text-lg font-medium text-primary-400">{tagline}</p>
          <p className="mt-3 max-w-xl leading-relaxed text-text-secondary">
            {description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/[0.08] bg-bg-card px-3 py-1.5 text-xs text-text-secondary"
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={`/services/${slug}`}
              icon={<ArrowRight size={16} />}
              analyticsEvent="cta_click"
              analyticsLabel={`services-hub:${slug}`}
            >
              See How It Works
            </Button>
            <Button href="/contact" variant="secondary">
              Get a Free Plan
            </Button>
          </div>
        </div>
        <div
          className={cn(
            "mx-auto w-full max-w-md",
            index % 2 === 1 && "lg:order-first"
          )}
        >
          <ServiceHeroScene serviceSlug={slug} />
        </div>
      </div>
    </ScrollReveal>
  );
}

export function ServicesListClient() {
  return (
    <>
      {/* Services showcase rows */}
      <section className="pb-24">
        <Container>
          <div className="space-y-24 lg:space-y-28">
            {services.map((service, i) => (
              <ServiceRow
                key={service.slug}
                index={i}
                slug={service.slug}
                title={service.title}
                tagline={service.tagline}
                description={service.description}
                chips={service.features.slice(0, 3).map((f) => f.title)}
                icon={<ServiceIcon name={service.icon} size={22} />}
              />
            ))}
            <ServiceRow
              index={services.length}
              slug={SHOPIFY_ROW.slug}
              title={SHOPIFY_ROW.title}
              tagline={SHOPIFY_ROW.tagline}
              description={SHOPIFY_ROW.description}
              chips={SHOPIFY_ROW.chips}
              icon={<ShoppingBag size={22} />}
              isNew={SHOPIFY_ROW.isNew}
            />
          </div>
        </Container>
      </section>

      {/* Not sure? Interactive finder */}
      <ServiceFinder />
    </>
  );
}
