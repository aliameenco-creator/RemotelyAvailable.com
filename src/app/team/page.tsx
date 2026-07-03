import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Youtube } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CountUpStat } from "@/components/ui/CountUpStat";
import { CTABanner } from "@/components/sections/CTABanner";
import { teamMembers } from "@/data/team";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Meet the RemotelyAvailable Team | AI Specialists & Strategists",
  description:
    "Meet the team behind RemotelyAvailable, led by founder Ali Ameen: AI specialist, business strategist, and educator to 50,000+ students through Agentic Ali.",
  alternates: { canonical: `${siteConfig.url}/team` },
  openGraph: {
    title: "Meet the RemotelyAvailable Team",
    description:
      "The AI specialists and strategists behind RemotelyAvailable, led by founder Ali Ameen.",
    url: `${siteConfig.url}/team`,
  },
};

const TEAM_STATS = [
  { value: "50k+", label: "Students Taught" },
  { value: "500+", label: "Workflows Automated" },
  { value: "95%", label: "Client Retention Rate" },
  { value: "104", label: "Years of Experience, Combined" },
];

const PLACEHOLDERS = [
  { img: "/team/team-1.jpg", pos: "center 22%" },
  { img: "/team/team-3.jpg", pos: "center 18%" },
];

export default function TeamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Team", item: `${siteConfig.url}/team` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32">
        <div className="hero-grid pointer-events-none absolute inset-0 -top-20" aria-hidden="true" />
        <Container className="relative z-10">
          <nav className="mb-10 text-sm text-text-muted">
            <Link href="/" className="transition-colors hover:text-text-secondary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text-secondary">Team</span>
          </nav>

          <div className="max-w-3xl">
            <p className="ra-eyebrow mb-4">{"// the people behind the systems"}</p>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-6xl">
              Meet the Team
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-secondary">
              A senior bench of AI specialists, strategists, and builders. Click
              a profile to see who you&apos;ll actually be working with.
            </p>
          </div>
        </Container>
      </section>

      {/* Member cards */}
      <section className="pb-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((m) => (
              <Link key={m.slug} href={`/team/${m.slug}`} className="group">
                <div className="spot-card flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-copper)] bg-bg-card shadow-[var(--glow-copper)] transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.image}
                      alt={`${m.name}, ${m.role} at RemotelyAvailable`}
                      className="aspect-[4/3.4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: m.imagePos }}
                    />
                    {m.isFounder && (
                      <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-primary-600/40 bg-black/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-primary-400 backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
                        Founder
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 border-t border-white/[0.08] p-6">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-text-primary">
                        {m.name}
                      </h2>
                      <p className="mt-1 font-mono text-[11px] tracking-[0.09em] text-primary-400">
                        {"// "}
                        {m.role}
                      </p>
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-text-secondary">
                      {m.cardBio}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-400 transition-colors group-hover:text-primary-300">
                        View profile
                        <ArrowRight
                          size={14}
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </span>
                      {m.youtube && (
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#ff8080]">
                          <Youtube size={13} aria-hidden="true" />
                          {m.youtube.handle}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {PLACEHOLDERS.map((m) => (
              <div
                key={m.img}
                className="spot-card relative overflow-hidden rounded-[var(--radius-card)] border border-white/[0.08] bg-bg-card"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.img}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                  style={{ objectPosition: m.pos }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-5 pb-5 pt-12">
                  <p className="font-display italic text-text-muted">Name coming soon</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary-400">
                    {"// role TBA"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Numbers */}
      <section className="bg-bg-card py-20">
        <Container>
          <SectionHeading badge="Track Record" title="The Numbers Behind the Team" />
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {TEAM_STATS.map((s) => (
              <CountUpStat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
