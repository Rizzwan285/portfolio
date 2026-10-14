import type { MouseEventHandler, ReactNode } from 'react';
import { isExternal } from '../../lib/asset.ts';
import { cx } from '../../lib/cx.ts';
import styles from './Button.module.css';

type Variant = 'primary' | 'ghost';

interface BaseProps {
  variant?: Variant;
  /** Icon shown before the label. */
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

interface LinkProps extends BaseProps {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  /** Force opening in a new tab (external URLs do this automatically). */
  newTab?: boolean;
  /** True when this link points at the page you are already on. */
  current?: boolean;
}

interface ActionProps extends BaseProps {
  href?: undefined;
  onClick: MouseEventHandler<HTMLButtonElement>;
  pressed?: boolean;
}

/** A link or a button with the same look. Pass `href` to render a link. */
export function Button(props: LinkProps | ActionProps) {
  const { variant = 'primary', icon, className, children } = props;
  const classes = cx(styles.button, styles[variant], className);
  const content = (
    <>
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles.label}>{children}</span>
    </>
  );

  if (props.href !== undefined) {
    const opensNewTab = props.newTab ?? isExternal(props.href);
    return (
      <a
        className={classes}
        href={props.href}
        onClick={props.onClick}
        aria-current={props.current ? 'page' : undefined}
        {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={props.onClick} aria-pressed={props.pressed}>
      {content}
    </button>
  );
}
