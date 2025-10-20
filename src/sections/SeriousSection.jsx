import React from 'react';

export default function SeriousSection() {
  const projects = [
    { id: 1, image: '/images/projects/project-1.jpg', alt: 'Proyecto 1' },
    { id: 2, image: '/images/projects/project-2.jpg', alt: 'Proyecto 2' },
    { id: 3, image: '/images/projects/project-3.jpg', alt: 'Proyecto 3' },
    { id: 4, image: '/images/projects/project-4.jpg', alt: 'Proyecto 4' },
  ];

  return (
    <section className="bg-[#13243c] py-16 md:py-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-6">
          Lo decimos<br />en serio:
        </h2>

        {/* Description */}
        <p className="[font-family:'Be_Vietnam',Helvetica] font-normal text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          Cada proyecto que ves acá fue creado con estrategia y objetivos bien definidos.
        </p>

        {/* CTA Button */}
        <a 
          href="#planes"
          className="inline-block [font-family:'Be_Vietnam',Helvetica] font-semibold text-[#13243c] bg-white text-base md:text-lg rounded-full px-12 py-3 hover:bg-gray-100 transition-all duration-300 mb-12 md:mb-16"
        >
          Ver Planes
        </a>
      </div>

      {/* Horizontal Scrolling Carousel - Row 1 (Left to Right) */}
      <div className="relative w-full mb-4 overflow-hidden">
        <div className="flex animate-scroll-left">
          {[...projects, ...projects, ...projects].map((project, index) => (
            <div 
              key={`row1-${index}`}
              className="flex-shrink-0 w-[280px] md:w-[320px] mx-2"
            >
              <div className="rounded-2xl overflow-hidden bg-white">
                <img 
                  src={project.image} 
                  alt={project.alt}
                  className="w-full h-[200px] md:h-[240px] object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll-right">
          {[...projects, ...projects, ...projects].map((project, index) => (
            <div 
              key={`row2-${index}`}
              className="flex-shrink-0 w-[280px] md:w-[320px] mx-2"
            >
              <div className="rounded-2xl overflow-hidden bg-white">
                <img 
                  src={project.image} 
                  alt={project.alt}
                  className="w-full h-[200px] md:h-[240px] object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
