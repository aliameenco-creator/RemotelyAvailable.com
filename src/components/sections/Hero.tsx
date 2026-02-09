"use client";

import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { GradientOrb } from "@/components/effects/GradientOrb";
import { GridPattern } from "@/components/effects/GridPattern";
import { GradientText } from "@/components/ui/GradientText";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <GridPattern className="opacity-60" />
      <GradientOrb
        color="primary"
        size="lg"
        animation={1}
        className="top-1/4 -left-20"
      />
      <GradientOrb
        color="accent"
        size="lg"
        animation={2}
        className="bottom-1/4 -right-20"
      />
      <GradientOrb
        color="primary"
        size="md"
        animation={2}
        className="top-1/3 right-1/4"
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="mb-6 inline-block rounded-full border border-primary-600/30 bg-primary-600/10 px-4 py-1.5 text-sm font-medium text-primary-400">
              AI Automation Agency
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We Build{" "}
            <GradientText>AI Systems</GradientText>
            <br />
            That Actually Work
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Automations, voice agents, chatbots, and intelligent websites —
            engineered to save your team{" "}
            <span className="text-text-primary font-medium">40+ hours a week</span> and
            drive real business results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button href="/contact" size="lg" icon={<ArrowRight size={18} />}>
              Book a Free Strategy Call
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              See Our Services
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.p
            className="mt-6 text-sm text-text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            No commitment. 30-minute call. Real strategy.
          </motion.p>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
