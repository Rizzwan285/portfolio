import { ArrowUp } from 'lucide-react';
import { useScrollMetrics } from '../../hooks/useScrollMetrics.ts';
import { cx } from '../../lib/cx.ts';
import { scrollToTop } from '../../lib/router.ts';
import styles from './BackToTop.module.css';

const RADIUS = 21;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Floating "back to top" button whose ring fills as you scroll. */
export function BackToTop() {
  const { y, progress } = useScrollMetrics();
  const visible = typeof window !== 'undefined' && y > window.innerHeight * 1.2;

  return (
    <button
      type="button"
      className={cx(styles.button, visible && styles.visible)}
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <svg className={styles.ring} viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r={RADIUS} className={styles.track} />
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          className={styles.progress}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
      </svg>
      <ArrowUp className={styles.icon} aria-hidden="true" />
    </button>
  );
}
