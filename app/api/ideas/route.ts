import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const baseUrl = "https://suitmedia-backend.suitdev.com/api/ideas";
  const apiUrl = new URL(baseUrl);

  const page =
    searchParams.get("page[number]") || searchParams.get("page") || "1";
  const size =
    searchParams.get("page[size]") || searchParams.get("size") || "10";
  const sort = searchParams.get("sort") || "-published_at";

  apiUrl.searchParams.append("page[number]", page);
  apiUrl.searchParams.append("page[size]", size);
  apiUrl.searchParams.append("append[]", "small_image");
  apiUrl.searchParams.append("append[]", "medium_image");
  apiUrl.searchParams.append("sort", sort);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorData: string | object;
      const contentType = response.headers.get("content-type");

      try {
        if (contentType?.includes("application/json")) {
          errorData = await response.json();
        } else {
          errorData = await response.text();
        }
      } catch {
        errorData = "Unable to parse error response";
      }

      console.error("Backend API Error:", response.status, errorData);

      return NextResponse.json(
        {
          error: "Failed to fetch ideas",
          status: response.status,
          message:
            typeof errorData === "string"
              ? errorData
              : JSON.stringify(errorData),
        },
        { status: response.status }
      );
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      return NextResponse.json(
        {
          error: "Invalid response",
          message: "The API returned an invalid response format",
        },
        { status: 502 }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === "AbortError") {
      console.error("Request timeout:", apiUrl.toString());
      return NextResponse.json(
        {
          error: "Request timeout",
          message: "The request took too long to complete",
        },
        { status: 504 }
      );
    }

    console.error(
      "Error in API route handler:",
      error instanceof Error ? error.message : error
    );

    const isNetworkError =
      error instanceof Error &&
      (error.message.includes("fetch failed") ||
        error.message.includes("ECONNREFUSED") ||
        error.message.includes("ENOTFOUND") ||
        error.message.includes("ETIMEDOUT") ||
        error.message.includes("network") ||
        error.name === "AbortError");

    return NextResponse.json(
      {
        error: isNetworkError ? "Network error" : "Internal server error",
        message: isNetworkError
          ? "Unable to connect to the API server. Please check your network connection."
          : "An error occurred while fetching data. Please try again later.",
      },
      { status: isNetworkError ? 503 : 500 }
    );
  }
}
