"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pill } from "@/components/ui/Pill";
import { caseStudies } from "@/data/caseStudies";
import { cn } from "@/lib/utils";

const ROTATE_MS = 6000;

export function CaseStudySpotlight() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % caseStudies.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused]);

  function goTo(i: number) {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  }

  const study = caseStudies[index];
  const results = study.results?.slice(0, 2) ?? [];

  return (
    <section className="relative overflow-hidden py-24">
      {/* backdrop glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(closest-side, var(--ra-copper-08), transparent 70%)",
        }}
      />

      <Container className="relative z-10">
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
          <div className="spot-card relative overflow-hidden rounded-[var(--radius-card)] border border-white/[0.1] bg-bg-card">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={study.slug}
                custom={direction}
                initial={{ opacity: 0, x: 56 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -56 * direction }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-[auto_1fr]"
              >
                {/* Stat panel */}
                <div className="relative text-center lg:w-64 lg:border-r lg:border-white/[0.08] lg:pr-10">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      background:
                        "radial-gradient(closest-side, var(--ra-copper-16), transparent 70%)",
                    }}
                  />
                  <motion.p
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 }}
                    className="relative font-display text-5xl font-bold text-primary-400 sm:text-6xl"
                  >
                    {study.cardStat}
                  </motion.p>
                  <p className="relative mt-2 font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
                    {study.timeline} build
                  </p>

                  {results.length > 0 && (
                    <div className="relative mt-5 flex justify-center gap-2 lg:flex-col lg:items-stretch">
                      {results.map((r, i) => (
                        <motion.div
                          key={r.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 + i * 0.12 }}
                          className="rounded-lg border border-white/[0.08] bg-bg-base/60 px-3 py-2"
                        >
                          <p className="font-display text-base font-bold text-text-primary">
                            {r.value}
                          </p>
                          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted">
                            {r.label}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Story panel */}
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone={study.tagTone}>{study.tag}</Pill>
                    <span className="text-xs text-text-muted">{study.client}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold leading-snug text-text-primary sm:text-2xl">
                    {study.cardTitle}
                  </h3>
                  <blockquote className="relative mt-4 border-l-2 border-primary-600/40 pl-4 text-sm italic leading-relaxed text-text-secondary">
                    <Quote
                      size={28}
                      aria-hidden="true"
                      className="absolute -left-1 -top-3 text-primary-600/20"
                    />
                    &ldquo;{study.quote.before}
                    <span className="font-medium not-italic text-text-primary">
                      {study.quote.emphasis}
                    </span>
                    {study.quote.after}&rdquo;
                    <footer className="mt-2 text-xs not-italic text-text-muted">
                      {study.quote.author}, {study.quote.role}
                    </footer>
                  </blockquote>
                  <Link
                    href={`/projects/${study.slug}`}
                    className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary-400 transition-colors hover:text-primary-300"
                    data-analytics-event="cta_click"
                    data-analytics-label={`case-spotlight:${study.slug}`}
                  >
                    Read the full case study
                    <ArrowRight
                      size={14}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="mt-6 flex justify-center gap-2.5">
            {caseStudies.map((s, i) => (
              <button
                key={s.slug}
                onClick={() => goTo(i)}
                aria-label={`Show ${s.client} case study`}
                className={cn(
                  "relative h-2 overflow-hidden rounded-full transition-all duration-300",
                  i === index
                    ? "w-10 bg-white/[0.12]"
                    : "w-2 bg-white/[0.15] hover:bg-white/[0.3]"
                )}
              >
                {i === index && (
                  <span
                    key={study.slug}
                    className="spotlight-progress absolute inset-0 origin-left rounded-full bg-primary-400"
                    style={{
                      animationDuration: `${ROTATE_MS}ms`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
