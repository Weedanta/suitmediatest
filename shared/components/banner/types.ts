export interface BannerCMSData {
  image: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  title?: string;
  subtitle?: string;
  height?: "small" | "medium" | "large";
}

export interface BannerProps {
  /**
   * URL image atau object dengan src dan alt
   * Bisa dari CMS: { src: cmsData.image.url, alt: cmsData.image.alt }
   * Atau langsung string: cmsData.image.url
   */
  image: string | { src: string; alt: string };
  title?: string;
  subtitle?: string;
  height?: "small" | "medium" | "large";
  imageAlt?: string;
  backgroundColor?: string;
}

/**
 * Helper function untuk mengkonversi data dari CMS ke format Banner
 *
 * @example
 * ```ts
 * const cmsData = await getBannerFromCMS()
 * const bannerProps = convertCMSDataToBannerProps(cmsData)
 * return <Banner {...bannerProps} />
 * ```
 */
export function convertCMSDataToBannerProps(
  cmsData: BannerCMSData
): BannerProps {
  return {
    image: {
      src: cmsData.image.url,
      alt: cmsData.image.alt || "Banner image",
    },
    title: cmsData.title,
    subtitle: cmsData.subtitle,
    height: cmsData.height || "large",
    imageAlt: cmsData.image.alt,
  };
}
