export const siteConfig = {
  name: "RemotelyAvailable",
  url: "https://remotelyavailable.com",
  description:
    "A digital agency that delivers results — web development, social media, design, SEO, and business automation. We handle the work so you get your time back. Book a free strategy call.",
  tagline: "We give you your time back",
  email: "hello@remotelyavailable.com",
  calendlyUrl: "https://calendly.com/creative-remotelyavailable/30min",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Automations", href: "/automations" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
] as const;

export const serviceNavLinks = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "Social Media", href: "/services/social-media-management" },
  { label: "AI Automation", href: "/services/ai-automations" },
  { label: "SEO & Content", href: "/services/seo-content" },
  { label: "Design", href: "/services/design" },
  { label: "Shopify Automation", href: "/services/shopify-automation", isNew: true },
] as const;

export const socialLinks = {
  twitter: "#",
  linkedin: "#",
  github: "#",
} as const;

export const chatConfig = {
  welcomeMessage:
    "Hi! I'm the RemotelyAvailable assistant. Tell me a bit about your business and what you're trying to get done — websites, social, design, SEO, or automation. What's your name?",
  botName: "RA Assistant",
  placeholder: "Type a message...",
} as const;

export const leadPopupConfig = {
  pageThreshold: 3,
  delayMs: 2000,
  heading: "Get a Free Growth Plan",
  subtext:
    "Tell us your biggest bottleneck and we'll send back a no-obligation plan to fix it — across web, content, design, or automation.",
} as const;
