import { getAllPosts, getPostByPath } from '@/lib/posts'
import { getBlogConfig } from '@/lib/blog-config'
import SimpleMarkdownRenderer from '@/components/SimpleMarkdownRenderer'
import TableOfContents from '@/components/TableOfContents'

export default function Home() {
  const posts = getAllPosts()
  const blogConfig = getBlogConfig()
  
  // 根据配置获取首页内容
  const homePagePost = getPostByPath(blogConfig.homePage)
  
  // 如果没有找到配置的首页文件，显示默认内容
  if (!homePagePost) {
    return (
      <>
        {/* 中间正文区域 - 弹性宽度，居中显示 */}
        <div className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center overflow-y-auto overscroll-auto">
          <div className="w-full max-w-3xl px-4 lg:px-8 lg:ml-20">
            <div className="pt-4 lg:pt-20 pb-16 lg:pb-32">
              <article className="w-full">
                <header className="mb-8" style={{ textAlign: 'left' }}>
                  <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4" style={{ textAlign: 'left' }}>
                    {blogConfig.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 text-sm" style={{ textAlign: 'left' }}>
                    {blogConfig.description}
                  </p>
                </header>
                
                <div className="prose prose-base lg:prose-lg max-w-none dark:prose-invert mx-auto">
                  <p className="text-red-600 dark:text-red-400 mb-4">
                    错误：未找到配置的首页文件 "{blogConfig.homePage}"
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    请检查 blog.config.js 中的 homePage 配置是否正确。
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
        
        {/* 右侧空白区域 - 桌面端显示，移动端隐藏 */}
        <div className="hidden lg:block w-[416px] flex-shrink-0 bg-gray-50 dark:bg-gray-900 pr-32">
          <div className="sticky p-6" style={{ top: '78px' }}>
            {/* 首页不显示目录，但保持布局一致 */}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* 中间正文区域 - 弹性宽度，居中显示 */}
      <div className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center overflow-y-auto overscroll-auto">
        <div className="w-full max-w-3xl px-4 lg:px-8 lg:ml-20">
          <div className="pt-4 lg:pt-20 pb-16 lg:pb-32">
            <article className="w-full">
              <header className="mb-8" style={{ textAlign: 'left' }}>
                <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4" style={{ textAlign: 'left' }}>
                  {blogConfig.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm" style={{ textAlign: 'left' }}>
                  {blogConfig.description}
                </p>
              </header>
              
              <div 
                className="prose prose-sm lg:prose-lg max-w-none dark:prose-invert" 
                style={{ 
                  fontSize: '14px',
                  transform: 'scale(1) lg:scale(0.9)',
                  transformOrigin: 'top left',
                  width: '100% lg:111.11%'
                }}
              >
                <SimpleMarkdownRenderer content={homePagePost.content} />
              </div>
            </article>
          </div>
        </div>
      </div>
      
      {/* 右侧目录导航 - 桌面端显示，移动端隐藏 */}
      <div className="hidden lg:block w-[416px] flex-shrink-0 bg-gray-50 dark:bg-gray-900 pr-32">
        <div className="sticky p-6" style={{ top: '78px' }}>
          <TableOfContents content={homePagePost.content} />
        </div>
      </div>
    </>
  )
} 