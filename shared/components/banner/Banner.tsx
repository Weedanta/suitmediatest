"use client";

import React from "react";
import { BannerContent } from "./BannerContent";
import { useBannerParallax } from "./hooks/useBannerParallax";
import type { BannerProps } from "./types";

const Banner: React.FC<BannerProps> = ({
  image,
  title,
  subtitle,
  height = "large",
  imageAlt,
  backgroundColor,
}) => {
  const { containerRef, imageY, textY, opacity } = useBannerParallax();

  return (
    <BannerContent
      image={image}
      title={title}
      subtitle={subtitle}
      height={height}
      imageAlt={imageAlt}
      backgroundColor={backgroundColor}
      containerRef={containerRef}
      imageY={imageY}
      textY={textY}
      opacity={opacity}
    />
  );
};

export default Banner;
