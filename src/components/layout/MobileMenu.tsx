import { X } from 'lucide-react';
import type { CSSProperties, MouseEvent } from 'react';
import { profile, socials } from '../../content/profile.ts';
import { useModalDialog } from '../../hooks/useModalDialog.ts';
import { asset } from '../../lib/asset.ts';
import { cx } from '../../lib/cx.ts';
import type { NavItem } from '../../lib/sections.ts';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  open: boolean;
  items: NavItem[];
  active: string | null;
  onClose: () => void;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>) => void;
}

/** Full-screen menu for small screens, built on a native modal <dialog>. */
export function MobileMenu({ open, items, active, onClose, onNavigate }: MobileMenuProps) {
  const ref = useModalDialog(open, onClose);

  return (
    <dialog ref={ref} className={styles.menu} aria-label="Menu">
      <div className={styles.top}>
        <span className={styles.name}>{profile.fullName}</span>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close menu">
          <X aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Sections">
        <ul role="list" className={styles.list}>
          {items.map((item, index) => (
            <li key={item.id} style={{ '--i': index } as CSSProperties}>
              <a
                href={`#${item.id}`}
                onClick={onNavigate}
                className={cx(styles.link, active === item.id && styles.active)}
                aria-current={active === item.id ? 'true' : undefined}
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
