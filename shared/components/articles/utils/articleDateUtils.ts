export const formatArticleDate = (
  dateString: string | undefined | null
): string => {
  if (!dateString) {
    return "";
  }

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn("Invalid date string provided:", dateString);
      return "";
    }

    const formatted = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return formatted
      .split(" ")
      .map((part, index) => {
        if (index === 1) {
          return part.toUpperCase();
        }
        return part;
      })
      .join(" ");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};
