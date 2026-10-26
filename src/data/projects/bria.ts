import type { Project } from './types';
import hero from '../../assets/images/projects/bria/bria_hero.png';
import sideIntro from '../../assets/images/projects/bria/bria_movil.png';
import sideVan from '../../assets/images/projects/bria/side.png';
import backVan from '../../assets/images/projects/bria/back.png';
import restaurant1 from '../../assets/images/projects/bria/restaurant1.jpg';
import restaurant2 from '../../assets/images/projects/bria/resturant2.jpg';

export const bria: Project = {
  slug: 'bria',
  year: '2026',
  seoTitle: {
    es: 'Diseñamos una valla móvil para la masa madre que está conquistando Turrialba - Mobula Estudio',
    en: 'We designed a mobile billboard for the sourdough conquering Turrialba - Mobula Estudio',
  },
  card: {
    title: {
      es: 'Bría',
      en: 'Bría',
    },
    category: {
      es: 'Branding',
      en: 'Branding',
    },
    image: hero,
  },
  hero: {
    desktop: hero,
    mobile: hero,
    alt: {
      es: 'Bría - Rotulación de van repartidora',
      en: 'Bría - Delivery van vehicle branding',
    },
  },
  intro: {
    variant: 'withImage',
    title: {
      es: 'Diseñamos una valla móvil para la masa madre que está conquistando Turrialba.',
      en: 'We designed a mobile billboard for the sourdough conquering Turrialba.',
    },
    paragraphs: {
      es: [
        'Bría nos buscó con un objetivo claro: diseñar la rotulación de su nueva van repartidora.',
        'Necesitaban que el vehículo reflejara su esencia como finca, panadería de masa madre y experiencia gastronómica.',
        'El reto era lograr un diseño sobrio, elegante y llamativo que se reconociera al instante en las calles.',
        'Mobula desarrolló una identidad vehicular que evolucionó desde los elementos tradicionales de panadería hasta darle el protagonismo absoluto a su producto estrella.',
      ],
      en: [
        'Bría came to us with a clear goal: design the wrap for their new delivery van.',
        'They needed the vehicle to reflect their essence as a farm, sourdough bakery, and gastronomic experience.',
        'The challenge was a sober, elegant, and striking design that would be recognized instantly on the street.',
        'Mobula developed a vehicle identity that evolved from traditional bakery cues to putting their star product front and center.',
      ],
    },
    industry: {
      es: 'Alimentos y Bebidas Panadería Artesanal',
      en: 'Food & Beverage Artisan Bakery',
    },
    sideImage: sideIntro,
    sideImageAlt: {
      es: 'Bría - Mockup y línea de rotulación de la van',
      en: 'Bría - Van wrap mockup and line art',
    },
  },
  galleryBeforeGoals: [
    {
      type: 'full',
      image: sideVan,
      alt: {
        es: 'Bría - Lateral de la van con identidad de marca',
        en: 'Bría - Van side with brand identity',
      },
    },
  ],
  goals: {
    title: {
      es: 'Branding Vehicular y Diseño de Flotilla',
      en: 'Vehicle Branding and Fleet Design',
    },
    items: {
      es: [
        '<strong>Posicionamiento:</strong> Proyectamos a Bría (finca y panadería) transmitiendo calidad y arraigo local.',
        '<strong>Evolución del diseño:</strong> Cambiamos los croissants iniciales por una gran hogaza de masa madre, destacando su principal diferenciador.',
        '<strong>Conversión:</strong> Optimizamos la parte trasera maximizando el logo e integrando QR, redes y su frase: “Menos prisa... más masa madre”.',
      ],
      en: [
        '<strong>Positioning:</strong> We projected Bría (farm and bakery) conveying quality and local roots.',
        '<strong>Design evolution:</strong> We replaced the initial croissants with a large sourdough loaf, highlighting their main differentiator.',
        '<strong>Conversion:</strong> We optimized the rear, maximizing the logo and integrating QR, social links, and their line: “Less hurry... more sourdough.”',
      ],
    },
    image: backVan,
    imageAlt: {
      es: 'Bría - Trasera de la van Menos prisa más masa madre',
      en: 'Bría - Van rear Less hurry more sourdough',
    },
  },
  gallery: [
    {
      type: 'split',
      images: [restaurant1, restaurant2],
      alt: [
        {
          es: 'Bría - Espacio gastronómico interior',
          en: 'Bría - Indoor dining space',
        },
        {
          es: 'Bría - Finca y entorno natural en Turrialba',
          en: 'Bría - Farm and natural setting in Turrialba',
        },
      ],
    },
  ],
  closing: {
    lines: {
      es: [
        'De un simple vehículo de reparto a un ícono de las calles de Turrialba.',
        'Bría. Menos prisa... más masa madre.',
      ],
      en: [
        'From a simple delivery vehicle to an icon on the streets of Turrialba.',
        'Bría. Less hurry... more sourdough.',
      ],
    },
  },
};
