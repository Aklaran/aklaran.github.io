import { defineConfig } from 'vite'
import { execSync } from 'child_process'

/**
 * Custom plugin to rebuild markdown content on file changes
 */
function markdownRebuild() {
  return {
    name: 'markdown-rebuild',
    handleHotUpdate({ file, server }) {
      if (file.includes('content/') && file.endsWith('.md')) {
        console.log('📝 Markdown changed, rebuilding...')
        try {
          execSync('node scripts/build.js', { stdio: 'inherit' })
          
          // Trigger full reload for generated HTML
          server.ws.send({
            type: 'full-reload',
            path: '*',
          })
        } catch (error) {
          console.error('❌ Build failed:', error)
        }
      }
    },
  }
}

export default defineConfig({
  root: '.',
  base: '/',
  
  // Dev server configuration
  server: {
    port: 3000,
    open: true,
  },
  
  // Production build configuration
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
        blog: './blog.html',
        projects: './projects.html',
        gallery: './gallery.html',
      },
    },
  },
  
  // Copy public assets
  publicDir: 'public',
  
  // Plugins
  plugins: [
    markdownRebuild(),
  ],
})
