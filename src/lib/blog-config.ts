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

// 在服务端读取配置文件
function getBlogConfig(): BlogConfig {
  try {
    // 🔧 优化：使用process.cwd()绝对路径读取配置文件
    const path = require('path')
    const configPath = path.resolve(process.cwd(), 'blog.config.js')
    
    // 清除require缓存，确保获取最新配置
    delete require.cache[configPath]
    
    const config = require(configPath)
    console.log('成功读取博客配置:', config?.name || '未知')
    return config
  } catch (error) {
    console.error('读取博客配置失败，使用默认配置:', error instanceof Error ? error.message : String(error))
    // 返回默认配置
    return {
      name: '青阳博客',
      description: '青阳的个人博客，记录思考与生活',
      homePage: '1_青阳心/有关于我/索引.md',
      logo: '/logo.png',
      theme: {
        defaultMode: 'dark'
      }
    }
  }
}

export { getBlogConfig }
export type { BlogConfig } 