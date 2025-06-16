'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

interface SimpleMarkdownRendererProps {
  content: string
}

const SimpleMarkdownRenderer: React.FC<SimpleMarkdownRendererProps> = ({ content }) => {
  // 预处理内容，保留空行和段落间距
  const processContent = (text: string) => {
    // 将多个连续空行转换为段落分隔符
    return text
      .split('\n')
      .map((line, index, array) => {
        // 如果当前行是空行，且前一行也是空行，则插入空行标记
        if (line.trim() === '' && index > 0 && array[index - 1].trim() === '') {
          return '&nbsp;'
        }
        return line
      })
      .join('\n')
  }

  const processedContent = processContent(content)

  // 生成标题ID的函数
  const generateHeadingId = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  return (
    <div className="markdown-content">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        className="prose prose-lg max-w-none dark:prose-invert"
        components={{
          // 自定义标题渲染，添加id属性
          h1: ({ children, ...props }) => {
            const text = typeof children === 'string' ? children : children?.toString() || ''
            const id = generateHeadingId(text)
            return (
              <h1 
                id={id} 
                className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8 scroll-mt-20" 
                {...props}
              >
              {children}
            </h1>
            )
          },
          h2: ({ children, ...props }) => {
            const text = typeof children === 'string' ? children : children?.toString() || ''
            const id = generateHeadingId(text)
            return (
              <h2 
                id={id} 
                className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6 scroll-mt-20" 
                {...props}
              >
                {children}
              </h2>
            )
          },
          h3: ({ children, ...props }) => {
            const text = typeof children === 'string' ? children : children?.toString() || ''
            const id = generateHeadingId(text)
            return (
              <h3 
                id={id} 
                className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-5 scroll-mt-20" 
                {...props}
              >
                {children}
              </h3>
            )
          },
          h4: ({ children, ...props }) => {
            const text = typeof children === 'string' ? children : children?.toString() || ''
            const id = generateHeadingId(text)
            return (
              <h4 
                id={id} 
                className="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-4 scroll-mt-20" 
                {...props}
              >
                {children}
              </h4>
            )
          },
          h5: ({ children, ...props }) => {
            const text = typeof children === 'string' ? children : children?.toString() || ''
            const id = generateHeadingId(text)
            return (
              <h5 
                id={id} 
                className="text-base font-semibold text-gray-900 dark:text-white mb-2 mt-3 scroll-mt-20" 
                {...props}
              >
                {children}
              </h5>
            )
          },
          h6: ({ children, ...props }) => {
            const text = typeof children === 'string' ? children : children?.toString() || ''
            const id = generateHeadingId(text)
            return (
              <h6 
                id={id} 
                className="text-sm font-semibold text-gray-900 dark:text-white mb-2 mt-3 scroll-mt-20" 
                {...props}
              >
                {children}
              </h6>
            )
          },
          p: ({ children, ...props }) => (
            <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed" {...props}>
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200 space-y-1" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside mb-4 text-gray-700 dark:text-gray-200 space-y-1" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="text-gray-700 dark:text-gray-200" {...props}>
              {children}
            </li>
          ),
          a: ({ children, href, ...props }) => (
            <a 
              href={href} 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
              {...props}
            >
              {children}
            </a>
          ),
          span: ({ children, className, ...props }) => {
            // 处理不可访问的双链
            if (className === 'wikilink-notfound') {
              return (
                <span 
                  className="text-blue-600 dark:text-blue-400 font-medium cursor-default" 
                  {...props}
                >
                  {children}
                </span>
              )
            }
            return <span className={className} {...props}>{children}</span>
          },
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400 mb-4" {...props}>
                {children}
            </blockquote>
          ),
          code: ({ children, className, ...props }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded text-sm" {...props}>
                  {children}
                </code>
              )
            }
            return (
              <code className="block bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-lg overflow-x-auto text-sm" {...props}>
                {children}
              </code>
            )
          },
          pre: ({ children, ...props }) => (
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4" {...props}>
              {children}
            </pre>
          ),
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-gray-100 dark:bg-gray-800" {...props}>
              {children}
            </thead>
          ),
          tbody: ({ children, ...props }) => (
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700" {...props}>
              {children}
            </tbody>
          ),
          tr: ({ children, ...props }) => (
            <tr {...props}>
              {children}
            </tr>
          ),
          th: ({ children, ...props }) => (
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700" {...props}>
              {children}
            </td>
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
      
      <style jsx>{`
        .markdown-content :global(.prose) {
          line-height: 1.7;
        }
        
        .markdown-content :global(.prose p) {
          margin-bottom: 1rem;
          white-space: pre-wrap;
        }
        
        .markdown-content :global(.prose p:empty) {
          margin-bottom: 1rem;
          height: 1rem;
        }
        
        .markdown-content :global(.prose br) {
          display: block;
          margin: 0.5rem 0;
        }
        
        .markdown-content :global(.prose h1:first-child),
        .markdown-content :global(.prose h2:first-child),
        .markdown-content :global(.prose h3:first-child),
        .markdown-content :global(.prose h4:first-child),
        .markdown-content :global(.prose h5:first-child),
        .markdown-content :global(.prose h6:first-child) {
          margin-top: 0;
        }
        
        /* 可访问的双链样式 - 蓝色字体，带下划线，可点击 */
        .markdown-content :global(.prose a) {
          color: #2563eb !important;
          text-decoration: underline !important;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        
        .markdown-content :global(.prose a:hover) {
          color: #1d4ed8 !important;
        }
        
        .markdown-content :global(.dark .prose a) {
          color: #60a5fa !important;
        }
        
        .markdown-content :global(.dark .prose a:hover) {
          color: #93c5fd !important;
        }
      `}</style>
    </div>
  )
}

export default SimpleMarkdownRenderer 