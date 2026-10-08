/**
 * Resolves a path inside /public against Vite's base URL, so assets keep
 * working when the site is deployed to a sub-path (e.g. GitHub Pages).
 * Absolute URLs pass through untouched.
 */
export function asset(path: string): string {
  if (/^([a-z]+:)?\/\//i.test(path) || path.startsWith('data:') || path.startsWith('mailto:')) {
    return path;
  }
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

/** True for links that should open in a new tab. */
export function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
