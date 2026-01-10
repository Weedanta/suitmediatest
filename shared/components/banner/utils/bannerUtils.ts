export const HEIGHT_CLASSES = {
  small: "h-[40vh] md:h-[30vh]",
  medium: "h-[50vh] md:h-[40vh]",
  large: "h-[60vh] md:h-[50vh] lg:h-[60vh]",
} as const;

export type BannerHeight = keyof typeof HEIGHT_CLASSES;

export const getImageSource = (
  image: string | { src: string; alt: string }
): string => {
  return typeof image === "string" ? image : image.src;
};

export const getImageAlt = (
  image: string | { src: string; alt: string },
  imageAlt?: string
): string => {
  if (imageAlt) return imageAlt;
  return typeof image === "object" ? image.alt : "Banner image";
};
