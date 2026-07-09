import type { ImageMetadata } from 'astro';
import ecpImage from '../../assets/images/projects/legal-law-office/ECP.png';
import lineaLawImage from '../../assets/images/projects/legal-law-office/line-law.png';
import kaseCabImage from '../../assets/images/projects/KaseCap/KaseCab-image-carousel.png';
import stanzza from '../../assets/images/projects/Stanzza/Stanzza-carousel-image.png';
import { projects } from './index';

export type FeaturedSource = {
  id: string;
  /** Path without locale prefix, e.g. /LegalLawOffice or /proyectos/slug */
  path: string;
  title: string;
  subtitle: string;
  image: ImageMetadata;
};

/** Legacy static case pages + registered template projects. */
const legacyFeatured: FeaturedSource[] = [
  {
    id: 'linea',
    path: '/LegalLawOffice',
    title: 'Linea Law',
    subtitle: 'Social Media',
    image: lineaLawImage,
  },
  {
    id: 'ecp',
    path: '/ECPConsultingGroup',
    title: 'ECP Consulting Group',
    subtitle: 'Branding',
    image: ecpImage,
  },
  {
    id: 'kasecab',
    path: '/KaseCab',
    title: 'KaseCab Americas',
    subtitle: 'Branding',
    image: kaseCabImage,
  },
  {
    id: 'stanzza',
    path: '/Stanzza',
    title: 'Stanzza Senior Living',
    subtitle: 'Performance',
    image: stanzza,
  },
];

/**
 * Featured cards for a case page, excluding the current project.
 * `lang` picks the path prefix for template projects (/proyectos vs /en/projects).
 */
export function getFeaturedForProject(
  excludeSlug: string,
  lang: 'es' | 'en',
  limit = 3
): FeaturedSource[] {
  const fromRegistry: FeaturedSource[] = projects
    .filter((p) => p.slug !== excludeSlug)
    .map((p) => ({
      id: p.slug,
      path: lang === 'en' ? `/projects/${p.slug}` : `/proyectos/${p.slug}`,
      title: p.card.title[lang],
      subtitle: p.card.category[lang],
      image: p.card.image,
    }));

  const combined = [
    ...fromRegistry,
    ...legacyFeatured.filter((p) => p.id !== excludeSlug),
  ];

  return combined.slice(0, limit);
}
