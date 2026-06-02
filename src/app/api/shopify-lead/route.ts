import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { firstName, email, storeUrl } = await req.json();

    if (!firstName || !email || !storeUrl) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.EMAILOCTOPUS_API_KEY;
    const listId = process.env.EMAILOCTOPUS_SHOPIFY_LIST_ID;

    if (!apiKey || !listId) {
      console.error("EmailOctopus env vars not configured");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://emailoctopus.com/api/1.6/lists/${listId}/contacts`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          email_address: email,
          fields: {
            FirstName: firstName,
            StoreURL: storeUrl,
          },
          tags: ["Shopify Playbook Download"],
          status: "SUBSCRIBED",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorCode = errorData?.error?.code;

      // If they're already subscribed, treat it as success
      if (errorCode === "MEMBER_EXISTS_WITH_EMAIL_ADDRESS") {
        return NextResponse.json({ success: true });
      }

      console.error("EmailOctopus error:", errorData);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Shopify lead error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
