import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/sections/CTABanner";
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
      "Web development, social media, design, SEO and content, and business automation — done for you, built for results.",
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
            title="Everything Your Business Needs to Grow"
            description="Web, social, design, SEO, and automation — handled by one team. We focus on the result you're after and use AI where it genuinely moves the needle."
            align="left"
          />
        </Container>
      </section>

      <ServicesListClient />

      <CTABanner />
    </>
  );
}
