import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  company: z.string().max(100).optional(),
  service: z.enum([
    "ai-automations",
    "ai-websites",
    "ai-voice-agents",
    "ai-chatbots",
    "ai-consulting",
    "ai-content-systems",
    "other",
  ]),
  budget: z
    .enum(["under-5k", "5k-15k", "15k-50k", "50k-plus", "not-sure"])
    .optional(),
  message: z.string().min(10).max(5000),
  _hp: z.string().max(0).optional(),
});

// Simple in-memory rate limiting (per-instance, resets on deploy)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + 3600000 }); // 1 hour window
    return false;
  }

  if (entry.count >= 3) {
    return true;
  }

  entry.count++;
  return false;
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse body
    const body = await request.json();

    // Validate
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Honeypot check — if filled, silently accept (fool bots)
    if (data._hp) {
      return NextResponse.json({ success: true });
    }

    // ── Send the message ──
    // Option 1: n8n webhook (configure N8N_WEBHOOK_URL in .env.local)
    // Option 2: Resend email (configure RESEND_API_KEY in .env.local)
    // Option 3: Log to console (default, for development)

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (webhookUrl) {
      // Forward to n8n for processing
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.N8N_WEBHOOK_SECRET
            ? { Authorization: `Bearer ${process.env.N8N_WEBHOOK_SECRET}` }
            : {}),
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company || "Not provided",
          service: data.service,
          budget: data.budget || "Not provided",
          message: data.message,
          timestamp: new Date().toISOString(),
          source: "website-contact-form",
        }),
      });

      if (!webhookResponse.ok) {
        console.error("Webhook failed:", webhookResponse.status);
        return NextResponse.json(
          { error: "Failed to process your message. Please try again." },
          { status: 500 }
        );
      }
    } else {
      // Development fallback — log to console
      console.log("═══ NEW CONTACT FORM SUBMISSION ═══");
      console.log("Name:", data.name);
      console.log("Email:", data.email);
      console.log("Company:", data.company || "N/A");
      console.log("Service:", data.service);
      console.log("Budget:", data.budget || "N/A");
      console.log("Message:", data.message);
      console.log("═══════════════════════════════════");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
