"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, MotionValue } from "framer-motion";
import {
  HEIGHT_CLASSES,
  getImageSource,
  getImageAlt,
} from "./utils/bannerUtils";
import defaultBackground from "@/shared/assets/ideas/homepage_background.webp";

interface BannerContentProps {
  image: string | { src: string; alt: string };
  title?: string;
  subtitle?: string;
  height: "small" | "medium" | "large";
  imageAlt?: string;
  backgroundColor?: string;
  imageY: MotionValue<string>;
  textY: MotionValue<string>;
  opacity: MotionValue<number>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const BannerContent: React.FC<BannerContentProps> = ({
  image,
  title,
  subtitle,
  height,
  imageAlt,
  backgroundColor,
  imageY,
  textY,
  opacity,
  containerRef,
}) => {
  const imageSrc = getImageSource(image);
  const imageAltText = getImageAlt(image, imageAlt);
  const [hasError, setHasError] = useState(false);

  const displayImage =
    hasError || !imageSrc || imageSrc.trim() === ""
      ? defaultBackground
      : imageSrc;

  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: backgroundColor || "transparent" }}
    >
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden ${HEIGHT_CLASSES[height]}`}
      >
        <motion.div
          style={{ y: imageY, opacity }}
          className="absolute inset-0"
          key={imageSrc || "default"}
        >
          <Image
            src={displayImage}
            alt={imageAltText}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
            onError={handleImageError}
            unoptimized={displayImage === defaultBackground}
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        {(title || subtitle) && (
          <motion.div
            style={{ y: textY }}
            className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center md:px-6 lg:px-8"
          >
            {title && (
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl font-medium text-white md:text-5xl lg:text-5xl xl:text-5xl"
              >
                {title}
              </motion.h1>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg text-white/90 md:text-xl lg:text-2xl"
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>
        )}

        <div
          className="absolute left-0 right-0 z-20"
          style={{
            bottom: "-1px",
            height: "81px",
            clipPath:
              "polygon(0 calc(100% + 1px), 100% 1px, 100% calc(100% + 1px))",
            backgroundColor: backgroundColor || "transparent",
            WebkitClipPath:
              "polygon(0 calc(100% + 1px), 100% 1px, 100% calc(100% + 1px))",
            willChange: "transform",
          }}
        />
      </div>
    </div>
  );
};
