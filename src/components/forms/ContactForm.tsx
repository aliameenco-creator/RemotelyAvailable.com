"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  _hp: z.string().max(0).optional(), // honeypot
});

type ContactFormData = z.infer<typeof contactSchema>;

const serviceOptions = [
  { value: "ai-automations", label: "AI Workflow Automations" },
  { value: "ai-websites", label: "AI-Powered Websites" },
  { value: "ai-voice-agents", label: "AI Voice Agents" },
  { value: "ai-chatbots", label: "AI Chatbots & Virtual Assistants" },
  { value: "ai-consulting", label: "AI Strategy & Consulting" },
  { value: "ai-content-systems", label: "AI Content Systems" },
  { value: "other", label: "Not sure / Other" },
];

const budgetOptions = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-15k", label: "$5,000 - $15,000" },
  { value: "15k-50k", label: "$15,000 - $50,000" },
  { value: "50k-plus", label: "$50,000+" },
  { value: "not-sure", label: "Not sure yet" },
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [loadTime] = useState(Date.now());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    // Timing check — bots submit instantly
    if (Date.now() - loadTime < 3000) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass rounded-[var(--radius-card)] p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold text-text-primary">
          Message Sent!
        </h3>
        <p className="mt-2 text-text-secondary">
          Thanks for reaching out. We&apos;ll get back to you within 24
          hours with a tailored response.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass rounded-[var(--radius-card)] p-8 space-y-5"
    >
      {/* Honeypot - hidden from humans */}
      <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
        <input type="text" {...register("_hp")} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Name *"
          id="name"
          placeholder="Your name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email *"
          id="email"
          type="email"
          placeholder="you@company.com"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <Input
        label="Company"
        id="company"
        placeholder="Your company name (optional)"
        {...register("company")}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Select
          label="Service of Interest *"
          id="service"
          options={serviceOptions}
          error={errors.service?.message}
          {...register("service")}
        />
        <Select
          label="Budget Range"
          id="budget"
          options={budgetOptions}
          {...register("budget")}
        />
      </div>

      <Textarea
        label="Message *"
        id="message"
        placeholder="Tell us about your business, the challenges you're facing, and what you're hoping to achieve..."
        rows={5}
        error={errors.message?.message}
        {...register("message")}
      />

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-error/10 px-4 py-3 text-sm text-error">
          <AlertCircle size={16} />
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={status === "loading"}
        icon={<Send size={16} />}
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>

      <p className="text-xs text-text-muted">
        We&apos;ll respond within 24 hours. No spam, no mailing lists.
      </p>
    </form>
  );
}
