import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Size. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Element rendered before the label (icon). */
  leading?: React.ReactNode;
  /** Element rendered after the label (icon). */
  trailing?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * Pill-shaped action button in the Remotely Available voice.
 *
 * @startingPoint section="Core" subtitle="Copper / lavender / ghost actions" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
