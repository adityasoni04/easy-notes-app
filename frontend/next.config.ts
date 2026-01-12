import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Correct way to allow specific origins for Server Actions / CSRF protection
    serverActions: {
      allowedOrigins: ['fbe20e54edcb.ngrok-free.app'],
    },
  },
  // If you are using next/image and images are served via Ngrok
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fbe20e54edcb.ngrok-free.app',
      },
    ],
  },
};

export default nextConfig;