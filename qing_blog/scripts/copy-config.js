/**
 * 构建时配置文件复制脚本
 * 将blog.config.js复制到运行时可访问的位置
 */

const fs = require('fs')
const path = require('path')

try {
  const sourceConfigPath = path.resolve(__dirname, '../../blog.config.js')
  const targetConfigPath = path.resolve(__dirname, '../blog.config.runtime.js')
  
  if (fs.existsSync(sourceConfigPath)) {
    console.log('📋 复制博客配置文件...')
    console.log(`源文件: ${sourceConfigPath}`)
    console.log(`目标文件: ${targetConfigPath}`)
    
    const configContent = fs.readFileSync(sourceConfigPath, 'utf8')
    fs.writeFileSync(targetConfigPath, configContent, 'utf8')
    
    console.log('✅ 配置文件复制成功')
    
    // 验证复制的配置文件
    try {
      const config = require(targetConfigPath)
      console.log('✅ 配置文件验证成功:', config?.name || '未知博客')
    } catch (error) {
      console.error('❌ 配置文件验证失败:', error.message)
      process.exit(1)
    }
  } else {
    console.warn('⚠️ 未找到blog.config.js，使用默认配置')
    
    // 创建默认配置文件
    const defaultConfig = `/**
 * 运行时博客配置文件（自动生成）
 */
const blogConfig = {
  name: '青阳博客',
  description: '青阳之心，风与火',
  homePage: '博客/1_青阳心/有关于我/索引.md',
  logo: '/logo.png',
  theme: {
    defaultMode: 'dark'
  }
}

module.exports = blogConfig`
    
    fs.writeFileSync(targetConfigPath, defaultConfig, 'utf8')
    console.log('✅ 创建默认配置文件')
  }
} catch (error) {
  console.error('❌ 配置文件复制失败:', error.message)
  process.exit(1)
} 