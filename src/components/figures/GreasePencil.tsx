import { useRef } from 'react';
import { useInView } from '../../hooks/useInView.ts';
import { cx } from '../../lib/cx.ts';
import styles from './GreasePencil.module.css';

interface GreasePencilProps {
  /** circle: the loop photographers draw around a keeper on a contact sheet. */
  mark?: 'circle' | 'underline';
  className?: string;
}

const PATHS = {
  circle: 'M24 56C18 26 86 10 146 15c44 4 54 44 26 63-34 23-110 22-140 2-17-11-12-34 26-48',
  underline: 'M6 14C58 6 128 4 194 10M36 21c46-5 96-6 130-3',
};

/** A hand-drawn red mark that draws itself in when scrolled into view. */
export function GreasePencil({ mark = 'circle', className }: GreasePencilProps) {
  const ref = useRef<SVGSVGElement>(null);
  const drawn = useInView(ref, { threshold: 0.5 });

  return (
    <svg
      ref={ref}
      className={cx(styles.mark, styles[mark], drawn && styles.drawn, className)}
      viewBox={mark === 'circle' ? '0 0 200 100' : '0 0 200 26'}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[mark]} pathLength={1} />
    </svg>
  );
}
