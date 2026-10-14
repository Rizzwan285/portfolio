import { useEffect, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView.ts';
import { prefersReducedMotion } from '../../hooks/usePrefersReducedMotion.ts';

interface CountUpProps {
  /** Any string with a leading number: "500+", "0.778", "96.2%", "18". */
  value: string;
  durationMs?: number;
  className?: string;
}

const NUMBER = /^(\d+(?:\.\d+)?)(.*)$/;

function parse(value: string) {
  const match = NUMBER.exec(value);
  if (!match) return null;
  const [, numeric, suffix] = match;
  const decimals = numeric.includes('.') ? numeric.split('.')[1].length : 0;
  return { target: Number(numeric), decimals, suffix };
}

/**
 * Counts a number up from zero the first time it scrolls into view.
 * Non-numeric values ("Semifinalist"), and reduced-motion visitors, get
 * the final value straight away.
 */
export function CountUp({ value, durationMs = 1400, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { threshold: 0.6 });
  const [display, setDisplay] = useState(() => {
    const parsed = parse(value);
    if (!parsed || prefersReducedMotion()) return value;
    return (0).toFixed(parsed.decimals) + parsed.suffix;
  });

  useEffect(() => {
    const parsed = parse(value);
    if (!parsed || !inView || prefersReducedMotion()) return;
    const { target, decimals, suffix } = parsed;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay((target * eased).toFixed(decimals) + suffix);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, durationMs]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{display}</span>
      <span className="visually-hidden">{value}</span>
    </span>
  );
}
