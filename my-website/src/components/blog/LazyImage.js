import React, { useState, useEffect, useRef, memo } from 'react';

/**
 * 懒加载图片组件
 * 只有当图片进入视口时才会加载
 */
const LazyImage = memo(({ src, alt, className, style = {} }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);
  
  useEffect(() => {
    if (!imgRef.current) return;
    
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = src;
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '100px' }
    );
    
    observer.observe(imgRef.current);
    
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);
  
  return (
    <img 
      ref={imgRef}
      alt={alt}
      className={className}
      style={{ 
        opacity: isLoaded ? 1 : 0, 
        transition: 'opacity 0.3s',
        ...style 
      }}
      onLoad={() => setIsLoaded(true)}
    />
  );
});

export default LazyImage; 