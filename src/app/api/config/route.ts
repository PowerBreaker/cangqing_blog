import { NextResponse } from 'next/server'
import { getBlogConfig } from '@/lib/blog-config'

export async function GET() {
  try {
    const config = getBlogConfig()
    return NextResponse.json(config)
  } catch (error) {
    console.error('获取博客配置失败:', error)
    return NextResponse.json(
      { error: '无法获取博客配置' },
      { status: 500 }
    )
  }
} 