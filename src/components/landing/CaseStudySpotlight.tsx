"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pill } from "@/components/ui/Pill";
import { caseStudies } from "@/data/caseStudies";
import { cn } from "@/lib/utils";

const ROTATE_MS = 5500;

export function CaseStudySpotlight() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % caseStudies.length),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, [paused]);

  const study = caseStudies[index];

  return (
    <section className="relative overflow-hidden py-24">
      <Container>
        <SectionHeading
          badge="Client Wins"
          title="Real Projects, Real Numbers"
          description="A rotating look at what happens when the busywork disappears."
        />

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mx-auto max-w-4xl"
        >
          <div
            key={study.slug}
            className="animate-fade-in-up grid items-center gap-8 rounded-[var(--radius-card)] border border-white/[0.1] bg-bg-card p-8 sm:p-10 lg:grid-cols-[auto_1fr]"
          >
            <div className="text-center lg:border-r lg:border-white/[0.08] lg:pr-10">
              <p className="font-display text-5xl font-bold text-primary-400 sm:text-6xl">
                {study.cardStat}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
                {study.timeline} build
              </p>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone={study.tagTone}>{study.tag}</Pill>
                <span className="text-xs text-text-muted">{study.client}</span>
              </div>
              <h3 className="mt-3 font-display text-xl font-bold leading-snug text-text-primary sm:text-2xl">
                {study.cardTitle}
              </h3>
              <blockquote className="mt-4 border-l-2 border-primary-600/40 pl-4 text-sm italic leading-relaxed text-text-secondary">
                &ldquo;{study.quote.before}
                <span className="text-text-primary not-italic font-medium">
                  {study.quote.emphasis}
                </span>
                {study.quote.after}&rdquo;
                <footer className="mt-2 text-xs not-italic text-text-muted">
                  — {study.quote.author}, {study.quote.role}
                </footer>
              </blockquote>
              <Link
                href={`/projects/${study.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary-400 transition-colors hover:text-primary-300"
                data-analytics-event="cta_click"
                data-analytics-label={`case-spotlight:${study.slug}`}
              >
                Read the full case study
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2.5">
            {caseStudies.map((s, i) => (
              <button
                key={s.slug}
                onClick={() => setIndex(i)}
                aria-label={`Show ${s.client} case study`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index
                    ? "w-8 bg-primary-400"
                    : "w-2 bg-white/[0.15] hover:bg-white/[0.3]"
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
