import { experience } from '../content/experience.ts';
import { projects } from '../content/projects.ts';
import { tech, techCategories, type TechCategory, type TechInfo, type TechName } from '../content/tech.ts';
import { periodKey } from './dates.ts';

/**
 * Builds the proficiency matrix from the projects and roles themselves,
 * so the skills section can never drift out of sync with the work.
 */
export interface MatrixColumn {
  id: string;
  label: string;
  title: string;
  href: string;
  stack: readonly TechName[];
}

export interface MatrixRow {
  name: TechName;
  category: TechCategory;
  uses: boolean[];
  count: number;
}

export interface MatrixGroup {
  category: TechCategory;
  label: string;
  rows: MatrixRow[];
}

export interface ProficiencyMatrix {
  columns: MatrixColumn[];
  groups: MatrixGroup[];
  rows: MatrixRow[];
}

export function buildProficiencyMatrix(): ProficiencyMatrix {
  const sources = [
    ...projects.map((p) => ({
      id: p.id,
      label: p.short,
      title: p.title,
      href: `#project-${p.id}`,
      stack: p.stack,
      start: p.period.start,
    })),
    ...experience
      .filter((e) => e.inMatrix)
      .map((e) => ({
        id: e.id,
        label: e.short ?? e.organization,
        title: `${e.role}, ${e.organization}`,
        href: '#experience',
        stack: e.stack,
        start: e.period.start,
      })),
  ].sort((a, b) => periodKey(a.start) - periodKey(b.start));

  const columns: MatrixColumn[] = sources.map(({ id, label, title, href, stack }) => ({
    id,
    label,
    title,
    href,
    stack,
  }));

  const names = (Object.keys(tech) as TechName[]).filter((name) => (tech[name] as TechInfo).matrix);

  const rows: MatrixRow[] = names
    .map((name) => {
      const uses = columns.map((column) => column.stack.includes(name));
      return { name, category: tech[name].category, uses, count: uses.filter(Boolean).length };
    })
    .filter((row) => row.count > 0);

  const groups = (Object.keys(techCategories) as TechCategory[])
    .map((category) => ({
      category,
      label: techCategories[category],
      rows: rows.filter((row) => row.category === category).sort((a, b) => b.count - a.count),
    }))
    .filter((group) => group.rows.length > 0);

  return { columns, groups, rows: groups.flatMap((g) => g.rows) };
}

/** The most-used technologies, for the "core stack" summary. */
export function coreStack(matrix: ProficiencyMatrix, limit = 6): MatrixRow[] {
  return [...matrix.rows].sort((a, b) => b.count - a.count).slice(0, limit);
}
