interface IdeasParams {
  page?: number;
  size?: number;
  sort?: "published_at" | "-published_at";
}

interface ArticleImage {
  id: number;
  mime: string;
  file_name: string;
  url: string;
}

interface Article {
  id: number;
  slug: string;
  title: string;
  content: string;
  published_at: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  small_image?: ArticleImage[];
  medium_image?: ArticleImage[];
  [key: string]: unknown;
}

interface IdeasResponse {
  data: Article[];
  links?: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

export const fetchIdeasServer = async (
  params: IdeasParams = {}
): Promise<IdeasResponse> => {
  const { page = 1, size = 10, sort = "-published_at" } = params;

  // Get API base URL from environment variable
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://suitmedia-backend.suitdev.com";
  const baseUrl = `${apiBaseUrl}/api/ideas`;
  const apiUrl = new URL(baseUrl);

  apiUrl.searchParams.append("page[number]", page.toString());
  apiUrl.searchParams.append("page[size]", size.toString());
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
      let errorMessage = `Failed to fetch ideas: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
        if (errorData.details) {
          console.error("Backend API Error Details:", errorData.details);
        }
      } catch {
        try {
          const errorText = await response.text();
          console.error("Backend API Error Response:", errorText);
        } catch {
          console.error("Unable to read error response");
        }
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching ideas from server:", error);
    if (
      error instanceof Error &&
      (error.message.includes("Failed to fetch") ||
        error.message.includes("NetworkError") ||
        error.message.includes("fetch failed"))
    ) {
      console.error("Network or fetch error - returning empty data");
      return { data: [], meta: undefined };
    }
    if (error instanceof Error) {
      throw error;
    }
    return { data: [], meta: undefined };
  }
};

export type { Article, ArticleImage, IdeasResponse, IdeasParams };
