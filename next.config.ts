import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── TypeScript & ESLint ───────────────────────────────────
  typescript: {
    // Fail builds on type errors
    ignoreBuildErrors: false,
  },
  eslint: {
    // Lint during builds
    ignoreDuringBuilds: false,
  },

  // ── Image Optimization ───────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Add any external image hosts here
      // { protocol: "https", hostname: "your-cdn.com" },
    ],
    // Sizes that match responsive breakpoints in the portfolio
    deviceSizes: [375, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 380],
  },

  // ── Performance ──────────────────────────────────────────
  compress: true,
  poweredByHeader: false,

  // ── Headers ──────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
