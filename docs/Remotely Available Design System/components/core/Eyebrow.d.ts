import * as React from 'react';

export interface EyebrowProps {
  children?: React.ReactNode;
  /** Leading glyph. @default "//" — pass "" to omit, or e.g. "01 —". */
  prefix?: string;
  /** Color tone. @default "copper" */
  tone?: 'copper' | 'lavender' | 'muted';
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

/**
 * Monospace uppercase kicker label that sits above titles.
 */
export function Eyebrow(props: EyebrowProps): JSX.Element;
