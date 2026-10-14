import { sections, type SectionKey } from '../content/site.ts';
import { currentSlug, navigate, scrollToId, scrollToTop } from './router.ts';
import { slugOfSection } from './sections.ts';

/**
 * In-page anchors now have to cross pages: a "#project-arcus" link can be
 * clicked from a section that lives on a different page. This resolves which
 * page owns an anchor and gets the visitor there either way.
 */

/** The section key that owns an element id, if any. */
function ownerOf(id: string): SectionKey | null {
  if (id.startsWith('project-')) return 'projects';
  const keys = Object.keys(sections) as SectionKey[];
  return keys.find((key) => sections[key].id === id) ?? null;
}

/** Follows an anchor like "#project-arcus", "#contact" or "#top". */
export function goToAnchor(hash: string): void {
  const id = hash.replace(/^#/, '');

  if (!id || id === 'top') {
    scrollToTop();
    return;
  }

  const owner = ownerOf(id);
  if (!owner) {
    scrollToId(id);
    return;
  }

  const slug = slugOfSection(owner);
  if (slug === currentSlug()) scrollToId(id);
  else navigate(slug, id);
}
