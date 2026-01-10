import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const baseUrl = "https://suitmedia-backend.suitdev.com/api/ideas";
  const apiUrl = new URL(baseUrl);

  const page =
    searchParams.get("page[number]") ||
    searchParams.get("page") ||
    "1";
  const size =
    searchParams.get("page[size]") ||
    searchParams.get("size") ||
    "10";
  const sort = searchParams.get("sort") || "-published_at";

  apiUrl.searchParams.append("page[number]", page);
  apiUrl.searchParams.append("page[size]", size);
  apiUrl.searchParams.append("append[]", "small_image");
  apiUrl.searchParams.append("append[]", "medium_image");
  apiUrl.searchParams.append("sort", sort);

  try {
    const response = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      let errorData: string | object;
      const contentType = response.headers.get("content-type");
      
      try {
        if (contentType?.includes("application/json")) {
          errorData = await response.json();
        } else {
          errorData = await response.text();
        }
      } catch (parseError) {
        errorData = `Unable to parse error response: ${parseError}`;
      }

      console.error("Backend API Error:", response.status, errorData);
      
      return NextResponse.json(
        {
          error: "Failed to fetch ideas",
          status: response.status,
          details: typeof errorData === "string" ? errorData : JSON.stringify(errorData),
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API route handler:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === "string"
        ? error
        : "Unknown error occurred";
    
    return NextResponse.json(
      {
        error: "Internal server error",
        message: errorMessage,
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
