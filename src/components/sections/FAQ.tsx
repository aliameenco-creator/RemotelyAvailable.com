"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { cn } from "@/lib/utils";
import type { FAQ as FAQType } from "@/data/faq";

interface FAQProps {
  faqs: FAQType[];
  badge?: string;
  title?: string;
  description?: string;
}

export function FAQ({
  faqs,
  badge = "FAQ",
  title = "Frequently Asked Questions",
  description = "Everything you need to know about working with us. Can't find your answer? Book a call — we're happy to help.",
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24">
      <Container>
        <ScrollReveal>
          <SectionHeading badge={badge} title={title} description={description} />
        </ScrollReveal>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="glass rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/[0.03]"
                  aria-expanded={openIndex === i}
                >
                  <span className="pr-4 text-sm font-medium text-text-primary sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "shrink-0 text-text-muted transition-transform duration-300",
                      openIndex === i && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 text-sm text-text-secondary leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
