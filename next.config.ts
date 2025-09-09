// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "5000",
//       },
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "5012",
//       },
//       {
//         protocol: "http",
//         hostname: "172.252.13.76",
//         port: "5012",
//       },
//       {
//         protocol: "https",
//         hostname: "images.pexels.com",
//       },
//       {
//         protocol: "https",
//         hostname: "flagcdn.com",
//       },
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//       {
//         protocol: "https",
//         hostname: "dustitrainers.lon1.digitaloceanspaces.com",
//       },
//     ],
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable strict mode
  swcMinify: true, // Use SWC for faster minification
  experimental: {
    optimizeCss: true, // Optimize CSS
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5012",
      },
      {
        protocol: "http",
        hostname: "172.252.13.76",
        port: "5012",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "dustitrainers.lon1.digitaloceanspaces.com",
      },
    ],
  },
};

export default nextConfig;
