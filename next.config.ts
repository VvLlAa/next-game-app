import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'store.cloudflare.steamstatic.com',
      'shared.cloudflare.steamstatic.com',
      'shared.akamai.steamstatic.com',
    ],
  },
};

export default nextConfig;
