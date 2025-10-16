import React, { useState, useRef, useEffect, useCallback } from "react";

export const PlansCarousel = ({ children, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const itemWidth = 258; 

  const totalItems = React.Children.count(children);

  useEffect(() => {
    updateScrollButtons();
  }, [currentIndex]);

  const updateScrollButtons = () => {
    setCanScrollLeft(currentIndex > 0);
    setCanScrollRight(currentIndex < totalItems - 1);
  };


  const smoothScrollTo = useCallback((targetScroll) => {
    const container = containerRef.current;
    if (!container) return;

    const startScroll = container.scrollLeft;
    const distance = targetScroll - startScroll;
    const duration = 300; // 300ms for smooth animation
    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      container.scrollLeft = startScroll + distance * easeOut;
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  const scrollToIndex = useCallback((index) => {
    if (containerRef.current) {
      const newIndex = Math.max(0, Math.min(index, totalItems - 1));
      const targetScroll = newIndex * itemWidth;
      
      smoothScrollTo(targetScroll);
      setCurrentIndex(newIndex);
    }
  }, [itemWidth, totalItems, smoothScrollTo]);

  const scrollToLeft = () => {
    scrollToIndex(currentIndex - 1);
  };

  const scrollToRight = () => {
    scrollToIndex(currentIndex + 1);
  };


  const updateVisualFeedback = useCallback(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollPosition = container.scrollLeft;
    const progress = scrollPosition / itemWidth;
    const nearestIndex = Math.round(progress);
    

    setScrollOffset(scrollPosition % itemWidth);
    

    if (Math.abs(progress - currentIndex) > 0.3 && nearestIndex !== currentIndex) {
      setCurrentIndex(Math.max(0, Math.min(nearestIndex, totalItems - 1)));
    }
  }, [currentIndex, itemWidth, totalItems]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
    setStartScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = 'grabbing';
    containerRef.current.style.scrollBehavior = 'auto';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.clientX;
    const walk = (startX - x) * 1.2; 
    const newScrollLeft = startScrollLeft + walk;
    
    containerRef.current.scrollLeft = Math.max(0, Math.min(newScrollLeft, (totalItems - 1) * itemWidth));
    updateVisualFeedback();
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    containerRef.current.style.cursor = 'grab';
    containerRef.current.style.scrollBehavior = 'smooth';
    const scrollPosition = containerRef.current.scrollLeft;
    const newIndex = Math.round(scrollPosition / itemWidth);
    scrollToIndex(newIndex);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };


  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setStartScrollLeft(containerRef.current.scrollLeft);
    setIsDragging(true);
    containerRef.current.style.scrollBehavior = 'auto';
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const walk = (startX - touch.clientX) * 1.0;
    const newScrollLeft = startScrollLeft + walk;
    
    containerRef.current.scrollLeft = Math.max(0, Math.min(newScrollLeft, (totalItems - 1) * itemWidth));
    updateVisualFeedback();
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    containerRef.current.style.scrollBehavior = 'smooth';
    

    const scrollPosition = containerRef.current.scrollLeft;
    const newIndex = Math.round(scrollPosition / itemWidth);
    scrollToIndex(newIndex);
  };

 
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Carousel container */}
      <div
        ref={containerRef}
        className="flex overflow-x-hidden scrollbar-hide gap-[14px] cursor-grab select-none"
        style={{
          scrollSnapType: isDragging ? 'none' : 'x mandatory',
          scrollBehavior: 'smooth',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {React.Children.map(children, (child, index) => {
          const distanceFromCenter = Math.abs(index - (currentIndex + scrollOffset / itemWidth));
          const scale = isDragging 
            ? Math.max(0.95, 1 - distanceFromCenter * 0.05)
            : 1;
          const opacity = isDragging
            ? Math.max(0.7, 1 - distanceFromCenter * 0.1)
            : 1;

          return (
            <div 
              key={index} 
              className="flex-shrink-0 transition-all duration-75 ease-out"
              style={{ 
                scrollSnapAlign: 'start',
                transform: `scale(${scale})`,
                opacity: opacity,
                willChange: 'transform, opacity'
              }}
            >
              {child}
            </div>
          );
        })}
      </div>

      {/* Enhanced dots indicator with real-time progress */}
      <div className="flex justify-center mt-6 space-x-2.5">
        {Array.from({ length: totalItems }, (_, index) => {
          const progress = isDragging 
            ? Math.max(0, 1 - Math.abs(index - (containerRef.current?.scrollLeft || 0) / itemWidth))
            : index === currentIndex ? 1 : 0;

          return (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`
                transition-all duration-200 ease-out
                border-0 outline-none focus:outline-none active:outline-none
                ${index === currentIndex 
                  ? 'bg-[#3b82f6]' 
                  : 'bg-[#d1d5db] hover:bg-[#9ca3af]'
                }
              `}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                display: 'block',
                transform: `scale(${0.8 + progress * 0.4})`,
                opacity: 0.6 + progress * 0.4,
                willChange: 'transform, opacity'
              }}
              aria-label={`Ir al plan ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};
