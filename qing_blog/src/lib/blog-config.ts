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
    // 首先尝试读取构建时复制的配置文件
    try {
      const config = require('../../../blog.config.runtime.js')
      if (config && typeof config === 'object') {
        console.log('✅ 成功读取运行时配置:', config?.name || '未知名称')
        const mergedConfig = { ...defaultConfig, ...config }
        cachedConfig = mergedConfig
        return mergedConfig
      }
    } catch {
      // 忽略错误，继续尝试其他方法
    }

    // 备用方案：尝试读取原始配置文件
    const fs = eval('require')('fs')
    const path = eval('require')('path')
    
    const possiblePaths = [
      path.resolve(process.cwd(), '../blog.config.js'),
      path.resolve(process.cwd(), 'blog.config.js'),
      path.resolve(__dirname, '../../../blog.config.js')
    ]
    
    for (const configPath of possiblePaths) {
      try {
        if (fs.existsSync(configPath)) {
          console.log(`✅ 找到配置文件: ${configPath}`)
          const requireFunc = eval('require')
          delete requireFunc.cache[configPath]
          const config = requireFunc(configPath)
          
          if (config && typeof config === 'object') {
            console.log('✅ 成功读取博客配置:', config?.name || '未知名称')
            const mergedConfig = { ...defaultConfig, ...config }
            cachedConfig = mergedConfig
            return mergedConfig
          }
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error)
        console.warn(`⚠️ 路径 ${configPath} 读取失败:`, errorMessage)
        continue
      }
    }
    
    console.warn('⚠️ 无法读取blog.config.js，使用默认配置')
    console.log('📁 当前工作目录:', process.cwd())
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('❌ 配置读取异常:', errorMessage)
  }

  // 返回默认配置
  cachedConfig = defaultConfig
  return defaultConfig
}

// 导出函数，支持强制重新读取配置
function reloadBlogConfig(): BlogConfig {
  cachedConfig = null
  return getBlogConfig()
}

export { getBlogConfig, reloadBlogConfig }
export type { BlogConfig } 