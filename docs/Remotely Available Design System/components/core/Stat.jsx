import React from 'react';
import { Eyebrow } from './Eyebrow.jsx';

/**
 * Stat / metric — big serif number with a mono label and optional delta.
 * The signature way Remotely Available presents outcomes.
 */
export function Stat({ value, label, delta, deltaTone = 'success', align = 'left', style, ...rest }) {
  const deltaColor = deltaTone === 'danger' ? 'var(--ra-danger)'
    : deltaTone === 'lavender' ? 'var(--ra-lavender)'
    : 'var(--ra-success)';
  return (
    <div style={{ textAlign: align, ...style }} {...rest}>
      {label ? <Eyebrow style={{ marginBottom: 10, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>{label}</Eyebrow> : null}
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--fs-h1)',
        lineHeight: 1,
        color: 'var(--ra-cream)',
        letterSpacing: '-0.02em',
      }}>
        {value}
      </div>
      {delta ? (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: deltaColor,
          marginTop: 8,
          letterSpacing: '0.04em',
        }}>
          {delta}
        </div>
      ) : null}
    </div>
  );
}
