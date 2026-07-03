import type { CSSProperties } from "react";

/**
 * Small animated scenes that show each service doing its job. Pure
 * CSS/SVG-SMIL animation — server-safe, zero hydration, used on the
 * homepage bento, service pages, and all location service pages.
 */

const mono = "var(--font-mono)";

const BOX: CSSProperties = {
  borderRadius: 12,
  background: "var(--ra-ink)",
  border: "1px solid var(--ra-cream-08)",
  overflow: "hidden",
  pointerEvents: "none",
};

function VisAutomation() {
  const wire = "M14 45 C 44 45, 36 20, 66 20 C 96 20, 88 70, 118 70 C 142 70, 138 45, 158 45";
  return (
    <div style={{ ...BOX, padding: 10 }}>
      <svg viewBox="0 0 172 90" style={{ display: "block", width: "100%", height: "auto" }} aria-hidden="true">
        <path d={wire} fill="none" stroke="var(--ra-cream-08)" strokeWidth={2} />
        <path className="wf-flow" d={wire} fill="none" stroke="var(--ra-copper)" strokeOpacity={0.5} strokeWidth={2} strokeDasharray="4 6" />
        <circle r={3} fill="var(--ra-copper)">
          <animateMotion dur="2.6s" repeatCount="indefinite" path={wire} />
        </circle>
        {[
          { x: 14, y: 45, c: "var(--ra-copper)" },
          { x: 66, y: 20, c: "var(--ra-lavender)" },
          { x: 118, y: 70, c: "var(--ra-lavender)" },
          { x: 158, y: 45, c: "var(--ra-success)" },
        ].map((n) => (
          <g key={`${n.x}-${n.y}`}>
            <circle cx={n.x} cy={n.y} r={8} fill="var(--ra-surface-2)" stroke="var(--ra-cream-08)" />
            <circle cx={n.x} cy={n.y} r={3} fill={n.c} />
          </g>
        ))}
      </svg>
    </div>
  );
}

function VisWebsite() {
  return (
    <div style={BOX} aria-hidden="true">
      <div style={{ display: "flex", gap: 4, padding: "8px 10px", borderBottom: "1px solid var(--ra-cream-08)" }}>
        {["var(--ra-copper)", "var(--ra-lavender)", "var(--ra-cream-25)"].map((c) => (
          <span key={c} style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
        ))}
      </div>
      <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
        {[82, 58, 70].map((w, i) => (
          <span
            key={w}
            className="svc-skel"
            style={{ height: 6, width: `${w}%`, borderRadius: 3, background: "var(--ra-cream-25)", animationDelay: `${i * 0.35}s` }}
          />
        ))}
        <span style={{ marginTop: 2, height: 12, width: 64, borderRadius: 6, background: "var(--ra-copper)", opacity: 0.85 }} />
      </div>
    </div>
  );
}

function VisVoice() {
  const heights = [10, 20, 30, 38, 30, 22, 32, 18, 10];
  return (
    <div
      style={{ ...BOX, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 5, padding: "14px 12px 12px", height: 74 }}
      aria-hidden="true"
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className="svc-eq-bar"
          style={{
            width: 5,
            height: h,
            borderRadius: 3,
            background: i % 2 ? "var(--ra-lavender)" : "var(--ra-copper)",
            animationDelay: `${i * 0.12}s`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}

function VisChatbot() {
  const bubble: CSSProperties = { borderRadius: 10, padding: "6px 10px", fontSize: 10.5, fontFamily: mono, lineHeight: 1.4, maxWidth: "80%" };
  return (
    <div style={{ ...BOX, padding: 12, display: "flex", flexDirection: "column", gap: 7 }} aria-hidden="true">
      <span style={{ ...bubble, alignSelf: "flex-start", background: "var(--ra-surface-2)", color: "var(--ra-cream-55)" }}>
        Where&apos;s my order?
      </span>
      <span style={{ ...bubble, alignSelf: "flex-end", background: "var(--ra-copper-08)", border: "1px solid var(--ra-copper-25)", color: "var(--ra-cream)" }}>
        Out for delivery, arriving today 📦
      </span>
      <span style={{ ...bubble, alignSelf: "flex-start", background: "var(--ra-surface-2)", display: "inline-flex", gap: 4, alignItems: "center", padding: "8px 10px" }}>
        {[1, 2, 3].map((d) => (
          <span
            key={d}
            className={`animate-typing-dot-${d}`}
            style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--ra-cream-55)", display: "inline-block" }}
          />
        ))}
      </span>
    </div>
  );
}

function VisContent() {
  return (
    <div style={{ ...BOX, padding: 12 }} aria-hidden="true">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontFamily: mono, fontSize: 9, color: "var(--ra-cream-40)", letterSpacing: "0.08em" }}>
        <span>CONTENT CALENDAR</span>
        <span style={{ color: "var(--ra-copper)" }}>auto-filled</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="svc-cell"
            style={{
              height: 10,
              borderRadius: 3,
              background: i % 3 === 0 ? "var(--ra-copper)" : "var(--ra-lavender)",
              animationDelay: `${(i % 7) * 0.25}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function VisShopify() {
  const orders = ["#1042", "#1043", "#1044", "#1045", "#1046"];
  return (
    <div style={{ ...BOX, padding: "12px 0" }} aria-hidden="true">
      <div style={{ overflow: "hidden" }}>
        <div className="svc-belt" style={{ display: "flex", gap: 8, width: "max-content", paddingLeft: 8 }}>
          {[...orders, ...orders].map((o, i) => (
            <span
              key={i}
              style={{
                whiteSpace: "nowrap",
                padding: "5px 10px",
                borderRadius: 8,
                background: "var(--ra-surface-2)",
                border: "1px solid var(--ra-cream-08)",
                fontFamily: mono,
                fontSize: 10,
                color: "var(--ra-cream-55)",
              }}
            >
              {o} <span style={{ color: "var(--ra-success)" }}>✓</span>
            </span>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 9, textAlign: "center", fontFamily: mono, fontSize: 9.5, letterSpacing: "0.08em", color: "var(--ra-cream-40)" }}>
        orders fulfilled while you sleep
      </div>
    </div>
  );
}

function VisSeo() {
  const rows = [
    { pos: "1", label: "yourbusiness.co.uk", you: true },
    { pos: "2", label: "competitor-a.com" },
    { pos: "3", label: "competitor-b.com" },
  ];
  return (
    <div style={{ ...BOX, padding: 12 }} aria-hidden="true">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontFamily: mono, fontSize: 9, color: "var(--ra-cream-40)", letterSpacing: "0.08em" }}>
        <span>GOOGLE RESULTS</span>
        <span className="svc-rise" style={{ color: "var(--ra-success)" }}>▲ climbing</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {rows.map((r) => (
          <div
            key={r.pos}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 8px",
              borderRadius: 7,
              background: r.you ? "var(--ra-copper-08)" : "var(--ra-surface-2)",
              border: `1px solid ${r.you ? "var(--ra-copper-25)" : "var(--ra-cream-08)"}`,
            }}
          >
            <span style={{ fontFamily: mono, fontSize: 10, color: r.you ? "var(--ra-copper)" : "var(--ra-cream-40)", width: 10 }}>
              {r.pos}
            </span>
            <span style={{ fontFamily: mono, fontSize: 10, color: r.you ? "var(--ra-cream)" : "var(--ra-cream-40)" }}>
              {r.label}
            </span>
            {r.you && (
              <span style={{ marginLeft: "auto", fontFamily: mono, fontSize: 9, color: "var(--ra-success)" }}>
                you
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function VisDesign() {
  const swatches = ["var(--ra-copper)", "var(--ra-lavender)", "#f5f1e8", "var(--ra-success)"];
  return (
    <div style={{ ...BOX, padding: 12, display: "flex", alignItems: "center", gap: 14 }} aria-hidden="true">
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 30,
          lineHeight: 1,
          color: "var(--ra-cream)",
        }}
      >
        Aa
      </span>
      <span style={{ width: 1, alignSelf: "stretch", background: "var(--ra-cream-08)" }} />
      <div style={{ display: "flex", gap: 7 }}>
        {swatches.map((c, i) => (
          <span
            key={c}
            className="svc-cell"
            style={{ width: 18, height: 18, borderRadius: "50%", background: c, animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </div>
      <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ width: 14, height: 14, borderRadius: 4, border: "1.5px solid var(--ra-copper)" }} />
        <span style={{ width: 14, height: 14, borderRadius: "50%", border: "1.5px solid var(--ra-lavender)" }} />
        <span style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: "13px solid var(--ra-cream-25)" }} />
      </div>
    </div>
  );
}

function VisSocial() {
  return (
    <div style={{ ...BOX, padding: 12 }} aria-hidden="true">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, var(--ra-copper), var(--ra-lavender))" }} />
        <div style={{ flex: 1 }}>
          <span className="svc-skel" style={{ display: "block", height: 5, width: "45%", borderRadius: 3, background: "var(--ra-cream-25)" }} />
          <span className="svc-skel" style={{ display: "block", marginTop: 4, height: 5, width: "28%", borderRadius: 3, background: "var(--ra-cream-25)", animationDelay: "0.3s" }} />
        </div>
        <span style={{ fontFamily: mono, fontSize: 9, color: "var(--ra-copper)" }}>scheduled ✓</span>
      </div>
      <div style={{ marginTop: 9, height: 30, borderRadius: 7, background: "var(--ra-surface-2)", border: "1px solid var(--ra-cream-08)" }} />
      <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 10, fontFamily: mono, fontSize: 10, color: "var(--ra-cream-40)" }}>
        <span className="svc-heart" style={{ display: "inline-flex", color: "var(--ra-copper)" }}>♥</span>
        <span>+128 this week</span>
        <span style={{ marginLeft: "auto", color: "var(--ra-success)" }}>↗ reach +64%</span>
      </div>
    </div>
  );
}

export type VignetteVariant =
  | "automation"
  | "website"
  | "voice"
  | "chatbot"
  | "content"
  | "shopify"
  | "seo"
  | "design"
  | "social";

const VARIANTS: Record<VignetteVariant, () => React.ReactElement> = {
  automation: VisAutomation,
  website: VisWebsite,
  voice: VisVoice,
  chatbot: VisChatbot,
  content: VisContent,
  shopify: VisShopify,
  seo: VisSeo,
  design: VisDesign,
  social: VisSocial,
};

/** Service slug (services.ts / ukLocations.ts) → vignette variant. */
export const SERVICE_SLUG_VIGNETTES: Record<string, VignetteVariant> = {
  "web-development": "website",
  "social-media-management": "social",
  "ai-automations": "automation",
  "seo-content": "seo",
  design: "design",
  "shopify-automation": "shopify",
};

export function ServiceVignette({ variant }: { variant: VignetteVariant }) {
  const Vis = VARIANTS[variant];
  return <Vis />;
}
