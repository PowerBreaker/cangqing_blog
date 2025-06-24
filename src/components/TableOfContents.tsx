'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronDown, ChevronRight, List } from 'lucide-react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [isExpanded, setIsExpanded] = useState(true)
  const [activeId, setActiveId] = useState<string>('')
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const scrollbarHideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // 解析markdown内容，提取标题
    const extractHeadings = () => {
      const headingRegex = /^(#{1,6})\s+(.+)$/gm
      const headings: TocItem[] = []
      let match

      while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length
        let text = match[2].trim()
        
        // 清理Markdown语法符号
        text = text
          .replace(/\*\*(.*?)\*\*/g, '$1')  // 去掉加粗 **text**
          .replace(/\*(.*?)\*/g, '$1')      // 去掉斜体 *text*
          .replace(/`(.*?)`/g, '$1')        // 去掉行内代码 `text`
          .replace(/~~(.*?)~~/g, '$1')      // 去掉删除线 ~~text~~
          .replace(/\[(.*?)\]\(.*?\)/g, '$1') // 去掉链接，保留文本 [text](url)
          .replace(/!\[(.*?)\]\(.*?\)/g, '$1') // 去掉图片，保留alt文本
          .trim()
        
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
          .replace(/^-+|-+$/g, '')
        
        headings.push({ id, text, level })
      }

      setTocItems(headings)
    }

    extractHeadings()
  }, [content])

  useEffect(() => {
    // 监听滚动，高亮当前标题
    const handleScroll = () => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      let currentActiveId = ''

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i]
        const rect = heading.getBoundingClientRect()
        if (rect.top <= 100) {
          currentActiveId = heading.id
          break
        }
      }

      setActiveId(currentActiveId)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初始调用

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 目录导航滚动处理 - 管理滚动条显示/隐藏
  const handleTocScroll = useCallback(() => {
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

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const rect = element.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const targetPosition = rect.top + scrollTop - 80 // 80px offset for header

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  if (tocItems.length === 0) {
    return null
  }

  return (
    <div className="w-full">
      {/* 标题栏 - 简洁样式 */}
      <div 
        className="flex items-center justify-between px-2 py-3 cursor-pointer hover:opacity-70 transition-opacity"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <List className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">目录导航</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">({tocItems.length})</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        )}
      </div>

      {/* 目录内容 - 去掉边框和背景色差异 */}
      {isExpanded && (
        <div 
          ref={scrollContainerRef}
          className={`max-h-[70vh] overflow-y-auto toc-scroll-container ${isScrolling ? 'scrolling' : ''}`}
          onScroll={handleTocScroll}
          style={{ 
            overscrollBehavior: 'contain',
            contain: 'layout style paint'
          }}
        >
          <div className="py-2">
            {tocItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToHeading(item.id)}
                className={`
                  w-full text-left px-2 py-2 text-sm hover:opacity-70 transition-opacity
                  ${activeId === item.id 
                    ? 'text-blue-600 dark:text-blue-400 font-medium' 
                    : 'text-gray-700 dark:text-gray-300'
                  }
                `}
                style={{ paddingLeft: `${(item.level - 1) * 12 + 8}px` }}
              >
                <div className="flex items-center space-x-2">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    activeId === item.id 
                      ? 'bg-blue-600 dark:bg-blue-400' 
                      : 'bg-gray-400 dark:bg-gray-500'
                  }`}></span>
                  <span className="truncate">{item.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TableOfContents 