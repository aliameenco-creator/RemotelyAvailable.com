import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pill } from "@/components/ui/Pill";
import { CountUpStat } from "@/components/ui/CountUpStat";
import { getCaseStudiesForService } from "@/data/caseStudies";
import { stats } from "@/data/navigation";
import { pickVariant } from "@/lib/pickVariant";

const headingVariants = [
  "Results We Deliver",
  "Proof, Not Promises",
  "Real Numbers From Real Clients",
  "What Working With Us Looks Like",
];

interface ProofSectionProps {
  /** Filters the case-study pool; omit for the generic pool. */
  serviceSlug?: string;
  /** Deterministic seed (page slug) so each page's pick is stable and varied. */
  seed: string;
  badge?: string;
  title?: string;
  description?: string;
  className?: string;
}

// Server component: static stats + one seeded case-study card. Kept
// hydration-free on purpose — it renders on 500+ programmatic pages.
export function ProofSection({
  serviceSlug,
  seed,
  badge,
  title,
  description,
  className,
}: ProofSectionProps) {
  const study = pickVariant(getCaseStudiesForService(serviceSlug), `${seed}-cs`);

  return (
    <section className={className ?? "py-20"}>
      <Container>
        <SectionHeading
          badge={badge ?? "Client Results"}
          title={title ?? pickVariant(headingVariants, seed)}
          description={description}
        />

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <CountUpStat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>

        <Link href={`/projects/${study.slug}`} className="group mt-6 block">
          <div className="flex flex-col gap-6 rounded-xl border border-white/[0.08] bg-bg-card p-7 transition-colors group-hover:border-primary-600/40 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone={study.tagTone}>{study.tag}</Pill>
                <span className="text-xs uppercase tracking-widest text-text-muted">
                  Case Study
                </span>
              </div>
              <p className="mt-3 font-display text-xl font-bold leading-snug text-text-primary sm:text-2xl">
                {study.cardTitle}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary-400 transition-colors group-hover:text-primary-300">
                Read the full case study
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
            </div>
            <p className="shrink-0 font-display text-3xl font-bold text-primary-400 sm:text-4xl">
              {study.cardStat}
            </p>
          </div>
        </Link>
      </Container>
    </section>
  );
}
