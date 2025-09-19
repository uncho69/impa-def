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
