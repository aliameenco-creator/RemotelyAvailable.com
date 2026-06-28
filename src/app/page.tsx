import {
  Hero,
  StatBar,
  ToolsGrid,
  ServicesPreview,
  Process,
  Team,
  Testimonials,
  CtaBand,
  Faq,
} from "@/components/landing/LandingSections";
import { siteConfig } from "@/lib/constants";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.email,
      contactType: "sales",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <StatBar />
      <ToolsGrid />
      <ServicesPreview />
      <Process />
      <Team />
      <Testimonials />
      <CtaBand />
      <Faq />
    </>
  );
}
