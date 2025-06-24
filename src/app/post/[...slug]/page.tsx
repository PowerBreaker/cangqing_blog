'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts'
import { processDynamicParams, safeDecodeURIComponent } from '@/lib/url-utils'
import SimpleMarkdownRenderer from '@/components/SimpleMarkdownRenderer'
import TableOfContents from '@/components/TableOfContents'

interface PostPageProps {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams() {
  try {
    const paths = getAllPostSlugs()
    return paths.map((path) => ({
      slug: path.params.slug
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    // 返回空数组，让动态渲染处理
    return []
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const slug = params.slug.join('/')
    const post = getPostBySlug(slug)
    
    if (!post) {
      return {
        title: '文章未找到 - 青阳博客'
      }
    }
    
    return {
      title: `${post.title} - 青阳博客`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: '青阳博客'
    }
  }
}

function PostPageClient({ params }: PostPageProps) {
  const [isTocOpen, setIsTocOpen] = useState(false)
  
  // 🔧 使用新的URL处理工具，确保正确的编码处理
  const { decodedParams, slug } = processDynamicParams(params.slug)
  
  const post = getPostBySlug(slug)
  
  if (!post) {
    notFound()
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
            {/* 文章标题 */}
            <header className="mb-8" style={{ textAlign: 'left' }}>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4" style={{ textAlign: 'left' }}>
                {post.title}
              </h1>
              {post.date && (
                <time className="text-gray-600 dark:text-gray-300 text-sm" style={{ textAlign: 'left' }}>
                  发布于 {new Date(post.date).toLocaleDateString('zh-CN')}
                </time>
              )}
            </header>
            
            {/* 文章正文 */}
            <div 
              className="prose prose-sm md:prose-lg max-w-none dark:prose-invert" 
              style={{ 
                fontSize: '14px',
                transform: 'scale(0.9)',
                transformOrigin: 'top left',
                width: '111.11%'
              }}
            >
              <SimpleMarkdownRenderer content={post.content} />
            </div>
          </article>
        </div>
      </div>
      
      {/* 右侧目录区域 - 桌面端固定，移动端可隐藏 */}
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
          <TableOfContents content={post.content} />
        </div>
      </div>
    </>
  )
}

export default function PostPage({ params }: PostPageProps) {
  return <PostPageClient params={params} />
} 