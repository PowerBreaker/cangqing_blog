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
  name: '青之鹰博客',
  description: '青之鹰博客，记录思考与生活，无缝对接笔记软件，快速搭建博客',
  homePage: '博客\\_我是谁\\首页.md',
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
    // 🔧 只在服务端环境中引用Node.js模块
    const path = require('path')
    let fs: any
    try {
      fs = require('fs')
    } catch (error) {
      // 如果fs模块无法加载，返回默认配置
      console.warn('⚠️ fs模块不可用，使用默认配置')
      return defaultConfig
    }
    
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
      delete require.cache[configPath]
          const config = require(configPath)
          if (config && typeof config === 'object') {
            console.log('✅ 成功读取博客配置:', config?.name || '未知')
            return { ...defaultConfig, ...config }
          }
        }
      } catch (error) {
        // 静默处理错误，继续尝试下一个路径
        continue
      }
    }
    
    // 如果所有静态路径都失败，尝试相对路径（保持向后兼容）
    try {
      const config = require('../../../blog.config.js')
      console.log('✅ 通过相对路径成功读取博客配置:', config?.name || '未知')
      return { ...defaultConfig, ...config }
    } catch (error) {
      console.warn('⚠️ 所有配置文件路径都无法访问，使用默认配置')
        }
    
    return defaultConfig
  } catch (error) {
    console.warn('⚠️ 配置读取异常，使用默认配置:', error instanceof Error ? error.message : String(error))
    return defaultConfig
  }
}

export { getBlogConfig }
export type { BlogConfig } 