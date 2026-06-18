import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const action = searchParams.get("action");

    /**
     * Hidden host/admin mode:
     * returns all accepted guests
     */
    if (action === "allGuests") {
      const targetUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

      if (!targetUrl) {
        return NextResponse.json(
          {
            error: "Seat finder service is not configured.",
          },
          { status: 500 },
        );
      }

      const fetchUrl = `${targetUrl}?action=allGuests`;

      const response = await fetch(fetchUrl, {
        method: "GET",
      });

      const data = await response.json();

      return NextResponse.json(data);
    }

    /**
     * Guest seat finder search
     */
    if (!query) {
      return NextResponse.json({
        guests: [],
      });
    }

    const targetUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!targetUrl) {
      console.error("GOOGLE_APPS_SCRIPT_URL environment variable is missing.");
      return NextResponse.json({ error: "Seat finder service is not fully configured." }, { status: 500 });
    }

    // Google Apps Script expects GET requests for doGet
    // We append the query parameter to the apps script URL
    const fetchUrl = `${targetUrl}?action=findSeat&q=${encodeURIComponent(query)}`;

    const response = await fetch(fetchUrl, {
      method: "GET",
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
