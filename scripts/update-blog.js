const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 开始更新博客...\n');

try {
  // 检查博客目录是否存在
  const blogDir = path.join(process.cwd(), '博客');
  if (!fs.existsSync(blogDir)) {
    console.error('❌ 错误: 找不到博客目录');
    console.log('请确保项目根目录下存在 "博客" 文件夹');
    process.exit(1);
  }

  // 统计文章数量
  function countMarkdownFiles(dir) {
    let count = 0;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        count += countMarkdownFiles(fullPath);
      } else if (entry.name.endsWith('.md')) {
        count++;
      }
    }
    
    return count;
  }

  const articleCount = countMarkdownFiles(blogDir);
  console.log(`📝 发现 ${articleCount} 篇文章`);

  // 清理构建缓存
  console.log('🧹 清理构建缓存...');
  try {
    execSync('rm -rf .next || rmdir /s /q .next', { stdio: 'ignore' });
  } catch (error) {
    // 忽略删除失败的错误
  }

  // 构建静态网站
  console.log('📦 构建静态网站...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('\n✅ 博客更新完成!');
  console.log('📁 静态文件已生成在 out/ 目录');
  console.log('🌐 您可以将 out/ 目录部署到任何静态网站托管服务');
  
  // 如果是 Git 仓库，提供 Git 操作提示
  if (fs.existsSync('.git')) {
    console.log('\n💡 下一步操作建议:');
    console.log('   git add .');
    console.log('   git commit -m "更新博客内容"');
    console.log('   git push');
    console.log('\n   推送后，Vercel 会自动部署新版本');
  }

} catch (error) {
  console.error('\n❌ 更新失败:', error.message);
  console.log('\n🔧 故障排除:');
  console.log('1. 确保已安装所有依赖: npm install');
  console.log('2. 检查博客文件是否有语法错误');
  console.log('3. 查看完整错误信息并修复相关问题');
  process.exit(1);
}