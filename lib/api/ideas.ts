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

export const fetchIdeas = async (
  params: IdeasParams = {}
): Promise<IdeasResponse> => {
  const { page = 1, size = 10, sort = "-published_at" } = params;

  const queryParams: string[] = [];
  queryParams.push(`page[number]=${page}`);
  queryParams.push(`page[size]=${size}`);
  queryParams.push("append[]=small_image");
  queryParams.push("append[]=medium_image");
  queryParams.push(`sort=${sort}`);

  const url = `/api/ideas?${queryParams.join("&")}`;

  try {
    const response = await fetch(url, {
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
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        try {
          const errorText = await response.text();
          if (errorText) {
            try {
              const parsedError = JSON.parse(errorText);
              errorMessage =
                parsedError.message || parsedError.error || errorMessage;
            } catch {
              errorMessage = errorText;
            }
          }
        } catch {
          console.error("Unable to read error response");
        }
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching ideas:", error);
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
