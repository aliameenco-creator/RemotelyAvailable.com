import type { Metadata } from "next";
import { inter, outfit } from "@/lib/fonts";
import { siteConfig } from "@/lib/constants";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { LeadCapturePopup } from "@/components/popups/LeadCapturePopup";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — AI Automation Agency | Custom AI Solutions for Business`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI automation agency",
    "AI solutions for business",
    "business automation",
    "AI voice agents",
    "AI chatbots",
    "workflow automation",
    "AI consulting",
    "AI website development",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — AI Systems That Actually Work`,
    description: siteConfig.description,
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — AI Systems That Actually Work`,
    description: siteConfig.description,
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} font-body antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />

        <LeadCapturePopup />
      </body>
    </html>
  );
}
