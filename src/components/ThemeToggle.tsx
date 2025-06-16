'use client'

import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/lib/theme'

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()

  // 🔧 在服务端渲染或组件未挂载时显示占位符
  if (!mounted) {
    return (
      <div className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 transition-all duration-300 w-10 h-10">
        <div className="w-6 h-6 animate-pulse bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
      aria-label={theme === 'light' ? '切换到夜间模式' : '切换到日间模式'}
      suppressHydrationWarning
    >
      <div className="relative w-6 h-6">
        <Sun 
          className={`absolute inset-0 w-6 h-6 text-amber-500 transition-all duration-300 ${
            theme === 'light' 
              ? 'rotate-0 scale-100 opacity-100' 
              : 'rotate-90 scale-0 opacity-0'
          }`}
        />
        <Moon 
          className={`absolute inset-0 w-6 h-6 text-blue-500 transition-all duration-300 ${
            theme === 'dark' 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
      
      {/* 悬停时的提示 */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {theme === 'light' ? '切换到夜间模式' : '切换到日间模式'}
      </div>
    </button>
  )
} 