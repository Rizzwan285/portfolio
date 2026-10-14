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
 * Sections. Like DeveloperFolio's `display` flags: set `display: false` to
 * hide one. `display: 'auto'` shows it only when it has content. Which page
 * a section lands on is decided by `pages` below.
 */
export const sections = {
  whatIDo: {
    id: 'what-i-do',
    title: 'What I do',
    display: true,
    lede: 'Data goes on a journey. Raw and messy, then cleaned up, then teaching a model something, then quietly running inside an app. I like being there for all of it.',
  },
  experience: {
    id: 'experience',
    title: 'Work experience',
    display: true,
    lede: 'A summer inside a global bank, and a few years building the systems my own campus runs on.',
  },
  proficiency: {
    id: 'proficiency',
    title: 'Proficiency',
    display: true,
    lede: 'No star ratings here. Every lit square is a real project or job where I actually used the thing, counted straight from the work itself.',
  },
  education: {
    id: 'education',
    title: 'Education',
    display: true,
    lede: 'Data Science and Engineering at IIT Palakkad, by way of a CBSE classroom in Kerala.',
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    display: true,
    lede: 'Search engines, generative models, data platforms and full-stack apps. Open any one of them to see how it came together.',
  },
  achievements: {
    id: 'achievements',
    title: 'Achievements',
    display: true,
    lede: 'Contests, hackathons and a lot of late-night problem solving.',
  },
  certifications: {
    id: 'certifications',
    title: 'Certifications',
    display: 'auto',
    lede: 'Courses I sat through properly, with the paper to show for it.',
  },
  beyond: {
    id: 'beyond',
    title: 'Beyond academics',
    display: true,
    lede: 'The stuff that never makes it onto a resume. Who I support, what I rewatch, what I shoot, and what I help run on campus.',
  },
  contact: {
    id: 'contact',
    title: 'Contact me',
    display: true,
    lede: 'Got a role, a research idea, or something you want built? I would love to hear about it.',
  },
} satisfies Record<string, SectionConfig>;

/**
 * Pages, in top-bar order. Each one lists the sections it shows, so moving a
 * section to another page is a one-line change here. The first page is the
 * home page and its slug must stay empty.
 */
export const pages = {
  home: { slug: '', nav: 'Home', sections: ['whatIDo'] },
  work: { slug: 'work', nav: 'Work', sections: ['experience', 'projects'] },
  skills: { slug: 'skills', nav: 'Skills', sections: ['proficiency', 'certifications'] },
  education: { slug: 'education', nav: 'Education', sections: ['education', 'achievements'] },
  beyond: { slug: 'beyond', nav: 'Beyond', sections: ['beyond'] },
  contact: { slug: 'contact', nav: 'Contact', sections: ['contact'] },
} satisfies Record<string, PageConfig>;

export interface SectionConfig {
  id: string;
  title: string;
  display: boolean | 'auto';
  lede: string;
}

export interface PageConfig {
  /** Path after the base URL. The home page uses ''. */
  slug: string;
  /** Label in the top bar. */
  nav: string;
  sections: readonly SectionKey[];
}

export type SectionKey = keyof typeof sections;
export type PageKey = keyof typeof pages;
