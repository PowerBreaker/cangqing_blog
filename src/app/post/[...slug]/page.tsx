import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts'
import { processDynamicParams } from '@/lib/url-utils'
import PostPageClient from './PostPageClient'

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

  return <PostPageClient post={post} />
} 