import type { Article, ArticleImage } from "@/lib/api/ideas";

export const getArticleImageUrl = (article: Article): string | null => {
  const mediumImage = article.medium_image;
  const smallImage = article.small_image;

  // Get assets base URL from environment variable
  const assetsBaseUrl =
    process.env.NEXT_PUBLIC_ASSETS_BASE_URL || "https://assets.suitdev.com";

  const getUrlFromImageArray = (
    images: ArticleImage[] | undefined
  ): string | null => {
    if (!images || !Array.isArray(images) || images.length === 0) {
      return null;
    }

    const firstImage = images[0];
    if (!firstImage || !firstImage.url) {
      return null;
    }

    const url = firstImage.url.trim();
    if (url.length === 0) {
      return null;
    }

    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    if (url.startsWith("/")) {
      return `${assetsBaseUrl}${url}`;
    }

    return `${assetsBaseUrl}/${url}`;
  };

  const mediumUrl = getUrlFromImageArray(mediumImage);
  if (mediumUrl) {
    return mediumUrl;
  }

  const smallUrl = getUrlFromImageArray(smallImage);
  if (smallUrl) {
    return smallUrl;
  }

  return null;
};
