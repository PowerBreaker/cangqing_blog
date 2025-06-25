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

// 默认配置
const defaultConfig: BlogConfig = {
  name: '青阳博客',
  description: '青阳的个人博客，记录思考与生活',
  homePage: '1_青阳心/有关于我/索引.md',
  logo: '/logo.png',
  theme: {
    defaultMode: 'dark'
  }
}

// 在服务端读取配置文件
function getBlogConfig(): BlogConfig {
  // 如果在客户端环境，直接返回默认配置
  if (typeof window !== 'undefined') {
    return defaultConfig
  }
  
  try {
    // 🔧 只在服务端环境中读取配置文件
    let config = null
    
    // 方式1：使用绝对路径
    try {
      const path = require('path')
      const configPath = path.resolve(process.cwd(), 'blog.config.js')
      // 清除require缓存
      delete require.cache[configPath]
      config = require(configPath)
    } catch (e1) {
      console.warn('绝对路径读取失败:', e1 instanceof Error ? e1.message : String(e1))
      
      // 方式2：尝试相对路径
      try {
        config = require('../../blog.config.js')
      } catch (e2) {
        console.warn('相对路径读取失败:', e2 instanceof Error ? e2.message : String(e2))
        
        // 方式3：尝试直接从根目录
        try {
          config = require('../../../blog.config.js')
        } catch (e3) {
          console.warn('根目录读取失败:', e3 instanceof Error ? e3.message : String(e3))
          throw new Error('所有路径都无法读取配置文件')
        }
      }
    }
    
    console.log('成功读取博客配置:', config?.name || '未知')
    return config || defaultConfig
  } catch (error) {
    console.error('读取博客配置失败，使用默认配置:', error instanceof Error ? error.message : String(error))
    // 返回默认配置
    return defaultConfig
  }
}

export { getBlogConfig }
export type { BlogConfig } 