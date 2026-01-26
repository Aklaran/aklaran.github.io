import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')

async function listFiles(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    const files = []
    for (const entry of entries) {
      if (entry.isFile()) {
        files.push(entry.name)
      }
    }
    return files
  } catch (err) {
    return []
  }
}

async function copyBuildAssets() {
  console.log('📦 Copying build assets to dist...')
  
  // Get list of root-level images to copy
  const imagesBeforeCopy = await listFiles(path.join(rootDir, 'images'))

  // Create dist/images directory
  await fs.mkdir(path.join(rootDir, 'dist', 'images'), { recursive: true })

  // Copy blog and projects folders
  console.log('  ✓ Copying blog/')
  execSync(`cp -r ${path.join(rootDir, 'blog')} ${path.join(rootDir, 'dist/')}`, { stdio: 'inherit' })
  
  console.log('  ✓ Copying projects/')
  execSync(`cp -r ${path.join(rootDir, 'projects')} ${path.join(rootDir, 'dist/')}`, { stdio: 'inherit' })
  
  console.log('  ✓ Copying css/')
  execSync(`cp -r ${path.join(rootDir, 'css')} ${path.join(rootDir, 'dist/')}`, { stdio: 'inherit' })
  
  console.log('  ✓ Copying js/')
  execSync(`cp -r ${path.join(rootDir, 'js')} ${path.join(rootDir, 'dist/')}`, { stdio: 'inherit' })
  
  // Copy optimized images
  console.log('  ✓ Copying images/optimized/')
  execSync(`cp -r ${path.join(rootDir, 'images', 'optimized')} ${path.join(rootDir, 'dist', 'images', 'optimized')}`, { stdio: 'inherit' })
  
  // Copy all root-level images (blog images, logo, etc.)
  console.log('  ✓ Copying root-level images (*.jpg, *.png, *.jpeg, *.svg)...')
  const imageFiles = imagesBeforeCopy.filter(f => 
    f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg') || f.endsWith('.svg')
  )
  
  for (const file of imageFiles) {
    await fs.copyFile(
      path.join(rootDir, 'images', file),
      path.join(rootDir, 'dist', 'images', file)
    )
  }
  
  console.log(`    Copied ${imageFiles.length} image files`)
  console.log('✨ Build assets copied successfully!\n')
}

copyBuildAssets().catch(err => {
  console.error('❌ Failed to copy build assets:', err)
  process.exit(1)
})
