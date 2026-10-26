import type { Project } from './types';
import hero from '../../assets/images/projects/tabstr/tabstr_hero.png';
import sideImage from '../../assets/images/projects/tabstr/pos_dispositivos.png';
import phonesLandscape from '../../assets/images/projects/tabstr/pos_dispositivos_iphone.webp';
import cdrom from '../../assets/images/projects/tabstr/pos_vs_cdrom.webp';
import not1995 from '../../assets/images/projects/tabstr/not_1995.webp';
import tabstrPresente from '../../assets/images/projects/tabstr/tabstr_presente.webp';

export const tabstr: Project = {
  slug: 'tabstr',
  year: '2026',
  seoTitle: {
    es: 'Construimos el lanzamiento de una marca que se ríe de los POS del pasado - Mobula Estudio',
    en: 'We built the launch of a brand that laughs at POS systems of the past - Mobula Estudio',
  },
  card: {
    title: {
      es: 'Tabstr',
      en: 'Tabstr',
    },
    category: {
      es: 'Performance',
      en: 'Performance',
    },
    image: hero,
  },
  hero: {
    desktop: hero,
    mobile: hero,
    alt: {
      es: 'Tabstr - Campaña POS multidispositivo',
      en: 'Tabstr - Multi-device POS campaign',
    },
  },
  intro: {
    variant: 'withImage',
    title: {
      es: 'Construimos el lanzamiento de una marca que se ríe de los POS del pasado.',
      en: 'We built the launch of a brand that laughs at POS systems of the past.',
    },
    paragraphs: {
      es: [
        'Tabstr es un sistema de punto de venta moderno que se diferencia de los tradicionales: no cobra por dispositivo ni exige hardware específico.',
        'Mobula desarrolló una campaña para Meta y YouTube bajo el concepto “Te aterrizamos en 2026”, posicionando a Tabstr como la alternativa clara, ágil y sin cobros ocultos.',
      ],
      en: [
        'Tabstr is a modern point-of-sale system that stands apart from traditional ones: it does not charge per device or require specific hardware.',
        'Mobula developed a Meta and YouTube campaign under the concept “We land you in 2026,” positioning Tabstr as the clear, agile alternative with no hidden fees.',
      ],
    },
    industry: {
      es: 'Tecnología Punto de Venta (POS)',
      en: 'Point of Sale (POS) Technology',
    },
    sideImage,
    sideImageAlt: {
      es: 'Tabstr - Un solo POS para todos tus dispositivos',
      en: 'Tabstr - One POS for all your devices',
    },
  },
  galleryBeforeGoals: [
    {
      type: 'full',
      image: phonesLandscape,
      alt: {
        es: 'Tabstr - Funciona en cualquier dispositivo',
        en: 'Tabstr - Works on any device',
      },
    },
  ],
  goals: {
    title: {
      es: 'Meta',
      en: 'Goal',
    },
    items: {
      es: [
        'Posicionamos a Tabstr como la alternativa moderna que elimina la complejidad y los cobros ocultos de la industria.',
        'Usamos la nostalgia y el humor visual para cuestionar el uso de software de punto de venta obsoleto en negocios actuales.',
        'Construimos identidad de marca bajo un tono directo y disruptivo: “Te aterrizamos en el presente”.',
      ],
      en: [
        'We positioned Tabstr as the modern alternative that removes complexity and hidden fees from the industry.',
        'We used nostalgia and visual humor to challenge obsolete point-of-sale software still used in today’s businesses.',
        'We built brand identity with a direct, disruptive tone: “We land you in the present.”',
      ],
    },
    image: not1995,
    imageAlt: {
      es: 'Tabstr - Ya no estamos en 1995',
      en: 'Tabstr - We are no longer in 1995',
    },
  },
  gallery: [
    {
      type: 'split',
      images: [sideImage, cdrom],
      alt: [
        {
          es: 'Tabstr - Un solo POS sin cobros extra',
          en: 'Tabstr - One POS with no extra fees',
        },
        {
          es: 'Tabstr - ¿Tu POS parece que se instala desde un CD-ROM?',
          en: 'Tabstr - Does your POS look like it installs from a CD-ROM?',
        },
      ],
    },
  ],
  videoSection: {
    title: {
      es: 'Youtube',
      en: 'YouTube',
    },
    items: {
      es: [
        'Explicamos la propuesta de valor de Tabstr a través de un video de Motion Graphics con Voice Over optimizado para el formato de YouTube.',
        'Marcamos un contraste directo con la competencia al destacar el modelo multidispositivo sin costos ocultos por licencias.',
        'Fortalecemos el valor de marca traduciendo características técnicas en beneficios claros y entendibles para los dueños de negocios.',
      ],
      en: [
        'We explained Tabstr’s value proposition through a Motion Graphics video with voice-over, optimized for YouTube.',
        'We drew a direct contrast with competitors by highlighting the multi-device model with no hidden licensing costs.',
        'We strengthened brand value by translating technical features into clear benefits for business owners.',
      ],
    },
    youtubeUrl: 'https://www.youtube.com/watch?v=-Fue5Llh9jE',
    sideImage: tabstrPresente,
    sideImageAlt: {
      es: 'Tabstr - Te aterrizamos en el presente',
      en: 'Tabstr - We land you in the present',
    },
  },
  closing: {
    lines: {
      es: [
        'Del punto de venta aburrido al POS que se atreve a hablar claro.',
        'Tabstr. Te aterrizamos en 2026.',
      ],
      en: [
        'From the boring point of sale to the POS that dares to speak clearly.',
        'Tabstr. We land you in 2026.',
      ],
    },
  },
};
