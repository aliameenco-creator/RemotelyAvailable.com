"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "@/components/ui/Button";
import { LineIcon, type LineIconName } from "./LineIcon";
import { Section, SectionHead, AccentTitle, Glow } from "./primitives";

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

function HeroVisual() {
  const rows = [
    { icon: "bolt" as LineIconName, label: "Automation", meta: "running", tone: "var(--ra-copper)" },
    { icon: "mic" as LineIconName, label: "Voice agent", meta: "24 calls today", tone: "var(--ra-lavender)" },
    { icon: "chat" as LineIconName, label: "Support bot", meta: "98% resolved", tone: "var(--ra-success)" },
  ];
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
          padding: "16px 18px",
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
      <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
        {rows.map((r) => (
          <div
            key={r.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 16px",
              borderRadius: 12,
              background: "var(--ra-ink)",
              border: "1px solid var(--ra-cream-08)",
            }}
          >
            <span
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--ra-surface-2)",
                color: r.tone,
                flex: "none",
              }}
            >
              <LineIcon name={r.icon} size={18} />
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ra-cream)" }}>{r.label}</div>
              <div style={{ fontFamily: mono, fontSize: 11, color: "var(--ra-cream-40)", marginTop: 2 }}>
                {r.meta}
              </div>
            </div>
            <LineIcon name="check" size={16} style={{ color: r.tone }} />
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "4px 4px 0",
            fontFamily: mono,
            fontSize: 11,
            color: "var(--ra-cream-40)",
          }}
        >
          <span>hours reclaimed</span>
          <span style={{ color: "var(--ra-copper)" }}>+42 / wk</span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div className="hero-grid" style={{ position: "absolute", inset: 0, top: -80 }} aria-hidden="true" />
      <Glow style={{ top: -260, left: "50%", transform: "translateX(-50%)" }} size={760} />
      <Glow color="lavender" style={{ top: 40, right: -160 }} size={420} />
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
              <p style={{ marginTop: 24, maxWidth: 480, fontSize: 17, lineHeight: 1.6, color: "var(--ra-cream-55)" }}>
                Automations, voice agents, chatbots, and intelligent websites — engineered to save your team{" "}
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
            <HeroVisual />
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

/* ====================== TOOLS GRID ====================== */
const TOOLS = ["ReplIt", "Grok AI", "DeepSeek", "Cursor AI", "Veo 3", "ChatGPT", "Gemini", "Claude", "Midjourney", "Copilot", "ElevenLabs", "Lovable", "Meta AI", "Adobe Firefly", "Perplexity", "n8n"];
export function ToolsGrid() {
  return (
    <Section>
      <SectionHead
        kicker="Our Expertise"
        title="Tools & Platforms We Master"
        lead="We leverage the most powerful AI tools to build solutions that deliver real results for your business."
      />
      <div className="tools-grid" style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 14 }}>
        {TOOLS.map((name) => (
          <div
            key={name}
            className="tool-tile"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              padding: "20px 8px",
              borderRadius: 14,
              background: "var(--ra-surface)",
              border: "1px solid var(--ra-cream-08)",
            }}
          >
            <span
              style={{
                width: 44,
                height: 44,
                borderRadius: 11,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--ra-ink)",
                border: "1px solid var(--ra-cream-08)",
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: 20,
                color: "var(--ra-copper)",
              }}
            >
              {name[0]}
            </span>
            <span style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: "0.04em", color: "var(--ra-cream-55)", textAlign: "center" }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ====================== SERVICES PREVIEW (bento) ====================== */
interface Svc {
  icon: LineIconName;
  name: string;
  desc: string;
  span: number;
  feature?: boolean;
  tag?: string;
}
const SERVICES: Svc[] = [
  { icon: "bolt", name: "AI Automations", desc: "Eliminate repetitive tasks and reclaim your team’s time — reliable, monitored workflows wired into the tools you already use.", span: 4, feature: true, tag: "Most deployed" },
  { icon: "globe", name: "AI Websites", desc: "Websites that think, adapt, and convert.", span: 2 },
  { icon: "mic", name: "AI Voice Agents", desc: "Human-quality voice that answers and books, 24/7.", span: 2 },
  { icon: "chat", name: "AI Chatbots", desc: "Support bots trained on your knowledge base that resolve instantly, escalate intelligently, and never sleep.", span: 4, feature: true, tag: "Always on" },
  { icon: "layers", name: "AI Content Systems", desc: "On-brand content pipelines that never sleep.", span: 3 },
  { icon: "cart", name: "Shopify Automation", desc: "Hands-off operations for high-volume stores.", span: 3 },
];

function ServiceCard({ s, i }: { s: Svc; i: number }) {
  const feature = s.feature;
  return (
    <div
      className="svc-card reveal-item"
      style={{
        gridColumn: `span ${s.span}`,
        transitionDelay: `${i * 90}ms`,
        background: "var(--ra-surface)",
        border: "1px solid var(--ra-cream-08)",
        borderRadius: "var(--radius-card)",
        padding: feature ? "var(--space-6, 32px)" : "var(--space-5, 24px)",
        display: "flex",
        flexDirection: feature ? "row" : "column",
        gap: feature ? 26 : 18,
        alignItems: feature ? "flex-start" : "stretch",
      }}
    >
      <span className="svc-accent" />
      <span className="svc-glow" />
      <span className="svc-num">{String(i + 1).padStart(2, "0")}</span>
      <span
        className="svc-icon"
        style={{
          width: feature ? 56 : 46,
          height: feature ? 56 : 46,
          flex: "none",
          borderRadius: 13,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--ra-copper-08)",
          border: "1px solid var(--ra-copper-25)",
          color: "var(--ra-copper)",
        }}
      >
        <LineIcon name={s.icon} size={feature ? 24 : 20} />
      </span>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <h3 style={{ fontFamily: serif, fontSize: feature ? 22 : 19, color: "var(--ra-cream)", margin: 0 }}>{s.name}</h3>
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
        <p style={{ marginTop: 8, color: "var(--ra-cream-55)", fontSize: feature ? 15.5 : 14.5, lineHeight: 1.6, maxWidth: feature ? 440 : "none" }}>
          {s.desc}
        </p>
        <a
          href="/services"
          style={{
            marginTop: feature ? 18 : "auto",
            paddingTop: feature ? 0 : 14,
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
        lead="From workflow automations to voice agents, we build AI systems that solve specific business problems — not generic demos."
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
  { n: "03", title: "Build & Integrate", desc: "We build your AI systems and wire them into the tools you already use — tested end to end." },
  { n: "04", title: "Launch & Optimize", desc: "We deploy, train your team, and tune for performance. Ongoing support keeps it sharp." },
];
export function Process() {
  return (
    <Section>
      <SectionHead
        kicker="How We Work"
        title="From Discovery to Delivery"
        lead="A proven process that turns your business challenges into working AI systems — no fluff, no delays."
      />
      <div style={{ maxWidth: 760, margin: "56px auto 0", position: "relative" }}>
        <div style={{ position: "absolute", left: 23, top: 10, bottom: 10, width: 2, background: "linear-gradient(var(--ra-copper-25), var(--ra-cream-08))" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {STEPS.map((s) => (
            <div key={s.n} style={{ display: "flex", gap: 24, position: "relative" }}>
              <span
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  flex: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--ra-base)",
                  border: "1px solid var(--ra-copper-25)",
                  fontFamily: mono,
                  fontSize: 14,
                  color: "var(--ra-copper)",
                  zIndex: 1,
                }}
              >
                {s.n}
              </span>
              <div style={{ paddingTop: 4 }}>
                <h3 style={{ fontFamily: serif, fontSize: 19, color: "var(--ra-cream)", margin: 0 }}>{s.title}</h3>
                <p style={{ marginTop: 8, color: "var(--ra-cream-55)", fontSize: 15, lineHeight: 1.65, maxWidth: 520 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ====================== TEAM ====================== */
const TEAM = [
  { img: "/team/team-1.png", pos: "center 22%" },
  { img: "/team/team-2.png", pos: "center 32%" },
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
          </div>
          <div ref={ref} className={"team-photos " + (shown ? "reveal-on" : "")} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {TEAM.map((m, i) => (
              <div key={i} className="team-card reveal-item" style={{ transitionDelay: `${i * 200}ms` }}>
                <div style={{ aspectRatio: "3 / 4", overflow: "hidden" }}>
                  <img src={m.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: m.pos, display: "block" }} />
                </div>
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "34px 16px 16px", background: "linear-gradient(transparent, rgba(20,20,20,0.94))" }}>
                  <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 16, color: "var(--ra-cream-40)" }}>Name coming soon</div>
                  <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: "0.1em", color: "var(--ra-copper)", marginTop: 4 }}>// role TBA</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ====================== TESTIMONIALS ====================== */
const QUOTES = [
  { quote: "RemotelyAvailable automated our entire lead qualification process. What used to take 3 team members now runs on autopilot. We booked 40% more demos in the first month.", name: "Sarah Chen", role: "Head of Operations, ScaleUp SaaS", initials: "SC" },
  { quote: "The AI voice agent they built handles 200+ calls a day without missing a beat. Our customers can’t tell it’s not a real person. It’s been a game-changer for our support team.", name: "Marcus Rivera", role: "CEO, HomeRise Services", initials: "MR" },
  { quote: "We went from publishing one blog post a month to five per week — all on-brand, all reviewed by our team. The content pipeline they built is the best investment we’ve made this year.", name: "Priya Patel", role: "Marketing Director, Apex Digital", initials: "PP" },
];
export function Testimonials() {
  return (
    <Section>
      <SectionHead
        kicker="Client Results"
        title={<>Trusted by Teams Who <AccentTitle>Ship</AccentTitle></>}
        lead="Real results from real businesses. Here’s what our clients say about working with us."
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
          Tell us about your business. We&rsquo;ll map out the AI opportunities and show you exactly what&rsquo;s possible — no fluff, no hard sell.
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
  { q: "What kind of businesses do you work with?", a: "We work with growth-stage companies, agencies, e-commerce brands, and service businesses — anyone with repetitive work that AI can take off their plate. If you have a process, we can probably automate it." },
  { q: "How long does a typical project take?", a: "Most automation builds ship in 2–4 weeks. Larger systems like custom voice agents or full content pipelines run 4–8 weeks. We scope timeline precisely before you commit." },
  { q: "Do you offer ongoing support after launch?", a: "Yes. Every build includes a support window, and we offer monthly retainers for optimization, monitoring, and new automations as your needs grow." },
  { q: "How much does it cost?", a: "Projects are fixed-scope and fixed-price, quoted after the discovery call. Most engagements start in the low five figures and pay for themselves in reclaimed hours within the first quarter." },
  { q: "What if I’m not sure which service I need?", a: "That’s what the free discovery call is for. We’ll look at your operations and recommend the highest-leverage place to start — even if that’s not the biggest project." },
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
        lead="Everything you need to know about working with us. Can’t find your answer? Book a call — we’re happy to help."
      />
      <div style={{ marginTop: 40 }}>
        {FAQS.map((f) => (
          <FaqItem key={f.q} {...f} />
        ))}
      </div>
    </Section>
  );
}
