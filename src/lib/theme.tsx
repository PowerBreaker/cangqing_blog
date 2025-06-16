'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    setMounted(true)
    
    // 🔧 在SSG环境下安全地访问localStorage
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setTheme(savedTheme)
      }
      
      const htmlElement = document.documentElement
      if (savedTheme === 'light') {
        htmlElement.classList.remove('dark')
      } else {
        htmlElement.classList.add('dark')
      }
    } catch (error) {
      // 在SSR或静态生成环境下localStorage不可用
      console.warn('localStorage not available:', error)
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
    theme: mounted ? theme : 'dark',
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