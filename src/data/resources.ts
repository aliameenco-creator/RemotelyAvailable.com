import type { LineIconName } from "@/components/landing/LineIcon";
import type { PillTone } from "@/components/ui/Pill";

export const resourceCategories = [
  "All",
  "Getting Started",
  "AI Playbooks",
  "Automation Tutorials",
  "Voice & Chat",
  "Growth",
] as const;

export type ResourceCategory = (typeof resourceCategories)[number];

export interface VideoGuide {
  cat: Exclude<ResourceCategory, "All">;
  dur: string;
  title: string;
  tone: Extract<PillTone, "copper" | "lavender">;
}

export const featuredVideo = {
  dur: "23:10",
  title: "The 90-day AI roadmap: from first automation to a system that runs itself",
  description:
    "A full walkthrough of how we'd sequence AI inside a small-team business — what to automate first, what to wait on, and how to measure it.",
  tone: "copper" as const,
};

export const videos: VideoGuide[] = [
  { cat: "AI Playbooks", dur: "14:22", title: "The 40-hour audit: finding automatable work in any business", tone: "copper" },
  { cat: "Getting Started", dur: "8:05", title: "What AI can (and can't) do for a small team in 2026", tone: "lavender" },
  { cat: "Automation Tutorials", dur: "21:40", title: "Build your first lead-routing automation, start to finish", tone: "copper" },
  { cat: "Voice & Chat", dur: "17:12", title: "Designing an AI voice agent customers actually trust", tone: "lavender" },
  { cat: "Growth", dur: "11:58", title: "The content pipeline that 5×'d our output without losing voice", tone: "copper" },
  { cat: "AI Playbooks", dur: "19:30", title: "Choosing your first three automations (and what to skip)", tone: "lavender" },
  { cat: "Automation Tutorials", dur: "13:47", title: "Connecting your CRM, inbox, and calendar without code", tone: "copper" },
  { cat: "Getting Started", dur: "6:40", title: "AI vocabulary for owners: agents, RAG, fine-tuning, plainly", tone: "lavender" },
];

export interface Playbook {
  title: string;
  meta: string;
  icon: LineIconName;
}

export const playbooks: Playbook[] = [
  { title: "The AI Readiness Checklist", meta: "PDF · 12 pages", icon: "doc" },
  { title: "Automation ROI Calculator", meta: "Spreadsheet", icon: "chart" },
  { title: "Voice Agent Script Templates", meta: "PDF · 8 templates", icon: "mic" },
  { title: "Vendor Evaluation Scorecard", meta: "PDF · 1 page", icon: "check" },
];
