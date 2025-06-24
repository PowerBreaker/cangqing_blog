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
    // 在Next.js中，我们需要使用require来读取配置文件
    const config = require('../../blog.config.js')
    return config
  } catch (error) {
    console.error('读取博客配置失败:', error)
    // 返回默认配置
    return {
      name: '青阳博客',
      description: '青阳的个人博客，记录思考与生活',
      homePage: '1_青阳心/有关于我/index.md',
      logo: '/logo.png',
      theme: {
        defaultMode: 'dark'
      }
    }
  }
}

export { getBlogConfig }
export type { BlogConfig } 