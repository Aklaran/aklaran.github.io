import MarkdownIt from 'markdown-it'
import markdownItAttrs from 'markdown-it-attrs'
import matter from 'gray-matter'

// Configure markdown-it with plugins
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

// Add support for custom image attributes like: ![alt](image.jpg "#width=100%;max-width=800px")
md.use(markdownItAttrs, {
  leftDelimiter: '#',
  rightDelimiter: '',
})

/**
 * Parse markdown file with frontmatter
 * @param {string} source - Raw markdown content with frontmatter
 * @returns {{frontmatter: object, content: string, html: string}}
 */
export function parseMarkdown(source) {
  const { data, content } = matter(source)
  const html = md.render(content)

  return {
    frontmatter: data,
    content,
    html,
  }
}

/**
 * Format date for display (e.g., "24 October 2022")
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date
 */
export function formatDate(dateString) {
  const date = new Date(dateString)
  const options = { day: 'numeric', month: 'long', year: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

/**
 * Format project date range
 * @param {string} startDate - ISO date string
 * @param {string} [endDate] - ISO date string (optional, defaults to "Present")
 * @returns {string} - Formatted date range (e.g., "Jan 2024 - Present")
 */
export function formatProjectDate(startDate, endDate) {
  const start = new Date(startDate)
  const startFormatted = start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  
  if (!endDate) {
    return `${startFormatted} - Present`
  }
  
  const end = new Date(endDate)
  const endFormatted = end.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  return `${startFormatted} - ${endFormatted}`
}

/**
 * Generate URL slug from title
 * @param {string} title - Title text
 * @returns {string} - URL-safe slug
 */
export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
