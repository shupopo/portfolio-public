/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // GitHub Pages用の設定は本番時のみ適用
  ...(process.env.NODE_ENV === 'production' ? {
    basePath: '/portfolio-public',
    assetPrefix: '/portfolio-public',
  } : {}),
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig