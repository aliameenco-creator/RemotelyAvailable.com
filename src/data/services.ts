export type ServiceIconName =
  | "workflow"
  | "globe"
  | "phone"
  | "message-square-text"
  | "lightbulb"
  | "file-text";

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
    slug: "ai-automations",
    title: "AI Workflow Automations",
    shortTitle: "AI Automations",
    tagline: "Eliminate repetitive tasks. Reclaim your team's time.",
    description:
      "We design and deploy custom AI-powered automations that connect your tools, eliminate manual work, and run your business on autopilot. From lead routing to invoicing, we automate the workflows that drain your team's hours.",
    icon: "workflow",
    features: [
      {
        title: "Multi-Platform Integration",
        description:
          "Connect 500+ apps including your CRM, email, calendar, and payment systems into one seamless workflow.",
      },
      {
        title: "AI-Powered Decision Making",
        description:
          "Intelligent routing that reads, classifies, and acts on data without human intervention.",
      },
      {
        title: "Error Handling & Monitoring",
        description:
          "Built-in failsafes, retry logic, and real-time alerts so your automations never silently break.",
      },
      {
        title: "Custom Triggers & Schedules",
        description:
          "Trigger workflows from webhooks, emails, form submissions, or run them on custom schedules.",
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
          "Design the automation logic, connect your tools, add AI layers, and build with enterprise-grade reliability.",
      },
      {
        step: 3,
        title: "Test & Deploy",
        description:
          "Rigorous testing with real data, edge case coverage, then deploy with monitoring dashboards.",
      },
      {
        step: 4,
        title: "Optimize & Scale",
        description:
          "Ongoing refinement based on performance data. Add new workflows as your needs grow.",
      },
    ],
    tools: ["n8n", "Zapier", "Make", "OpenAI", "Airtable", "Google Workspace"],
    faq: [
      {
        question: "What tools can you automate?",
        answer:
          "We work with 500+ platforms including CRMs (HubSpot, Salesforce), communication tools (Slack, email), databases (Airtable, Google Sheets), and payment processors (Stripe, QuickBooks). If it has an API, we can automate it.",
      },
      {
        question: "How long does it take to build an automation?",
        answer:
          "Simple automations take 1-2 weeks. Complex multi-step workflows with AI decision layers typically take 3-4 weeks. We prioritize getting your highest-impact automation live first.",
      },
      {
        question: "Will automations break if a tool updates?",
        answer:
          "We build with resilience in mind — error handling, retry logic, and monitoring alerts. We also offer ongoing maintenance plans to keep everything running smoothly.",
      },
    ],
    seo: {
      title:
        "AI Workflow Automation Services | n8n, Zapier, Make Experts",
      description:
        "Custom AI workflow automations using n8n, Zapier, and Make. Automate lead routing, data entry, reporting, and more. Save 40+ hours per week.",
      keywords: [
        "AI workflow automation",
        "n8n automation",
        "Zapier automation",
        "Make automation",
        "business process automation",
        "AI automation agency",
      ],
    },
  },
  {
    slug: "ai-websites",
    title: "AI-Powered Websites",
    shortTitle: "AI Websites",
    tagline: "Websites that think, adapt, and convert.",
    description:
      "We build high-performance websites enhanced with AI — from intelligent chatbots and personalized content to automated lead capture and dynamic user experiences. Not just a website, a conversion engine.",
    icon: "globe",
    features: [
      {
        title: "Intelligent Lead Capture",
        description:
          "AI-driven forms and chatbots that qualify visitors in real-time and route hot leads to your sales team instantly.",
      },
      {
        title: "Personalized User Experience",
        description:
          "Dynamic content that adapts to visitor behavior, industry, and intent for higher engagement.",
      },
      {
        title: "Lightning-Fast Performance",
        description:
          "Built with modern frameworks for sub-second load times, perfect Core Web Vitals, and top SEO scores.",
      },
      {
        title: "SEO-First Architecture",
        description:
          "Server-rendered pages, structured data, and semantic markup engineered to rank on Google from day one.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Strategy & Wireframes",
        description:
          "Define your goals, map the user journey, and design conversion-focused wireframes.",
      },
      {
        step: 2,
        title: "Design & Development",
        description:
          "Craft a stunning visual design, then build it with clean code and AI integrations.",
      },
      {
        step: 3,
        title: "AI Integration",
        description:
          "Add intelligent chatbots, dynamic content, lead scoring, and automated follow-ups.",
      },
      {
        step: 4,
        title: "Launch & Optimize",
        description:
          "Deploy with monitoring, then continuously A/B test and optimize for conversions.",
      },
    ],
    tools: ["Next.js", "React", "Tailwind CSS", "Vercel", "OpenAI", "Analytics"],
    faq: [
      {
        question: "What makes an AI website different from a regular website?",
        answer:
          "An AI-powered website actively works for your business — qualifying leads through conversational chatbots, personalizing content for each visitor, and automating follow-ups. A regular website just sits there.",
      },
      {
        question: "Do you redesign existing websites or only build new ones?",
        answer:
          "Both. We can rebuild from scratch or enhance your existing site with AI features. We'll recommend the best approach based on your current tech stack and goals.",
      },
      {
        question: "Will I be able to update the content myself?",
        answer:
          "Absolutely. We can integrate a headless CMS so your team can update content without touching code. We'll train your team on how to use it.",
      },
    ],
    seo: {
      title: "AI-Powered Web Development | Intelligent Websites",
      description:
        "We build AI-enhanced websites with intelligent chatbots, personalized content, and automated lead capture. Modern, fast, conversion-focused.",
      keywords: [
        "AI website development",
        "AI-powered websites",
        "intelligent web design",
        "AI web development agency",
        "conversion-focused website",
      ],
    },
  },
  {
    slug: "ai-voice-agents",
    title: "AI Voice Agents",
    shortTitle: "AI Voice Agents",
    tagline: "Your 24/7 AI receptionist that never misses a call.",
    description:
      "Deploy conversational AI voice agents that answer calls, qualify leads, book appointments, handle FAQs, and transfer to humans when needed — around the clock, in any language.",
    icon: "phone",
    features: [
      {
        title: "Natural Conversations",
        description:
          "Human-like voice AI that understands context, handles interruptions, and responds naturally — not a clunky IVR menu.",
      },
      {
        title: "Appointment Booking",
        description:
          "Integrates with your calendar to check availability and book meetings in real-time during the call.",
      },
      {
        title: "Lead Qualification",
        description:
          "Asks the right questions, scores leads, and routes qualified prospects directly to your sales team.",
      },
      {
        title: "Multi-Language Support",
        description:
          "Serve customers in 20+ languages without hiring multilingual staff.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Call Flow Design",
        description:
          "Map your ideal call scenarios, script conversation paths, and define handoff rules.",
      },
      {
        step: 2,
        title: "Voice Agent Build",
        description:
          "Configure the AI voice model, train on your business knowledge, integrate with your phone system.",
      },
      {
        step: 3,
        title: "Testing & Training",
        description:
          "Run hundreds of test calls, refine responses, and handle edge cases until the agent is flawless.",
      },
      {
        step: 4,
        title: "Deploy & Monitor",
        description:
          "Go live with call recording, transcription, analytics dashboard, and continuous improvement.",
      },
    ],
    tools: ["Vapi", "Twilio", "OpenAI", "ElevenLabs", "Google Calendar", "CRM Integration"],
    faq: [
      {
        question: "Does the voice sound robotic?",
        answer:
          "Not at all. We use the latest neural voice synthesis technology that sounds remarkably human — with natural pauses, intonation, and conversational flow.",
      },
      {
        question: "Can it transfer to a real person?",
        answer:
          "Yes. You define the rules — the AI handles routine calls and seamlessly transfers complex or high-value calls to your team with full context.",
      },
      {
        question: "What happens if the AI doesn't understand something?",
        answer:
          "We build graceful fallback paths — the agent will rephrase, ask for clarification, or offer to connect with a human. It never just hangs up.",
      },
    ],
    seo: {
      title:
        "AI Voice Agents | Conversational AI Phone Systems",
      description:
        "Deploy AI voice agents that handle inbound calls, qualify leads, book appointments, and provide 24/7 customer support. Human-like conversations at scale.",
      keywords: [
        "AI voice agents",
        "conversational AI",
        "AI phone system",
        "voice AI",
        "AI receptionist",
        "automated phone answering",
      ],
    },
  },
  {
    slug: "ai-chatbots",
    title: "AI Chatbots & Virtual Assistants",
    shortTitle: "AI Chatbots",
    tagline: "Trained on your data. Available 24/7.",
    description:
      "Custom AI chatbots trained on your business data using RAG technology. They answer customer questions, qualify leads, handle support tickets, and escalate to humans — all while learning and improving.",
    icon: "message-square-text",
    features: [
      {
        title: "Trained on Your Knowledge Base",
        description:
          "Upload docs, FAQs, product info — the chatbot learns your business and answers with accurate, on-brand responses.",
      },
      {
        title: "Lead Qualification & Capture",
        description:
          "Engage visitors in conversation, gather contact info, and score leads before your sales team ever picks up the phone.",
      },
      {
        title: "Support Ticket Reduction",
        description:
          "Resolve 80% of common questions instantly. Escalate only what needs a human touch.",
      },
      {
        title: "Multi-Channel Deployment",
        description:
          "Deploy on your website, WhatsApp, Slack, Instagram, or any platform your customers use.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Knowledge Ingestion",
        description:
          "We collect and structure your business data — docs, FAQs, product catalogs, past support tickets.",
      },
      {
        step: 2,
        title: "Bot Configuration",
        description:
          "Design conversation flows, set personality and tone, configure escalation rules and integrations.",
      },
      {
        step: 3,
        title: "RAG Pipeline Build",
        description:
          "Build the retrieval-augmented generation pipeline so the bot always answers from your verified data.",
      },
      {
        step: 4,
        title: "Deploy & Iterate",
        description:
          "Launch, monitor conversations, identify gaps, and continuously improve accuracy.",
      },
    ],
    tools: ["OpenAI", "Pinecone", "LangChain", "WhatsApp API", "Slack", "Custom Widgets"],
    faq: [
      {
        question: "How is this different from ChatGPT?",
        answer:
          "ChatGPT is a general-purpose AI. Our chatbots are trained specifically on YOUR business data, branded to match your company, and integrated with your tools. They know your products, your policies, and your customers.",
      },
      {
        question: "What if it gives wrong answers?",
        answer:
          "We use RAG (Retrieval-Augmented Generation) which grounds responses in your actual data, dramatically reducing hallucinations. Plus, we set confidence thresholds — if unsure, it escalates to a human.",
      },
      {
        question: "How much training data do I need?",
        answer:
          "Even a well-organized FAQ page is enough to start. The more quality content you have (docs, guides, past tickets), the smarter the bot becomes.",
      },
    ],
    seo: {
      title:
        "Custom AI Chatbots | RAG-Powered Business Assistants",
      description:
        "Custom AI chatbots trained on your business data using RAG technology. Reduce support tickets by 80%, qualify leads 24/7, and deploy across all channels.",
      keywords: [
        "AI chatbot development",
        "custom chatbot",
        "RAG chatbot",
        "business AI assistant",
        "AI customer support chatbot",
        "ChatGPT for business",
      ],
    },
  },
  {
    slug: "ai-consulting",
    title: "AI Strategy & Consulting",
    shortTitle: "AI Consulting",
    tagline: "A clear AI roadmap. No hype. Just ROI.",
    description:
      "Get a structured AI strategy built around your business goals. We audit your workflows, identify the highest-ROI automation opportunities, select the right tools, and deliver a prioritized implementation roadmap.",
    icon: "lightbulb",
    features: [
      {
        title: "Workflow Audit & Mapping",
        description:
          "We document every manual process across your teams and calculate the time and cost of each.",
      },
      {
        title: "Opportunity Scoring",
        description:
          "Rank automation opportunities by ROI, feasibility, and impact — so you invest in what matters most.",
      },
      {
        title: "Tool Selection",
        description:
          "Vendor-neutral recommendations for the right AI tools and platforms for your specific needs and budget.",
      },
      {
        title: "Implementation Roadmap",
        description:
          "A phased plan with timelines, resource requirements, and expected outcomes for each automation project.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Interviews",
        description:
          "Deep-dive into your operations. Interview key team members. Understand your goals, pain points, and tech stack.",
      },
      {
        step: 2,
        title: "Analysis & Scoring",
        description:
          "Map all workflows, score automation potential, calculate ROI projections for each opportunity.",
      },
      {
        step: 3,
        title: "Strategy Presentation",
        description:
          "Deliver a comprehensive strategy deck with prioritized recommendations and implementation timeline.",
      },
      {
        step: 4,
        title: "Implementation Support",
        description:
          "Optionally, we build the automations ourselves or guide your team through the execution.",
      },
    ],
    tools: ["Process Mapping", "ROI Analysis", "Tool Evaluation", "Roadmap Design"],
    faq: [
      {
        question: "Is this just a PowerPoint presentation?",
        answer:
          "No. You get a detailed operational audit, specific automation designs, ROI calculations per workflow, and a step-by-step implementation roadmap. It's an actionable blueprint, not a slide deck.",
      },
      {
        question: "Do I have to hire you to implement the recommendations?",
        answer:
          "No. The roadmap is yours to execute however you choose — with your internal team, with us, or with another vendor. Though most clients choose us because we already understand the context.",
      },
      {
        question: "How long does the consulting engagement take?",
        answer:
          "Typically 2-3 weeks from kickoff to final strategy delivery. Larger organizations with many departments may need 4-5 weeks.",
      },
    ],
    seo: {
      title:
        "AI Strategy Consulting | Implementation Roadmaps",
      description:
        "Get a clear AI strategy roadmap with ROI projections. We audit your workflows, identify automation opportunities, and plan implementation. No hype, just results.",
      keywords: [
        "AI consulting",
        "AI strategy",
        "AI implementation",
        "AI roadmap",
        "business AI consulting",
        "AI automation consulting",
      ],
    },
  },
  {
    slug: "ai-content-systems",
    title: "AI Content Systems",
    shortTitle: "AI Content",
    tagline: "Consistent content on autopilot.",
    description:
      "We build automated content generation and distribution pipelines. Research, draft, review, publish, repurpose, and track — all orchestrated through AI workflows that keep your content engine running without burning out your team.",
    icon: "file-text",
    features: [
      {
        title: "Automated Content Generation",
        description:
          "AI-powered drafting that maintains your brand voice across blog posts, social media, emails, and newsletters.",
      },
      {
        title: "Human-in-the-Loop Review",
        description:
          "AI drafts, humans approve. Every piece goes through your team before publishing — quality without the grind.",
      },
      {
        title: "Multi-Platform Distribution",
        description:
          "One piece of content automatically adapted and published across your blog, LinkedIn, Twitter, email, and more.",
      },
      {
        title: "Performance Analytics",
        description:
          "Track what performs, let AI suggest what to create next based on engagement data and trending topics.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Content Audit",
        description:
          "Analyze your current content, brand voice, audience, and competitors to define the content strategy.",
      },
      {
        step: 2,
        title: "Pipeline Design",
        description:
          "Build the automated workflow: research → draft → review → publish → repurpose → analyze.",
      },
      {
        step: 3,
        title: "AI Training & Calibration",
        description:
          "Fine-tune the AI on your brand voice, style guidelines, and approved content examples.",
      },
      {
        step: 4,
        title: "Launch & Refine",
        description:
          "Start the content engine, monitor quality, and refine based on performance data.",
      },
    ],
    tools: ["OpenAI", "n8n", "WordPress", "LinkedIn API", "Buffer", "Google Analytics"],
    faq: [
      {
        question: "Will the content sound AI-generated?",
        answer:
          "Not if we do our job right. We train the AI on your brand voice and existing best content. Plus, every piece goes through human review before publishing.",
      },
      {
        question: "How much content can the system produce?",
        answer:
          "As much as you need. Most clients run 3-5 blog posts per week, daily social posts, and weekly newsletters — all from a single content pipeline.",
      },
      {
        question: "Does this replace my content team?",
        answer:
          "No. It amplifies them. Your team focuses on strategy and high-value creative work while the AI handles research, first drafts, and distribution logistics.",
      },
    ],
    seo: {
      title:
        "AI Content Systems | Automated Content Pipelines",
      description:
        "Build automated content generation and distribution systems. AI-powered writing, scheduling, repurposing, and analytics pipelines. Consistent content without the burnout.",
      keywords: [
        "AI content automation",
        "AI content generation",
        "automated content pipeline",
        "AI content marketing",
        "AI writing system",
        "content automation agency",
      ],
    },
  },
];
