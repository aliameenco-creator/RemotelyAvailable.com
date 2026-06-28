import type { CSSProperties, ReactNode } from "react";

// Toned status/category badge mirroring the brand reference design.
// tones map to the RA palette; `soft` is a tinted fill, `dot` adds a leading marker.
export type PillTone =
  | "copper"
  | "lavender"
  | "success"
  | "warning"
  | "neutral";

const toneColor: Record<PillTone, { fg: string; bg: string; border: string }> = {
  copper: {
    fg: "var(--ra-copper-bright)",
    bg: "var(--ra-copper-08)",
    border: "var(--ra-copper-25)",
  },
  lavender: {
    fg: "var(--ra-lavender-bright)",
    bg: "var(--ra-lavender-08)",
    border: "var(--ra-lavender-25)",
  },
  success: {
    fg: "var(--ra-success)",
    bg: "var(--ra-success-08)",
    border: "var(--ra-success-25)",
  },
  warning: {
    fg: "var(--ra-warning)",
    bg: "var(--ra-warning-08)",
    border: "var(--ra-warning-25)",
  },
  neutral: {
    fg: "var(--ra-cream-55)",
    bg: "var(--ra-cream-08)",
    border: "var(--ra-cream-12)",
  },
};

interface PillProps {
  children: ReactNode;
  tone?: PillTone;
  dot?: boolean;
  style?: CSSProperties;
}

export function Pill({ children, tone = "neutral", dot = false, style }: PillProps) {
  const c = toneColor[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "5px 12px",
        borderRadius: "var(--radius-pill)",
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.fg,
        fontFamily: "var(--font-mono)",
        fontSize: 11.5,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        lineHeight: 1,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "currentColor",
            flex: "none",
          }}
        />
      )}
      {children}
    </span>
  );
}
