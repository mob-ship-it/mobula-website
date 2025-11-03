import React from 'react';
import { EmblaCarousel } from './EmblaCarousel';

export default function TeamCarousel({ members }) {
  return (
    <EmblaCarousel
      options={{
        align: 'start',
        containScroll: 'trimSnaps',
        slidesToScroll: 1,
      }}
      showDots={true}
      showArrows={false}
      slideStyle={{
        flex: '0 0 auto',
        width: '280px'
      }}
      className="lg:hidden"
    >
      {members.map((member) => (
        <div key={member.id} className="px-2">
          <div className="relative rounded-3xl overflow-hidden h-[380px]">
            <div className="h-[280px] overflow-hidden rounded-3xl">
              <img
                src={member.image.src}
                alt={member.name}
                width="280"
                height="280"
                className="w-full h-full object-cover select-none"
                loading="lazy"
                decoding="async"
              />
            </div>
            
            <div className="pt-4">
              <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#13243c] text-lg md:text-xl leading-tight mb-1">
                {member.name}
              </h3>
              <p className="[font-family:'Be_Vietnam',Helvetica] text-sm text-[#13243c]/70 leading-snug">
                {member.role}
              </p>
            </div>
          </div>
        </div>
      ))}
    </EmblaCarousel>
  );
}
