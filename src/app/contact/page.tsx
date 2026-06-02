import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Clock, Calendar } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact RemotelyAvailable | Book a Free AI Strategy Call",
  description:
    "Ready to automate your business with AI? Book a free 30-minute strategy call or send us a message. No commitment required.",
  openGraph: {
    title: "Contact RemotelyAvailable",
    description:
      "Ready to automate your business with AI? Book a free 30-minute strategy call or send us a message.",
    url: `${siteConfig.url}/contact`,
  },
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: siteConfig.email,
    detail: "We respond within 24 hours.",
  },
  {
    icon: Clock,
    title: "Response Time",
    description: "Under 48 hours",
    detail: "Usually much faster.",
  },
  {
    icon: Calendar,
    title: "Book a Call",
    description: "30-min strategy session",
    detail: "Free. No commitment.",
  },
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      email: siteConfig.email,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <GradientOrb
          color="primary"
          size="lg"
          animation={1}
          className="-top-20 -left-20 opacity-15"
        />
        <Container className="relative z-10">
          <ScrollReveal>
            <nav className="mb-8 text-sm text-text-muted">
              <Link href="/" className="hover:text-text-secondary transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-text-secondary">Contact</span>
            </nav>

            <div className="max-w-2xl">
              <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
                Let&apos;s Talk About Your AI Strategy
              </h1>
              <p className="mt-4 text-lg text-text-secondary leading-relaxed">
                Tell us about your business and the challenges you&apos;re
                facing. We&apos;ll get back to you with a tailored approach —
                no generic proposals, no hard sell.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Contact Content */}
      <section className="pb-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <ContactForm />
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Email & Response Time cards */}
              {contactInfo.slice(0, 2).map((info, i) => (
                <ScrollReveal key={info.title} delay={i * 0.1}>
                  <Card className="p-6" hover={false}>
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-600/10 text-primary-400">
                        <info.icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-text-primary">
                          {info.title}
                        </h3>
                        <p className="text-sm font-medium text-text-secondary">
                          {info.description}
                        </p>
                        <p className="text-xs text-text-muted mt-1">
                          {info.detail}
                        </p>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}

              {/* Book a Call card → Calendly */}
              <ScrollReveal delay={0.2}>
                <Link href={siteConfig.calendlyUrl} target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="glass rounded-[var(--radius-card)] p-6 border border-white/[0.08] transition-all duration-300 group-hover:border-primary-600/40 group-hover:bg-primary-600/5">
                    <div className="flex gap-4 items-start">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-600/10 text-primary-400 transition-colors group-hover:bg-primary-600/20">
                        <Calendar size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-text-primary">
                          Book a Call
                        </h3>
                        <p className="text-sm font-medium text-text-secondary">
                          30-min strategy session
                        </p>
                        <p className="text-xs text-text-muted mt-1">
                          Free. No commitment.
                        </p>
                      </div>
                      <ArrowRight size={16} className="text-primary-400 mt-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="glass rounded-[var(--radius-card)] p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-600/10 text-accent-400 mb-3">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm2-1.645A3.502 3.502 0 0 0 12 6.5 3.501 3.501 0 0 0 8.545 9h2.013A1.5 1.5 0 0 1 12 8.5a1.5 1.5 0 0 1 .6 2.876A2.5 2.5 0 0 0 11 13.5V14h2v-.5a.5.5 0 0 1 .3-.459A3.5 3.5 0 0 0 13 13.355z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary">
                    Not sure what you need?
                  </h3>
                  <p className="mt-1 text-xs text-text-secondary leading-relaxed">
                    That&apos;s completely fine. Just describe your challenges
                    in the form and we&apos;ll suggest the best approach in
                    our response.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
