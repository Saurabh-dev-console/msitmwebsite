import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "msitm.edu.in",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.msitm.edu.in",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
