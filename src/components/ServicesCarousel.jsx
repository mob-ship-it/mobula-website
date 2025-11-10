"use client";
import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const ServiceSlide = ({ slide, isActive, index, onSlideClick, isExpanded, onToggleExpand }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const handleClick = () => {
        if (isMobile) {
            if (isActive && slide.services) {
                onToggleExpand(index);
            } else if (onSlideClick) {
                onSlideClick(index);
            }
        } else {
            if (slide.services) {
                if (!isActive && onSlideClick) {
                    onSlideClick(index);
                }
                onToggleExpand(index);
            }
        }
    };

    const desktopStyles = {
        width: isExpanded ? 'clamp(520px, 60vw, 680px)' : 'clamp(240px, 30vw, 280px)',
        height: 'clamp(340px, 65vh, 480px)',
        opacity: 1,
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
    };

    const mobileStyles = {
        width: 'clamp(260px, 80vw, 340px)',
        height: isExpanded ? 'clamp(480px, 80vh, 600px)' : 'clamp(360px, 70vh, 520px)',
        transform: isActive ? 'scale(1)' : 'scale(0.85)',
        opacity: isActive ? 1 : 0.5,
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isActive ? 'auto' : 'none',
        cursor: 'pointer',
    };

    return (
        <div
            className="embla__slide"
            style={{
                flex: '0 0 auto',
                minWidth: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: '8px',
                paddingRight: '8px'
            }}
        >
            <div
                className="relative cursor-pointer"
                style={isMobile ? mobileStyles : desktopStyles}
                onClick={handleClick}
            >
                <div
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                        backgroundColor: isExpanded ? (slide.color || '#13243c') : 'transparent',
                    }}
                >
                    <div className="absolute inset-0 flex flex-col lg:flex-row">
                        
                        <div 
                            className={`relative ${
                                isExpanded 
                                    ? 'lg:w-[45%] h-[35%] lg:h-full' 
                                    : 'w-full h-full'
                            } transition-all duration-600`}
                            style={{ 
                                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                                padding: isExpanded ? '16px' : '0',
                                backgroundColor: isExpanded ? (slide.color || '#13243c') : 'transparent'
                            }}
                        >
                            {slide.image && (
                                <div className="relative w-full h-full rounded-xl overflow-hidden">
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        loading={index < 3 ? "eager" : "lazy"}
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-b ${
                                        isExpanded 
                                            ? 'from-black/60 via-black/20 to-black/10' 
                                            : 'from-black/80 via-black/30 to-black/20'
                                    } transition-all duration-600`} />
                                    
                                    <div className="absolute top-6 left-6 right-6 z-10">
                                        <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-white text-xl sm:text-2xl lg:text-2xl leading-tight">
                                            {slide.title}
                                        </h3>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div 
                            className={`relative ${
                                isExpanded 
                                    ? 'lg:w-[55%] h-[65%] lg:h-full opacity-100' 
                                    : 'w-0 h-0 lg:w-0 opacity-0 overflow-hidden'
                            } transition-all duration-600 flex flex-col justify-center`}
                            style={{ 
                                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                                transitionProperty: 'width, height, opacity',
                                padding: isExpanded ? '24px 32px' : '0',
                                backgroundColor: isExpanded ? (slide.color || '#13243c') : 'transparent',
                                backgroundImage: isExpanded && slide.bgRight ? `url(${slide.bgRight})` : 'none',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: isExpanded && slide.bgRightPosition ? slide.bgRightPosition : 'right center',
                                backgroundSize: 'auto 80%'
                            }}
                        >
                            {slide.services && (
                                <div className="flex flex-col h-full justify-center">
                                    {/* Services List */}
                                    <div className="flex-1 flex items-center mb-6">
                                        <ul className="[font-family:'Be_Vietnam',Helvetica] font-normal text-white/95 text-sm sm:text-base lg:text-lg space-y-3 lg:space-y-4 text-left w-full">
                                            {slide.services.map((service, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-start opacity-0 translate-x-8"
                                                    style={{
                                                        animation: isExpanded 
                                                            ? `slideInFromRight 0.5s ease-out ${idx * 0.1}s forwards` 
                                                            : 'none'
                                                    }}
                                                >
                                                    <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0" />
                                                    <span className="leading-relaxed">{service}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* CTA Button */}
                                    {slide.button && (
                                        <button 
                                            className="w-full bg-white hover:bg-gray-50 font-semibold rounded-full py-3 px-6 text-base lg:text-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] shadow-lg opacity-0"
                                            style={{
                                                color: slide.color || '#bb8bfe',
                                                animation: isExpanded 
                                                    ? 'slideInFromRight 0.5s ease-out 0.4s forwards' 
                                                    : 'none'
                                            }}
                                        >
                                            {slide.button}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function ServicesCarousel({ slides }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'center',
        containScroll: 'trimSnaps',
        loop: false,
        skipSnaps: false,
        dragFree: false,
        duration: 30,
    });

    const [selectedIndex, setSelectedIndex] = useState(1);
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleSlideClick = useCallback((index) => {
        if (emblaApi) {
            emblaApi.scrollTo(index);
        }
    }, [emblaApi]);

    const handleToggleExpand = useCallback((index) => {
        setExpandedIndex(prevIndex => prevIndex === index ? null : index);
    }, []);
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);

        emblaApi.scrollTo(1, true);

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <>
            <style>{`
                @keyframes slideInFromRight {
                    from {
                        opacity: 0;
                        transform: translateX(32px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
            
            <div className="w-full relative flex justify-center items-center">
                <div className="w-full max-w-7xl mx-auto py-8" ref={emblaRef}>
                    <div className="flex touch-pan-y" style={{ backfaceVisibility: 'hidden' }}>
                        {slides.map((slide, index) => (
                            <ServiceSlide
                                key={index}
                                slide={slide}
                                index={index}
                                isActive={selectedIndex === index}
                                isExpanded={expandedIndex === index}
                                onSlideClick={handleSlideClick}
                                onToggleExpand={handleToggleExpand}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ServicesCarousel;
