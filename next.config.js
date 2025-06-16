/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  experimental: {
    outputFileTracingIncludes: {
      '/': ['./博客/**/*'],
    },
  }
}

module.exports = nextConfig 