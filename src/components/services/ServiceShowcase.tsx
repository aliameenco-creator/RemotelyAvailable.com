import {
  BadgeCheck,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Per-service showcase scenes: each service page gets a themed, animated
 * panel built from the real tools of that discipline. Server component,
 * CSS/SVG animation only.
 */

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "spot-card overflow-hidden rounded-[var(--radius-card)] border border-white/[0.08] bg-bg-card " +
        className
      }
    >
      {children}
    </div>
  );
}

function PanelHeader({ label, meta }: { label: string; meta?: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
      <span className="flex gap-1.5">
        {["bg-primary-400", "bg-accent-400", "bg-white/20"].map((c) => (
          <span key={c} className={`h-2 w-2 rounded-full ${c}`} />
        ))}
      </span>
      <span className="font-mono text-[10px] tracking-[0.12em] text-text-muted">
        {label}
      </span>
      {meta && (
        <span className="ml-auto font-mono text-[10px] text-success">{meta}</span>
      )}
    </div>
  );
}

function ToolBadge({ name, color }: { name: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs font-semibold"
      style={{
        color,
        borderColor: `${color}44`,
        background: `${color}14`,
      }}
    >
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {name}
    </span>
  );
}

/* ============================ WEB DEVELOPMENT ============================ */

const CODE_LINES: { indent: number; parts: [string, string][] }[] = [
  { indent: 0, parts: [["export default function ", "#c9b8f5"], ["Home", "#e38c35"], ["() {", "#8a857c"]] },
  { indent: 1, parts: [["return", "#c9b8f5"], [" (", "#8a857c"]] },
  { indent: 2, parts: [["<Hero", "#7fc8a9"], [" title=", "#c9b8f5"], ["'Built to convert'", "#e3b135"], [" />", "#7fc8a9"]] },
  { indent: 2, parts: [["<LeadForm", "#7fc8a9"], [" source=", "#c9b8f5"], ["'homepage'", "#e3b135"], [" />", "#7fc8a9"]] },
  { indent: 1, parts: [[");", "#8a857c"]] },
  { indent: 0, parts: [["}", "#8a857c"]] },
];

const DIALS = [
  { label: "Performance", score: 98 },
  { label: "SEO", score: 100 },
  { label: "Accessibility", score: 96 },
  { label: "Best Practices", score: 100 },
];

function ShowcaseWeb() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel>
        <PanelHeader label="src/app/page.tsx" meta="deploying..." />
        <div className="p-5 font-mono text-[12.5px] leading-[1.9]">
          {CODE_LINES.map((line, i) => (
            <div key={i} style={{ paddingLeft: line.indent * 18 }}>
              <span className="mr-4 select-none text-white/20">{i + 1}</span>
              {line.parts.map(([text, color], j) => (
                <span key={j} style={{ color }}>
                  {text}
                </span>
              ))}
            </div>
          ))}
          <span className="code-caret ml-9 inline-block h-4 w-[7px] bg-primary-400 align-middle" />
        </div>
      </Panel>

      <Panel>
        <PanelHeader label="lighthouse audit" meta="passed" />
        <div className="grid grid-cols-2 gap-6 p-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          {DIALS.map(({ label, score }, i) => {
            const r = 26;
            const circ = 2 * Math.PI * r;
            const off = circ * (1 - score / 100);
            return (
              <div key={label} className="flex flex-col items-center gap-2">
                <svg viewBox="0 0 64 64" className="h-16 w-16">
                  <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
                  <circle
                    cx="32"
                    cy="32"
                    r={r}
                    fill="none"
                    stroke="var(--ra-success)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    className="dial-fill"
                    style={
                      {
                        "--dial-circ": circ,
                        "--dial-off": off,
                        animationDelay: `${i * 0.2}s`,
                        transform: "rotate(-90deg)",
                        transformOrigin: "center",
                      } as React.CSSProperties
                    }
                  />
                  <text x="32" y="37" textAnchor="middle" fill="var(--ra-cream)" fontSize="14" fontWeight="700" fontFamily="var(--font-mono)">
                    {score}
                  </text>
                </svg>
                <span className="text-center font-mono text-[9.5px] uppercase tracking-[0.1em] text-text-muted">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2 border-t border-white/[0.06] p-4">
          <ToolBadge name="Next.js" color="#f5f1e8" />
          <ToolBadge name="React" color="#61DAFB" />
          <ToolBadge name="TypeScript" color="#3178C6" />
          <ToolBadge name="Tailwind" color="#38BDF8" />
          <ToolBadge name="Vercel" color="#f5f1e8" />
        </div>
      </Panel>
    </div>
  );
}

/* ============================ SOCIAL MEDIA ============================ */

const PLATFORMS = [
  { name: "Instagram", icon: Instagram, color: "#E4405F" },
  { name: "Facebook", icon: Facebook, color: "#1877F2" },
  { name: "TikTok", icon: null, color: "#FE2C55" },
  { name: "LinkedIn", icon: Linkedin, color: "#0A66C2" },
  { name: "YouTube", icon: Youtube, color: "#FF0000" },
  { name: "X", icon: Twitter, color: "#e7e9ea" },
];

function ShowcaseSocial() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
        {PLATFORMS.map(({ name, icon: Icon, color }, i) => (
          <div
            key={name}
            className="spot-card floaty flex flex-col items-center gap-2.5 rounded-xl border border-white/[0.08] bg-bg-card px-4 py-5 transition-transform duration-200 hover:scale-105"
            style={{ animationDelay: `${i * 0.6}s` }}
          >
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: `${color}1f`, color }}
            >
              {Icon ? (
                <Icon size={22} aria-hidden="true" />
              ) : (
                <span className="font-display text-lg font-bold italic">t</span>
              )}
            </span>
            <span className="text-sm font-semibold text-text-primary">{name}</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-success">
              ● managed
            </span>
          </div>
        ))}
      </div>

      <Panel>
        <PanelHeader label="this week's queue" meta="12 posts scheduled" />
        <div className="space-y-3 p-5">
          {[
            { day: "Mon 09:00", title: "Client win carousel", tone: "#E4405F", platform: "Instagram" },
            { day: "Tue 12:30", title: "Behind-the-scenes reel", tone: "#FE2C55", platform: "TikTok" },
            { day: "Wed 08:00", title: "Case study thread", tone: "#e7e9ea", platform: "X" },
            { day: "Thu 17:00", title: "Founder story post", tone: "#0A66C2", platform: "LinkedIn" },
          ].map((p, i) => (
            <div
              key={p.title}
              className="svc-skel flex items-center gap-3 rounded-lg border border-white/[0.06] bg-bg-base/60 px-4 py-3"
              style={{ animationDelay: `${i * 0.4}s`, animationDuration: "3.2s" }}
            >
              <span className="h-8 w-8 shrink-0 rounded-lg" style={{ background: `${p.tone}33` }} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-text-primary">{p.title}</p>
                <p className="font-mono text-[10px] text-text-muted">
                  {p.platform} · {p.day}
                </p>
              </div>
              <BadgeCheck size={16} className="shrink-0 text-success" aria-hidden="true" />
            </div>
          ))}
          <div className="flex items-center justify-between px-1 pt-1 font-mono text-[10.5px] text-text-muted">
            <span>
              <span className="svc-heart mr-1 inline-block text-primary-400">♥</span>
              engagement +64% this month
            </span>
            <span className="text-success">↗ reach 12.4k</span>
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* ============================ AI AUTOMATIONS ============================ */

const AUTOMATION_TOOLS = [
  { name: "n8n", color: "#EA4B71" },
  { name: "Make", color: "#B02DE9" },
  { name: "Zapier", color: "#FF4F00" },
  { name: "Custom Code", color: "#e38c35" },
];

const INTEGRATIONS = [
  "Gmail", "Slack", "Google Sheets", "WhatsApp", "Stripe", "HubSpot",
  "Notion", "Calendly", "Xero", "Airtable", "Shopify", "Twilio",
];

function ShowcaseAutomation() {
  const wires = [
    { d: "M120 70 C 180 70, 160 130, 230 130", delay: "0s" },
    { d: "M120 190 C 180 190, 160 130, 230 130", delay: "0.9s" },
    { d: "M370 130 C 430 130, 410 60, 470 60", delay: "0.4s" },
    { d: "M370 130 C 430 130, 410 130, 470 130", delay: "1.3s" },
    { d: "M370 130 C 430 130, 410 200, 470 200", delay: "0.7s" },
  ];
  const nodeBox = "fill-[var(--ra-ink)]";
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {AUTOMATION_TOOLS.map((t) => (
          <ToolBadge key={t.name} {...t} />
        ))}
      </div>

      <Panel>
        <PanelHeader label="lead-rescue.workflow" meta="● running" />
        <svg viewBox="0 0 590 260" className="block w-full" role="img" aria-label="Automation workflow connecting enquiries through n8n to Gmail, Google Sheets, and WhatsApp">
          {wires.map(({ d, delay }) => (
            <g key={d}>
              <path d={d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
              <path d={d} fill="none" stroke="var(--ra-copper)" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="5 7" className="wf-flow" />
              <circle r="3.5" fill="var(--ra-copper)">
                <animateMotion dur="2.6s" begin={delay} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          ))}
          {[
            { x: 20, y: 42, w: 100, label: "New enquiry", meta: "webhook" },
            { x: 20, y: 162, w: 100, label: "Missed call", meta: "twilio" },
          ].map((n) => (
            <g key={n.label} transform={`translate(${n.x} ${n.y})`}>
              <rect width={n.w} height={56} rx={12} className={nodeBox} stroke="rgba(255,255,255,0.1)" />
              <text x={n.w / 2} y={25} textAnchor="middle" fill="var(--ra-cream)" fontSize="12" fontWeight="600">{n.label}</text>
              <text x={n.w / 2} y={42} textAnchor="middle" fill="var(--ra-cream-40)" fontSize="9" fontFamily="var(--font-mono)">{n.meta}</text>
            </g>
          ))}
          <g transform="translate(230 96)">
            <rect width={140} height={68} rx={14} className={nodeBox} stroke="#EA4B71" strokeOpacity="0.6" strokeWidth="1.5" />
            <rect width={140} height={68} rx={14} fill="none" stroke="#EA4B71" strokeOpacity="0.35" className="hero-core-pulse" />
            <text x="70" y="30" textAnchor="middle" fill="#EA4B71" fontSize="16" fontWeight="800" fontFamily="var(--font-mono)">n8n</text>
            <text x="70" y="48" textAnchor="middle" fill="var(--ra-cream-40)" fontSize="9" fontFamily="var(--font-mono)">route · enrich · decide</text>
          </g>
          {[
            { y: 32, label: "Gmail", meta: "reply sent", color: "#EA4335" },
            { y: 102, label: "Google Sheets", meta: "lead logged", color: "#34A853" },
            { y: 172, label: "WhatsApp", meta: "you notified", color: "#25D366" },
          ].map((n) => (
            <g key={n.label} transform={`translate(470 ${n.y})`}>
              <rect width={104} height={56} rx={12} className={nodeBox} stroke="rgba(255,255,255,0.1)" />
              <circle cx={14} cy={16} r={4} fill={n.color} />
              <text x={26} y={20} fill="var(--ra-cream)" fontSize="11" fontWeight="600">{n.label}</text>
              <text x={14} y={42} fill="var(--ra-cream-40)" fontSize="9" fontFamily="var(--font-mono)">{n.meta} ✓</text>
            </g>
          ))}
        </svg>
      </Panel>

      <div className="overflow-hidden">
        <div className="svc-belt flex w-max gap-3">
          {[...INTEGRATIONS, ...INTEGRATIONS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap rounded-full border border-white/[0.08] bg-bg-card px-4 py-2 font-mono text-xs text-text-secondary"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
      <p className="text-center font-mono text-[11px] tracking-[0.08em] text-text-muted">
        + 400 more integrations. If it has an API, we can wire it in.
      </p>
    </div>
  );
}

/* ============================ SEO & CONTENT ============================ */

const KEYWORDS = ["near me", "best in town", "prices", "reviews", "emergency", "same day"];

function ShowcaseSeo() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <Panel>
        <PanelHeader label="google.co.uk results" meta="position 1" />
        <div className="space-y-2.5 p-5">
          <div className="serp-climb rounded-lg border border-primary-600/40 bg-primary-600/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-primary-400">1</span>
              <span className="text-sm font-semibold text-text-primary">yourbusiness.co.uk</span>
              <span className="svc-rise ml-auto font-mono text-[10px] text-success">▲ +4 this month</span>
            </div>
            <p className="mt-1 pl-5 font-mono text-[10px] text-text-muted">the result your customers click first</p>
          </div>
          {["competitor-one.com", "competitor-two.com", "bigdirectory.com"].map((c, i) => (
            <div key={c} className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-bg-base/60 px-4 py-3 opacity-70">
              <span className="font-mono text-xs text-text-muted">{i + 2}</span>
              <span className="text-sm text-text-secondary">{c}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.06] px-5 py-3">
          <svg viewBox="0 0 300 60" className="block h-12 w-full" aria-hidden="true">
            <path
              d="M0 52 C 40 50, 60 44, 90 40 C 130 34, 150 30, 190 22 C 230 14, 260 10, 300 4"
              fill="none"
              stroke="var(--ra-copper)"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="seo-draw"
            />
          </svg>
          <p className="mt-1 flex justify-between font-mono text-[10px] text-text-muted">
            <span>organic clicks, last 6 months</span>
            <span className="text-success">+312%</span>
          </p>
        </div>
      </Panel>

      <div className="flex flex-col gap-4">
        <Panel className="flex-1 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
            keywords we chase for you
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {KEYWORDS.map((k, i) => (
              <span
                key={k}
                className="svc-cell rounded-full border border-accent-600/30 bg-accent-600/10 px-3 py-1.5 font-mono text-xs text-accent-400"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {k}
              </span>
            ))}
          </div>
        </Panel>
        <Panel className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
            content engine output
          </p>
          <div className="mt-3 space-y-2">
            {["Local landing pages", "Weekly blog posts", "FAQ schema markup"].map((t, i) => (
              <div key={t} className="flex items-center gap-2 text-sm text-text-secondary">
                <BadgeCheck size={15} className="text-success" aria-hidden="true" />
                {t}
                <span className="ml-auto font-mono text-[9px] text-text-muted">
                  {["x75", "x4/mo", "auto"][i]}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ============================ DESIGN ============================ */

const SWATCHES = [
  { hex: "#e38c35", name: "copper" },
  { hex: "#6e77cb", name: "lavender" },
  { hex: "#f5f1e8", name: "cream" },
  { hex: "#7fc8a9", name: "sage" },
  { hex: "#1a1a1a", name: "ink" },
];

function ShowcaseDesign() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Panel>
        <PanelHeader label="palette.fig" />
        <div className="p-5">
          <div className="flex overflow-hidden rounded-xl border border-white/[0.08]">
            {SWATCHES.map((s, i) => (
              <span
                key={s.hex}
                className="svc-cell h-20 flex-1"
                style={{ background: s.hex, animationDelay: `${i * 0.35}s` }}
              />
            ))}
          </div>
          <div className="mt-3 flex justify-between font-mono text-[9px] text-text-muted">
            {SWATCHES.map((s) => (
              <span key={s.name}>{s.name}</span>
            ))}
          </div>
        </div>
      </Panel>

      <Panel>
        <PanelHeader label="type.spec" />
        <div className="flex h-full flex-col justify-center gap-3 p-6">
          <p className="font-display text-5xl font-bold italic text-text-primary">Aa</p>
          <p className="font-display text-lg text-text-secondary">Display serif for headlines</p>
          <p className="font-mono text-xs tracking-[0.08em] text-primary-400">MONO FOR THE DETAILS</p>
          <p className="text-sm text-text-muted">Body sans for effortless reading, tuned line by line.</p>
        </div>
      </Panel>

      <Panel>
        <PanelHeader label="marks.svg" meta="drawing" />
        <div className="flex h-full items-center justify-around p-6">
          <svg viewBox="0 0 48 48" className="h-14 w-14" aria-hidden="true">
            <circle cx="24" cy="24" r="18" fill="none" stroke="var(--ra-copper)" strokeWidth="2.5" className="design-draw" />
          </svg>
          <svg viewBox="0 0 48 48" className="h-14 w-14" aria-hidden="true">
            <rect x="8" y="8" width="32" height="32" rx="8" fill="none" stroke="var(--ra-lavender)" strokeWidth="2.5" className="design-draw" style={{ animationDelay: "0.6s" }} />
          </svg>
          <svg viewBox="0 0 48 48" className="h-14 w-14" aria-hidden="true">
            <path d="M24 8 L40 38 L8 38 Z" fill="none" stroke="var(--ra-cream-55)" strokeWidth="2.5" strokeLinejoin="round" className="design-draw" style={{ animationDelay: "1.2s" }} />
          </svg>
        </div>
        <p className="border-t border-white/[0.06] px-5 py-3 text-center font-mono text-[10px] text-text-muted">
          logos · brand systems · social kits · print
        </p>
      </Panel>
    </div>
  );
}

/* ============================ SHOPIFY ============================ */

const SHOPIFY_GREEN = "#95BF47";

function ShowcaseShopify() {
  const orders = [
    { id: "#1042", status: "fulfilled" },
    { id: "#1043", status: "label printed" },
    { id: "#1044", status: "tracking sent" },
    { id: "#1045", status: "fulfilled" },
    { id: "#1046", status: "review requested" },
  ];
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <Panel>
        <PanelHeader label="storefront" meta="● live" />
        <div className="p-5">
          <div className="rounded-xl border border-white/[0.08] bg-bg-base/60 p-4">
            <div className="svc-skel h-28 rounded-lg bg-gradient-to-br from-white/[0.06] to-white/[0.02]" />
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-text-primary">Best Seller</p>
                <p className="font-mono text-[10px] text-text-muted">restocked automatically</p>
              </div>
              <span className="font-display text-lg font-bold" style={{ color: SHOPIFY_GREEN }}>
                £49
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <ToolBadge name="Shopify" color={SHOPIFY_GREEN} />
            <ToolBadge name="Klaviyo" color="#8affa2" />
            <ToolBadge name="n8n" color="#EA4B71" />
          </div>
        </div>
      </Panel>

      <Panel>
        <PanelHeader label="orders.autopilot" meta="0 touched by hand" />
        <div className="space-y-2.5 p-5">
          {orders.map((o, i) => (
            <div
              key={o.id}
              className="svc-skel flex items-center gap-3 rounded-lg border border-white/[0.06] bg-bg-base/60 px-4 py-2.5"
              style={{ animationDelay: `${i * 0.35}s`, animationDuration: "3s" }}
            >
              <span className="font-mono text-xs text-text-secondary">{o.id}</span>
              <span className="h-1 flex-1 rounded bg-white/[0.05]" />
              <span className="font-mono text-[10px]" style={{ color: SHOPIFY_GREEN }}>
                {o.status} ✓
              </span>
            </div>
          ))}
          <div className="flex justify-between px-1 pt-2 font-mono text-[10.5px] text-text-muted">
            <span>orders fulfilled while you sleep</span>
            <span style={{ color: SHOPIFY_GREEN }}>38 tonight</span>
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* ============================ EXPORT ============================ */

const SHOWCASES: Record<string, { title: string; description: string; scene: () => React.ReactElement }> = {
  "web-development": {
    title: "Watch a Site Ship",
    description: "Modern stack, obsessive performance scores, and pages engineered to convert.",
    scene: ShowcaseWeb,
  },
  "social-media-management": {
    title: "Every Platform, One System",
    description: "Instagram, Facebook, TikTok, LinkedIn, YouTube and X, planned and posted for you.",
    scene: ShowcaseSocial,
  },
  "ai-automations": {
    title: "Built on the Best Automation Stack",
    description: "n8n, Make, Zapier, or fully custom code. We pick the right engine for your workflow, then wire it into everything you use.",
    scene: ShowcaseAutomation,
  },
  "seo-content": {
    title: "Watch the Rankings Move",
    description: "Local pages, content that compounds, and positions your competitors will notice.",
    scene: ShowcaseSeo,
  },
  design: {
    title: "Craft in Every Pixel",
    description: "Palettes, type systems, and brand marks built to earn trust at first glance.",
    scene: ShowcaseDesign,
  },
  "shopify-automation": {
    title: "Your Store, on Autopilot",
    description: "Orders, inventory, tracking, and post-purchase flows that run without you.",
    scene: ShowcaseShopify,
  },
};

export function ServiceShowcase({ serviceSlug }: { serviceSlug: string }) {
  const showcase = SHOWCASES[serviceSlug];
  if (!showcase) return null;
  const Scene = showcase.scene;

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          badge="See It Working"
          title={showcase.title}
          description={showcase.description}
        />
        <Scene />
      </Container>
    </section>
  );
}
