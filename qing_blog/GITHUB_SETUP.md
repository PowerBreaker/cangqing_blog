# GitHub 仓库创建指南

## 项目状态
✅ 本地 git 仓库已初始化
✅ 所有文件已提交到本地仓库
✅ 项目结构完整，包含：
- Next.js 博客应用
- 主题系统（明暗模式切换）
- 静态文件树导航
- Markdown 文章渲染
- 响应式设计

## 创建 GitHub 仓库步骤

### 1. 在 GitHub 上创建新仓库
1. 访问 [GitHub](https://github.com)
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 仓库名称：`cangqing_blog`
4. 描述：`一个使用 Next.js 构建的个人博客，支持明暗主题切换和 Markdown 文章展示`
5. 设置为公开仓库（Public）
6. **不要**初始化 README、.gitignore 或 license（因为我们已经有了）
7. 点击 "Create repository"

### 2. 连接本地仓库到 GitHub
创建完仓库后，在你的项目目录中运行以下命令：

```bash
# 添加远程仓库
git remote add origin https://github.com/你的用户名/cangqing_blog.git

# 推送到远程仓库
git branch -M main
git push -u origin main
```

### 3. 验证推送成功
推送完成后，你可以：
- 在 GitHub 上查看你的仓库
- 确认所有文件都已上传
- 检查 README.md 是否正确显示

## 项目特性
- 🌓 明暗主题切换
- 📱 响应式设计
- 📄 Markdown 文章支持
- 🗂️ 文件树导航
- ⚡ Next.js 静态生成
- 🎨 现代化 UI 设计

## 部署建议
建议使用 Vercel 进行部署，因为它与 Next.js 完美集成。

## 注意事项
- 确保你的 GitHub 用户名替换上面命令中的"你的用户名"
- 如果遇到认证问题，可能需要设置 GitHub Personal Access Token
- 第一次推送时可能需要输入 GitHub 凭据 