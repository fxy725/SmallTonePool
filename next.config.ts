import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  // 注意这个文件需要在项目根目录下
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
});

const nextConfig: NextConfig = {
  // Experimental features
  experimental: {
    // Enable MDX Rust compiler for better performance
    mdxRs: true,
    // Optimize package imports
    optimizePackageImports: [],
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default withSerwist(nextConfig);
