import { X } from 'lucide-react';
import type { CSSProperties, MouseEvent } from 'react';
import { profile, socials } from '../../content/profile.ts';
import type { PageKey } from '../../content/site.ts';
import { useModalDialog } from '../../hooks/useModalDialog.ts';
import { asset } from '../../lib/asset.ts';
import { cx } from '../../lib/cx.ts';
import { hrefFor, isPlainClick } from '../../lib/router.ts';
import type { NavItem } from '../../lib/sections.ts';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  open: boolean;
  items: NavItem[];
  current: PageKey;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}

/** Full-screen menu for small screens, built on a native modal <dialog>. */
export function MobileMenu({ open, items, current, onClose, onNavigate }: MobileMenuProps) {
  const ref = useModalDialog(open, onClose);

  const go = (slug: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    onNavigate(slug);
  };

  return (
    <dialog ref={ref} className={styles.menu} aria-label="Menu">
      <div className={styles.top}>
        <span className={styles.name}>{profile.fullName}</span>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close menu">
          <X aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Pages">
        <ul role="list" className={styles.list}>
          {items.map((item, index) => (
            <li key={item.key} style={{ '--i': index } as CSSProperties}>
              <a
                href={hrefFor(item.slug)}
                onClick={go(item.slug)}
                className={cx(styles.link, item.key === current && styles.active)}
                aria-current={item.key === current ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.bottom}>
        <a href={asset(profile.resume)} target="_blank" rel="noopener noreferrer" className={styles.small}>
          Resume
        </a>
        {socials
          .filter((s) => s.id !== 'email')
          .map((social) => (
            <a key={social.id} href={social.href} target="_blank" rel="noopener noreferrer" className={styles.small}>
              {social.label}
            </a>
          ))}
      </div>
    </dialog>
  );
}
