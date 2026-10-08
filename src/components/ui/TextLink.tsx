import type { MouseEventHandler, ReactNode } from 'react';
import { isExternal } from '../../lib/asset.ts';
import { cx } from '../../lib/cx.ts';
import styles from './TextLink.module.css';

interface TextLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  /** Accessible label when the visible text is not enough. */
  label?: string;
}

/** An inline link with an underline that draws in on hover. */
export function TextLink({ href, children, className, onClick, label }: TextLinkProps) {
  const external = isExternal(href);
  return (
    <a
      href={href}
      className={cx(styles.link, className)}
      onClick={onClick}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {external && <span className="visually-hidden"> (opens in a new tab)</span>}
    </a>
  );
}
