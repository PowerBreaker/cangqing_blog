'use client'

import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    // 解析markdown内容，提取标题
    const extractHeadings = () => {
      const headingRegex = /^(#{1,6})\s+(.+)$/gm
      const headings: TocItem[] = []
      let match

      while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length
        const text = match[2].trim()
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
    <div className="absolute top-[73px] right-4 z-[9999] w-72 max-h-[80vh] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
      {/* 标题栏 */}
      <div 
        className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
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

      {/* 目录内容 */}
      {isExpanded && (
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="py-2">
            {tocItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToHeading(item.id)}
                className={`
                  w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                  ${activeId === item.id 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500' 
                    : 'text-gray-700 dark:text-gray-300'
                  }
                `}
                style={{ paddingLeft: `${(item.level - 1) * 12 + 16}px` }}
              >
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 dark:bg-gray-300 flex-shrink-0"></span>
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