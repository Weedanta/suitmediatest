import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

interface UseBannerParallaxReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  imageY: MotionValue<string>;
  textY: MotionValue<string>;
  opacity: MotionValue<number>;
}

export const useBannerParallax = (): UseBannerParallaxReturn => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.3]);

  return {
    containerRef,
    imageY,
    textY,
    opacity,
  };
};
