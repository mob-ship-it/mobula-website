import React from 'react';
import { EmblaCarousel } from './EmblaCarousel';

export default function ProjectsCarousel({ projects }) {
  return (
    <EmblaCarousel
      options={{ align: 'start', containScroll: 'trimSnaps', loop: false }}
      showDots={true}
      showArrows={false}
      className="mt-2"
      slideClassName="px-3 basis-[88%] sm:basis-[70%] md:basis-[56%] lg:basis-[40%] xl:basis-[36%]"
      slideStyle={{}}
    >
      {projects.map((p) => (
        <a 
          key={p.id} 
          href={p.href || '#'} 
          className="block cursor-pointer group"
        >
          <div className="rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
            <img
              src={p.image?.src || p.image}
              alt={p.title}
              width="640"
              height="360"
              className="w-full h-[200px] sm:h-[220px] object-cover select-none rounded-2xl"
              style={{ objectPosition: 'center center' }}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="mt-3">
            <h4 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#13243c] text-sm sm:text-base uppercase group-hover:text-[#211ee1] transition-colors">
              {p.title}
            </h4>
            {p.subtitle && (
              <p className="[font-family:'Be_Vietnam',Helvetica] text-[#13243c]/70 text-sm mt-1">
                {p.subtitle}
              </p>
            )}
          </div>
        </a>
      ))}
    </EmblaCarousel>
  );
}
