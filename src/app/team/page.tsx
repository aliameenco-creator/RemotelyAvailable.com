import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  GraduationCap,
  LineChart,
  Youtube,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CountUpStat } from "@/components/ui/CountUpStat";
import { CTABanner } from "@/components/sections/CTABanner";
import { ServiceVignette } from "@/components/services/ServiceVignette";
import { siteConfig } from "@/lib/constants";

const YOUTUBE_URL = "https://youtube.com/@agenticali";

export const metadata: Metadata = {
  title: "Meet Ali Ameen & the RemotelyAvailable Team | AI Specialists",
  description:
    "Ali Ameen is an AI specialist and business strategist, the educator behind Agentic Ali with 50,000+ students. Meet the team building AI systems for real businesses.",
  alternates: { canonical: `${siteConfig.url}/team` },
  openGraph: {
    title: "Meet Ali Ameen & the RemotelyAvailable Team",
    description:
      "AI specialist, business strategist, and educator to 50,000+ students. The team behind RemotelyAvailable's AI systems.",
    url: `${siteConfig.url}/team`,
  },
};

const EXPERTISE = [
  {
    icon: BrainCircuit,
    title: "AI Systems Architecture",
    desc: "Designing and shipping the automations, voice agents, and chatbots that run inside real businesses — wired into the tools you already use, monitored, and maintained.",
    vignette: "automation" as const,
  },
  {
    icon: LineChart,
    title: "Business Strategy",
    desc: "Every system starts with the commercial question, not the tech one: where is the margin leaking, and what's the fastest automation to plug it? Strategy first, then build.",
    vignette: "seo" as const,
  },
  {
    icon: GraduationCap,
    title: "AI Education at Scale",
    desc: "Through Agentic Ali on YouTube, Ali has taught 50,000+ students how to actually use AI — the same playbooks his clients get, taught in public.",
    vignette: "content" as const,
  },
];

const TEAM_STATS = [
  { value: "50k+", label: "Students Taught" },
  { value: "500+", label: "Workflows Automated" },
  { value: "95%", label: "Client Retention Rate" },
  { value: "104", label: "Years of Experience, Combined" },
];

export default function TeamPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        name: "Ali Ameen",
        jobTitle: "Founder · AI Specialist & Business Strategist",
        worksFor: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
        sameAs: [YOUTUBE_URL],
        description:
          "AI specialist and business strategist. Educator behind Agentic Ali, teaching 50,000+ students how to put AI to work in real businesses.",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Team", item: `${siteConfig.url}/team` },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Founder hero */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32">
        <div className="hero-grid pointer-events-none absolute inset-0 -top-20" aria-hidden="true" />
        <Container className="relative z-10">
          <nav className="mb-10 text-sm text-text-muted">
            <Link href="/" className="transition-colors hover:text-text-secondary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text-secondary">Team</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="ra-eyebrow mb-4">{"// meet the founder"}</p>
              <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-6xl">
                Ali Ameen
              </h1>
              <p className="mt-3 font-mono text-sm tracking-[0.08em] text-primary-400">
                AI Specialist · Professional Business Strategist · Educator
              </p>

              <div className="mt-7 max-w-xl space-y-4 text-lg leading-relaxed text-text-secondary">
                <p>
                  I build AI systems that do real work inside real businesses —
                  automations that answer the phone, chase the invoices, qualify
                  the leads, and hand your team back their week.
                </p>
                <p>
                  I&apos;m also the educator behind{" "}
                  <a
                    href={YOUTUBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-text-primary underline decoration-primary-600/50 underline-offset-4 transition-colors hover:text-primary-300"
                    data-analytics-event="youtube_click"
                    data-analytics-label="team-hero-inline"
                  >
                    Agentic Ali
                  </a>
                  , where <strong className="font-semibold text-text-primary">50,000+ students</strong>{" "}
                  have learned how to put AI to work. Everything I teach in
                  public is what my clients get in private — strategy first,
                  hype never.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  href="/contact"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  analyticsEvent="cta_click"
                  analyticsLabel="team-hero"
                >
                  Work With Me
                </Button>
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-event="youtube_click"
                  data-analytics-label="team-hero-button"
                  className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[rgba(255,80,80,0.4)] bg-[rgba(255,0,0,0.1)] px-8 py-4 text-lg font-semibold text-[#ff8080] transition-all duration-150 hover:scale-[1.02] hover:bg-[rgba(255,0,0,0.16)] active:scale-95"
                >
                  <Youtube size={20} aria-hidden="true" />
                  @agenticali
                </a>
              </div>
            </div>

            {/* Portrait card */}
            <div className="relative mx-auto w-full max-w-sm">
              <div className="floaty relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-copper)] bg-bg-card shadow-[var(--glow-copper)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/team/team-2.jpg"
                  alt="Ali Ameen, founder of RemotelyAvailable"
                  className="aspect-[4/4.6] w-full object-cover"
                  style={{ objectPosition: "center 32%" }}
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-primary-600/40 bg-black/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-primary-400 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
                  Founder
                </span>
              </div>

              {/* floating stat chip */}
              <div className="absolute -bottom-5 -left-4 rounded-xl border border-white/[0.12] bg-bg-card/95 px-5 py-3.5 shadow-2xl shadow-black/50 backdrop-blur-xl sm:-left-8">
                <p className="font-display text-2xl font-bold text-primary-400">50,000+</p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
                  students taught
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What Ali does */}
      <section className="bg-bg-card py-20">
        <Container>
          <SectionHeading
            badge="What I Do"
            title="Three Jobs, One Outcome: Your Time Back"
            description="Strategy, systems, and education — the same craft applied three ways."
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {EXPERTISE.map(({ icon: Icon, title, desc, vignette }) => (
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
            ))}
          </div>
        </Container>
      </section>

      {/* Numbers */}
      <section className="py-20">
        <Container>
          <SectionHeading
            badge="Track Record"
            title="The Numbers Behind the Team"
          />
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {TEAM_STATS.map((s) => (
              <CountUpStat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </Container>
      </section>

      {/* The wider team */}
      <section className="bg-bg-card py-20">
        <Container>
          <SectionHeading
            badge="The Team"
            title="The Builders Behind the Systems"
            description="A senior bench of automation engineers, designers, and strategists who ship alongside Ali on every project."
          />
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              { img: "/team/team-1.jpg", pos: "center 22%" },
              { img: "/team/team-3.jpg", pos: "center 18%" },
            ].map((m) => (
              <div
                key={m.img}
                className="spot-card group relative overflow-hidden rounded-[var(--radius-card)] border border-white/[0.08] bg-bg-base"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.img}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3.2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: m.pos }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-5 pb-4 pt-10">
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

      <CTABanner />
    </>
  );
}
