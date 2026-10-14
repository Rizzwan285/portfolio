import { useState } from 'react';
import { Section } from '../../components/layout/Section.tsx';
import { projectFilters, projects } from '../../content/projects.ts';
import { sections } from '../../content/site.ts';
import type { Domain } from '../../content/types.ts';
import { cx } from '../../lib/cx.ts';
import { ProjectDialog } from './ProjectDialog.tsx';
import { ProjectFrame } from './ProjectFrame.tsx';
import styles from './Projects.module.css';

type Filter = Domain | 'all';

/**
 * Projects as a contact sheet. Choosing a filter dims the frames that don't
 * match. The grid never reshuffles, and every #project- link keeps working.
 */
export function Projects() {
  const [filter, setFilter] = useState<Filter>('all');
  const [openId, setOpenId] = useState<string | null>(null);
  const openProject = projects.find((p) => p.id === openId) ?? null;

  const matches = (domains: Domain[]) => filter === 'all' || domains.includes(filter);
  const count = (id: Filter) => (id === 'all' ? projects.length : projects.filter((p) => p.domains.includes(id)).length);

  const filters = (
    <div className={styles.filters} role="group" aria-label="Highlight projects by area">
      {projectFilters.map((option) => (
        <button
          key={option.id}
          type="button"
          className={cx(styles.filter, filter === option.id && styles.filterActive)}
          aria-pressed={filter === option.id}
          onClick={() => setFilter(option.id)}
        >
          {option.label}
          <span className={styles.filterCount}>{count(option.id)}</span>
        </button>
      ))}
    </div>
  );

  return (
    <Section config={sections.projects} aside={filters}>
      <ul role="list" className={styles.sheet}>
        {projects.map((project) => (
          <li
            key={project.id}
            id={`project-${project.id}`}
            className={cx(styles.slot, project.featured && styles.featured, !matches(project.domains) && styles.dimmed)}
          >
            <ProjectFrame project={project} onOpen={() => setOpenId(project.id)} />
          </li>
        ))}
      </ul>
      <ProjectDialog project={openProject} onClose={() => setOpenId(null)} />
    </Section>
  );
}
