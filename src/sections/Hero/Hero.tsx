import { FileText } from 'lucide-react';
import type { CSSProperties, MouseEvent } from 'react';
import { MoleculeFigure } from '../../components/figures/MoleculeFigure.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { TextLink } from '../../components/ui/TextLink.tsx';
import { profile, socials } from '../../content/profile.ts';
import { asset } from '../../lib/asset.ts';
import { cx } from '../../lib/cx.ts';
import { molecule } from '../../lib/molecule.data.ts';
import { scrollToHash } from '../../lib/scroll.ts';
import styles from './Hero.module.css';

interface HeroProps {
  /** Becomes true when the intro lifts; the hero then develops in. */
  ready: boolean;
}

/** Renders a formula like C29H31N7O with proper subscripts. */
function Formula({ value }: { value: string }) {
  return (
    <>
      {value.split(/(\d+)/).map((part, i) => (/^\d+$/.test(part) ? <sub key={i}>{part}</sub> : part))}
    </>
  );
}

export function Hero({ ready }: HeroProps) {
  const nameLines = [profile.firstName, profile.middleName, profile.lastName];

  const onAnchor = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToHash(event.currentTarget.getAttribute('href') ?? '#top');
  };

  return (
    <section className={cx(styles.hero, ready && styles.ready)} aria-labelledby="hero-title">
      <div className={styles.lamp} aria-hidden="true" />

      <div className={cx('container', styles.grid)}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.name}>
            {nameLines.map((line, i) => (
              <span key={line} className={styles.line} style={{ '--i': i } as CSSProperties}>
                {line}
              </span>
            ))}
          </h1>

          <div className={styles.details}>
            <p className={styles.role}>
              {profile.role} at {profile.institution}.
            </p>
            <p className={styles.intro}>{profile.intro}</p>

            <div className={styles.actions}>
              <Button href="#contact" onClick={onAnchor}>
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
        </div>

        <figure className={styles.figure}>
          <div className={styles.easel}>
            <MoleculeFigure />
            <span className={styles.blades} aria-hidden="true" />
            <span className={styles.formula} aria-hidden="true">
              <Formula value={molecule.formula} />
            </span>
            <span className={styles.hint} aria-hidden="true">
              Drag to rotate
            </span>
          </div>
          <figcaption className={styles.caption}>
            <p>{profile.figure.text}</p>
            <TextLink href={`#project-${profile.figure.projectId}`} onClick={onAnchor}>
              {profile.figure.linkLabel}
            </TextLink>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
