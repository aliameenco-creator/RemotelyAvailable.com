import type { CSSProperties, ReactNode } from "react";

/* Section scaffold, centered max-width container with vertical padding. */
export function Section({
  children,
  style,
  maxWidth = 1200,
  pad = "var(--space-9, 96px)",
  id,
}: {
  children: ReactNode;
  style?: CSSProperties;
  maxWidth?: number;
  pad?: string;
  id?: string;
}) {
  return (
    <section id={id} style={{ padding: `${pad} 32px`, ...style }}>
      <div style={{ maxWidth, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

/* Eyebrow kicker badge (lavender soft) + serif title + lead. */
export function SectionHead({
  kicker,
  title,
  lead,
  align = "center",
  maxWidth = 620,
}: {
  kicker?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
  maxWidth?: number;
}) {
  return (
    <div
      style={{
        textAlign: align,
        maxWidth: align === "center" ? maxWidth : "none",
        margin: align === "center" ? "0 auto" : 0,
      }}
    >
      {kicker ? (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginBottom: 18,
            padding: "5px 12px",
            borderRadius: "var(--radius-pill)",
            background: "rgba(110,119,203,0.12)",
            border: "1px solid rgba(110,119,203,0.3)",
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--ra-lavender-bright)",
          }}
        >
          {kicker}
        </span>
      ) : null}
      <h2
        style={{
          font: "var(--fw-regular, 400) clamp(1.9rem, 3.6vw, 2.25rem)/1.2 var(--font-display)",
          letterSpacing: "-0.02em",
          textWrap: "balance",
          color: "var(--ra-cream)",
        }}
      >
        {title}
      </h2>
      {lead ? (
        <p
          style={{
            marginTop: 16,
            color: "var(--ra-cream-55)",
            fontSize: 17,
            lineHeight: 1.6,
            textWrap: "pretty",
          }}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/* Title accent, Georgia italic lavender (brand signature). */
export function AccentTitle({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        color: "var(--ra-lavender)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* Decorative copper/lavender radial glow blob. */
export function Glow({
  color = "copper",
  size = 640,
  style,
}: {
  color?: "copper" | "lavender";
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      className={color === "lavender" ? "ra-glow-lavender" : "ra-glow-copper"}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        pointerEvents: "none",
        filter: "blur(8px)",
        ...style,
      }}
    />
  );
}
