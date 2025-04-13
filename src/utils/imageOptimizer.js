// Image optimization utility - WebP conversion helper
// This would typically be run with a proper image optimization tool
// For now, we'll provide optimized image loading patterns

export const getImageSrc = (imageName) => {
  // In production, this would check for WebP support and serve WebP versions
  const supportsWebP = (() => {
    const elem = typeof window !== 'undefined' ? document.createElement('canvas') : null;
    if (elem != null) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  })();

  const basePath = '/assets/';
  
  // Return WebP if supported, otherwise fallback to original
  if (supportsWebP) {
    return `${basePath}${imageName.replace(/\.(jpg|jpeg|png)$/, '.webp')}`;
  }
  return `${basePath}${imageName}`;
};

// Preload critical images
export const preloadImages = (imageUrls) => {
  if (typeof window === 'undefined') return;
  
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

// Lazy load images with intersection observer
export const lazyLoadImages = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
};

// Optimize image loading for performance
export const optimizeImageLoading = () => {
  // Set loading="lazy" for all images
  // This is handled in JSX components
  
  // Preload hero image
  const heroImages = [
    '/assets/man5k.png',
    '/assets/ai-assistant.png',
    '/assets/noteshub.png'
  ];
  
  preloadImages(heroImages);
  
  // Initialize lazy loading
  lazyLoadImages();
};