/**
 * Gallery Lightbox - Image viewer with keyboard navigation
 */

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
    src: el.getAttribute('data-src') || el.querySelector('img')?.src || '',
    alt: el.querySelector('img')?.alt || '',
    caption: el.getAttribute('data-caption') || '',
  }))
  
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
