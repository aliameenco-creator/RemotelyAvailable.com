import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BrainCircuit,
  Code2,
  GraduationCap,
  LineChart,
  Megaphone,
  Palette,
  Youtube,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/sections/CTABanner";
import { ServiceVignette } from "@/components/services/ServiceVignette";
import { teamMembers, getTeamMember, type ExpertiseIcon } from "@/data/team";
import { siteConfig } from "@/lib/constants";

interface MemberPageProps {
  params: Promise<{ slug: string }>;
}

const EXPERTISE_ICONS: Record<ExpertiseIcon, typeof BrainCircuit> = {
  brain: BrainCircuit,
  chart: LineChart,
  education: GraduationCap,
  code: Code2,
  design: Palette,
  megaphone: Megaphone,
};

export function generateStaticParams() {
  return teamMembers.map((m) => ({ slug: m.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: MemberPageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return {};

  const title = `${member.name} | ${member.role} at RemotelyAvailable`;
  const url = `${siteConfig.url}/team/${member.slug}`;

  return {
    title,
    description: member.metaDescription,
    alternates: { canonical: url },
    openGraph: { title, description: member.metaDescription, url },
  };
}

export default async function TeamMemberPage({ params }: MemberPageProps) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  const url = `${siteConfig.url}/team/${member.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        name: member.name,
        jobTitle: member.roleLine,
        worksFor: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        ...(member.youtube ? { sameAs: [member.youtube.url] } : {}),
        description: member.metaDescription,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Team", item: `${siteConfig.url}/team` },
        { "@type": "ListItem", position: 3, name: member.name, item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Profile hero */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32">
        <div className="hero-grid pointer-events-none absolute inset-0 -top-20" aria-hidden="true" />
        <Container className="relative z-10">
          <nav className="mb-10 text-sm text-text-muted">
            <Link href="/" className="transition-colors hover:text-text-secondary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/team" className="transition-colors hover:text-text-secondary">
              Team
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text-secondary">{member.name}</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="ra-eyebrow mb-4">
                {member.isFounder ? "// meet the founder" : "// meet the team"}
              </p>
              <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-6xl">
                {member.name}
              </h1>
              <p className="mt-3 font-mono text-sm tracking-[0.08em] text-primary-400">
                {member.roleLine}
              </p>

              <div className="mt-7 max-w-xl space-y-4 text-lg leading-relaxed text-text-secondary">
                {member.intro.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  href="/contact"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  analyticsEvent="cta_click"
                  analyticsLabel={`team-member:${member.slug}`}
                >
                  Work With {member.isFounder ? "Me" : "Us"}
                </Button>
                {member.youtube && (
                  <a
                    href={member.youtube.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-analytics-event="youtube_click"
                    data-analytics-label={`team-member:${member.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[rgba(255,80,80,0.4)] bg-[rgba(255,0,0,0.1)] px-8 py-4 text-lg font-semibold text-[#ff8080] transition-all duration-150 hover:scale-[1.02] hover:bg-[rgba(255,0,0,0.16)] active:scale-95"
                  >
                    <Youtube size={20} aria-hidden="true" />
                    {member.youtube.handle}
                  </a>
                )}
              </div>
            </div>

            {/* Portrait */}
            <div className="relative mx-auto w-full max-w-sm">
              <div className="floaty relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-copper)] bg-bg-card shadow-[var(--glow-copper)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.role} at RemotelyAvailable`}
                  className="aspect-[4/4.6] w-full object-cover"
                  style={{ objectPosition: member.imagePos }}
                />
                {member.isFounder && (
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-primary-600/40 bg-black/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-primary-400 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
                    Founder
                  </span>
                )}
              </div>

              {member.heroStat && (
                <div className="absolute -bottom-5 -left-4 rounded-xl border border-white/[0.12] bg-bg-card/95 px-5 py-3.5 shadow-2xl shadow-black/50 backdrop-blur-xl sm:-left-8">
                  <p className="font-display text-2xl font-bold text-primary-400">
                    {member.heroStat.value}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
                    {member.heroStat.label}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Expertise */}
      <section className="bg-bg-card py-20">
        <Container>
          <SectionHeading
            badge={member.isFounder ? "What I Do" : "What They Do"}
            title="Where the Expertise Goes to Work"
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {member.expertise.map(({ icon, title, desc, vignette }) => {
              const Icon = EXPERTISE_ICONS[icon];
              return (
                <div
                  key={title}
                  className="spot-card group flex flex-col rounded-[var(--radius-card)] border border-white/[0.08] bg-bg-base p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary-600/40"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600/10 text-primary-400 transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-primary">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">{desc}</p>
                  <div className="mt-5">
                    <ServiceVignette variant={vignette} />
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Other members */}
      {teamMembers.length > 1 && (
        <section className="py-20">
          <Container>
            <SectionHeading badge="The Team" title="More of the Team" />
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
              {teamMembers
                .filter((m) => m.slug !== member.slug)
                .map((m) => (
                  <Link key={m.slug} href={`/team/${m.slug}`} className="group">
                    <div className="spot-card relative overflow-hidden rounded-[var(--radius-card)] border border-white/[0.08] bg-bg-card">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.image}
                        alt={m.name}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3.2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ objectPosition: m.imagePos }}
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-5 pb-4 pt-10">
                        <p className="font-display text-lg font-bold text-text-primary">{m.name}</p>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-primary-400">
                          {m.role}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </Container>
        </section>
      )}

      <CTABanner />
    </>
  );
}
