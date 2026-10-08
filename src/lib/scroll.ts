import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion.ts';

/** Smoothly scrolls to an in-page anchor like "#contact" and updates the URL. */
export function scrollToHash(hash: string): void {
  const id = hash.replace(/^#/, '');
  const target = id === 'top' ? document.body : document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', id === 'top' ? window.location.pathname : `#${id}`);
  if (target instanceof HTMLElement && id !== 'top') {
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
}
