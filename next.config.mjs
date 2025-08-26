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
                script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.privy.io https://privy.imparodefi.xyz;
                style-src 'self' 'unsafe-inline' https://*.privy.io https://privy.imparodefi.xyz;
                img-src 'self' data: blob: https://*.privy.io https://privy.imparodefi.xyz;
                font-src 'self' https://*.privy.io https://privy.imparodefi.xyz;
                object-src 'none';
                base-uri 'self';
                form-action 'self';
                frame-ancestors 'none';
                child-src https://*.privy.io https://privy.imparodefi.xyz https://privy.imparodefi.xyz https://challenges.cloudflare.com;
                frame-src https://*.privy.io https://privy.imparodefi.xyz https://challenges.cloudflare.com;
                connect-src 'self' https://*.privy.io https://privy.imparodefi.xyz https://challenges.cloudflare.com wss://relay.walletconnect.com wss://relay.walletconnect.org wss://www.walletlink.org https://*.rpc.privy.systems https://explorer-api.walletconnect.com;
                worker-src 'self' https://*.privy.io https://privy.imparodefi.xyz;
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
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.privy.io https://privy.imparodefi.xyz;
              style-src 'self' 'unsafe-inline' https://*.privy.io https://privy.imparodefi.xyz;
              img-src 'self' data: blob: https://*.privy.io https://privy.imparodefi.xyz;
              font-src 'self' https://*.privy.io https://privy.imparodefi.xyz;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
              child-src https://*.privy.io https://privy.imparodefi.xyz https://challenges.cloudflare.com;
              frame-src https://*.privy.io https://privy.imparodefi.xyz https://challenges.cloudflare.com;
              connect-src 'self' https://*.privy.io https://privy.imparodefi.xyz https://challenges.cloudflare.com wss://relay.walletconnect.com wss://relay.walletconnect.org wss://www.walletlink.org https://*.rpc.privy.systems https://explorer-api.walletconnect.com;
              worker-src 'self' https://*.privy.io https://privy.imparodefi.xyz;
              manifest-src 'self';
            `.replace(/\s+/g, ' ').trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
