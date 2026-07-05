"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/layout/Wordmark";
import { ServiceGlyph } from "@/components/services/ServiceGlyph";
import {
  ServiceVignette,
  SERVICE_SLUG_VIGNETTES,
} from "@/components/services/ServiceVignette";
import { navLinks, serviceNavLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

// A platform/tool logo chip: app-icon style letter mark in the brand color.
type ToolChip = { name: string; color: string; fg?: string };

// Mega-menu enrichment for each service link: accent color, a one-line
// outcome for the list, a hook line for the live hover preview, and the
// real platforms we work with (rendered as an animated logo belt).
const MEGA_INFO: Record<
  string,
  { desc: string; color: string; preview: string; tools: ToolChip[] }
> = {
  "/services/web-development": {
    desc: "Fast sites built to convert",
    color: "#38BDF8",
    preview: "A fast site that turns visitors into enquiries, live in weeks.",
    tools: [
      { name: "WordPress", color: "#21759B" },
      { name: "Next.js", color: "#f5f1e8", fg: "#111" },
      { name: "Shopify", color: "#95BF47", fg: "#111" },
      { name: "Webflow", color: "#4353FF" },
      { name: "Wix", color: "#0C6EFC" },
      { name: "WooCommerce", color: "#96588A" },
    ],
  },
  "/services/social-media-management": {
    desc: "Posted for you, every day",
    color: "#E4405F",
    preview:
      "A month of on-brand posts, scheduled and published without you.",
    tools: [
      { name: "Instagram", color: "#E4405F" },
      { name: "TikTok", color: "#FE2C55" },
      { name: "Facebook", color: "#1877F2" },
      { name: "LinkedIn", color: "#0A66C2" },
      { name: "YouTube", color: "#FF0000" },
      { name: "X", color: "#e7e9ea", fg: "#111" },
    ],
  },
  "/services/ai-automations": {
    desc: "Repetitive work, handled",
    color: "#EA4B71",
    preview:
      "Enquiries answered, leads logged, and you notified while you sleep.",
    tools: [
      { name: "n8n", color: "#EA4B71" },
      { name: "Make", color: "#B02DE9" },
      { name: "Zapier", color: "#FF4F00" },
      { name: "OpenAI", color: "#10A37F" },
      { name: "Gmail", color: "#EA4335" },
      { name: "Sheets", color: "#34A853" },
    ],
  },
  "/services/seo-content": {
    desc: "Get found first on Google",
    color: "#7fc8a9",
    preview:
      "Climb to page 1 for the searches your customers actually make.",
    tools: [
      { name: "Google", color: "#4285F4" },
      { name: "Analytics", color: "#F9AB00", fg: "#111" },
      { name: "Search Console", color: "#458CF5" },
      { name: "Semrush", color: "#FF642D" },
      { name: "WordPress", color: "#21759B" },
    ],
  },
  "/services/design": {
    desc: "Look established everywhere",
    color: "#6e77cb",
    preview:
      "Logo, palette, and type that make you look established from day one.",
    tools: [
      { name: "Figma", color: "#F24E1E" },
      { name: "Photoshop", color: "#31A8FF", fg: "#111" },
      { name: "Illustrator", color: "#FF9A00", fg: "#111" },
      { name: "Canva", color: "#00C4CC", fg: "#111" },
      { name: "Adobe Firefly", color: "#EB1000" },
    ],
  },
  "/services/shopify-automation": {
    desc: "Your store on autopilot",
    color: "#95BF47",
    preview:
      "Carts recovered and orders fulfilled automatically, around the clock.",
    tools: [
      { name: "Shopify", color: "#95BF47", fg: "#111" },
      { name: "Klaviyo", color: "#f5f1e8", fg: "#111" },
      { name: "Stripe", color: "#635BFF" },
      { name: "n8n", color: "#EA4B71" },
      { name: "Judge.me", color: "#00B67A" },
    ],
  },
};

function ToolLogoBelt({ tools }: { tools: ToolChip[] }) {
  return (
    <div className="mt-3 overflow-hidden" aria-hidden="true">
      <div className="svc-belt flex w-max gap-1.5">
        {[...tools, ...tools].map((t, i) => (
          <span
            key={`${t.name}-${i}`}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/[0.08] bg-bg-card px-2 py-1 font-mono text-[9.5px] text-text-secondary"
          >
            <span
              className="flex h-3.5 w-3.5 items-center justify-center rounded-[4px] text-[8.5px] font-bold leading-none"
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

const slugFromHref = (href: string) => href.split("/").pop() ?? "";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [previewHref, setPreviewHref] = useState<string>(
    serviceNavLinks[0].href
  );
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close any open menus when the route changes (adjust-during-render
  // pattern, avoids a cascading setState-in-effect)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileOpen(false);
    setIsMobileServicesOpen(false);
    setIsDesktopDropdownOpen(false);
  }

  const isServicePage = pathname.startsWith("/services");

  function handleDropdownEnter() {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsDesktopDropdownOpen(true);
  }

  function handleDropdownLeave() {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDesktopDropdownOpen(false);
    }, 150);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Outer wrapper handles width + padding transition */}
      <div
        className={cn(
          "mx-auto transition-all duration-500 ease-in-out",
          isScrolled
            ? "w-fit max-w-[calc(100vw-1.5rem)] mt-3 px-2"
            : "max-w-7xl mt-0 px-4 sm:px-6 lg:px-8"
        )}
      >
        <nav
          className={cn(
            "flex items-center justify-between gap-6 transition-all duration-500 ease-in-out",
            "border rounded-full",
            isScrolled
              ? "bg-bg-card/80 backdrop-blur-xl border-white/[0.08] px-4 py-2 shadow-lg shadow-black/20"
              : "bg-transparent border-transparent px-0 py-5"
          )}
        >
          {/* Logo */}
          <div
            className={cn(
              "flex shrink-0 items-center transition-all duration-300",
              isScrolled ? "pl-2 pr-2" : "pl-0"
            )}
          >
            <Wordmark size={isScrolled ? 16 : 18} />
          </div>

          {/* Desktop Nav */}
          <div className="hidden shrink-0 items-center gap-0.5 md:flex">
            {navLinks.map((link) =>
              link.label === "Services" ? (
                <div
                  key={link.href}
                  className="relative shrink-0"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1 whitespace-nowrap px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors duration-200",
                      isServicePage
                        ? "text-text-primary bg-white/[0.08]"
                        : "text-text-secondary hover:text-text-primary hover:bg-white/[0.04]"
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        isDesktopDropdownOpen && "rotate-180"
                      )}
                    />
                  </Link>

                  {/* Dropdown */}
                  <div
                    className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200",
                      isDesktopDropdownOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    )}
                  >
                    <div className="border-beam w-[min(700px,calc(100vw-2rem))] overflow-hidden rounded-2xl bg-bg-card/95 border border-white/[0.1] shadow-2xl shadow-black/50 backdrop-blur-xl">
                      <div className="grid sm:grid-cols-[1fr_264px]">
                        <div className="flex flex-col gap-0.5 p-2.5">
                          {serviceNavLinks.map((service) => {
                            const info = MEGA_INFO[service.href];
                            const active = pathname === service.href;
                            const highlighted = previewHref === service.href;
                            return (
                              <Link
                                key={service.href}
                                href={service.href}
                                onMouseEnter={() =>
                                  setPreviewHref(service.href)
                                }
                                onFocus={() => setPreviewHref(service.href)}
                                className={cn(
                                  "group/item flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150",
                                  highlighted || active
                                    ? "bg-white/[0.06]"
                                    : "hover:bg-white/[0.05]"
                                )}
                              >
                                <span
                                  className="shrink-0 transition-transform duration-200 group-hover/item:scale-110"
                                  style={{ color: info?.color ?? "#e38c35" }}
                                >
                                  <ServiceGlyph
                                    slug={slugFromHref(service.href)}
                                    size={24}
                                  />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span
                                    className={cn(
                                      "flex items-center gap-2 text-sm font-semibold",
                                      active
                                        ? "text-primary-400"
                                        : "text-text-primary"
                                    )}
                                  >
                                    {service.label}
                                    {"isNew" in service && service.isNew && (
                                      <span className="rounded-full bg-primary-600/20 border border-primary-600/30 px-1.5 py-0.5 text-[10px] font-medium text-primary-400 leading-none">
                                        New
                                      </span>
                                    )}
                                  </span>
                                  <span className="mt-0.5 block truncate text-xs text-text-muted">
                                    {info?.desc}
                                  </span>
                                </span>
                                <ArrowUpRight
                                  size={14}
                                  className="shrink-0 text-primary-400 opacity-0 -translate-x-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                                  aria-hidden="true"
                                />
                              </Link>
                            );
                          })}
                        </div>

                        {/* Live preview of the hovered service */}
                        <Link
                          href={previewHref}
                          className="hidden border-l border-white/[0.08] bg-bg-base/40 p-4 transition-colors hover:bg-bg-base/60 sm:block"
                        >
                          <div key={previewHref} className="scene-pop">
                            {SERVICE_SLUG_VIGNETTES[
                              slugFromHref(previewHref)
                            ] && (
                              <ServiceVignette
                                variant={
                                  SERVICE_SLUG_VIGNETTES[
                                    slugFromHref(previewHref)
                                  ]
                                }
                              />
                            )}
                            <p className="mt-3 text-sm font-semibold text-text-primary">
                              {
                                serviceNavLinks.find(
                                  (s) => s.href === previewHref
                                )?.label
                              }
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-text-muted">
                              {MEGA_INFO[previewHref]?.preview}
                            </p>
                            {MEGA_INFO[previewHref]?.tools && (
                              <ToolLogoBelt
                                tools={MEGA_INFO[previewHref].tools}
                              />
                            )}
                            <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-primary-400">
                              See it in action
                              <ArrowUpRight size={12} aria-hidden="true" />
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] bg-bg-base/40 px-4 py-3">
                        <Link
                          href="/services"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-400 transition-colors hover:text-primary-300"
                        >
                          View All Services
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </Link>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 rounded-full border border-primary-600/30 bg-primary-600/10 px-3.5 py-1.5 text-xs font-medium text-primary-400 transition-colors hover:bg-primary-600/20"
                          data-analytics-event="cta_click"
                          data-analytics-label="mega-menu:free-plan"
                        >
                          <Sparkles size={12} aria-hidden="true" />
                          Not sure? Get a free plan
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "shrink-0 whitespace-nowrap px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors duration-200",
                    pathname === link.href
                      ? "text-text-primary bg-white/[0.08]"
                      : "text-text-secondary hover:text-text-primary hover:bg-white/[0.04]"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div
            className={cn(
              "hidden shrink-0 md:flex items-center",
              isScrolled ? "pr-1" : "pr-0"
            )}
          >
            <Button href="/contact" size="sm" className="rounded-full">
              Contact Us
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-white/[0.06] transition-colors md:hidden",
              isScrolled ? "mr-1" : "mr-0"
            )}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
            isScrolled
              ? "bg-bg-card/90 backdrop-blur-xl border border-t-0 border-white/[0.08] rounded-b-2xl mx-4 -mt-1 px-2"
              : "bg-bg-base/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl mt-2 px-2"
          )}
        >
          <div className="flex flex-col gap-1 pb-4 pt-3">
            {navLinks.map((link) =>
              link.label === "Services" ? (
                <div key={link.href}>
                  <button
                    onClick={() =>
                      setIsMobileServicesOpen(!isMobileServicesOpen)
                    }
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                      isServicePage
                        ? "text-text-primary bg-white/[0.06]"
                        : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      size={16}
                      className={cn(
                        "transition-transform duration-200",
                        isMobileServicesOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isMobileServicesOpen
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="ml-4 border-l border-white/[0.08] pl-2 py-1">
                      {serviceNavLinks.map((service) => {
                        const info = MEGA_INFO[service.href];
                        return (
                          <Link
                            key={service.href}
                            href={service.href}
                            className={cn(
                              "flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg transition-colors",
                              pathname === service.href
                                ? "text-text-primary bg-white/[0.06]"
                                : "text-text-secondary hover:text-text-primary"
                            )}
                          >
                            <span
                              className="shrink-0"
                              style={{ color: info?.color ?? "#e38c35" }}
                            >
                              <ServiceGlyph
                                slug={slugFromHref(service.href)}
                                size={18}
                              />
                            </span>
                            <span>{service.label}</span>
                            {"isNew" in service && service.isNew && (
                              <span className="rounded-full bg-primary-600/20 border border-primary-600/30 px-1.5 py-0.5 text-[10px] font-medium text-primary-400 leading-none">
                                New
                              </span>
                            )}
                          </Link>
                        );
                      })}
                      <Link
                        href="/services"
                        className="flex items-center px-3 py-2.5 text-sm font-medium text-primary-400 transition-colors hover:text-primary-300"
                      >
                        View All Services
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    pathname === link.href
                      ? "text-text-primary bg-white/[0.06]"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-2 px-4">
              <Button href="/contact" size="sm" className="w-full rounded-full">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
