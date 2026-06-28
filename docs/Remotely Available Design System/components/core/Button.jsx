import React from 'react';

/**
 * Remotely Available — Button
 * Variants: primary (copper), secondary (lavender), ghost, outline.
 * Sizes: sm, md, lg. Optional leading/trailing slots.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  leading,
  trailing,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const sizes = {
    sm: { padding: '8px 14px', fontSize: 13 },
    md: { padding: '11px 20px', fontSize: 14 },
    lg: { padding: '15px 28px', fontSize: 16 },
  };

  const variants = {
    primary: {
      base: { background: 'var(--ra-copper)', color: 'var(--ra-base)', border: '1px solid transparent' },
      hover: { background: 'var(--ra-copper-bright)' },
      active: { background: 'var(--ra-copper-deep)' },
    },
    secondary: {
      base: { background: 'var(--ra-lavender)', color: 'var(--ra-cream)', border: '1px solid transparent' },
      hover: { background: 'var(--ra-lavender-bright)' },
      active: { background: 'var(--ra-lavender-deep)' },
    },
    outline: {
      base: { background: 'transparent', color: 'var(--ra-cream)', border: '1px solid var(--border-strong)' },
      hover: { background: 'var(--ra-cream-08)', border: '1px solid var(--ra-copper)' },
      active: { background: 'var(--ra-cream-12)' },
    },
    ghost: {
      base: { background: 'transparent', color: 'var(--ra-cream-70)', border: '1px solid transparent' },
      hover: { background: 'var(--ra-cream-08)', color: 'var(--ra-cream)' },
      active: { background: 'var(--ra-cream-12)' },
    },
  };

  const v = variants[variant] || variants.primary;

  const composed = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    lineHeight: 1,
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)',
    transform: active && !disabled ? 'scale(0.97)' : 'scale(1)',
    ...sizes[size],
    ...v.base,
    ...(hover && !disabled ? v.hover : null),
    ...(active && !disabled ? v.active : null),
    ...style,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={composed}
      {...rest}
    >
      {leading ? <span style={{ display: 'inline-flex' }}>{leading}</span> : null}
      {children}
      {trailing ? <span style={{ display: 'inline-flex' }}>{trailing}</span> : null}
    </button>
  );
}
