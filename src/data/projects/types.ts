import type { ImageMetadata } from 'astro';

/** Copy that exists in both site languages. */
export type LocalizedString = {
  es: string;
  en: string;
};

export type LocalizedStringList = {
  es: string[];
  en: string[];
};

export type GalleryAspect = 'landscape' | 'portrait' | 'square';

/** Where a gallery row should render. Default: all breakpoints. */
export type GalleryVisibility = 'all' | 'mobile' | 'desktop';

/** Full-width single asset row. */
export type GalleryFullRow = {
  type: 'full';
  image: ImageMetadata;
  alt?: LocalizedString;
  visibility?: GalleryVisibility;
};

/** Two-column row (equal width by default). */
export type GallerySplitRow = {
  type: 'split';
  images: [ImageMetadata, ImageMetadata];
  alt?: [LocalizedString?, LocalizedString?];
  aspect?: GalleryAspect;
  visibility?: GalleryVisibility;
};

/**
 * Escape hatch for one-off compositions from design.
 * Prefer adding a named layout here over inventing markup in the page.
 */
export type GalleryCustomRow = {
  type: 'custom';
  /** Named layout key handled by GalleryCustom.astro */
  layout: string;
  images: ImageMetadata[];
  alt?: LocalizedString[];
  visibility?: GalleryVisibility;
};

export type GalleryRow = GalleryFullRow | GallerySplitRow | GalleryCustomRow;

export type ProjectIntroWithImage = {
  variant: 'withImage';
  title: LocalizedString;
  paragraphs: LocalizedStringList;
  industry: LocalizedString;
  sideImage: ImageMetadata;
  sideImageAlt?: LocalizedString;
  /**
   * CSS object-position for the cropped side frame (Figma often shows a zoomed crop).
   * Default: "center". APAI uses "left center".
   */
  sideImagePosition?: string;
};

export type ProjectIntroWithResults = {
  variant: 'withResults';
  title: LocalizedString;
  paragraphs: LocalizedStringList;
  industry: LocalizedString;
  results: LocalizedStringList;
};

export type ProjectIntro = ProjectIntroWithImage | ProjectIntroWithResults;

export type ProjectTestimonial = {
  /** Omit or leave empty until the client provides the quote. */
  quote?: LocalizedString;
  name: string;
  role: LocalizedString;
  photo: ImageMetadata;
};

export type ProjectCard = {
  title: LocalizedString;
  category: LocalizedString;
  image: ImageMetadata;
};

/** Goals / "Meta" block — optional side image (Figma: image + bullet list). */
export type ProjectGoals = {
  title: LocalizedString;
  items: LocalizedStringList;
  image?: ImageMetadata;
  imageAlt?: LocalizedString;
};

/** Platform section with bullets + optional side image + embedded video below. */
export type ProjectVideoSection = {
  title: LocalizedString;
  items: LocalizedStringList;
  /** Full YouTube watch or embed URL — rendered full-width under the text/image row */
  youtubeUrl: string;
  /** Optional art shown beside the copy (Figma: logo card next to YouTube bullets) */
  sideImage?: ImageMetadata;
  sideImageAlt?: LocalizedString;
};

export type ProjectClosing = {
  lines: LocalizedStringList;
};

/**
 * Full case-study definition for the reusable project page template.
 * Put bilingual copy here; keep UI chrome labels in src/i18n/ui.ts.
 * Image files live under src/assets/images/projects/ — import and reference them here.
 */
export type Project = {
  /** URL segment, e.g. "nuevo-cliente" → /proyectos/nuevo-cliente and /en/projects/nuevo-cliente */
  slug: string;
  siteUrl?: string;
  year: string;
  seoTitle: LocalizedString;
  card: ProjectCard;
  hero: {
    desktop: ImageMetadata;
    mobile: ImageMetadata;
    alt: LocalizedString;
  };
  intro: ProjectIntro;
  /**
   * Optional mid-page gallery (e.g. full-width mockup before goals).
   * Main/bottom gallery stays in `gallery`.
   */
  galleryBeforeGoals?: GalleryRow[];
  goals?: ProjectGoals;
  gallery: GalleryRow[];
  videoSection?: ProjectVideoSection;
  closing?: ProjectClosing;
  testimonial?: ProjectTestimonial;
};
