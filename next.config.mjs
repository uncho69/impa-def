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
                script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://clerk.imparodefi.xyz https://*.imparodefi.xyz https://id-bot-eight.vercel.app https://auth.privy.io https://*.privy.io https://www.googletagmanager.com;
                style-src 'self' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://clerk.imparodefi.xyz https://*.imparodefi.xyz https://id-bot-eight.vercel.app https://auth.privy.io https://*.privy.io;
                img-src 'self' data: blob: https://*.clerk.accounts.dev https://*.clerk.com https://clerk.imparodefi.xyz https://*.imparodefi.xyz https://id-bot-eight.vercel.app https://auth.privy.io https://*.privy.io https://www.google-analytics.com https://www.googletagmanager.com;
                font-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://clerk.imparodefi.xyz https://*.imparodefi.xyz https://id-bot-eight.vercel.app https://auth.privy.io https://*.privy.io;
                object-src 'none';
                base-uri 'self';
                form-action 'self';
                frame-ancestors 'none';
                child-src https://challenges.cloudflare.com https://*.clerk.accounts.dev https://*.clerk.com https://clerk.imparodefi.xyz https://*.imparodefi.xyz https://id-bot-eight.vercel.app https://auth.privy.io https://*.privy.io https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com https://youtube-nocookie.com;
                frame-src https://challenges.cloudflare.com https://*.clerk.accounts.dev https://*.clerk.com https://clerk.imparodefi.xyz https://*.imparodefi.xyz https://id-bot-eight.vercel.app https://auth.privy.io https://*.privy.io https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com https://youtube-nocookie.com;
                connect-src 'self' https://challenges.cloudflare.com wss://relay.walletconnect.com wss://relay.walletconnect.org wss://www.walletlink.org https://explorer-api.walletconnect.com https://*.clerk.accounts.dev https://*.clerk.com https://clerk.imparodefi.xyz https://*.imparodefi.xyz https://id-bot-eight.vercel.app https://auth.privy.io https://*.privy.io https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com;
                worker-src 'self' blob: https://*.clerk.accounts.dev https://*.clerk.com https://clerk.imparodefi.xyz https://*.imparodefi.xyz https://id-bot-eight.vercel.app https://auth.privy.io https://*.privy.io;
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
                script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://clerk.imparodefi.xyz https://*.imparodefi.xyz https://id-bot-eight.vercel.app https://auth.privy.io https://*.privy.io https://www.googletagmanager.com;
                style-src 'self' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://clerk.imparodefi.xyz https://*.imparodefi.xyz https://id-bot-eight.vercel.app https://auth.privy.io https://*.privy.io;
                img-src 'self' data: blob: https://*.clerk.accounts.dev https://*.clerk.com https://clerk.imparodefi.xyz https://*.imparodefi.xyz https://id-bot-eight.vercel.app https://auth.privy.io https://*.privy.io https://www.google-analytics.com https://www.googletagmanager.com;
                font-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://clerk.imparodefi.xyz https://*.imparodefi.xyz https://id-bot-eight.vercel.app https://auth.privy.io https://*.privy.io;
                object-src 'none';
                base-uri 'self';
                form-action 'self';
                frame-ancestors 'none';
                child-src https://challenges.cloudflare.com https://*.clerk.accounts.dev https://*.clerk.com https://clerk.imparodefi.xyz https://*.imparodefi.xyz https://id-bot-eight.vercel.app https://auth.privy.io https://*.privy.io https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com https://youtube-nocookie.com;
                frame-src https://challenges.cloudflare.com https://*.clerk.accounts.dev https://*.clerk.com https://clerk.imparodefi.xyz https://*.imparodefi.xyz https://id-bot-eight.vercel.app https://auth.privy.io https://*.privy.io https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com https://youtube-nocookie.com;
                connect-src 'self' https://challenges.cloudflare.com wss://relay.walletconnect.com wss://relay.walletconnect.org wss://www.walletlink.org https://explorer-api.walletconnect.com https://*.clerk.accounts.dev https://*.clerk.com https://clerk.imparodefi.xyz https://*.imparodefi.xyz https://id-bot-eight.vercel.app https://auth.privy.io https://*.privy.io https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com;
                worker-src 'self' blob: https://*.clerk.accounts.dev https://*.clerk.com https://clerk.imparodefi.xyz https://*.imparodefi.xyz https://id-bot-eight.vercel.app https://auth.privy.io https://*.privy.io;
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
