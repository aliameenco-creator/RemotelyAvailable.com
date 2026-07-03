import { Plus_Jakarta_Sans, Space_Mono } from "next/font/google";

// Body + UI, Plus Jakarta Sans. Display titles use Georgia (system serif).
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Eyebrows, labels, technical/data, Space Mono.
export const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});
