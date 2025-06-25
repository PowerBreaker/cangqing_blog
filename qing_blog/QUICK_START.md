# 🚀 快速启动指南

## 1. 安装依赖

```bash
npm install
```

## 2. 添加博客内容

在 `博客/` 目录中添加您的 Markdown 文件：

```
博客/
├── 技术文章/
│   ├── JavaScript 基础.md
│   └── React 入门.md
├── 生活随笔/
│   └── 今日感悟.md
└── README.md
```

## 3. 更新和构建

每次修改博客内容后运行：

```bash
npm run update-blog
```

这会自动：
- ✅ 扫描所有 Markdown 文件
- ✅ 为每篇文章生成独立页面
- ✅ 构建完整的静态网站
- ✅ 输出到 `out/` 目录

## 4. 本地预览

开发时预览：
```bash
npm run dev
# 访问 http://localhost:3000
```

预览静态网站：
```bash
npx serve out
# 访问 http://localhost:3000
```

## 5. 部署到 Vercel

### 初次部署

1. 推送到 GitHub：
```bash
git init
git add .
git commit -m "初始化博客"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. 在 [Vercel](https://vercel.com) 导入项目

### 日常更新

```bash
# 1. 编辑博客内容
# 2. 更新构建
npm run update-blog

# 3. 提交并推送
git add .
git commit -m "更新博客内容"
git push

# 4. Vercel 自动部署 🎉
```

## 📁 生成的网站结构

- **首页**: 显示所有文章列表和文件树导航
- **文章页**: 每篇文章有独立 URL，如 `/post/技术文章/JavaScript%20基础`
- **SEO 优化**: 每页都有正确的 meta 标签和标题
- **静态文件**: 完全静态，无需服务器

## 🎯 核心优势

- ✅ **完美 SEO**: 每篇文章独立页面和 URL
- ✅ **静态生成**: 构建时生成所有页面
- ✅ **零服务器**: 纯静态文件，部署到任何 CDN
- ✅ **自动化**: 一键更新脚本
- ✅ **GitHub 集成**: 推送自动部署 