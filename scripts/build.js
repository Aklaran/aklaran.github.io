import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  parseMarkdown,
  formatDate,
  formatProjectDate,
  generateSlug,
} from './markdown-processor.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')

/**
 * Build all blog posts from markdown
 */
async function buildBlogPosts() {
  const contentDir = path.join(rootDir, 'content/blog')
  const outputDir = path.join(rootDir, 'blog')
  const templatePath = path.join(rootDir, 'templates/blog-post.html')

  const template = await fs.readFile(templatePath, 'utf-8')
  
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
    
    // Generate HTML from template
    const dateISO = new Date(frontmatter.date).toISOString()
    const output = template
      .replace(/\{\{TITLE\}\}/g, frontmatter.title)
      .replace(/\{\{DATE\}\}/g, formatDate(frontmatter.date))
      .replace(/\{\{DATE_ISO\}\}/g, dateISO)
      .replace(/\{\{CONTENT\}\}/g, html)
      .replace(/\{\{BLURB\}\}/g, frontmatter.blurb || '')
    
    // Write to output directory
    const outputPath = path.join(outputDir, slug)
    await fs.mkdir(outputPath, { recursive: true })
    await fs.writeFile(path.join(outputPath, 'index.html'), output)
    
    console.log(`  ✓ ${frontmatter.title}`)
    
    // Store for index generation
    posts.push({
      title: frontmatter.title,
      date: frontmatter.date,
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
  const templatePath = path.join(rootDir, 'templates/project.html')

  const template = await fs.readFile(templatePath, 'utf-8')
  
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
    
    // Generate tags HTML
    const tagsHTML = frontmatter.tags
      ? frontmatter.tags.map(tag => `<span class="tag">${tag}</span>`).join('')
      : ''
    
    // Generate links HTML
    let linksHTML = '<div class="project-links">'
    if (frontmatter.site) {
      linksHTML += `<a href="${frontmatter.site}" class="project-link" target="_blank" rel="noopener noreferrer">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
        Visit Site
      </a>`
    }
    if (frontmatter.repo) {
      linksHTML += `<a href="${frontmatter.repo}" class="project-link" target="_blank" rel="noopener noreferrer">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
        View Code
      </a>`
    }
    linksHTML += '</div>'
    
    // Generate HTML from template
    const output = template
      .replace(/\{\{TITLE\}\}/g, frontmatter.title)
      .replace(/\{\{DATE_RANGE\}\}/g, formatProjectDate(frontmatter.startDate, frontmatter.endDate))
      .replace(/\{\{SUMMARY\}\}/g, frontmatter.summary || '')
      .replace(/\{\{TAGS\}\}/g, tagsHTML)
      .replace(/\{\{LINKS\}\}/g, linksHTML)
      .replace(/\{\{CONTENT\}\}/g, html)
    
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
      site: frontmatter.site,
      repo: frontmatter.repo,
      slug,
    })
  }

  console.log(`✓ Built ${mdFiles.length} projects!`)
  return projects
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

export { build, buildBlogPosts, buildProjects }
