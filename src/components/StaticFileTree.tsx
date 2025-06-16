'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronRight, Folder } from 'lucide-react'
import { FileTreeNode } from '@/lib/posts'
import { buildPostUrl } from '@/lib/url-utils'
import ThemeToggle from './ThemeToggle'

interface StaticFileTreeProps {
  tree: FileTreeNode[]
}

interface TreeNodeProps {
  node: FileTreeNode
  level: number
  currentPath?: string
  expandedPaths: Set<string>
  onToggle: (path: string) => void
}

// 用于保存和获取展开状态的工具函数
const getExpandedState = (): Set<string> => {
  if (typeof window === 'undefined') return new Set()
  try {
    const saved = localStorage.getItem('fileTreeExpandedState')
    return saved ? new Set(JSON.parse(saved)) : new Set()
  } catch {
    return new Set()
  }
}

const saveExpandedState = (expandedPaths: Set<string>) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('fileTreeExpandedState', JSON.stringify(Array.from(expandedPaths)))
  } catch {
    // 忽略错误
  }
}

// 用于保存和获取滚动位置的工具函数
const getScrollPosition = (): number => {
  if (typeof window === 'undefined') return 0
  try {
    const saved = localStorage.getItem('fileTreeScrollPosition')
    return saved ? parseInt(saved, 10) : 0
  } catch {
    return 0
  }
}

const saveScrollPosition = (position: number) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('fileTreeScrollPosition', position.toString())
  } catch {
    // 忽略错误
  }
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, level, currentPath, expandedPaths, onToggle }) => {
  const isExpanded = expandedPaths.has(node.path)
  const isMarkdownFile = node.type === 'file' && node.name.endsWith('.md')
  
  // 检查是否是当前正在查看的文章
  const isCurrentArticle = currentPath && isMarkdownFile && currentPath === `/post/${node.slug}`

  const handleToggle = (e: React.MouseEvent) => {
    // 只有目录才处理展开/折叠事件
    if (node.type === 'directory') {
      e.preventDefault()
      e.stopPropagation()
      onToggle(node.path)
    }
  }

  return (
    <div className="select-none">
      <div
        className={`flex items-center py-2 px-3 mx-1 rounded-lg transition-all duration-200 ${
          node.type === 'directory' 
            ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' 
            : ''
        } ${
          isCurrentArticle 
            ? 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-l-4 border-blue-500 dark:border-blue-400 shadow-sm' 
            : ''
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleToggle}
      >
        {node.type === 'directory' ? (
          <>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 mr-1 flex-shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 mr-1 flex-shrink-0" />
            )}
            <Folder className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate">
              {node.name}
            </span>
          </>
        ) : (
          <>
            {isMarkdownFile && node.slug ? (
              <div className={`flex-1 rounded-md px-2 py-1 -mx-2 -my-1 transition-colors ${
                isCurrentArticle ? '' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}>
                <Link 
                  href={buildPostUrl(node.slug)}
                  className={`text-sm transition-colors truncate block w-full ${
                    isCurrentArticle 
                      ? 'text-blue-900 dark:text-blue-100 font-semibold' 
                      : 'text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {node.name.replace(/\.md$/, '')}
                </Link>
              </div>
            ) : (
              <span className="text-sm text-gray-400 dark:text-gray-500 truncate">
                {node.name}
              </span>
            )}
          </>
        )}
      </div>
      
      {node.type === 'directory' && isExpanded && node.children && (
        <div>
          {node.children.map((child, index) => (
            <TreeNode
              key={`${child.path}-${index}`}
              node={child}
              level={level + 1}
              currentPath={currentPath}
              expandedPaths={expandedPaths}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const StaticFileTree: React.FC<StaticFileTreeProps> = ({ tree }) => {
  const pathname = usePathname()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set())
  const [isInitialized, setIsInitialized] = useState(false)

  // 初始化展开状态
  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialized) {
      // 从localStorage获取保存的展开状态，如果没有则为空Set（所有目录默认收起）
      const savedExpandedPaths = getExpandedState()
      
      setExpandedPaths(savedExpandedPaths)
      setIsInitialized(true)
    }
  }, [tree, isInitialized])

  // 恢复滚动位置
  useEffect(() => {
    if (scrollContainerRef.current && isInitialized) {
      const savedScrollPosition = getScrollPosition()
      scrollContainerRef.current.scrollTop = savedScrollPosition
    }
  }, [isInitialized])

  // 切换展开状态
  const handleToggle = useCallback((path: string) => {
    setExpandedPaths(prev => {
      const newExpandedPaths = new Set(prev)
      if (newExpandedPaths.has(path)) {
        newExpandedPaths.delete(path)
      } else {
        newExpandedPaths.add(path)
      }
      saveExpandedState(newExpandedPaths)
      return newExpandedPaths
    })
  }, [])

  // 保存滚动位置
  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      saveScrollPosition(scrollContainerRef.current.scrollTop)
    }
  }, [])

  return (
    <div className="absolute left-0 top-0 h-full min-h-screen w-80 flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg z-10">
      <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between">
          <Link href="/" className="block flex-1">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              青阳博客
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              探索知识的海洋
            </p>
          </Link>
          <ThemeToggle />
        </div>
      </div>
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-3 bg-gray-50/50 dark:bg-gray-800/50"
        onScroll={handleScroll}
      >
        {isInitialized && tree.map((node, index) => (
          <TreeNode
            key={`${node.path}-${index}`}
            node={node}
            level={0}
            currentPath={pathname}
            expandedPaths={expandedPaths}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  )
}

export default StaticFileTree 