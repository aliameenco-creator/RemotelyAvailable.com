import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/sections/CTABanner";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/constants";
import { ServicesListClient } from "./ServicesListClient";

export const metadata: Metadata = {
  title: "AI Services | Automation, Voice Agents, Websites & More",
  description:
    "Explore our full range of AI services: workflow automation, voice agents, AI-powered websites, custom chatbots, and strategic consulting. Built for real business impact.",
  openGraph: {
    title: "AI Services | RemotelyAvailable",
    description:
      "Explore our full range of AI services: workflow automation, voice agents, AI-powered websites, custom chatbots, and strategic consulting.",
    url: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Services by RemotelyAvailable",
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
            title="AI Solutions Engineered for Real Business Impact"
            description="We don't sell AI hype. We build systems that automate real workflows, handle real conversations, and deliver measurable ROI."
            align="left"
          />
        </Container>
      </section>

      <ServicesListClient />

      <CTABanner />
    </>
  );
}
