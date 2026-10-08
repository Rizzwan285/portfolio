import { createElement, useState, type CSSProperties, type ReactNode } from 'react';
import { useInView } from '../../hooks/useInView.ts';
import { cx } from '../../lib/cx.ts';

type Tag = 'div' | 'header' | 'li' | 'p' | 'article' | 'figure' | 'section';

interface DevelopProps {
  as?: Tag;
  /** Delay in ms, for gentle staggering inside a group. */
  delay?: number;
  className?: string;
  id?: string;
  children: ReactNode;
}

/**
 * Reveals its content once, the first time it scrolls into view, by
 * sharpening it from a soft blur — like a print coming up in the developer.
 */
export function Develop({ as = 'div', delay = 0, className, id, children }: DevelopProps) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const developed = useInView(node);

  return createElement(
    as,
    {
      ref: setNode,
      id,
      className: cx('develop', developed && 'is-developed', className),
      style: { '--develop-delay': `${delay}ms` } as CSSProperties,
    },
    children,
  );
}
