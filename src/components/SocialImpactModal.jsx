import React from 'react';
import blueMobula from '../assets/images/services/blue-mobula.png';

export const SocialImpactModal = ({ isOpen, onClose, lang = 'es' }) => {
  if (!isOpen) return null;

  const content = {
    es: {
      title: 'Plan de Impacto Social',
      subtitle: 'Cada año elegimos un emprendimiento local para apoyarlo en su crecimiento, totalmente gratis.',
      requirementsTitle: 'Qué se necesita para participar:',
      requirement1: 'Tener un negocio en funcionameinto',
      requirement2: 'Ganas de crecer',
      footerText: 'El proyecto con mayor potencial será seleccionado. ¡Estate atent@ a nuestras redes sociales!'
    },
    en: {
      title: 'Social Impact Plan',
      subtitle: 'Each year we choose a local business to support in its growth, completely free.',
      requirementsTitle: 'What you need to participate:',
      requirement1: 'Have a running business',
      requirement2: 'Desire to grow',
      footerText: 'The project with the greatest potential will be selected. Stay tuned to our social networks!'
    }
  };

  const t = content[lang] || content.es;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="relative w-full max-w-[580px] md:aspect-square bg-[#13243CE5] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagen de fondo de la mantaraya */}
        <img
            src={blueMobula.src}
            alt="Mobula"
            className="absolute left-1/2 -translate-x-1/2 bottom-[-32px] md:left-4 md:translate-x-0 md:bottom-[-38px] w-40 h-40 md:w-56 md:h-56 object-contain pointer-events-none"
        />

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors z-10"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Contenido principal */}
        <div className="relative px-5 md:px-8 pt-8 md:pt-10 pb-4 flex-1 flex flex-col justify-center overflow-y-auto">
          {/* Título principal */}
          <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-2xl md:text-4xl text-white mb-2 md:mb-3 leading-tight text-center md:text-left">
            {t.title}
          </h2>

          {/* Descripción */}
          <p className="[font-family:'Be_Vietnam',Helvetica] text-sm md:text-base text-white/90 leading-relaxed mb-4 md:mb-5 text-center md:text-left">
            {t.subtitle}
          </p>

          {/* Requisitos */}
          <div className="mb-0 w-full">
            <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-base md:text-xl text-white mb-2 md:mb-3 text-center md:text-left">
              {t.requirementsTitle}
            </h3>
            
            {/* Caja de requisitos */}
            <div className="border-[2px] md:border-[3px] border-solid border-white rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 bg-transparent">
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-start gap-2 md:gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-[#4ade80] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p className="[font-family:'Be_Vietnam',Helvetica] text-sm md:text-lg text-white leading-relaxed flex-1">
                    {t.requirement1}
                  </p>
                </div>

                <div className="flex items-start gap-2 md:gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-[#4ade80] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p className="[font-family:'Be_Vietnam',Helvetica] text-sm md:text-lg text-white leading-relaxed flex-1">
                    {t.requirement2}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección inferior con texto */}
        <div className="relative mt-2 md:mt-4 px-5 md:px-8 pb-3 md:pb-4">
          {/* Layout mobile: texto arriba */}
          <div className="md:hidden">
            <p className="[font-family:'Be_Vietnam',Helvetica] text-xs text-white/95 leading-relaxed pb-24 text-center">
              {t.footerText}
            </p>
          </div>
          
          {/* Layout desktop: imagen a la izquierda, texto a la derecha */}
          <div className="hidden md:flex items-end">
            {/* Espaciador para la imagen */}
            <div className="w-56 flex-shrink-0"></div>
            
            {/* Texto */}
            <p className="[font-family:'Be_Vietnam',Helvetica] text-base text-white/95 leading-relaxed pl-5 pr-8 pb-4">
              {t.footerText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
