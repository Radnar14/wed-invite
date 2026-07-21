import { NextResponse } from "next/server";

const MAX_QUERY_LENGTH = 100;
const ALLOWED_ACTIONS = new Set(["allGuests", "groupSummary"]);

function isSafeQuery(value: string | null): value is string {
  if (!value) {
    return false;
  }

  return value.length <= MAX_QUERY_LENGTH && /^[\p{L}\p{N}\s.'-]{1,100}$/u.test(value);
}

function isValidExternalUrl(value: string | undefined): value is string {
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

export async function GET(request: Request) {
  if (request.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed." }, { status: 405, headers: { Allow: "GET" } });
  }

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const action = searchParams.get("action");

    if (action && !ALLOWED_ACTIONS.has(action)) {
      return NextResponse.json({ error: "Invalid action parameter." }, { status: 400 });
    }

    /**
     * Hidden host/admin mode:
     * returns all accepted guests
     */
    if (action === "allGuests" || action === "groupSummary") {
      const targetUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

      if (!isValidExternalUrl(targetUrl)) {
        console.error("GOOGLE_APPS_SCRIPT_URL environment variable is missing or invalid.");
        return NextResponse.json(
          {
            error: "Seat finder service is not configured.",
          },
          { status: 500 },
        );
      }

      const fetchUrl = `${targetUrl}?action=${encodeURIComponent(action)}`;

      const response = await fetch(fetchUrl, {
        method: "GET",
        signal: AbortSignal.timeout(10000),
      });

      const data = await response.json();

      return NextResponse.json(data);
    }

    /**
     * Guest seat finder search
     */
    if (!isSafeQuery(query)) {
      return NextResponse.json({
        guests: [],
      });
    }

    const targetUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!isValidExternalUrl(targetUrl)) {
      console.error("GOOGLE_APPS_SCRIPT_URL environment variable is missing or invalid.");
      return NextResponse.json({ error: "Seat finder service is not fully configured." }, { status: 500 });
    }

    // Google Apps Script expects GET requests for doGet
    // We append the query parameter to the apps script URL
    const fetchUrl = `${targetUrl}?action=findSeat&q=${encodeURIComponent(query)}`;

    const response = await fetch(fetchUrl, {
      method: "GET",
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Apps Script request failed:", errorText);
      return NextResponse.json({ error: "Failed to search for guests." }, { status: response.status });
    }

    // The apps script returns JSON in the shape { guests: [...] }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error searching guests:", error);
    return NextResponse.json({ error: "Failed to search guests" }, { status: 500 });
  }
}
