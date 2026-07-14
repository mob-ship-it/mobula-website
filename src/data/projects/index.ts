import type { Project } from './types';
import { draVivianaRuiz } from './dra-viviana-ruiz';

/**
 * Registry of projects that use the reusable case-study template.
 * Legacy pages (KaseCab, LegalLawOffice, etc.) stay as static .astro files
 * until migrated. Add new projects here.
 */
export const projects: Project[] = [draVivianaRuiz];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export type { Project } from './types';
