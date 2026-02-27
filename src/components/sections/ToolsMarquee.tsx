"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const row1 = [
  { name: "Replit", src: "/images/tools/replit.webp" },
  { name: "Grok AI", src: "/images/tools/grokai.webp" },
  { name: "DeepSeek", src: "/images/tools/deepseek.webp" },
  { name: "Cursor AI", src: "/images/tools/cursorai.webp" },
  { name: "Veo 3", src: "/images/tools/veo3.webp" },
  { name: "ChatGPT", src: "/images/tools/chatgpt.webp" },
  { name: "Gemini", src: "/images/tools/gemini.webp" },
];

const row2 = [
  { name: "Leonardo AI", src: "/images/tools/leonardoai.webp" },
  { name: "Copilot", src: "/images/tools/copilot.webp" },
  { name: "ElevenLabs", src: "/images/tools/elevenlabs.webp" },
  { name: "Lovable", src: "/images/tools/lovable.webp" },
  { name: "Meta AI", src: "/images/tools/metaai.webp" },
  { name: "Adobe Firefly", src: "/images/tools/firefly.webp" },
  { name: "Perplexity", src: "/images/tools/perplexity.webp" },
];

function ToolCard({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex flex-col items-center gap-3 shrink-0" style={{ width: "120px" }}>
      <div className="glass flex h-20 w-20 sm:h-[88px] sm:w-[88px] items-center justify-center rounded-2xl p-4 transition-all duration-300 hover:bg-white/[0.07] hover:border-white/[0.14] hover:scale-105">
        <Image
          src={src}
          alt={name}
          width={56}
          height={56}
          loading="lazy"
          className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
        />
      </div>
      <span className="text-xs text-text-muted font-medium whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

function MarqueeRow({
  tools,
  direction,
}: {
  tools: typeof row1;
  direction: "left" | "right";
}) {
  // Repeat 2x for continuous scroll effect
  const items = [...tools, ...tools];

  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-24 bg-gradient-to-r from-bg-base to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-24 bg-gradient-to-l from-bg-base to-transparent" />

      <div
        className={
          direction === "left"
            ? "animate-marquee-left flex gap-6 sm:gap-8 w-max"
            : "animate-marquee-right flex gap-6 sm:gap-8 w-max"
        }
      >
        {items.map((tool, i) => (
          <ToolCard key={`${tool.name}-${i}`} name={tool.name} src={tool.src} />
        ))}
      </div>
    </div>
  );
}

export function ToolsMarquee() {
  return (
    <section className="py-20 overflow-hidden">
      <Container>
        <ScrollReveal>
          <SectionHeading
            badge="Our Expertise"
            title="Tools & Platforms We Master"
            description="We leverage the most powerful AI tools to build solutions that deliver real results for your business."
          />
        </ScrollReveal>
      </Container>

      <div className="mt-8 space-y-8">
        <MarqueeRow tools={row1} direction="left" />
        <MarqueeRow tools={row2} direction="right" />
      </div>
    </section>
  );
}
