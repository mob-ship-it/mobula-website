import React from 'react';
import { EmblaCarousel } from './EmblaCarousel';

export default function ArticlesCarousel({ articles }) {
  return (
    <EmblaCarousel
      options={{
        align: 'center',
        containScroll: 'trimSnaps',
      }}
      showDots={true}
      showArrows={false}
      slideStyle={{
        flex: '0 0 auto',
        width: 'calc(100% - 48px)',
        maxWidth: '800px'
      }}
    >
      {articles.map((article) => (
        <div key={article.id} className="px-2">
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl h-[380px] md:h-[420px] lg:h-[460px] transition-shadow duration-300 hover:shadow-2xl">
            <img
              src={article.image.src}
              alt={article.title}
              width="800"
              height="460"
              className="w-full h-full object-cover select-none"
              loading="lazy"
              decoding="async"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h3 className="[font-family:'Be_Vietnam',Helvetica] font-semibold text-white text-lg md:text-xl lg:text-2xl leading-tight">
                {article.title}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </EmblaCarousel>
  );
}
