/**
 * 青阳博客配置文件
 * 
 * 这个文件用于配置博客的基本信息和首页内容。
 * 即使你不懂编程也没关系,只需要按照下面的说明修改对应的值即可:
 * 
 * 1. name - 修改为你想要的博客名称
 * 2. description - 修改为你的博客描述语
 * 3. homePage - 设置首页要显示的文章
 *    - 填写markdown文件相对于整个项目的相对路径
 *    - 例如: '博客\\_我是谁\\首页.md' 或 '博客/_我是谁/首页.md'
 *    - 直接复制文件的相对路径即可，支持Windows的\\路径分隔符
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
  description: '青阳之心，风与火',
  
  // 首页显示的文章路径（相对于整个项目的相对路径）
  // 支持Windows路径分隔符（\），会自动转换为标准路径分隔符
  homePage: '博客/1_青阳心/有关于我/索引.md',
  
  // Logo 图片路径（相对于 public 目录），进入qing_blog\public，找到logo文件，进行替换就可以，保持名字不变
  logo: '/logo.png',
  
  // 主题配置
  theme: {
    // 默认主题模式：'light' | 'dark' | 'system'
    // 'light' - 明亮模式，'dark' - 黑暗模式，'system' - 跟随系统设置
    defaultMode: 'dark'
  }
}

module.exports = blogConfig 