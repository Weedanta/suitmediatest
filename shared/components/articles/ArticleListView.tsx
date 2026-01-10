"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { ArticleCard } from "./ArticleCard";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SORT_OPTIONS, PER_PAGE_OPTIONS } from "./utils/articleUtils";
import { cn } from "@/lib/utils";
import type { Article } from "@/lib/api/ideas";
import { robotoCondensed } from "./utils/articleFont";

interface ArticleListViewProps {
  articles: Article[];
  loading: boolean;
  size: number;
  sort: "published_at" | "-published_at";
  page: number;
  totalPages: number;
  currentPage: number;
  startItem: number;
  endItem: number;
  totalItems: number;
  pageNumbers: (number | string)[];
  onSortChange: (value: string) => void;
  onPerPageChange: (value: string) => void;
  onPageChange: (newPage: number) => void;
}

export const ArticleListView: React.FC<ArticleListViewProps> = ({
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
  pageNumbers,
  onSortChange,
  onPerPageChange,
  onPageChange,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 0);
  }, []);

  const displaySize = isMounted ? size : 10;
  const displaySort = isMounted ? sort : "-published_at";

  return (
    <div
      className="w-full py-6 px-4 sm:py-8 sm:px-6 lg:px-8 bg-white"
      data-article-list
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-sm text-gray-600 font-medium">
            Showing {startItem} - {endItem} of {totalItems}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:items-center">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
              <label className="text-sm text-gray-600 font-medium whitespace-nowrap">
                Show per page:
              </label>
              <Select
                key={isMounted ? "mounted-size" : "unmounted-size"}
                options={PER_PAGE_OPTIONS}
                value={displaySize.toString()}
                onValueChange={onPerPageChange}
                className="w-full sm:w-24"
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
              <label className="text-sm text-gray-600 font-medium whitespace-nowrap">
                Sort by:
              </label>
              <Select
                key={isMounted ? "mounted-sort" : "unmounted-sort"}
                options={SORT_OPTIONS}
                value={displaySort}
                onValueChange={onSortChange}
                className="w-full sm:w-32"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6",
              robotoCondensed.className
            )}
          >
            {[...Array(size)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-[4/3] rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 w-24 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
                <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${page}-${size}-${sort}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6",
                robotoCondensed.className
              )}
            >
              {articles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 sm:gap-2 mt-6 sm:mt-8 overflow-x-auto pb-2 sm:pb-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1 || loading}
              className="h-8 w-8 sm:h-9 sm:w-9 shrink-0"
            >
              <ChevronsLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="h-8 w-8 sm:h-9 sm:w-9 shrink-0"
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>

            <div className="flex items-center gap-1 sm:gap-2">
              {pageNumbers.map((pageNum, index) => (
                <React.Fragment key={index}>
                  {pageNum === "..." ? (
                    <span className="px-1 sm:px-2 text-gray-400 text-sm shrink-0">
                      ...
                    </span>
                  ) : (
                    <Button
                      variant={currentPage === pageNum ? "default" : "ghost"}
                      size="sm"
                      onClick={() => onPageChange(pageNum as number)}
                      disabled={loading}
                      className={cn(
                        "h-8 min-w-8 sm:min-w-9 px-2 sm:px-3 text-sm shrink-0",
                        currentPage === pageNum && "bg-brand-primary text-white"
                      )}
                    >
                      {pageNum}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
              className="h-8 w-8 sm:h-9 sm:w-9 shrink-0"
            >
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages || loading}
              className="h-8 w-8 sm:h-9 sm:w-9 shrink-0"
            >
              <ChevronsRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
