/**
 * Scrolling belt of the real platforms behind each service, rendered as
 * app-icon style letter marks in brand colors. Shared by the navbar mega
 * menu (sm) and the service pages (lg). Server-safe, CSS animation only.
 */

export type ToolChip = { name: string; color: string; fg?: string };

export const SERVICE_TOOL_CHIPS: Record<string, ToolChip[]> = {
  "web-development": [
    { name: "WordPress", color: "#21759B" },
    { name: "Next.js", color: "#f5f1e8", fg: "#111" },
    { name: "Shopify", color: "#95BF47", fg: "#111" },
    { name: "Webflow", color: "#4353FF" },
    { name: "Wix", color: "#0C6EFC" },
    { name: "WooCommerce", color: "#96588A" },
  ],
  "social-media-management": [
    { name: "Instagram", color: "#E4405F" },
    { name: "TikTok", color: "#FE2C55" },
    { name: "Facebook", color: "#1877F2" },
    { name: "LinkedIn", color: "#0A66C2" },
    { name: "YouTube", color: "#FF0000" },
    { name: "X", color: "#e7e9ea", fg: "#111" },
  ],
  "ai-automations": [
    { name: "n8n", color: "#EA4B71" },
    { name: "Make", color: "#B02DE9" },
    { name: "Zapier", color: "#FF4F00" },
    { name: "OpenAI", color: "#10A37F" },
    { name: "Gmail", color: "#EA4335" },
    { name: "Google Sheets", color: "#34A853" },
    { name: "WhatsApp", color: "#25D366", fg: "#111" },
  ],
  "seo-content": [
    { name: "Google", color: "#4285F4" },
    { name: "Google Analytics", color: "#F9AB00", fg: "#111" },
    { name: "Search Console", color: "#458CF5" },
    { name: "Semrush", color: "#FF642D" },
    { name: "WordPress", color: "#21759B" },
  ],
  design: [
    { name: "Figma", color: "#F24E1E" },
    { name: "Photoshop", color: "#31A8FF", fg: "#111" },
    { name: "Illustrator", color: "#FF9A00", fg: "#111" },
    { name: "Canva", color: "#00C4CC", fg: "#111" },
    { name: "Adobe Firefly", color: "#EB1000" },
  ],
  "shopify-automation": [
    { name: "Shopify", color: "#95BF47", fg: "#111" },
    { name: "Klaviyo", color: "#f5f1e8", fg: "#111" },
    { name: "Stripe", color: "#635BFF" },
    { name: "n8n", color: "#EA4B71" },
    { name: "Judge.me", color: "#00B67A" },
  ],
};

export function ToolBelt({
  tools,
  size = "sm",
}: {
  tools: ToolChip[];
  size?: "sm" | "lg";
}) {
  // Repeat the set so the strip is always wider than the viewport, then
  // double it: svc-belt/tool-belt-slow translate -50% for a seamless loop.
  const row = size === "lg" ? [...tools, ...tools, ...tools] : tools;
  const lg = size === "lg";
  return (
    <div
      className={
        lg
          ? "overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
          : "overflow-hidden"
      }
      aria-hidden="true"
    >
      <div
        className={
          (lg ? "tool-belt-slow gap-3" : "svc-belt gap-1.5") +
          " flex w-max items-center"
        }
      >
        {[...row, ...row].map((t, i) => (
          <span
            key={`${t.name}-${i}`}
            className={
              lg
                ? "flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/[0.08] bg-bg-card px-4 py-2.5 text-sm font-medium text-text-secondary"
                : "flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/[0.08] bg-bg-card px-2 py-1 font-mono text-[9.5px] text-text-secondary"
            }
          >
            <span
              className={
                (lg
                  ? "h-6 w-6 rounded-md text-[12px]"
                  : "h-3.5 w-3.5 rounded-[4px] text-[8.5px]") +
                " flex items-center justify-center font-bold leading-none"
              }
              style={{ background: t.color, color: t.fg ?? "#fff" }}
            >
              {t.name.charAt(0).toUpperCase()}
            </span>
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ToolBeltSection({
  serviceSlug,
  label = "Platforms We Work With",
}: {
  serviceSlug: string;
  label?: string;
}) {
  const tools = SERVICE_TOOL_CHIPS[serviceSlug];
  if (!tools) return null;
  return (
    <section className="py-14">
      <p className="text-center font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
        {label}
      </p>
      <div className="mt-6">
        <ToolBelt tools={tools} size="lg" />
      </div>
    </section>
  );
}
