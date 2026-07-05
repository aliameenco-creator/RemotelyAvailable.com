/**
 * Hand-drawn mini marks for each service, used in the services mega menu.
 * Stroke-based, colored via currentColor, with a touch of SMIL/CSS life in
 * each (a travelling dot, a pulsing check, a self-drawing curve).
 */

function GlyphWeb({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="M2.5 8.5h19" />
      <circle cx="5.4" cy="6.3" r="0.5" fill="currentColor" stroke="none">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="7.6" cy="6.3" r="0.5" fill="currentColor" stroke="none" opacity="0.5" />
      <path d="m9.5 12.5-2.2 2.2 2.2 2.2" />
      <path d="m14.5 12.5 2.2 2.2-2.2 2.2" />
    </svg>
  );
}

function GlyphSocial({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.2a8.4 8.4 0 0 1-8.6 8.2 8.9 8.9 0 0 1-3.2-.6L4 20l1.3-3.8a7.9 7.9 0 0 1-1.9-5A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.2Z" />
      <path
        d="M12.4 14.6s-3.1-1.9-3.1-4a1.7 1.7 0 0 1 3.1-1 1.7 1.7 0 0 1 3.1 1c0 2.1-3.1 4-3.1 4Z"
        fill="currentColor"
        stroke="none"
      >
        <animate attributeName="opacity" values="0.55;1;0.55" dur="2s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function GlyphAutomation({ size }: { size: number }) {
  const path = "M4.5 15 C 8.5 15 8.5 8.5 12 8.5 C 15.5 8.5 15.5 15 19.5 15";
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d={path} opacity="0.45" strokeDasharray="2.5 3" />
      <circle cx="4.5" cy="15" r="2.4" />
      <circle cx="12" cy="8.5" r="2.4" />
      <circle cx="19.5" cy="15" r="2.4" />
      <circle r="1.2" fill="currentColor" stroke="none">
        <animateMotion dur="2.2s" repeatCount="indefinite" path={path} />
      </circle>
    </svg>
  );
}

function GlyphSeo({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.2 15.2 5 5" />
      <path d="M7.8 12.6v-1.8" opacity="0.6" />
      <path d="M10.5 12.6V8.8" opacity="0.8" />
      <path d="M13.2 12.6V6.9">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.9s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function GlyphDesign({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 18 C 7 7, 17 7, 20 18" className="design-draw" />
      <circle cx="4" cy="18" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="20" cy="18" r="1.6" fill="currentColor" stroke="none" opacity="0.55" />
      <circle cx="12" cy="9.7" r="1.6" fill="currentColor" stroke="none" opacity="0.75" />
    </svg>
  );
}

function GlyphShopify({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.5 8h13l-1.1 12.5H6.6L5.5 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
      <path d="m9.4 13.8 2 2 3.4-4">
        <animate attributeName="opacity" values="0.35;1;1;0.35" dur="2.4s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

const GLYPHS: Record<string, ({ size }: { size: number }) => React.ReactElement> = {
  "web-development": GlyphWeb,
  "social-media-management": GlyphSocial,
  "ai-automations": GlyphAutomation,
  "seo-content": GlyphSeo,
  design: GlyphDesign,
  "shopify-automation": GlyphShopify,
};

export function ServiceGlyph({ slug, size = 24 }: { slug: string; size?: number }) {
  const Glyph = GLYPHS[slug];
  if (!Glyph) return null;
  return <Glyph size={size} />;
}
