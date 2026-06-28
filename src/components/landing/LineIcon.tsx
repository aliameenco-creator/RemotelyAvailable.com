import type { CSSProperties, ReactNode } from "react";

// Thin stroked line-icon set (stroke = currentColor), mirroring the brand reference.
export type LineIconName =
  | "arrow"
  | "bolt"
  | "mic"
  | "chat"
  | "check"
  | "globe"
  | "layers"
  | "cart"
  | "quote"
  | "plus"
  | "x"
  | "linkedin"
  | "search"
  | "play"
  | "doc"
  | "video"
  | "users"
  | "grid"
  | "chart"
  | "folder"
  | "settings"
  | "external"
  | "clock";

const paths: Record<LineIconName, ReactNode> = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  bolt: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  mic: (
    <g>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0014 0M12 18v3" />
    </g>
  ),
  chat: <path d="M21 12a8 8 0 01-11.3 7.3L3 21l1.7-6.7A8 8 0 1121 12z" />,
  check: <path d="M20 6L9 17l-5-5" />,
  globe: (
    <g>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
    </g>
  ),
  layers: <path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5" />,
  cart: (
    <g>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2 3h3l2.5 13h11l2-9H6" />
    </g>
  ),
  quote: <path d="M7 7h4v4c0 3-2 5-4 5M15 7h4v4c0 3-2 5-4 5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  x: <path d="M18 6L6 18M6 6l12 12" />,
  linkedin: (
    <g>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 014 0v4" />
    </g>
  ),
  search: (
    <g>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4-4" />
    </g>
  ),
  play: <path d="M8 5v14l11-7z" fill="currentColor" stroke="none" />,
  doc: (
    <g>
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
      <path d="M14 3v5h5" />
    </g>
  ),
  video: (
    <g>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="M16 10l5-3v10l-5-3z" />
    </g>
  ),
  users: (
    <g>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20a6 6 0 0112 0M16 5.5a3.2 3.2 0 010 5M21 20a6 6 0 00-4-5.6" />
    </g>
  ),
  grid: (
    <g>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </g>
  ),
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  folder: <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />,
  settings: (
    <g>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M22 12h-3M5 12H2M19 5l-2 2M7 17l-2 2M19 19l-2-2M7 7L5 5" />
    </g>
  ),
  external: (
    <g>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5" />
    </g>
  ),
  clock: (
    <g>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </g>
  ),
};

interface LineIconProps {
  name: LineIconName;
  size?: number;
  style?: CSSProperties;
}

export function LineIcon({ name, size = 18, style }: LineIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      {paths[name]}
    </svg>
  );
}
