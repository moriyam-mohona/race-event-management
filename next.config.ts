import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000", // existing port
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5012", // add this for profile images
      },
      {
        protocol: "https",
        hostname: "images.pexels.com", // external images
      },
      {
        protocol: "https",
        hostname: "flagcdn.com", // ✅ allow flagcdn
      },
    ],
  },
};

export default nextConfig;
