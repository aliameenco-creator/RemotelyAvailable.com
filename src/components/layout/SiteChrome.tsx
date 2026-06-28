"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LeadCapturePopup } from "@/components/popups/LeadCapturePopup";

// Wraps page content with the marketing chrome (nav, footer, lead popup),
// but renders a bare shell for app surfaces like the admin dashboard.
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname?.startsWith("/dashboard");

  if (bare) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <LeadCapturePopup />
    </>
  );
}
