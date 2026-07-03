"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  ArrowRight,
  GraduationCap,
  Hammer,
  Map,
  PhoneCall,
  Rocket,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LineIcon, type LineIconName } from "./LineIcon";
import { Section, SectionHead, AccentTitle, Glow } from "./primitives";
import {
  ServiceVignette,
  type VignetteVariant,
} from "@/components/services/ServiceVignette";

/* ---------- hooks ---------- */
function useReveal(threshold = 0.18) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
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
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, shown] as const;
}

function useCountUp(target: number, run: boolean, dur = 1500) {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    if (!run) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, dur]);
  return n;
}

const mono = "var(--font-mono)";
const serif = "var(--font-display)";

/* ---------- rotating hero words ---------- */
const ROTATING_WORDS = [
  "growing agencies",
  "e-commerce brands",
  "clinics & practices",
  "estate agents",
  "local service businesses",
];

function RotatingWords() {
  const [index, setIndex] = React.useState(0);
  const [leaving, setLeaving] = React.useState(false);

  React.useEffect(() => {
    const id = setInterval(() => {
      setLeaving(true);
      const swap = setTimeout(() => {
        setIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setLeaving(false);
      }, 260);
      return () => clearTimeout(swap);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      style={{
        display: "inline-block",
        color: "var(--ra-copper)",
        transition: "transform 0.26s ease, opacity 0.26s ease",
        transform: leaving ? "translateY(0.55em)" : "translateY(0)",
        opacity: leaving ? 0 : 1,
        willChange: "transform, opacity",
      }}
    >
      {ROTATING_WORDS[index]}
    </span>
  );
}

/* ====================== HERO ====================== */
const HERO_TITLE_STYLE: React.CSSProperties = {
  fontFamily: serif,
  fontSize: "clamp(2.4rem, 4.6vw, 3.9rem)",
  letterSpacing: "-0.025em",
  lineHeight: 1.04,
  color: "var(--ra-cream)",
  textWrap: "balance",
  margin: 0,
};

/* Animated workflow canvas: inputs flow through the AI node to outcomes,
   with pulses travelling along the wires (SVG SMIL, no JS, no hydration). */

const WIRES = [
  { d: "M170 78 C 215 78, 155 228, 200 228", delay: "0s" },
  { d: "M170 374 C 215 374, 155 228, 200 228", delay: "1.1s" },
  { d: "M350 228 C 395 228, 335 64, 380 64", delay: "0.4s" },
  { d: "M350 228 C 362 228, 368 228, 380 228", delay: "1.5s" },
  { d: "M350 228 C 395 228, 335 392, 380 392", delay: "0.8s" },
];

function CanvasNode({
  x,
  y,
  w = 160,
  label,
  meta,
  icon,
  tone = "var(--ra-cream-55)",
  done,
}: {
  x: number;
  y: number;
  w?: number;
  label: string;
  meta: string;
  icon: React.ReactNode;
  tone?: string;
  done?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width={w}
        height={60}
        rx={13}
        fill="var(--ra-ink)"
        stroke="var(--ra-cream-08)"
      />
      <g transform="translate(13 13)" color={tone}>
        <rect width={34} height={34} rx={9} fill="var(--ra-surface-2)" />
        <g transform="translate(8 8)">{icon}</g>
      </g>
      <text x={58} y={27} fill="var(--ra-cream)" fontSize={13} fontWeight={600}>
        {label}
      </text>
      <text x={58} y={44} fill="var(--ra-cream-40)" fontSize={10} fontFamily="var(--font-mono)">
        {meta}
      </text>
      {done && (
        <g transform={`translate(${w - 20} 12)`}>
          <circle cx={4} cy={4} r={4} fill="var(--ra-success)" opacity={0.9} />
        </g>
      )}
    </g>
  );
}

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function HeroVisual() {
  return (
    <div
      className="floaty"
      style={{
        background: "var(--ra-surface)",
        border: "1px solid var(--border-copper)",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--glow-copper)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "14px 18px",
          borderBottom: "1px solid var(--ra-cream-08)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--ra-copper)" }} />
        <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.1em", color: "var(--ra-cream-55)" }}>
          // live workflow
        </span>
        <span style={{ marginLeft: "auto", fontFamily: mono, fontSize: 11, color: "var(--ra-success)" }}>
          ● active
        </span>
      </div>

      <svg
        viewBox="0 0 550 456"
        style={{ display: "block", width: "100%", height: "auto", padding: "6px 4px 0" }}
        role="img"
        aria-label="Live automation workflow: enquiries and calls flow through an AI agent into replies, CRM updates, and booked calls"
      >
        {/* wires + travelling pulses */}
        {WIRES.map(({ d, delay }) => (
          <g key={d}>
            <path
              d={d}
              fill="none"
              stroke="var(--ra-cream-08)"
              strokeWidth={2}
            />
            <path
              className="wf-flow"
              d={d}
              fill="none"
              stroke="var(--ra-copper)"
              strokeOpacity={0.45}
              strokeWidth={2}
              strokeDasharray="5 7"
            />
            <circle r={3.5} fill="var(--ra-copper)">
              <animateMotion dur="2.4s" begin={delay} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        ))}

        {/* inputs */}
        <CanvasNode
          x={10}
          y={48}
          label="New enquiry"
          meta="webhook · just now"
          tone="var(--ra-copper)"
          icon={
            <svg width={18} height={18} viewBox="0 0 24 24" {...iconProps}>
              <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          }
        />
        <CanvasNode
          x={10}
          y={344}
          label="Missed call"
          meta="voicemail captured"
          tone="var(--ra-lavender)"
          icon={
            <svg width={18} height={18} viewBox="0 0 24 24" {...iconProps}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          }
        />

        {/* AI core */}
        <g transform="translate(200 180)">
          <rect
            width={150}
            height={96}
            rx={16}
            fill="var(--ra-ink)"
            stroke="var(--ra-copper)"
            strokeOpacity={0.55}
            strokeWidth={1.5}
          />
          <rect
            className="hero-core-pulse"
            width={150}
            height={96}
            rx={16}
            fill="none"
            stroke="var(--ra-copper)"
            strokeOpacity={0.4}
          />
          <g transform="translate(57 16)" color="var(--ra-copper)">
            <svg width={36} height={36} viewBox="0 0 24 24" {...iconProps}>
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            </svg>
          </g>
          <text x={75} y={72} textAnchor="middle" fill="var(--ra-cream)" fontSize={14} fontWeight={700}>
            AI Agent
          </text>
          <text x={75} y={87} textAnchor="middle" fill="var(--ra-cream-40)" fontSize={9.5} fontFamily="var(--font-mono)">
            deciding next step...
          </text>
        </g>

        {/* outcomes */}
        <CanvasNode
          x={380}
          y={34}
          label="Reply sent"
          meta="in 12 seconds"
          tone="var(--ra-success)"
          done
          icon={
            <svg width={18} height={18} viewBox="0 0 24 24" {...iconProps}>
              <rect x={2} y={4} width={20} height={16} rx={2} />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          }
        />
        <CanvasNode
          x={380}
          y={198}
          label="CRM updated"
          meta="lead scored 92/100"
          tone="var(--ra-lavender)"
          done
          icon={
            <svg width={18} height={18} viewBox="0 0 24 24" {...iconProps}>
              <ellipse cx={12} cy={5} rx={9} ry={3} />
              <path d="M3 5v14a9 3 0 0 0 18 0V5" />
              <path d="M3 12a9 3 0 0 0 18 0" />
            </svg>
          }
        />
        <CanvasNode
          x={380}
          y={362}
          label="Call booked"
          meta="Tue 10:30 · calendar"
          tone="var(--ra-copper)"
          done
          icon={
            <svg width={18} height={18} viewBox="0 0 24 24" {...iconProps}>
              <rect x={3} y={4} width={18} height={18} rx={2} />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          }
        />
      </svg>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 18px 14px",
          fontFamily: mono,
          fontSize: 11,
          color: "var(--ra-cream-40)",
        }}
      >
        <span>hours reclaimed</span>
        <span style={{ color: "var(--ra-copper)" }}>+42 / wk</span>
      </div>
    </div>
  );
}

export function Hero() {
  const heroRef = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef(0);

  // Cursor parallax: the visual card tilts toward the pointer and the copper
  // glow drifts with it. rAF-throttled; inert on touch devices (no mousemove).
  const onMouseMove = React.useCallback((e: React.MouseEvent) => {
    const el = heroRef.current;
    if (!el) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width - 0.5;
      const py = (clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--tilt-x", `${(-py * 4).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(px * 5).toFixed(2)}deg`);
      el.style.setProperty("--drift-x", `${(px * 26).toFixed(1)}px`);
      el.style.setProperty("--drift-y", `${(py * 18).toFixed(1)}px`);
    });
  }, []);

  const onMouseLeave = React.useCallback(() => {
    const el = heroRef.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--drift-x", "0px");
    el.style.setProperty("--drift-y", "0px");
  }, []);

  return (
    <div
      ref={heroRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div className="hero-grid" style={{ position: "absolute", inset: 0, top: -80 }} aria-hidden="true" />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          transform: "translate(var(--drift-x, 0px), var(--drift-y, 0px))",
          transition: "transform 0.4s ease-out",
          pointerEvents: "none",
        }}
      >
        <Glow style={{ top: -260, left: "50%", transform: "translateX(-50%)" }} size={760} />
        <Glow color="lavender" style={{ top: 40, right: -160 }} size={420} />
      </div>
      <div style={{ position: "relative" }}>
        <Section style={{ paddingTop: 120, paddingBottom: "var(--space-9, 96px)" }}>
          <div
            className="hero-split"
            style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 56, alignItems: "center" }}
          >
            <div style={{ textAlign: "left" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 24,
                  padding: "5px 13px",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--ra-copper-08)",
                  border: "1px solid var(--ra-copper-25)",
                  fontFamily: mono,
                  fontSize: 11.5,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ra-copper)",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ra-copper)" }} />
                AI Automation Agency
              </span>
              <h1 style={HERO_TITLE_STYLE}>
                We Build <span style={{ color: "var(--ra-copper)" }}>AI</span>{" "}
                <AccentTitle>Systems</AccentTitle>
                <br />
                That Actually Work
              </h1>
              <p
                style={{
                  marginTop: 14,
                  fontFamily: serif,
                  fontSize: "clamp(1.15rem, 2vw, 1.5rem)",
                  letterSpacing: "-0.01em",
                  color: "var(--ra-cream-55)",
                  height: "1.5em",
                  overflow: "hidden",
                }}
              >
                for <RotatingWords />
              </p>
              <p style={{ marginTop: 24, maxWidth: 480, fontSize: 17, lineHeight: 1.6, color: "var(--ra-cream-55)" }}>
                Automations, voice agents, chatbots, and intelligent websites, engineered to save your team{" "}
                <strong style={{ color: "var(--ra-cream)", fontWeight: 600 }}>40+ hours a week</strong> and drive real
                business results.
              </p>
              <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
                <Button href="/contact" size="lg" icon={<LineIcon name="arrow" size={16} />}>
                  Talk to Us
                </Button>
                <Button href="/services" size="lg" variant="secondary">
                  See Our Services
                </Button>
              </div>
              <p style={{ marginTop: 20, fontFamily: mono, fontSize: 12.5, letterSpacing: "0.04em", color: "var(--ra-cream-40)" }}>
                No commitment. 30-minute call. Real strategy.
              </p>
            </div>
            <div
              style={{
                perspective: 900,
                transformStyle: "preserve-3d",
              }}
            >
              <div
                style={{
                  transform:
                    "rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
                  transition: "transform 0.35s ease-out",
                  willChange: "transform",
                }}
              >
                <HeroVisual />
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

/* ====================== STAT BAR ====================== */
export function StatBar() {
  const stats = [
    { value: "500+", label: "Workflows Automated" },
    { value: "40+", label: "Hours Saved / Client Weekly" },
    { value: "95%", label: "Client Retention Rate" },
    { value: "<48hr", label: "Average Response Time" },
  ];
  return (
    <div style={{ borderTop: "1px solid var(--ra-cream-08)", borderBottom: "1px solid var(--ra-cream-08)", background: "var(--ra-ink)" }}>
      <div
        className="stat-bar-grid"
        style={{ maxWidth: 1100, margin: "0 auto", padding: "44px 32px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}
      >
        {stats.map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: serif, fontSize: "clamp(2rem, 4vw, 2.8rem)", lineHeight: 1, color: "var(--ra-copper)", letterSpacing: "-0.02em" }}>
              {s.value}
            </div>
            <div style={{ marginTop: 10, fontFamily: mono, fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ra-cream-55)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ====================== TOOLS MARQUEE ====================== */
const TOOLS_ROW_A = [
  { name: "ChatGPT", file: "chatgpt.png" },
  { name: "Gemini", file: "gemini.png" },
  { name: "Grok AI", file: "grokai.png" },
  { name: "DeepSeek", file: "deepseek.png" },
  { name: "Cursor AI", file: "cursorai.png" },
  { name: "ReplIt", file: "replit.png" },
  { name: "Veo 3", file: "veo3.png" },
];
const TOOLS_ROW_B = [
  { name: "Copilot", file: "copilot.png" },
  { name: "ElevenLabs", file: "elevenlabs.png" },
  { name: "Lovable", file: "lovable.png" },
  { name: "Meta AI", file: "metaai.png" },
  { name: "Adobe Firefly", file: "firefly.png" },
  { name: "Perplexity", file: "perplexity.png" },
  { name: "Leonardo AI", file: "leonardoai.png" },
];

function ToolTile({ name, file }: { name: string; file: string }) {
  return (
    <div
      className="tool-tile"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 22px",
        borderRadius: 14,
        background: "var(--ra-surface)",
        border: "1px solid var(--ra-cream-08)",
        whiteSpace: "nowrap",
        flex: "none",
      }}
    >
      <img
        src={`/logos/${file}`}
        alt={`${name} logo`}
        loading="lazy"
        style={{ width: 30, height: 30, objectFit: "contain", flex: "none" }}
      />
      <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.04em", color: "var(--ra-cream-55)" }}>
        {name}
      </span>
    </div>
  );
}

function ToolsRow({
  tools,
  direction,
}: {
  tools: { name: string; file: string }[];
  direction: "left" | "right";
}) {
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div
        className={direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}
        style={{ display: "flex", gap: 14, width: "max-content" }}
      >
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} style={{ display: "flex", gap: 14 }} aria-hidden={copy > 0}>
            {tools.map((t) => (
              <ToolTile key={t.name} {...t} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ToolsGrid() {
  return (
    <Section>
      <SectionHead
        kicker="Our Expertise"
        title="Tools & Platforms We Master"
        lead="We leverage the most powerful AI tools to build solutions that deliver real results for your business."
      />
      <div className="tools-marquee" style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 14, position: "relative" }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            background:
              "linear-gradient(90deg, var(--ra-base) 0%, transparent 8%, transparent 92%, var(--ra-base) 100%)",
          }}
        />
        <ToolsRow tools={TOOLS_ROW_A} direction="left" />
        <ToolsRow tools={TOOLS_ROW_B} direction="right" />
      </div>
    </Section>
  );
}

/* ====================== SERVICES PREVIEW (bento) ====================== */

const SERVICE_VIGNETTE_VARIANTS: Record<string, VignetteVariant> = {
  "AI Automations": "automation",
  "AI Websites": "website",
  "AI Voice Agents": "voice",
  "AI Chatbots": "chatbot",
  "AI Content Systems": "content",
  "Shopify Automation": "shopify",
};

interface Svc {
  icon: LineIconName;
  name: string;
  desc: string;
  span: number;
  feature?: boolean;
  tag?: string;
}
const SERVICES: Svc[] = [
  { icon: "bolt", name: "AI Automations", desc: "Reliable, monitored workflows wired into the tools you already use.", span: 2, tag: "Most deployed" },
  { icon: "globe", name: "AI Websites", desc: "Websites that think, adapt, and convert.", span: 2 },
  { icon: "mic", name: "AI Voice Agents", desc: "Human-quality voice that answers and books, 24/7.", span: 2 },
  { icon: "chat", name: "AI Chatbots", desc: "Bots trained on your knowledge base that resolve instantly and never sleep.", span: 2, tag: "Always on" },
  { icon: "layers", name: "AI Content Systems", desc: "On-brand content pipelines that never sleep.", span: 2 },
  { icon: "cart", name: "Shopify Automation", desc: "Hands-off operations for high-volume stores.", span: 2 },
];

function ServiceEmblem({ icon }: { icon: LineIconName }) {
  return (
    <span
      className="svc-icon"
      style={{
        position: "relative",
        width: 52,
        height: 52,
        flex: "none",
        borderRadius: 15,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, var(--ra-copper-08), rgba(110,119,203,0.12))",
        border: "1px solid var(--ra-copper-25)",
        color: "var(--ra-copper)",
      }}
    >
      <LineIcon name={icon} size={22} />
      {/* orbiting spark */}
      <span className="svc-orbit" aria-hidden="true">
        <span
          style={{
            position: "absolute",
            top: -2.5,
            left: "50%",
            marginLeft: -2.5,
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "var(--ra-copper)",
            boxShadow: "0 0 8px var(--ra-copper)",
          }}
        />
      </span>
    </span>
  );
}

function ServiceCard({ s, i }: { s: Svc; i: number }) {
  const variant = SERVICE_VIGNETTE_VARIANTS[s.name];
  return (
    <div
      className="svc-card spot-card reveal-item"
      style={{
        gridColumn: `span ${s.span}`,
        transitionDelay: `${i * 90}ms`,
        background: "var(--ra-surface)",
        border: "1px solid var(--ra-cream-08)",
        borderRadius: "var(--radius-card)",
        padding: "var(--space-5, 24px)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <span className="svc-accent" />
      <span className="svc-glow" />
      <span className="svc-num">{String(i + 1).padStart(2, "0")}</span>
      <ServiceEmblem icon={s.icon} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <h3 style={{ fontFamily: serif, fontSize: 19, color: "var(--ra-cream)", margin: 0 }}>{s.name}</h3>
          {s.tag ? (
            <span
              style={{
                padding: "3px 10px",
                borderRadius: "var(--radius-pill)",
                background: "rgba(110,119,203,0.12)",
                border: "1px solid rgba(110,119,203,0.3)",
                fontFamily: mono,
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ra-lavender-bright)",
              }}
            >
              {s.tag}
            </span>
          ) : null}
        </div>
        <p style={{ marginTop: 8, color: "var(--ra-cream-55)", fontSize: 14.5, lineHeight: 1.6, minHeight: 46 }}>
          {s.desc}
        </p>
        {variant ? (
          <div
            style={{
              marginTop: 14,
              height: 108,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <ServiceVignette variant={variant} />
          </div>
        ) : null}
        <a
          href="/services"
          style={{
            marginTop: "auto",
            paddingTop: 16,
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontFamily: mono,
            fontSize: 12.5,
            color: "var(--ra-copper)",
            letterSpacing: "0.04em",
          }}
        >
          Learn more{" "}
          <span className="svc-arrow" style={{ display: "inline-flex" }}>
            <LineIcon name="arrow" size={13} />
          </span>
        </a>
      </div>
    </div>
  );
}

export function ServicesPreview() {
  const [ref, shown] = useReveal();
  return (
    <Section>
      <SectionHead
        kicker="What We Do"
        title={<>AI Solutions Built for <AccentTitle>Real Impact</AccentTitle></>}
        lead="From workflow automations to voice agents, we build AI systems that solve specific business problems, not generic demos."
      />
      <div
        ref={ref}
        className={"svc-bento " + (shown ? "reveal-on" : "")}
        style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 18 }}
      >
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.name} s={s} i={i} />
        ))}
      </div>
    </Section>
  );
}

/* ====================== PROCESS ====================== */
const STEPS = [
  { n: "01", title: "Discovery Call", desc: "We learn about your business, your pain points, and your goals. Free, no-commitment, 30 minutes." },
  { n: "02", title: "Strategy & Scope", desc: "We map the solution, define deliverables, timeline, and pricing. You approve before anything starts." },
  { n: "03", title: "Build & Integrate", desc: "We build your AI systems and wire them into the tools you already use, tested end to end." },
  { n: "04", title: "Launch & Optimize", desc: "We deploy, train your team, and tune for performance. Ongoing support keeps it sharp." },
];
const STEP_META = [
  { icon: PhoneCall, when: "day 1 · 30 min", tone: "var(--ra-copper)" },
  { icon: Map, when: "within 48 hrs", tone: "var(--ra-lavender)" },
  { icon: Hammer, when: "weeks 1-4", tone: "var(--ra-copper)" },
  { icon: Rocket, when: "launch + ongoing", tone: "var(--ra-success)" },
];

export function Process() {
  const [ref, shown] = useReveal();
  return (
    <Section>
      <SectionHead
        kicker="How We Work"
        title="From Discovery to Delivery"
        lead="A proven process that turns your business challenges into working AI systems, no fluff, no delays."
      />
      <div
        ref={ref}
        className={shown ? "reveal-on" : ""}
        style={{ marginTop: 56, position: "relative" }}
      >
        {/* animated connector behind the medallions (desktop) */}
        <svg
          viewBox="0 0 1000 4"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="process-wire"
          style={{
            position: "absolute",
            top: 51,
            left: "11%",
            right: "11%",
            width: "78%",
            height: 4,
            zIndex: 0,
          }}
        >
          <line
            x1="0"
            y1="2"
            x2="1000"
            y2="2"
            stroke="var(--ra-copper)"
            strokeOpacity={0.35}
            strokeWidth={2}
            strokeDasharray="6 8"
            className="wf-flow"
          />
        </svg>

        <div className="grid gap-5 lg:grid-cols-4" style={{ position: "relative", zIndex: 1 }}>
          {STEPS.map((s, i) => {
            const meta = STEP_META[i];
            const Icon = meta.icon;
            return (
              <div
                key={s.n}
                className="reveal-item group rounded-xl border border-white/[0.08] bg-bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-600/40 hover:shadow-[var(--glow-copper)]"
                style={{ transitionDelay: `${i * 110}ms` }}
              >
                <div style={{ position: "relative", display: "inline-flex" }}>
                  <span
                    className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--ra-base)",
                      border: "1.5px solid var(--ra-copper-25)",
                      color: meta.tone,
                    }}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -10,
                      padding: "2px 7px",
                      borderRadius: "var(--radius-pill)",
                      background: "var(--ra-copper)",
                      color: "#1a1a1a",
                      fontFamily: mono,
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  >
                    {s.n}
                  </span>
                </div>
                <h3 style={{ fontFamily: serif, fontSize: 19, color: "var(--ra-cream)", margin: "16px 0 0" }}>
                  {s.title}
                </h3>
                <p
                  style={{
                    margin: "6px 0 0",
                    fontFamily: mono,
                    fontSize: 10.5,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--ra-copper)",
                  }}
                >
                  {meta.when}
                </p>
                <p style={{ marginTop: 10, color: "var(--ra-cream-55)", fontSize: 14, lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div
          className="reveal-item"
          style={{
            marginTop: 36,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            transitionDelay: "480ms",
          }}
        >
          <span style={{ fontFamily: mono, fontSize: 12.5, color: "var(--ra-cream-55)", letterSpacing: "0.04em" }}>
            Step 01 costs nothing.
          </span>
          <Button
            href="/contact"
            analyticsEvent="cta_click"
            analyticsLabel="process-step-01"
            icon={<ArrowRight size={16} />}
          >
            Book Your Free Call
          </Button>
        </div>
      </div>
    </Section>
  );
}

/* ====================== TEAM ====================== */
const TEAM = [
  // TEAM[0] is the founder (featured card)
  { img: "/team/team-2.jpg", pos: "center 32%" },
  { img: "/team/team-1.jpg", pos: "center 22%" },
  { img: "/team/team-3.jpg", pos: "center 18%" },
];
export function Team() {
  const [ref, shown] = useReveal(0.25);
  const years = useCountUp(104, shown);
  return (
    <div style={{ position: "relative", overflow: "hidden", background: "var(--ra-ink)", borderTop: "1px solid var(--ra-cream-08)", borderBottom: "1px solid var(--ra-cream-08)" }}>
      <Glow color="lavender" style={{ top: -170, right: -120 }} size={440} />
      <Section style={{ position: "relative" }}>
        <div className="team-wrap" style={{ display: "grid", gridTemplateColumns: "0.82fr 1.18fr", gap: 56, alignItems: "center" }}>
          <div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 18,
                padding: "5px 13px",
                borderRadius: "var(--radius-pill)",
                background: "var(--ra-copper-08)",
                border: "1px solid var(--ra-copper-25)",
                fontFamily: mono,
                fontSize: 11.5,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ra-copper)",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ra-copper)" }} />
              Our Team
            </span>
            <div style={{ fontFamily: serif, fontSize: "clamp(3.4rem, 8vw, 5.4rem)", color: "var(--ra-copper)", lineHeight: 0.95, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
              {years}
            </div>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(1.9rem, 3.6vw, 2.25rem)", letterSpacing: "-0.02em", textWrap: "balance", marginTop: 6, color: "var(--ra-cream)" }}>
              years of experience, <AccentTitle>combined</AccentTitle>
            </h2>
            <p style={{ marginTop: 18, color: "var(--ra-cream-55)", fontSize: 16.5, lineHeight: 1.7, maxWidth: 420 }}>
              A senior team of automation engineers, strategists, and builders who&rsquo;ve shipped AI systems across dozens of industries. The experience shows in everything we deliver.
            </p>
            <a
              href="/team"
              style={{
                marginTop: 20,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: mono,
                fontSize: 13,
                letterSpacing: "0.04em",
                color: "var(--ra-copper)",
              }}
              data-analytics-event="cta_click"
              data-analytics-label="home-meet-team"
            >
              Meet the full team <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
          <div ref={ref} className={"team-showcase " + (shown ? "reveal-on" : "")} style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 18 }}>
            {/* Featured: founder profile */}
            <div className="team-card reveal-item" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", aspectRatio: "4 / 4.4", overflow: "hidden" }}>
                <img
                  src={TEAM[0].img}
                  alt="Ali Ameen, founder of RemotelyAvailable"
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: TEAM[0].pos, display: "block" }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 11px",
                    borderRadius: "var(--radius-pill)",
                    background: "rgba(20,20,20,0.75)",
                    border: "1px solid var(--ra-copper-25)",
                    backdropFilter: "blur(6px)",
                    fontFamily: mono,
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--ra-copper)",
                  }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--ra-copper)" }} />
                  Founder
                </span>
              </div>
              <div style={{ padding: "16px 18px 18px", borderTop: "1px solid var(--ra-cream-08)", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <div>
                  <a href="/team/ali-ameen" style={{ fontFamily: serif, fontSize: 22, color: "var(--ra-cream)", textDecoration: "none" }}>
                    Ali Ameen
                  </a>
                  <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.09em", color: "var(--ra-copper)", marginTop: 4 }}>
                    // AI Specialist · Business Strategist
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "var(--ra-cream-55)" }}>
                  The educator behind <strong style={{ color: "var(--ra-cream)", fontWeight: 600 }}>Agentic Ali</strong>, teaching
                  50,000+ students how to put AI to work in real businesses.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "auto" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 12px",
                      borderRadius: "var(--radius-pill)",
                      background: "var(--ra-copper-08)",
                      border: "1px solid var(--ra-copper-25)",
                      fontFamily: mono,
                      fontSize: 11,
                      color: "var(--ra-copper)",
                    }}
                  >
                    <GraduationCap size={13} aria-hidden="true" />
                    50k+ students taught
                  </span>
                  <a
                    href="https://youtube.com/@agenticali"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-analytics-event="youtube_click"
                    data-analytics-label="team-profile"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 12px",
                      borderRadius: "var(--radius-pill)",
                      background: "rgba(255,0,0,0.12)",
                      border: "1px solid rgba(255,80,80,0.35)",
                      fontFamily: mono,
                      fontSize: 11,
                      color: "#ff8080",
                      textDecoration: "none",
                      transition: "transform 0.15s ease, background 0.2s ease",
                    }}
                  >
                    <Youtube size={13} aria-hidden="true" />
                    @agenticali
                  </a>
                </div>
              </div>
            </div>

            {/* Rest of the team */}
            <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 18 }}>
              {TEAM.slice(1).map((m, i) => (
                <div key={m.img} className="team-card reveal-item" style={{ transitionDelay: `${(i + 1) * 200}ms` }}>
                  <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                    <img src={m.img} alt="" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: m.pos, display: "block" }} />
                  </div>
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "34px 16px 14px", background: "linear-gradient(transparent, rgba(20,20,20,0.94))" }}>
                    <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 15, color: "var(--ra-cream-40)" }}>Name coming soon</div>
                    <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.1em", color: "var(--ra-copper)", marginTop: 3 }}>// role TBA</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ====================== TESTIMONIALS ====================== */
const QUOTES = [
  { quote: "RemotelyAvailable automated our entire lead qualification process. What used to take 3 team members now runs on autopilot. We booked 40% more demos in the first month.", name: "Sarah Chen", role: "Head of Operations, ScaleUp SaaS", initials: "SC" },
  { quote: "The AI voice agent they built handles 200+ calls a day without missing a beat. Our customers can't tell it's not a real person. It's been a game-changer for our support team.", name: "Marcus Rivera", role: "CEO, HomeRise Services", initials: "MR" },
  { quote: "We went from publishing one blog post a month to five per week, all on-brand, all reviewed by our team. The content pipeline they built is the best investment we've made this year.", name: "Priya Patel", role: "Marketing Director, Apex Digital", initials: "PP" },
];
export function Testimonials() {
  return (
    <Section>
      <SectionHead
        kicker="Client Results"
        title={<>Trusted by Teams Who <AccentTitle>Ship</AccentTitle></>}
        lead="Real results from real businesses. Here's what our clients say about working with us."
      />
      <div className="three-col" style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
        {QUOTES.map((q) => (
          <div
            key={q.name}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              background: "var(--ra-surface)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-card)",
              padding: "var(--space-5, 24px)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <span style={{ color: "var(--ra-copper)" }}>
              <LineIcon name="quote" size={22} />
            </span>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ra-cream-70)", flex: 1 }}>{q.quote}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 4, borderTop: "1px solid var(--ra-cream-08)" }}>
              <span
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  flex: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--ra-lavender)",
                  color: "var(--ra-cream)",
                  fontFamily: mono,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {q.initials}
              </span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ra-cream)" }}>{q.name}</div>
                <div style={{ fontSize: 12.5, color: "var(--ra-cream-40)" }}>{q.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ====================== CTA BAND ====================== */
export function CtaBand() {
  return (
    <div style={{ position: "relative", overflow: "hidden", borderTop: "1px solid var(--ra-cream-08)", borderBottom: "1px solid var(--ra-cream-08)" }}>
      <Section style={{ position: "relative", textAlign: "center" }}>
        <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em", maxWidth: 640, margin: "0 auto", textWrap: "balance", color: "var(--ra-cream)" }}>
          Ready to Put <AccentTitle>AI to Work</AccentTitle> for Your Business?
        </h2>
        <p style={{ margin: "20px auto 0", maxWidth: 520, fontSize: 17, lineHeight: 1.6, color: "var(--ra-cream-55)" }}>
          Tell us about your business. We&rsquo;ll map out the AI opportunities and show you exactly what&rsquo;s possible, no fluff, no hard sell.
        </p>
        <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
          <Button href="/contact" size="lg" icon={<LineIcon name="arrow" size={16} />}>
            Talk to Us
          </Button>
        </div>
        <p style={{ marginTop: 18, fontFamily: mono, fontSize: 12.5, color: "var(--ra-cream-40)" }}>
          No commitment. No hard sell. Just real strategy.
        </p>
      </Section>
    </div>
  );
}

/* ====================== FAQ ====================== */
const FAQS = [
  { q: "What kind of businesses do you work with?", a: "We work with growth-stage companies, agencies, e-commerce brands, and service businesses, anyone with repetitive work that AI can take off their plate. If you have a process, we can probably automate it." },
  { q: "How long does a typical project take?", a: "Most automation builds ship in 2-4 weeks. Larger systems like custom voice agents or full content pipelines run 4-8 weeks. We scope timeline precisely before you commit." },
  { q: "Do you offer ongoing support after launch?", a: "Yes. Every build includes a support window, and we offer monthly retainers for optimization, monitoring, and new automations as your needs grow." },
  { q: "How much does it cost?", a: "Projects are fixed-scope and fixed-price, quoted after the discovery call. Most engagements start in the low five figures and pay for themselves in reclaimed hours within the first quarter." },
  { q: "What if I'm not sure which service I need?", a: "That's what the free discovery call is for. We'll look at your operations and recommend the highest-leverage place to start, even if that's not the biggest project." },
  { q: "Is my data safe?", a: "Absolutely. We follow least-privilege access, encrypt data in transit and at rest, and can work entirely within your own cloud and tooling. You own everything we build." },
];
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--ra-cream-08)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "22px 4px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 600, color: "var(--ra-cream)" }}>{q}</span>
        <span style={{ flex: "none", color: "var(--ra-copper)", transition: "transform var(--dur-base)", transform: open ? "rotate(45deg)" : "none" }}>
          <LineIcon name="plus" size={18} />
        </span>
      </button>
      <div style={{ maxHeight: open ? 240 : 0, overflow: "hidden", transition: "max-height 360ms var(--ease-standard)" }}>
        <p style={{ padding: "0 4px 24px", color: "var(--ra-cream-55)", fontSize: 15, lineHeight: 1.7, maxWidth: 780 }}>{a}</p>
      </div>
    </div>
  );
}
export function Faq() {
  return (
    <Section maxWidth={860}>
      <SectionHead
        kicker="FAQ"
        title="Frequently Asked Questions"
        lead="Everything you need to know about working with us. Can't find your answer? Book a call, we're happy to help."
      />
      <div style={{ marginTop: 40 }}>
        {FAQS.map((f) => (
          <FaqItem key={f.q} {...f} />
        ))}
      </div>
    </Section>
  );
}
