/**
 * Theme Toggle - Dark/Light mode switcher
 * Persists user preference to localStorage
 */

const THEME_KEY = 'theme'

/**
 * Get the initial theme from localStorage or system preference
 */
function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY)
  
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }
  
  // Check system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

/**
 * Apply theme to document
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(THEME_KEY, theme)
}

/**
 * Toggle between themes
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme')
  const newTheme = currentTheme === 'light' ? 'dark' : 'light'
  applyTheme(newTheme)
  return newTheme
}

/**
 * Initialize theme on page load
 */
function initTheme() {
  const theme = getInitialTheme()
  applyTheme(theme)
}

/**
 * Initialize theme toggle button
 */
function initThemeToggle() {
  const button = document.querySelector('[data-theme-toggle]')
  
  if (!button) {
    return
  }
  
  button.addEventListener('click', () => {
    const newTheme = toggleTheme()
    
    // Update button aria-label
    button.setAttribute(
      'aria-label', 
      `Switch to ${newTheme === 'light' ? 'dark' : 'light'} mode`
    )
  })
}

// Initialize on load
initTheme()

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeToggle)
} else {
  initThemeToggle()
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  // Only auto-update if user hasn't manually set a preference
  if (!localStorage.getItem(THEME_KEY)) {
    applyTheme(e.matches ? 'dark' : 'light')
  }
})
