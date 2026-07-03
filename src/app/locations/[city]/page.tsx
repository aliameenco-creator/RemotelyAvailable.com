import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { CTABanner } from "@/components/sections/CTABanner";
import { FAQ } from "@/components/sections/FAQ";
import { ProofSection } from "@/components/sections/ProofSection";
import { InlineLeadForm } from "@/components/forms/InlineLeadForm";
import { UkCityMap } from "@/components/locations/UkCityMap";
import type { ServiceIconName } from "@/data/services";
import {
  ukCities,
  getCity,
  getNearbyCities,
  locationServices,
  cityHubIntro,
  cityHubFaqs,
} from "@/data/ukLocations";
import { siteConfig } from "@/lib/constants";

interface CityHubPageProps {
  params: Promise<{ city: string }>;
}

const serviceIcons: Record<string, ServiceIconName> = {
  "web-development": "code",
  "social-media-management": "megaphone",
  "ai-automations": "workflow",
  "seo-content": "search",
  design: "palette",
  "shopify-automation": "globe",
};

export function generateStaticParams() {
  return ukCities.map((city) => ({ city: city.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: CityHubPageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) return {};

  const title = `Digital Agency in ${city.name}, Web, SEO, Social & AI Automation`;
  const description = `Digital agency serving ${city.name} and the ${city.region}: web development, social media management, SEO, design and AI automation for ${city.name} businesses. Free strategy call.`;
  const url = `${siteConfig.url}/locations/${city.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function CityHubPage({ params }: CityHubPageProps) {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) notFound();

  const nearby = getNearbyCities(city);
  const url = `${siteConfig.url}/locations/${city.slug}`;
  const faqs = cityHubFaqs(city);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url,
      email: siteConfig.email,
      description: `Digital agency serving ${city.name}: web development, social media, SEO, design and AI automation.`,
      areaServed: {
        "@type": "City",
        name: city.name,
        containedInPlace: { "@type": "Country", name: "United Kingdom" },
      },
      makesOffer: locationServices.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${service.name} in ${city.name}`,
          url: `${url}/${service.slug}`,
        },
      })),
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
        { "@type": "ListItem", position: 3, name: city.name, item: url },
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
            <span className="text-text-secondary">{city.name}</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-primary-400">
                <MapPin size={14} aria-hidden="true" />
                {city.name}, {city.region}
              </p>
              <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
                Digital Agency in {city.name}
              </h1>
              <p className="mt-4 text-lg text-text-secondary leading-relaxed">
                {cityHubIntro(city)}
              </p>
              <div className="mt-8">
                <Button
                  href="/contact"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  analyticsEvent="cta_click"
                  analyticsLabel={`location-hub-hero:${city.slug}`}
                >
                  Get a Free Strategy Call
                </Button>
              </div>
            </div>
            <div className="hidden justify-center lg:flex">
              <UkCityMap citySlug={city.slug} cityName={city.name} />
            </div>
          </div>
        </Container>
      </section>

      {/* Services in this city */}
      <section className="py-20 bg-bg-card">
        <Container>
          <SectionHeading
            badge={city.name}
            title={`Our Services in ${city.name}`}
            description={`Everything a growing ${city.name} business needs online, delivered by one team, remotely, at a fraction of city-agency prices.`}
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {locationServices.map((service) => (
              <Link
                key={service.slug}
                href={`/locations/${city.slug}/${service.slug}`}
                className="group"
              >
                <Card className="h-full p-7">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600/10 text-primary-400 transition-transform duration-200 ease-out group-hover:-rotate-6 group-hover:scale-110">
                    <ServiceIcon name={serviceIcons[service.slug]} size={24} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-text-primary">
                    {service.name} in {city.name}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    {service.metaDescription(city).split(".")[0]}.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-400 transition-colors group-hover:text-primary-300">
                    Learn more
                    <ArrowRight
                      size={14}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Why us / proof */}
      <ProofSection
        seed={city.slug}
        badge="Why RemotelyAvailable"
        title={`Built for ${city.name} Businesses`}
        description={`We serve ${city.name}'s ${city.industries[0]}, ${city.industries[1]} and ${city.industries[2]} sectors, and everything in between.`}
      />

      {/* Inline lead capture */}
      <InlineLeadForm
        heading={`Free growth audit for ${city.name} businesses`}
        subtext={`Tell us where to send it and we'll map out the biggest opportunities for your business across web, content, design and automation. No obligation.`}
        source={`location-hub:${city.slug}`}
      />

      {/* City FAQ */}
      <FAQ
        faqs={faqs}
        badge={city.name}
        title={`Working With Us From ${city.name}`}
        description={`Common questions from ${city.name} businesses about how we work.`}
      />

      {/* Nearby cities */}
      <section className="pb-20">
        <Container>
          <h2 className="font-display text-xl font-bold text-text-primary">
            We Also Serve Businesses Near {city.name}
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {nearby.map((n) => (
              <Link
                key={n.slug}
                href={`/locations/${n.slug}`}
                className="rounded-full border border-white/[0.1] px-4 py-2 text-sm text-text-secondary transition-colors hover:border-primary-600/40 hover:text-text-primary"
              >
                {n.name}
              </Link>
            ))}
            <Link
              href="/locations"
              className="rounded-full border border-primary-600/40 px-4 py-2 text-sm text-primary-400 transition-colors hover:text-primary-300"
            >
              All UK locations
            </Link>
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
