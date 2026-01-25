import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Import functions we'll test (will fail initially - that's expected in RED phase)
let processImage, processAllImages, getImageDimensions

try {
  const module = await import('../process-images.js')
  processImage = module.processImage
  processAllImages = module.processAllImages
  getImageDimensions = module.getImageDimensions
} catch (error) {
  // Expected to fail initially - we haven't created the module yet
}

// Helper functions for tests
async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function getFileSize(filePath) {
  const stats = await fs.stat(filePath)
  return stats.size
}

async function getAspectRatio(imagePath) {
  if (!getImageDimensions) return 0
  const { width, height } = await getImageDimensions(imagePath)
  return width / height
}

describe('Image Processor', () => {
  const testFixtures = path.join(__dirname, 'test-fixtures')
  const testOutput = path.join(__dirname, 'test-output')

  beforeAll(async () => {
    // Create output directory
    await fs.mkdir(testOutput, { recursive: true })
  })

  afterAll(async () => {
    // Clean up test output
    try {
      await fs.rm(testOutput, { recursive: true, force: true })
    } catch (error) {
      // Ignore cleanup errors
    }
  })

  describe('processImage', () => {
    it('should generate thumbnail, medium, and large sizes', async () => {
      // Given a source image
      const testImage = path.join(testFixtures, 'large-photo.jpg')
      const outputDir = testOutput
      
      // When processing the image
      const result = await processImage(testImage, outputDir)
      
      // Then all three sizes should be generated
      expect(result.sizes).toHaveLength(3)
      expect(result.sizes).toContainEqual(
        expect.objectContaining({ name: 'thumbnail', width: 400 })
      )
      expect(result.sizes).toContainEqual(
        expect.objectContaining({ name: 'medium', width: 800 })
      )
      expect(result.sizes).toContainEqual(
        expect.objectContaining({ name: 'large', width: 1600 })
      )
    })

    it('should generate both WebP and JPG formats for each size', async () => {
      // Given a source image
      const testImage = path.join(testFixtures, 'large-photo.jpg')
      const outputDir = testOutput
      
      // When processing the image
      await processImage(testImage, outputDir)
      
      // Then both formats should exist for each size
      const sizes = ['thumbnail', 'medium', 'large']
      for (const size of sizes) {
        const webpPath = path.join(outputDir, size, 'large-photo.webp')
        const jpgPath = path.join(outputDir, size, 'large-photo.jpg')
        
        const webpExists = await fileExists(webpPath)
        const jpgExists = await fileExists(jpgPath)
        
        expect(webpExists).toBe(true)
        expect(jpgExists).toBe(true)
      }
    })

    it('should reduce thumbnail file size to under 150KB', async () => {
      // Given a large source image (>3MB)
      const testImage = path.join(testFixtures, 'large-photo.jpg')
      const outputDir = testOutput
      
      // When processing to thumbnail
      await processImage(testImage, outputDir)
      
      // Then thumbnail should be significantly smaller
      const thumbPath = path.join(outputDir, 'thumbnail', 'large-photo.jpg')
      const thumbSize = await getFileSize(thumbPath)
      
      expect(thumbSize).toBeLessThan(150 * 1024) // Less than 150KB
    })

    it('should reduce medium file size to under 350KB', async () => {
      // Given a large source image
      const testImage = path.join(testFixtures, 'large-photo.jpg')
      const outputDir = testOutput
      
      // When processing to medium
      await processImage(testImage, outputDir)
      
      // Then medium should be reasonably sized
      const mediumPath = path.join(outputDir, 'medium', 'large-photo.jpg')
      const mediumSize = await getFileSize(mediumPath)
      
      expect(mediumSize).toBeLessThan(350 * 1024) // Less than 350KB
    })

    it('should maintain aspect ratio for all sizes', async () => {
      // Given a source image with known dimensions
      const testImage = path.join(testFixtures, 'large-photo.jpg')
      const outputDir = testOutput
      
      // When processing
      await processImage(testImage, outputDir)
      
      // Then aspect ratios should match original
      const originalRatio = await getAspectRatio(testImage)
      const thumbRatio = await getAspectRatio(path.join(outputDir, 'thumbnail', 'large-photo.jpg'))
      const mediumRatio = await getAspectRatio(path.join(outputDir, 'medium', 'large-photo.jpg'))
      
      expect(thumbRatio).toBeCloseTo(originalRatio, 2)
      expect(mediumRatio).toBeCloseTo(originalRatio, 2)
    })

    it('should return compression statistics', async () => {
      // Given a source image
      const testImage = path.join(testFixtures, 'large-photo.jpg')
      const outputDir = testOutput
      
      // When processing with statistics
      const result = await processImage(testImage, outputDir)
      
      // Then statistics should be returned
      expect(result.stats).toBeDefined()
      expect(result.stats.originalSize).toBeGreaterThan(0)
      expect(result.stats.thumbnailSize).toBeLessThan(result.stats.originalSize)
      expect(result.stats.compressionRatio).toBeGreaterThan(5) // At least 5x compression on thumbnail
    })
  })

  describe('processAllImages', () => {
    it('should process all JPG images in directory', async () => {
      // Given a directory with multiple images
      const inputDir = path.join(testFixtures, 'gallery')
      const outputDir = path.join(testOutput, 'batch')
      
      // When processing all images
      const result = await processAllImages(inputDir, outputDir)
      
      // Then all images should be processed
      expect(result.processedCount).toBe(3)
      expect(result.totalSavings).toBeGreaterThan(0)
    })

    it('should skip already processed images if unchanged', async () => {
      // Given images already processed
      const inputDir = path.join(testFixtures, 'gallery')
      const outputDir = path.join(testOutput, 'batch-skip')
      
      // Process once
      await processAllImages(inputDir, outputDir)
      
      // When processing again without changes
      const result = await processAllImages(inputDir, outputDir)
      
      // Then should skip processing
      expect(result.skippedCount).toBe(3)
      expect(result.processedCount).toBe(0)
    })

    it('should handle PNG images in addition to JPG', async () => {
      // Given a PNG image
      const inputDir = testFixtures
      const outputDir = path.join(testOutput, 'png-test')
      
      // When processing (includes sample.png)
      const result = await processAllImages(inputDir, outputDir)
      
      // Then PNG should be processed
      expect(result.processedCount).toBeGreaterThan(0)
      
      const pngOutput = path.join(outputDir, 'thumbnail', 'sample.webp')
      const pngExists = await fileExists(pngOutput)
      expect(pngExists).toBe(true)
    })
  })

  describe('getImageDimensions', () => {
    it('should return width and height of an image', async () => {
      // Given an image file
      const testImage = path.join(testFixtures, 'large-photo.jpg')
      
      // When getting dimensions
      const dimensions = await getImageDimensions(testImage)
      
      // Then should return valid dimensions
      expect(dimensions.width).toBeGreaterThan(0)
      expect(dimensions.height).toBeGreaterThan(0)
    })
  })
})
