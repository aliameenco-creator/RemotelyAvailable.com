interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

// Visual timeline for the delivery process: numbered nodes on a gradient
// spine with card-style content. Server component, CSS-only effects.
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="relative mx-auto max-w-3xl">
      {/* spine */}
      <div
        aria-hidden="true"
        className="absolute bottom-5 left-5 top-5 w-px bg-gradient-to-b from-primary-600 via-accent-500/60 to-primary-600/10"
      />
      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={step.step} className="group relative flex items-start gap-6">
            <div
              className={
                "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-bg-base transition-all duration-200 " +
                (i === steps.length - 1
                  ? "border-success/70"
                  : "border-primary-600") +
                " group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(227,140,53,0.35)]"
              }
            >
              <span
                className={
                  "text-sm font-bold " +
                  (i === steps.length - 1 ? "text-success" : "text-primary-400")
                }
              >
                {step.step}
              </span>
            </div>
            <div className="flex-1 rounded-xl border border-white/[0.06] bg-bg-card/60 p-5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-primary-600/30">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-lg font-bold text-text-primary">
                  {step.title}
                </h3>
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint sm:block">
                  step {String(step.step).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-text-secondary sm:text-base">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
