import type { ReactNode } from 'react';
import type { SectionConfig } from '../../content/site.ts';
import { cx } from '../../lib/cx.ts';
import { Develop } from '../ui/Develop.tsx';
import styles from './Section.module.css';

interface SectionProps {
  config: SectionConfig;
  children: ReactNode;
  className?: string;
  /** Extra content placed beside the heading (e.g. a filter or toggle). */
  aside?: ReactNode;
}

/**
 * A page section: poster-scale heading with its lede, then content.
 * Every section on the page is built from this, so spacing stays consistent.
 */
export function Section({ config, children, className, aside }: SectionProps) {
  const headingId = `${config.id}-title`;
  return (
    <section id={config.id} aria-labelledby={headingId} className={cx(styles.section, className)}>
      <div className="container">
        <Develop as="header" className={styles.header}>
          <h2 id={headingId} className={styles.title}>
            {config.title}
          </h2>
          <div className={styles.meta}>
            <p className={styles.lede}>{config.lede}</p>
            {aside}
          </div>
        </Develop>
        {children}
      </div>
    </section>
  );
}
