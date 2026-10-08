import type { Domain, Project } from './types.ts';

/** Filters shown above the project grid. */
export const projectFilters: { id: Domain | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI and ML' },
  { id: 'data', label: 'Data' },
  { id: 'web', label: 'Full-stack' },
];

/**
 * Projects, in display order. Featured projects take a wider frame.
 *
 * To add a GitHub or live link, add it to `links`, e.g.
 *   links: [{ label: 'GitHub', href: 'https://github.com/Rizzwan285/arcus' }]
 * Cards without links simply hide the link row.
 */
export const projects: Project[] = [
  {
    id: 'arcus',
    title: 'Arcus',
    subtitle: 'Academic retrieval workspace',
    short: 'Arcus',
    period: { start: '2026-03', end: '2026-08' },
    domains: ['ai', 'data', 'web'],
    featured: true,
    summary:
      'A document retrieval and RAG platform for academic material, with hybrid search and benchmarked retrieval quality.',
    pipeline: ['Ingest', 'Index', 'Hybrid search', 'Rank fusion', 'Evaluate'],
    details: [
      'Hybrid retrieval that combines pgvector HNSW vector search with PostgreSQL full-text search.',
      'Results from both retrievers fused with Reciprocal Rank Fusion (RRF).',
      'An idempotent ingestion pipeline, so re-running it never duplicates documents.',
      'Retrieval quality benchmarked with Recall@k, Mean Reciprocal Rank (MRR) and nDCG.',
    ],
    stack: ['Next.js', 'tRPC', 'PostgreSQL', 'pgvector', 'Prisma', 'Inngest'],
    links: [],
  },
  {
    id: 'drug-generation',
    title: 'Multi-target drug molecule generation',
    short: 'Drug generation',
    period: { start: '2026-04', end: 'present' },
    domains: ['ai'],
    featured: true,
    summary:
      'A pipeline for designing drug-like molecules for several protein targets at once, balancing binding affinity, drug-likeness and validity.',
    pipeline: ['Target proteins', 'Protein embeddings', 'Generative model', 'Property objectives', 'New molecules'],
    details: [
      'Works with protein embeddings (ProtTrans) and molecular representations (RDKit).',
      'Explores flow matching and other generative approaches for molecules conditioned on target proteins.',
      'Studies protein–ligand datasets including CrossDocked2020.',
      'Investigates property-aware and toxicity-aware objectives: binding affinity, drug-likeness and molecular validity.',
      'Covers molecular preprocessing, representation, evaluation and baseline implementations.',
    ],
    stack: ['Python', 'PyTorch', 'RDKit', 'MXNet', 'ProtTrans'],
    links: [],
  },
  {
    id: 'campus-hub',
    title: 'IIT Palakkad Campus Hub',
    short: 'Campus Hub',
    period: { start: '2025-10', end: '2026-08' },
    domains: ['data', 'web'],
    summary:
      'A full-stack hub for IIT Palakkad students, fed by an automated Airflow and dbt pipeline into a dimensional star schema.',
    pipeline: ['Sources', 'Airflow', 'dbt models', 'Star schema', 'Campus app'],
    metric: { value: '4', label: 'automated data-quality checks' },
    details: [
      'Full-stack platform built for IIT Palakkad students.',
      'Automated data pipeline orchestrated with Apache Airflow and transformed with dbt.',
      'Data loaded into a dimensional star schema.',
      'Four automated data-quality checks.',
      'The app and the pipeline are containerized with Docker Compose.',
    ],
    stack: ['PostgreSQL', 'React', 'Express.js', 'Apache Airflow', 'dbt', 'Docker'],
    links: [],
  },
  {
    id: 'disaster-nlp',
    title: 'Multilingual disaster message classification',
    short: 'Disaster NLP',
    period: { start: '2025-08', end: '2025-11' },
    domains: ['ai'],
    summary:
      'Flags urgent disaster-related social media posts in English, Malayalam and Manglish with multilingual transformers.',
    pipeline: ['Posts', 'XLM-R, MuRIL, mBERT', 'Class balancing', 'Urgency label'],
    metric: { value: '0.778', label: 'Macro-F1' },
    details: [
      'Compared traditional machine-learning baselines with multilingual transformers: XLM-R, MuRIL and mBERT.',
      'Handled class imbalance with synthetic examples and class weighting.',
      'Evaluated cross-lingual performance on English, Malayalam and Manglish.',
      'Reached 0.778 Macro-F1.',
    ],
    stack: ['Python', 'PyTorch', 'Transformers'],
    links: [],
  },
  {
    id: 'super-resolution',
    title: 'Image super-resolution',
    subtitle: 'Deep neural networks',
    short: 'Super-resolution',
    period: { start: '2026-01', end: '2026-05' },
    domains: ['ai'],
    summary:
      'Deep networks that turn low-resolution images into high-resolution ones while keeping the detail intact.',
    pipeline: ['Low-res input', 'SRCNN, SRGAN, CNNs', 'Perceptual loss', 'High-res output'],
    details: [
      'Implemented and evaluated SRCNN, SRGAN and custom CNN-based architectures.',
      'Used data augmentation and perceptual loss functions to improve image quality.',
      'Investigated techniques for handling image distortions.',
      'Benchmarked models with standard image-quality metrics across multiple datasets.',
    ],
    stack: ['Python', 'PyTorch'],
    links: [],
  },
  {
    id: 'guest-house',
    title: 'Guest house booking portal',
    short: 'Guest house',
    period: { start: '2026-08', end: 'present' },
    domains: ['web'],
    summary:
      'Booking for the campus guest house, with multi-tier approvals, dynamic forms and an interactive availability console.',
    pipeline: ['Request', 'Approvals', 'Availability', 'Booking'],
    details: [
      'Built for the campus Administration Section.',
      'Multi-tier approval workflows.',
      'Dynamic forms and an interactive availability console.',
      'Role-based booking and document-management workflows.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    links: [],
  },
  {
    id: 'visitor-management',
    title: 'Visitor management system',
    short: 'Visitor system',
    period: { start: '2026-02', end: 'present' },
    domains: ['web'],
    summary:
      'Entry authorization for campus visitors, with role-based approvals, QR-verified digital passes and entry and exit logs.',
    pipeline: ['Request', 'Role-based approval', 'QR pass', 'Entry log'],
    details: [
      'Role-based access control and approval workflows for students, employees and security personnel.',
      'QR-code pass verification and automated notifications.',
      'Printable digital entry passes.',
      'Centralized visitor records with entry and exit audit logs.',
      'Responsive admin interface on a relational PostgreSQL database.',
    ],
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'PostgreSQL',
      'Prisma',
      'Zod',
      'React Hook Form',
      'Zustand',
    ],
    links: [],
  },
  {
    id: 'medallion-dwh',
    title: 'Mini data warehouse',
    subtitle: 'Medallion architecture',
    short: 'Data warehouse',
    period: { start: '2025-08', end: '2025-10' },
    domains: ['data'],
    summary:
      'A layered warehouse that moves structured data from raw to analytics-ready through bronze, silver and gold layers.',
    pipeline: ['Raw data', 'Bronze', 'Silver', 'Gold', 'Reports'],
    details: [
      'Bronze layer for raw data, silver for cleaned data, gold for analytics-ready data.',
      'ETL pipelines to extract, transform and load structured datasets.',
      'Data quality improved at every layer.',
      'Relational schemas and analytical queries for reporting.',
    ],
    stack: ['PostgreSQL', 'Python'],
    links: [],
  },
  {
    id: 'food-delivery',
    title: 'Food delivery management system',
    short: 'Food delivery',
    period: { start: '2025-01', end: '2025-04' },
    domains: ['web', 'data'],
    summary:
      'A modular, role-based delivery app on a normalized PostgreSQL schema, with SQL analytics for revenue and performance.',
    pipeline: ['React UI', 'Express API', 'PostgreSQL', 'SQL analytics'],
    details: [
      'Modular, role-based web application with a React frontend.',
      'Normalized relational schema with foreign keys for users, orders, menus and delivery workflows.',
      'Responsive UI components.',
      'SQL-based analytics for revenue and performance insights.',
    ],
    stack: ['React', 'Node.js', 'Express.js', 'PostgreSQL'],
    links: [],
  },
  {
    id: 'mental-health',
    title: 'Student depression-risk prediction',
    short: 'Mental health',
    period: { start: '2025-08', end: '2025-11' },
    domains: ['ai', 'data'],
    summary:
      'Models that predict depression risk and estimate CGPA from academic, demographic, behavioural and lifestyle factors.',
    pipeline: ['Student data', 'Preprocessing', 'Models', 'Interpretation'],
    details: [
      'Preprocessing with missing-value handling, feature encoding and scaling.',
      'Classification models for depression-risk prediction.',
      'Regression models for CGPA estimation.',
      'Compared several algorithms with standard evaluation metrics.',
      'Explored interpretability to understand the factors behind predictions and academic performance.',
    ],
    stack: ['Python', 'Scikit-learn', 'Pandas'],
    links: [],
  },
];
