/**
 * 青阳博客配置文件
 * 
 * 这个文件用于配置博客的基本信息和首页内容。
 * 即使你不懂编程也没关系,只需要按照下面的说明修改对应的值即可:
 * 
 * 1. name - 修改为你想要的博客名称
 * 2. description - 修改为你的博客描述语
 * 3. homePage - 设置首页要显示的文章
 *    - 填写markdown文件的相对路径
 *    - 例如: '1_我的文章/自我介绍.md'
 * 
 * 4. logo - 设置博客logo图片
 *    - 把图片放在public文件夹下
 *    - 填写图片路径,例如: '/logo.png' 
 * 
 * 5. theme - 主题相关设置
 *    - defaultMode: 默认主题模式
 *      + 'light' - 浅色模式
 *      + 'dark' - 深色模式  
 *      + 'system' - 跟随系统设置
 */

const blogConfig = {
  // 博客基本信息
  name: '青阳博客',
  description: '青阳的个人博客，记录思考与生活',
  
  // 首页显示的文章路径（相对于博客目录）
  homePage: '1_青阳心/有关于我/索引.md',
  
  // Logo 图片路径（相对于 public 目录）
  logo: '/logo.png',
  
  // 主题配置
  theme: {
    // 默认主题模式：'light' | 'dark' | 'system'
    // 'light' - 明亮模式，'dark' - 黑暗模式，'system' - 跟随系统设置
    defaultMode: 'dark'
  }
}

module.exports = blogConfig 