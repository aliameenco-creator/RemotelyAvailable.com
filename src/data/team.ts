import type { VignetteVariant } from "@/components/services/ServiceVignette";

export type ExpertiseIcon = "brain" | "chart" | "education" | "code" | "design" | "megaphone";

export interface TeamMember {
  slug: string;
  name: string;
  /** Short role for cards, e.g. "AI Specialist · Business Strategist" */
  role: string;
  /** Longer role line for the profile hero */
  roleLine: string;
  image: string;
  imagePos: string;
  isFounder?: boolean;
  /** First-person intro paragraphs on the profile page */
  intro: string[];
  /** One-line hook used on roster cards */
  cardBio: string;
  expertise: {
    icon: ExpertiseIcon;
    title: string;
    desc: string;
    vignette: VignetteVariant;
  }[];
  /** Floating stat chip on the portrait */
  heroStat?: { value: string; label: string };
  youtube?: { handle: string; url: string };
  /** SEO */
  metaDescription: string;
}

export const teamMembers: TeamMember[] = [
  {
    slug: "ali-ameen",
    name: "Ali Ameen",
    role: "AI Specialist · Business Strategist",
    roleLine: "AI Specialist · Professional Business Strategist · Educator",
    image: "/team/team-2.jpg",
    imagePos: "center 32%",
    isFounder: true,
    intro: [
      "I build AI systems that do real work inside real businesses: automations that answer the phone, chase the invoices, qualify the leads, and hand your team back their week.",
      "I'm also the educator behind Agentic Ali, where 50,000+ students have learned how to put AI to work. Everything I teach in public is what my clients get in private. Strategy first, hype never.",
    ],
    cardBio:
      "The educator behind Agentic Ali, teaching 50,000+ students how to put AI to work in real businesses.",
    expertise: [
      {
        icon: "brain",
        title: "AI Systems Architecture",
        desc: "Designing and shipping the automations, voice agents, and chatbots that run inside real businesses. Wired into the tools you already use, monitored, and maintained.",
        vignette: "automation",
      },
      {
        icon: "chart",
        title: "Business Strategy",
        desc: "Every system starts with the commercial question, not the tech one: where is the margin leaking, and what's the fastest automation to plug it? Strategy first, then build.",
        vignette: "seo",
      },
      {
        icon: "education",
        title: "AI Education at Scale",
        desc: "Through Agentic Ali on YouTube, Ali has taught 50,000+ students how to actually use AI. The same playbooks his clients get, taught in public.",
        vignette: "content",
      },
    ],
    heroStat: { value: "50,000+", label: "students taught" },
    youtube: { handle: "@agenticali", url: "https://youtube.com/@agenticali" },
    metaDescription:
      "Ali Ameen is an AI specialist and professional business strategist, founder of RemotelyAvailable and the educator behind Agentic Ali with 50,000+ students.",
  },
];

export function getTeamMember(slug: string): TeamMember | undefined {
  return teamMembers.find((m) => m.slug === slug);
}
