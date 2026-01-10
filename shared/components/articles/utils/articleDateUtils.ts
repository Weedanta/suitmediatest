export const formatArticleDate = (
  dateString: string | undefined | null
): string => {
  if (!dateString) {
    return "";
  }

  try {
    return new Date(dateString)
      .toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .toUpperCase()
      .replace(/,/g, "");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};
