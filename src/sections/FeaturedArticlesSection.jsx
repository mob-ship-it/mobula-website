import React from 'react';
import EmblaCarousel from '../components/EmblaCarousel';

export default function FeaturedArticlesSection() {

  const articles = [
    {
      id: 1,
      title: "Por qué en Mobula ofrecemos más que Marketing Digital",
      image: "/images/projects/project-1.jpg"
    },
    {
      id: 2,
      title: "Por qué temerle a la inteligencia artificial",
      image: "/images/projects/project-2.jpg"
    },
    {
      id: 3,
      title: "Cómo crear contenido que conecte con tu audiencia",
      image: "/images/projects/project-3.jpg"
    },
    {
      id: 4,
      title: "El futuro del diseño web responsivo",
      image: "/images/projects/project-4.jpg"
    }
  ];

  return (
    <section className="bg-[#faf1ea] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-3xl md:text-4xl lg:text-5xl text-[#13243c] mb-12">
          Artículos destacados
        </h2>

        {/* Carousel usando componente reutilizable */}
        <EmblaCarousel
          options={{
            align: 'center',
            containScroll: 'trimSnaps',
          }}
          showDots={true}
          showArrows={false}
          slideStyle={{
            flex: '0 0 calc(100% - 48px)',
            maxWidth: '800px'
          }}
        >
          {articles.map((article) => (
            <div key={article.id} className="px-2">
              {/* Card */}
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl h-[380px] md:h-[420px] lg:h-[460px] transition-shadow duration-300 hover:shadow-2xl">
                {/* Image */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover select-none"
                  draggable="false"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Title at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="[font-family:'Be_Vietnam',Helvetica] font-semibold text-white text-lg md:text-xl lg:text-2xl leading-tight">
                    {article.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </EmblaCarousel>
      </div>
    </section>
  );
}
