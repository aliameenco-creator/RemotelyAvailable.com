"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { navLinks, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Outer wrapper handles width + padding transition */}
      <div
        className={cn(
          "mx-auto transition-all duration-500 ease-in-out",
          isScrolled
            ? "max-w-3xl mt-3 px-2"
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
          <Link
            href="/"
            className={cn(
              "flex items-center group transition-all duration-300 hover:opacity-80",
              isScrolled ? "pl-2" : "pl-0"
            )}
          >
            <Image
              src="/images/logo-white.png"
              alt={siteConfig.name}
              width={200}
              height={28}
              className={cn(
                "w-auto transition-all duration-500",
                isScrolled ? "h-5" : "h-7"
              )}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors duration-200",
                  pathname === link.href
                    ? "text-text-primary bg-white/[0.08]"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/[0.04]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div
            className={cn(
              "hidden md:flex items-center",
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
            isMobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
            isScrolled
              ? "bg-bg-card/90 backdrop-blur-xl border border-t-0 border-white/[0.08] rounded-b-2xl mx-4 -mt-1 px-2"
              : "px-0"
          )}
        >
          <div className="flex flex-col gap-1 pb-4 pt-3">
            {navLinks.map((link) => (
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
            ))}
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
