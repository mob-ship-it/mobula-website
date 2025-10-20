"use client";
import React, { useState, useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const ServiceSlide = ({ slide, isActive, index }) => {
    const slideRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const animationFrameRef = useRef(null);

    const handleMouseMove = useCallback((event) => {
        if (!isActive || !slideRef.current) return;

        const rect = slideRef.current.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
            setMousePosition({ x, y });
        });
    }, [isActive]);

    const handleMouseLeave = useCallback(() => {
        setMousePosition({ x: 0, y: 0 });
    }, []);

    useEffect(() => {
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <div
            className="embla__slide"
            style={{
                flex: '0 0 80%',
                minWidth: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                perspective: '1600px',
                perspectiveOrigin: 'center center'
            }}
        >
            <div
                ref={slideRef}
                className="relative transition-all duration-700 ease-out"
                style={{
                    width: 'clamp(260px, 85vw, 360px)',
                    height: 'clamp(360px, 70vh, 520px)',
                    transform: isActive
                        ? 'scale(1) rotateX(0deg) rotateY(0deg)'
                        : 'scale(0.8) rotateX(8deg)',
                    opacity: isActive ? 1 : 0.4,
                    transformStyle: 'preserve-3d',
                    willChange: isActive ? 'transform' : 'auto',
                    pointerEvents: isActive ? 'auto' : 'none',
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* Card Container with parallax effect */}
                <div
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                        backgroundColor: slide.color || '#13243c',
                        transform: isActive
                            ? `translate3d(${mousePosition.x / 25}px, ${mousePosition.y / 25}px, 0)`
                            : 'none',
                        transition: isActive ? 'transform 0.15s ease-out' : 'transform 0.6s ease-out',
                        backfaceVisibility: 'hidden',
                    }}
                >
                    {/* Featured Card (Expanded with full content) - Shows when active */}
                    {slide.featured && (
                        <div className="absolute inset-0 p-4 sm:p-5 flex flex-col">
                            {/* Image */}
                            {slide.image && (
                                <div className="mb-3 rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-full h-[180px] sm:h-[220px] object-cover"
                                        loading="eager"
                                    />
                                </div>
                            )}

                            {/* Title */}
                            <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-white text-lg sm:text-xl md:text-2xl leading-tight mb-3">
                                {slide.title}
                            </h3>

                            {/* Services List with staggered animation - Only visible when active */}
                            {slide.services && isActive && (
                                <div className="flex-1 mb-4 animate-fade-in">
                                    <ul className="[font-family:'Be_Vietnam',Helvetica] font-normal text-white/95 text-sm sm:text-base space-y-2 text-left">
                                        {slide.services.map((service, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start animate-slide-in"
                                                style={{
                                                    animationDelay: `${idx * 0.1}s`,
                                                    animationFillMode: 'backwards'
                                                }}
                                            >
                                                <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 mr-3 flex-shrink-0" />
                                                <span>{service}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* CTA Button - Only visible when active */}
                            {slide.button && isActive && (
                                <button className="w-full bg-white text-[#bb8bfe] hover:bg-gray-50 font-semibold rounded-full py-3 px-6 text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] shadow-lg animate-fade-in">
                                    {slide.button}
                                </button>
                            )}

                            {/* Logo Badge - Only visible when active */}
                            {isActive && (
                                <div className="absolute bottom-5 right-5 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl animate-fade-in">
                                    <div className="text-[#bb8bfe] font-bold text-[8px] leading-tight text-center">
                                        MOB<br />ULA
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Regular Card (Always visible - image and title) */}
                    {!slide.featured && (
                        <div className="absolute inset-0">
                            {slide.image && (
                                <>
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/20" />
                                </>
                            )}

                            <div className="absolute top-6 left-6 right-6">
                                <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-white text-xl sm:text-2xl leading-tight">
                                    {slide.title}
                                </h3>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/**
 * ServicesCarousel - Professional carousel with Embla
 * Combines Embla's native touch handling with custom 3D animations
 */
export function ServicesCarousel({ slides }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'center',
        containScroll: 'trimSnaps',
        loop: false,
        skipSnaps: false,
        dragFree: false,
        duration: 30,
    });

    const [selectedIndex, setSelectedIndex] = useState(1); // Start with featured slide
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;

        setSelectedIndex(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
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

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="w-full relative flex justify-center items-center">
            <div className="w-full max-w-7xl mx-auto py-8" ref={emblaRef}>
                <div className="flex touch-pan-y" style={{ backfaceVisibility: 'hidden' }}>
                    {slides.map((slide, index) => (
                        <ServiceSlide
                            key={index}
                            slide={slide}
                            index={index}
                            isActive={selectedIndex === index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ServicesCarousel;
