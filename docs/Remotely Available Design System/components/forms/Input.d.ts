import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Mono uppercase label above the field. */
  label?: React.ReactNode;
  /** Helper text below the field. */
  hint?: React.ReactNode;
  /** Error message — overrides hint and turns the ring red. */
  error?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

/** Text field on a dark well surface with a copper focus ring. */
export function Input(props: InputProps): JSX.Element;
