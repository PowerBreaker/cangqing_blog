
https://www.bilibili.com/video/BV1Lx4y1D7em?spm_id_from=333.788.videopod.sections&vd_source=d8ad65b4cb72b93b334cfe658ce02ec0
# 1. 课程内容
## （1）零基础AI全栈开发系列教程（一）
![image.png|550](https://fenixhuang-1302994934.cos.ap-shanghai.myqcloud.com/qingyangxin/20250104172419.png)



本质上在讲解这张图。
也就是应用的结构。

- 前端
	- 前端三剑客
	- 前端框架
		- Vue更容易，更好上手
- 后端
	-  对数据库（DB）进行增删改查操作
	- 内容
		- 后端语言-框架
		- 数据库
		- 服务器部署
- 云开发平台
	- 数据库
	- 项目环境
	- 项目
- AI部分
	- 将AI模型接入到项目中
	- 使用开源AI工具
	- 部署开源AI模型，创建智能体或AI应用

## （2） HTML+CSS 零基础入门教程

一些HTML+CSS的基础知识。有基础的可以跳过，也可以快速进行温习。
这里稍微涉及了使用AI生成前端样式的方法。


- 基础
	- HTML是框架
		- 组件嵌套
			- 需要预先想好前端框架的结构
	- CSS是样式
		- 选择器渲染（.box）
		- 可以AI生成，但要会手动调整，这样才能达到最理想的效果
		- 主要的参数和调整方式，要熟悉
- 工具
	- VS-code
		- 文件夹可以直接拖动到VScode，进行打开项目
	- Cursor
- AI
	- AI提示词使用
		- 先发送一段给AI的角色描述，来限定ai的回复风格。
			- ![image.png|500](https://fenixhuang-1302994934.cos.ap-shanghai.myqcloud.com/qingyangxin/20250104172444.png)
	- 用AI生成前端样式
- 云开发-sealos
	- 对象存储
	- 可以公开，可以进行托管，会生成相应的共享域名（静态网站，自动选择index.html）
	- 有收费，但小网站应该不高

## （3） JavaScript 零基础入门教程教学

在讲解面向对象的编程语言（JS）。
介绍了很多编程基础，使用JS语言，例如：
变量、数据类型、运算符、条件&循环语句，函数。
可以快速刷一遍菜鸟编程的相关内容。

- 变量
	- 数据类型
		- 对象（开发常用）
			- ![image.png|229](https://fenixhuang-1302994934.cos.ap-shanghai.myqcloud.com/qingyangxin/20250104172454.png)
- 运算符
- 条件&循环
- 函数（function）
	- ![image.png|197](https://fenixhuang-1302994934.cos.ap-shanghai.myqcloud.com/qingyangxin/20250104172516.png)


## （4）十分钟入门vue


- 开发环境
	- Node
		- 安装NVM
		- WIN+R：nvm install 20(版本号)
	- VS code
		- Ctrl+J，打开终端面板
		- 命令：npm i，安装项目所需依赖
		- 命令：npm run dev，运行项目
	- 
- vue结构
	- 三段式结构
	- 事件监听
		- @click="“
	- 创建变量
		- ref包裹（注意，不同的框架，对这个的要求不一样。uniapp没有这个要求）
		- ![image.png|259](https://fenixhuang-1302994934.cos.ap-shanghai.myqcloud.com/qingyangxin/20250104172641.png)
	- 输入框获取变量：v-model
		- ![image.png|500](https://fenixhuang-1302994934.cos.ap-shanghai.myqcloud.com/qingyangxin/20250104172656.png)
	- vue中，在JS部分，使用变量，需要加上value
		- ![image.png|256](https://fenixhuang-1302994934.cos.ap-shanghai.myqcloud.com/qingyangxin/20250104172707.png)
	- 对数组的操作

## （5）零基础Vue3教程教学

具体参见vue教学，或uniapp教学。

- 事件监听
	- @click 类似的
	- 通过事件监听，获取用户的动作，或输入的值
	- v-model，双向绑定（输入框等）
- 循环v-for
	- v-show


## （6）Axios 前后端对接教程

使用Axios技术，进行前后端对接

- 环境依赖
	- NPM install
	- NPM install axios
	- 引入：import axios from 'axios'；
- 前端使用接口
	- 简单示例
		- ![image.png|400](https://fenixhuang-1302994934.cos.ap-shanghai.myqcloud.com/qingyangxin/20250104172722.png)
		- ![image.png|400](https://fenixhuang-1302994934.cos.ap-shanghai.myqcloud.com/qingyangxin/20250104172734.png)
		- 需要：
			- 接口地址：url
			- 请求方法：GET & POST
			- 是否需要参数，参数格式，返回格式
		- 记得加上异步 async 和等待返回 await 
	-  并不难。创建增删改查的方法，使用HTTP请求，向后端发起请求。如有数据返回，获取相应数据，更改相应的变量。

## （7）20分钟入门 Node.js

后端代码的标准化程度比较高，所以可以更快捷的使用AI生成相关代码。
向AI描述清楚要进行的增删改查的操作，生产相应代码。

要求AI给出代码的每一行注释，可以快速学习。
node.js，使用JS语法，并不复杂。

感觉，纯粹的云开发，似乎更快捷一些。虽然目前看上去，也不是很难。
但反复使用接口，有接口的好处。不同页面对同一个数据进行请求，可以重复调用接口，而不用反复书写（但云开发实际上也可以调用公共函数，无需重复开发）。
回头再看看微信小程序的云开发。

- node.js 增删改查
	- ![image.png](https://fenixhuang-1302994934.cos.ap-shanghai.myqcloud.com/qingyangxin/20250104172748.png)
- 云开发
	- 传统流程
		- 部署一台服务器，将数据库和代码部署到服务器
		- 注册域名，备案
		- 调试完成后，上线应用
	- 云开发 sealos
		- 线上数据库（集合）
		- 线上部署后端代码（函数）（接口）
		- 备案，上线
- 接口
	- 数据输入格式核验
	- 接口调试


## （9）一行代码不写搞定开发和上线  Cursor + Devbox




# cursor 提示词

### 后端提示词

请为我开发一个基于 Node.js 和Express 框架的 Todo List 后端项目。项目需要实现以下四个 RESTful API 接口：

1. 查询所有待办事项
    - 接口名: GET /api/get-todo
    - 功能: 从数据库的'list'集合中查询并返回所有待办事项
    - 参数: 无
    - 返回: 包含所有待办事项的数组
2. 添加新的待办事项
    - 接口名: POST /api/add-todo
    - 功能: 向'list'集合中添加新的待办事项
    - 参数: { "value": string, // 待办事项的具体内容 "isCompleted": boolean // 是否完成，默认为 false }
    - 返回: 新添加的待办事项对象，包含自动生成的唯一 id
3. 更新待办事项状态
    - 接口名: POST /api/update-todo/
    - 功能: 根据 id 更新指定待办事项的完成状态（将 isCompleted 值取反）
    - 参数: id
    - 返回: 更新后的待办事项对象
4. 删除待办事项
    - 接口名: POST /api/del-todo/
    - 功能: 根据 id 删除指定的待办事项
    - 参数: id
    - 返回: 删除操作的结果状态

技术要求：

1. 使用 Express 框架构建 API
2. 使用 MongoDB 作为数据库，通过 Mongoose 进行数据操作
3. 实现适当的错误处理和输入验证
4. 使用异步/等待（async/await）语法处理异步操作
5. 遵循 RESTful API 设计原则
6. 添加基本的日志记录功能


以下是数据库连接方式：
mongodb://root:t4s2k5dp@test-db-mongodb.ns-nhjia3j3.svc:27017

1. 直接以当前目录作为项目根目。注意 此目录已经初始化完了nodejs项目 直接修改即可
2. 如果需要执行命令，请暂停创建文件，让我先执行命令

为这个项目中的所有代码写上详细注释

### npm 安装依赖很慢请执行这行命令！！！

```jsx
npm config set registry <https://registry.npmmirror.com>
```

### 前端提示词

请为我开发一个基于 Vue 3 的Todo List 应用。要求如下：

1. 功能需求：
    - 添加新的待办事项
    - 标记待办事项为完成/未完成
    - 删除待办事项
    - 统计待办事项完成度
    - 过滤显示（全部/已完成/未完成）
2. UI/UX 设计要求：
    - 全屏响应式设计，适配不同设备
    - 拥有亮色模式和夜间模式
    - 现代化、简洁的界面风格
    - 丰富的色彩运用，但保持整体和谐
    - 流畅的交互动画，提升用户体验
    - 在按钮和需要的地方添加上图标
    - 参考灵感：结合苹果官网的设计美学

要求：

1. 直接以当前目录作为项目根目。注意 此目录已经初始化完了vue3项目结构 直接修改即可
2. 如果需要执行命令，请暂停创建文件，让我先执行命令
3. 请你根据我的需要，一步一步思考，给我开发这个项目。特别是UI部分 一定要足够美观和现代化

那这里总结一下 我们用cursor完成了前端代码的开发 我们就是发送提示词写清楚我们的需求 以及出现问题 或者想调整功能和UI 继续 用文字和他持续沟通即可。