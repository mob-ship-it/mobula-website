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
        width: 'calc(85% - 16px)',
        maxWidth: '360px'
      }}
      className="w-full"
    >
      {members.map((member) => (
        <div key={member.id} className="px-2">
          <div className="lg:hidden">
            <div className="relative overflow-hidden rounded-[16px]">
              <div className="h-[420px] md:h-[380px] overflow-hidden relative rounded-[16px]">
                <img
                  src={member.image.src}
                  alt={member.name}
                  width="280"
                  height="280"
                  className="w-full h-full object-cover object-top select-none"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="pt-4 px-4">
                <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] font-medium text-[#13243c] text-[22px] md:text-[24px] leading-tight mb-1">
                  {member.name}
                </h3>
                <p className="[font-family:'Be_Vietnam',Helvetica] text-sm text-[#13243c]/80 leading-snug">
                  {member.role}
                </p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative overflow-hidden h-[380px] lg:h-[520px] rounded-[16px]">
              <div className="h-[280px] lg:h-[520px] overflow-hidden relative rounded-[16px]">
                <img
                  src={member.image.src}
                  alt={member.name}
                  width="280"
                  height="280"
                  className="w-full h-full object-cover object-top select-none"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 text-white bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                  <h3
                    className="[font-family:'Bricolage_Grotesque',Helvetica] font-medium text-white whitespace-normal break-words mb-0"
                    style={{
                      color: '#FFF',
                      fontFamily: 'Bricolage Grotesque, Bricolage_Grotesque, Helvetica',
                      fontWeight: 500,
                      lineHeight: '1'
                    }}
                  >
                    <span className="text-[24px] md:text-[36px] lg:text-[50.252px] block leading-[1] max-w-[85%]">{member.name}</span>
                  </h3>
                  <p className="[font-family:'Be_Vietnam',Helvetica] text-[14px] md:text-[16px] lg:text-[20px] text-white/90 leading-snug mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </EmblaCarousel>
  );
}
