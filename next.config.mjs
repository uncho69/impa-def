/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  // Disabilita la precompilazione delle API routes dinamiche
  outputFileTracing: true,
  swcMinify: true,
};

export default nextConfig;
