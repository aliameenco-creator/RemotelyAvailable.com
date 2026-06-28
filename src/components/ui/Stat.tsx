import type { CSSProperties } from "react";

// Big serif metric + label + optional delta line, mirroring the brand reference.
export type StatDeltaTone = "success" | "copper" | "lavender" | "neutral";

const deltaColor: Record<StatDeltaTone, string> = {
  success: "var(--ra-success)",
  copper: "var(--ra-copper-bright)",
  lavender: "var(--ra-lavender-bright)",
  neutral: "var(--ra-cream-40)",
};

interface StatProps {
  value: string;
  label: string;
  delta?: string;
  deltaTone?: StatDeltaTone;
  align?: "left" | "center";
  style?: CSSProperties;
}

export function Stat({
  value,
  label,
  delta,
  deltaTone = "neutral",
  align = "left",
  style,
}: StatProps) {
  return (
    <div style={{ textAlign: align, ...style }}>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.9rem, 3vw, 2.4rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          color: "var(--ra-cream)",
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: 8,
          fontSize: 13.5,
          color: "var(--ra-cream-55)",
          lineHeight: 1.4,
        }}
      >
        {label}
      </div>
      {delta && (
        <div
          style={{
            marginTop: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            color: deltaColor[deltaTone],
          }}
        >
          {delta}
        </div>
      )}
    </div>
  );
}
