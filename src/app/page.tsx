'use client'

import { useState } from 'react'
import { getAllPosts, getPostByPath } from '@/lib/posts'
import { getBlogConfig } from '@/lib/blog-config'
import SimpleMarkdownRenderer from '@/components/SimpleMarkdownRenderer'
import TableOfContents from '@/components/TableOfContents'

export default function Home() {
  const [isTocOpen, setIsTocOpen] = useState(false)
  const posts = getAllPosts()
  const blogConfig = getBlogConfig()
  
  // 根据配置获取首页内容
  const homePagePost = getPostByPath(blogConfig.homePage)
  
  // 如果没有找到配置的首页文件，显示默认内容
  if (!homePagePost) {
    return (
      <>
        {/* 中间正文区域 - 响应式布局 */}
        <div className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center overflow-y-auto overscroll-auto">
          <div className="w-full max-w-3xl px-4 md:px-8 pt-16 md:pt-[78px] pb-32 md:pb-[128px] md:ml-[85px]">
            <article className="w-full">
              <header className="mb-8" style={{ textAlign: 'left' }}>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4" style={{ textAlign: 'left' }}>
                  {blogConfig.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm" style={{ textAlign: 'left' }}>
                  {blogConfig.description}
                </p>
              </header>
              
              <div className="prose prose-lg max-w-none dark:prose-invert mx-auto">
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
        
        {/* 右侧空白区域 - 只在桌面端显示 */}
        <div className="hidden md:block w-[416px] flex-shrink-0 bg-gray-50 dark:bg-gray-900 pr-32">
          <div className="sticky p-6" style={{ top: '78px' }}>
            {/* 首页不显示目录，但保持布局一致 */}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* 移动端目录按钮 - 只在移动端显示 */}
      <button
        onClick={() => setIsTocOpen(!isTocOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="切换目录"
      >
        <svg
          className="w-6 h-6 text-gray-600 dark:text-gray-300"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* 移动端目录遮罩层 */}
      {isTocOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsTocOpen(false)}
        />
      )}

      {/* 中间正文区域 - 响应式布局 */}
      <div className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center overflow-y-auto overscroll-auto">
        <div className="w-full max-w-3xl px-4 md:px-8 pt-16 md:pt-[78px] pb-32 md:pb-[128px] md:ml-[85px]">
          <article className="w-full">
            <header className="mb-8" style={{ textAlign: 'left' }}>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4" style={{ textAlign: 'left' }}>
                {blogConfig.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm" style={{ textAlign: 'left' }}>
                {blogConfig.description}
              </p>
            </header>
            
            <div 
              className="prose prose-sm md:prose-lg max-w-none dark:prose-invert" 
              style={{ 
                fontSize: '14px',
                transform: 'scale(0.9)',
                transformOrigin: 'top left',
                width: '111.11%'
              }}
            >
              <SimpleMarkdownRenderer content={homePagePost.content} />
            </div>
          </article>
        </div>
      </div>
      
      {/* 右侧目录导航 - 桌面端固定，移动端可隐藏 */}
      <div className={`
        md:w-[416px] md:flex-shrink-0 md:bg-gray-50 md:dark:bg-gray-900 md:pr-32 md:relative md:translate-x-0
        fixed md:static top-0 right-0 z-40 w-80 h-full bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out
        ${isTocOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="sticky p-6 md:pt-[78px] pt-16 h-full overflow-y-auto">
          <div className="md:hidden mb-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">目录</h3>
            <button
              onClick={() => setIsTocOpen(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <TableOfContents content={homePagePost.content} />
        </div>
      </div>
    </>
  )
} 