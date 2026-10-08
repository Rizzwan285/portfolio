import { Check, Copy } from 'lucide-react';
import { useEffect, useState, type MouseEvent } from 'react';
import { Develop } from '../../components/ui/Develop.tsx';
import { profile, socials } from '../../content/profile.ts';
import { sections } from '../../content/site.ts';
import { useLocalTime } from '../../hooks/useLocalTime.ts';
import { asset } from '../../lib/asset.ts';
import { scrollToHash } from '../../lib/scroll.ts';
import styles from './Contact.module.css';

const YEAR = new Date().getFullYear();

/** The last section: a direct line to email, the links, and the footer. */
export function Contact() {
  const config = sections.contact;
  const time = useLocalTime(profile.timeZone);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const toTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToHash('#top');
  };

  const links = [
    ...socials
      .filter((social) => social.id !== 'email')
      .map((social) => ({ label: social.label, detail: social.handle, href: social.href })),
    { label: 'Resume', detail: 'PDF, one page', href: asset(profile.resume) },
  ];

  return (
    <section id={config.id} aria-labelledby="contact-title" className={styles.contact}>
      <div className={styles.lamp} aria-hidden="true" />
      <div className="container">
        <Develop as="header" className={styles.head}>
          <h2 id="contact-title" className={styles.title}>
            {config.title}
          </h2>
          <p className={styles.lede}>{config.lede}</p>
        </Develop>

        <Develop className={styles.emailRow} delay={80}>
          <a href={`mailto:${profile.email}`} className={styles.email}>
            {profile.email}
          </a>
          <button type="button" className={styles.copy} onClick={copyEmail}>
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy email'}
          </button>
          <span role="status" className="visually-hidden">
            {copied ? 'Email address copied to the clipboard' : ''}
          </span>
        </Develop>

        <ul role="list" className={styles.links}>
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className={styles.row}>
                <span className={styles.rowLabel}>{link.label}</span>
                <span className={styles.rowDetail}>{link.detail}</span>
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>

        <footer className={styles.footer}>
          <p>
            © {YEAR} {profile.fullName}
          </p>
          <p>
            {profile.location}
            {time && (
              <>
                , <span className={styles.time}>{time}</span> {profile.timeZoneLabel}
              </>
            )}
          </p>
          <a href="#top" onClick={toTop} className={styles.top}>
            Back to top
          </a>
        </footer>
      </div>
    </section>
  );
}
