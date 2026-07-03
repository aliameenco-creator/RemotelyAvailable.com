export type ServiceIconName =
  | "workflow"
  | "globe"
  | "phone"
  | "message-square-text"
  | "lightbulb"
  | "file-text"
  | "code"
  | "megaphone"
  | "palette"
  | "search";

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: ServiceIconName;
  features: { title: string; description: string }[];
  process: { step: number; title: string; description: string }[];
  tools: string[];
  faq: { question: string; answer: string }[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Websites that turn visitors into customers",
    shortTitle: "Web Development",
    tagline: "Fast, modern sites built to convert, not just look good.",
    description:
      "We design and build high-performance websites and web apps that load fast, rank well, and turn visitors into leads. Clean code, mobile-first, and built to grow with your business.",
    icon: "code",
    features: [
      {
        title: "Conversion-Focused Design",
        description:
          "Every page is built around a goal: get the call, capture the lead, make the sale. Not just a pretty brochure.",
      },
      {
        title: "Lightning-Fast Performance",
        description:
          "Modern frameworks and clean code for sub-second load times, smooth mobile experience, and top Core Web Vitals.",
      },
      {
        title: "SEO-First Architecture",
        description:
          "Server-rendered pages, structured data, and semantic markup so your site is built to rank from day one.",
      },
      {
        title: "Built-In Lead Capture",
        description:
          "Smart forms, booking links, and follow-up automation so visitors turn into conversations, not bounces.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Strategy & Wireframes",
        description:
          "We define your goals, map the customer journey, and design conversion-focused wireframes before any pixels.",
      },
      {
        step: 2,
        title: "Design & Build",
        description:
          "We craft a clean, on-brand design, then build it with fast, maintainable code and the integrations you need.",
      },
      {
        step: 3,
        title: "Launch & Handover",
        description:
          "We deploy, connect analytics, and hand you a site you (or we) can update easily, no developer lock-in.",
      },
      {
        step: 4,
        title: "Optimize & Grow",
        description:
          "Optional ongoing support: A/B testing, new pages, and performance tuning as your business grows.",
      },
    ],
    tools: ["Next.js", "React", "Tailwind CSS", "Vercel", "WordPress", "Webflow"],
    faq: [
      {
        question: "Do you build new sites or redesign existing ones?",
        answer:
          "Both. We can build from scratch or rebuild and modernize your existing site. We'll recommend the best path based on your current setup and goals.",
      },
      {
        question: "Will I be able to update content myself?",
        answer:
          "Yes. We can set you up with an easy editor or CMS so your team can update text and images without touching code, and we'll show you how.",
      },
      {
        question: "How long does a website take?",
        answer:
          "A focused landing page can be live in 1–2 weeks. A full multi-page site typically takes 3–6 weeks depending on scope and content readiness.",
      },
    ],
    seo: {
      title: "Web Development & Website Design Agency",
      description:
        "Fast, modern, conversion-focused websites and web apps. SEO-first builds that load fast, rank well, and turn visitors into leads.",
      keywords: [
        "web development agency",
        "website design",
        "custom website development",
        "Next.js development",
        "conversion-focused website",
        "small business website",
      ],
    },
  },
  {
    slug: "social-media-management",
    title: "Show up everywhere, without the daily grind",
    shortTitle: "Social Media",
    tagline: "Consistent content and engagement that actually grows your audience.",
    description:
      "We plan, create, and post content across your channels, engage your community, and track what works, so your brand stays visible and growing without you living inside the apps.",
    icon: "megaphone",
    features: [
      {
        title: "Content Strategy & Calendar",
        description:
          "A clear monthly plan mapped to your goals (what to post, where, and when) so you're never scrambling for ideas.",
      },
      {
        title: "Post Creation & Scheduling",
        description:
          "On-brand graphics, captions, and short-form video, written and scheduled across your platforms for you.",
      },
      {
        title: "Community Management",
        description:
          "We reply to comments and DMs, engage your audience, and keep the conversation going so followers feel heard.",
      },
      {
        title: "Reporting You Can Read",
        description:
          "Simple monthly reports on what grew, what landed, and what we're doing next, no vanity-metric noise.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Audit & Strategy",
        description:
          "We review your current presence and competitors, then define your voice, pillars, and posting cadence.",
      },
      {
        step: 2,
        title: "Content Plan",
        description:
          "We build a monthly content calendar you approve before anything goes live.",
      },
      {
        step: 3,
        title: "Create & Publish",
        description:
          "We design, write, schedule, and post, then manage the engagement that follows.",
      },
      {
        step: 4,
        title: "Report & Refine",
        description:
          "Each month we report on results and adjust the plan based on what's working.",
      },
    ],
    tools: ["Instagram", "Facebook", "LinkedIn", "TikTok", "Buffer", "Canva"],
    faq: [
      {
        question: "Which platforms do you manage?",
        answer:
          "Instagram, Facebook, LinkedIn, TikTok, and X. We'll recommend focusing on the two or three where your audience actually is, rather than spreading thin.",
      },
      {
        question: "Do you create the content or just schedule it?",
        answer:
          "We create it: graphics, captions, and short-form video, all on-brand. You approve the calendar before anything publishes.",
      },
      {
        question: "Can you use AI to speed up content?",
        answer:
          "Where it helps, yes (for drafting and repurposing), but everything is reviewed by a human and matched to your brand voice before it goes out.",
      },
    ],
    seo: {
      title: "Social Media Management Services",
      description:
        "Done-for-you social media management: content strategy, post creation, scheduling, and community management that grows your audience.",
      keywords: [
        "social media management",
        "social media agency",
        "social media marketing services",
        "content creation",
        "Instagram management",
        "social media for small business",
      ],
    },
  },
  {
    slug: "ai-automations",
    title: "Put your busywork on autopilot",
    shortTitle: "AI Automation",
    tagline: "The repetitive work that eats your week, handled.",
    description:
      "We connect your tools and add AI where it counts, so the manual work runs itself: leads followed up, calls answered, data moved between systems, and customers replied to around the clock. You keep the results; we handle the wiring.",
    icon: "workflow",
    features: [
      {
        title: "Workflow Automation",
        description:
          "Connect 500+ apps (CRM, email, calendar, payments) into automations that eliminate copy-paste and manual handoffs.",
      },
      {
        title: "AI Chatbots & Assistants",
        description:
          "Custom chatbots trained on your business data that answer customer questions, qualify leads, and cut support volume 24/7.",
      },
      {
        title: "AI Voice Agents",
        description:
          "Human-like voice agents that answer calls, book appointments, and qualify leads so you never miss an opportunity.",
      },
      {
        title: "Automated Follow-Up & Content",
        description:
          "Reply, nurture, and publish on autopilot, from lead follow-up sequences to scheduled content, with humans in the loop.",
      },
      {
        title: "Automation Audit & Roadmap",
        description:
          "Not sure where to start? We map your time-wasters and hand you a prioritized plan ranked by ROI before any build.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Workflow Audit",
        description:
          "We map every manual process costing your team time and identify the highest-ROI automation candidates.",
      },
      {
        step: 2,
        title: "Architecture & Build",
        description:
          "We design the logic, connect your tools, add AI layers where they earn their keep, and build for reliability.",
      },
      {
        step: 3,
        title: "Test & Deploy",
        description:
          "Rigorous testing with real data and edge cases, then deploy with monitoring so nothing silently breaks.",
      },
      {
        step: 4,
        title: "Optimize & Scale",
        description:
          "Ongoing refinement based on real performance. Add new automations as your needs grow.",
      },
    ],
    tools: ["n8n", "Zapier", "Make", "OpenAI", "Vapi", "Airtable"],
    faq: [
      {
        question: "What can you automate?",
        answer:
          "If it has an API, we can usually automate it: CRMs, email, calendars, spreadsheets, payments, support tools, and more. Common wins: lead routing, follow-up, data entry, invoicing, scheduling, and customer replies.",
      },
      {
        question: "Is this just 'AI hype'?",
        answer:
          "No. We only use AI where it genuinely beats a simpler approach. A lot of the highest-ROI automation is plain reliable plumbing between your tools. AI is added for the parts that need to read, decide, or converse.",
      },
      {
        question: "How long does it take to build?",
        answer:
          "Simple automations go live in 1–2 weeks. More complex multi-step workflows with AI decision layers typically take 3–4 weeks. We ship your highest-impact automation first.",
      },
      {
        question: "Will it break when a tool updates?",
        answer:
          "We build with error handling, retry logic, and monitoring alerts, and offer maintenance plans to keep everything running smoothly.",
      },
    ],
    seo: {
      title: "Business Process Automation & AI Systems | Automate Repetitive Work",
      description:
        "Custom business process automation with AI where it counts: workflow automation, chatbots, and voice agents. Automate lead follow-up, data entry, and customer replies.",
      keywords: [
        "business process automation",
        "workflow automation agency",
        "AI automation",
        "n8n automation",
        "Zapier automation",
        "AI chatbot",
        "AI voice agent",
        "automate repetitive tasks",
      ],
    },
  },
  {
    slug: "seo-content",
    title: "Get found by people already searching for you",
    shortTitle: "SEO & Content",
    tagline: "Rank higher, publish consistently, turn search traffic into leads.",
    description:
      "We optimize your site to rank for the terms your customers actually search, and produce the content that earns those rankings: blogs, landing pages, and on-page SEO that compounds over time instead of disappearing like ads.",
    icon: "search",
    features: [
      {
        title: "Keyword & Competitor Research",
        description:
          "We find the buyer-intent terms your customers type, and the gaps your competitors are leaving open.",
      },
      {
        title: "On-Page & Technical SEO",
        description:
          "Titles, structure, internal links, speed, and structured data fixed so Google can find and rank your pages.",
      },
      {
        title: "Content That Earns Rankings",
        description:
          "Blogs and landing pages written for real people and search engines, answering the questions that lead to sales.",
      },
      {
        title: "Tracking & Reporting",
        description:
          "We track rankings, traffic, and conversions so you can see search turning into actual leads, not just clicks.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Audit & Keyword Research",
        description:
          "We assess your current rankings and map the high-intent keywords worth targeting.",
      },
      {
        step: 2,
        title: "Strategy & Roadmap",
        description:
          "A prioritized plan: which pages to fix first, what content to publish, and in what order.",
      },
      {
        step: 3,
        title: "Produce & Optimize",
        description:
          "We write and optimize content, fix on-page and technical issues, and build internal links.",
      },
      {
        step: 4,
        title: "Track & Scale",
        description:
          "We monitor results and double down on what's ranking and converting.",
      },
    ],
    tools: ["Google Search Console", "Google Analytics", "Ahrefs", "Semrush", "WordPress"],
    faq: [
      {
        question: "How long until I see SEO results?",
        answer:
          "SEO compounds. Early movement on low-competition terms can show in 4–8 weeks; meaningful traffic growth typically takes 3–6 months. It's a long-term asset, not an overnight switch.",
      },
      {
        question: "Do you write the content too?",
        answer:
          "Yes. We handle research, writing, and on-page optimization. We can use AI to speed up drafting, but every piece is edited by a human and matched to your brand and accuracy standards.",
      },
      {
        question: "Can you fix an existing site or only new content?",
        answer:
          "Both. We start with technical and on-page fixes on what you already have, often the fastest wins, then build new content on top.",
      },
    ],
    seo: {
      title: "SEO & Content Marketing Services",
      description:
        "SEO and content marketing that gets you found by people already searching. Keyword research, on-page and technical SEO, and content that ranks and converts.",
      keywords: [
        "SEO services",
        "content marketing services",
        "search engine optimization agency",
        "on-page SEO",
        "content writing",
        "SEO for small business",
      ],
    },
  },
  {
    slug: "design",
    title: "A brand that looks the part",
    shortTitle: "Design",
    tagline: "Logos, brand identity, and visuals that make you look established.",
    description:
      "From logo and brand identity to marketing graphics and social assets, we create clean, professional design that builds trust and makes your business instantly recognizable.",
    icon: "palette",
    features: [
      {
        title: "Brand Identity & Logo",
        description:
          "A complete identity (logo, colors, fonts, and usage guidelines) so your brand looks consistent everywhere.",
      },
      {
        title: "Marketing & Ad Creative",
        description:
          "Scroll-stopping graphics for ads, landing pages, and campaigns, designed to get attention and clicks.",
      },
      {
        title: "Social Media Graphics",
        description:
          "Templates and post designs that keep your feed cohesive and on-brand without starting from scratch each time.",
      },
      {
        title: "Presentations & Pitch Decks",
        description:
          "Clean, persuasive decks and one-pagers that help you win clients, investors, and partners.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Moodboard",
        description:
          "We learn your business and audience, then align on direction with references and moodboards.",
      },
      {
        step: 2,
        title: "Concepts",
        description:
          "We present initial design concepts for your feedback: real options, not one take-it-or-leave-it.",
      },
      {
        step: 3,
        title: "Refine",
        description:
          "We polish the chosen direction through focused revision rounds until it's right.",
      },
      {
        step: 4,
        title: "Deliver Assets",
        description:
          "You receive all final files and a simple guide so anyone can use your brand correctly.",
      },
    ],
    tools: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Canva"],
    faq: [
      {
        question: "Do I get all the source files?",
        answer:
          "Yes. You own everything: final files in every format you need, plus the editable source files and a brand guide.",
      },
      {
        question: "How many revisions are included?",
        answer:
          "Each project includes defined revision rounds so we refine the work together. We agree on scope up front so there are no surprises.",
      },
      {
        question: "Can you match my existing brand?",
        answer:
          "Absolutely. We can work within your existing brand guidelines or evolve them, whichever fits your goals.",
      },
    ],
    seo: {
      title: "Graphic Design & Branding Services",
      description:
        "Professional graphic design and branding: logos, brand identity, marketing creative, and social graphics that make your business look established and trustworthy.",
      keywords: [
        "graphic design services",
        "brand design",
        "logo design",
        "branding agency",
        "marketing design",
        "social media graphics",
      ],
    },
  },
];
