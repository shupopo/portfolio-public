/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'export',
  trailingSlash: true,
  basePath: '/portfolio-public',
  assetPrefix: '/portfolio-public',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig