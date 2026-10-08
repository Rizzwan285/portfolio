import { useEffect, useState } from 'react';

export interface ScrollMetrics {
  y: number;
  direction: 'up' | 'down';
  /** 0 → top of the page, 1 → bottom. */
  progress: number;
}

/** Scroll position, direction and progress, throttled to animation frames. */
export function useScrollMetrics(): ScrollMetrics {
  const [metrics, setMetrics] = useState<ScrollMetrics>({ y: 0, direction: 'up', progress: 0 });

  useEffect(() => {
    let lastY = window.scrollY;
    let direction: ScrollMetrics['direction'] = 'up';
    let frame = 0;

    const read = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const delta = y - lastY;
      if (Math.abs(delta) >= 6) {
        direction = delta > 0 ? 'down' : 'up';
        lastY = y;
      }
      setMetrics({ y, direction, progress: max > 0 ? Math.min(1, y / max) : 0 });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return metrics;
}
