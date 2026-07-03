"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LeadCapturePopup } from "@/components/popups/LeadCapturePopup";
import { SlideInLeadToast } from "@/components/popups/SlideInLeadToast";
import { AnalyticsListener } from "@/components/layout/AnalyticsListener";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { SpotlightListener } from "@/components/effects/SpotlightListener";

// Wraps page content with the marketing chrome (nav, footer, lead popup),
// but renders a bare shell for app surfaces like the admin dashboard.
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname?.startsWith("/dashboard");
  // High-intent local-SEO pages get the mobile sticky CTA bar.
  const stickyCta = pathname?.startsWith("/locations/");

  if (bare) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <AnalyticsListener />
      <SpotlightListener />
      <WhatsAppButton liftOnMobile={stickyCta} />
      {stickyCta && <StickyMobileCTA />}
      <SlideInLeadToast />
      <LeadCapturePopup />
    </>
  );
}
