import { getAllPosts, getPostByPath } from '@/lib/posts'
import { getBlogConfig } from '@/lib/blog-config'
import HomePageClient from './HomePageClient'

export default function Home() {
  const posts = getAllPosts()
  const blogConfig = getBlogConfig()
  
  // 根据配置获取首页内容
  const homePagePost = getPostByPath(blogConfig.homePage)
  
  return (
    <HomePageClient 
      blogConfig={blogConfig}
      homePagePost={homePagePost}
    />
  )
} 