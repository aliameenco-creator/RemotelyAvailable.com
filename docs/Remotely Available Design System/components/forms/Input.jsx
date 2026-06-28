import React from 'react';

/**
 * Text input with mono label. Dark well surface, copper focus ring.
 */
export function Input({ label, hint, error, leading, trailing, id, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `in-${String(label).toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const ring = error ? 'var(--ra-danger)' : focus ? 'var(--ra-copper)' : 'var(--border-subtle)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      {label ? (
        <label htmlFor={inputId} style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--ra-cream-55)',
        }}>{label}</label>
      ) : null}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--ra-ink)',
        border: `1px solid ${ring}`,
        borderRadius: 'var(--radius-sm)',
        padding: '0 14px',
        boxShadow: focus && !error ? '0 0 0 3px var(--ra-copper-16)' : 'none',
        transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
      }}>
        {leading ? <span style={{ display: 'inline-flex', color: 'var(--ra-cream-40)' }}>{leading}</span> : null}
        <input
          id={inputId}
          onFocus={(e) => { setFocus(true); rest.onFocus?.(e); }}
          onBlur={(e) => { setFocus(false); rest.onBlur?.(e); }}
          {...rest}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--ra-cream)', fontFamily: 'var(--font-sans)', fontSize: 15,
            padding: '12px 0',
          }}
        />
        {trailing ? <span style={{ display: 'inline-flex', color: 'var(--ra-cream-40)' }}>{trailing}</span> : null}
      </div>
      {error ? (
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ra-danger)' }}>{error}</span>
      ) : hint ? (
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ra-cream-40)' }}>{hint}</span>
      ) : null}
    </div>
  );
}
