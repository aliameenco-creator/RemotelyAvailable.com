import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/sections/CTABanner";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";

export const metadata: Metadata = {
  title: "Client Projects | AI Automation Case Studies | RemotelyAvailable",
  description:
    "See how RemotelyAvailable has helped businesses save 40+ hours per week with AI automation, chatbots, and intelligent workflows. Real results, real impact.",
  openGraph: {
    title: "Client Projects | RemotelyAvailable",
    description:
      "Real AI automation projects. Real results. See how we've helped businesses transform their operations.",
    url: `${siteConfig.url}/projects`,
  },
};

const caseStudy = {
  client: "MedCore Clinics",
  industry: "Healthcare / Private Practice",
  tag: "AI Automation + Chatbot",
  headline: "How a 12-Location Medical Practice Cut Admin Workload by 60% with AI",
  subheadline:
    "MedCore was drowning in phone calls, missed appointments, and manual follow-up tasks. We built a fully automated patient communication system that runs 24/7 — without adding a single staff member.",
  stats: [
    { value: "60%", label: "Reduction in admin workload" },
    { value: "3.2×", label: "Increase in appointment bookings" },
    { value: "94%", label: "Patient satisfaction score" },
    { value: "$8,400", label: "Monthly cost savings" },
  ],
  problem: {
    title: "The Problem",
    body: `MedCore Clinics operates across 12 locations in the UK. Before working with us, their admin team was fielding over 400 inbound calls per day — most of them about appointment availability, rescheduling, or basic FAQs.

The same questions, over and over. Patients would wait on hold for 15+ minutes. Staff were burnt out. Appointments were being missed because follow-up reminders were sent manually and inconsistently. And after 5pm? No one was available at all.

The business was growing, but the operations hadn't scaled with it. Every new patient added more pressure on the same overworked team.`,
    painPoints: [
      "400+ inbound calls per day answered by 6 admin staff",
      "18% no-show rate costing ~£22,000/month in lost revenue",
      "Zero after-hours support — patients couldn't reach anyone",
      "Manual follow-ups missed 1 in 3 patients",
      "Staff turnover was high due to repetitive, high-pressure work",
    ],
  },
  solution: {
    title: "The Solution",
    body: `We built a three-layer AI system that handles patient communication end-to-end, 24 hours a day, across all 12 locations.`,
    layers: [
      {
        number: "01",
        title: "AI Receptionist Chatbot",
        description:
          "A context-aware chatbot embedded in their website and WhatsApp. It answers FAQs, checks real-time appointment availability via their practice management system, and books or reschedules appointments — all without human involvement.",
      },
      {
        number: "02",
        title: "Automated Appointment Workflows",
        description:
          "Smart reminder sequences sent via SMS and email at 72 hours, 24 hours, and 2 hours before every appointment. Patients can confirm or reschedule with a single tap. Cancelled slots are automatically re-offered to a waitlist.",
      },
      {
        number: "03",
        title: "Post-Visit Follow-Up Automation",
        description:
          "After each appointment, patients automatically receive a check-in message, care instructions, and a review request. High-risk patients flagged by the doctor trigger a dedicated follow-up flow.",
      },
    ],
  },
  results: {
    title: "The Results",
    body: "Within 60 days of deployment, MedCore saw measurable changes across every metric we tracked.",
    metrics: [
      {
        before: "400 calls/day handled by 6 staff",
        after: "Under 80 calls/day — AI handles the rest",
        improvement: "80% of inbound volume automated",
      },
      {
        before: "18% no-show rate",
        after: "6% no-show rate",
        improvement: "67% reduction in missed appointments",
      },
      {
        before: "No after-hours support",
        after: "24/7 patient communication",
        improvement: "32% of bookings now happen outside office hours",
      },
      {
        before: "Manual follow-up: 1 in 3 missed",
        after: "100% of patients receive follow-up",
        improvement: "Fully automated post-visit care flow",
      },
    ],
  },
  testimonial: {
    quote:
      "We were sceptical at first — AI in a healthcare setting felt risky. But RemotelyAvailable took the time to understand our workflows, our patients, and our compliance requirements. The result has been transformative. Our staff are happier, our patients are better served, and we're saving real money every month.",
    author: "Dr. Priya Mehta",
    role: "Clinical Director, MedCore Clinics",
  },
  timeline: "6 weeks from kickoff to full deployment",
  tools: ["n8n", "OpenAI GPT-4o", "Twilio", "WhatsApp Business API", "Google Calendar API", "Zapier"],
};

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "RemotelyAvailable Case Studies",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Article",
          name: caseStudy.headline,
          description: caseStudy.subheadline,
          url: `${siteConfig.url}/projects`,
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
          },
        },
      },
    ],
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
        <GradientOrb color="accent" size="md" animation={2} className="top-40 -left-20 opacity-15" />
        <Container className="relative z-10">
          <ScrollReveal>
            <nav className="mb-8 text-sm text-text-muted">
              <Link href="/" className="hover:text-text-secondary transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-text-secondary">Projects</span>
            </nav>
            <SectionHeading
              badge="Case Studies"
              title="Real Projects. Real Results."
              description="We don't deal in vanity metrics or before/after screenshots. Here's what we've actually built — and what it delivered."
              align="left"
            />
          </ScrollReveal>
        </Container>
      </section>

      {/* Case Study Card */}
      <section className="pb-8">
        <Container>
          <ScrollReveal>
            <div className="glass rounded-2xl overflow-hidden border border-white/[0.08]">
              {/* Header bar */}
              <div className="bg-gradient-to-r from-primary-900/60 to-accent-900/40 px-8 py-6 border-b border-white/[0.06]">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="rounded-full bg-primary-600/20 border border-primary-600/30 px-3 py-1 text-xs font-medium text-primary-400">
                    {caseStudy.tag}
                  </span>
                  <span className="text-xs text-text-muted">{caseStudy.industry}</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl leading-snug">
                  {caseStudy.headline}
                </h2>
                <p className="mt-3 text-text-secondary max-w-3xl leading-relaxed">
                  {caseStudy.subheadline}
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-white/[0.06]">
                {caseStudy.stats.map((stat) => (
                  <div key={stat.label} className="px-6 py-5 text-center">
                    <div className="font-display text-3xl font-bold">
                      <GradientText>{stat.value}</GradientText>
                    </div>
                    <div className="mt-1 text-xs text-text-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Problem */}
      <section className="py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
            <ScrollReveal>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-error/80 mb-4 block">
                  The Challenge
                </span>
                <h2 className="font-display text-3xl font-bold text-text-primary mb-6">
                  {caseStudy.problem.title}
                </h2>
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  {caseStudy.problem.body.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="bg-error/5 border border-error/20 rounded-2xl p-8">
                <h3 className="text-sm font-semibold text-text-primary mb-5 uppercase tracking-wider">
                  Pain Points
                </h3>
                <ul className="space-y-4">
                  {caseStudy.problem.painPoints.map((point, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-error/20 text-error text-xs font-bold">
                        ✕
                      </span>
                      <span className="text-text-secondary text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Solution */}
      <section className="py-16 bg-bg-card">
        <Container>
          <ScrollReveal>
            <div className="mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-4 block">
                What We Built
              </span>
              <h2 className="font-display text-3xl font-bold text-text-primary">
                {caseStudy.solution.title}
              </h2>
              <p className="mt-3 text-text-secondary max-w-2xl">{caseStudy.solution.body}</p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {caseStudy.solution.layers.map((layer, i) => (
              <ScrollReveal key={layer.number} delay={i * 0.12}>
                <div className="glass rounded-2xl p-8 h-full border border-white/[0.06] hover:border-primary-600/30 transition-colors duration-300">
                  <div className="font-display text-4xl font-bold text-primary-600/30 mb-4">
                    {layer.number}
                  </div>
                  <h3 className="font-display text-lg font-bold text-text-primary mb-3">
                    {layer.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {layer.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Tools used */}
          <ScrollReveal delay={0.2}>
            <div className="mt-10 pt-8 border-t border-white/[0.06]">
              <p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-4">
                Technologies Used
              </p>
              <div className="flex flex-wrap gap-2">
                {caseStudy.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-bg-subtle bg-bg-surface px-3 py-1 text-xs text-text-secondary"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Results */}
      <section className="py-16">
        <Container>
          <ScrollReveal>
            <div className="mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-success/80 mb-4 block">
                The Outcome
              </span>
              <h2 className="font-display text-3xl font-bold text-text-primary">
                {caseStudy.results.title}
              </h2>
              <p className="mt-3 text-text-secondary max-w-2xl">{caseStudy.results.body}</p>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {caseStudy.results.metrics.map((metric, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass rounded-xl p-6 border border-white/[0.06]">
                  <div className="grid gap-4 sm:grid-cols-3 sm:items-center">
                    <div className="flex gap-3 items-start">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-error/20 text-error text-xs">✕</span>
                      <span className="text-sm text-text-muted">{metric.before}</span>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/20 text-success text-xs">✓</span>
                      <span className="text-sm text-text-secondary">{metric.after}</span>
                    </div>
                    <div className="sm:text-right">
                      <span className="text-sm font-semibold text-success">{metric.improvement}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-bg-card">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl">
              <div className="glass rounded-2xl p-10 border border-white/[0.08] text-center">
                <div className="text-4xl text-primary-400/40 font-display mb-6">&ldquo;</div>
                <blockquote className="font-display text-xl text-text-primary leading-relaxed italic">
                  {caseStudy.testimonial.quote}
                </blockquote>
                <div className="mt-8 flex flex-col items-center gap-1">
                  <span className="font-semibold text-text-primary">{caseStudy.testimonial.author}</span>
                  <span className="text-sm text-text-muted">{caseStudy.testimonial.role}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Timeline + CTA */}
      <section className="py-16">
        <Container>
          <ScrollReveal>
            <div className="glass rounded-2xl p-8 md:p-12 border border-white/[0.08]">
              <div className="grid gap-8 md:grid-cols-2 md:gap-16 items-center">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4 block">
                    Delivery
                  </span>
                  <h3 className="font-display text-2xl font-bold text-text-primary mb-2">
                    From zero to live in 6 weeks.
                  </h3>
                  <p className="text-text-secondary">
                    Discovery → build → test → deployment → handover. Structured, fast, and zero surprises.
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    { week: "Week 1", label: "Discovery & Workflow Mapping" },
                    { week: "Week 2–3", label: "AI Build & Integration" },
                    { week: "Week 4", label: "Testing & Iteration" },
                    { week: "Week 5–6", label: "Deployment, Training & Handover" },
                  ].map((step) => (
                    <div key={step.week} className="flex items-center gap-4">
                      <span className="shrink-0 text-xs font-medium text-primary-400 w-16">{step.week}</span>
                      <div className="flex-1 h-px bg-white/[0.06]" />
                      <span className="text-sm text-text-secondary">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Want similar results CTA */}
      <section className="pb-16">
        <Container>
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-900/60 via-bg-card to-accent-900/40 border border-white/[0.08] p-10 md:p-14 text-center">
              <GradientOrb color="primary" size="sm" animation={1} className="top-0 right-0 opacity-30" />
              <GradientOrb color="accent" size="sm" animation={2} className="bottom-0 left-0 opacity-20" />
              <div className="relative z-10">
                <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
                  Want Results Like These for Your Business?
                </h2>
                <p className="mt-4 text-text-secondary max-w-xl mx-auto">
                  Tell us where your team is losing time. We&apos;ll scope a solution and show you the ROI before you commit to anything.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button href="/contact" size="lg" icon={<ArrowRight size={18} />}>
                    Talk to Us
                  </Button>
                  <Button href="/services" variant="secondary" size="lg">
                    See Our Services
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
