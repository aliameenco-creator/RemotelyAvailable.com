import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CTABanner } from "@/components/sections/CTABanner";
import { ukCities, ukRegions } from "@/data/ukLocations";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "UK Locations, Digital Agency Serving Every Major City",
  description:
    "RemotelyAvailable serves businesses across the UK, web development, social media, design, SEO and AI automation in 75+ cities from London to Edinburgh. Find your city.",
  alternates: {
    canonical: `${siteConfig.url}/locations`,
  },
  openGraph: {
    title: "UK Locations | RemotelyAvailable",
    description:
      "Web development, social media, design, SEO and AI automation for businesses in 75+ UK cities.",
    url: `${siteConfig.url}/locations`,
  },
};

export default function LocationsIndexPage() {
  const breadcrumbJsonLd = {
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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="pt-28 pb-24 sm:pt-32">
        <Container>
          <nav className="mb-8 text-sm text-text-muted">
            <Link href="/" className="hover:text-text-secondary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text-secondary">Locations</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              A Digital Agency for Every Corner of the UK
            </h1>
            <p className="mt-4 text-lg text-text-secondary leading-relaxed">
              Web development, social media management, AI automation, SEO and
              design, delivered remotely to businesses in 75+ UK cities and
              towns. Find your city below to see how we help local businesses
              like yours grow.
            </p>
          </div>

          <div className="mt-14 space-y-12">
            {ukRegions.map((region) => {
              const cities = ukCities.filter((c) => c.region === region);
              if (cities.length === 0) return null;
              return (
                <div key={region}>
                  <h2 className="font-display text-xl font-bold text-text-primary">
                    {region}
                  </h2>
                  <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {cities.map((city) => (
                      <li key={city.slug}>
                        <Link
                          href={`/locations/${city.slug}`}
                          className="group flex items-center gap-2 rounded-lg border border-white/[0.08] bg-bg-card px-4 py-3 text-sm text-text-secondary transition-colors hover:border-primary-600/40 hover:text-text-primary"
                        >
                          <MapPin
                            size={14}
                            className="shrink-0 text-primary-400"
                            aria-hidden="true"
                          />
                          {city.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
      <CTABanner />
    </>
  );
}
