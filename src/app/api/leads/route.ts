import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const CALENDLY_URL = "https://calendly.com/creative-remotelyavailable/30min";

const leadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  source: z.string().max(120).optional(),
  painPoint: z.string().max(60).optional(),
});

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + 3600000 });
    return false;
  }

  if (entry.count >= 5) {
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

const painLabels: Record<string, string> = {
  emails: "Answering emails & enquiries",
  invoices: "Invoices & admin paperwork",
  "missed-calls": "Missed calls & follow-ups",
  content: "Social & content creation",
  leads: "Chasing & qualifying leads",
  other: "Something else",
};

export async function POST(request: Request) {
  try {
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

    const body = await request.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;
    const source = data.source ?? "website-lead-popup";
    const notifyEmail =
      process.env.NOTIFY_EMAIL || "hello@remotelyavailable.com";
    const firstName = data.name.trim().split(/\s+/)[0] || "there";

    // A lead is "delivered" if at least one channel accepted it. We try the
    // reliable SMTP notification first, then the optional Google Sheet webhook.
    let anyConfigured = false;
    let anyDelivered = false;

    // ── 1. Email notification straight to hello@ (reliable primary path) ──
    const transporter = getSmtpTransporter();
    if (transporter) {
      anyConfigured = true;
      try {
        // Notify Ali so he can follow up while the lead is warm.
        await transporter.sendMail({
          from: `"Website Leads" <${process.env.SMTP_USER}>`,
          to: notifyEmail,
          replyTo: data.email,
          subject: `New lead: ${data.name} (${source})`,
          text: [
            `New lead captured on the website`,
            ``,
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Source: ${source}`,
            data.painPoint
              ? `Pain point: ${painLabels[data.painPoint] || data.painPoint}`
              : ``,
            ``,
            `Reply within a few hours for the best close rate.`,
          ]
            .filter(Boolean)
            .join("\n"),
          html: `
            <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 560px;">
              <h2 style="color:#e38c35; margin:0 0 16px;">New Website Lead</h2>
              <table style="width:100%; border-collapse:collapse; font-size:15px;">
                <tr><td style="padding:6px 0; color:#666; width:110px;">Name</td><td style="padding:6px 0;">${data.name}</td></tr>
                <tr><td style="padding:6px 0; color:#666;">Email</td><td style="padding:6px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
                <tr><td style="padding:6px 0; color:#666;">Source</td><td style="padding:6px 0;">${source}</td></tr>
                ${
                  data.painPoint
                    ? `<tr><td style="padding:6px 0; color:#666;">Pain point</td><td style="padding:6px 0;">${painLabels[data.painPoint] || data.painPoint}</td></tr>`
                    : ``
                }
              </table>
              <p style="margin-top:20px; color:#666; font-size:13px;">Reply within a few hours for the best close rate.</p>
            </div>
          `,
        });

        // Drive the visitor to book a call right now while intent is highest.
        await transporter.sendMail({
          from: `"Ali at RemotelyAvailable" <${process.env.SMTP_USER}>`,
          to: data.email,
          replyTo: notifyEmail,
          subject: `${firstName}, let's book your free strategy call`,
          text: [
            `Hi ${firstName},`,
            ``,
            `Thanks for reaching out. The fastest way to get moving is a free 30-minute strategy call with me. Grab whatever time suits you here:`,
            ``,
            CALENDLY_URL,
            ``,
            `On the call we'll look at your business and map out exactly what to fix or automate first, so you walk away with a clear plan whether we work together or not.`,
            ``,
            `Prefer email? Just reply to this one and tell me what you're working on.`,
            ``,
            `Talk soon,`,
            `Ali Ameen`,
            `RemotelyAvailable`,
            `https://remotelyavailable.com`,
          ].join("\n"),
          html: `
            <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; font-size:15px; line-height:1.6; color:#222; max-width:560px;">
              <p>Hi ${firstName},</p>
              <p>Thanks for reaching out. The fastest way to get moving is a free 30-minute strategy call with me. On it we'll look at your business and map out exactly what to fix or automate first, so you walk away with a clear plan whether we work together or not.</p>
              <p style="margin:28px 0;">
                <a href="${CALENDLY_URL}" style="display:inline-block; background:#e38c35; color:#1a1a1a; font-weight:700; text-decoration:none; padding:14px 28px; border-radius:9999px;">Book my free strategy call</a>
              </p>
              <p style="color:#666; font-size:13px;">Or copy this link: <a href="${CALENDLY_URL}">${CALENDLY_URL}</a></p>
              <p>Prefer email? Just reply to this one and tell me what you're working on.</p>
              <p>Talk soon,<br>Ali Ameen<br>RemotelyAvailable<br><a href="https://remotelyavailable.com">remotelyavailable.com</a></p>
            </div>
          `,
        });

        anyDelivered = true;
      } catch (err) {
        console.error("Lead email failed:", err);
      }
    }

    // ── 2. Optional: forward to a storage webhook (Google Sheet / n8n) ──
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;
    if (webhookUrl) {
      anyConfigured = true;
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            timestamp: new Date().toISOString(),
            source,
            painPoint: data.painPoint,
          }),
        });

        // Apps Script can return 200 while silently dropping the body on a
        // redirect, so also check the JSON body's own `ok` flag.
        let webhookOk = webhookResponse.ok;
        if (webhookOk) {
          try {
            const payload = await webhookResponse.json();
            if (payload && typeof payload.ok === "boolean") {
              webhookOk = payload.ok;
            }
          } catch {
            webhookOk = false;
          }
        }

        if (webhookOk) anyDelivered = true;
        else console.error("Lead webhook failed:", webhookResponse.status);
      } catch (err) {
        console.error("Lead webhook error:", err);
      }
    }

    // ── 3. Nothing configured (local dev): log and succeed so dev works ──
    if (!anyConfigured) {
      console.log("=== NEW LEAD CAPTURE ===");
      console.log("Name:", data.name);
      console.log("Email:", data.email);
      console.log("Source:", source);
      console.log("========================");
      return NextResponse.json({ success: true });
    }

    // Configured but every channel failed: tell the client so it can show a
    // real error instead of a false success.
    if (!anyDelivered) {
      return NextResponse.json(
        { error: "Failed to process. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
