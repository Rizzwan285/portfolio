import { CodeXml, Globe } from 'lucide-react';
import type { PointerEvent } from 'react';
import { GreasePencil } from '../../components/figures/GreasePencil.tsx';
import { TagList } from '../../components/ui/TagList.tsx';
import type { Project } from '../../content/types.ts';
import { formatPeriod } from '../../lib/dates.ts';
import { domainList } from './domains.ts';
import styles from './Projects.module.css';

interface ProjectFrameProps {
  project: Project;
  onOpen: () => void;
}

/** One frame on the contact sheet. The whole frame opens the project. */
export function ProjectFrame({ project, onOpen }: ProjectFrameProps) {
  // A soft light follows the pointer, like a loupe moving over the sheet.
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <article className={styles.frame} onPointerMove={onPointerMove}>
      <div className={styles.meta}>
        <span>{domainList(project.domains)}</span>
        <span className={styles.dates}>{formatPeriod(project.period)}</span>
      </div>

      <h3 className={styles.title}>
        <button type="button" className={styles.open} onClick={onOpen} aria-haspopup="dialog">
          <span className={styles.titleText}>
            {project.title}
            {project.featured && <GreasePencil mark="underline" className={styles.keeper} />}
          </span>
        </button>
      </h3>
      {project.subtitle && <p className={styles.subtitle}>{project.subtitle}</p>}

      <p className={styles.summary}>{project.summary}</p>

      {project.metric && (
        <p className={styles.metric}>
          <span className={styles.metricValue}>{project.metric.value}</span>
          <span className={styles.metricLabel}>{project.metric.label}</span>
        </p>
      )}

      {project.featured && project.pipeline && (
        <ol className={styles.pipeline} aria-label="How it works">
          {project.pipeline.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      )}

      <TagList items={project.stack} label="Built with" className={styles.tags} />

      <div className={styles.footer}>
        <span className={styles.more} aria-hidden="true">
          Open project
        </span>
        {project.links.length > 0 && (
          <ul role="list" className={styles.links}>
            {project.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {/github\.com|gitlab\.com/.test(link.href) ? <CodeXml aria-hidden="true" /> : <Globe aria-hidden="true" />}
                  {link.label}
                  <span className="visually-hidden"> for {project.title} (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
