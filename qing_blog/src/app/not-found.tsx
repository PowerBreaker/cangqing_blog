import Link from 'next/link'
import { Home, FileX } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors">
      <div className="max-w-lg w-full text-center px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="mb-8">
            <div className="relative mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full mx-auto flex items-center justify-center">
                <FileX className="w-16 h-16 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <span className="text-red-600 dark:text-red-400 text-2xl font-bold">!</span>
              </div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">404</h1>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">页面未找到</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              抱歉，您访问的页面不存在或已被移动。<br />
              请检查URL是否正确，或返回首页继续浏览。
            </p>
          </div>
          
          <Link 
            href="/"
            className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5 mr-3" />
            返回首页
          </Link>
          
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            或者尝试从左侧导航栏选择文章
          </div>
        </div>
      </div>
    </div>
  )
} 