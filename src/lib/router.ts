import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion.ts';

/**
 * A very small history-API router. The site is a handful of pages, so this
 * is all it needs: read the slug out of the URL, push a new one, and tell
 * React when it changed.
 *
 * Deep links work on static hosts because the build writes a 404.html copy
 * of index.html (see vite.config.ts), which GitHub Pages serves for any
 * unknown path.
 */

/** Base path the site is served from, with no trailing slash ('' at the root). */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

const ROUTE_EVENT = 'portfolio:route';

/** Turns a pathname into a page slug: '/portfolio/work' becomes 'work'. */
export function slugFromPath(pathname: string): string {
  let rest = pathname;
  if (BASE && rest.startsWith(BASE)) rest = rest.slice(BASE.length);
  return rest.replace(/^\/+|\/+$/g, '');
}

/** The href for a page slug, ready for an `<a>`. */
export function hrefFor(slug: string): string {
  return slug ? `${BASE}/${slug}` : `${BASE}/`;
}

/** The slug in the address bar right now. */
export function currentSlug(): string {
  return slugFromPath(window.location.pathname);
}

/**
 * Moves to a page. `hash` optionally names an element to scroll to once the
 * page has rendered; without it the new page starts at the top.
 */
export function navigate(slug: string, hash?: string): void {
  const url = hrefFor(slug) + (hash ? `#${hash}` : '');
  if (url === window.location.pathname + window.location.hash) {
    // Same page: just honour the anchor.
    if (hash) scrollToId(hash);
    else scrollToTop();
    return;
  }
  window.history.pushState(null, '', url);
  window.dispatchEvent(new Event(ROUTE_EVENT));
}

/** Subscribes to route changes and returns the current slug. */
export function useRoute(): string {
  const [slug, setSlug] = useState(currentSlug);

  useEffect(() => {
    const sync = () => setSlug(currentSlug());
    window.addEventListener('popstate', sync);
    window.addEventListener(ROUTE_EVENT, sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener(ROUTE_EVENT, sync);
    };
  }, []);

  return slug;
}

const behavior = (): ScrollBehavior => (prefersReducedMotion() ? 'auto' : 'smooth');

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: behavior() });
}

/** Scrolls to an element and moves keyboard focus there. */
export function scrollToId(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: behavior(), block: 'start' });
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}

/**
 * True for a click that the browser should handle itself: a new tab, a
 * download, a modified click. Those must not be intercepted by the router.
 */
export function isPlainClick(event: React.MouseEvent): boolean {
  return !(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0);
}
