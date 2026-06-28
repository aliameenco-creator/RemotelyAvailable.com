import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "default" */
  variant?: 'default' | 'glow' | 'outline';
  /** Lift + deepen shadow on hover. @default false */
  interactive?: boolean;
  children?: React.ReactNode;
}

/** Rounded (14px) surface container on the dark palette. */
export function Card(props: CardProps): JSX.Element;
