import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // 404 page for the whole app (src/app/global-not-found.tsx), needed because the
  // site and the /keystatic editor use separate root layouts.
  experimental: { globalNotFound: true },
  images: {
    // Serve AVIF (sharper at the same file size) with WebP as the fallback.
    formats: ["image/avif", "image/webp"],
    // Allowed quality levels: 75 is Next's default, 90 is used for photos
    // where detail matters (banners, project cards, project page images).
    qualities: [75, 90],
  },
};

export default nextConfig;
