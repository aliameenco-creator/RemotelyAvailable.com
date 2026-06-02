import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Shield, Handshake, Zap } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GradientText } from "@/components/ui/GradientText";
import { CTABanner } from "@/components/sections/CTABanner";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About RemotelyAvailable | Your AI Implementation Partner",
  description:
    "We're a team of AI specialists helping businesses automate operations, deploy voice agents, and build intelligent systems. Results over hype.",
  openGraph: {
    title: "About RemotelyAvailable",
    description:
      "We're a team of AI specialists helping businesses automate operations, deploy voice agents, and build intelligent systems.",
    url: `${siteConfig.url}/about`,
  },
};

const values = [
  {
    icon: Target,
    title: "Results Over Hype",
    description:
      "We don't sell buzzwords. Every project starts with a clear business goal and ends with measurable outcomes.",
  },
  {
    icon: Shield,
    title: "Security First",
    description:
      "Your data is sacred. We follow industry best practices, sign NDAs, and build with security baked in — not bolted on.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnership",
    description:
      "We don't build and disappear. We're invested in your success with ongoing support, optimization, and scaling.",
  },
  {
    icon: Zap,
    title: "Speed & Transparency",
    description:
      "No black boxes. You get regular progress updates, clear timelines, and systems you actually understand.",
  },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      description:
        "AI automation agency helping businesses save 40+ hours per week through intelligent automations, voice agents, chatbots, and websites.",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <GradientOrb
          color="accent"
          size="lg"
          animation={2}
          className="-top-20 right-0 opacity-15"
        />
        <Container className="relative z-10">
          <ScrollReveal>
            <nav className="mb-8 text-sm text-text-muted">
              <Link href="/" className="hover:text-text-secondary transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-text-secondary">About</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
                We&apos;re <GradientText>RemotelyAvailable</GradientText>
                <br />
                Your AI Implementation Partner
              </h1>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed">
                We started RemotelyAvailable because we saw a gap: businesses
                drowning in manual processes while powerful AI tools sat unused.
                Not because the tools are bad — because nobody bridges the gap
                between what AI can do and what businesses actually need.
              </p>
              <p className="mt-4 text-lg text-text-secondary leading-relaxed">
                That&apos;s what we do. We take the world&apos;s best AI
                technology and engineer it into systems that solve your specific
                problems — automations that actually run, voice agents that
                actually pick up the phone, chatbots that actually know your
                business.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-24 bg-bg-card">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <SectionHeading
                badge="Our Mission"
                title="Make AI Actually Useful for Real Businesses"
                description="The AI industry is full of demos that wow and tools that collect dust. We build systems that work on Monday morning — and every morning after that."
              />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Values */}
      <section className="py-24">
        <Container>
          <ScrollReveal>
            <SectionHeading
              badge="Our Values"
              title="How We Work"
              description="These aren't aspirational posters on a wall. They're the principles that drive every project."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1}>
                <Card className="h-full p-8" hover={false}>
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-600/10 text-primary-400">
                      <value.icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-text-primary">
                        {value.title}
                      </h3>
                      <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-bg-card">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl">
              <SectionHeading
                badge="Why Us"
                title="What Makes RemotelyAvailable Different"
                align="left"
              />
              <div className="space-y-6 text-text-secondary leading-relaxed">
                <p>
                  <span className="text-text-primary font-medium">
                    We&apos;re builders, not consultants.
                  </span>{" "}
                  We don&apos;t hand you a PDF and wish you luck. We build the
                  systems, deploy them, test them, and support them. You get
                  working AI, not PowerPoint AI.
                </p>
                <p>
                  <span className="text-text-primary font-medium">
                    We specialize in AI for operations.
                  </span>{" "}
                  While others chase the latest LLM trend, we focus on the
                  boring, profitable stuff: automating workflows, answering
                  phones, handling support, generating content. The work that
                  drains your team&apos;s time.
                </p>
                <p>
                  <span className="text-text-primary font-medium">
                    We measure success in hours saved, not features shipped.
                  </span>{" "}
                  Every project has a clear metric: hours reclaimed, tickets
                  deflected, calls handled, revenue generated. If we can&apos;t
                  define the ROI upfront, we&apos;ll tell you.
                </p>
              </div>
              <div className="mt-8">
                <Button href="/contact" icon={<ArrowRight size={18} />}>
                  Let&apos;s Talk About Your Business
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
