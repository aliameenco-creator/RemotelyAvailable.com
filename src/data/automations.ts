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
      "Generates high-quality, multi-image LinkedIn carousels in seconds from a single input — built for creators and agencies who need to publish consistently.",
    highlight: "11-second generation — scales to hundreds of posts",
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
      "AI-generated client proposals with a shareable e-sign link, automatic notifications, and signature capture — the full proposal flow end to end.",
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
      "Auto-generates a fully branded video intro in minutes from a channel's existing brand guidelines — no manual editing required.",
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
      "An all-in-one company operations platform with role-based access for CEO, HR, and team members — covering team management, HR workflows, and daily operations in a single dashboard.",
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
      "Auto-generates Upwork proposals tailored to exact services offered — copy-and-send ready text for every job post.",
    highlight: "Copy-and-send proposals in seconds",
    techStack: ["Claude API", "OpenAI API", "n8n"],
    status: "built",
    useCase: "Freelancers and agencies bidding on Upwork.",
  },
];
