import { certifications } from '../content/certifications.ts';
import { pages, sections, type PageKey, type SectionKey } from '../content/site.ts';

/** Sections whose `display: 'auto'` depends on having content. */
const hasContent: Partial<Record<SectionKey, () => boolean>> = {
  certifications: () => certifications.length > 0,
};

/** Whether a section should render at all. */
export function isVisible(key: SectionKey): boolean {
  const display = sections[key].display;
  if (display === 'auto') return hasContent[key]?.() ?? true;
  return display;
}

/** The sections a page shows, minus any that are hidden. */
export function sectionsOf(key: PageKey): SectionKey[] {
  return pages[key].sections.filter(isVisible);
}

/** Page keys in top-bar order, skipping any page left with no content. */
export function visiblePages(): PageKey[] {
  const keys = Object.keys(pages) as PageKey[];
  return keys.filter((key) => key === 'home' || sectionsOf(key).length > 0);
}

export interface NavItem {
  key: PageKey;
  slug: string;
  label: string;
}

/** Links for the top bar. */
export function navItems(): NavItem[] {
  return visiblePages().map((key) => ({ key, slug: pages[key].slug, label: pages[key].nav }));
}

/** The page a slug points at, falling back to home for anything unknown. */
export function pageForSlug(slug: string): PageKey {
  const match = (Object.keys(pages) as PageKey[]).find((key) => pages[key].slug === slug);
  return match && visiblePages().includes(match) ? match : 'home';
}

/** Which page a section lives on, for cross-page links like project anchors. */
export function pageOfSection(section: SectionKey): PageKey {
  const match = (Object.keys(pages) as PageKey[]).find((key) =>
    (pages[key].sections as readonly SectionKey[]).includes(section),
  );
  return match ?? 'home';
}

/** The slug to link to when you want to reach a given section. */
export function slugOfSection(section: SectionKey): string {
  return pages[pageOfSection(section)].slug;
}
