import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // Old AI-branded service URLs → new outcome-led structure
      {
        source: "/services/ai-websites",
        destination: "/services/web-development",
        permanent: true,
      },
      {
        source: "/services/ai-content-systems",
        destination: "/services/seo-content",
        permanent: true,
      },
      {
        source: "/services/ai-voice-agents",
        destination: "/services/ai-automations",
        permanent: true,
      },
      {
        source: "/services/ai-chatbots",
        destination: "/services/ai-automations",
        permanent: true,
      },
      {
        source: "/services/ai-consulting",
        destination: "/services/ai-automations",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
