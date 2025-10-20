import React from 'react';
import EmblaCarousel from '../components/EmblaCarousel';

export default function TeamSection() {
  const teamMembers = [
    {
      id: 1,
      name: "Ariela Dengo",
      role: "Founder - Strategy Manager & Content Lead",
      image: "/images/team/ariela-dengo.jpg"
    },
    {
      id: 2,
      name: "Pamela H",
      role: "PM - Paid Media Strategist",
      image: "/images/team/pamela-h.jpg"
    },
    {
      id: 3,
      name: "Juan Pérez",
      role: "Creative Director & Designer",
      image: "/images/team/pamela-h.jpg"
    },
    {
      id: 4,
      name: "María García",
      role: "Senior Developer & Tech Lead",
      image: "/images/team/pamela-h.jpg"
    }
  ];

  return (
    <section className="bg-[#faf1ea] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título y descripción */}
        <div className="mb-8 md:mb-12">
          <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-3xl md:text-4xl lg:text-5xl text-[#13243c] mb-4">
            ¡Trabajá con nuestro equipo de expertos!
          </h2>
          <p className="[font-family:'Be_Vietnam',Helvetica] text-base md:text-lg text-[#13243c] max-w-3xl leading-relaxed">
            Diseñadores, Creativos, Project Managers y expertos en Paid Media te ayudarán a concretar tus proyectos.
          </p>
        </div>

        <EmblaCarousel
          options={{
            align: 'start',
            containScroll: 'trimSnaps',
            slidesToScroll: 1,
          }}
          showDots={true}
          showArrows={false}
          slideStyle={{
            flex: '0 0 100%',
            maxWidth: '280px'
          }}
        >
          {teamMembers.map((member) => (
            <div key={member.id} className="px-2">
              {/* Card */}
              <div className="relative rounded-3xl overflow-hidden h-[380px]">
                {/* Image */}
                <div className="h-[280px] overflow-hidden rounded-3xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover select-none"
                    draggable="false"
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
      </div>
    </section>
  );
}
