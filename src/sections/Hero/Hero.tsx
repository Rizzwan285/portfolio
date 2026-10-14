import { ArrowDown, FileText } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Avatar } from '../../components/figures/Avatar.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { TextLink } from '../../components/ui/TextLink.tsx';
import { profile, socials } from '../../content/profile.ts';
import { asset } from '../../lib/asset.ts';
import { cx } from '../../lib/cx.ts';
import { navigate, scrollToId } from '../../lib/router.ts';
import styles from './Hero.module.css';

interface HeroProps {
  /** Becomes true when the intro lifts; the hero then develops in. */
  ready: boolean;
}

export function Hero({ ready }: HeroProps) {
  const nameLines = [`${profile.firstName} ${profile.middleName}`, profile.lastName];

  return (
    <section className={cx(styles.hero, ready && styles.ready)} aria-labelledby="hero-title">
      <div className={styles.lamp} aria-hidden="true" />

      <div className={cx('container', styles.inner)}>
        <div className={styles.portrait}>
          <Avatar />
        </div>

        <h1 id="hero-title" className={styles.name}>
          {nameLines.map((line, i) => (
            <span key={line} className={styles.line} style={{ '--i': i } as CSSProperties}>
              {line}
            </span>
          ))}
        </h1>

        <p className={styles.role}>
          {profile.role}, {profile.institution}
        </p>

        <p className={styles.intro}>{profile.intro}</p>

        <div className={styles.actions}>
          <Button
            href="/contact"
            onClick={(event) => {
              event.preventDefault();
              navigate('contact');
            }}
          >
            Contact me
          </Button>
          <Button variant="ghost" href={asset(profile.resume)} newTab icon={<FileText />}>
            Resume
          </Button>
        </div>

        <ul role="list" className={styles.socials} aria-label="Elsewhere">
          {socials.map((social) => (
            <li key={social.id}>
              <TextLink href={social.href}>{social.label}</TextLink>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className={styles.scrollCue}
        onClick={() => scrollToId('what-i-do')}
        aria-label="Scroll to what I do"
      >
        <ArrowDown aria-hidden="true" />
      </button>
    </section>
  );
}
