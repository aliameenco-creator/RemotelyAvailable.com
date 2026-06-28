import type { Metadata } from "next";
import { ResourcesClient } from "./ResourcesClient";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Resources & Video Guides | Free AI Playbooks",
  description:
    "Free, practical video guides and playbooks on putting AI and automation to work in your business — no signup required.",
  openGraph: {
    title: "Resources & Video Guides | RemotelyAvailable",
    description:
      "Free video guides and downloadable playbooks on AI and automation for business owners.",
    url: `${siteConfig.url}/resources`,
  },
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
