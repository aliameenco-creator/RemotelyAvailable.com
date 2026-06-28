import React from 'react';

/**
 * Badge / Tag — small status or category label.
 * tone: copper | lavender | neutral | success | warning | danger
 * variant: soft (tinted) | solid | outline
 */
export function Badge({ tone = 'neutral', variant = 'soft', children, dot = false, style, ...rest }) {
  const map = {
    copper:   { hue: 'var(--ra-copper)',   soft: 'var(--ra-copper-16)',           solidText: 'var(--ra-base)' },
    lavender: { hue: 'var(--ra-lavender)', soft: 'rgba(110,119,203,0.18)',        solidText: 'var(--ra-cream)' },
    neutral:  { hue: 'var(--ra-cream-70)', soft: 'var(--ra-cream-08)',            solidText: 'var(--ra-base)' },
    success:  { hue: 'var(--ra-success)',  soft: 'rgba(79,157,107,0.18)',         solidText: 'var(--ra-cream)' },
    warning:  { hue: 'var(--ra-warning)',  soft: 'rgba(227,176,53,0.18)',         solidText: 'var(--ra-base)' },
    danger:   { hue: 'var(--ra-danger)',   soft: 'rgba(210,96,74,0.18)',          solidText: 'var(--ra-cream)' },
  };
  const c = map[tone] || map.neutral;

  const variants = {
    soft:    { background: c.soft, color: c.hue, border: '1px solid transparent' },
    solid:   { background: c.hue, color: c.solidText, border: '1px solid transparent' },
    outline: { background: 'transparent', color: c.hue, border: `1px solid ${c.hue}` },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontWeight: 700,
        padding: '4px 10px',
        borderRadius: 'var(--radius-pill)',
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {dot ? <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} /> : null}
      {children}
    </span>
  );
}
