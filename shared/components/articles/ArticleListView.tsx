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
    <div className="w-full py-8 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <p className="text-sm text-gray-600">
            Showing {startItem} - {endItem} of {totalItems}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 whitespace-nowrap">
                Show per page:
              </label>
              <Select
                key={isMounted ? "mounted-size" : "unmounted-size"}
                options={PER_PAGE_OPTIONS}
                value={displaySize.toString()}
                onValueChange={onPerPageChange}
                className="w-24"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 whitespace-nowrap">
                Sort by:
              </label>
              <Select
                key={isMounted ? "mounted-sort" : "unmounted-sort"}
                options={SORT_OPTIONS}
                value={displaySort}
                onValueChange={onSortChange}
                className="w-32"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {articles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1 || loading}
              className="h-9 w-9"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="h-9 w-9"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {pageNumbers.map((pageNum, index) => (
              <React.Fragment key={index}>
                {pageNum === "..." ? (
                  <span className="px-2 text-gray-400">...</span>
                ) : (
                  <Button
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(pageNum as number)}
                    disabled={loading}
                    className={cn(
                      "h-9 w-9",
                      currentPage === pageNum && "bg-[#FF6B35] text-white"
                    )}
                  >
                    {pageNum}
                  </Button>
                )}
              </React.Fragment>
            ))}

            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
              className="h-9 w-9"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages || loading}
              className="h-9 w-9"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
