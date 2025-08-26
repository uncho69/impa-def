/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const isProd = process.env.NODE_ENV === 'production';

    const prodCsp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "child-src https://auth.privy.io https://verify.walletconnect.com https://verify.walletconnect.org",
      "frame-src https://auth.privy.io https://verify.walletconnect.com https://verify.walletconnect.org https://challenges.cloudflare.com",
      "connect-src 'self' https://auth.privy.io https://config.privy.io https://*.privy.io wss://relay.walletconnect.com wss://relay.walletconnect.org wss://www.walletlink.org https://*.rpc.privy.systems https://explorer-api.walletconnect.com",
      "worker-src 'self'",
      "manifest-src 'self'",
    ].join('; ');

    // In sviluppo servono HMR/WS, unsafe-eval e blob per Next.js
    const devCsp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      // permettiamo il nostro sito come frame in dev
      "frame-ancestors 'self'",
      "child-src 'self' https://auth.privy.io https://verify.walletconnect.com https://verify.walletconnect.org",
      "frame-src 'self' https://auth.privy.io https://verify.walletconnect.com https://verify.walletconnect.org https://challenges.cloudflare.com",
      "connect-src 'self' http://localhost:3000 ws://localhost:3000 https://auth.privy.io https://config.privy.io https://*.privy.io wss://relay.walletconnect.com wss://relay.walletconnect.org wss://www.walletlink.org https://*.rpc.privy.systems https://explorer-api.walletconnect.com",
      "worker-src 'self' blob:",
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
