import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import nunjucks from 'nunjucks'
import {
  parseMarkdown,
  formatDate,
  formatProjectDate,
  generateSlug,
} from './markdown-processor.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')

// Configure Nunjucks
const env = nunjucks.configure(path.join(rootDir, 'templates'), {
  autoescape: true,
  noCache: true,
})

// Add custom filters
env.addFilter('formatDate', formatDate)
env.addFilter('formatProjectDate', (startDate, endDate) => formatProjectDate(startDate, endDate))

/**
 * Gallery data - matches the current gallery.html content
 */
const galleryImages = [
  { filename: '20221009-three-passes-0031-website.jpg', caption: 'Tengkangpoche peeks out from behind the clouds', alt: 'Tengkangpoche' },
  { filename: '20221009-three-passes-0140-website.jpg', caption: 'Climbing Sumdur Peak', alt: 'Sumdur Peak' },
  { filename: '20221015-three-passes-1418-website.jpg', caption: 'The north face of Cho La Tse', alt: 'Cho La Tse' },
  { filename: '20221009-three-passes-0868-website.jpg', caption: 'Pema, my guide and friend', alt: 'Pema' },
  { filename: '20221011-three-passes-0340-website.jpg', caption: 'Approaching Gokyo', alt: 'Gokyo' },
  { filename: '20221012-three-passes-0433-website.jpg', caption: 'Crossing Gokyo lake as Cho Oyu catches the morning glow', alt: 'Gokyo Lake' },
  { filename: '20221013-three-passes-0911-website.jpg', caption: 'Ama Dablam greets us', alt: 'Ama Dablam' },
  { filename: '20221016-three-passes-1640-website.jpg', caption: 'Everest, the last thing to catch the setting sun', alt: 'Mount Everest' },
  { filename: '20221015-three-passes-1478-website.jpg', caption: 'The east face of Lobuche East', alt: 'Lobuche East' },
  { filename: '20221021-three-passes-2183-website.jpg', caption: 'The summit of Island Peak', alt: 'Island Peak' },
  { filename: 'pisces.jpg', caption: 'Placing a cam on Pisces at Index Town Wall', alt: 'Rock climbing' },
  { filename: 'dakobed.jpg', caption: 'Dakobed from White Pass', alt: 'Dakobed mountain' },
  { filename: 'hood.jpg', caption: 'Mt. Hood', alt: 'Mt. Hood' },
  { filename: 'rainier.jpg', caption: 'Sunrise from Mount Rainier', alt: 'Mount Rainier' },
  { filename: '20221220-climbing-course-3231-blog.jpg', caption: 'Himalayan winter', alt: 'Winter climbing' },
  { filename: 'maehongson.jpg', caption: 'Wandering the farmland of Mae Hong Son, Thailand', alt: 'Mae Hong Son' },
].map(img => ({
  ...img,
  filenameNoExt: img.filename.replace(/\.(jpg|jpeg|png)$/i, '')
}))

/**
 * Build all blog posts from markdown
 */
async function buildBlogPosts() {
  const contentDir = path.join(rootDir, 'content/blog')
  const outputDir = path.join(rootDir, 'blog')
  
  let files
  try {
    files = await fs.readdir(contentDir)
  } catch (error) {
    console.log('⚠️  No blog posts found yet')
    return []
  }
  
  const mdFiles = files.filter((f) => f.endsWith('.md'))

  console.log(`📝 Building ${mdFiles.length} blog posts...`)

  const posts = []

  for (const file of mdFiles) {
    const source = await fs.readFile(path.join(contentDir, file), 'utf-8')
    const { frontmatter, html } = parseMarkdown(source)
    const slug = generateSlug(frontmatter.title || frontmatter.path?.split('/').pop() || file.replace('.md', ''))
    
    // Convert absolute paths to relative paths for nested pages
    const htmlWithRelativePaths = html
      .replace(/src="\/images\//g, 'src="../../images/')
      .replace(/href="\/images\//g, 'href="../../images/')
    
    const dateISO = new Date(frontmatter.date).toISOString()
    
    // Render using Nunjucks
    const output = nunjucks.render('blog-post.njk', {
      title: frontmatter.title,
      dateFormatted: formatDate(frontmatter.date),
      dateISO: dateISO,
      content: htmlWithRelativePaths,
      blurb: frontmatter.blurb || '',
      pathPrefix: '../..',
    })
    
    // Write to output directory
    const outputPath = path.join(outputDir, slug)
    await fs.mkdir(outputPath, { recursive: true })
    await fs.writeFile(path.join(outputPath, 'index.html'), output)
    
    console.log(`  ✓ ${frontmatter.title}`)
    
    // Store for index generation
    posts.push({
      title: frontmatter.title,
      date: frontmatter.date,
      dateFormatted: formatDate(frontmatter.date),
      blurb: frontmatter.blurb,
      image: frontmatter.image,
      slug,
    })
  }

  console.log(`✓ Built ${mdFiles.length} blog posts!`)
  return posts
}

/**
 * Build all project pages from markdown
 */
async function buildProjects() {
  const contentDir = path.join(rootDir, 'content/projects')
  const outputDir = path.join(rootDir, 'projects')
  
  let files
  try {
    files = await fs.readdir(contentDir)
  } catch (error) {
    console.log('⚠️  No projects found yet')
    return []
  }
  
  const mdFiles = files.filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))

  console.log(`📁 Building ${mdFiles.length} projects...`)

  const projects = []

  for (const file of mdFiles) {
    const source = await fs.readFile(path.join(contentDir, file), 'utf-8')
    const { frontmatter, html } = parseMarkdown(source)
    const slug = generateSlug(frontmatter.title)
    
    // Convert absolute paths to relative paths for nested pages
    const htmlWithRelativePaths = html
      .replace(/src="\/images\//g, 'src="../../images/')
      .replace(/href="\/images\//g, 'href="../../images/')
    
    const dateRange = formatProjectDate(frontmatter.startDate, frontmatter.endDate)
    
    // Render using Nunjucks
    const output = nunjucks.render('project.njk', {
      title: frontmatter.title,
      dateRange: dateRange,
      summary: frontmatter.summary || '',
      tags: frontmatter.tags || [],
      site: frontmatter.site,
      repo: frontmatter.repo,
      content: htmlWithRelativePaths,
      pathPrefix: '../..',
    })
    
    // Write to output directory
    const outputPath = path.join(outputDir, slug)
    await fs.mkdir(outputPath, { recursive: true })
    await fs.writeFile(path.join(outputPath, 'index.html'), output)
    
    console.log(`  ✓ ${frontmatter.title}`)
    
    // Store for index generation
    projects.push({
      title: frontmatter.title,
      summary: frontmatter.summary,
      image: frontmatter.image,
      tags: frontmatter.tags,
      startDate: frontmatter.startDate,
      endDate: frontmatter.endDate,
      dateRange: dateRange,
      site: frontmatter.site,
      repo: frontmatter.repo,
      slug,
    })
  }

  console.log(`✓ Built ${mdFiles.length} projects!`)
  return projects
}

/**
 * Build static pages (index, blog index, projects index, gallery)
 */
async function buildStaticPages(posts, projects) {
  console.log('📄 Building static pages...')
  
  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))
  
  // Get featured content for home page
  const recentPosts = sortedPosts.slice(0, 2)
  const featuredProjects = projects.slice(0, 2)
  
  // Build index.html
  const indexHtml = nunjucks.render('pages/index.njk', {
    pathPrefix: '',
    recentPosts,
    featuredProjects,
  })
  await fs.writeFile(path.join(rootDir, 'index.html'), indexHtml)
  console.log('  ✓ index.html')
  
  // Build blog.html
  const blogHtml = nunjucks.render('pages/blog-index.njk', {
    pathPrefix: '',
    posts: sortedPosts,
  })
  await fs.writeFile(path.join(rootDir, 'blog.html'), blogHtml)
  console.log('  ✓ blog.html')
  
  // Build projects.html
  const projectsHtml = nunjucks.render('pages/projects-index.njk', {
    pathPrefix: '',
    projects,
  })
  await fs.writeFile(path.join(rootDir, 'projects.html'), projectsHtml)
  console.log('  ✓ projects.html')
  
  // Build gallery.html
  const galleryHtml = nunjucks.render('pages/gallery.njk', {
    pathPrefix: '',
    galleryImages,
  })
  await fs.writeFile(path.join(rootDir, 'gallery.html'), galleryHtml)
  console.log('  ✓ gallery.html')
  
  console.log('✓ Built static pages!')
}

/**
 * Main build function
 */
async function build() {
  try {
    console.log('🏗️  Starting build...\n')
    
    const posts = await buildBlogPosts()
    console.log()
    
    const projects = await buildProjects()
    console.log()
    
    await buildStaticPages(posts, projects)
    console.log()
    
    console.log('✨ Build complete!\n')
    
    return { posts, projects }
  } catch (error) {
    console.error('❌ Build failed:', error)
    process.exit(1)
  }
}

// Run build if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  build()
}

export { build, buildBlogPosts, buildProjects, buildStaticPages }
