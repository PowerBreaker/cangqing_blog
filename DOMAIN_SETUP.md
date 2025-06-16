# Cloudflare 域名配置指南

## 目标
将 `fenixhuang.com` 域名通过 Cloudflare 指向你的 Vercel 部署的博客

## 配置步骤

### 步骤 1：获取 Vercel 部署信息

1. **登录 Vercel Dashboard**
   - 访问 [vercel.com](https://vercel.com)
   - 找到你的 `cangqing_blog` 项目

2. **获取默认域名**
   - 在项目页面复制默认的 Vercel 域名
   - 格式通常是：`cangqing-blog-xxx.vercel.app`

### 步骤 2：在 Vercel 中添加自定义域名

1. **进入项目设置**
   - 在 Vercel 项目页面，点击 "Settings"
   - 选择 "Domains" 选项卡

2. **添加域名**
   - 点击 "Add Domain"
   - 输入：`fenixhuang.com`
   - 点击 "Add"

3. **添加 www 子域名（可选但推荐）**
   - 再次点击 "Add Domain"
   - 输入：`www.fenixhuang.com`
   - 点击 "Add"

### 步骤 3：在 Cloudflare 中配置 DNS

1. **登录 Cloudflare**
   - 访问 [cloudflare.com](https://cloudflare.com)
   - 选择你的 `fenixhuang.com` 域名

2. **进入 DNS 设置**
   - 点击左侧菜单的 "DNS" → "Records"

3. **添加 DNS 记录**

   **方法一：使用 CNAME 记录（推荐）**
   ```
   类型: CNAME
   名称: @
   目标: cname.vercel-dns.com
   代理状态: 启用代理（橙色云朵）
   ```

   **为 www 子域名添加记录：**
   ```
   类型: CNAME
   名称: www
   目标: cname.vercel-dns.com
   代理状态: 启用代理（橙色云朵）
   ```

   **方法二：使用 A 记录（备选）**
   如果 CNAME 不工作，使用这些 A 记录：
   ```
   类型: A
   名称: @
   IPv4 地址: 76.76.19.19
   代理状态: 启用代理（橙色云朵）
   
   类型: A
   名称: www
   IPv4 地址: 76.76.19.19
   代理状态: 启用代理（橙色云朵）
   ```

### 步骤 4：配置页面规则（可选）

如果你想要 www 重定向到非 www：

1. **进入页面规则**
   - 在 Cloudflare 中选择 "Rules" → "Page Rules"

2. **创建重定向规则**
   ```
   URL 模式: www.fenixhuang.com/*
   设置: 转发 URL (301 - 永久重定向)
   目标 URL: https://fenixhuang.com/$1
   ```

### 步骤 5：验证配置

1. **等待 DNS 传播**
   - 通常需要几分钟到几小时
   - 可以使用在线 DNS 查询工具检查

2. **测试访问**
   - 访问 `https://fenixhuang.com`
   - 访问 `https://www.fenixhuang.com`
   - 确认都能正常加载你的博客

3. **检查 SSL 证书**
   - Cloudflare 和 Vercel 都会自动配置 SSL
   - 确保网站显示为安全连接（绿色锁图标）

## 可能遇到的问题

### 问题 1：域名验证失败
**解决方案：**
- 确保 DNS 记录正确配置
- 等待 DNS 传播完成（最长 48 小时）
- 检查域名注册商的名称服务器是否指向 Cloudflare

### 问题 2：SSL 证书问题
**解决方案：**
- 在 Cloudflare SSL/TLS 设置中选择 "Full" 或 "Full (strict)"
- 确保 Cloudflare 的 "Always Use HTTPS" 已启用

### 问题 3：重定向循环
**解决方案：**
- 检查 Cloudflare 的 SSL 模式设置
- 确保没有冲突的页面规则

## 推荐的 Cloudflare 安全设置

1. **SSL/TLS 设置**
   - 加密模式：Full (strict)
   - 始终使用 HTTPS：开启
   - HSTS：开启

2. **速度优化**
   - 开启 Brotli 压缩
   - 开启 Auto Minify (HTML, CSS, JS)
   - 开启 Rocket Loader

3. **安全性**
   - 开启 WAF（Web Application Firewall）
   - 配置适当的安全级别

## 验证清单

- [ ] Vercel 项目已添加自定义域名
- [ ] Cloudflare DNS 记录已配置
- [ ] 域名能够正常访问博客
- [ ] SSL 证书正常工作
- [ ] www 重定向设置正确（如果需要）

完成这些步骤后，用户就可以通过 `fenixhuang.com` 访问你的青阳博客了！ 