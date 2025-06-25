import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), '../博客')

export interface PostData {
  slug: string
  title: string
  content: string
  date?: string
  excerpt?: string
  path: string
  relativePath: string
}

export interface PostMeta {
  slug: string
  title: string
  date?: string
  excerpt?: string
  path: string
  relativePath: string
}

// 递归获取所有 markdown 文件
function getAllMarkdownFiles(dir: string, baseDir: string = postsDirectory): string[] {
  const files: string[] = []
  
  if (!fs.existsSync(dir)) {
    return files
  }
  
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    
    if (entry.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath, baseDir))
    } else if (entry.name.endsWith('.md')) {
      const relativePath = path.relative(baseDir, fullPath)
      files.push(relativePath)
    }
  }
  
  return files
}

// 生成文章的 slug（用于 URL）
function generateSlug(filePath: string): string {
  // 移除.md扩展名，保持路径结构，使用正斜杠分隔
  return filePath
    .replace(/\.md$/, '')
    .replace(/\\/g, '/')
    .split('/')
    .map(segment => {
      // 避免过度编码 - 只对必要的字符进行编码
      return encodeURIComponent(segment.trim())
    })
    .join('/')
}

// 获取所有文章元数据
export function getAllPosts(): PostMeta[] {
  const fileNames = getAllMarkdownFiles(postsDirectory)
  const allPostsData = fileNames.map((fileName): PostMeta => {
    const slug = generateSlug(fileName)
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      title: data.title || path.basename(fileName, '.md'),
      date: data.date || null,
      excerpt: data.excerpt || content.slice(0, 150) + '...',
      path: fullPath,
      relativePath: fileName.replace(/\\/g, '/')
    }
  })
  
  return allPostsData.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    return a.title.localeCompare(b.title, 'zh-CN')
  })
}

// 处理双链语法的函数
export function processWikiLinks(content: string): string {
  const allPosts = getAllPosts()
  
  return content.replace(/\[\[([^\]]+)\]\]/g, (match, linkText) => {
    // 清理链接文本，移除可能的路径前缀和文件扩展名
    const originalLinkText = linkText.trim()
    const cleanLinkText = linkText.replace(/^.*[\/\\]/, '').replace(/\.md$/, '').trim()
    
    // 尝试多种匹配方式查找文章，按照精确度排序
    let foundPost = null
    
    // 第一优先级：精确匹配文件名（不带路径和扩展名）
    foundPost = allPosts.find(post => {
      const postFileName = path.basename(post.relativePath, '.md')
      return postFileName === originalLinkText || postFileName === cleanLinkText
    })
    
    if (!foundPost) {
      // 第二优先级：精确匹配标题
      foundPost = allPosts.find(post => {
        const postTitle = post.title.replace(/\.md$/, '').trim()
        return postTitle === originalLinkText || postTitle === cleanLinkText
      })
    }
    
    if (!foundPost) {
      // 第三优先级：匹配相对路径（不带扩展名）
      foundPost = allPosts.find(post => {
        const postPath = post.relativePath.replace(/\.md$/, '')
        return postPath === originalLinkText || postPath === cleanLinkText
      })
    }
    
    if (!foundPost) {
      // 第四优先级：模糊匹配 - 标题包含链接文本
      foundPost = allPosts.find(post => {
        const postTitle = post.title.replace(/\.md$/, '').trim().toLowerCase()
        const searchText = cleanLinkText.toLowerCase()
        return postTitle.includes(searchText) && searchText.length > 2 // 避免过短的匹配
      })
    }
    
    if (!foundPost) {
      // 第五优先级：模糊匹配 - 文件路径包含链接文本
      foundPost = allPosts.find(post => {
        const postPath = post.relativePath.toLowerCase()
        const searchText = cleanLinkText.toLowerCase()
        return postPath.includes(searchText) && searchText.length > 2 // 避免过短的匹配
      })
    }
    
    if (foundPost) {
      // 转换为markdown链接格式 - 可访问的链接
      // 修复：避免运行时require，直接构建URL
      const postUrl = `/post/${foundPost.slug}`
      return `[${originalLinkText}](${postUrl})`
    } else {
      // 如果找不到对应文章，标记为不可访问的双链
      return `<span class="wikilink-notfound">${originalLinkText}</span>`
    }
  })
}

// 根据 slug 获取文章数据
export function getPostBySlug(slug: string): PostData | null {
  try {
    // 解码slug并构建文件路径
    const decodedSlug = decodeURIComponent(slug)
    const fileName = decodedSlug + '.md'
    const fullPath = path.join(postsDirectory, fileName)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // 处理双链语法
    const processedContent = processWikiLinks(content)
    
    return {
      slug,
      title: data.title || path.basename(fileName, '.md'),
      content: processedContent,
      date: data.date || null,
      excerpt: data.excerpt || content.slice(0, 150) + '...',
      path: fullPath,
      relativePath: fileName.replace(/\\/g, '/')
    }
  } catch (error) {
    console.error(`Error reading post with slug ${slug}:`, error)
    return null
  }
}

// 根据相对路径获取文章数据（用于首页配置）
export function getPostByPath(relativePath: string): PostData | null {
  try {
    // 处理Windows路径分隔符，将反斜杠转换为正斜杠
    const normalizedPath = relativePath.replace(/\\/g, '/')
    
    // 直接使用项目根目录作为基础路径，现在需要回到上一级目录
    const fullPath = path.join(process.cwd(), '..', normalizedPath)
    
    if (!fs.existsSync(fullPath)) {
      console.error(`Home page file not found: ${fullPath}`)
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // 处理双链语法
    const processedContent = processWikiLinks(content)
    
    // 为了生成正确的slug，需要提取相对于博客目录的路径
    const blogRelativePath = normalizedPath.startsWith('博客/') 
      ? normalizedPath.slice(3) // 移除 '博客/' 前缀
      : normalizedPath
    
    // 生成slug用于内部链接
    const slug = generateSlug(blogRelativePath)
    
    return {
      slug,
      title: data.title || path.basename(normalizedPath, '.md'),
      content: processedContent,
      date: data.date || null,
      excerpt: data.excerpt || content.slice(0, 150) + '...',
      path: fullPath,
      relativePath: blogRelativePath
    }
  } catch (error) {
    console.error(`Error reading post at path ${relativePath}:`, error)
    return null
  }
}

// 获取所有可能的文章路径（用于 getStaticPaths）
export function getAllPostSlugs(): { params: { slug: string[] } }[] {
  const fileNames = getAllMarkdownFiles(postsDirectory)
  return fileNames.map((fileName) => {
    const slug = generateSlug(fileName)
    return {
      params: {
        slug: slug.split('/')
      }
    }
  })
}

// 构建文件树结构（用于导航）
export interface FileTreeNode {
  name: string
  type: 'file' | 'directory'
  path: string
  slug?: string
  children?: FileTreeNode[]
}

// 缓存文件树结构，避免重复计算导致组件重新挂载
let cachedFileTree: FileTreeNode[] | null = null
let lastBuildTime = 0
const CACHE_DURATION = 5000 // 5秒缓存

export function buildFileTree(): FileTreeNode[] {
  const now = Date.now()
  
  // 如果有缓存且未过期，直接返回缓存结果
  if (cachedFileTree && (now - lastBuildTime) < CACHE_DURATION) {
    return cachedFileTree
  }
  
  if (!fs.existsSync(postsDirectory)) {
    cachedFileTree = []
    lastBuildTime = now
    return cachedFileTree
  }

  function buildTree(dirPath: string, baseName: string = ''): FileTreeNode[] {
    const items: FileTreeNode[] = []
    
    try {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true })
      
      entries.sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) return -1
        if (!a.isDirectory() && b.isDirectory()) return 1
        return a.name.localeCompare(b.name, 'zh-CN')
      })
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name)
        const relativePath = baseName ? `${baseName}/${entry.name}` : entry.name
        
        if (entry.isDirectory()) {
          const children = buildTree(fullPath, relativePath)
          items.push({
            name: entry.name,
            type: 'directory',
            path: relativePath,
            children
          })
        } else if (entry.name.endsWith('.md')) {
          const slug = generateSlug(relativePath)
          items.push({
            name: entry.name,
            type: 'file',
            path: relativePath,
            slug
          })
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dirPath}:`, error)
    }
    
    return items
  }

  const result = buildTree(postsDirectory)
  
  // 缓存结果
  cachedFileTree = result
  lastBuildTime = now
  
  return result
} 