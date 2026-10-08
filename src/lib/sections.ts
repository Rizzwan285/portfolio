import { certifications } from '../content/certifications.ts';
import { sections, type SectionKey } from '../content/site.ts';

/** Sections whose `display: 'auto'` depends on having content. */
const hasContent: Partial<Record<SectionKey, () => boolean>> = {
  certifications: () => certifications.length > 0,
};

/** Section keys that should render, in page order. */
export function visibleSections(): SectionKey[] {
  return (Object.keys(sections) as SectionKey[]).filter((key) => {
    const display = sections[key].display;
    if (display === 'auto') return hasContent[key]?.() ?? true;
    return display;
  });
}

export interface NavItem {
  id: string;
  label: string;
}

/** Navigation links for the visible sections that have a `nav` label. */
export function navItems(): NavItem[] {
  return visibleSections().flatMap((key) => {
    const config: { id: string; nav?: string } = sections[key];
    return config.nav ? [{ id: config.id, label: config.nav }] : [];
  });
}
