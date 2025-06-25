/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  experimental: {
    outputFileTracingIncludes: {
      '/': ['../博客/**/*', '../blog.config.js'],
    },
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@blog-config': require('path').resolve(__dirname, '../blog.config.js'),
      }
    }
    return config
  },
  async generateBuildId() {
    return 'blog-build'
  }
}

module.exports = nextConfig 