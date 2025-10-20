import React from "react";
import { ServicesCarousel } from "../components/ServicesCarousel";

export const ServicesSection = () => {
  const services = [
    {
      title: "Marketing & Estrategia",
      image: "/images/services/marketin-y-estrategia.jpg",
      color: "#13243c"
    },
    {
      title: "Animación & Producción Audiovisual",
      image: "https://c.animaapp.com/ZTuOwSBY/img/rectangle-53@2x.png",
      color: "#bb8bfe",
      featured: true,
      services: [
        "Motion Graphics",
        "Animación 2D / 3D", 
        "Producción de Video (filmación y edición)",
        "Fotografía Profesional"
      ],
      button: "Comenzá Ahora"
    },
    {
      title: "Concepto & Contenido", 
      image: "/images/services/concepto-contenido.jpg",
      color: "#13243c"
    },
    {
      title: "Diseño & Branding",
      image: "/images/services/disenio-branding.png", 
      color: "#13243c"
    },
    {
      title: "Web & Experiencia",
      image: "/images/services/web-y-experiencia.jpg",
      color: "#13243c"
    }
  ];

  return (
    <div className="w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        {/* Unified container for title and carousel */}
        <div className="flex flex-col items-center justify-center w-full">
          {/* Section Title */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
            <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              Todo, en un solo
              <br />
              plan mensual
            </h2>
          </div>

          {/* Advanced Carousel - Centered and aligned with title */}
          <div className="w-full overflow-visible flex justify-center">
            <ServicesCarousel slides={services} />
          </div>
        </div>
      </div>
    </div>
  );
};
