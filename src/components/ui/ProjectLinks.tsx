import { Fragment, type MouseEvent } from 'react';
import { projects } from '../../content/projects.ts';
import { scrollToHash } from '../../lib/scroll.ts';
import { TextLink } from './TextLink.tsx';

interface ProjectLinksProps {
  ids: string[];
  prefix?: string;
  className?: string;
}

/** "Seen in Arcus and Campus Hub" — links that jump to project cards. */
export function ProjectLinks({ ids, prefix = 'Seen in', className }: ProjectLinksProps) {
  const found = ids
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is (typeof projects)[number] => Boolean(p));
  if (found.length === 0) return null;

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToHash(event.currentTarget.getAttribute('href') ?? '#projects');
  };

  return (
    <p className={className}>
      {prefix}{' '}
      {found.map((project, i) => (
        <Fragment key={project.id}>
          {i > 0 && (i === found.length - 1 ? ' and ' : ', ')}
          <TextLink href={`#project-${project.id}`} onClick={onClick}>
            {project.short}
          </TextLink>
        </Fragment>
      ))}
    </p>
  );
}
