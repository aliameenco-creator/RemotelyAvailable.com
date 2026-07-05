import {
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Lock,
  MessageCircle,
  Search,
  Send,
  Youtube,
} from "lucide-react";

/**
 * Large, literal hero scenes for each service page. Where the vignette is a
 * small abstract hint, these are instantly readable: a browser building a
 * site, a phone with a post going out, a live n8n workflow, a Google result,
 * a design artboard, a Shopify order feed. Server component, CSS/SVG only.
 */

function Frame({
  header,
  meta,
  children,
}: {
  header: string;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-copper)] bg-bg-card shadow-[var(--glow-copper)]">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
        <span className="flex gap-1.5">
          {["bg-primary-400", "bg-accent-400", "bg-white/20"].map((c) => (
            <span key={c} className={`h-2 w-2 rounded-full ${c}`} />
          ))}
        </span>
        <span className="font-mono text-[10px] tracking-[0.12em] text-text-muted">
          {header}
        </span>
        {meta && (
          <span className="ml-auto font-mono text-[10px] text-success">
            {meta}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function FloatChip({
  className = "",
  delay = "0s",
  children,
}: {
  className?: string;
  delay?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`floaty absolute z-10 inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-bg-base/95 px-3 py-1.5 font-mono text-[10.5px] text-text-secondary shadow-lg backdrop-blur ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </span>
  );
}

/* ============================ WEB DEVELOPMENT ============================ */

function HeroWeb() {
  return (
    <div className="relative">
      <FloatChip className="-top-3.5 right-4" delay="0.4s">
        <span className="font-bold text-success">98/100</span> PageSpeed
      </FloatChip>
      <FloatChip className="-bottom-3.5 left-4" delay="1.1s">
        <span className="text-primary-400">●</span> mobile ready
      </FloatChip>
      <Frame header="yourbusiness.co.uk" meta="● live">
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-bg-base/50 px-4 py-2">
          <Lock size={11} className="text-success" aria-hidden="true" />
          <span className="font-mono text-[10.5px] text-text-muted">
            https://yourbusiness.co.uk
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <span className="h-3 w-14 rounded bg-primary-400/80" />
            <span className="flex gap-3">
              {[24, 20, 22].map((w, i) => (
                <span
                  key={i}
                  className="h-2 rounded bg-white/15"
                  style={{ width: w }}
                />
              ))}
            </span>
          </div>
          <p className="scene-pop mt-6 font-display text-xl font-bold leading-snug text-text-primary">
            Your business,
            <br />
            open 24/7 online
          </p>
          <span
            className="scene-pop mt-4 inline-block rounded-lg bg-primary-500 px-4 py-2 text-xs font-semibold text-white"
            style={{ animationDelay: "0.35s" }}
          >
            Get a Quote
          </span>
          <div className="mt-5 grid grid-cols-3 gap-2.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="svc-skel h-12 rounded-lg border border-white/[0.06] bg-white/[0.04]"
                style={{ animationDelay: `${i * 0.35}s` }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-2.5 font-mono text-[10px] text-text-muted">
          <span>Next.js · deployed on Vercel</span>
          <span className="text-success">build passed ✓</span>
        </div>
      </Frame>
    </div>
  );
}

/* ============================ SOCIAL MEDIA ============================ */

const SOCIAL_ORBIT = [
  { icon: Instagram, color: "#E4405F", className: "-top-3 -left-2", delay: "0s" },
  { icon: Youtube, color: "#FF0000", className: "top-16 -right-4", delay: "0.7s" },
  { icon: Linkedin, color: "#0A66C2", className: "bottom-20 -left-5", delay: "1.3s" },
  { icon: Facebook, color: "#1877F2", className: "-bottom-3 right-6", delay: "1.9s" },
];

function HeroSocial() {
  return (
    <div className="relative mx-auto w-fit">
      {SOCIAL_ORBIT.map(({ icon: Icon, color, className, delay }) => (
        <span
          key={color}
          className={`floaty absolute z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.1] shadow-lg backdrop-blur ${className}`}
          style={{ animationDelay: delay, background: `${color}22`, color }}
        >
          <Icon size={19} aria-hidden="true" />
        </span>
      ))}
      <div className="w-64 overflow-hidden rounded-[2rem] border border-[var(--border-copper)] bg-bg-card shadow-[var(--glow-copper)]">
        <div className="mx-auto mt-2.5 h-1.5 w-16 rounded-full bg-white/15" />
        <div className="flex items-center gap-2.5 px-4 pt-4 pb-3">
          <span className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400" />
          <div>
            <p className="text-xs font-semibold text-text-primary">
              yourbusiness
            </p>
            <p className="font-mono text-[9px] text-text-muted">
              Sponsored · just posted
            </p>
          </div>
          <span className="ml-auto font-mono text-[9px] text-success">
            scheduled ✓
          </span>
        </div>
        <div className="relative mx-3 flex h-36 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary-600/30 via-bg-base to-accent-600/25">
          <p className="scene-pop px-4 text-center font-display text-sm font-bold italic text-text-primary">
            &ldquo;Booked out this month, thank you!&rdquo;
          </p>
        </div>
        <div className="flex items-center gap-4 px-4 py-3 text-text-secondary">
          <span className="svc-heart inline-flex text-primary-400">
            <Heart size={17} fill="currentColor" aria-hidden="true" />
          </span>
          <MessageCircle size={17} aria-hidden="true" />
          <Send size={17} aria-hidden="true" />
          <span className="ml-auto font-mono text-[10px] text-text-muted">
            2,431 likes
          </span>
        </div>
        <div className="border-t border-white/[0.06] px-4 py-2.5 text-center font-mono text-[9.5px] tracking-[0.08em] text-text-muted">
          posted for you · every day · every platform
        </div>
      </div>
    </div>
  );
}

/* ============================ AI AUTOMATIONS ============================ */

function HeroAutomation() {
  const wires = [
    { d: "M160 50 L160 96", delay: "0s" },
    { d: "M160 152 C 160 180, 60 172, 60 200", delay: "0.9s" },
    { d: "M160 152 L160 200", delay: "1.2s" },
    { d: "M160 152 C 160 180, 260 172, 260 200", delay: "1.5s" },
  ];
  return (
    <div className="relative">
      <FloatChip className="-top-3.5 left-4" delay="0.3s">
        <span className="h-2 w-2 rounded-full bg-[#EA4B71]" /> n8n
      </FloatChip>
      <FloatChip className="-top-3.5 right-4" delay="1s">
        <span className="h-2 w-2 rounded-full bg-[#FF4F00]" /> Zapier
        <span className="mx-1 text-white/20">·</span>
        <span className="h-2 w-2 rounded-full bg-[#B02DE9]" /> Make
      </FloatChip>
      <Frame header="lead-rescue.workflow" meta="● running">
        <svg
          viewBox="0 0 320 252"
          className="block w-full"
          role="img"
          aria-label="A new enquiry flows through n8n and is answered, saved, and sent to your WhatsApp automatically"
        >
          {wires.map(({ d, delay }) => (
            <g key={d}>
              <path d={d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
              <path
                d={d}
                fill="none"
                stroke="var(--ra-copper)"
                strokeOpacity="0.45"
                strokeWidth="2"
                strokeDasharray="4 6"
                className="wf-flow"
              />
              <circle r="3.5" fill="var(--ra-copper)">
                <animateMotion dur="2.4s" begin={delay} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          ))}
          <g transform="translate(95 8)">
            <rect width={130} height={42} rx={11} fill="var(--ra-ink)" stroke="rgba(255,255,255,0.1)" />
            <text x="65" y="19" textAnchor="middle" fill="var(--ra-cream)" fontSize="11.5" fontWeight="600">
              New enquiry
            </text>
            <text x="65" y="33" textAnchor="middle" fill="var(--ra-cream-40)" fontSize="8.5" fontFamily="var(--font-mono)">
              2:47 AM · you were asleep
            </text>
          </g>
          <g transform="translate(100 96)">
            <rect width={120} height={56} rx={13} fill="var(--ra-ink)" stroke="#EA4B71" strokeOpacity="0.6" strokeWidth="1.5" />
            <rect width={120} height={56} rx={13} fill="none" stroke="#EA4B71" strokeOpacity="0.35" className="hero-core-pulse" />
            <text x="60" y="26" textAnchor="middle" fill="#EA4B71" fontSize="15" fontWeight="800" fontFamily="var(--font-mono)">
              n8n
            </text>
            <text x="60" y="42" textAnchor="middle" fill="var(--ra-cream-40)" fontSize="8.5" fontFamily="var(--font-mono)">
              route · enrich · decide
            </text>
          </g>
          {[
            { x: 15, label: "Reply sent", meta: "gmail", color: "#EA4335" },
            { x: 115, label: "Lead saved", meta: "sheets", color: "#34A853" },
            { x: 215, label: "You pinged", meta: "whatsapp", color: "#25D366" },
          ].map((n) => (
            <g key={n.label} transform={`translate(${n.x} 200)`}>
              <rect width={90} height={42} rx={11} fill="var(--ra-ink)" stroke="rgba(255,255,255,0.1)" />
              <circle cx={13} cy={14} r={3.5} fill={n.color} />
              <text x={22} y={17.5} fill="var(--ra-cream)" fontSize="10" fontWeight="600">
                {n.label}
              </text>
              <text x={13} y={33} fill="var(--ra-cream-40)" fontSize="8" fontFamily="var(--font-mono)">
                {n.meta} ✓
              </text>
            </g>
          ))}
        </svg>
        <div className="border-t border-white/[0.06] px-4 py-2.5 text-center font-mono text-[10px] tracking-[0.08em] text-text-muted">
          handled in 4 seconds · zero staff involved
        </div>
      </Frame>
    </div>
  );
}

/* ============================ SEO & CONTENT ============================ */

function HeroSeo() {
  return (
    <div className="relative">
      <FloatChip className="-top-3.5 right-4" delay="0.5s">
        <span className="svc-rise inline-block text-success">▲</span> page 1 of
        Google
      </FloatChip>
      <Frame header="google.co.uk" meta="1,900 searches/mo">
        <div className="p-5">
          <div className="flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-bg-base px-4 py-2.5">
            <Search size={14} className="text-text-muted" aria-hidden="true" />
            <span className="font-mono text-xs text-text-primary">
              plumber near me
            </span>
            <span className="code-caret inline-block h-3.5 w-[6px] bg-primary-400" />
          </div>
          <div className="mt-4 space-y-2.5">
            <div className="serp-climb rounded-lg border border-primary-600/40 bg-primary-600/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-primary-400">1</span>
                <span className="text-sm font-semibold text-text-primary">
                  yourbusiness.co.uk
                </span>
                <span className="ml-auto font-mono text-[9.5px] text-success">
                  you ✓
                </span>
              </div>
              <p className="mt-1 pl-5 font-mono text-[9.5px] text-text-muted">
                the result they click first
              </p>
            </div>
            {["competitor-one.com", "bigdirectory.com"].map((c, i) => (
              <div
                key={c}
                className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-bg-base/60 px-4 py-2.5 opacity-60"
              >
                <span className="font-mono text-xs text-text-muted">{i + 2}</span>
                <span className="text-sm text-text-secondary">{c}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/[0.06] px-5 pt-3 pb-2">
          <svg viewBox="0 0 300 44" className="block h-9 w-full" aria-hidden="true">
            <path
              d="M0 38 C 40 37, 60 33, 90 29 C 130 24, 150 21, 190 15 C 230 9, 260 6, 300 3"
              fill="none"
              stroke="var(--ra-copper)"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="seo-draw"
            />
          </svg>
          <p className="flex justify-between pb-1 font-mono text-[10px] text-text-muted">
            <span>organic clicks</span>
            <span className="text-success">+312% in 6 months</span>
          </p>
        </div>
      </Frame>
    </div>
  );
}

/* ============================ DESIGN ============================ */

function HeroDesign() {
  return (
    <div className="relative">
      <FloatChip className="-top-3.5 right-4" delay="0.4s">
        full brand kit · yours to keep
      </FloatChip>
      <span
        className="floaty absolute bottom-16 -left-3 z-10 inline-flex items-center gap-1 rounded-md bg-accent-500 px-2 py-1 font-mono text-[9.5px] font-semibold text-white shadow-lg"
        style={{ animationDelay: "1.2s" }}
      >
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
          <path d="M1 1 L11 5.5 L6.5 6.5 L5 11 Z" fill="currentColor" />
        </svg>
        Remotely · designing
      </span>
      <Frame header="yourbrand.fig" meta="● editing">
        <div
          className="relative p-6"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        >
          <div className="flex items-center justify-center gap-8">
            <svg viewBox="0 0 72 72" className="h-24 w-24" aria-hidden="true">
              <circle
                cx="36"
                cy="36"
                r="27"
                fill="none"
                stroke="var(--ra-copper)"
                strokeWidth="3"
                className="design-draw"
              />
              <path
                d="M24 42 C 30 28, 42 28, 48 42"
                fill="none"
                stroke="var(--ra-lavender)"
                strokeWidth="3"
                strokeLinecap="round"
                className="design-draw"
                style={{ animationDelay: "0.7s" }}
              />
            </svg>
            <div>
              <p className="font-display text-4xl font-bold italic text-text-primary">
                Aa
              </p>
              <p className="mt-1 font-mono text-[9.5px] tracking-[0.1em] text-text-muted">
                DISPLAY / BODY / MONO
              </p>
            </div>
          </div>
          <div className="mt-6 flex overflow-hidden rounded-lg border border-white/[0.08]">
            {["#e38c35", "#6e77cb", "#f5f1e8", "#7fc8a9", "#1a1a1a"].map(
              (hex, i) => (
                <span
                  key={hex}
                  className="svc-cell h-9 flex-1"
                  style={{ background: hex, animationDelay: `${i * 0.35}s` }}
                />
              )
            )}
          </div>
        </div>
        <div className="border-t border-white/[0.06] px-4 py-2.5 text-center font-mono text-[10px] tracking-[0.08em] text-text-muted">
          logo · palette · type · social kit · print
        </div>
      </Frame>
    </div>
  );
}

/* ============================ SHOPIFY ============================ */

const SHOPIFY_GREEN = "#95BF47";

function HeroShopify() {
  const orders = [
    { id: "#1042", amount: "£49.00", status: "fulfilled", delay: "0s" },
    { id: "#1043", amount: "£128.00", status: "label printed", delay: "0.5s" },
    { id: "#1044", amount: "£75.50", status: "tracking sent", delay: "1s" },
  ];
  return (
    <div className="relative">
      <FloatChip className="-top-3.5 right-4" delay="0.4s">
        <span className="h-2 w-2 rounded-full" style={{ background: SHOPIFY_GREEN }} />
        Shopify · Klaviyo · n8n
      </FloatChip>
      <FloatChip className="-bottom-3.5 left-4" delay="1.1s">
        0 orders touched by hand
      </FloatChip>
      <Frame header="yourstore.myshopify.com" meta="● live">
        <div className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
            orders · tonight, while you slept
          </p>
          <div className="mt-3 space-y-2.5">
            {orders.map((o) => (
              <div
                key={o.id}
                className="scene-pop flex items-center gap-3 rounded-lg border border-white/[0.06] bg-bg-base/60 px-4 py-3"
                style={{ animationDelay: o.delay }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm"
                  style={{ background: `${SHOPIFY_GREEN}22` }}
                >
                  🛒
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text-primary">
                    New order {o.id}
                  </p>
                  <p className="font-mono text-[10px]" style={{ color: SHOPIFY_GREEN }}>
                    {o.status} ✓ · no one lifted a finger
                  </p>
                </div>
                <span className="font-display text-sm font-bold" style={{ color: SHOPIFY_GREEN }}>
                  {o.amount}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg border border-white/[0.06] bg-bg-base/40 px-4 py-2.5 font-mono text-[10.5px]">
            <span className="text-text-muted">abandoned cart recovered</span>
            <span className="text-success">+£212 ✓</span>
          </div>
        </div>
      </Frame>
    </div>
  );
}

/* ============================ EXPORT ============================ */

const SCENES: Record<string, () => React.ReactElement> = {
  "web-development": HeroWeb,
  "social-media-management": HeroSocial,
  "ai-automations": HeroAutomation,
  "seo-content": HeroSeo,
  design: HeroDesign,
  "shopify-automation": HeroShopify,
};

export function ServiceHeroScene({ serviceSlug }: { serviceSlug: string }) {
  const Scene = SCENES[serviceSlug];
  if (!Scene) return null;
  return <Scene />;
}

export function hasHeroScene(serviceSlug: string): boolean {
  return serviceSlug in SCENES;
}
