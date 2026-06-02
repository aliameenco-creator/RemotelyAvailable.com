export const siteConfig = {
  name: "RemotelyAvailable",
  url: "https://remotelyavailable.com",
  description:
    "We build AI automations, voice agents, chatbots, and intelligent websites that save businesses 40+ hours per week. Book a free strategy call.",
  tagline: "AI Systems That Actually Work",
  email: "hello@remotelyavailable.com",
  calendlyUrl: "https://calendly.com/creative-remotelyavailable/30min",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const serviceNavLinks = [
  { label: "AI Automations", href: "/services/ai-automations" },
  { label: "AI Websites", href: "/services/ai-websites" },
  { label: "AI Voice Agents", href: "/services/ai-voice-agents" },
  { label: "AI Chatbots", href: "/services/ai-chatbots" },
  { label: "AI Consulting", href: "/services/ai-consulting" },
  { label: "AI Content Systems", href: "/services/ai-content-systems" },
  { label: "Shopify Automation", href: "/services/shopify-automation", isNew: true },
] as const;

export const socialLinks = {
  twitter: "#",
  linkedin: "#",
  github: "#",
} as const;

export const chatConfig = {
  welcomeMessage:
    "Hi! I'm the RemotelyAvailable AI assistant. I'd love to learn about your business and how we can help with AI automation. What's your name?",
  botName: "RA Assistant",
  placeholder: "Type a message...",
} as const;

export const leadPopupConfig = {
  pageThreshold: 3,
  delayMs: 2000,
  heading: "Get a Free AI Automation Blueprint",
  subtext:
    "We'll send you a personalized plan showing how AI can save your business 40+ hours a week.",
} as const;
