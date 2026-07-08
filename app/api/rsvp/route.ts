import { NextResponse } from "next/server";

const MAX_BODY_SIZE = 64 * 1024;

function isValidExternalUrl(value: string | undefined) {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed." }, { status: 405, headers: { Allow: "POST" } });
  }

  try {
    const contentLength = request.headers.get("content-length");
    if (contentLength && Number(contentLength) > MAX_BODY_SIZE) {
      return NextResponse.json({ error: "Request payload is too large." }, { status: 413 });
    }

    const text = await request.text();
    if (!text) {
      return NextResponse.json({ error: "Request body is required." }, { status: 400 });
    }

    let body: unknown;
    try {
      body = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Request body must be a JSON object." }, { status: 400 });
    }

    const targetUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!isValidExternalUrl(targetUrl)) {
      console.error("GOOGLE_APPS_SCRIPT_URL environment variable is missing or invalid.");
      return NextResponse.json({ error: "RSVP service is not fully configured." }, { status: 500 });
    }

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Apps Script request failed:", errorText);
      return NextResponse.json({ error: "Failed to submit RSVP to the database." }, { status: response.status });
    }

    const data = await response.json();

    // Forward Apps Script response directly
    if (data?.result === "success") {
      return NextResponse.json({
        result: "success",
        submissionType: data.submissionType,
      });
    }

    if (data?.result === "locked") {
      return NextResponse.json({
        result: "locked",
        guest: data.guest,
        // Group (representative) RSVPs return their finalized group here.
        group: data.group,
      });
    }

    console.error("Apps Script returned error:", data);

    return NextResponse.json(
      {
        result: "error",
        error: data?.error || "Failed to save RSVP details.",
      },
      { status: 400 },
    );
  } catch (error) {
    console.error("RSVP API Route error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
