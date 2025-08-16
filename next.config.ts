import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5012", // make sure this matches your local API port
      },
    ],
  },
};

export default nextConfig;
