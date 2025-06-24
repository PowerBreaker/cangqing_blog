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

export default function PostPage({ params }: PostPageProps) {
  // 🔧 使用新的URL处理工具，确保正确的编码处理
  const { decodedParams, slug } = processDynamicParams(params.slug)
  
  const post = getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <>
      {/* 中间正文区域 - 弹性宽度，居中显示 */}
      <div className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center overflow-y-auto overscroll-auto">
        <div className="w-full max-w-3xl px-8" style={{ paddingTop: '78px', paddingBottom: '128px', marginLeft: '85px' }}>
          <article className="w-full">
            {/* 文章标题 */}
            <header className="mb-8" style={{ textAlign: 'left' }}>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4" style={{ textAlign: 'left' }}>
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
              className="prose prose-lg max-w-none dark:prose-invert" 
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
      
      {/* 右侧目录区域 - 固定宽度，增加右边距为500% */}
      <div className="w-[416px] flex-shrink-0 bg-gray-50 dark:bg-gray-900 pr-32">
        <div className="sticky p-6" style={{ top: '78px' }}>
          <TableOfContents content={post.content} />
        </div>
      </div>
    </>
  )
} 