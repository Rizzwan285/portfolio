import { Section } from '../../components/layout/Section.tsx';
import { Develop } from '../../components/ui/Develop.tsx';
import { TextLink } from '../../components/ui/TextLink.tsx';
import { certifications } from '../../content/certifications.ts';
import { sections } from '../../content/site.ts';
import styles from './Certifications.module.css';

/**
 * Certifications. Rendered only when content/certifications.ts has entries
 * (see `display: 'auto'` in content/site.ts).
 */
export function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <Section config={sections.certifications}>
      <ul role="list" className={styles.list}>
        {certifications.map((cert, index) => (
          <Develop as="li" key={`${cert.title}-${cert.issuer}`} className={styles.item} delay={index * 60}>
            <p className={styles.date}>{cert.date}</p>
            <div>
              <h3 className={styles.title}>{cert.title}</h3>
              <p className={styles.issuer}>{cert.issuer}</p>
            </div>
            {cert.credentialUrl && (
              <TextLink href={cert.credentialUrl} className={styles.link}>
                View credential
              </TextLink>
            )}
          </Develop>
        ))}
      </ul>
    </Section>
  );
}
