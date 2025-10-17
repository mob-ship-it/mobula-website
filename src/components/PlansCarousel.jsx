import React, { useState, useRef, useEffect, useCallback } from "react";

export const PlansCarousel = ({ children, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef(null);
  const itemWidth = 258; 

  const totalItems = React.Children.count(children);

  useEffect(() => {
    updateScrollButtons();
  }, [currentIndex]);

  const updateScrollButtons = () => {
    setCanScrollLeft(currentIndex > 0);
    setCanScrollRight(currentIndex < totalItems - 1);
  };

  const scrollToIndex = useCallback((index) => {
    const newIndex = Math.max(0, Math.min(index, totalItems - 1));
    setCurrentIndex(newIndex);
    setDragOffset(0);
  }, [totalItems]);

  const scrollToLeft = () => {
    scrollToIndex(currentIndex - 1);
  };

  const scrollToRight = () => {
    scrollToIndex(currentIndex + 1);
  };

  const handleStart = (clientX) => {
    setIsDragging(false);
    setStartX(clientX);
    setCurrentX(clientX);
    setDragOffset(0);
  };

  const handleMove = (clientX) => {
    if (startX === 0) return;

    const diffX = startX - clientX;
    const absDiffX = Math.abs(diffX);
    
    if (absDiffX > 3) {
      setIsDragging(true);
      const resistance = 1;
      setDragOffset(diffX * resistance);
    }

    setCurrentX(clientX);
  };

  const handleEnd = () => {
    if (startX === 0) return;

    const diffX = startX - currentX;
    const threshold = 40;

    if (isDragging && Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        if (currentIndex < totalItems - 1) {
          scrollToRight();
        } else {
          setDragOffset(0);
        }
      } else {
        if (currentIndex > 0) {
          scrollToLeft();
        } else {
          setDragOffset(0);
        }
      }
    } else {
      setDragOffset(0);
    }
    setTimeout(() => setIsDragging(false), 50);
    setStartX(0);
    setCurrentX(0);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) e.preventDefault();
    handleMove(e.clientX);
  };

  const handleMouseUp = () => handleEnd();

  const handleMouseLeave = () => {
    if (isDragging) handleEnd();
  };

  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      e.preventDefault();
    }
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => handleEnd();

  const getTransformOffset = () => {
    if (typeof window === 'undefined') return 0;
    
    const slideWidthWithGap = itemWidth + 14;
    const baseOffset = currentIndex * slideWidthWithGap;
    
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const totalWidth = totalItems * slideWidthWithGap - 14;
    
    if (totalWidth < containerWidth) {
      const centerOffset = (containerWidth - totalWidth) / 2;
      return centerOffset - dragOffset;
    }
    
    const maxOffset = totalWidth - containerWidth;
    
    const calculatedOffset = baseOffset + dragOffset;
    const finalOffset = Math.min(calculatedOffset, maxOffset);
    
    return -finalOffset;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Carousel container */}
      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="flex gap-[14px] cursor-grab active:cursor-grabbing select-none"
          style={{
            transform: `translateX(${getTransformOffset()}px)`,
            transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'transform',
            touchAction: 'pan-y pinch-zoom',
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
            return (
              <div 
                key={index} 
                className="flex-shrink-0"
                style={{ 
                  willChange: 'transform',
                  pointerEvents: isDragging ? 'none' : 'auto'
                }}
              >
                {child}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-6 space-x-2.5">
        {Array.from({ length: totalItems }, (_, index) => {
          return (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`
                transition-all duration-300 ease-out
                border-0 outline-none focus:outline-none active:outline-none
                rounded-full
                ${index === currentIndex 
                  ? 'bg-[#3b82f6] w-[10px] h-[10px]' 
                  : 'bg-[#d1d5db] hover:bg-[#9ca3af] w-[8px] h-[8px]'
                }
              `}
              style={{
                transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)',
                opacity: index === currentIndex ? 1 : 0.6,
              }}
              aria-label={`Ir al plan ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};
