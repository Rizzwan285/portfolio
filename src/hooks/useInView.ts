import { useEffect, useState, type RefObject } from 'react';

interface Options {
  /** Fraction of the element that must be visible. */
  threshold?: number;
  rootMargin?: string;
  /** Stop observing after the first time it becomes visible. */
  once?: boolean;
}

const supported = typeof window !== 'undefined' && 'IntersectionObserver' in window;

/**
 * Tracks whether an element is in the viewport. Accepts a ref object or the
 * element itself (handy with callback refs).
 */
export function useInView<T extends Element>(
  target: RefObject<T | null> | T | null,
  // threshold 0 + a bottom margin works for blocks of any height (a ratio
  // threshold can be unreachable for elements taller than the viewport).
  { threshold = 0, rootMargin = '0px 0px -10% 0px', once = true }: Options = {},
): boolean {
  // Without IntersectionObserver, treat everything as visible.
  const [inView, setInView] = useState(!supported);

  useEffect(() => {
    const node = target && 'current' in target ? target.current : target;
    if (!node || !supported) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, threshold, rootMargin, once]);

  return inView;
}
