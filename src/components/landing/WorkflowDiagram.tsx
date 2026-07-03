"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const CHAOS = [
  { label: "Emails piling up", tilt: -3 },
  { label: "Manual invoices", tilt: 2 },
  { label: "Missed calls", tilt: -2 },
  { label: "Copy-paste CRM entry", tilt: 3 },
  { label: "Forgotten follow-ups", tilt: -1 },
];

const RESULTS = [
  "Replies sent in seconds",
  "Invoices processed automatically",
  "Every call answered, 24/7",
  "CRM always up to date",
];

function FlowLine({ shown }: { shown: boolean }) {
  return (
    <svg
      viewBox="0 0 64 8"
      className="hidden h-2 w-16 shrink-0 lg:block"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="4"
        x2="64"
        y2="4"
        stroke="var(--ra-copper)"
        strokeOpacity={shown ? 0.7 : 0}
        strokeWidth="2"
        strokeDasharray="6 6"
        className="wf-flow"
        style={{ transition: "stroke-opacity 0.6s ease 0.5s" }}
      />
    </svg>
  );
}

// "Chaos → engine → order" story told visually. Animates once on reveal.
export function WorkflowDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          badge="Before & After"
          title="From Busywork Chaos to a System That Runs Itself"
          description="Every repetitive task your team does by hand is a workflow waiting to be automated."
        />

        <div
          ref={ref}
          className="flex flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-4"
        >
          {/* Before: scattered chaos */}
          <div className="flex w-full max-w-xs flex-col items-center gap-3">
            <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
              {"// before"}
            </p>
            {CHAOS.map((item, i) => (
              <span
                key={item.label}
                className={cn(
                  "rounded-lg border border-dashed border-white/[0.18] bg-bg-card px-4 py-2",
                  "text-sm text-text-muted line-through decoration-white/20",
                  "transition-all duration-500 ease-out"
                )}
                style={{
                  transform: shown
                    ? `rotate(${item.tilt}deg) translateY(0)`
                    : `rotate(${item.tilt * 2}deg) translateY(12px)`,
                  opacity: shown ? 1 : 0,
                  transitionDelay: `${i * 90}ms`,
                }}
              >
                {item.label}
              </span>
            ))}
          </div>

          <FlowLine shown={shown} />

          {/* Engine */}
          <div
            className="flex flex-col items-center transition-all duration-500 ease-out"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "scale(1)" : "scale(0.85)",
              transitionDelay: "350ms",
            }}
          >
            <div className="wf-pulse flex h-28 w-28 flex-col items-center justify-center gap-1.5 rounded-full border border-primary-600/40 bg-gradient-to-br from-primary-600/20 to-accent-600/20">
              <Sparkles size={26} className="text-primary-400" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary">
                RA Engine
              </span>
            </div>
            <p className="mt-3 max-w-[9rem] text-center font-mono text-[11px] leading-relaxed text-text-muted">
              your workflows, automated
            </p>
          </div>

          <FlowLine shown={shown} />

          {/* After: clean pipeline */}
          <div className="flex w-full max-w-xs flex-col gap-3">
            <p className="mb-1 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-primary-400 lg:text-left">
              {"// after"}
            </p>
            {RESULTS.map((label, i) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-3 rounded-lg border border-white/[0.08] bg-bg-card px-4 py-2.5",
                  "text-sm text-text-primary transition-all duration-500 ease-out"
                )}
                style={{
                  transform: shown ? "translateX(0)" : "translateX(16px)",
                  opacity: shown ? 1 : 0,
                  transitionDelay: `${500 + i * 110}ms`,
                }}
              >
                <CheckCircle2
                  size={17}
                  className="shrink-0 text-success"
                  aria-hidden="true"
                />
                {label}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
