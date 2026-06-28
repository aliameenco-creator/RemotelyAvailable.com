import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Zap } from "lucide-react";
import type { System } from "@/data/systems";

interface SystemCardProps {
  system: System;
}

export function SystemCard({ system }: SystemCardProps) {
  return (
    <article className="group grid w-full min-w-0 overflow-hidden rounded-xl border border-white/[0.12] bg-bg-card transition-colors duration-300 hover:border-primary-400/50 md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
      <div className="relative flex items-center border-b border-white/[0.12] bg-bg-surface p-4 md:border-r md:border-b-0 md:p-5">
        <Image
          src={system.libraryImage}
          alt={`${system.title} workflow preview`}
          width={1280}
          height={720}
          className="h-auto w-full object-contain"
          priority={system.featured}
        />
        {system.featured && (
          <span className="absolute left-4 top-4 rounded-sm border border-primary-400/30 bg-primary-600/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-400 backdrop-blur-sm sm:left-6 sm:top-6">
            Featured
          </span>
        )}
        {system.demandLabel && (
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-sm border border-white/[0.12] bg-bg-base/90 px-3 py-1.5 text-xs font-medium text-text-primary backdrop-blur-sm sm:bottom-6 sm:right-6">
            <Zap size={14} className="text-primary-400" />
            {system.demandLabel}
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-col p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div>
            <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-text-secondary">
              <Sparkles size={14} className="text-primary-400" />
              {system.category}
            </p>
            <h2 className="font-display text-xl font-bold leading-tight text-text-primary">
              {system.title}
            </h2>
          </div>
          <p className="shrink-0 font-display text-2xl font-bold text-primary-400">
            {system.pricePrefix}£{system.price}
            <span className="text-xs font-normal text-text-secondary">
              {system.libraryPriceSuffix ?? "/mo"}
            </span>
          </p>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          {system.description}
        </p>

        <div className="mt-4 rounded-lg border border-white/[0.12] bg-bg-base/75 p-3.5">
          <p className="mb-2.5 text-xs italic leading-relaxed text-primary-400">
            &ldquo;{system.prompt}&rdquo;
          </p>
          <ul className="space-y-2">
            {system.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 text-xs leading-relaxed text-text-secondary"
              >
                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0 text-primary-400"
                />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={`/ai-automation-systems/${system.slug}`}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-primary-500 md:mt-4"
        >
          Pricing &amp; Complete Setup
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}
