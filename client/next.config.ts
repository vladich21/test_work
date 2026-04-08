import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Telegram Mini Apps run inside iframes, disable x-frame-options
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'ALLOWALL' },
          { key: 'Content-Security-Policy', value: "frame-ancestors *" },
        ],
      },
    ];
  },
  // Allow images from Telegram CDN
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.telegram.org' },
      { protocol: 'https', hostname: 't.me' },
    ],
  },
};

export default nextConfig;
