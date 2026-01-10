const STORAGE_KEY = "ideas_page_state";
const INITIAL_LOAD_KEY = "ideas_initial_load";

export interface ArticlePageState {
  page: number;
  size: number;
  sort: "published_at" | "-published_at";
}

const DEFAULT_STATE: ArticlePageState = {
  page: 1,
  size: 10,
  sort: "-published_at",
};

export const isInitialLoad = (): boolean => {
  if (typeof window === "undefined") {
    return true;
  }

  try {
    const hasVisited = sessionStorage.getItem(INITIAL_LOAD_KEY);
    return !hasVisited;
  } catch (error) {
    console.error("Error reading from sessionStorage:", error);
    return true;
  }
};

export const markAsLoaded = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    sessionStorage.setItem(INITIAL_LOAD_KEY, "true");
  } catch (error) {
    console.error("Error writing to sessionStorage:", error);
  }
};

export const getArticlePageState = (): ArticlePageState => {
  if (typeof window === "undefined") {
    return DEFAULT_STATE;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        page: Number(parsed.page) || DEFAULT_STATE.page,
        size: Number(parsed.size) || DEFAULT_STATE.size,
        sort: parsed.sort === "published_at" ? "published_at" : "-published_at",
      };
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }

  return DEFAULT_STATE;
};

export const setArticlePageState = (state: Partial<ArticlePageState>): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const currentState = getArticlePageState();
    const newState: ArticlePageState = {
      ...currentState,
      ...state,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
};

export const resetArticlePageState = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
  } catch (error) {
    console.error("Error resetting localStorage:", error);
  }
};
