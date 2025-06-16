'use client'

import { useState, useEffect } from 'react'
// import { getAllPosts } from '@/lib/posts' // 不能在客户端使用
import { hasDoubleEncoding, safeDecodeURIComponent, buildPostUrl } from '@/lib/url-utils'
import { useTheme } from '@/lib/theme'
import Link from 'next/link'

export default function DebugPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme, mounted: themeReady } = useTheme()

  useEffect(() => {
    setMounted(true)
    // 模拟一些测试数据
    const testPosts = [
      { 
        slug: '学习/开发&程序/测试文章',
        title: '测试文章 1'
      },
      {
        slug: '%E5%AD%A6%E4%B9%A0/%E5%BC%80%E5%8F%91%26%E7%A8%8B%E5%BA%8F/Scrum%E6%95%8F%E6%8D%B7%E5%BC%80%E5%8F%91',
        title: '测试文章 2（URL编码）'
      },
      {
        slug: '%25E5%25AD%25A6%25E4%25B9%25A0/%25E5%25BC%2580%25E5%258F%2591%2526%25E7%25A8%258B%25E5%25BA%258F',
        title: '测试文章 3（过度编码）'
      }
    ]
    setPosts(testPosts)
  }, [])

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          🔧 系统调试页面
        </h1>
        
        {/* 主题测试 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            主题系统测试
          </h2>
          <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              当前主题: <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{theme}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              主题已挂载: <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{themeReady ? '✅' : '❌'}</span>
            </p>
            <button
              onClick={toggleTheme}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              切换主题
            </button>
          </div>
        </div>

        {/* URL 处理测试 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            URL 处理测试
          </h2>
          <div className="space-y-4">
            {posts.map((post, index) => {
              const hasDouble = hasDoubleEncoding(post.slug)
              const safeSlug = safeDecodeURIComponent(post.slug)
              const url = buildPostUrl(post.slug)
              
              return (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {post.title}
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p>原始 slug: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{post.slug}</code></p>
                    <p>过度编码: <span className={hasDouble ? 'text-red-500' : 'text-green-500'}>
                      {hasDouble ? '❌ 是' : '✅ 否'}
                    </span></p>
                    <p>安全解码: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{safeSlug}</code></p>
                    <p>构建URL: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{url}</code></p>
                    <Link 
                      href={url}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      → 访问文章
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 环境信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            环境信息
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p>用户代理: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">{navigator.userAgent}</code></p>
            <p>当前URL: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{window.location.href}</code></p>
            <p>localStorage 支持: <span className={typeof localStorage !== 'undefined' ? 'text-green-500' : 'text-red-500'}>
              {typeof localStorage !== 'undefined' ? '✅ 是' : '❌ 否'}
            </span></p>
          </div>
        </div>

        <div className="mt-8">
          <Link 
            href="/"
            className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  )
} 
 