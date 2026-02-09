import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { siteConfig, navLinks, socialLinks } from "@/lib/constants";

const footerSections = [
  {
    title: "Services",
    links: [
      { label: "AI Automations", href: "/services/ai-automations" },
      { label: "AI Websites", href: "/services/ai-websites" },
      { label: "AI Voice Agents", href: "/services/ai-voice-agents" },
      { label: "AI Chatbots", href: "/services/ai-chatbots" },
      { label: "AI Consulting", href: "/services/ai-consulting" },
      { label: "AI Content Systems", href: "/services/ai-content-systems" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-bg-card">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/logo-white.png"
                  alt={siteConfig.name}
                  width={200}
                  height={28}
                  className="h-7 w-auto"
                />
              </Link>
              <p className="mt-4 max-w-sm text-text-secondary leading-relaxed">
                We build AI systems that save businesses 40+ hours a week.
                Automations, voice agents, chatbots, and intelligent websites —
                engineered for real results.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <a
                  href={socialLinks.twitter}
                  aria-label="Twitter"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-bg-subtle text-text-muted hover:text-text-primary hover:border-text-muted transition-colors"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={socialLinks.linkedin}
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-bg-subtle text-text-muted hover:text-text-primary hover:border-text-muted transition-colors"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Link Columns */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-text-muted">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-text-muted hover:text-text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-text-muted hover:text-text-secondary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
