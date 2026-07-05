import { NextResponse } from "next/server";
import { z } from "zod";

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
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;

    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          timestamp: new Date().toISOString(),
          source: data.source ?? "website-lead-popup",
          painPoint: data.painPoint,
        }),
      });

      // Google Apps Script web apps can redirect a POST to a googleusercontent.com
      // URL, which drops the body and silently no-ops the script even though the
      // HTTP status is still 200. Check the JSON body's own `ok` flag too, not
      // just the HTTP status, so a silent failure surfaces as an error instead
      // of the site telling the visitor it worked.
      let webhookOk = webhookResponse.ok;
      if (webhookOk) {
        try {
          const payload = await webhookResponse.json();
          if (payload && typeof payload.ok === "boolean") {
            webhookOk = payload.ok;
          }
        } catch {
          // Non-JSON response (e.g. an HTML error page): treat as failure.
          webhookOk = false;
        }
      }

      if (!webhookOk) {
        console.error("Lead webhook failed:", webhookResponse.status);
        return NextResponse.json(
          { error: "Failed to process. Please try again." },
          { status: 500 }
        );
      }
    } else {
      console.log("=== NEW LEAD CAPTURE ===");
      console.log("Name:", data.name);
      console.log("Email:", data.email);
      console.log("========================");
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
