/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  experimental: {
    outputFileTracingIncludes: {
      '/': ['../博客/**/*'],
    },
  },
  async generateBuildId() {
    return 'blog-build'
  }
}

module.exports = nextConfig 