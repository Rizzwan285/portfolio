import { FileText, Menu } from 'lucide-react';
import { useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { profile } from '../../content/profile.ts';
import type { PageKey } from '../../content/site.ts';
import { useScrollMetrics } from '../../hooks/useScrollMetrics.ts';
import { asset } from '../../lib/asset.ts';
import { cx } from '../../lib/cx.ts';
import { hrefFor, isPlainClick, navigate } from '../../lib/router.ts';
import type { NavItem } from '../../lib/sections.ts';
import { Button } from '../ui/Button.tsx';
import { MobileMenu } from './MobileMenu.tsx';
import styles from './Navbar.module.css';

interface NavbarProps {
  items: NavItem[];
  current: PageKey;
}

/** Top bar: the site logo, one link per page, and the two standing actions. */
export function Navbar({ items, current }: NavbarProps) {
  const { y, direction } = useScrollMetrics();
  const [menuOpen, setMenuOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const [marker, setMarker] = useState<{ x: number; width: number } | null>(null);

  const links = items.filter((item) => item.key !== 'contact');

  // Slide the underline to the active link, and keep it there on resize.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const place = () => {
      const active = list.querySelector<HTMLAnchorElement>('[data-active="true"]');
      if (!active) {
        setMarker(null);
        return;
      }
      setMarker({ x: active.offsetLeft, width: active.offsetWidth });
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(list);
    return () => observer.disconnect();
  }, [current, items]);

  const scrolled = y > 24;
  const hidden = y > 520 && direction === 'down' && !menuOpen;

  const go = (slug: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    setMenuOpen(false);
    navigate(slug);
  };

  return (
    <header className={cx(styles.nav, scrolled && styles.scrolled, hidden && styles.hidden)}>
      <div className={cx('container', styles.inner)}>
        <a
          href={hrefFor('')}
          className={styles.logo}
          onClick={go('')}
          aria-label={`${profile.shortName}, home`}
        >
          {profile.shortName}
        </a>

        <nav aria-label="Pages" className={styles.links}>
          <ul role="list" ref={listRef}>
            {links.map((item) => (
              <li key={item.key}>
                <a
                  href={hrefFor(item.slug)}
                  onClick={go(item.slug)}
                  data-active={item.key === current}
                  className={cx(styles.link, item.key === current && styles.active)}
                  aria-current={item.key === current ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
            {marker && (
              <span
                className={styles.marker}
                aria-hidden="true"
                style={{ '--x': `${marker.x}px`, '--w': `${marker.width}px` } as CSSProperties}
              />
            )}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button variant="ghost" href={asset(profile.resume)} newTab icon={<FileText />} className={styles.resume}>
            Resume
          </Button>
          <Button
            href={hrefFor('contact')}
            onClick={go('contact')}
            current={current === 'contact'}
            className={styles.contact}
          >
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

      <MobileMenu
        open={menuOpen}
        items={items}
        current={current}
        onClose={() => setMenuOpen(false)}
        onNavigate={(slug) => {
          setMenuOpen(false);
          navigate(slug);
        }}
      />
    </header>
  );
}
