import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDownRight,
  BriefcaseBusiness,
  CheckCircle2,
  CirclePlay,
  Database,
  Search,
  Sparkles,
  Target,
  Timer,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FAQ } from "@/components/sections/FAQ";
import { getSystem, systems } from "@/data/systems";

interface SystemDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return systems.map((system) => ({ slug: system.slug }));
}

export async function generateMetadata({
  params,
}: SystemDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const system = getSystem(slug);

  if (!system) return {};

  return {
    title: system.title,
    description: system.detailDescription,
  };
}

export default async function SystemDetailPage({
  params,
}: SystemDetailPageProps) {
  const { slug } = await params;
  const system = getSystem(slug);

  if (!system) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: system.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="pt-28 pb-0 sm:pt-32">
        <Container>
        <div className="grid min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-md border border-white/[0.12] px-3 py-2 text-xs font-semibold uppercase tracking-widest text-text-secondary">
              <Sparkles size={14} className="text-primary-400" />
              Premium System
            </p>
            <h1 className="mt-6 max-w-xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-text-primary sm:text-5xl">
              {system.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary">
              {system.detailDescription}
            </p>

            <p className="mt-6 flex items-end gap-2">
              <span className="font-display text-5xl font-bold text-primary-400">
                {system.pricePrefix}£{system.price}
              </span>
              <span className="pb-1.5 text-sm text-text-secondary">
                {system.detailPriceSuffix ?? "/month"}
              </span>
            </p>

            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex rounded-xl bg-primary-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-500"
              >
                Pricing &amp; Complete Setup
              </Link>
            </div>
          </div>

          <div className="relative min-w-0 overflow-hidden rounded-xl border border-white/[0.12] bg-bg-card">
            <Image
              src={system.detailImage}
              alt={`${system.title} demo preview`}
              width={1000}
              height={900}
              className={`aspect-square h-full w-full opacity-75 ${
                system.detailImageFit === "contain"
                  ? "object-contain"
                  : "object-cover"
              }`}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.12] bg-bg-card/85 px-10 py-7 text-center backdrop-blur-md">
                <CirclePlay size={30} className="text-primary-400" />
                <span className="text-sm font-semibold uppercase tracking-widest text-text-primary">
                  System Demo
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          id="system-details"
          className="mt-12 grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-3"
        >
          <article className="relative overflow-hidden rounded-xl border border-white/[0.1] bg-bg-card p-7 lg:col-span-2">
            <Timer
              size={132}
              className="absolute right-6 top-7 text-white/[0.08]"
            />
            <h2 className="relative font-display text-3xl font-bold text-text-primary">
              {system.valueTitle}
            </h2>
            <p className="relative mt-5 max-w-xl leading-relaxed text-text-secondary">
              {system.valueDescription}
            </p>
            <p className="relative mt-8 flex items-center gap-2 text-sm font-semibold text-text-primary">
              <ArrowDownRight size={21} className="text-primary-400" />
              {system.metric}
            </p>
          </article>

          <article className="rounded-xl border border-white/[0.1] bg-bg-card p-7">
            <h2 className="font-display text-2xl font-bold text-text-primary">
              What it does
            </h2>
            <ul className="mt-5 space-y-3">
              {system.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="flex items-start gap-3 text-text-secondary"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-primary-400"
                  />
                  {capability}
                </li>
              ))}
            </ul>
          </article>
        </div>

        {system.workflow && (
          <section className="mt-12 rounded-xl border border-white/[0.1] bg-bg-card p-7">
            <div className="flex items-center gap-3">
              <Target size={24} className="text-primary-400" />
              <h2 className="font-display text-3xl font-bold text-text-primary">
                How It Works
              </h2>
            </div>
            <p className="mt-3 max-w-2xl leading-relaxed text-text-secondary">
              {system.workflowDescription}
            </p>
            <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {system.workflow.map((step, index) => (
                <li
                  key={step}
                  className="rounded-lg border border-white/[0.08] bg-bg-base/55 p-4"
                >
                  <span className="font-display text-sm font-bold text-primary-400">
                    0{index + 1}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {system.painPoints && system.dataCollected && (
          <section className="mt-5 grid gap-5 lg:grid-cols-3">
            <article className="rounded-xl border border-white/[0.1] bg-bg-card p-7 lg:col-span-2">
              <div className="flex items-center gap-3">
                <Search size={23} className="text-primary-400" />
                <h2 className="font-display text-2xl font-bold text-text-primary">
                  {system.painPointsTitle ??
                    "Built for the Real Prospecting Bottlenecks"}
                </h2>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {system.painPoints.map((painPoint) => (
                  <div
                    key={painPoint.title}
                    className="rounded-lg border border-white/[0.08] bg-bg-base/55 p-4"
                  >
                    <h3 className="font-display text-base font-semibold text-text-primary">
                      {painPoint.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {painPoint.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-xl border border-white/[0.1] bg-bg-card p-7">
              <div className="flex items-center gap-3">
                <Database size={22} className="text-primary-400" />
                <h2 className="font-display text-2xl font-bold text-text-primary">
                  {system.dataCollectedTitle}
                </h2>
              </div>
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {system.dataCollected.map((field) => (
                  <li
                    key={field}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-primary-400"
                    />
                    {field}
                  </li>
                ))}
              </ul>
            </article>
          </section>
        )}

        {system.idealFor && system.outcomes && (
          <section className="mt-5 grid gap-5 lg:grid-cols-2">
            <article className="rounded-xl border border-white/[0.1] bg-bg-card p-7">
              <div className="flex items-center gap-3">
                <Users size={23} className="text-primary-400" />
                <h2 className="font-display text-2xl font-bold text-text-primary">
                  Built For
                </h2>
              </div>
              <p className="mt-4 leading-relaxed text-text-secondary">
                {system.idealForDescription}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {system.idealFor.map((user) => (
                  <span
                    key={user}
                    className="rounded-full border border-primary-400/20 bg-primary-600/10 px-3 py-1.5 text-xs font-medium text-primary-400"
                  >
                    {user}
                  </span>
                ))}
              </div>
            </article>

            <article className="rounded-xl border border-white/[0.1] bg-bg-card p-7">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness size={23} className="text-primary-400" />
                <h2 className="font-display text-2xl font-bold text-text-primary">
                  The Outcome
                </h2>
              </div>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {system.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex items-start gap-2.5 text-sm text-text-secondary"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-primary-400"
                    />
                    {outcome}
                  </li>
                ))}
              </ul>
            </article>
          </section>
        )}

        {system.pricingTiers && (
          <section className="mt-12">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-400">
                Pricing Options
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-text-primary">
                Choose the Right Website Chatbot
              </h2>
              <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-text-secondary">
                Start with the level of assistance your website needs today.
                Each package is custom configured for your business and brand.
              </p>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {system.pricingTiers.map((tier) => (
                <article
                  key={tier.name}
                  className="flex flex-col rounded-xl border border-white/[0.1] bg-bg-card p-6"
                >
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    {tier.name}
                  </h3>
                  <p className="mt-3 font-display text-3xl font-bold text-primary-400">
                    {tier.price}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                    {tier.description}
                  </p>

                  <h4 className="mt-6 text-xs font-semibold uppercase tracking-widest text-text-primary">
                    Includes
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {tier.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
                      >
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 shrink-0 text-primary-400"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <h4 className="mt-6 text-xs font-semibold uppercase tracking-widest text-text-primary">
                    Best For
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tier.bestFor.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-primary-400/20 bg-primary-600/10 px-2.5 py-1 text-[11px] font-medium text-primary-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <p className="mt-auto pt-6 text-sm font-medium leading-relaxed text-text-primary">
                    {tier.outcome}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {system.supportPlan && (
          <section className="mt-5 rounded-xl border border-primary-400/20 bg-primary-600/10 p-7">
            <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-400">
                  Optional Add-On
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-text-primary">
                  {system.supportPlan.name}
                </h2>
                <p className="mt-3 font-display text-2xl font-bold text-primary-400">
                  {system.supportPlan.price}
                </p>
                <p className="mt-4 leading-relaxed text-text-secondary">
                  {system.supportPlan.description}
                </p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {system.supportPlan.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-text-secondary"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-primary-400"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
        </Container>
      </section>
      <FAQ
        faqs={system.faqs}
        badge="System FAQ"
        title={`${system.title} FAQs`}
        description="Answers to the common questions about this automation system, setup, and what is included."
      />
    </>
  );
}
