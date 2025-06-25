/**
 * URL处理工具函数
 * 专门处理博客系统中的URL编码和解码，避免过度编码问题
 */

/**
 * 安全地解码URL段
 */
export function safeDecodeURIComponent(str: string): string {
  try {
    // 如果字符串包含%符号，说明可能是编码的
    if (str.includes('%')) {
      // 尝试解码
      let decoded = decodeURIComponent(str)
      
      // 如果解码后还包含%符号，可能是过度编码，再次解码
      while (decoded.includes('%') && decoded !== str) {
        const nextDecoded = decodeURIComponent(decoded)
        if (nextDecoded === decoded) break // 防止无限循环
        decoded = nextDecoded
      }
      
      return decoded
    }
    
    // 没有%符号，直接返回
    return str
  } catch (error) {
    // 解码失败，返回原字符串
    console.warn('Failed to decode URI component:', str, error)
    return str
  }
}

/**
 * 标准化URL路径，避免过度编码
 */
export function normalizeUrlPath(path: string): string {
  return path
    .split('/')
    .map(segment => safeDecodeURIComponent(segment))
    .map(segment => encodeURIComponent(segment))
    .join('/')
}

/**
 * 安全地处理动态路由参数
 */
export function processDynamicParams(params: string[]): {
  originalParams: string[]
  decodedParams: string[]
  slug: string
} {
  const decodedParams = params.map(param => safeDecodeURIComponent(param))
  const slug = decodedParams.join('/')
  
  return {
    originalParams: params,
    decodedParams,
    slug
  }
}

/**
 * 构建安全的文章URL
 */
export function buildPostUrl(slug: string): string {
  const normalizedSlug = normalizeUrlPath(slug)
  return `/post/${normalizedSlug}`
}

/**
 * 检查URL是否包含过度编码
 */
export function hasDoubleEncoding(url: string): boolean {
  return url.includes('%25')
} 