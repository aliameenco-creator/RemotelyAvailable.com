"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

// Share of repetitive work that's realistically automatable — kept
// deliberately conservative so the numbers stay credible.
const AUTOMATABLE_SHARE = 0.6;
const WEEKS_PER_MONTH = 4.33;

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (v: number) => void;
}

function SliderRow({ label, value, min, max, suffix, onChange }: SliderRowProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label className="text-sm font-medium text-text-secondary">{label}</label>
        <span className="font-display text-xl font-bold text-text-primary tabular-nums">
          {value}
          <span className="ml-1 text-xs font-normal text-text-muted">{suffix}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/[0.08]"
        style={{ accentColor: "var(--ra-copper)" }}
      />
    </div>
  );
}

export function RoiCalculator() {
  const [team, setTeam] = useState(5);
  const [hours, setHours] = useState(8);
  const [rate, setRate] = useState(25);

  const hoursSavedMonthly = Math.round(
    team * hours * AUTOMATABLE_SHARE * WEEKS_PER_MONTH
  );
  const moneySavedMonthly = hoursSavedMonthly * rate;
  const moneySavedYearly = moneySavedMonthly * 12;

  const fmt = (n: number) => `£${n.toLocaleString("en-GB")}`;

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/10 to-transparent" />
      <Container className="relative z-10">
        <SectionHeading
          badge="ROI Calculator"
          title="See What Automation Could Save You"
          description="Drag the sliders. The maths is conservative: we assume only 60% of repetitive work gets automated."
        />

        <div className="border-beam mx-auto grid max-w-4xl gap-8 rounded-[var(--radius-card)] border border-white/[0.1] bg-bg-card p-8 sm:p-10 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-8">
            <SliderRow
              label="People doing repetitive admin"
              value={team}
              min={1}
              max={50}
              suffix={team === 1 ? "person" : "people"}
              onChange={setTeam}
            />
            <SliderRow
              label="Hours each spends on it per week"
              value={hours}
              min={1}
              max={20}
              suffix="hrs / week"
              onChange={setHours}
            />
            <SliderRow
              label="Average hourly cost"
              value={rate}
              min={10}
              max={100}
              suffix="£ / hour"
              onChange={setRate}
            />
          </div>

          <div className="flex flex-col justify-center rounded-xl border border-primary-600/25 bg-gradient-to-br from-primary-600/10 to-accent-600/10 p-7 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              You could reclaim
            </p>
            <p className="mt-2 font-display text-5xl font-bold text-primary-400 tabular-nums">
              {hoursSavedMonthly}
              <span className="text-2xl"> hrs</span>
            </p>
            <p className="mt-1 text-sm text-text-secondary">every month</p>

            <div className="mx-auto mt-5 h-px w-24 bg-white/[0.1]" />

            <p className="mt-5 font-display text-3xl font-bold text-text-primary tabular-nums">
              {fmt(moneySavedMonthly)}
              <span className="text-base font-normal text-text-muted"> / month</span>
            </p>
            <p className="mt-1 text-sm text-text-secondary tabular-nums">
              That&apos;s {fmt(moneySavedYearly)} a year back in the business.
            </p>

            <div className="mt-7">
              <Button
                href="/contact"
                size="lg"
                icon={<ArrowRight size={18} />}
                analyticsEvent="cta_click"
                analyticsLabel="roi-calculator"
                className="w-full"
              >
                Claim These Hours Back
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
