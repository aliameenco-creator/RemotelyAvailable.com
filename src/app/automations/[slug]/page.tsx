import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles, Target } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Pill } from "@/components/ui/Pill";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/sections/CTABanner";
import { AutomationHeroImage } from "@/components/automations/AutomationHeroImage";
import {
  automations,
  getAutomation,
  getAdjacentAutomations,
  automationCategoryLabels,
  automationCategoryTones,
} from "@/data/automations";
import { siteConfig } from "@/lib/constants";

interface AutomationDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return automations.map((automation) => ({ slug: automation.slug }));
}

export async function generateMetadata({
  params,
}: AutomationDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const automation = getAutomation(slug);

  if (!automation) return {};

  return {
    title: `${automation.name} | AI Automation Case Study`,
    description: automation.description,
    openGraph: {
      title: `${automation.name} | RemotelyAvailable`,
      description: automation.description,
      url: `${siteConfig.url}/automations/${automation.slug}`,
    },
  };
}

export default async function AutomationDetailPage({
  params,
}: AutomationDetailPageProps) {
  const { slug } = await params;
  const automation = getAutomation(slug);

  if (!automation) notFound();

  const { previous, next } = getAdjacentAutomations(slug);

  return (
    <>
    <section className="pt-28 pb-24 sm:pt-32">
      <Container>
        <nav className="mb-8 text-sm text-text-muted">
          <Link href="/" className="hover:text-text-secondary transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/automations" className="hover:text-text-secondary transition-colors">
            Automations
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text-secondary">{automation.name}</span>
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          <Pill tone={automationCategoryTones[automation.category]}>
            {automationCategoryLabels[automation.category]}
          </Pill>
          {automation.status === "built" ? (
            <Pill tone="success" dot>
              Built
            </Pill>
          ) : (
            <Pill tone="neutral" style={{ background: "transparent" }}>
              In Progress
            </Pill>
          )}
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-text-primary sm:text-5xl">
            {automation.name}
          </h1>
          {automation.link && (
            <a
              href={automation.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-1 inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary-400 transition-colors hover:text-primary-300"
            >
              Visit live automation
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="mt-8">
          <AutomationHeroImage name={automation.name} imageUrl={automation.imageUrl} />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <article className="rounded-xl border border-white/[0.1] bg-bg-card p-7 lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-text-primary">
              What it does
            </h2>
            <p className="mt-4 leading-relaxed text-text-secondary">
              {automation.description}
            </p>

            <div className="mt-6 flex items-start gap-3 rounded-lg border border-primary-600/20 bg-primary-600/10 p-4">
              <Sparkles size={18} className="mt-0.5 shrink-0 text-primary-400" aria-hidden="true" />
              <p className="font-medium text-primary-400">{automation.highlight}</p>
            </div>
          </article>

          <article className="rounded-xl border border-white/[0.1] bg-bg-card p-7">
            <div className="flex items-center gap-2.5">
              <Target size={20} className="text-primary-400" aria-hidden="true" />
              <h2 className="font-display text-xl font-bold text-text-primary">
                Problem it solves
              </h2>
            </div>
            <p className="mt-4 leading-relaxed text-text-secondary">
              {automation.purpose}
            </p>
          </article>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <article className="rounded-xl border border-white/[0.1] bg-bg-card p-7">
            <h2 className="font-display text-xl font-bold text-text-primary">
              Tech stack
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {automation.techStack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </article>

          <article className="rounded-xl border border-white/[0.1] bg-bg-card p-7">
            <h2 className="font-display text-xl font-bold text-text-primary">
              Who it&apos;s for
            </h2>
            <p className="mt-4 leading-relaxed text-text-secondary">
              {automation.useCase}
            </p>
          </article>
        </div>

        <div className="mt-12 rounded-xl border border-primary-600/20 bg-gradient-to-br from-primary-600/10 to-accent-600/10 p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
            Want something like this in your business?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-text-secondary">
            We build automations like {automation.name} for businesses every
            week. Tell us what&apos;s eating your team&apos;s time and
            we&apos;ll map out how to automate it.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href="/contact"
              size="lg"
              analyticsEvent="cta_click"
              analyticsLabel={`automation-${automation.slug}`}
            >
              Book a Free Automation Call
            </Button>
            <Button href="/services/ai-automations" variant="secondary" size="lg">
              Explore AI Automation Services
            </Button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="font-display text-lg font-bold text-text-primary">
            Keep exploring
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/ai-automation-systems"
              className="rounded-full border border-[var(--border-subtle)] px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-white/[0.04] hover:text-text-primary"
            >
              Ready-made AI automation systems
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-[var(--border-subtle)] px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-white/[0.04] hover:text-text-primary"
            >
              Client case studies
            </Link>
            <Link
              href="/services/ai-automations"
              className="rounded-full border border-[var(--border-subtle)] px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-white/[0.04] hover:text-text-primary"
            >
              AI automation services
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-[var(--ra-cream-08)] pt-10 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/automations"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Automations
          </Link>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/automations/${previous.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] px-4 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary hover:bg-white/[0.04]"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              {previous.name}
            </Link>
            <Link
              href={`/automations/${next.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] px-4 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary hover:bg-white/[0.04]"
            >
              {next.name}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
    <CTABanner />
    </>
  );
}
