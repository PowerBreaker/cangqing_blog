'use client'

import { useState } from 'react'
import { FileTreeNode } from '@/lib/posts'
import StaticFileTree from '@/components/StaticFileTree'
import ErrorBoundary from '@/components/ErrorBoundary'
import { Menu, X } from 'lucide-react'

interface BlogLayoutProps {
  children: React.ReactNode
  fileTree: FileTreeNode[]
}

export default function BlogLayout({ children, fileTree }: BlogLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="relative bg-gray-50 dark:bg-gray-900 transition-colors min-h-screen">
      {/* 移动端顶部工具栏 */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-14 flex items-center px-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="切换导航菜单"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
        <span className="ml-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
          青阳博客
        </span>
      </div>

      {/* 移动端蒙层 */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 桌面端：恢复原有的flex布局 */}
      <div className="hidden lg:flex min-h-screen">
        {/* 桌面端左侧文件树导航 - 固定宽度 */}
        <div className="w-[315px] flex-shrink-0">
          <ErrorBoundary fallback={
            <div className="w-[315px] h-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
              <div className="text-center">
                <div className="text-gray-400 text-2xl mb-2">📂</div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">导航栏加载失败</p>
              </div>
            </div>
          }>
            <StaticFileTree 
              tree={fileTree} 
              onLinkClick={() => setIsMobileMenuOpen(false)} 
            />
          </ErrorBoundary>
        </div>
        
        {/* 桌面端页面内容区域 */}
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </div>

      {/* 移动端：独立的布局 */}
      <div className="lg:hidden">
        {/* 移动端侧边导航 */}
        <div className={`
          fixed top-0 left-0 z-50
          w-[280px] h-full
          transform transition-transform duration-300 ease-in-out
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
            <StaticFileTree 
              tree={fileTree} 
              onLinkClick={() => setIsMobileMenuOpen(false)}
              isMobile={true}
            />
          </ErrorBoundary>
        </div>
        
        {/* 移动端页面内容区域 */}
        <main className="pt-14 min-w-0">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
} 