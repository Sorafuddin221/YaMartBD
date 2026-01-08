import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/dbed3cb4k/**',
          },
        ],
      },
      serverExternalPackages: ['@sparticuz/chromium'],
};

export default nextConfig;