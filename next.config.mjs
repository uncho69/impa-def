/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const isProd = process.env.NODE_ENV === 'production';

    const prodCsp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://*.privy.io https://privy.imparodefi.xyz",
      "style-src 'self' 'unsafe-inline' https://*.privy.io",
      "img-src 'self' data: blob: https://*.privy.io",
      "font-src 'self' https://*.privy.io",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "child-src 'self' https://auth.privy.io https://verify.walletconnect.com https://verify.walletconnect.org https://*.privy.io https://privy.imparodefi.xyz https://challenges.cloudflare.com",
      "frame-src 'self' https://auth.privy.io https://verify.walletconnect.com https://verify.walletconnect.org https://challenges.cloudflare.com https://*.privy.io https://privy.imparodefi.xyz",
      "connect-src 'self' https://auth.privy.io https://config.privy.io https://*.privy.io https://privy.imparodefi.xyz wss://relay.walletconnect.com wss://relay.walletconnect.org wss://www.walletlink.org https://*.rpc.privy.systems https://explorer-api.walletconnect.com https://challenges.cloudflare.com",
      "worker-src 'self' https://*.privy.io",
      "manifest-src 'self'",
    ].join('; ');

    // In sviluppo servono HMR/WS, unsafe-eval e blob per Next.js
    const devCsp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://challenges.cloudflare.com https://*.privy.io https://privy.imparodefi.xyz",
      "style-src 'self' 'unsafe-inline' https://*.privy.io",
      "img-src 'self' data: blob: https://*.privy.io",
      "font-src 'self' https://*.privy.io",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      // permettiamo il nostro sito come frame in dev
      "frame-ancestors 'self'",
      "child-src 'self' https://auth.privy.io https://verify.walletconnect.com https://verify.walletconnect.org https://*.privy.io https://privy.imparodefi.xyz https://challenges.cloudflare.com",
      "frame-src 'self' https://auth.privy.io https://verify.walletconnect.com https://verify.walletconnect.org https://challenges.cloudflare.com https://*.privy.io https://privy.imparodefi.xyz",
      "connect-src 'self' http://localhost:3000 ws://localhost:3000 https://auth.privy.io https://config.privy.io https://*.privy.io https://privy.imparodefi.xyz wss://relay.walletconnect.com wss://relay.walletconnect.org wss://www.walletlink.org https://*.rpc.privy.systems https://explorer-api.walletconnect.com https://challenges.cloudflare.com",
      "worker-src 'self' blob: https://*.privy.io",
      "manifest-src 'self'",
    ].join('; ');

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: isProd ? prodCsp : devCsp,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
