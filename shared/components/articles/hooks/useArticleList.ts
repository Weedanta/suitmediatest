import { useState, useEffect, useCallback, useRef } from "react";
import { fetchIdeas, type Article, type IdeasResponse } from "@/lib/api/ideas";
import {
  getArticlePageState,
  setArticlePageState,
  isInitialLoad,
  markAsLoaded,
  type ArticlePageState,
} from "../utils/articleStorageUtils";

interface UseArticleListProps {
  initialData?: IdeasResponse;
}

interface UseArticleListReturn {
  articles: Article[];
  loading: boolean;
  meta: IdeasResponse["meta"];
  page: number;
  size: number;
  sort: "published_at" | "-published_at";
  handleSortChange: (value: string) => void;
  handlePerPageChange: (value: string) => void;
  handlePageChange: (newPage: number) => void;
  getPageNumbers: () => (number | string)[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  startItem: number;
  endItem: number;
}

export const useArticleList = ({
  initialData,
}: UseArticleListProps): UseArticleListReturn => {
  const [isMounted, setIsMounted] = useState(false);
  const hasCheckedStorage = useRef(false);
  const hasUsedInitialDataRef = useRef(false);

  const hasValidInitialData =
    initialData?.data &&
    Array.isArray(initialData.data) &&
    initialData.data.length > 0 &&
    initialData.meta &&
    typeof initialData.meta.total === "number";

  const [pageState, setPageState] = useState<ArticlePageState>(() => {
    return { page: 1, size: 10, sort: "-published_at" };
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    if (hasValidInitialData && initialData?.data) {
      return initialData.data;
    }
    return [];
  });
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState(() => {
    if (hasValidInitialData && initialData?.meta) {
      return initialData.meta;
    }
    return undefined;
  });

  const { page, size, sort } = pageState;

  useEffect(() => {
    setIsMounted(true);

    if (hasCheckedStorage.current) return;
    hasCheckedStorage.current = true;

    const initial = isInitialLoad();

    if (initial) {
      markAsLoaded();
      if (hasValidInitialData) {
        hasUsedInitialDataRef.current = true;
      }
      return;
    }

    const storedState = getArticlePageState();
    const isStateDifferent =
      storedState.page !== pageState.page ||
      storedState.size !== pageState.size ||
      storedState.sort !== pageState.sort;

    if (isStateDifferent) {
      setPageState(storedState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateState = useCallback((updates: Partial<ArticlePageState>) => {
    setPageState((prev: ArticlePageState) => {
      const newState = { ...prev, ...updates };
      setArticlePageState(newState);
      return newState;
    });
  }, []);

  const loadArticles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchIdeas({ page, size, sort });
      if (data && data.data && Array.isArray(data.data)) {
        setArticles(data.data);
        setMeta(data.meta);
      } else {
        console.warn("Received empty or invalid data from API");
        setArticles([]);
        setMeta(undefined);
      }
    } catch (error) {
      console.error("Failed to load articles:", error);
      setArticles([]);
      setMeta(undefined);
    } finally {
      setLoading(false);
    }
  }, [page, size, sort]);

  useEffect(() => {
    if (!isMounted) return;

    const isInitialState =
      page === 1 && size === 10 && sort === "-published_at";

    const shouldSkipLoad =
      isInitialState &&
      hasUsedInitialDataRef.current &&
      hasValidInitialData &&
      articles.length > 0 &&
      meta &&
      typeof meta.total === "number" &&
      meta.total > 0;

    if (shouldSkipLoad) {
      return;
    }

    loadArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, sort, isMounted]);

  const handleSortChange = (value: string) => {
    updateState({
      sort: value as "published_at" | "-published_at",
      page: 1,
    });
  };

  const handlePerPageChange = (value: string) => {
    updateState({
      size: parseInt(value, 10),
      page: 1,
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && meta && newPage <= (meta.last_page || 1)) {
      updateState({ page: newPage });
    }
  };

  const prevPageRef = useRef(page);
  const prevSortRef = useRef(sort);
  const prevSizeRef = useRef(size);
  const shouldScrollRef = useRef(false);

  useEffect(() => {
    if (!isMounted) return;

    const pageChanged = prevPageRef.current !== page;
    const sortChanged = prevSortRef.current !== sort;
    const sizeChanged = prevSizeRef.current !== size;

    if (pageChanged || sortChanged || sizeChanged) {
      shouldScrollRef.current = true;
      prevPageRef.current = page;
      prevSortRef.current = sort;
      prevSizeRef.current = size;
    }

    if (shouldScrollRef.current && !loading && articles.length > 0) {
      setTimeout(() => {
        const articleListSection = document.querySelector(
          "[data-article-list]"
        );
        if (articleListSection) {
          const offsetTop =
            articleListSection.getBoundingClientRect().top +
            window.pageYOffset -
            80;
          window.scrollTo({
            top: Math.max(0, offsetTop),
            behavior: "smooth",
          });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        shouldScrollRef.current = false;
      }, 100);
    }
  }, [page, sort, size, loading, articles.length, isMounted]);

  const totalPages = meta?.last_page || 1;
  const currentPage = meta?.current_page || page;
  const totalItems = meta?.total || 0;
  const startItem = totalItems > 0 ? (currentPage - 1) * size + 1 : 0;
  const endItem = Math.min(currentPage * size, totalItems);

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return {
    articles,
    loading,
    meta,
    page,
    size,
    sort,
    handleSortChange,
    handlePerPageChange,
    handlePageChange,
    getPageNumbers,
    totalPages,
    currentPage,
    totalItems,
    startItem,
    endItem,
  };
};
