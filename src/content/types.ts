import type { TechName } from './tech.ts';

/**
 * Shared content types. Every section of the site renders from data that
 * satisfies these shapes, so TypeScript flags a typo before the browser does.
 */

/** Year and month, e.g. "2026-06". */
export type YearMonth = `${number}-${number}`;

export interface Period {
  start: YearMonth;
  /** Leave as "present" while ongoing. */
  end: YearMonth | 'present';
}

export interface Link {
  label: string;
  href: string;
}

export interface SocialLink extends Link {
  id: 'github' | 'linkedin' | 'instagram' | 'email' | 'leetcode';
  /** Shown next to the label in the contact section. */
  handle: string;
}

export type Domain = 'ai' | 'data' | 'web';

export interface Project {
  /** Used for the anchor (#project-<id>) and for cross-links. */
  id: string;
  title: string;
  subtitle?: string;
  /** Short name for the proficiency matrix column (≈ 14 characters max). */
  short: string;
  period: Period;
  domains: Domain[];
  /** Featured projects get a larger frame and a grease-pencil mark. */
  featured?: boolean;
  summary: string;
  /** The project's flow, shown as a strip of steps. */
  pipeline?: string[];
  /** A single standout number, e.g. 0.778 Macro-F1. */
  metric?: { value: string; label: string };
  details: string[];
  stack: TechName[];
  /** Repository / demo links. Leave empty until you have public URLs. */
  links: Link[];
}

export interface Experience {
  id: string;
  organization: string;
  role: string;
  period: Period;
  summary: string;
  points: string[];
  /** Notable things built in this role. */
  builds?: { title: string; text: string; projectId?: string }[];
  stack: TechName[];
  /** Adds a column for this role to the proficiency matrix. */
  inMatrix?: boolean;
  /** Short name for the proficiency matrix column. */
  short?: string;
}

export interface Education {
  id: string;
  institution: string;
  place?: string;
  qualification: string;
  /** e.g. "Pursuing". Shown instead of a score. */
  status?: string;
  /** e.g. "96.2%". Leave undefined to hide. */
  score?: string;
  years: string;
  coursework?: { group: string; courses: string[] }[];
}

export interface Achievement {
  event: string;
  /** The headline result, e.g. "18", "500+", "Semifinalist". */
  result: string;
  /** Text shown before a numeric result, e.g. "Rank" or "#". */
  resultPrefix?: string;
  detail: string;
  link?: Link;
}

export interface Certification {
  title: string;
  issuer: string;
  /** e.g. "Mar 2026" */
  date: string;
  credentialUrl?: string;
}

export interface SportsTeam {
  id: string;
  sport: 'Football' | 'Basketball';
  team: string;
  /** e.g. "Favourite club" */
  relation: string;
  nickname: string;
  home: string;
  /** Scarf stripes, in order. Shown in safelight tones until the lights come on. */
  colors: string[];
  /** Optional image path inside /public, e.g. "images/interests/real-madrid.jpg". */
  image?: string;
  imageAlt?: string;
}

export interface Show {
  id: string;
  title: string;
  years: string;
  seasons: number;
  /** Optional image path inside /public, e.g. "images/interests/friends.jpg". */
  image?: string;
  imageAlt?: string;
}

export interface Photo {
  /** Path inside /public, e.g. "images/photography/monsoon.jpg". */
  src: string;
  alt: string;
  caption?: string;
}

export interface Role {
  role: string;
  organization: string;
  /** e.g. "May 2025 – present" */
  when: string;
  note?: string;
}

export interface RoleGroup {
  title: string;
  roles: Role[];
}
