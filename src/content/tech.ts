/**
 * Technology registry.
 *
 * Projects and roles reference technologies by these exact names, and the
 * Proficiency section counts how often each one appears. Add a technology
 * here before using it in a project's `stack`.
 *
 * `matrix: true` gives the technology a row in the proficiency matrix.
 */
export const techCategories = {
  languages: 'Languages',
  ml: 'Machine learning',
  data: 'Data engineering',
  databases: 'Databases',
  web: 'Web',
  tooling: 'Tooling',
} as const;

export type TechCategory = keyof typeof techCategories;

export interface TechInfo {
  category: TechCategory;
  matrix?: boolean;
}

export const tech = {
  Python: { category: 'languages', matrix: true },
  TypeScript: { category: 'languages', matrix: true },

  PyTorch: { category: 'ml', matrix: true },
  Transformers: { category: 'ml', matrix: true },
  'Scikit-learn': { category: 'ml', matrix: true },
  Pandas: { category: 'ml', matrix: true },
  RDKit: { category: 'ml', matrix: true },
  ProtTrans: { category: 'ml' },
  MXNet: { category: 'ml' },

  'Apache Airflow': { category: 'data', matrix: true },
  dbt: { category: 'data', matrix: true },
  Docker: { category: 'data', matrix: true },

  PostgreSQL: { category: 'databases', matrix: true },
  Prisma: { category: 'databases', matrix: true },
  Supabase: { category: 'databases', matrix: true },
  pgvector: { category: 'databases', matrix: true },

  React: { category: 'web', matrix: true },
  'Next.js': { category: 'web', matrix: true },
  'Node.js': { category: 'web', matrix: true },
  'Express.js': { category: 'web', matrix: true },
  'Tailwind CSS': { category: 'web', matrix: true },
  tRPC: { category: 'web', matrix: true },
  Inngest: { category: 'web' },
  Zod: { category: 'web' },
  Zustand: { category: 'web' },
  'React Hook Form': { category: 'web' },

  Vite: { category: 'tooling' },
  Lerna: { category: 'tooling' },
} satisfies Record<string, TechInfo>;

export type TechName = keyof typeof tech;

/**
 * Skills from the resume that are not tied to a specific project.
 * Shown as a compact toolkit list under the matrix.
 */
export const toolkit: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['C', 'C++', 'SQL', 'HTML/CSS'] },
  { group: 'Databases', items: ['MySQL', 'MongoDB'] },
  { group: 'Data & ML', items: ['NumPy', 'Matplotlib', 'Jupyter'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'Linux', 'VS Code', 'pgAdmin', 'LaTeX'] },
];
