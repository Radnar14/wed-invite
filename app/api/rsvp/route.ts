import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const targetUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!targetUrl) {
      console.error("GOOGLE_APPS_SCRIPT_URL environment variable is missing.");
      return NextResponse.json({ error: "RSVP service is not fully configured." }, { status: 500 });
    }

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
  } catch (error: any) {
    console.error("RSVP API Route error:", error);
    return NextResponse.json({ error: error?.message || "An unexpected error occurred." }, { status: 500 });
  }
}
