"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Article } from "@/lib/api/ideas";
import { getArticleImageUrl } from "./utils/articleImageUtils";
import { formatArticleDate } from "./utils/articleDateUtils";

interface ArticleCardProps {
  article: Article;
  index: number;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, index }) => {
  const imageUrl = getArticleImageUrl(article);
  const publishedDate = formatArticleDate(article.published_at);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group cursor-pointer"
    >
      <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative w-full aspect-[4/3] bg-gray-200 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={article.title || "Article image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 p-4">
          <time className="text-sm text-gray-500 mb-2 uppercase">
            {publishedDate}
          </time>
          <h3
            className={cn(
              "text-base font-medium text-gray-900 line-clamp-3",
              "group-hover:text-[#FF6B35] transition-colors duration-200"
            )}
          >
            {article.title}
          </h3>
        </div>
      </div>
    </motion.article>
  );
};
