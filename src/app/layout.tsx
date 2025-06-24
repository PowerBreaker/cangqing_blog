import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import Script from 'next/script'
import './globals.css'
import { ThemeProvider } from '@/lib/theme'
import { buildFileTree } from '@/lib/posts'
import { getBlogConfig } from '@/lib/blog-config'
import BlogLayout from './BlogLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '青阳博客',
  description: '青阳的个人博客网站',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 在服务器端构建文件树
  const fileTree = buildFileTree()
  
  // 读取博客配置
  const config = getBlogConfig()
  
  // 🔧 确保主题模式有默认值，防止配置读取失败
  const defaultMode = config?.theme?.defaultMode || 'dark'
  
  // 主题脚本内容
  const themeScript = `
    (function() {
      try {
        var theme;
        var defaultMode = '${defaultMode}';
        
        // 从localStorage获取保存的主题偏好
        var savedTheme = null;
        try {
          savedTheme = localStorage.getItem('theme');
        } catch (e) {
          // localStorage可能被禁用
          console.warn('localStorage不可用:', e);
        }
        
        // 检查是否是首次访问（没有保存的主题设置）
        var isFirstVisit = !savedTheme;
        
        if (isFirstVisit) {
          // 首次访问：使用配置文件中的默认主题
          if (defaultMode === 'system') {
            // 检测系统主题偏好
            try {
              theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            } catch (e) {
              // matchMedia可能不可用
              theme = 'light';
            }
          } else {
            theme = defaultMode;
          }
        } else if (savedTheme === 'light' || savedTheme === 'dark') {
          // 非首次访问：使用保存的主题偏好
          theme = savedTheme;
        } else {
          // 保存的主题设置无效，回退到默认主题
          if (defaultMode === 'system') {
            try {
              theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            } catch (e) {
              theme = 'light';
            }
          } else {
            theme = defaultMode;
          }
        }
        
        // 立即应用主题到html元素
        try {
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        } catch (e) {
          console.warn('无法设置主题类:', e);
        }
        
        // 保存主题选择到localStorage
        try {
          localStorage.setItem('theme', theme);
        } catch (e) {
          // localStorage保存失败，忽略错误
        }
        
      } catch (error) {
        // 如果出错，使用默认主题
        console.warn('主题脚本执行失败:', error);
        var defaultMode = '${defaultMode}';
        try {
          if (defaultMode === 'dark') {
            document.documentElement.classList.add('dark');
          }
        } catch (e) {
          // 最后的错误处理，什么都不做
        }
      }
    })();
  `;
  
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-300`}>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
        <ThemeProvider>
          <BlogLayout fileTree={fileTree}>
            {children}
          </BlogLayout>
        </ThemeProvider>
      </body>
    </html>
  )
} 