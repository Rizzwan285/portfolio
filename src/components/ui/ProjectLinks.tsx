import { Fragment, type MouseEvent } from 'react';
import { projects } from '../../content/projects.ts';
import { hrefFor, isPlainClick, navigate } from '../../lib/router.ts';
import { slugOfSection } from '../../lib/sections.ts';
import { TextLink } from './TextLink.tsx';

interface ProjectLinksProps {
  ids: string[];
  prefix?: string;
  className?: string;
}

/** "Seen in Arcus and Campus Hub": links that open the matching project card. */
export function ProjectLinks({ ids, prefix = 'Seen in', className }: ProjectLinksProps) {
  const found = ids
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is (typeof projects)[number] => Boolean(p));
  if (found.length === 0) return null;

  const slug = slugOfSection('projects');

  const onClick = (projectId: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    navigate(slug, `project-${projectId}`);
  };

  return (
    <p className={className}>
      {prefix}{' '}
      {found.map((project, i) => (
        <Fragment key={project.id}>
          {i > 0 && (i === found.length - 1 ? ' and ' : ', ')}
          <TextLink href={`${hrefFor(slug)}#project-${project.id}`} onClick={onClick(project.id)}>
            {project.short}
          </TextLink>
        </Fragment>
      ))}
    </p>
  );
}
