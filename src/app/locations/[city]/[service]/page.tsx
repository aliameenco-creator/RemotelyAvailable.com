import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/sections/CTABanner";
import { FAQ } from "@/components/sections/FAQ";
import { ProofSection } from "@/components/sections/ProofSection";
import { InlineLeadForm } from "@/components/forms/InlineLeadForm";
import { UkCityMap } from "@/components/locations/UkCityMap";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import {
  ServiceVignette,
  SERVICE_SLUG_VIGNETTES,
} from "@/components/services/ServiceVignette";
import {
  ServiceHeroScene,
  hasHeroScene,
} from "@/components/services/ServiceHeroScene";
import {
  ukCities,
  getCity,
  getNearbyCities,
  locationServices,
  getLocationService,
} from "@/data/ukLocations";
import { processSteps } from "@/data/navigation";
import { siteConfig } from "@/lib/constants";

interface CityServicePageProps {
  params: Promise<{ city: string; service: string }>;
}

export function generateStaticParams() {
  return ukCities.flatMap((city) =>
    locationServices.map((service) => ({
      city: city.slug,
      service: service.slug,
    }))
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: CityServicePageProps): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getLocationService(serviceSlug);
  if (!city || !service) return {};

  const url = `${siteConfig.url}/locations/${city.slug}/${service.slug}`;

  return {
    title: service.metaTitle(city),
    description: service.metaDescription(city),
    alternates: { canonical: url },
    openGraph: {
      title: `${service.metaTitle(city)} | ${siteConfig.name}`,
      description: service.metaDescription(city),
      url,
    },
  };
}

export default async function CityServicePage({ params }: CityServicePageProps) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getLocationService(serviceSlug);
  if (!city || !service) notFound();

  const url = `${siteConfig.url}/locations/${city.slug}/${service.slug}`;
  const faqs = service.faqs(city);
  const nearby = getNearbyCities(city);
  const otherServices = locationServices.filter((s) => s.slug !== service.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${service.name} in ${city.name}`,
      serviceType: service.keyword,
      url,
      provider: {
        "@type": "ProfessionalService",
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
      },
      areaServed: {
        "@type": "City",
        name: city.name,
        containedInPlace: { "@type": "Country", name: "United Kingdom" },
      },
      description: service.metaDescription(city),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Locations",
          item: `${siteConfig.url}/locations`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: city.name,
          item: `${siteConfig.url}/locations/${city.slug}`,
        },
        { "@type": "ListItem", position: 4, name: service.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32">
        <div
          className="hero-grid pointer-events-none absolute inset-0 -top-20"
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <nav className="mb-8 text-sm text-text-muted">
            <Link href="/" className="hover:text-text-secondary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/locations"
              className="hover:text-text-secondary transition-colors"
            >
              Locations
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/locations/${city.slug}`}
              className="hover:text-text-secondary transition-colors"
            >
              {city.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text-secondary">{service.name}</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-primary-400">
              <MapPin size={14} aria-hidden="true" />
              Serving {city.name} &amp; the {city.region}
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              {service.name} in {city.name}
            </h1>
            <p className="mt-5 text-lg text-text-secondary leading-relaxed">
              {service.intro(city)}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/contact"
                size="lg"
                icon={<ArrowRight size={18} />}
                analyticsEvent="cta_click"
                analyticsLabel={`location-hero:${city.slug}-${service.slug}`}
              >
                Get a Free Strategy Call
              </Button>
              <Button href={service.parentHref} variant="secondary" size="lg">
                About Our {service.name} Service
              </Button>
            </div>
          </div>
          {hasHeroScene(service.slug) ? (
            <div className="hidden w-full max-w-md lg:block">
              <ServiceHeroScene serviceSlug={service.slug} />
            </div>
          ) : (
            SERVICE_SLUG_VIGNETTES[service.slug] && (
              <div className="floaty hidden max-w-md rounded-[var(--radius-card)] border border-[var(--border-copper)] bg-bg-card p-5 shadow-[var(--glow-copper)] lg:block">
                <div className="mb-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-text-muted">
                  <span className="h-2 w-2 rounded-full bg-primary-400" />
                  {"// "}
                  {service.name.toLowerCase()} in action
                </div>
                <ServiceVignette variant={SERVICE_SLUG_VIGNETTES[service.slug]} />
              </div>
            )
          )}
          </div>
        </Container>
      </section>

      {/* Local context */}
      <section className="py-16 bg-bg-card">
        <Container>
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl font-bold text-text-primary">
                Why {service.name} Matters for {city.name} Businesses
              </h2>
              <p className="mt-4 leading-relaxed text-text-secondary">
                {service.localParagraph(city)}
              </p>
            </div>
            <div className="hidden justify-center lg:flex">
              <UkCityMap
                citySlug={city.slug}
                cityName={city.name}
                className="max-w-[220px]"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Deliverables */}
      <section className="py-20">
        <Container>
          <SectionHeading
            badge="What's Included"
            title={`What You Get With Our ${service.name}`}
            description={`Everything included when a ${city.name} business works with us on ${service.name.toLowerCase()}.`}
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {service.deliverables.map((item) => (
              <Card key={item.title} className="h-full p-8" hover={false}>
                <div className="flex gap-4">
                  <CheckCircle2
                    size={22}
                    className="mt-0.5 shrink-0 text-primary-400"
                  />
                  <div>
                    <h3 className="font-display text-lg font-bold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Proof */}
      <ProofSection
        serviceSlug={service.slug}
        seed={`${city.slug}-${service.slug}`}
        className="pb-20"
      />

      {/* Process */}
      <section className="py-20 bg-bg-card">
        <Container>
          <SectionHeading
            badge="How It Works"
            title={`Getting Started From ${city.name}`}
            description="A structured, transparent process, everything handled remotely, on your schedule."
          />
          <ProcessTimeline steps={processSteps} />
        </Container>
      </section>

      {/* Inline lead capture */}
      <InlineLeadForm
        heading={`Free ${service.name.toLowerCase()} audit for ${city.name} businesses`}
        subtext={`Tell us where to send it and we'll review your current setup and map out exactly what ${service.name.toLowerCase()} could do for your business. No obligation.`}
        source={`location-page:${city.slug}-${service.slug}`}
      />

      {/* FAQ */}
      <FAQ
        faqs={faqs}
        badge={`${city.name} FAQ`}
        title={`${service.name} in ${city.name}, FAQ`}
        description={`Questions ${city.name} businesses ask about ${service.name.toLowerCase()}.`}
      />

      {/* Internal linking: other services here + this service nearby */}
      <section className="pb-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-xl font-bold text-text-primary">
                More Services in {city.name}
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {otherServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/locations/${city.slug}/${s.slug}`}
                    className="rounded-full border border-white/[0.1] px-4 py-2 text-sm text-text-secondary transition-colors hover:border-primary-600/40 hover:text-text-primary"
                  >
                    {s.name} in {city.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-text-primary">
                {service.name} Near {city.name}
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {nearby.map((n) => (
                  <Link
                    key={n.slug}
                    href={`/locations/${n.slug}/${service.slug}`}
                    className="rounded-full border border-white/[0.1] px-4 py-2 text-sm text-text-secondary transition-colors hover:border-primary-600/40 hover:text-text-primary"
                  >
                    {n.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
