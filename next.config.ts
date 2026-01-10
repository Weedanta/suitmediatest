import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "suitmedia-backend.suitdev.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.suitdev.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
