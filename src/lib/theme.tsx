'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { getBlogConfig } from './blog-config'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  
  // 获取配置文件中的默认主题模式
  const getDefaultTheme = (): Theme => {
    try {
      const config = getBlogConfig()
      const defaultMode = config.theme.defaultMode
      
      if (defaultMode === 'system') {
        // 跟随系统设置
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      
      return defaultMode as Theme
    } catch (error) {
      // 如果获取配置失败，默认使用明亮模式
      return 'light'
    }
  }
  
  // 检测当前DOM中已设置的主题
  const detectCurrentTheme = (): Theme => {
    try {
      if (typeof window !== 'undefined') {
        // 检查HTML元素是否已经有dark类
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      }
    } catch (error) {
      console.warn('Failed to detect current theme:', error)
    }
    return 'light'
  }
  
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setMounted(true)
    
    // 首先检测当前已设置的主题（由主题脚本设置）
    const currentTheme = detectCurrentTheme()
    
    // 验证localStorage中的主题设置
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null
      
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        // 如果localStorage中有保存的主题，且与当前DOM状态一致，则使用它
        if (savedTheme === currentTheme) {
          setTheme(savedTheme)
          return
        }
      }
      
      // 如果没有保存的主题或不一致，使用当前检测到的主题
      setTheme(currentTheme)
      
      // 同步到localStorage
      localStorage.setItem('theme', currentTheme)
      
    } catch (error) {
      // 在SSR或静态生成环境下localStorage不可用
      console.warn('localStorage not available:', error)
      // 使用检测到的当前主题
      setTheme(currentTheme)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    // 🔧 安全地更新localStorage和DOM
    try {
      localStorage.setItem('theme', theme)
      
      const htmlElement = document.documentElement
      if (theme === 'dark') {
        htmlElement.classList.add('dark')
      } else {
        htmlElement.classList.remove('dark')
      }
    } catch (error) {
      console.warn('Failed to save theme:', error)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    if (!mounted) return
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // 🔧 确保返回一致的主题值，避免hydration错误
  const contextValue: ThemeContextType = {
    theme: mounted ? theme : detectCurrentTheme(), // 使用检测到的主题避免hydration不匹配
    toggleTheme,
    mounted
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 