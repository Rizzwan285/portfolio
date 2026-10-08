import { CodeXml, Globe, X } from 'lucide-react';
import { TagList } from '../../components/ui/TagList.tsx';
import type { Project } from '../../content/types.ts';
import { useModalDialog } from '../../hooks/useModalDialog.ts';
import { formatPeriod } from '../../lib/dates.ts';
import { domainList } from './domains.ts';
import styles from './ProjectDialog.module.css';

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * The "enlargement": opening a frame from the contact sheet prints it on
 * ivory paper with the full story — the steps, the details and the stack.
 */
export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const ref = useModalDialog(project !== null, onClose);

  return (
    <dialog ref={ref} className={styles.dialog} aria-labelledby="project-print-title">
      {project && (
        <article className={styles.paper}>
          <header className={styles.head}>
            <p className={styles.meta}>
              <span>{domainList(project.domains)}</span>
              <span>{formatPeriod(project.period)}</span>
            </p>
            <h2 id="project-print-title" className={styles.title}>
              {project.title}
            </h2>
            {project.subtitle && <p className={styles.subtitle}>{project.subtitle}</p>}
            <button type="button" className={styles.close} onClick={onClose} aria-label="Close project">
              <X aria-hidden="true" />
            </button>
          </header>

          <p className={styles.summary}>{project.summary}</p>

          {project.metric && (
            <p className={styles.metric}>
              <span className={styles.metricValue}>{project.metric.value}</span>
              <span>{project.metric.label}</span>
            </p>
          )}

          {project.pipeline && (
            <section className={styles.block}>
              <h3 className={styles.blockTitle}>How it works</h3>
              <ol className={styles.steps}>
                {project.pipeline.map((step, i) => (
                  <li key={step}>
                    <span className={styles.stepNumber}>{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className={styles.block}>
            <h3 className={styles.blockTitle}>Details</h3>
            <ul className={styles.details}>
              {project.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </section>

          <section className={styles.block}>
            <h3 className={styles.blockTitle}>Built with</h3>
            <TagList items={project.stack} tone="paper" size="md" label="Built with" />
          </section>

          {project.links.length > 0 && (
            <footer className={styles.links}>
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {/github\.com|gitlab\.com/.test(link.href) ? <CodeXml aria-hidden="true" /> : <Globe aria-hidden="true" />}
                  {link.label}
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              ))}
            </footer>
          )}
        </article>
      )}
    </dialog>
  );
}
