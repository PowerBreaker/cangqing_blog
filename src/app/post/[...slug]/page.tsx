import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPostSlugs, getPostBySlug, buildFileTree } from '@/lib/posts'
import SimpleMarkdownRenderer from '@/components/SimpleMarkdownRenderer'
import StaticFileTree from '@/components/StaticFileTree'
import TableOfContents from '@/components/TableOfContents'
import Link from 'next/link'
import { ArrowLeft, Home, ChevronRight } from 'lucide-react'

interface PostPageProps {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams() {
  const paths = getAllPostSlugs()
  return paths.map((path) => ({
    slug: path.params.slug
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
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
}

export default function PostPage({ params }: PostPageProps) {
  const slug = params.slug.join('/')
  const post = getPostBySlug(slug)
  const fileTree = buildFileTree()
  
  if (!post) {
    notFound()
  }

  // 构建面包屑
  const breadcrumbs = [
    { name: '首页', href: '/' },
    ...params.slug.map((segment, index) => ({
      name: decodeURIComponent(segment),
      href: `/post/${params.slug.slice(0, index + 1).join('/')}`
    }))
  ]
  
  return (
    <>
      <div className="relative bg-gray-50 dark:bg-gray-900 transition-colors min-h-screen">
        {/* 左侧文件树 - 现在是absolute定位 */}
        <StaticFileTree tree={fileTree} />
      
        {/* 右侧内容区域 - 添加左边距以避免被导航栏遮挡 */}
        <div className="ml-80 min-h-screen flex flex-col">
          {/* 顶部导航栏 - absolute定位 */}
          <div className="absolute top-0 left-80 right-0 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 z-20">
            <div className="px-8 py-4">
              <div className="flex items-center justify-between">
                {/* 左侧：返回按钮 + 面包屑 */}
                <div className="flex items-center space-x-4 min-w-0 flex-1">
            <Link 
              href="/" 
                    className="inline-flex items-center bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex-shrink-0"
            >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    首页
                  </Link>
                  
                  {/* 面包屑导航 */}
                  <nav className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 min-w-0">
                    {breadcrumbs.map((breadcrumb, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        {index > 0 && <ChevronRight className="w-3 h-3 text-gray-400 dark:text-gray-500" />}
                        {index === 0 ? (
                          <Home className="w-4 h-4" />
                        ) : index === breadcrumbs.length - 1 ? (
                          <span className="text-blue-600 dark:text-blue-400 font-medium truncate">
                            {breadcrumb.name}
                          </span>
                        ) : (
                          <Link 
                            href={breadcrumb.href}
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
                          >
                            {breadcrumb.name}
            </Link>
                        )}
                      </div>
                    ))}
                  </nav>
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
        
          {/* 文章内容区域 */}
          <div className="flex-1 bg-gray-50 dark:bg-gray-900 pt-[73px]">
            <div className="max-w-4xl mx-auto px-8 py-8">
              <article>
                {/* 文章标题 */}
              <header className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {post.title}
                </h1>
                {post.date && (
                      <time className="text-gray-600 dark:text-gray-300 text-sm">
                    发布于 {new Date(post.date).toLocaleDateString('zh-CN')}
                  </time>
                )}
              </header>
              
                {/* 文章正文 */}
                <div className="prose prose-lg max-w-none dark:prose-invert">
                <SimpleMarkdownRenderer content={post.content} />
              </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      
      {/* 目录导航 - 移到最外层，确保真正固定 */}
      <TableOfContents content={post.content} />
    </>
  )
} 