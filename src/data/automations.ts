import type { PillTone } from "@/components/ui/Pill";

export type AutomationCategory =
  | "Content Automation"
  | "Lead Generation"
  | "Sales & Workflow"
  | "YouTube"
  | "Business Operations";

export type AutomationStatus = "built" | "in-progress";

export interface Automation {
  slug: string;
  name: string;
  category: AutomationCategory;
  description: string;
  purpose: string;
  highlight: string;
  techStack: string[];
  status: AutomationStatus;
  useCase: string;
  imageUrl?: string;
  link?: string;
}

export const automationCategories: AutomationCategory[] = [
  "Content Automation",
  "Lead Generation",
  "Sales & Workflow",
  "YouTube",
  "Business Operations",
];

export const automationCategoryLabels: Record<AutomationCategory, string> = {
  "Content Automation": "Content Automation",
  "Lead Generation": "Lead Generation",
  "Sales & Workflow": "Sales & Workflow",
  YouTube: "YouTube",
  "Business Operations": "Business Ops",
};

export const automationCategoryTones: Record<AutomationCategory, PillTone> = {
  "Content Automation": "lavender",
  "Lead Generation": "copper",
  "Sales & Workflow": "warning",
  YouTube: "neutral",
  "Business Operations": "copper",
};

export const automations: Automation[] = [
  {
    slug: "linkedin-buster",
    name: "LinkedIn Buster",
    category: "Content Automation",
    description:
      "Generates high-quality, multi-image LinkedIn carousels in seconds from a single input, built for creators and agencies who need to publish consistently.",
    purpose:
      "Creators and agencies lose hours manually designing every LinkedIn carousel. This collapses that into a single automated step so content shipping never becomes the bottleneck.",
    highlight: "11-second generation, scales to hundreds of posts",
    techStack: ["Claude API", "ReportLab", "n8n"],
    status: "built",
    useCase: "Creators and agencies running LinkedIn content.",
  },
  {
    slug: "lead-scraper",
    name: "Lead Scraper",
    category: "Lead Generation",
    description:
      "Scrapes leads tailored to exact intent and returns verified contact details of the actual business owner, not a generic employee.",
    purpose:
      "Generic lead lists waste outreach on the wrong person. This ensures every contact is the actual decision-maker, not a gatekeeper or unrelated employee.",
    highlight: "Pulls decision-maker phone & email directly",
    techStack: ["Apollo API", "Apify", "n8n", "Supabase"],
    status: "built",
    useCase: "Agencies and sales teams doing cold outreach.",
  },
  {
    slug: "proposal-pro",
    name: "Proposal Pro",
    category: "Sales & Workflow",
    description:
      "AI-generated client proposals with a shareable e-sign link, automatic notifications, and signature capture, the full proposal flow end to end.",
    purpose:
      "Manually writing, sending, and chasing signatures on proposals slows down deal velocity. This makes the entire flow instant and trackable, from brief to signature.",
    highlight: "From brief to signed proposal in one flow",
    techStack: ["Claude API", "OpenAI API", "n8n", "Supabase", "Next.js"],
    status: "built",
    useCase: "Agencies and freelancers closing clients.",
  },
  {
    slug: "youtube-research-tool",
    name: "YouTube Research Tool",
    category: "YouTube",
    description:
      "Researches a channel and its audience, then returns a ready title, description, tags, and thumbnail direction for the next upload.",
    purpose:
      "Guessing at titles, tags, and thumbnails wastes a video's best shot at reach. This replaces guesswork with data-backed direction before the video ever goes live.",
    highlight: "Powered by vidIQ's 2B+ data points",
    techStack: ["vidIQ API", "Claude API", "n8n"],
    status: "built",
    useCase: "YouTubers and content teams.",
  },
  {
    slug: "youtube-video-intro-automation",
    name: "YouTube Video Intro Automation",
    category: "YouTube",
    description:
      "Auto-generates a fully branded video intro in minutes from a channel's existing brand guidelines, no manual editing required.",
    purpose:
      "Manually editing a new intro for every video breaks channel consistency and burns hours. This keeps branding consistent without touching an editor.",
    highlight: "Branded intro rendered in minutes, zero editing",
    techStack: ["n8n", "Brand Asset Templates", "Video Automation"],
    status: "built",
    useCase: "Creators and channels with established branding.",
  },
  {
    slug: "helm",
    name: "Helm (ClickUp Alternative)",
    category: "Business Operations",
    description:
      "An all-in-one company operations platform with role-based access for CEO, HR, and team members, covering team management, HR workflows, and daily operations in a single dashboard.",
    purpose:
      "Small teams juggle three or four disconnected tools just to manage people and operations. This consolidates it into one role-aware dashboard.",
    highlight: "One dashboard replacing 3-4 separate tools",
    techStack: ["Next.js", "Supabase", "Vercel"],
    status: "in-progress",
    useCase: "Small businesses and agencies.",
  },
  {
    slug: "instagram-carousel-automation",
    name: "Instagram Carousel Automation",
    category: "Content Automation",
    description:
      "Generates high-quality Instagram carousels automatically from a single input, ready to post without manual design work.",
    purpose:
      "Designing carousels by hand doesn't scale with a real posting cadence. This turns one input into a ready-to-post carousel instantly.",
    highlight: "One input in, a full carousel out",
    techStack: ["ChatGPT API", "n8n"],
    status: "built",
    useCase: "Creators and brands posting on Instagram.",
  },
  {
    slug: "lead-to-website-auto-builder",
    name: "Lead-to-Website Auto-Builder",
    category: "Lead Generation",
    description:
      "Scrapes leads, scores their existing website, and auto-generates a new branded website for any lead scoring below threshold.",
    purpose:
      "Cold outreach targeting businesses with weak websites needs a compelling opener. This auto-builds the pitch-ready asset before the first email is even sent.",
    highlight: "Turns a weak website into a pitch-ready asset automatically",
    techStack: ["Gemini API", "Firecrawl", "Apify", "n8n"],
    status: "built",
    useCase: "Agencies pitching web design/redesign services.",
  },
  {
    slug: "upwork-proposal-automation",
    name: "Upwork Proposal Automation",
    category: "Sales & Workflow",
    description:
      "Auto-generates Upwork proposals tailored to exact services offered, copy-and-send ready text for every job post.",
    purpose:
      "Writing a tailored proposal for every job post takes time better spent on client work. This generates copy-and-send proposals instantly.",
    highlight: "Copy-and-send proposals in seconds",
    techStack: ["Claude API", "OpenAI API", "n8n"],
    status: "built",
    useCase: "Freelancers and agencies bidding on Upwork.",
  },
];

export function getAutomation(slug: string): Automation | undefined {
  return automations.find((automation) => automation.slug === slug);
}

export function getAdjacentAutomations(slug: string): {
  previous: Automation;
  next: Automation;
} {
  const index = automations.findIndex((automation) => automation.slug === slug);
  const previous =
    automations[(index - 1 + automations.length) % automations.length];
  const next = automations[(index + 1) % automations.length];
  return { previous, next };
}
