import React from 'react';

/**
 * Surface card. Variants: default (flat surface), glow (copper ring + glow),
 * outline (hairline only). Optional hover lift.
 */
export function Card({ variant = 'default', interactive = false, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);

  const variants = {
    default: { background: 'var(--ra-surface)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-md)' },
    glow: { background: 'var(--ra-surface)', border: '1px solid var(--border-copper)', boxShadow: 'var(--glow-copper)' },
    outline: { background: 'transparent', border: '1px solid var(--border-subtle)', boxShadow: 'none' },
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-5)',
        color: 'var(--text-primary)',
        transition: 'transform var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)',
        ...variants[variant],
        ...(interactive && hover ? { transform: 'translateY(-3px)', boxShadow: 'var(--shadow-lg)' } : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
