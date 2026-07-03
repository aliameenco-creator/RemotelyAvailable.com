"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import {
  ArrowRight,
  Play,
  ShoppingCart,
  Mail,
  Star,
  Eye,
  RefreshCw,
  Check,
  Shield,
  Phone,
  Wrench,
  TrendingUp,
  ChevronDown,
  Download,
} from "lucide-react";
import { AnimatePresence } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GradientText } from "@/components/ui/GradientText";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { cn } from "@/lib/utils";

/* ──────────────────── Animated Counter ──────────────────── */
function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (end === 0) { setCount(0); return; }
    const totalFrames = 40;
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor((frame / totalFrames) * end));
      }
    }, 1000 / 30);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/* ──────────────────── FAQ Accordion Item ──────────────────── */
function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/[0.03]"
        aria-expanded={isOpen}
      >
        <span className="pr-4 text-sm font-medium text-text-primary sm:text-base">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={cn(
            "shrink-0 text-text-muted transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 text-sm text-text-secondary leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────── Lead Form ──────────────────── */
function PlaybookForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await fetch("/api/shopify-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: data.get("firstName"),
        email: data.get("email"),
        storeUrl: data.get("storeUrl"),
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      alert(err?.error || "Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
          <Check size={32} className="text-green-400" />
        </div>
        <h3 className="font-display text-xl font-bold text-text-primary">
          Your Playbook Is Ready!
        </h3>
        <p className="mt-2 text-text-secondary">
          Click below to download. I&apos;ll also send you a personalised
          audit of your store within 48 hours.
        </p>
        <a
          href="/downloads/10K-Email-Playbook-For-Shopify-Owners.pdf"
          download
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-primary-600/30 transition-all duration-300 hover:bg-primary-500 hover:scale-105"
        >
          <Download size={18} />
          Download Playbook (PDF)
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="firstName"
          className="mb-1.5 block text-sm font-medium text-text-secondary"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          required
          className="w-full rounded-lg border border-white/10 bg-bg-card px-4 py-3 text-text-primary placeholder:text-text-faint focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
          placeholder="Your first name"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-text-secondary"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full rounded-lg border border-white/10 bg-bg-card px-4 py-3 text-text-primary placeholder:text-text-faint focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="storeUrl"
          className="mb-1.5 block text-sm font-medium text-text-secondary"
        >
          Shopify Store URL{" "}
          <span className="text-text-faint">
            (so I can include personalised tips)
          </span>
        </label>
        <input
          type="url"
          id="storeUrl"
          name="storeUrl"
          required
          className="w-full rounded-lg border border-white/10 bg-bg-card px-4 py-3 text-text-primary placeholder:text-text-faint focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
          placeholder="https://yourstore.myshopify.com"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={loading}
        icon={<Download size={18} />}
      >
        {loading ? "Sending..." : "Send Me the Playbook"}
      </Button>
      <p className="text-xs text-text-muted text-center">
        I&apos;ll also send you a personalised audit of your store within 48
        hours. No spam, unsubscribe anytime.
      </p>
    </form>
  );
}

/* ──────────────────── Data ──────────────────── */
const flows = [
  {
    icon: ShoppingCart,
    title: "Abandoned Cart Recovery",
    description:
      "3-email + SMS sequence that fires when someone leaves items in their cart. Recovers 5\u201315% of abandoned carts automatically.",
  },
  {
    icon: Mail,
    title: "Welcome Series",
    description:
      "4-email nurture sequence that turns new subscribers into first-time buyers. Builds trust, introduces your brand, and drives that crucial first purchase.",
  },
  {
    icon: Star,
    title: "Post-Purchase Follow-Up",
    description:
      "Automated emails after every order \u2014 thank you, product tips, review request, and cross-sell recommendations. Increases repeat purchase rate by 20\u201330%.",
  },
  {
    icon: Eye,
    title: "Browse Abandonment",
    description:
      "Catches visitors who viewed products but didn\u2019t add to cart. Nudges them back with personalised product reminders.",
  },
  {
    icon: RefreshCw,
    title: "Win-Back Campaign",
    description:
      "Re-engages customers who haven\u2019t purchased in 60\u201390 days. Brings lapsed buyers back with targeted offers.",
  },
];

const valueStack = [
  { item: "Revenue Recovery System \u2014 5 automated Klaviyo flows", value: "$3,000" },
  { item: "High-converting popup & signup form setup", value: "$400" },
  { item: "Custom branded email templates (matching your store)", value: "$600" },
  { item: "30-day post-launch optimisation & A/B testing", value: "$800" },
  { item: "Klaviyo dashboard training video (so you understand your numbers)", value: "$200" },
  { item: "30 high-converting subject lines swipe file", value: "$150" },
];

const results = [
  {
    label: "Fashion brand, $25K/month revenue",
    stats: [
      "$4,200 recovered in month one",
      "12% welcome series conversion rate",
      "34 repeat orders from post-purchase flow",
    ],
  },
  {
    label: "Supplements brand, $15K/month revenue",
    stats: [
      "Abandoned cart flow recovering $2,100/month",
      "Email list grew 340% in 60 days with new popups",
    ],
  },
  {
    label: "Homeware brand, $40K/month revenue",
    stats: [
      "$7,800 in email-attributed revenue in first 90 days",
      "ROI: 7.8x return on setup investment",
    ],
  },
];

const faqs = [
  {
    q: "I don\u2019t have a big email list \u2014 will this still work?",
    a: "Yes. The abandoned cart and post-purchase flows don\u2019t need a list at all \u2014 they trigger on customer actions that are already happening in your store. The welcome series and popups I build will grow your list simultaneously. These flows work with your existing traffic.",
  },
  {
    q: "What if I already have Klaviyo but it\u2019s not set up properly?",
    a: "That\u2019s actually the most common situation I see. Most stores install Klaviyo and then never build the flows. I\u2019ll audit what you have, keep anything that\u2019s working, and build out the rest. No starting from scratch.",
  },
  {
    q: "How long until I see results?",
    a: "Your first recovered cart can happen within 48 hours of the flows going live. Most clients see measurable revenue impact within the first 2 weeks. The full system is built and launched within 14 days of our call.",
  },
  {
    q: "What if it doesn\u2019t work?",
    a: "That\u2019s what the guarantee is for. If the abandoned cart flow doesn\u2019t recover at least ONE sale within 30 days, I refund you in full and you keep all the work. I take on all the risk.",
  },
  {
    q: "Do I need to know how to use Klaviyo?",
    a: "No. I do everything. I also include a training video walkthrough of your Klaviyo dashboard so you can check your numbers anytime. But day-to-day, the system runs on autopilot.",
  },
  {
    q: "What\u2019s the ongoing cost after the setup?",
    a: "My fee is a one-time $997 investment. Klaviyo has its own pricing (free up to 250 contacts, then starts at about $20/month). There are no ongoing fees from me unless you want optional monthly optimisation.",
  },
  {
    q: "Can I see an example of the emails you\u2019d send?",
    a: "Download the free $10K Email Playbook \u2014 it includes real examples of each flow type with subject lines, timing, and content strategies.",
  },
];

const steps = [
  {
    icon: Phone,
    number: "1",
    title: "We Talk",
    time: "15 min",
    description:
      "A quick 15-minute call where I learn about your store, your products, and your goals. I\u2019ll also show you exactly where you\u2019re losing revenue.",
  },
  {
    icon: Wrench,
    number: "2",
    title: "I Build Everything",
    time: "14 days",
    description:
      "I set up your complete Revenue Recovery System \u2014 all 5 flows, branded templates, popups, and integrations. You don\u2019t have to do anything.",
  },
  {
    icon: TrendingUp,
    number: "3",
    title: "You Start Recovering Revenue",
    time: "Day 1",
    description:
      "Flows go live and start working immediately. Your first recovered cart can happen within 48 hours. I monitor and optimise for 30 days.",
  },
];

/* ──────────────────── Main Component ──────────────────── */
export default function ShopifyAutomationClient() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <main className="overflow-hidden">
      {/* ============ SECTION 1: HERO ============ */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-bg-base to-bg-base" />
        {/* Gradient orbs, hidden on mobile for performance (blur is GPU-heavy) */}
        <div className="pointer-events-none absolute -top-20 -left-20 hidden h-96 w-96 rounded-full bg-primary-600/15 blur-[100px] sm:block animate-orb-1" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 hidden h-96 w-96 rounded-full bg-accent-600/15 blur-[100px] sm:block animate-orb-2" aria-hidden="true" />

        <Container className="relative z-10">
          {/* Hero content uses CSS animations, no JS needed, renders instantly */}
          <div className="mx-auto max-w-4xl text-center animate-fade-in-up">
            <span className="mb-6 inline-block rounded-full border border-primary-600/30 bg-primary-600/10 px-4 py-1.5 text-sm font-medium text-primary-400">
              Shopify Email Automation
            </span>

            <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1]">
              Your Shopify Store Is Losing{" "}
              <GradientText>$3,000&ndash;$10,000</GradientText> Every Month
              in Abandoned Carts.{" "}
              <span className="text-text-secondary">
                Let&apos;s Fix That.
              </span>
            </h1>

            <p className="mt-6 text-lg text-text-secondary leading-relaxed sm:text-xl max-w-3xl mx-auto">
              I build automated email systems for Shopify stores that recover
              lost sales, turn browsers into buyers, and generate repeat
              revenue &mdash; all on autopilot.
            </p>

          </div>

          {/* Video Placeholder */}
          <div className="mx-auto mt-10 max-w-3xl animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
            <div className="relative aspect-video overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-bg-card shadow-2xl shadow-primary-600/10">
              {/* REPLACE VIDEO URL HERE, swap this placeholder with a YouTube/Vimeo embed */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-bg-surface to-bg-card">
                <button className="group flex h-20 w-20 items-center justify-center rounded-full bg-primary-600 shadow-lg shadow-primary-600/30 transition-all duration-300 hover:scale-110 hover:shadow-primary-500/40">
                  <Play
                    size={32}
                    className="ml-1 text-white transition-transform group-hover:scale-110"
                    fill="white"
                  />
                </button>
                <p className="max-w-xs text-center text-sm text-text-secondary">
                  Watch: How Shopify Stores Are Recovering Thousands in Lost
                  Revenue{" "}
                  <span className="text-text-muted">(2 min)</span>
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center">
              <Button
                href="#playbook"
                variant="secondary"
                size="lg"
                icon={<Download size={18} />}
              >
                Download the Free Playbook
              </Button>
              <p className="mt-4 text-sm text-text-muted">
                Trusted by Shopify brands &bull; No long-term contracts &bull;
                Results guaranteed or your money back
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ============ SOCIAL PROOF ============ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-base via-bg-surface/50 to-bg-base" />
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center mb-16">
              <span className="mb-4 inline-block rounded-full border border-primary-600/30 bg-primary-600/10 px-4 py-1.5 text-sm font-medium text-primary-400">
                Results
              </span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                The Results Speak for Themselves
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mx-auto max-w-5xl grid grid-cols-1 gap-6 md:grid-cols-3">
              {results.map((result, i) => (
                <Card key={i} className="h-full" glow>
                  <p className="text-sm font-medium text-primary-400 mb-4">
                    {result.label}
                  </p>
                  <ul className="space-y-3">
                    {result.stats.map((stat, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <TrendingUp
                          size={16}
                          className="mt-0.5 shrink-0 text-green-400"
                        />
                        {stat}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
            <p className="mt-8 text-center text-xs text-text-muted max-w-md mx-auto">
              Based on industry benchmarks for Shopify stores in this revenue
              range. Results will be replaced with real case studies.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* ============ SECTION 2: THE PROBLEM ============ */}
      <section className="py-24 relative">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center mb-16">
              <span className="mb-4 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-400">
                The Problem
              </span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                The Silent Revenue Leak Killing Your Shopify Store
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mx-auto max-w-4xl grid grid-cols-1 gap-6 sm:grid-cols-3 mb-12">
              {[
                { end: 70, suffix: "%", label: "of shopping carts are abandoned before checkout" },
                { prefix: "Only ", end: 15, suffix: "%", label: "of Shopify stores have ANY email automation set up" },
                { prefix: "$", end: 0, suffix: "", label: "is what most stores recover from those abandoned carts" },
              ].map((stat, i) => (
                <Card key={i} className="text-center py-8" glow>
                  <div className="font-display text-5xl font-bold text-primary-400 sm:text-6xl">
                    <AnimatedCounter
                      end={stat.end}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </div>
                  <p className="mt-3 text-sm text-text-secondary px-2">
                    {stat.label}
                  </p>
                </Card>
              ))}
            </div>

            <div className="mx-auto max-w-2xl text-center">
              <p className="text-text-secondary leading-relaxed">
                Every day, potential customers visit your store, add products to
                their cart, and leave. No follow-up email. No reminder. No
                recovery attempt. That&apos;s money walking out the door &mdash;
                and for most Shopify stores doing $10K&ndash;$50K/month, it adds
                up to $3,000&ndash;$10,000 in lost revenue every single month.
              </p>
              <p className="mt-6 font-display text-xl font-bold text-text-primary sm:text-2xl">
                How much are <GradientText>YOU</GradientText> leaving on the
                table?
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ============ SECTION 3: THE SOLUTION ============ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-base via-bg-surface/50 to-bg-base" />
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center mb-16">
              <span className="mb-4 inline-block rounded-full border border-primary-600/30 bg-primary-600/10 px-4 py-1.5 text-sm font-medium text-primary-400">
                The Solution
              </span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                The Revenue Recovery System
              </h2>
              <p className="mt-4 text-lg text-text-secondary leading-relaxed">
                5 automated flows that run 24/7, recovering lost sales and
                driving repeat purchases &mdash; without you lifting a finger.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mx-auto max-w-5xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {flows.map((flow, i) => (
                <Card key={i} className="h-full" glow>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600/15 text-primary-400">
                    <flow.icon size={24} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-text-primary">
                    {flow.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    {flow.description}
                  </p>
                </Card>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ============ SECTION 4: VALUE STACK ============ */}
      <section className="py-24">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center mb-16">
              <span className="mb-4 inline-block rounded-full border border-primary-600/30 bg-primary-600/10 px-4 py-1.5 text-sm font-medium text-primary-400">
                The Offer
              </span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                Everything You Get
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mx-auto max-w-2xl">
              <div className="space-y-3">
                {valueStack.map((item, i) => (
                  <div key={i} className="glass flex items-center justify-between rounded-xl px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                        <Check size={14} className="text-green-400" />
                      </div>
                      <span className="text-sm text-text-primary sm:text-base">
                        {item.item}
                      </span>
                    </div>
                    <span className="ml-4 shrink-0 text-sm font-medium text-text-muted">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <p className="text-text-muted line-through text-lg">
                  Total Value: $5,150
                </p>
                <p className="mt-2 font-display text-4xl font-bold text-text-primary sm:text-5xl">
                  Your Investment:{" "}
                  <GradientText>$997</GradientText>
                </p>
                <p className="text-text-secondary mt-1">(one-time)</p>

                <div className="mt-8 mx-auto max-w-md glass rounded-[var(--radius-card)] p-6 border-green-500/20 border">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Shield size={20} className="text-green-400" />
                    <span className="font-display font-semibold text-text-primary">
                      Money-Back Guarantee
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    If your abandoned cart flow doesn&apos;t recover at least ONE
                    sale within 30 days, I&apos;ll refund you in full &mdash;
                    and you keep everything I built.
                  </p>
                </div>

                <div className="mt-8">
                  <Button
                    href="/contact"
                    size="lg"
                    icon={<ArrowRight size={18} />}
                  >
                    Contact Us &mdash; Let&apos;s Talk About Your Store
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ============ SECTION 6: HOW IT WORKS ============ */}
      <section className="py-24">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center mb-16">
              <span className="mb-4 inline-block rounded-full border border-primary-600/30 bg-primary-600/10 px-4 py-1.5 text-sm font-medium text-primary-400">
                Process
              </span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                How It Works &mdash; 3 Simple Steps
              </h2>
            </div>

            <div className="mx-auto max-w-5xl grid grid-cols-1 gap-8 md:grid-cols-3">
              {steps.map((step, i) => (
                <div key={i} className="relative text-center">
                  {i < steps.length - 1 && (
                    <div className="absolute top-10 left-[calc(50%+40px)] right-[calc(-50%+40px)] hidden border-t border-dashed border-white/10 md:block" />
                  )}
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-primary-600/30 bg-primary-600/10">
                    <span className="font-display text-2xl font-bold text-primary-400">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    {step.title}
                  </h3>
                  <span className="mt-1 inline-block text-xs font-medium text-primary-400 bg-primary-600/10 rounded-full px-3 py-1">
                    {step.time}
                  </span>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-12 text-center text-text-secondary">
              Your total time investment:{" "}
              <span className="font-medium text-text-primary">
                one 15-minute call + one final review
              </span>
              . That&apos;s it.
            </p>
            <div className="mt-6 text-center">
              <Button
                href="/contact"
                size="lg"
                icon={<ArrowRight size={18} />}
              >
                Get Started &mdash; Contact Us
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ============ SECTION 7: FAQ ============ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-base via-bg-surface/50 to-bg-base" />
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center mb-12">
              <span className="mb-4 inline-block rounded-full border border-primary-600/30 bg-primary-600/10 px-4 py-1.5 text-sm font-medium text-primary-400">
                FAQ
              </span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                Frequently Asked Questions
              </h2>
            </div>
          </ScrollReveal>

          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.q}
                answer={faq.a}
                isOpen={faqOpen === i}
                onToggle={() => setFaqOpen(faqOpen === i ? null : i)}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ============ SECTION 8: LEAD CAPTURE ============ */}
      <section id="playbook" className="py-24 scroll-mt-24">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center mb-12">
              <span className="mb-4 inline-block rounded-full border border-primary-600/30 bg-primary-600/10 px-4 py-1.5 text-sm font-medium text-primary-400">
                Get Started
              </span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                Take the First Step
              </h2>
            </div>
          </ScrollReveal>

          <div className="mx-auto max-w-lg glass rounded-[var(--radius-card)] p-8 border-primary-600/20 border">
            <h3 className="font-display text-2xl font-bold text-text-primary text-center">
              Get the Free $10K Email Playbook
            </h3>
            <p className="mt-2 text-center text-sm text-text-secondary mb-6">
              Discover the 5 email flows that top Shopify stores use to
              recover thousands in lost revenue every month.
            </p>
            <PlaybookForm />
          </div>
        </Container>
      </section>

      {/* ============ SECTION 9: FINAL CTA ============ */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-bg-base to-accent-900/40" />
        {/* Gradient orbs, hidden on mobile */}
        <div className="pointer-events-none absolute top-0 left-1/4 hidden h-96 w-96 rounded-full bg-primary-600/15 blur-[100px] opacity-30 sm:block animate-orb-1" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 hidden h-72 w-72 rounded-full bg-accent-600/15 blur-[100px] opacity-30 sm:block animate-orb-2" aria-hidden="true" />

        <Container className="relative z-10">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                Stop Losing Revenue.{" "}
                <GradientText>Start Recovering It.</GradientText>
              </h2>
              <p className="mt-4 text-lg text-text-secondary">
                One-time $997 investment. 5 automated flows. Results guaranteed.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  href="/contact"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                >
                  Contact Us
                </Button>
                <Button
                  href="#playbook"
                  variant="secondary"
                  size="lg"
                  icon={<Download size={18} />}
                >
                  Download the Playbook
                </Button>
              </div>
              <p className="mt-6 text-sm text-text-muted">
                No long-term contracts &bull; Full setup in 14 days &bull;
                Money-back guarantee
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}
