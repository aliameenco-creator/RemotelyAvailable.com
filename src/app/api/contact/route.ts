import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const serviceLabels: Record<string, string> = {
  "ai-automations": "AI Workflow Automations",
  "ai-websites": "AI-Powered Websites",
  "ai-voice-agents": "AI Voice Agents",
  "ai-chatbots": "AI Chatbots & Virtual Assistants",
  "ai-consulting": "AI Strategy & Consulting",
  "ai-content-systems": "AI Content Systems",
  other: "Other / Not Sure",
};

const budgetLabels: Record<string, string> = {
  "under-5k": "Under $5,000",
  "5k-15k": "$5,000 – $15,000",
  "15k-50k": "$15,000 – $50,000",
  "50k-plus": "$50,000+",
  "not-sure": "Not sure yet",
};

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

function getSmtpTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
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

    const payload = {
      name: data.name,
      email: data.email,
      company: data.company || "Not provided",
      service: data.service,
      budget: data.budget || "Not provided",
      message: data.message,
      timestamp: new Date().toISOString(),
      source: "website-contact-form",
    };

    // ── 1. Forward to n8n webhook if configured ──
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.N8N_WEBHOOK_SECRET
            ? { Authorization: `Bearer ${process.env.N8N_WEBHOOK_SECRET}` }
            : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!webhookResponse.ok) {
        console.error("Webhook failed:", webhookResponse.status);
      }
    }

    // ── 2. Send notification email via SMTP ──
    const transporter = getSmtpTransporter();
    const notifyEmail = process.env.NOTIFY_EMAIL || "hello@remotelyavailable.com";

    if (transporter) {
      await transporter.sendMail({
        from: `"RemotelyAvailable" <${process.env.SMTP_USER}>`,
        to: notifyEmail,
        replyTo: data.email,
        subject: `New Inquiry from ${data.name} — ${serviceLabels[data.service] || data.service}`,
        text: [
          `New contact form submission`,
          ``,
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Company: ${data.company || "N/A"}`,
          `Service: ${serviceLabels[data.service] || data.service}`,
          `Budget: ${budgetLabels[data.budget || ""] || data.budget || "N/A"}`,
          ``,
          `Message:`,
          data.message,
          ``,
          `Submitted: ${payload.timestamp}`,
        ].join("\n"),
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #09090B; color: #FAFAFA;">
            <div style="background: #111114; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 32px;">
              <h2 style="margin: 0 0 20px; color: #5B7FEF; font-size: 20px;">New Contact Form Submission</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #71717A; width: 100px;">Name</td><td style="padding: 8px 0; color: #FAFAFA;">${data.name}</td></tr>
                <tr><td style="padding: 8px 0; color: #71717A;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #5B7FEF;">${data.email}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #71717A;">Company</td><td style="padding: 8px 0; color: #FAFAFA;">${data.company || "N/A"}</td></tr>
                <tr><td style="padding: 8px 0; color: #71717A;">Service</td><td style="padding: 8px 0; color: #FAFAFA;">${serviceLabels[data.service] || data.service}</td></tr>
                <tr><td style="padding: 8px 0; color: #71717A;">Budget</td><td style="padding: 8px 0; color: #FAFAFA;">${budgetLabels[data.budget || ""] || data.budget || "N/A"}</td></tr>
              </table>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08);">
                <p style="color: #71717A; margin: 0 0 8px; font-size: 13px;">Message</p>
                <p style="color: #A1A1AA; margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
              </div>
            </div>
          </div>
        `,
      });
    } else if (!webhookUrl) {
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
