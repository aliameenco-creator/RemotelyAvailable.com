import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { CTABanner } from "@/components/sections/CTABanner";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { LineIcon } from "@/components/landing/LineIcon";
import { caseStudies } from "@/data/caseStudies";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Projects & Case Studies | Real Results We've Delivered",
  description:
    "See how we've helped businesses recover revenue, answer every call, and book more demos with done-for-you automation, voice agents, and intelligent systems.",
  openGraph: {
    title: "Projects & Case Studies | RemotelyAvailable",
    description:
      "Real outcomes from real engagements — recovered revenue, calls answered, demos booked.",
    url: `${siteConfig.url}/projects`,
  },
};

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Case Studies by RemotelyAvailable",
    itemListElement: caseStudies.map((cs, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteConfig.url}/projects/${cs.slug}`,
      name: cs.cardTitle,
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
            <span className="text-text-secondary">Projects</span>
          </nav>
          <SectionHeading
            badge="Our Work"
            title="Results we've delivered"
            description="No vanity metrics — just the outcomes that matter: revenue recovered, calls answered, hours given back. Here's a look at how we did it."
            align="left"
          />
        </Container>
      </section>

      {/* Case study grid */}
      <section className="pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs, i) => (
              <ScrollReveal key={cs.slug} delay={i * 0.08}>
                <Link href={`/projects/${cs.slug}`} className="block h-full">
                  <Card className="flex h-full flex-col gap-5">
                    <div>
                      <Pill tone={cs.tagTone}>{cs.tag}</Pill>
                    </div>
                    <h3 className="font-display text-xl leading-snug text-text-primary">
                      {cs.cardTitle}
                    </h3>
                    <p className="text-sm text-text-muted">{cs.client}</p>
                    <div className="mt-auto flex items-center justify-between border-t border-[var(--ra-cream-08)] pt-4">
                      <span className="font-mono text-sm text-primary-400">
                        {cs.cardStat}
                      </span>
                      <span className="text-text-faint">
                        <LineIcon name="arrow" size={16} />
                      </span>
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
