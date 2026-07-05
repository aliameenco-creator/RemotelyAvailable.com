import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { CTABanner } from "@/components/sections/CTABanner";
import { ProofSection } from "@/components/sections/ProofSection";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/constants";
import { ServicesListClient } from "./ServicesListClient";

export const metadata: Metadata = {
  title: "Services | Web, Social, Design, SEO & Automation",
  description:
    "Explore our services: web development, social media management, design and branding, SEO and content, and AI-powered business automation. Done for you, built for results.",
  openGraph: {
    title: "Services | RemotelyAvailable",
    description:
      "Web development, social media, design, SEO and content, and business automation, done for you, built for results.",
    url: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Services by RemotelyAvailable",
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        url: `${siteConfig.url}/services/${service.slug}`,
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <Container>
          <nav className="mb-8 text-sm text-text-muted">
            <Link href="/" className="hover:text-text-secondary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text-secondary">Services</span>
          </nav>
          <SectionHeading
            badge="Our Services"
            title="Six Services. One Goal: Your Business on Autopilot."
            description="Pick the job below and see exactly how we do it. Every service is done for you, priced for small businesses, and built to pay for itself."
            align="left"
          />

          {/* Quick-jump pills: the whole offer, scannable in one glance */}
          <div className="mt-2 flex flex-wrap gap-2.5">
            {services.map((service) => (
              <a
                key={service.slug}
                href={`#${service.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-bg-card px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-primary-600/40 hover:text-text-primary"
              >
                <ServiceIcon
                  name={service.icon}
                  size={15}
                  className="text-primary-400"
                />
                {service.shortTitle}
              </a>
            ))}
            <a
              href="#shopify-automation"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-bg-card px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-primary-600/40 hover:text-text-primary"
            >
              <ShoppingBag size={15} className="text-primary-400" />
              Shopify Automation
            </a>
          </div>
        </Container>
      </section>

      <ServicesListClient />

      <ProofSection seed="services-hub" className="py-24" />

      <CTABanner />
    </>
  );
}
