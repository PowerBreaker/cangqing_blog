import { getAllPosts, buildFileTree } from '@/lib/posts'
import StaticFileTree from '@/components/StaticFileTree'
import Link from 'next/link'
import { Calendar, FileText } from 'lucide-react'

export default function Home() {
  const posts = getAllPosts()
  const fileTree = buildFileTree()
  
  // 动态查找特定文章的链接
  const findPostByTitle = (titleKeyword: string) => {
    return posts.find(post => 
      post.title.includes(titleKeyword) || 
      post.relativePath.includes(titleKeyword)
    )
  }
  
  const findPostsByCategory = (categoryKeyword: string) => {
    return posts.filter(post => 
      post.relativePath.includes(categoryKeyword)
    ).slice(0, 3) // 限制显示3篇
  }
  
  // 查找特定文章
  const tianxingcunPost = findPostByTitle('天星村')
  const dnaPost = findPostByTitle('DNA数字游民社区（上）')
  
  // 查找分类文章
  const memoirPosts = findPostsByCategory('回忆录')
  const essayPosts = findPostsByCategory('杂文')
  
  return (
    <div className="relative bg-gray-50 dark:bg-gray-900 transition-colors min-h-screen">
      {/* 左侧文件树 - 现在是absolute定位 */}
        <StaticFileTree tree={fileTree} />
      
      {/* 右侧内容区域 - 添加左边距以避免被导航栏遮挡 */}
      <div className="ml-80 min-h-screen flex flex-col">
        <div className="absolute top-0 left-80 right-0 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 z-20">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 min-w-0 flex-1">
                <div className="flex items-center space-x-3 h-[44px]">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                  <div className="flex flex-col justify-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">青阳博客</h1>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-tight">探索技术与思考的世界</p>
                  </div>
                </div>
              </div>
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className="block">
                  <img 
                    src="/logo.png" 
                    alt="青之鹰Logo" 
                    className="h-10 w-10 object-contain rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* 主要内容区域 */}
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 pt-[73px]">
          <div className="max-w-4xl mx-auto px-8 py-8">
            <article>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">我是谁</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">#青阳</p>
                <p className="mb-4 text-gray-700 dark:text-gray-200">人既为人，有责任有义务主宰自己的命运。</p>
                <p className="mb-4 text-gray-700 dark:text-gray-200">如雄鹰振翅飞翔，不惧高空的寒冷与风暴。</p>
                <p className="mb-4 text-gray-700 dark:text-gray-200">命运从来不是命中注定，而是每一次选择和行动的累积。</p>
                <p className="mb-4 text-gray-700 dark:text-gray-200">唯有内心坚定、行动果敢，才能在风雨中寻得属于自己的天空。</p>
                <p className="mb-4 text-gray-700 dark:text-gray-200">那些路途的阻碍，无非是磨砺翅膀的契机；</p>
                <p className="mb-4 text-gray-700 dark:text-gray-200">那些山巅的难关，不过是登高凌顶的阶梯。</p>
                <p className="mb-8 text-gray-700 dark:text-gray-200">无论高空多么遥远，天地多么广阔，只要敢于振翅行动，属于自己的天空终将展现。</p>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">生活记录</h3>
                <ul className="mb-8">
                  {tianxingcunPost && (
                    <li><Link href={`/post/${tianxingcunPost.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">{tianxingcunPost.title}</Link></li>
                  )}
                  {dnaPost && (
                    <li><Link href={`/post/${dnaPost.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">{dnaPost.title}</Link></li>
                  )}
                  {memoirPosts.slice(0, 2).map(post => (
                    post.slug !== tianxingcunPost?.slug && post.slug !== dnaPost?.slug && (
                      <li key={post.slug}><Link href={`/post/${post.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">{post.title}</Link></li>
                    )
                  ))}
                </ul>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">业务思考</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">相关业务思考文章将在后续整理发布...</p>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">杂文随笔</h3>
                {essayPosts.length > 0 ? (
                  <ul className="mb-8">
                    {essayPosts.map(post => (
                      <li key={post.slug}><Link href={`/post/${post.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">{post.title}</Link></li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300 mb-8">更多思考性文章敬请期待...</p>
                )}

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">我的社交媒体</h3>
                <ul className="mb-8">
                  <li><a href="https://space.bilibili.com/382077116?spm_id_from=333.1007.0.0" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Bilibili视频</a></li>
                  <li><a href="https://www.xiaohongshu.com/user/profile/642e7e78000000001400d8dd?m_source=pinpai" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">小红书图文</a></li>
                  <li><a href="https://mp.weixin.qq.com/s/sQBhGPx5wxjmahaHaxHW8g" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">微信公众号：青阳心</a></li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">有任何想法或评论</h3>
                <p className="mb-2 text-gray-700 dark:text-gray-200">发送邮件到：</p>
                <p className="mb-4"><a href="mailto:fenixhuang@foxmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">fenixhuang@foxmail.com</a></p>
                <p className="mb-4 text-gray-700 dark:text-gray-200">有兴趣想交流请添加：</p>
                <div className="mb-8">
                  <img src="https://fenixhuang-1302994934.cos.ap-shanghai.myqcloud.com/qingyangxin/20240116145615.png" alt="微信二维码" className="w-28 h-auto rounded-lg" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">觉得内容有所帮助，想要赞赏</h3>
                <div>
                  <img src="https://fenixhuang-1302994934.cos.ap-shanghai.myqcloud.com/qingyangxin/20240116145518.png" alt="赞赏二维码" className="w-32 h-auto rounded-lg" />
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
} 