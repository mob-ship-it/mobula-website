"use client";
import React, { useState, useRef, useId, useEffect } from "react";
import { cn } from "../lib/utils";

const Slide = ({ slide, index, current, handleSlideClick }) => {
    const slideRef = useRef(null);
    const xRef = useRef(0);
    const yRef = useRef(0);
    const frameRef = useRef();

    useEffect(() => {
        const animate = () => {
            if (!slideRef.current) return;

            const x = xRef.current;
            const y = yRef.current;

            slideRef.current.style.setProperty("--x", `${x}px`);
            slideRef.current.style.setProperty("--y", `${y}px`);

            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    const handleMouseMove = (event) => {
        const el = slideRef.current;
        if (!el) return;

        const r = el.getBoundingClientRect();
        xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
        yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
    };

    const handleMouseLeave = () => {
        xRef.current = 0;
        yRef.current = 0;
    };

    const imageLoaded = (event) => {
        event.currentTarget.style.opacity = "1";
    };

    return (
        <div className="[perspective:1600px] [transform-style:preserve-3d]">
            <li
                ref={slideRef}
                className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-500 ease-in-out w-[260px] sm:w-[300px] md:w-[340px] h-[360px] sm:h-[420px] md:h-[480px] mx-0 sm:mx-0.5 md:mx-1 z-10 flex-shrink-0"
                onClick={() => handleSlideClick(index)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform:
                        current !== index
                            ? "scale(0.75) rotateX(15deg)"
                            : "scale(1.1) rotateX(0deg)",
                    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    transformOrigin: "center",
                    opacity: current !== index ? 0.6 : 1,
                }}
            >
                <div
                    className="absolute top-0 left-0 w-full h-full rounded-[16px] overflow-hidden transition-all duration-200 ease-out shadow-2xl"
                    style={{
                        backgroundColor: slide.color || '#13243c',
                        transform:
                            current === index
                                ? "translate3d(calc(var(--x) / 25), calc(var(--y) / 25), 0)"
                                : "none",
                    }}
                >
                    {/* Content for featured slide (purple card) */}
                    {slide.featured && (
                        <div className="absolute inset-0 pt-2 px-3 pb-3 sm:pt-3 sm:px-4 sm:pb-4 flex flex-col">
                            {slide.image && (
                                <div className="mb-2 sm:mb-3 rounded-xl overflow-hidden">
                                    <img
                                        className="w-full h-[170px] sm:h-[200px] md:h-[230px] object-cover"
                                        alt={slide.title}
                                        src={slide.image}
                                        onLoad={imageLoaded}
                                        loading="eager"
                                        decoding="sync"
                                    />
                                </div>
                            )}

                            <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-white text-base sm:text-lg md:text-[22px] leading-tight mb-2 sm:mb-3">
                                {slide.title}
                            </h3>

                            {slide.services && (
                                <div className="flex-1 mb-3 sm:mb-4">
                                    <ul className="[font-family:'Be_Vietnam',Helvetica] font-normal text-white/95 text-xs sm:text-sm leading-relaxed space-y-1 sm:space-y-1.5 text-left">
                                        {slide.services.map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="w-1 h-1 bg-white rounded-full mt-2 sm:mt-2.5 mr-2 sm:mr-3 flex-shrink-0"></span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {slide.button && (
                                <button className="w-full bg-white text-[#bb8bfe] hover:bg-gray-50 font-medium rounded-full py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base transition-all duration-200 hover:scale-[1.02] shadow-md">
                                    {slide.button}
                                </button>
                            )}

                            {/* Logo MOB ULA in corner */}
                            <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-5 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <div className="text-[#bb8bfe] font-bold text-[7px] sm:text-[8px] leading-[0.9] text-center">
                                    MOB<br />ULA
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content for regular slides (dark cards) */}
                    {!slide.featured && (
                        <div className="absolute inset-0">
                            {slide.image && (
                                <>
                                    <img
                                        className="absolute inset-0 w-full h-full object-cover"
                                        alt={slide.title}
                                        src={slide.image}
                                        onLoad={imageLoaded}
                                        loading="eager"
                                        decoding="sync"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                                </>
                            )}

                            <article className="absolute bottom-6 left-6 right-6">
                                <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-white text-lg sm:text-xl leading-tight">
                                    {slide.title}
                                </h3>
                            </article>
                        </div>
                    )}
                </div>
            </li>
        </div>
    );
};

const CarouselControl = ({ type, title, handleClick }) => {
    return (
        <button
            className={cn(
                "w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white hover:bg-gray-50 rounded-full focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200 shadow-lg mx-2",
                type === "previous" ? "rotate-180" : ""
            )}
            title={title}
            onClick={handleClick}
        >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#13243c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
        </button>
    );
};

export function ServicesCarousel({ slides }) {
    const [current, setCurrent] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);

    const getSlideWidth = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return 260;
            if (window.innerWidth < 768) return 304;
            return 348;
        }
        return 260;
    };

    const [slideWidth, setSlideWidth] = useState(getSlideWidth);

    React.useEffect(() => {
        const handleResize = () => setSlideWidth(getSlideWidth());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePreviousClick = () => {
        const previous = current - 1;
        setCurrent(previous < 0 ? slides.length - 1 : previous);
    };

    const handleNextClick = () => {
        const next = current + 1;
        setCurrent(next === slides.length ? 0 : next);
    };

    const handleSlideClick = (index) => {
        if (!isDragging && current !== index) {
            setCurrent(index);
        }
    };

    const handleStart = (clientX) => {
        setIsDragging(false);
        setStartX(clientX);
        setCurrentX(clientX);
    };

    const handleMove = (clientX) => {
        if (startX === 0) return;

        const diffX = Math.abs(startX - clientX);
        if (diffX > 15) {
            setIsDragging(true);
        }

        setCurrentX(clientX);
    };

    const handleEnd = () => {
        if (startX === 0) return;

        const diffX = startX - currentX;
        const threshold = 60;

        if (isDragging && Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                handleNextClick();
            } else {
                handlePreviousClick();
            }
        }

        setTimeout(() => setIsDragging(false), 150);
        setStartX(0);
        setCurrentX(0);
    };

    const onMouseDown = (e) => handleStart(e.clientX);
    const onMouseMove = (e) => handleMove(e.clientX);
    const onMouseUp = () => handleEnd();
    const onMouseLeave = () => handleEnd();

    const onTouchStart = (e) => handleStart(e.touches[0].clientX);
    const onTouchMove = (e) => handleMove(e.touches[0].clientX);
    const onTouchEnd = () => handleEnd();

    const id = useId();

    return (
        <div className="w-full flex flex-col items-center">
            {/* Main carousel container */}
            <div
                className="relative w-full max-w-[320px] sm:max-w-[480px] md:max-w-[600px] lg:max-w-[800px] h-[360px] sm:h-[420px] md:h-[480px] mx-auto overflow-visible cursor-grab active:cursor-grabbing select-none"
                aria-labelledby={`carousel-heading-${id}`}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <ul
                    className="flex transition-transform duration-700 ease-out h-full items-center"
                    style={{
                        transform: `translateX(-${current * slideWidth}px)`,
                        width: 'max-content',
                    }}
                >
                    {slides.map((slide, index) => (
                        <Slide
                            key={index}
                            slide={slide}
                            index={index}
                            current={current}
                            handleSlideClick={handleSlideClick}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}
