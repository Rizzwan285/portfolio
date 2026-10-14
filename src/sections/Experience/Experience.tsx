import type { MouseEvent } from 'react';
import { Section } from '../../components/layout/Section.tsx';
import { Develop } from '../../components/ui/Develop.tsx';
import { TagList } from '../../components/ui/TagList.tsx';
import { TextLink } from '../../components/ui/TextLink.tsx';
import { experience } from '../../content/experience.ts';
import { sections } from '../../content/site.ts';
import { formatPeriod } from '../../lib/dates.ts';
import { isPlainClick } from '../../lib/router.ts';
import { goToAnchor } from '../../lib/scroll.ts';
import styles from './Experience.module.css';

/** Work experience as a timeline, newest first. */
export function Experience() {
  const onProjectLink = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    goToAnchor(event.currentTarget.getAttribute('href') ?? '#projects');
  };

  return (
    <Section config={sections.experience}>
      <ol role="list" className={styles.timeline}>
        {experience.map((job, index) => (
          <Develop as="li" key={job.id} className={styles.entry} delay={index * 90}>
            <div className={styles.when}>
              <span className={styles.dates}>{formatPeriod(job.period)}</span>
              {job.period.end === 'present' && <span className={styles.current}>Current role</span>}
            </div>

            <span className={styles.node} aria-hidden="true" />

            <article className={styles.body}>
              <header>
                <h3 className={styles.role}>{job.role}</h3>
                <p className={styles.org}>{job.organization}</p>
              </header>

              <p className={styles.summary}>{job.summary}</p>

              <ul className={styles.points}>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              {job.builds && (
                <div className={styles.builds}>
                  {job.builds.map((build) => (
                    <div key={build.title} className={styles.build}>
                      <h4 className={styles.buildTitle}>{build.title}</h4>
                      <p>{build.text}</p>
                      {build.projectId && (
                        <TextLink href={`#project-${build.projectId}`} onClick={onProjectLink}>
                          View the project
                        </TextLink>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <TagList items={job.stack} label={`Technologies used at ${job.organization}`} />
            </article>
          </Develop>
        ))}
      </ol>
    </Section>
  );
}
