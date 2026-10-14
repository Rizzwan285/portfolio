/**
 * "What I do": the disciplines, grouped by where they sit on the path
 * from raw data to a shipped product. `proof` lists project ids that
 * demonstrate each discipline; they render as links to the project cards.
 */
export type StageId = 'data' | 'models' | 'products';

export type DisciplineIcon = 'workflow' | 'brain' | 'flask' | 'search' | 'layers';

export interface Discipline {
  stage: StageId;
  icon: DisciplineIcon;
  title: string;
  text: string;
  points: string[];
  proof: string[];
}

export const whatIDo = {
  stages: [
    { id: 'data', label: 'Data', caption: 'Collect, clean and model it' },
    { id: 'models', label: 'Models', caption: 'Learn, generate and retrieve' },
    { id: 'products', label: 'Products', caption: 'Ship it to real users' },
  ] satisfies { id: StageId; label: string; caption: string }[],

  disciplines: [
    {
      stage: 'data',
      icon: 'workflow',
      title: 'Data engineering',
      text: 'Pipelines and warehouses that turn raw data into tables you can trust.',
      points: [
        'Airflow and dbt orchestration into dimensional star schemas',
        'Medallion layers, from raw bronze to analytics-ready gold',
        'Automated data-quality checks and Docker Compose deployments',
      ],
      proof: ['campus-hub', 'medallion-dwh'],
    },
    {
      stage: 'models',
      icon: 'brain',
      title: 'Machine learning and deep learning',
      text: 'Models for images and tabular data that are trained, compared and explained.',
      points: [
        'Image super-resolution with SRCNN, SRGAN and custom CNNs',
        'Depression-risk classification and CGPA regression',
        'Interpretability to show what drives a prediction',
      ],
      proof: ['super-resolution', 'mental-health'],
    },
    {
      stage: 'models',
      icon: 'flask',
      title: 'Generative AI for drug discovery',
      text: 'Generative models that design drug-like molecules for target proteins.',
      points: [
        'Exploring flow matching for molecules conditioned on target proteins',
        'Objectives for binding affinity, drug-likeness and validity',
        'Protein–ligand data such as CrossDocked2020',
      ],
      proof: ['drug-generation'],
    },
    {
      stage: 'models',
      icon: 'search',
      title: 'NLP and retrieval',
      text: 'Language models and search that work across languages and documents.',
      points: [
        'Multilingual transformers for English, Malayalam and Manglish',
        'Hybrid search with pgvector and Postgres full-text, fused with RRF',
        'Retrieval measured with Recall@k, MRR and nDCG',
      ],
      proof: ['arcus', 'disaster-nlp'],
    },
    {
      stage: 'products',
      icon: 'layers',
      title: 'Full-stack engineering',
      text: 'Web products with real users, roles and approval workflows.',
      points: [
        'Internal tooling at HSBC, including an API impact dashboard',
        'Role-based approvals, QR passes and audit logs for campus admin',
        'Typed stacks with Next.js, TypeScript, Prisma, tRPC and Supabase',
      ],
      proof: ['guest-house', 'visitor-management'],
    },
  ] satisfies Discipline[],

  alsoCurious: 'Also drawn to computer vision, data analytics and applied AI systems.',
};
