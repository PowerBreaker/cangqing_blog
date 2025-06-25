# 🌟 青之鹰博客

一个简洁、优雅的个人博客系统，基于 Next.js 构建，专为中文内容优化。

## ✨ 核心特性

- 🎨 **代码透明化**：技术细节对用户完全透明，专注内容创作
- 📝 **Markdown 原生支持**：完整支持 Markdown 语法和双链引用 `[[文章]]`
- 🔧 **一键配置**：单个配置文件 `blog.config.js` 搞定所有设置
- 🚀 **简化操作**：在根目录运行命令，无需进入代码文件夹
- 📱 **现代化设计**：响应式界面，支持明暗主题切换
- 🌐 **静态生成**：完美的SEO和部署到任何静态托管平台

## 🎯 设计理念

**用户只需关注三件事**：
1. **📝 写作**：在 `博客/` 文件夹中创建 Markdown 文件
2. **⚙️ 配置**：编辑 `blog.config.js` 设置博客信息
3. **🚀 部署**：运行 `npm run update-blog` 更新网站

## 📂 项目结构

```
项目根目录/
├── 博客/                    # 📝 您的博客文章目录
│   ├── _我是谁/             # 个人介绍
│   ├── 兴趣/               # 兴趣爱好
│   ├── 学习/               # 学习笔记
│   ├── 工作/               # 工作相关
│   ├── 生活/               # 生活记录
│   └── 日志/               # 日常日志
├── qing_blog/              # 💻 项目代码（无需关注）
│   ├── src/                # React 组件和页面
│   ├── public/             # 静态资源
│   ├── package.json        # 项目依赖
│   └── next.config.js      # Next.js 配置
├── blog.config.js          # ⚙️ 博客配置文件
├── package.json            # 📦 简化的命令脚本
├── 博客使用指南.md          # 📖 详细使用说明
├── 开发指南.md             # 🚀 开发者指南
└── README.md               # 📄 项目说明
```

## 🚀 快速开始

### 1. 首次安装
```bash
npm run install-deps
```

### 2. 启动开发服务器
```bash
npm run dev
```
访问 [http://localhost:3000](http://localhost:3000) 查看博客

### 3. 写作和配置
- 在 `博客/` 文件夹中添加 `.md` 文件
- 编辑 `blog.config.js` 配置博客信息

### 4. 更新博客
```bash
npm run update-blog
```

## ⚙️ 博客配置

编辑 `blog.config.js` 文件：

```javascript
const blogConfig = {
  // 博客基本信息
  name: '您的博客名称',
  description: '您的博客描述',
  
  // 首页文章路径（支持Windows路径）
  homePage: '博客\\_我是谁\\首页.md',
  
  // Logo 图片路径
  logo: '/logo.png',
  
  // 主题配置
  theme: {
    defaultMode: 'dark'  // 'light' | 'dark' | 'system'
  }
}
```

## 📝 写作指南

### Markdown 语法支持
```markdown
# 标题
**粗体** *斜体*

- 列表项
- 列表项

[[双链引用其他文章]]

![图片|300](图片链接)
```

### 文章间链接
使用双方括号链接其他文章：
```markdown
[[文章标题]]
[[文件夹/文章标题]]
```

## 🌐 部署流程

### GitHub + Vercel 自动部署（推荐）

1. **推送到 GitHub**：
```bash
git add .
git commit -m "更新博客内容"
git push
```

2. **Vercel 自动部署**：
   - 连接 GitHub 仓库到 Vercel
   - 每次推送自动触发部署

### 手动部署
```bash
npm run update-blog  # 构建静态网站
# 将生成的 qing_blog/out/ 目录部署到托管平台
```

## 💡 高级功能

- **双链支持**：文章间智能链接 `[[文章标题]]`
- **图片尺寸控制**：`![描述|宽度](链接)` 或 `![描述|宽x高](链接)`
- **主题切换**：支持明暗主题和跟随系统设置
- **文件树导航**：左侧自动生成文章目录树
- **目录导航**：右侧显示文章内标题目录

## 📖 帮助文档

- 📖 `博客使用指南.md` - 详细的使用说明
- 🚀 `开发指南.md` - 开发者指南
- ⚙️ `qing_blog/BLOG_CONFIG.md` - 高级配置说明

## 技术栈

- **Next.js 14**：React 框架，静态生成
- **TypeScript**：类型安全
- **Tailwind CSS**：现代化样式
- **React Markdown**：Markdown 渲染
- **Lucide React**：图标库

## 许可证

MIT License 