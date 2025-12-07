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
                script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.privy.io https://privy.imparodefi.xyz https://*.clerk.accounts.dev https://*.clerk.com;
                style-src 'self' 'unsafe-inline' https://*.privy.io https://privy.imparodefi.xyz https://*.clerk.accounts.dev https://*.clerk.com;
                img-src 'self' data: blob: https://*.privy.io https://privy.imparodefi.xyz https://*.clerk.accounts.dev https://*.clerk.com;
                font-src 'self' https://*.privy.io https://privy.imparodefi.xyz https://*.clerk.accounts.dev https://*.clerk.com;
                object-src 'none';
                base-uri 'self';
                form-action 'self';
                frame-ancestors 'none';
                child-src https://*.privy.io https://privy.imparodefi.xyz https://challenges.cloudflare.com https://*.clerk.accounts.dev https://*.clerk.com;
                frame-src https://*.privy.io https://privy.imparodefi.xyz https://challenges.cloudflare.com https://*.clerk.accounts.dev https://*.clerk.com;
                connect-src 'self' https://*.privy.io https://privy.imparodefi.xyz https://challenges.cloudflare.com wss://relay.walletconnect.com wss://relay.walletconnect.org wss://www.walletlink.org https://*.rpc.privy.systems https://explorer-api.walletconnect.com https://*.clerk.accounts.dev https://*.clerk.com;
                worker-src 'self' https://*.privy.io https://privy.imparodefi.xyz https://*.clerk.accounts.dev https://*.clerk.com;
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
                script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.privy.io https://privy.imparodefi.xyz https://*.clerk.accounts.dev https://*.clerk.com;
                style-src 'self' 'unsafe-inline' https://*.privy.io https://privy.imparodefi.xyz https://*.clerk.accounts.dev https://*.clerk.com;
                img-src 'self' data: blob: https://*.privy.io https://privy.imparodefi.xyz https://*.clerk.accounts.dev https://*.clerk.com;
                font-src 'self' https://*.privy.io https://privy.imparodefi.xyz https://*.clerk.accounts.dev https://*.clerk.com;
                object-src 'none';
                base-uri 'self';
                form-action 'self';
                frame-ancestors 'none';
                child-src https://*.privy.io https://privy.imparodefi.xyz https://challenges.cloudflare.com https://*.clerk.accounts.dev https://*.clerk.com;
                frame-src https://*.privy.io https://privy.imparodefi.xyz https://challenges.cloudflare.com https://*.clerk.accounts.dev https://*.clerk.com;
                connect-src 'self' https://*.privy.io https://privy.imparodefi.xyz https://challenges.cloudflare.com wss://relay.walletconnect.com wss://relay.walletconnect.org wss://www.walletlink.org https://*.rpc.privy.systems https://explorer-api.walletconnect.com https://*.clerk.accounts.dev https://*.clerk.com;
                worker-src 'self' https://*.privy.io https://privy.imparodefi.xyz https://*.clerk.accounts.dev https://*.clerk.com;
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
