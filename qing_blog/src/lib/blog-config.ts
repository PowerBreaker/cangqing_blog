/**
 * 博客配置管理模块
 */

// 博客配置类型定义
interface BlogConfig {
  name: string
  description: string
  homePage: string
  logo: string
  theme: {
    defaultMode: 'light' | 'dark' | 'system'
  }
}

// 默认配置 - 更新为与blog.config.js一致
const defaultConfig: BlogConfig = {
  name: '青阳博客',
  description: '青阳之心，风与火',
  homePage: '博客/1_青阳心/有关于我/索引.md',
  logo: '/logo.png',
  theme: {
    defaultMode: 'dark'
  }
}

// 缓存配置，避免重复读取
let cachedConfig: BlogConfig | null = null

// 在服务端读取配置文件
function getBlogConfig(): BlogConfig {
  // 如果已经缓存，直接返回
  if (cachedConfig) {
    return cachedConfig
  }

  // 如果在客户端环境，直接返回默认配置
  if (typeof window !== 'undefined') {
    cachedConfig = defaultConfig
    return defaultConfig
  }
  
  try {
    // 🔧 只在服务端环境中引用Node.js模块
    const fs = eval('require')('fs')
    const path = eval('require')('path')
    
    // 尝试静态路径策略，优先级从高到低
    const possiblePaths = [
      // 策略1：从 qing_blog 目录回到上级目录（最常用的路径）
      path.resolve(process.cwd(), '../blog.config.js'),
      // 策略2：当前目录的blog.config.js（备用）
      path.resolve(process.cwd(), 'blog.config.js'),
      // 策略3：Vercel构建环境可能的路径
      path.resolve(__dirname, '../../../blog.config.js')
    ]
    
    for (const configPath of possiblePaths) {
      try {
        // 检查文件是否存在
        if (fs.existsSync(configPath)) {
          // 清除require缓存
          const requireFunc = eval('require')
          delete requireFunc.cache[configPath]
          const config = requireFunc(configPath)
          if (config && typeof config === 'object') {
            console.log('✅ 成功读取博客配置:', config?.name || '未知')
            cachedConfig = { ...defaultConfig, ...config }
            return cachedConfig
          }
        }
      } catch (error) {
        // 静默处理错误，继续尝试下一个路径
        continue
      }
    }
    
    // 如果所有静态路径都失败，尝试相对路径（保持向后兼容）
    try {
      const requireFunc = eval('require')
      const config = requireFunc('../../../blog.config.js')
      console.log('✅ 通过相对路径成功读取博客配置:', config?.name || '未知')
      cachedConfig = { ...defaultConfig, ...config }
      return cachedConfig
    } catch (error) {
      console.warn('⚠️ 所有配置文件路径都无法访问，使用默认配置')
    }
    
    cachedConfig = defaultConfig
    return defaultConfig
  } catch (error) {
    console.warn('⚠️ 配置读取异常，使用默认配置:', error instanceof Error ? error.message : String(error))
    cachedConfig = defaultConfig
    return defaultConfig
  }
}

export { getBlogConfig }
export type { BlogConfig } 