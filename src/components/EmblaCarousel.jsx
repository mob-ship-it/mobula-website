import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

/**
 * EmblaCarousel - Componente reutilizable de carousel profesional
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Slides del carousel
 * @param {Object} props.options - Opciones de configuración de Embla
 * @param {boolean} props.showDots - Mostrar indicadores de puntos (default: true)
 * @param {boolean} props.showArrows - Mostrar flechas de navegación (default: false)
 * @param {string} props.className - Clases CSS adicionales para el contenedor
 * @param {string} props.slideClassName - Clases CSS para cada slide
 * @param {Object} props.slideStyle - Estilos inline para cada slide
 */
export function EmblaCarousel({
  children,
  options = {},
  showDots = true,
  showArrows = false,
  className = '',
  slideClassName = '',
  slideStyle = {},
  onSlideChange = null
}) {
  const defaultOptions = {
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: false,
    skipSnaps: false,
    duration: 25,
    inViewThreshold: 0.7,
    axis: 'x',
    dragThreshold: 20,
    startIndex: 0,
    ...options
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(defaultOptions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = React.useRef(0);

  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    
    const index = emblaApi.selectedScrollSnap();
    setCurrentIndex(index);
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    
    if (onSlideChange) {
      onSlideChange(index);
    }
  }, [emblaApi, onSlideChange]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!emblaApi) return;
    
    const touchY = e.touches[0].clientY;
    const deltaY = Math.abs(touchY - touchStartY.current);
    const deltaX = Math.abs(e.touches[0].clientX - e.touches[0].clientX);
    
    if (deltaY > 5 && deltaY > deltaX) {
      return;
    }
  }, [emblaApi]);

  // Funciones de navegación
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <div className={`relative ${className}`}>
      {/* Flechas de navegación (opcional) */}
      {showArrows && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white hover:bg-gray-50 rounded-full shadow-lg transition-all duration-200 ${
              !canScrollPrev ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
            aria-label="Anterior"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#13243c] rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white hover:bg-gray-50 rounded-full shadow-lg transition-all duration-200 ${
              !canScrollNext ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
            aria-label="Siguiente"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#13243c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Carousel Container */}
      <div 
        className="overflow-hidden" 
        ref={emblaRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="flex flex-row">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`flex-shrink-0 min-w-0 ${slideClassName}`}
              style={slideStyle}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation (opcional) */}
      {showDots && totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`rounded-full transition-all duration-300 border-0 outline-none focus:outline-none ${
                index === currentIndex 
                  ? 'bg-[#211EE1] w-2.5 h-2.5 sm:w-3 sm:h-3 scale-125' 
                  : 'bg-[#13243c]/30 w-2 h-2 sm:w-2.5 sm:h-2.5 hover:bg-[#13243c]/50'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default EmblaCarousel;
