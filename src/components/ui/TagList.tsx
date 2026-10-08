import { cx } from '../../lib/cx.ts';
import styles from './TagList.module.css';

interface TagListProps {
  items: readonly string[];
  label?: string;
  size?: 'sm' | 'md';
  /** Use "paper" on light (ivory) surfaces. */
  tone?: 'dark' | 'paper';
  className?: string;
}

/** A row of technology tags. */
export function TagList({ items, label = 'Technologies', size = 'sm', tone = 'dark', className }: TagListProps) {
  if (items.length === 0) return null;
  return (
    <ul role="list" aria-label={label} className={cx(styles.list, styles[size], tone === 'paper' && styles.paper, className)}>
      {items.map((item) => (
        <li key={item} className={styles.tag}>
          {item}
        </li>
      ))}
    </ul>
  );
}
