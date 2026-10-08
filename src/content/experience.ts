import type { Experience } from './types.ts';

/** Work experience, newest first. */
export const experience: Experience[] = [
  {
    id: 'hsbc',
    organization: 'HSBC Technology India',
    role: 'Software Engineering Intern',
    period: { start: '2026-06', end: '2026-07' },
    summary:
      'Worked on the Global Mortgage Solutions platform, part of a large-scale, multi-region application ecosystem.',
    points: [
      'Contributed to migrating legacy application code to a new codebase.',
      'Worked on application maintenance, internal tooling and better development workflows.',
      'Built and improved internal tools that support application analysis and make software changes more efficient and reliable.',
    ],
    builds: [
      {
        title: 'API Impact Assessment Dashboard',
        text: 'A full-stack dashboard that traces API dependencies across microservices.',
      },
    ],
    stack: ['React', 'Node.js', 'Express.js', 'Vite', 'Lerna'],
    inMatrix: true,
    short: 'HSBC',
  },
  {
    id: 'admin-ta',
    organization: 'Administration Section, IIT Palakkad',
    role: 'Student Teaching Assistant',
    period: { start: '2026-02', end: 'present' },
    summary:
      'Working closely with the Administration Section to streamline and digitize existing campus processes.',
    points: [
      'Role-based workflows for booking, approval and document management.',
      'Role-based access control and approvals for students, employees and security staff.',
      'QR-code pass verification, automated notifications and entry/exit audit logs.',
    ],
    builds: [
      {
        title: 'Guest House Booking Portal',
        text: 'Multi-tier approvals, dynamic forms and an interactive availability console.',
        projectId: 'guest-house',
      },
      {
        title: 'Visitor Management System',
        text: 'Entry authorization with printable digital passes and centralized visitor records.',
        projectId: 'visitor-management',
      },
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
  },
];
