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
import { WorkflowDiagram } from "@/components/landing/WorkflowDiagram";
import { RoiCalculator } from "@/components/landing/RoiCalculator";
import { ActivityTicker } from "@/components/landing/ActivityTicker";
import { CaseStudySpotlight } from "@/components/landing/CaseStudySpotlight";
import { ServiceFinder } from "@/components/sections/ServiceFinder";
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
      <ActivityTicker />
      <StatBar />
      <WorkflowDiagram />
      <ToolsGrid />
      <ServicesPreview />
      <ServiceFinder />
      <Process />
      <RoiCalculator />
      <Team />
      <CaseStudySpotlight />
      <Testimonials />
      <CtaBand />
      <Faq />
    </>
  );
}
