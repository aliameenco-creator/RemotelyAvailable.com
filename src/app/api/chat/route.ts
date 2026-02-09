import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, chatInput } = body;

    if (!sessionId || !chatInput || typeof chatInput !== "string") {
      return NextResponse.json(
        { error: "Invalid request. sessionId and chatInput are required." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;

    if (!webhookUrl) {
      console.log("=== CHAT MESSAGE (no webhook configured) ===");
      console.log("Session:", sessionId);
      console.log("Message:", chatInput);
      console.log("=============================================");

      return NextResponse.json({
        output:
          "Thanks for your message! Our chat system is being set up. In the meantime, feel free to reach out via our contact form or email us at hello@remotelyavailable.com.",
      });
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "sendMessage",
        sessionId,
        chatInput,
      }),
    });

    if (!response.ok) {
      console.error("Chat webhook failed:", response.status);
      return NextResponse.json(
        { error: "Failed to get response" },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ output: data.output || data.text || "" });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
