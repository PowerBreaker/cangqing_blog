# 博客配置系统

## 概述

青阳博客支持通过配置文件自定义博客的基本信息和首页内容。配置文件位于项目根目录的 `blog.config.js`。

## 配置文件结构

```javascript
const blogConfig = {
  // 博客基本信息
  name: 'DN黄山',              // 博客名称，显示在导航栏和首页
  description: 'DN黄山的日常分享',  // 博客描述，显示在导航栏下方
  
  // 首页显示的文章路径（相对于整个项目的相对路径）
  // 支持Windows路径分隔符（\），会自动转换为标准路径分隔符
  homePage: '博客\\_我是谁\\首页.md',  // 首页文件路径，相对于项目根目录
  
  // 其他配置
  logo: '/logo.png',            // 博客Logo路径
  
  // 主题配置
  theme: {
    // 默认主题模式：'light' | 'dark' | 'system'
    defaultMode: 'dark'
  }
}

module.exports = blogConfig
```

## 配置说明

### 基本信息

- **name**: 博客名称，会显示在左侧导航栏和页面标题
- **description**: 博客描述，显示在导航栏博客名称下方
- **logo**: Logo图片路径，相对于 `public` 目录

### 首页配置

- **homePage**: 指定首页要显示的markdown文件
  - 路径相对于整个项目根目录
  - 例如：`'博客\\_我是谁\\首页.md'` 对应项目中的文件 `博客/_我是谁/首页.md`
  - 支持Windows路径分隔符（`\`）和Unix路径分隔符（`/`）
  - 直接复制文件的相对路径即可使用，系统会自动处理路径分隔符
  - 首页会以博客正文的形式渲染该文件内容
  - 支持所有markdown语法和双链语法
  - 包含文章目录导航

### 主题配置

- **theme.defaultMode**: 默认主题模式
  - `'light'` - 明亮模式
  - `'dark'` - 黑暗模式  
  - `'system'` - 跟随系统设置

#### 主题行为说明

1. **首次访问**: 使用 `defaultMode` 配置的主题模式
2. **再次访问**: 使用用户上次选择的主题偏好（自动保存在浏览器中）
3. **用户切换**: 用户可随时通过导航栏的主题切换按钮更改主题

## 使用方法

1. **修改博客基本信息**：
   编辑 `blog.config.js` 中的 `name` 和 `description` 字段

2. **设置自定义首页**：
   - 在项目中找到你想设置为首页的markdown文件
   - 右键复制文件的相对路径（Windows用户会看到 `\` 分隔符）
   - 直接粘贴到 `blog.config.js` 中的 `homePage` 字段
   - 例如：`'博客\\我的文章\\自我介绍.md'` 或 `'博客/_我是谁/首页.md'`
   - 重启开发服务器查看效果

3. **更换Logo**：
   - 将新的Logo图片放入 `public/` 目录
   - 修改 `blog.config.js` 中的 `logo` 字段

4. **设置默认主题模式**：
   - 修改 `blog.config.js` 中的 `theme.defaultMode` 字段
   - 可选值：`'light'`、`'dark'`、`'system'`
   - 重启开发服务器查看效果

## 首页文件示例

首页markdown文件支持所有标准语法：

```markdown
### 我是谁
#青阳 
人既为人，有责任有义务主宰自己的命运。

### 生活记录
[[回忆录：夏日一周の天星村之旅]]  // 双链语法
[[DNA数字游民社区（上）]]

### 我的社交媒体
[Bilibili视频](https://space.bilibili.com/382077116)
[小红书图文](https://www.xiaohongshu.com/user/profile/642e7e78000000001400d8dd)

### 联系方式
![微信二维码](https://example.com/wechat-qr.png)
```

## API支持

配置信息也可以通过API获取：

```
GET /api/config
```

返回JSON格式的配置信息，可用于客户端动态获取配置。

## 注意事项

1. 修改配置文件后需要重启开发服务器
2. 确保首页文件路径正确，否则会显示错误提示
3. Logo文件路径需要相对于 `public` 目录
4. 支持Windows和Unix两种路径分隔符格式
5. 双链语法会自动转换为可点击的内部链接 