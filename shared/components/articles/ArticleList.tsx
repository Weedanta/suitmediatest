"use client";

import React from "react";
import { ArticleListView } from "./ArticleListView";
import { useArticleList } from "./hooks/useArticleList";
import type { IdeasResponse } from "@/lib/api/ideas";

interface ArticleListProps {
  initialData?: IdeasResponse;
}

export const ArticleList: React.FC<ArticleListProps> = ({ initialData }) => {
  const {
    articles,
    loading,
    size,
    sort,
    page,
    totalPages,
    currentPage,
    startItem,
    endItem,
    totalItems,
    handleSortChange,
    handlePerPageChange,
    handlePageChange,
    getPageNumbers,
  } = useArticleList({ initialData });

  const pageNumbers = getPageNumbers();

  return (
    <ArticleListView
      articles={articles}
      loading={loading}
      size={size}
      sort={sort}
      page={page}
      totalPages={totalPages}
      currentPage={currentPage}
      startItem={startItem}
      endItem={endItem}
      totalItems={totalItems}
      pageNumbers={pageNumbers}
      onSortChange={handleSortChange}
      onPerPageChange={handlePerPageChange}
      onPageChange={handlePageChange}
    />
  );
};
