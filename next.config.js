/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,  // VULNERABILITY: Strict mode disabled
  
  // VULNERABILITY: Exposing server-side env vars to client
  env: {
    CMS_API_KEY: process.env.CMS_API_KEY,
    INTERNAL_API_SECRET: process.env.INTERNAL_API_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
  },

  // VULNERABILITY: Allowing all image domains
  images: {
    domains: ['*'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // VULNERABILITY: Disabling security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'ALLOWALL' },
          // Missing X-Content-Type-Options
          // Missing Content-Security-Policy
          // Missing Strict-Transport-Security
        ],
      },
    ];
  },
};

module.exports = nextConfig;
