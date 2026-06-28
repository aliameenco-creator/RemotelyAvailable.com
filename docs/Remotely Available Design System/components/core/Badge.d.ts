import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "neutral" */
  tone?: 'copper' | 'lavender' | 'neutral' | 'success' | 'warning' | 'danger';
  /** @default "soft" */
  variant?: 'soft' | 'solid' | 'outline';
  /** Show a leading status dot. @default false */
  dot?: boolean;
  children?: React.ReactNode;
}

/** Compact mono label for status, category, or metadata. */
export function Badge(props: BadgeProps): JSX.Element;
