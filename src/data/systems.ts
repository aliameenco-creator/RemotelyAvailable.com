import type { FAQ } from "@/data/faq";

export interface System {
  slug: string;
  title: string;
  category: string;
  description: string;
  detailDescription: string;
  price: number;
  pricePrefix?: string;
  libraryPriceSuffix?: string;
  detailPriceSuffix?: string;
  libraryImage: string;
  detailImage: string;
  detailImageFit?: "cover" | "contain";
  featured?: boolean;
  demandLabel?: string;
  prompt: string;
  highlights: string[];
  capabilities: string[];
  valueTitle: string;
  valueDescription: string;
  metric: string;
  workflow?: string[];
  workflowDescription?: string;
  painPoints?: {
    title: string;
    description: string;
  }[];
  painPointsTitle?: string;
  dataCollected?: string[];
  dataCollectedTitle?: string;
  idealFor?: string[];
  idealForDescription?: string;
  outcomes?: string[];
  pricingTiers?: {
    name: string;
    price: string;
    description: string;
    includes: string[];
    bestFor: string[];
    outcome: string;
  }[];
  supportPlan?: {
    name: string;
    price: string;
    description: string;
    includes: string[];
  };
  faqs: FAQ[];
}

export const systems: System[] = [
  {
    slug: "content-repurposing-system",
    title: "Content Repurposing System",
    category: "Content AI",
    description:
      "AI powered content repurposing system that turns existing social media carousel images into fresh, branded content for your own business or personal brand.",
    detailDescription:
      "Turn existing social media carousels into fresh, branded assets in minutes. Automate your visual content pipeline with enterprise-grade precision.",
    price: 29,
    libraryImage: "/images/systems/content-repurposing-library.jpg",
    detailImage: "/images/systems/content-repurposing-detail.jpg",
    featured: true,
    demandLabel: "High Demand",
    prompt:
      "What if you could take any carousel you like and instantly see it in your own brand style?",
    highlights: [
      "Repurposes carousel images into branded style",
      "Applies custom colors, layout, and tone",
      "Upload and refresh existing content",
    ],
    capabilities: [
      "Repurposes carousel images instantly",
      "Applies strict brand guidelines",
      "Nano Banana API integration",
      "Multi-platform formatting",
    ],
    valueTitle: "Time is Capital",
    valueDescription:
      "Stop manually recreating content. Our system saves up to 2 hours per carousel, allowing your creative team to focus on strategy rather than pixel-pushing. The core value lies in frictionless brand consistency at scale.",
    metric: "85% Reduction in production time",
    faqs: [
      {
        question: "What content can I repurpose with this system?",
        answer:
          "You can upload existing social media carousel images and refresh them into a new branded style for your business or personal brand.",
      },
      {
        question: "Can the output match my brand colors and visual style?",
        answer:
          "Yes. The system applies your custom colors, layout direction, typography, and tone so the refreshed content feels consistent with your brand.",
      },
      {
        question: "Do I need design experience to use it?",
        answer:
          "No. The workflow is designed to reduce manual design work. You provide the source carousel and brand direction, then the system generates the refreshed version.",
      },
      {
        question: "How much time can it save?",
        answer:
          "The system can save up to two hours per carousel by removing the need to manually rebuild layouts and reapply branding slide by slide.",
      },
      {
        question: "What is included in the monthly price?",
        answer:
          "The monthly price covers access to the content repurposing workflow. Use the setup button to contact us about onboarding and your brand configuration.",
      },
    ],
  },
  {
    slug: "ai-infographic-carousel-generation-system",
    title: "AI Infographic Carousel Generation System",
    category: "Content AI",
    description:
      "Turn a single idea into a polished, branded infographic carousel in seconds. Generate structured visual content without designing every slide manually.",
    detailDescription:
      "Type an idea, apply your brand style, and generate a complete editable infographic carousel in less than 20 seconds.",
    price: 19,
    libraryImage: "/images/systems/infographic-carousel-system.png",
    detailImage: "/images/systems/infographic-carousel-system.png",
    detailImageFit: "contain",
    demandLabel: "New",
    prompt:
      "What if one typed idea could become a complete branded infographic carousel in less than 20 seconds?",
    highlights: [
      "Turns one idea into a full infographic carousel",
      "Applies brand colors, fonts, logo, and style",
      "Exports polished ready-to-use visual content",
    ],
    capabilities: [
      "Generates branded carousels in under 20 seconds",
      "Supports reusable Brand Kits for multiple styles",
      "Edits slides through simple text prompts",
      "Exports ready-to-use visuals for multiple platforms",
    ],
    valueTitle: "From Idea to Carousel",
    valueDescription:
      "Stop spending hours writing, designing, formatting, and adjusting every slide. This system transforms a typed idea into a structured, presentation-ready infographic carousel while keeping your branding consistent across every output.",
    metric: "Complete branded carousel in under 20 seconds",
    faqs: [
      {
        question: "What do I need to provide to generate a carousel?",
        answer:
          "Start with a topic, idea, lesson, framework, or piece of content. Select your brand style and the system turns it into a structured infographic carousel.",
      },
      {
        question: "How quickly can the system generate an infographic carousel?",
        answer:
          "The workflow is designed to generate a polished branded carousel in less than 20 seconds, giving you a fast starting point for visual content.",
      },
      {
        question: "Can I use different brand styles?",
        answer:
          "Yes. You can save Brand Kits with colors, font direction, logo, tone of voice, slide style, and design rules for different brands or campaigns.",
      },
      {
        question: "Can I edit a slide after it is generated?",
        answer:
          "Yes. You can request changes with simple prompts, such as making a title larger, changing a bullet, adding spacing, or using a cleaner layout.",
      },
      {
        question: "Where can I use the exported carousels?",
        answer:
          "The exported visuals can be used across social media, websites, presentations, client content, and marketing campaigns.",
      },
    ],
  },
  {
    slug: "leadgen-automation-pro",
    title: "LeadGen Automation Pro",
    category: "Sales AI",
    description:
      "Find targeted businesses in bulk, identify decision-makers, collect contact details, and prepare stronger outreach opportunities from one automated prospecting workflow.",
    detailDescription:
      "Turn niche and location targeting into an organized, outreach-ready pipeline of relevant businesses, decision-makers, verified contact details, and useful sales context.",
    price: 39,
    libraryImage: "/images/systems/leadgen-automation-pro.png",
    detailImage: "/images/systems/leadgen-automation-pro.png",
    detailImageFit: "contain",
    demandLabel: "New",
    prompt:
      "What if you could find hundreds of targeted business leads without manually searching one by one?",
    highlights: [
      "Scrapes targeted leads by niche and location",
      "Finds decision-makers, emails, and phone numbers",
      "Organizes context and outreach angles in one place",
    ],
    capabilities: [
      "Builds targeted lead lists in bulk",
      "Identifies owners and key decision-makers",
      "Extracts available emails and phone numbers",
      "Reviews online presence for better outreach angles",
    ],
    valueTitle: "Better Leads, Faster Research",
    valueDescription:
      "Stop losing hours to manual prospecting. LeadGen Automation Pro brings business discovery, contact enrichment, website review, and outreach preparation into one repeatable workflow so your team can spend more time starting conversations and closing clients.",
    metric: "Less manual research, stronger personalized outreach",
    workflow: [
      "Enter your target niche and location",
      "Find relevant businesses in bulk",
      "Identify owners and decision-makers",
      "Extract available emails and phone numbers",
      "Review online presence and improvement opportunities",
      "Start outreach with a cleaner, more relevant lead list",
    ],
    workflowDescription:
      "Turn lead generation into a clear, repeatable sales prospecting workflow.",
    painPoints: [
      {
        title: "Manual prospecting takes too long",
        description:
          "Searching listings, websites, LinkedIn profiles, contacts, and spreadsheets one business at a time can consume days.",
      },
      {
        title: "Generic lead lists create weak outreach",
        description:
          "Basic company names and generic inboxes make it difficult to reach the right person or start a useful conversation.",
      },
      {
        title: "Contact data is scattered",
        description:
          "Business details, decision-makers, websites, phone numbers, and sales context often sit across multiple platforms.",
      },
      {
        title: "Preparation steals time from selling",
        description:
          "Sales teams should focus on conversations, follow-ups, and closing clients instead of cleaning prospecting spreadsheets.",
      },
    ],
    dataCollected: [
      "Business name",
      "Website",
      "Location",
      "Industry or niche",
      "Business category",
      "Owner or decision-maker",
      "Available email",
      "Phone number",
      "Online presence notes",
      "Outreach angle",
      "Lead status",
    ],
    dataCollectedTitle: "Lead Record Data",
    idealFor: [
      "Agencies",
      "Freelancers",
      "Consultants",
      "Marketers",
      "Sales teams",
      "Website designers",
      "SEO providers",
      "Automation specialists",
    ],
    idealForDescription:
      "A practical prospecting engine for teams selling services to businesses.",
    outcomes: [
      "More targeted leads",
      "Better contact information",
      "Decision-maker details",
      "Useful business context",
      "Cleaner lead organization",
      "Faster outreach preparation",
    ],
    faqs: [
      {
        question: "How does LeadGen Automation Pro find leads?",
        answer:
          "Enter a target niche and location, such as dentists in London or law firms in New York. The system finds relevant businesses and organizes them into a prospecting list.",
      },
      {
        question: "What information can the lead records include?",
        answer:
          "Lead records can include business name, website, location, category, decision-maker details, available email, phone number, online-presence notes, outreach angle, and lead status.",
      },
      {
        question: "Can it identify owners or decision-makers?",
        answer:
          "The workflow helps identify the relevant owner, founder, CEO, director, manager, or key business contact where that information is available.",
      },
      {
        question: "Does it help with personalized outreach?",
        answer:
          "Yes. It collects business context such as website status, services, branding, and online presence so you can prepare more relevant sales angles.",
      },
      {
        question: "Who is LeadGen Automation Pro best suited for?",
        answer:
          "It is designed for agencies, freelancers, consultants, marketers, sales teams, website designers, SEO providers, and automation specialists.",
      },
      {
        question: "Are all contact details guaranteed to be available?",
        answer:
          "No. Contact availability depends on the public business information that can be found for each lead. The system helps enrich records where data is available.",
      },
    ],
  },
  {
    slug: "proposal-pro",
    title: "Proposal Pro",
    category: "Sales AI",
    description:
      "Generate professional branded proposals, share secure client links, collect digital signatures, download PDFs, and track approvals from one organized workflow.",
    detailDescription:
      "Create, brand, share, and get client proposals approved faster with AI-generated drafts, online signatures, PDF downloads, and proposal status tracking.",
    price: 19,
    libraryImage: "/images/systems/proposal-pro.png",
    detailImage: "/images/systems/proposal-pro.png",
    detailImageFit: "contain",
    demandLabel: "New",
    prompt:
      "What if proposal creation took minutes instead of hours, and clients could approve everything from one simple link?",
    highlights: [
      "Generates structured branded proposal drafts with AI",
      "Shares secure client links with digital approval",
      "Tracks drafts, sent proposals, and approvals",
    ],
    capabilities: [
      "Generates professional proposal drafts with AI",
      "Applies saved brand profiles and proposal styling",
      "Shares browser-based client proposal links",
      "Collects digital signatures and supports PDF download",
    ],
    valueTitle: "From Proposal to Approval",
    valueDescription:
      "Stop spending 1 to 3 hours writing, formatting, exporting, and tracking every proposal manually. Proposal Pro brings draft generation, brand styling, editing, secure sharing, online signatures, PDF downloads, and approval tracking into one professional sales workflow.",
    metric: "Better proposals, faster approvals, smoother sales",
    workflow: [
      "Enter client and project details",
      "Generate a structured proposal draft with AI",
      "Apply the correct saved brand profile",
      "Edit wording, scope, deliverables, timeline, and pricing",
      "Share a secure client-ready proposal link",
      "Collect a digital signature and approval",
      "Track status and download a PDF when needed",
    ],
    workflowDescription:
      "Move from client opportunity to signed approval with one organized proposal workflow.",
    painPointsTitle: "Built for the Real Proposal Bottlenecks",
    painPoints: [
      {
        title: "Writing proposals takes too long",
        description:
          "A professional proposal can take 1 to 3 hours when every section, price, deliverable, and next step is prepared manually.",
      },
      {
        title: "Blank-page writing slows sales down",
        description:
          "Turning a service offer into a clear, persuasive proposal is difficult when every document starts from scratch.",
      },
      {
        title: "Attachments create unnecessary friction",
        description:
          "PDF versions, email threads, manual follow-ups, and unclear approval status make the client experience slower.",
      },
      {
        title: "Manual signatures delay approvals",
        description:
          "Printing, signing, scanning, and emailing documents back makes it harder to move an interested client toward a decision.",
      },
    ],
    dataCollectedTitle: "Proposal Workflow Includes",
    dataCollected: [
      "Introduction",
      "Client problem",
      "Proposed solution",
      "Scope of work",
      "Deliverables",
      "Timeline",
      "Pricing",
      "Next steps",
      "Brand styling",
      "Shareable client link",
      "Digital approval",
      "PDF download",
    ],
    idealFor: [
      "Web design agencies",
      "AI automation agencies",
      "Freelancers",
      "Consultants",
      "Marketing agencies",
      "SEO providers",
      "Software service providers",
      "Client-facing sales teams",
    ],
    idealForDescription:
      "A professional proposal and approval system for service businesses that regularly send client offers.",
    outcomes: [
      "Faster proposal creation",
      "Better proposal structure",
      "Branded proposal design",
      "Easier client sharing",
      "Digital signatures",
      "Approval notifications",
      "Proposal status tracking",
      "A smoother client experience",
    ],
    faqs: [
      {
        question: "What information do I enter to create a proposal?",
        answer:
          "Provide the client details, project type, service information, offer, scope, pricing, and any relevant notes. Proposal Pro uses that information to create a structured first draft.",
      },
      {
        question: "Can I edit the proposal after AI generates it?",
        answer:
          "Yes. You can manually edit the wording, add sections, adjust the scope, change deliverables, update the timeline, and refine pricing before sharing it.",
      },
      {
        question: "Can Proposal Pro match my brand style?",
        answer:
          "Yes. Saved brand profiles can include your logo, colors, font direction, visual style, and proposal styling so each proposal feels consistent and professional.",
      },
      {
        question: "How does the client approve a proposal?",
        answer:
          "Send the client a secure proposal link. They can review the proposal online and provide a digital signature without creating an account.",
      },
      {
        question: "Can proposals be downloaded as PDFs?",
        answer:
          "Yes. Proposal Pro supports PDF downloads for offline review, documentation, and client records.",
      },
      {
        question: "Can I track proposal status?",
        answer:
          "Yes. The dashboard helps organize draft, sent, and approved proposals so you can manage client activity and follow up more effectively.",
      },
    ],
  },
  {
    slug: "intelligent-website-chatbots",
    title: "Intelligent Website Chatbots",
    category: "Customer AI",
    description:
      "Add a custom AI assistant to your website that answers questions, guides visitors, recommends products, captures leads, and helps more people take the next step.",
    detailDescription:
      "Give your website a branded 24/7 AI assistant that replies in seconds, answers customer questions, collects leads, recommends products, and guides visitors toward the right action.",
    price: 399,
    pricePrefix: "From ",
    libraryPriceSuffix: " setup",
    detailPriceSuffix: "one-time setup",
    libraryImage: "/images/systems/intelligent-website-chatbots.png",
    detailImage: "/images/systems/intelligent-website-chatbots.png",
    detailImageFit: "contain",
    demandLabel: "New",
    prompt:
      "What if your website could answer customer questions, collect leads, and guide visitors 24/7?",
    highlights: [
      "Replies to visitors and answers FAQs in seconds",
      "Captures and qualifies leads automatically",
      "Guides customers to services, products, or booking",
    ],
    capabilities: [
      "Provides 24/7 branded website assistance",
      "Answers questions using your business information",
      "Collects contact details and qualifies inquiries",
      "Recommends products and guides visitors to action",
    ],
    valueTitle: "Turn More Visitors Into Conversations",
    valueDescription:
      "Most website visitors leave silently when they cannot find an answer quickly. A custom website chatbot gives them an immediate place to ask questions, understand your offer, get product or service guidance, and share their contact details while they are still engaged.",
    metric: "Faster answers, better leads, smarter website experience",
    workflow: [
      "Visitor asks a question on your website",
      "The chatbot replies using your business information",
      "The visitor receives relevant service or product guidance",
      "The chatbot asks the right qualification questions",
      "Contact details are captured naturally in the conversation",
      "The visitor is directed to booking, contact, product, or checkout",
      "Your team follows up with a better-qualified opportunity",
    ],
    workflowDescription:
      "Turn passive website browsing into a guided customer conversation that continues even when your team is offline.",
    painPointsTitle: "Built for the Website Conversion Gaps",
    painPoints: [
      {
        title: "Visitors leave without asking",
        description:
          "Interested visitors often leave when they cannot find an answer quickly and do not want to wait for an email reply.",
      },
      {
        title: "Teams cannot reply around the clock",
        description:
          "Night-time, weekend, and busy-hour traffic can turn into missed inquiries when nobody is available to respond.",
      },
      {
        title: "Contact forms feel slow",
        description:
          "A static form asks visitors to wait. A chatbot can ask useful questions naturally while giving immediate guidance.",
      },
      {
        title: "Product choice creates friction",
        description:
          "Ecommerce visitors may leave when they are unsure about product differences, delivery, sizing, availability, or returns.",
      },
    ],
    dataCollectedTitle: "Lead Capture Fields",
    dataCollected: [
      "Name",
      "Email address",
      "Phone number",
      "Service interest",
      "Product interest",
      "Budget",
      "Location",
      "Message",
      "Preferred contact time",
      "Booking intent",
    ],
    idealFor: [
      "Service businesses",
      "Consultants",
      "Agencies",
      "Clinics",
      "Real estate companies",
      "Local businesses",
      "Appointment businesses",
      "Ecommerce stores",
      "Shopify stores",
      "WooCommerce stores",
    ],
    idealForDescription:
      "A custom website assistant for businesses that want faster answers, better lead capture, and a smoother path from visitor to inquiry or purchase.",
    outcomes: [
      "Faster customer replies",
      "24/7 visitor support",
      "More lead capture opportunities",
      "Reduced repeated questions",
      "Product and service guidance",
      "Better-qualified inquiries",
      "A more professional website",
      "A clearer path to booking or checkout",
    ],
    pricingTiers: [
      {
        name: "Basic Website Chatbot",
        price: "£399",
        description:
          "A professional chatbot for service businesses that need instant answers, lead capture, and visitor guidance.",
        includes: [
          "Custom branded website chatbot",
          "Business information and FAQ training",
          "Service information setup",
          "Lead capture and contact collection",
          "Website embed and launch testing",
          "Welcome message and call-to-action setup",
        ],
        bestFor: [
          "Service businesses",
          "Consultants",
          "Agencies",
          "Local businesses",
          "Clinics and salons",
        ],
        outcome:
          "A helpful website assistant that answers questions quickly and captures more inquiries.",
      },
      {
        name: "Ecommerce Product Chatbot",
        price: "£799",
        description:
          "A product-aware chatbot for online stores with up to 50 products that want to guide customers before checkout.",
        includes: [
          "Everything in the Basic package",
          "Product information setup for up to 50 products",
          "Product recommendation flow",
          "Delivery and return policy answers",
          "Size, category, and product guidance",
          "Cart and checkout direction",
        ],
        bestFor: [
          "Shopify stores",
          "WooCommerce stores",
          "Beauty and skincare brands",
          "Clothing stores",
          "Product-based businesses",
        ],
        outcome:
          "A smarter shopping assistant that helps customers understand products and move closer to purchase.",
      },
      {
        name: "Advanced Business Chatbot",
        price: "From £1,499",
        description:
          "A more advanced assistant for businesses that need deeper qualification, routing, integrations, or custom logic.",
        includes: [
          "Everything in the Basic package",
          "Advanced conversation flows",
          "Multi-step lead qualification",
          "Custom business logic and routing",
          "Custom data collection",
          "CRM, sheet, booking, or inquiry connection where needed",
        ],
        bestFor: [
          "B2B service providers",
          "Real estate companies",
          "High-ticket businesses",
          "Multi-service businesses",
          "Teams with complex inquiry handling",
        ],
        outcome:
          "A more complete AI assistant that qualifies leads and supports a deeper customer journey.",
      },
    ],
    supportPlan: {
      name: "Optional Monthly Support",
      price: "From £49/month",
      description:
        "Keep your chatbot updated, monitored, and improved as your website, services, pricing, or product information changes.",
      includes: [
        "Update chatbot answers and FAQs",
        "Add or update products and services",
        "Improve weak responses",
        "Adjust tone and lead questions",
        "Fix small issues",
        "Performance review and minor improvements",
      ],
    },
    faqs: [
      {
        question: "What can an intelligent website chatbot do?",
        answer:
          "It can answer customer questions, explain services, recommend products, collect contact details, qualify leads, and direct visitors toward booking, contact, product, or checkout pages.",
      },
      {
        question: "Will the chatbot match my website and brand?",
        answer:
          "Yes. The chatbot is styled around your brand colors, website design, tone of voice, business personality, welcome message, buttons, and calls to action.",
      },
      {
        question: "What information do you need to build the chatbot?",
        answer:
          "We typically need your website link, business information, services or products, FAQs, brand colors, logo, tone of voice, contact details, booking link if available, and any rules the chatbot should follow.",
      },
      {
        question: "Can the chatbot collect and qualify leads?",
        answer:
          "Yes. It can ask for contact details and qualification information such as service interest, budget, location, booking intent, and preferred contact time.",
      },
      {
        question: "Can it recommend ecommerce products?",
        answer:
          "Yes. The ecommerce package can be trained on up to 50 products and help visitors compare products, understand delivery or returns, and move toward the right item or checkout page.",
      },
      {
        question: "Can the chatbot connect to my existing tools?",
        answer:
          "The Advanced Business Chatbot can include CRM, spreadsheet, booking, or inquiry connections where needed, depending on your workflow.",
      },
      {
        question: "Is monthly support required?",
        answer:
          "No. Monthly support is optional, but it is recommended if you regularly change your products, services, pricing, FAQs, or website content.",
      },
    ],
  },
];

export function getSystem(slug: string) {
  return systems.find((system) => system.slug === slug);
}
