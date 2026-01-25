/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    
    if (isDev) {
      return [
        {
          source: "/:path*",
          headers: [
            {
              key: "Content-Security-Policy",
              value: `
                default-src 'self';
                script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://id-bot-eight.vercel.app;
                style-src 'self' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://id-bot-eight.vercel.app;
                img-src 'self' data: blob: https://*.clerk.accounts.dev https://*.clerk.com https://id-bot-eight.vercel.app;
                font-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://id-bot-eight.vercel.app;
                object-src 'none';
                base-uri 'self';
                form-action 'self';
                frame-ancestors 'none';
                child-src https://challenges.cloudflare.com https://*.clerk.accounts.dev https://*.clerk.com https://id-bot-eight.vercel.app;
                frame-src https://challenges.cloudflare.com https://*.clerk.accounts.dev https://*.clerk.com https://id-bot-eight.vercel.app;
                connect-src 'self' https://challenges.cloudflare.com wss://relay.walletconnect.com wss://relay.walletconnect.org wss://www.walletlink.org https://explorer-api.walletconnect.com https://*.clerk.accounts.dev https://*.clerk.com https://id-bot-eight.vercel.app;
                worker-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://id-bot-eight.vercel.app;
                manifest-src 'self';
              `.replace(/\s+/g, ' ').trim(),
            },
          ],
        },
      ];
    }

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
              value: `
                default-src 'self';
                script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://id-bot-eight.vercel.app;
                style-src 'self' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://id-bot-eight.vercel.app;
                img-src 'self' data: blob: https://*.clerk.accounts.dev https://*.clerk.com https://id-bot-eight.vercel.app;
                font-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://id-bot-eight.vercel.app;
                object-src 'none';
                base-uri 'self';
                form-action 'self';
                frame-ancestors 'none';
                child-src https://challenges.cloudflare.com https://*.clerk.accounts.dev https://*.clerk.com https://id-bot-eight.vercel.app;
                frame-src https://challenges.cloudflare.com https://*.clerk.accounts.dev https://*.clerk.com https://id-bot-eight.vercel.app;
                connect-src 'self' https://challenges.cloudflare.com wss://relay.walletconnect.com wss://relay.walletconnect.org wss://www.walletlink.org https://explorer-api.walletconnect.com https://*.clerk.accounts.dev https://*.clerk.com https://id-bot-eight.vercel.app;
                worker-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://id-bot-eight.vercel.app;
                manifest-src 'self';
              `.replace(/\s+/g, ' ').trim(),
          },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configurazione domini per immagini
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'ibb.co',
      },
      {
        protocol: 'https',
        hostname: '**.imgur.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      }
    ],
  },
  // Disabilita la precompilazione delle API routes dinamiche
  outputFileTracing: true,
  swcMinify: true,
};

export default nextConfig;
