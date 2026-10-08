import { profile } from './profile.ts';

/** Page metadata used in index.html-level tags and the footer. */
export const siteMeta = {
  title: `${profile.fullName} · Data Science and Engineering, IIT Palakkad`,
  description:
    'Portfolio of Muhamed Rizwan Mehaboob, a Data Science and Engineering student at IIT Palakkad building data pipelines, retrieval systems, machine-learning models and full-stack products.',
};

/**
 * The intro animation: particles start as random noise and flow into your
 * name, like a print developing under a safelight (and like the generative
 * models in your research).
 */
export const intro = {
  enabled: true,
  /** true = play only on the first load in a browser tab. */
  oncePerSession: false,
  /** The word the particles assemble into. */
  word: profile.shortName,
  /** How long the particles take to settle, in milliseconds. */
  durationMs: 1700,
};

/**
 * Sections, in page order. Like DeveloperFolio's `display` flags:
 * set `display: false` to hide a section (and its nav link).
 * `nav` is the label in the top navigation; leave it out to keep a section
 * off the nav. `display: 'auto'` shows the section only when it has content.
 */
export const sections = {
  whatIDo: {
    id: 'what-i-do',
    title: 'What I do',
    nav: 'What I do',
    display: true,
    lede: 'I work along the whole path data takes: the pipelines that collect and clean it, the models that learn from it, and the products people actually use.',
  },
  experience: {
    id: 'experience',
    title: 'Work experience',
    nav: 'Experience',
    display: true,
    lede: 'Engineering inside a global bank, and building digital systems for my own campus.',
  },
  proficiency: {
    id: 'proficiency',
    title: 'Proficiency',
    nav: 'Skills',
    display: true,
    lede: 'Measured, not self-rated. Each lit cell is a project or role where I used that technology, counted straight from the work below.',
  },
  education: {
    id: 'education',
    title: 'Education',
    nav: 'Education',
    display: true,
    lede: 'Data Science and Engineering at IIT Palakkad, after CBSE schooling in Kerala.',
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    nav: 'Projects',
    display: true,
    lede: 'Retrieval systems, generative models, data platforms and full-stack products. Open any project to see how it was built.',
  },
  achievements: {
    id: 'achievements',
    title: 'Achievements',
    nav: 'Achievements',
    display: true,
    lede: 'Competitive programming and national-level competitions.',
  },
  certifications: {
    id: 'certifications',
    title: 'Certifications',
    display: 'auto',
    lede: 'Courses and credentials.',
  },
  beyond: {
    id: 'beyond',
    title: 'Beyond academics',
    nav: 'Beyond',
    display: true,
    lede: 'The person behind the resume: who I support, what I watch, what I shoot, and what I help run on campus.',
  },
  contact: {
    id: 'contact',
    title: 'Contact me',
    nav: 'Contact',
    display: true,
    lede: 'Have a role, a research idea or a project in mind? I would love to hear about it.',
  },
} satisfies Record<string, SectionConfig>;

export interface SectionConfig {
  id: string;
  title: string;
  nav?: string;
  display: boolean | 'auto';
  lede: string;
}

export type SectionKey = keyof typeof sections;
