import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration for image sizes and quality
const SIZES = [
  { name: 'thumbnail', width: 400, quality: 80 },
  { name: 'medium', width: 800, quality: 85 },
  { name: 'large', width: 1600, quality: 90 }
]

/**
 * Get dimensions of an image
 * @param {string} imagePath - Path to the image
 * @returns {Promise<{width: number, height: number}>}
 */
export async function getImageDimensions(imagePath) {
  const metadata = await sharp(imagePath).metadata()
  return {
    width: metadata.width,
    height: metadata.height
  }
}

/**
 * Check if a file needs processing (new or modified)
 * @param {string} sourcePath - Source image path
 * @param {string} outputPath - Output image path
 * @returns {Promise<boolean>}
 */
async function needsProcessing(sourcePath, outputPath) {
  try {
    const [sourceStats, outputStats] = await Promise.all([
      fs.stat(sourcePath),
      fs.stat(outputPath)
    ])
    // Process if output is older than source
    return sourceStats.mtime > outputStats.mtime
  } catch {
    // Process if output doesn't exist
    return true
  }
}

/**
 * Process a single image into multiple sizes and formats
 * @param {string} inputPath - Path to source image
 * @param {string} outputDir - Base output directory
 * @param {Object} options - Processing options
 * @returns {Promise<Object>} Processing results with statistics
 */
export async function processImage(inputPath, outputDir, options = {}) {
  const filename = path.basename(inputPath, path.extname(inputPath))
  const ext = path.extname(inputPath).toLowerCase()
  
  // Get original file size for stats
  const originalStats = await fs.stat(inputPath)
  const originalSize = originalStats.size
  
  const results = {
    filename,
    sizes: SIZES,
    formats: ['webp', 'jpg'],
    stats: {
      originalSize,
      thumbnailSize: 0,
      mediumSize: 0,
      largeSize: 0,
      compressionRatio: 0
    }
  }

  // Process each size
  for (const size of SIZES) {
    const sizeDir = path.join(outputDir, size.name)
    await fs.mkdir(sizeDir, { recursive: true })

    const webpPath = path.join(sizeDir, `${filename}.webp`)
    const jpgPath = path.join(sizeDir, `${filename}.jpg`)

    // Check if we need to process
    const needsWebp = await needsProcessing(inputPath, webpPath)
    const needsJpg = await needsProcessing(inputPath, jpgPath)

    if (needsWebp || needsJpg) {
      // Load and resize image once
      const image = sharp(inputPath)
        .resize(size.width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })

      // Generate WebP
      if (needsWebp) {
        await image
          .clone()
          .webp({ quality: size.quality })
          .toFile(webpPath)
      }

      // Generate JPG
      if (needsJpg) {
        await image
          .clone()
          .jpeg({ quality: size.quality })
          .toFile(jpgPath)
      }
    }

    // Always collect stats (even if files already exist)
    const jpgStats = await fs.stat(jpgPath)
    results.stats[`${size.name}Size`] = jpgStats.size
  }

  // Calculate compression ratio (thumbnail vs original)
  if (results.stats.thumbnailSize > 0) {
    results.stats.compressionRatio = originalSize / results.stats.thumbnailSize
  }

  return results
}

/**
 * Process all images in a directory
 * @param {string} inputDir - Directory containing source images
 * @param {string} outputDir - Base output directory
 * @returns {Promise<Object>} Processing summary
 */
export async function processAllImages(inputDir, outputDir) {
  const files = await fs.readdir(inputDir)
  const imageFiles = files.filter((f) =>
    /\.(jpg|jpeg|png)$/i.test(f)
  )

  const results = {
    processedCount: 0,
    skippedCount: 0,
    totalSavings: 0,
    originalTotalSize: 0,
    optimizedTotalSize: 0
  }

  console.log(`📸 Processing ${imageFiles.length} images from ${inputDir}...`)

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file)
    const filename = path.basename(file, path.extname(file))
    
    // Check if any output file needs processing
    const thumbnailPath = path.join(outputDir, 'thumbnail', `${filename}.jpg`)
    const needsProcess = await needsProcessing(inputPath, thumbnailPath)
    
    if (!needsProcess) {
      results.skippedCount++
      console.log(`  ⏭️  Skipped ${file} (already processed)`)
      continue
    }

    try {
      const result = await processImage(inputPath, outputDir)
      
      results.processedCount++
      results.originalTotalSize += result.stats.originalSize
      results.optimizedTotalSize += result.stats.thumbnailSize
      
      const savingsKB = ((result.stats.originalSize - result.stats.thumbnailSize) / 1024).toFixed(0)
      const ratio = result.stats.compressionRatio.toFixed(1)
      
      console.log(`  ✓ ${file} → ${ratio}x compression (saved ${savingsKB}KB)`)
    } catch (error) {
      console.error(`  ❌ Failed to process ${file}:`, error.message)
    }
  }

  results.totalSavings = results.originalTotalSize - results.optimizedTotalSize

  console.log(`\n✨ Processed ${results.processedCount} images`)
  console.log(`   Skipped ${results.skippedCount} unchanged images`)
  if (results.processedCount > 0) {
    const totalSavingsMB = (results.totalSavings / (1024 * 1024)).toFixed(2)
    const avgRatio = (results.originalTotalSize / results.optimizedTotalSize).toFixed(1)
    console.log(`   Total savings: ${totalSavingsMB}MB (${avgRatio}x compression)\n`)
  }

  return results
}

/**
 * Main execution - process all gallery images
 */
async function main() {
  const rootDir = path.join(__dirname, '..')
  const inputDir = path.join(rootDir, 'images')
  const outputDir = path.join(rootDir, 'images', 'optimized')

  console.log('🏗️  Image Optimization Build\n')

  try {
    await processAllImages(inputDir, outputDir)
    console.log('✅ Image optimization complete!\n')
  } catch (error) {
    console.error('❌ Image optimization failed:', error)
    process.exit(1)
  }
}

// Run main if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}
