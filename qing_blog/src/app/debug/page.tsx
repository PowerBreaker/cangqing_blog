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
  const [storageItems, setStorageItems] = useState<{ [key: string]: string }>({})
  const [isClient, setIsClient] = useState(false)

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
    setIsClient(true)
    loadStorageItems()
  }, [])

  const loadStorageItems = () => {
    if (typeof window !== 'undefined') {
      const items: { [key: string]: string } = {}
      
      // 获取所有相关的localStorage项
      const keys = ['fileTreeExpandedState', 'fileTreeScrollPosition', 'theme']
      keys.forEach(key => {
        const value = localStorage.getItem(key)
        if (value !== null) {
          items[key] = value
        }
      })
      
      setStorageItems(items)
    }
  }

  const clearAllStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear()
      setStorageItems({})
      alert('所有localStorage数据已清除！页面将刷新以测试首次访问效果。')
      window.location.reload()
    }
  }

  const clearNavigationState = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fileTreeExpandedState')
      localStorage.removeItem('fileTreeScrollPosition')
      loadStorageItems()
      alert('导航栏状态已清除！页面将刷新以测试首次访问的导航栏折叠效果。')
      window.location.reload()
    }
  }

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

        <div className="space-y-6 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              📱 导航栏状态测试
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              测试首次访问时导航栏是否完全折叠。清除导航状态后，所有文件夹应该默认处于折叠状态。
            </p>
            <button
              onClick={clearNavigationState}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mr-4"
            >
              🗂️ 清除导航栏状态（测试折叠效果）
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              🧹 LocalStorage 管理
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              查看和管理浏览器本地存储数据。完全清除可以模拟全新用户的访问体验。
            </p>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">当前存储的数据：</h3>
              {Object.keys(storageItems).length === 0 ? (
                <p className="text-gray-500 italic">无存储数据（首次访问状态）</p>
              ) : (
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                  {Object.entries(storageItems).map(([key, value]) => (
                    <div key={key} className="mb-2">
                      <strong className="text-gray-800 dark:text-gray-200">{key}:</strong>
                      <span className="ml-2 font-mono text-sm text-gray-600 dark:text-gray-400">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={clearAllStorage}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              🗑️ 清除所有LocalStorage
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              ✅ 测试清单
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <input type="checkbox" id="test1" className="mr-3" />
                <label htmlFor="test1" className="text-gray-700 dark:text-gray-300">
                  首次访问时，所有文件夹都处于折叠状态
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="test2" className="mr-3" />
                <label htmlFor="test2" className="text-gray-700 dark:text-gray-300">
                  点击文件夹可以展开和折叠
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="test3" className="mr-3" />
                <label htmlFor="test3" className="text-gray-700 dark:text-gray-300">
                  展开状态在页面刷新后被保持
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="test4" className="mr-3" />
                <label htmlFor="test4" className="text-gray-700 dark:text-gray-300">
                  清除状态后，回到完全折叠状态
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="test5" className="mr-3" />
                <label htmlFor="test5" className="text-gray-700 dark:text-gray-300">
                  所有页面链接都能正常工作
                </label>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h3 className="text-green-800 dark:text-green-300 font-medium mb-2">
              🎯 快速测试步骤：
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-green-700 dark:text-green-400">
              <li>点击"清除导航栏状态"按钮</li>
              <li>观察页面刷新后，左侧导航栏所有文件夹是否完全折叠</li>
              <li>手动展开几个文件夹</li>
              <li>刷新页面，验证展开状态是否被保持</li>
              <li>再次清除状态，确认回到折叠状态</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
} 
 