import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/constants";

const service = services.find((s) => s.slug === "ai-voice-agents")!;

export const metadata: Metadata = {
  title: service.seo.title,
  description: service.seo.description,
  keywords: service.seo.keywords,
  openGraph: {
    title: service.seo.title,
    description: service.seo.description,
    url: `${siteConfig.url}/services/${service.slug}`,
  },
};

export default function AIVoiceAgentsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    serviceType: service.title,
    areaServed: "Worldwide",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageTemplate service={service} />
    </>
  );
}
