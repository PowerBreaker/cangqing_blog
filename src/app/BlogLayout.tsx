'use client'

import { useState } from 'react'
import { FileTreeNode } from '@/lib/posts'
import StaticFileTree from '@/components/StaticFileTree'
import ErrorBoundary from '@/components/ErrorBoundary'

interface BlogLayoutProps {
  children: React.ReactNode
  fileTree: FileTreeNode[]
}

export default function BlogLayout({ children, fileTree }: BlogLayoutProps) {
  // 移动端侧边栏状态
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="relative bg-gray-50 dark:bg-gray-900 transition-colors min-h-screen flex">
      {/* 移动端菜单按钮 - 只在移动端显示 */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="切换导航菜单"
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
          {isMobileMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* 移动端遮罩层 - 只在移动端且菜单打开时显示 */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 左侧文件树导航 */}
      <div className={`
        md:w-[315px] md:flex-shrink-0 md:relative md:translate-x-0
        fixed md:static inset-y-0 left-0 z-40 w-80 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <ErrorBoundary fallback={
          <div className="w-full h-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
            <div className="text-center">
              <div className="text-gray-400 text-2xl mb-2">📂</div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">导航栏加载失败</p>
            </div>
          </div>
        }>
          <StaticFileTree tree={fileTree} />
        </ErrorBoundary>
      </div>
      
      {/* 页面内容区域 */}
      <div className="md:flex-1 flex-1 w-full">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </div>
    </div>
  )
} 