import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SystemCard } from "@/components/systems/SystemCard";
import { systems } from "@/data/systems";

export const metadata: Metadata = {
  title: "AI Automation Systems",
  description:
    "Explore production-ready AI systems designed to automate real business workflows.",
};

export default function SystemsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.06] pt-28 pb-8 sm:pt-32 sm:pb-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(43,89,232,0.14),transparent_48%)]" />
        <Container className="relative">
          <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            AI Automation Systems
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
            Premium AI assets for high-growth brands. Deploy production-ready
            automation workflows instantly into your ecosystem.
          </p>
        </Container>
      </section>

      <section className="py-6 sm:py-7">
        <Container>
          <div className="grid min-w-0 grid-cols-1 gap-6">
            {systems.map((system) => (
              <div key={system.slug} className="min-w-0">
                <SystemCard system={system} />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
