'use client'

import { FileTreeNode } from '@/lib/posts'
import StaticFileTree from '@/components/StaticFileTree'
import ErrorBoundary from '@/components/ErrorBoundary'

interface BlogLayoutProps {
  children: React.ReactNode
  fileTree: FileTreeNode[]
}

export default function BlogLayout({ children, fileTree }: BlogLayoutProps) {
  // fileTree 从服务器端传入，无需重新构建

  return (
    <div className="relative bg-gray-50 dark:bg-gray-900 transition-colors min-h-screen flex">
      {/* 左侧文件树导航 - 固定宽度，在布局层级，避免重新挂载 */}
      <div className="w-[315px] flex-shrink-0">
        <ErrorBoundary fallback={
          <div className="w-[315px] h-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
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
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </div>
  )
} 