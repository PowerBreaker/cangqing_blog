import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import './globals.css'
import { ThemeProvider } from '@/lib/theme'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '青阳博客',
  description: '青阳的个人博客网站',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} transition-colors duration-300`}>
        <ThemeProvider>
        {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 