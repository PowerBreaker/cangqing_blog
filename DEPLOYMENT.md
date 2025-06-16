# 部署指南

## 本地开发

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

访问 `http://localhost:3000` 查看网站

## 部署到 Vercel

### 方法1：通过 Vercel CLI（推荐）

1. 安装 Vercel CLI：
```bash
npm i -g vercel
```

2. 在项目根目录运行：
```bash
vercel --prod
```

3. 按照提示完成部署设置

### 方法2：通过 GitHub 集成

1. 将项目推送到 GitHub
2. 在 [Vercel](https://vercel.com) 登录
3. 点击 "New Project"
4. 选择您的 GitHub 仓库
5. Vercel 会自动检测 Next.js 项目并部署

## 部署到其他平台

### Netlify

1. 构建项目：
```bash
npm run build
```

2. 上传 `out` 目录到 Netlify

### 其他静态托管平台

项目支持静态导出，可以部署到任何静态网站托管服务：

1. 修改 `next.config.js` 添加：
```javascript
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

2. 构建：
```bash
npm run build
```

3. 上传 `out` 目录到您的托管平台

## 注意事项

- 确保 `博客/` 目录存在且包含您的 Markdown 文件
- 只有 `.md` 文件会显示在文件树中
- 支持任意深度的文件夹嵌套
- 文件和文件夹名称支持中文

## 自定义配置

### 修改博客标题
编辑 `src/components/FileTree.tsx` 中的标题：
```typescript
<h2 className="text-lg font-semibold text-gray-800">您的博客名称</h2>
```

### 修改样式
- 编辑 `src/app/globals.css` 修改全局样式
- 编辑 `tailwind.config.js` 修改主题配置

### 添加自定义功能
- API 路由位于 `src/app/api/` 目录
- 组件位于 `src/components/` 目录 