/**
 * Main JavaScript - General utilities and animations
 */

/**
 * Logo animation - swap text on hover
 */
function initLogoAnimation() {
  const logo = document.querySelector('.logo')
  const logoText = document.querySelector('.logo-text')
  
  if (!logo || !logoText) return
  
  const originalText = logoText.textContent
  const alternateText = 'Aklaran'
  
  logo.addEventListener('mouseenter', () => {
    logoText.textContent = alternateText
  })
  
  logo.addEventListener('mouseleave', () => {
    logoText.textContent = originalText
  })
}

/**
 * Wave animation - trigger on hover
 */
function initWaveAnimation() {
  const waveElement = document.querySelector('[data-wave]')
  
  if (!waveElement) return
  
  let isAnimating = false
  const animationDuration = 2500 // milliseconds
  
  const parentElement = waveElement.closest('.about') || waveElement.parentElement
  
  if (parentElement) {
    parentElement.addEventListener('mouseenter', () => {
      if (!isAnimating) {
        isAnimating = true
        waveElement.classList.add('animated')
        
        setTimeout(() => {
          waveElement.classList.remove('animated')
          isAnimating = false
        }, animationDuration)
      }
    })
  }
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href')
      
      // Skip if it's just "#"
      if (href === '#') return
      
      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })
}

/**
 * Initialize all features
 */
function init() {
  initLogoAnimation()
  initWaveAnimation()
  initSmoothScroll()
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
