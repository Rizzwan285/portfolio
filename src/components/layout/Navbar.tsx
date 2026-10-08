import { FileText, Menu } from 'lucide-react';
import { useState, type MouseEvent } from 'react';
import { profile } from '../../content/profile.ts';
import { useActiveSection } from '../../hooks/useActiveSection.ts';
import { useScrollMetrics } from '../../hooks/useScrollMetrics.ts';
import { asset } from '../../lib/asset.ts';
import { cx } from '../../lib/cx.ts';
import { scrollToHash } from '../../lib/scroll.ts';
import type { NavItem } from '../../lib/sections.ts';
import { Button } from '../ui/Button.tsx';
import { MobileMenu } from './MobileMenu.tsx';
import styles from './Navbar.module.css';

interface NavbarProps {
  items: NavItem[];
}

export function Navbar({ items }: NavbarProps) {
  const { y, direction } = useScrollMetrics();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = items.filter((item) => item.id !== 'contact');
  const active = useActiveSection(items.map((item) => item.id));

  const scrolled = y > 24;
  const hidden = y > 520 && direction === 'down' && !menuOpen;

  const onAnchor = (event: MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute('href');
    if (!href?.startsWith('#')) return;
    event.preventDefault();
    setMenuOpen(false);
    requestAnimationFrame(() => scrollToHash(href));
  };

  return (
    <header className={cx(styles.nav, scrolled && styles.scrolled, hidden && styles.hidden)}>
      <div className={cx('container', styles.inner)}>
        <a href="#top" className={styles.logo} onClick={onAnchor} aria-label={`${profile.shortName}, back to top`}>
          {profile.shortName}
          <span className={styles.lamp} aria-hidden="true" />
        </a>

        <nav aria-label="Sections" className={styles.links}>
          <ul role="list">
            {links.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={onAnchor}
                  className={cx(styles.link, active === item.id && styles.active)}
                  aria-current={active === item.id ? 'true' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button variant="ghost" href={asset(profile.resume)} newTab icon={<FileText />} className={styles.resume}>
            Resume
          </Button>
          <Button href="#contact" onClick={onAnchor} className={styles.contact}>
            Contact me
          </Button>
          <button
            type="button"
            className={styles.menuButton}
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} items={items} active={active} onClose={() => setMenuOpen(false)} onNavigate={onAnchor} />
    </header>
  );
}
