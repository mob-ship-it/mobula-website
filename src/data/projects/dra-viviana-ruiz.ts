import type { Project } from './types';
import hero from '../../assets/images/projects/dra_viviana_ruiz/heroviviana.webp';
import sideImage from '../../assets/images/projects/dra_viviana_ruiz/mockup.webp';
import gallery from '../../assets/images/projects/dra_viviana_ruiz/logosdra_viviana.webp';
import arteEng from '../../assets/images/projects/dra_viviana_ruiz/arte_eng.webp';
import tarjeta from '../../assets/images/projects/dra_viviana_ruiz/tarjetapresentacion.webp';
import photo from '../../assets/images/projects/dra_viviana_ruiz/vivianaphoto.webp';

export const draVivianaRuiz: Project = {
  slug: 'dra-viviana-ruiz',
  year: '2026',
  seoTitle: {
    es: 'La base de una marca que inspira confianza - Mobula Estudio',
    en: 'The foundation of a brand that inspires trust - Mobula Estudio',
  },
  card: {
    title: {
      es: 'Dra. Viviana Ruiz',
      en: 'Dr. Viviana Ruiz',
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
      es: 'Dra. Viviana Ruiz - Tarjetas de presentación',
      en: 'Dr. Viviana Ruiz - Business cards',
    },
  },
  intro: {
    variant: 'withImage',
    title: {
      es: 'La base de una marca que inspira confianza',
      en: 'The foundation of a brand that inspires trust',
    },
    paragraphs: {
      es: [
        'Dra. Ruiz nos buscó con el objetivo de posicionarse con una identidad que transmitiera confianza y profesionalismo, sin caer en la frialdad de una clínica más.',
        'El reto era encontrar el balance justo entre cercanía y solidez profesional.',
        'Mobula acompañó este proceso con la definición de la marca y la creación de los primeros activos digitales y físicos, sentando las bases para un posicionamiento sólido y diferenciado en su mercado.',
      ],
      en: [
        'Dr. Ruiz approached us to build an identity that conveyed trust and professionalism, without falling into the coldness of just another clinic.',
        'The challenge was finding the right balance between approachability and professional solidity.',
        'Mobula supported this process with brand definition and the creation of the first digital and physical assets, laying the groundwork for a solid, differentiated position in her market.',
      ],
    },
    industry: {
      es: 'Medicina',
      en: 'Medicine',
    },
    sideImage,
    sideImageAlt: {
      es: 'Dra. Viviana Ruiz - Mockup de marca',
      en: 'Dr. Viviana Ruiz - Brand mockup',
    },
  },
  gallery: [
    {
      type: 'full',
      image: gallery,
      alt: {
        es: 'Dra. Viviana Ruiz - Sistema de identidad visual',
        en: 'Dr. Viviana Ruiz - Visual identity system',
      },
    },
    // Extra mobile gallery frames from Figma (desktop keeps the identity board only).
    {
      type: 'full',
      visibility: 'mobile',
      image: arteEng,
      alt: {
        es: 'Dra. Viviana Ruiz - Arte digital',
        en: 'Dr. Viviana Ruiz - Digital artwork',
      },
    },
    {
      type: 'full',
      visibility: 'mobile',
      image: tarjeta,
      alt: {
        es: 'Dra. Viviana Ruiz - Tarjetas de presentación',
        en: 'Dr. Viviana Ruiz - Business cards',
      },
    },
  ],
  testimonial: {
    // Quote pending from client — section stays hidden until quote is set.
    name: 'Dra. Viviana Ruiz',
    role: {
      es: 'Owner',
      en: 'Owner',
    },
    photo,
  },
};
