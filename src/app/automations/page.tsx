import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/sections/CTABanner";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { AutomationsGrid } from "@/components/automations/AutomationsGrid";
import { automations } from "@/data/automations";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Automations Portfolio | Built Systems for Creators & Agencies",
  description:
    "A portfolio of AI automations built for creators, agencies, and businesses: content, lead generation, sales workflows, YouTube, and business operations systems.",
  openGraph: {
    title: "AI Automations Portfolio | RemotelyAvailable",
    description:
      "AI automations I've built for creators, agencies, and businesses, from lead generation to full sales workflows.",
    url: `${siteConfig.url}/automations`,
  },
};

export default function AutomationsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Automations by RemotelyAvailable",
    itemListElement: automations.map((automation, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: automation.name,
      description: automation.description,
      url: `${siteConfig.url}/automations/${automation.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <GradientOrb color="primary" size="lg" animation={1} className="-top-20 -right-20 opacity-20" />
        <Container className="relative z-10">
          <nav className="mb-8 text-sm text-text-muted">
            <Link href="/" className="hover:text-text-secondary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text-secondary">Automations</span>
          </nav>
          <SectionHeading
            as="h1"
            badge="Automations"
            title="AI automations I've built"
            description="AI automations I've built for creators, agencies, and businesses: content, lead generation, sales workflows, YouTube, and business operations, all in one place."
            align="left"
          />
        </Container>
      </section>

      {/* Automations grid */}
      <section className="pb-24">
        <Container>
          <h2 className="sr-only">Automation projects</h2>
          <AutomationsGrid automations={automations} />
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
