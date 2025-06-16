# 1. 视频案例
## 1.1 AI code 实战｜一小时用 cursor 发布上线微信小程序项目
[https://www.bilibili.com/video/BV1kJ2LYME9t/?spm_id_from=333.337.search-card.all.click&vd_source=d8ad65b4cb72b93b334cfe658ce02ec0](https://www.bilibili.com/video/BV1kJ2LYME9t/?spm_id_from=333.337.search-card.all.click&vd_source=d8ad65b4cb72b93b334cfe658ce02ec0) 

总结：
1. 使用cursor直接创建了微信小程序项目。
    1. 再使用微信小程序开发工具进行调试。
2. 直接创建了一个智能体，再通过API来访问这个智能体，要求智能体给出制定的数据
    1. 案例中，是每一个音标的单词。应用要求一个元音音标后，智能体返回50个单词。实际上就是对ai的应用，简化了·程序数据的开发。
    2. ai智能体：腾讯旗下的，自己创建的，理论上，用其他人的ai智能体也可以，只要能调用接口，但不知道费用。
    3. 接口：给出了具体要求，和接口api，token，代码示例，cursor成功连上
3. 使用微信小程序云开发的云数据库。避免了接口的反复开发。
4. 用户体系
    1. 直接用用户自主注册的账号密码，实现用户管理。
    2. 这里，将用户和已有数据相关联，ai直接生成代码，真的很快
    3. 小程序可以连接微信的用户体系，有专门的接口
5. 界面
    1. 可以直接要求界面风格，ai会快速调整css
    2. 小程序开发工具，有可视化开发，也就是直接拖拽界面组件
6. 发布
    1. 微信小程序教育版，可以快速发布上线小程序，让别人扫描二维码体验。
    2. 本质上和测试版差不多，但更稳定。


## 1.2 AI时代超强编程组合Cursor+Devbox

Cursor开发+Devbox部署
来自 [https://www.bilibili.com/video/BV1caqDYyEp5/?spm_id_from=333.337.search-card.all.click&vd_source=d8ad65b4cb72b93b334cfe658ce02ec0](https://www.bilibili.com/video/BV1caqDYyEp5/?spm_id_from=333.337.search-card.all.click&vd_source=d8ad65b4cb72b93b334cfe658ce02ec0)

- 环境：sealos
    - sealos地址：[https://cloud.sealos.run/?uid=Kt1gH3_Bta](https://cloud.sealos.run/?uid=Kt1gH3_Bta)
    - 实际上，整个项目，都和sealos有关系。
        - 在sea创建前端项目，再创建后端项目，做好接口，连接好
        - 就可以直接部署上线了
- 项目
    - 代码编辑
        - 后端代码
            - 自动生成了很大部分
            - 主要是接口数据和地址，进行了调整
            - 个人有一些微调部分，cursor可以补全代码
        - 前端代码
            - 直接用图片进行了生成，要求不高
    - 部署
        - 全部依赖于devbox（sea）
- 总结
    - 现在的纯线上服务器开发，可以将部署成本变得很低，也能自动解决运维的一些问题
    - 后端接口、前后端连接，一些项目的问题，一些代码，仍然需要自己写。
    - 需要一定的后端代码基础。
- UP
    - UP主还不错。对关键知识点的讲解还行，手把手可以更，但还是需要后端基础，主要是接口。

