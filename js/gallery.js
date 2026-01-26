/**
 * Gallery Lightbox - Image viewer with keyboard navigation
 */

// Performance tracking
const perfData = {
  startTime: performance.now(),
  imagesLoaded: 0,
  totalImages: 0,
  bytesLoaded: 0,
  imageLoadTimes: []
}

/**
 * Track individual image load performance
 */
function trackImageLoad(img) {
  const loadStart = performance.now()
  
  img.addEventListener('load', () => {
    const loadEnd = performance.now()
    const loadTime = loadEnd - loadStart
    
    perfData.imagesLoaded++
    perfData.imageLoadTimes.push(loadTime)
    
    // Estimate bytes loaded (attempt to get from response headers)
    fetch(img.currentSrc || img.src, { method: 'HEAD' })
      .then(res => {
        const size = parseInt(res.headers.get('content-length') || '0')
        if (size > 0) {
          perfData.bytesLoaded += size
        }
      })
      .catch(() => {
        // Silently fail if HEAD request not supported
      })
    
    // Log individual image progress
    console.log(`[Gallery] Image ${perfData.imagesLoaded}/${perfData.totalImages} loaded in ${loadTime.toFixed(0)}ms`)
    
    // Log final stats when all images loaded
    if (perfData.imagesLoaded === perfData.totalImages) {
      logFinalStats()
    }
  })
  
  img.addEventListener('error', () => {
    perfData.imagesLoaded++
    console.warn(`[Gallery] Image ${perfData.imagesLoaded}/${perfData.totalImages} failed to load`)
    
    if (perfData.imagesLoaded === perfData.totalImages) {
      logFinalStats()
    }
  })
}

/**
 * Log final performance statistics
 */
function logFinalStats() {
  const totalTime = performance.now() - perfData.startTime
  const avgLoadTime = perfData.imageLoadTimes.length > 0
    ? perfData.imageLoadTimes.reduce((a, b) => a + b, 0) / perfData.imageLoadTimes.length
    : 0
  const totalMB = (perfData.bytesLoaded / (1024 * 1024)).toFixed(2)
  
  console.log('\n=== Gallery Performance Stats ===')
  console.log(`Total Load Time: ${totalTime.toFixed(0)}ms (${(totalTime / 1000).toFixed(1)}s)`)
  console.log(`Average Image Load: ${avgLoadTime.toFixed(0)}ms`)
  console.log(`Total Data: ${totalMB}MB`)
  console.log(`Images Loaded: ${perfData.imagesLoaded}/${perfData.totalImages}`)
  console.log('=================================\n')
  
  // Visual notification in dev mode (localhost only)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    showPerformanceBanner(totalTime, totalMB)
  }
}

/**
 * Show visual performance banner (localhost only)
 */
function showPerformanceBanner(totalTime, totalMB) {
  const banner = document.createElement('div')
  banner.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #28a745;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    font-family: 'Cabin', -apple-system, sans-serif;
    font-size: 14px;
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
  `
  
  banner.innerHTML = `
    <strong style="display: block; margin-bottom: 5px;">📊 Gallery Loaded</strong>
    <div style="font-size: 13px;">
      ⏱️ ${(totalTime / 1000).toFixed(1)}s &nbsp;|&nbsp; 📦 ${totalMB}MB
    </div>
  `
  
  document.body.appendChild(banner)
  
  // Fade out and remove after 5 seconds
  setTimeout(() => {
    banner.style.transition = 'opacity 0.5s ease-out'
    banner.style.opacity = '0'
    setTimeout(() => banner.remove(), 500)
  }, 5000)
}

class Lightbox {
  constructor(images) {
    this.images = images
    this.currentIndex = 0
    this.overlay = null
    this.imageElement = null
    this.captionElement = null
  }

  /**
   * Open lightbox at specific index
   */
  open(index) {
    this.currentIndex = index
    this.render()
    this.bindEvents()
    document.body.style.overflow = 'hidden'
  }

  /**
   * Close lightbox
   */
  close() {
    if (this.overlay) {
      this.overlay.remove()
      this.overlay = null
    }
    document.body.style.overflow = ''
    document.removeEventListener('keydown', this.handleKeyboard)
  }

  /**
   * Navigate to next image
   */
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length
    this.updateImage()
  }

  /**
   * Navigate to previous image
   */
  prev() {
    this.currentIndex = 
      (this.currentIndex - 1 + this.images.length) % this.images.length
    this.updateImage()
  }

  /**
   * Render lightbox overlay
   */
  render() {
    const image = this.images[this.currentIndex]
    
    this.overlay = document.createElement('div')
    this.overlay.className = 'lightbox-overlay'
    this.overlay.setAttribute('data-testid', 'lightbox')
    
    this.overlay.innerHTML = `
      <button class="lightbox-close" aria-label="Close">×</button>
      <button class="lightbox-prev" aria-label="Previous">‹</button>
      <button class="lightbox-next" aria-label="Next">›</button>
      <img 
        class="lightbox-image" 
        src="${image.src}" 
        alt="${image.alt}"
        data-testid="lightbox-image"
      />
      ${image.caption ? `<p class="lightbox-caption">${image.caption}</p>` : ''}
    `
    
    document.body.appendChild(this.overlay)
    this.imageElement = this.overlay.querySelector('.lightbox-image')
    this.captionElement = this.overlay.querySelector('.lightbox-caption')
  }

  /**
   * Update displayed image
   */
  updateImage() {
    const image = this.images[this.currentIndex]
    
    if (this.imageElement) {
      this.imageElement.src = image.src
      this.imageElement.alt = image.alt
    }
    
    if (this.captionElement) {
      if (image.caption) {
        this.captionElement.textContent = image.caption
        this.captionElement.style.display = 'block'
      } else {
        this.captionElement.style.display = 'none'
      }
    }
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    if (!this.overlay) return
    
    // Close button
    const closeBtn = this.overlay.querySelector('.lightbox-close')
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close())
    }
    
    // Navigation buttons
    const prevBtn = this.overlay.querySelector('.lightbox-prev')
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prev())
    }
    
    const nextBtn = this.overlay.querySelector('.lightbox-next')
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.next())
    }
    
    // Keyboard navigation
    this.handleKeyboard = (e) => {
      switch (e.key) {
        case 'Escape':
          this.close()
          break
        case 'ArrowRight':
          this.next()
          break
        case 'ArrowLeft':
          this.prev()
          break
      }
    }
    document.addEventListener('keydown', this.handleKeyboard)
    
    // Click overlay to close
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close()
      }
    })
  }
}

/**
 * Initialize lightbox for gallery
 */
function initGallery() {
  const gallery = document.querySelector('[data-gallery]')
  if (!gallery) return
  
  // Collect all gallery images
  const imageElements = gallery.querySelectorAll('[data-gallery-image]')
  const images = Array.from(imageElements).map((el) => ({
    src: el.querySelector('img')?.src || el.getAttribute('data-src') || '',
    alt: el.querySelector('img')?.alt || '',
    caption: el.getAttribute('data-caption') || '',
  }))
  
  // Initialize performance tracking
  const imgTags = gallery.querySelectorAll('img')
  perfData.totalImages = imgTags.length
  perfData.startTime = performance.now()
  
  console.log(`[Gallery] Starting to load ${perfData.totalImages} images...`)
  
  // Track performance for each image
  imgTags.forEach(img => {
    if (img.complete) {
      // Image already loaded (cached)
      perfData.imagesLoaded++
      if (perfData.imagesLoaded === perfData.totalImages) {
        // All images were cached
        setTimeout(logFinalStats, 0)
      }
    } else {
      trackImageLoad(img)
    }
  })
  
  const lightbox = new Lightbox(images)
  
  // Attach click handlers
  imageElements.forEach((el, index) => {
    el.addEventListener('click', () => lightbox.open(index))
    el.style.cursor = 'pointer'
  })
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGallery)
} else {
  initGallery()
}
