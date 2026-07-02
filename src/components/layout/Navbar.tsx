"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/layout/Wordmark";
import { navLinks, serviceNavLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsMobileServicesOpen(false);
    setIsDesktopDropdownOpen(false);
  }, [pathname]);

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
            "flex items-center justify-between transition-all duration-500 ease-in-out",
            "border rounded-full",
            isScrolled
              ? "bg-bg-card/80 backdrop-blur-xl border-white/[0.08] px-4 py-2 shadow-lg shadow-black/20"
              : "bg-transparent border-transparent px-0 py-5"
          )}
        >
          {/* Logo */}
          <div className={cn("flex items-center transition-all duration-300", isScrolled ? "pl-2" : "pl-0")}>
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
                    <div className="rounded-[var(--radius-card)] p-2 min-w-[220px] bg-bg-card border border-white/[0.1] shadow-2xl shadow-black/50 backdrop-blur-xl">
                      {serviceNavLinks.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className={cn(
                            "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150",
                            pathname === service.href
                              ? "text-text-primary bg-white/[0.08]"
                              : "text-text-secondary hover:text-text-primary hover:bg-white/[0.05]"
                          )}
                        >
                          <span>{service.label}</span>
                          {"isNew" in service && service.isNew && (
                            <span className="rounded-full bg-primary-600/20 border border-primary-600/30 px-1.5 py-0.5 text-[10px] font-medium text-primary-400 leading-none">
                              New
                            </span>
                          )}
                        </Link>
                      ))}
                      <div className="mt-1 border-t border-white/[0.06] pt-1">
                        <Link
                          href="/services"
                          className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-primary-400 transition-colors duration-150 hover:bg-white/[0.05]"
                        >
                          View All Services
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
                      {serviceNavLinks.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-colors",
                            pathname === service.href
                              ? "text-text-primary bg-white/[0.06]"
                              : "text-text-secondary hover:text-text-primary"
                          )}
                        >
                          <span>{service.label}</span>
                          {"isNew" in service && service.isNew && (
                            <span className="rounded-full bg-primary-600/20 border border-primary-600/30 px-1.5 py-0.5 text-[10px] font-medium text-primary-400 leading-none">
                              New
                            </span>
                          )}
                        </Link>
                      ))}
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
