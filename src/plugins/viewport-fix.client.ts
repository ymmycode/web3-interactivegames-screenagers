// Fix for iOS Safari viewport height issues on iPad
export default defineNuxtPlugin(() => {
  // Function to update CSS custom property for actual viewport height
  const updateViewportHeight = () => {
    // Get the actual viewport height
    const vh = window.innerHeight * 0.01
    // Set CSS custom property
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  // Set initial height
  updateViewportHeight()

  // Update on resize (handles orientation changes and toolbar show/hide)
  window.addEventListener('resize', updateViewportHeight)
  
  // Also update on orientation change for iPad
  window.addEventListener('orientationchange', () => {
    // Small delay to ensure the orientation change is complete
    setTimeout(updateViewportHeight, 100)
  })

  // For iOS Safari specifically, also listen to visual viewport changes if supported
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', updateViewportHeight)
  }

  // Clean up on app unmount
  return {
    provide: {
      updateViewportHeight
    }
  }
})