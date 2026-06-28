import * as React from 'react';

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The headline figure, e.g. "+318%" or "4.2x". */
  value: React.ReactNode;
  /** Mono eyebrow label above the number. */
  label?: React.ReactNode;
  /** Supporting delta / context line below, e.g. "vs. last quarter". */
  delta?: React.ReactNode;
  /** @default "success" */
  deltaTone?: 'success' | 'danger' | 'lavender';
  /** @default "left" */
  align?: 'left' | 'center';
}

/** Outcome metric — serif number, mono label, optional delta. */
export function Stat(props: StatProps): JSX.Element;
