import type { Metadata } from "next";
import ShopifyAutomationClient from "./ShopifyAutomationClient";

export const metadata: Metadata = {
  title: "Shopify Email Automation | Recover Lost Revenue | Remotely Available",
  description:
    "I build automated Klaviyo email systems for Shopify stores that recover abandoned carts, drive repeat purchases, and add $3K-$10K/month in autopilot revenue. Free audit available.",
  keywords: [
    "shopify email automation",
    "shopify abandoned cart recovery",
    "klaviyo email flows",
    "shopify revenue recovery",
    "ecommerce email marketing",
    "shopify automation",
    "abandoned cart emails",
    "email marketing shopify",
  ],
  openGraph: {
    title: "Shopify Email Automation | Recover Lost Revenue",
    description:
      "Automated Klaviyo email systems for Shopify stores that recover abandoned carts and add $3K-$10K/month in autopilot revenue.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopify Email Automation | Recover Lost Revenue",
    description:
      "Automated Klaviyo email systems for Shopify stores that recover abandoned carts and add $3K-$10K/month in autopilot revenue.",
  },
};

export default function ShopifyAutomationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Shopify Email Automation",
    description:
      "Automated Klaviyo email systems for Shopify stores — abandoned cart recovery, welcome series, post-purchase flows, browse abandonment, and win-back campaigns.",
    provider: {
      "@type": "Organization",
      name: "Remotely Available",
      url: "https://remotelyavailable.com",
    },
    serviceType: "Email Marketing Automation",
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      price: "997",
      priceCurrency: "USD",
      description:
        "One-time setup of 5 automated Klaviyo email flows with 30-day optimisation",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ShopifyAutomationClient />
    </>
  );
}
