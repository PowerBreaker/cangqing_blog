# 青阳博客

基于 Next.js 构建的个人博客网站，支持静态生成和完美的 SEO。

## ✨ 功能特性

- 🌳 **文件树导航**: 左侧显示文件夹和文件的树状结构，支持展开折叠
- 📝 **Markdown 渲染**: 支持 GFM 语法的 Markdown 内容渲染
- 🔗 **独立文章页面**: 每篇文章都有独立的URL，完美支持SEO
- 🎨 **现代化 UI**: 使用 Tailwind CSS 打造美观的用户界面
- 📱 **响应式设计**: 适配不同设备屏幕尺寸
- 🚀 **静态生成**: 构建时生成所有页面，完美的性能和SEO
- ⚡ **一键更新**: 提供脚本化的博客更新流程

## 技术栈

- **Next.js 14**: React 全栈框架
- **TypeScript**: 类型安全的 JavaScript
- **Tailwind CSS**: 现代化的 CSS 框架
- **React Markdown**: Markdown 内容渲染
- **Lucide React**: 现代化图标库

## 项目结构

```
├── 博客/                    # 博客内容目录（Markdown 文件）
├── src/
│   ├── app/                # Next.js App Router
│   ├── components/         # React 组件
│   └── utils/             # 工具函数
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建和部署

```bash
npm run build
```

生成的静态文件将位于 `out` 目录中，可以直接部署到任何静态网站托管服务。

## 📖 使用说明

### 添加博客内容

1. 将您的 Markdown 文件组织在 `博客/` 目录中
2. 支持任意深度的文件夹嵌套
3. 只有 `.md` 文件会显示在文件树和网站中
4. 文件名和文件夹名支持中文

### 更新博客

每次添加或修改博客内容后，运行以下命令：

```bash
npm run update-blog
```

这个命令会：
- 检查博客文件
- 清理构建缓存  
- 重新构建静态网站
- 生成所有文章页面

### 部署网站

构建完成后，`out/` 目录包含完整的静态网站文件，可以部署到任何静态托管服务。

## 🚀 自动化部署流程

### GitHub + Vercel 自动部署

1. **初始设置**：
   ```bash
   git init
   git add .
   git commit -m "初始化博客项目"
   git branch -M main
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **连接 Vercel**：
   - 在 [Vercel](https://vercel.com) 中导入 GitHub 项目
   - Vercel 会自动检测 Next.js 项目并配置

3. **日常更新流程**：
   ```bash
   # 1. 编辑博客内容（在 博客/ 目录中）
   # 2. 更新博客
   npm run update-blog
   
   # 3. 提交到 GitHub
   git add .
   git commit -m "更新博客内容"  
   git push
   
   # 4. Vercel 自动部署新版本 🎉
   ```

### 手动部署

如果您想手动部署到其他平台：

```bash
npm run update-blog
# 然后将 out/ 目录上传到您的静态托管服务
```

## 自定义

- 修改 `src/components/FileTree.tsx` 来调整文件树样式
- 修改 `src/components/MarkdownRenderer.tsx` 来调整内容渲染样式
- 修改 `tailwind.config.js` 来自定义主题颜色

## 许可证

MIT License 