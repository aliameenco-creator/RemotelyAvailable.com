import React from 'react';

/**
 * Mono eyebrow / kicker label — the signature "// section" technical label.
 */
export function Eyebrow({ children, prefix = '//', tone = 'copper', as = 'div', style, ...rest }) {
  const Tag = as;
  const color = tone === 'muted' ? 'var(--ra-cream-40)' : tone === 'lavender' ? 'var(--ra-lavender)' : 'var(--ra-copper)';
  return (
    <Tag
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-label)',
        letterSpacing: 'var(--ls-eyebrow)',
        textTransform: 'uppercase',
        color,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        ...style,
      }}
      {...rest}
    >
      {prefix ? <span style={{ opacity: 0.7 }}>{prefix}</span> : null}
      {children}
    </Tag>
  );
}
