'use client'

import React, { useState, useEffect, useRef, useCallback, memo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronRight, Folder } from 'lucide-react'
import { FileTreeNode } from '@/lib/posts'
import { buildPostUrl } from '@/lib/url-utils'
import { getBlogConfig } from '@/lib/blog-config'
import ThemeToggle from './ThemeToggle'

interface StaticFileTreeProps {
  tree: FileTreeNode[]
  onLinkClick?: () => void
}

interface TreeNodeProps {
  node: FileTreeNode
  level: number
  currentPath?: string
  expandedPaths: Set<string>
  onToggle: (path: string) => void
  onLinkClick?: () => void
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

const TreeNode: React.FC<TreeNodeProps> = ({ node, level, currentPath, expandedPaths, onToggle, onLinkClick }) => {
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
        className={`flex items-center py-1.5 px-2 mx-1 transition-all duration-200 ${
          node.type === 'directory' 
            ? 'cursor-pointer hover:opacity-70' 
            : ''
        } ${
          isCurrentArticle 
            ? 'text-blue-600 dark:text-blue-400 font-semibold' 
            : ''
        }`}
        style={{ paddingLeft: `${level * 12 + 6}px`, fontSize: '105%' }}
        onClick={handleToggle}
      >
        {node.type === 'directory' ? (
          <>
            {isExpanded ? (
              <ChevronDown className="w-3 h-3 mr-1 flex-shrink-0" />
            ) : (
              <ChevronRight className="w-3 h-3 mr-1 flex-shrink-0" />
            )}
            <Folder className="w-3 h-3 mr-1.5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
            <span className="text-xs text-gray-700 dark:text-gray-300 font-medium truncate">
              {node.name}
            </span>
          </>
        ) : (
          <>
            {isMarkdownFile && node.slug ? (
              <div className={`flex-1 px-1.5 py-0.5 -mx-1.5 -my-0.5 transition-opacity ${
                isCurrentArticle ? '' : 'hover:opacity-70'
              }`}>
                <Link 
                  href={buildPostUrl(node.slug)}
                  className={`text-xs transition-colors truncate block w-full ${
                    isCurrentArticle 
                      ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                      : 'text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onLinkClick?.()
                  }}
                >
                  {node.name.replace(/\.md$/, '')}
                </Link>
              </div>
            ) : (
              <span className="text-xs text-gray-400 dark:text-gray-500 truncate">
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
              onLinkClick={onLinkClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const StaticFileTree: React.FC<StaticFileTreeProps> = ({ tree, onLinkClick }) => {
  const pathname = usePathname()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const scrollbarHideTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  // 安全获取博客配置
  const getBlogConfigSafely = () => {
    try {
      return getBlogConfig()
    } catch (error) {
      console.warn('获取博客配置失败，使用默认配置:', error)
      return {
        name: '青阳博客',
        description: '青阳的个人博客',
        logo: '/logo.png'
      }
    }
  }
  const blogConfig = getBlogConfigSafely()
  
  // 修复hydration问题：服务端和客户端初始状态保持一致
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set())
  
  // 客户端挂载后才从localStorage读取状态
  useEffect(() => {
    setIsClient(true)
    // 只在客户端挂载后才读取localStorage
    const savedExpandedState = getExpandedState()
    setExpandedPaths(savedExpandedState)
  }, [])
  
  // 在DOM渲染完成后立即恢复滚动位置，避免任何可见的滚动动画
  useEffect(() => {
    if (scrollContainerRef.current && isClient) {
      const savedScrollPosition = getScrollPosition()
      const container = scrollContainerRef.current
      
      // 强制禁用所有可能的滚动动画
      const originalScrollBehavior = container.style.scrollBehavior
      const originalTransition = container.style.transition
      
      // 彻底禁用动画和过渡效果
      container.style.scrollBehavior = 'auto'
      container.style.transition = 'none'
      
      // 立即设置滚动位置
      container.scrollTop = savedScrollPosition
      
      // 使用短暂延时后恢复设置，确保滚动位置已经生效
      setTimeout(() => {
        if (container) {
          container.style.scrollBehavior = originalScrollBehavior
          container.style.transition = originalTransition
        }
      }, 0)
    }
  }, [isClient]) // 依赖isClient确保只在客户端执行

  // 切换展开状态
  const handleToggle = useCallback((path: string) => {
    setExpandedPaths(prev => {
      const newExpandedPaths = new Set(prev)
      if (newExpandedPaths.has(path)) {
        newExpandedPaths.delete(path)
      } else {
        newExpandedPaths.add(path)
      }
      // 立即保存展开状态
      saveExpandedState(newExpandedPaths)
      return newExpandedPaths
    })
  }, [])

  // 保存滚动位置 - 使用防抖优化性能，并管理滚动条显示/隐藏
  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      // 显示滚动条
      setIsScrolling(true)
      
      // 清除之前的延时器
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      if (scrollbarHideTimeoutRef.current) {
        clearTimeout(scrollbarHideTimeoutRef.current)
      }
      
      // 防抖保存滚动位置
      scrollTimeoutRef.current = setTimeout(() => {
        if (scrollContainerRef.current) {
          saveScrollPosition(scrollContainerRef.current.scrollTop)
        }
      }, 150)
      
      // 延迟隐藏滚动条
      scrollbarHideTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 1000) // 滚动停止后1秒隐藏滚动条
    }
  }, [])

  // 清理防抖延时器
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (scrollbarHideTimeoutRef.current) {
        clearTimeout(scrollbarHideTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="h-full min-h-screen w-full lg:w-60 flex flex-col bg-gray-50 dark:bg-gray-900 fixed-navigation scroll-isolated pt-14 lg:pt-0">
      <div className="px-3 py-6 flex-shrink-0 mt-8" style={{ transform: 'scale(1.05)', transformOrigin: 'top left' }}>
        <div className="flex flex-col items-start space-y-4">
          {/* Logo */}
          <Link href="/" className="block">
            <img 
              src={blogConfig.logo} 
              alt="博客Logo" 
              className="h-16 w-16 object-contain rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
            />
          </Link>
          
          {/* 博客名字 */}
          <Link href="/" className="block text-left">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {blogConfig.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {blogConfig.description}
            </p>
          </Link>
          
          {/* 主题切换按钮 */}
          <ThemeToggle />
        </div>
      </div>
      <div 
        ref={scrollContainerRef}
        className={`flex-1 overflow-y-auto px-2 pb-3 bg-gray-50 dark:bg-gray-900 navigation-scroll-container scroll-isolated ${isScrolling ? 'scrolling' : ''}`}
        onScroll={handleScroll}
        style={{ 
          overscrollBehavior: 'contain',
          contain: 'layout style paint',
          scrollBehavior: 'auto' // 强制覆盖全局的smooth滚动设置
        }}
        onWheel={(e) => {
          // 确保滚轮事件被隔离在导航栏内
          e.stopPropagation()
          const element = e.currentTarget
          const { scrollTop, scrollHeight, clientHeight } = element
          
          // 检查是否到达顶部或底部
          const isAtTop = scrollTop <= 0
          const isAtBottom = scrollTop + clientHeight >= scrollHeight
          
          // 在顶部或底部时阻止默认滚动事件传播到父级
          if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
            e.preventDefault()
          }
        }}
      >
        {tree.map((node, index) => (
          <TreeNode
            key={`${node.path}-${index}`}
            node={node}
            level={0}
            currentPath={pathname}
            expandedPaths={expandedPaths}
            onToggle={handleToggle}
            onLinkClick={onLinkClick}
          />
        ))}
      </div>
    </div>
  )
}

// 自定义比较函数，确保组件不会因为tree对象引用变化而重新渲染
const arePropsEqual = (prevProps: StaticFileTreeProps, nextProps: StaticFileTreeProps) => {
  // 基本比较：如果树的长度不同，肯定需要重新渲染
  if (prevProps.tree.length !== nextProps.tree.length) {
    return false
  }
  
  // 浅比较：检查每个顶级节点的路径是否相同
  for (let i = 0; i < prevProps.tree.length; i++) {
    if (prevProps.tree[i].path !== nextProps.tree[i].path) {
      return false
    }
  }
  
  return true
}

export default memo(StaticFileTree, arePropsEqual) 