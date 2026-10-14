/**
 * All portfolio content lives in this folder. Edit the files below and the
 * components only render what they are given.
 *
 *   profile.ts         name, intro, email, resume path, social links
 *   site.ts            page title, intro animation, section order/visibility
 *   whatIDo.ts         "What I do" disciplines
 *   experience.ts      work experience
 *   tech.ts            technology registry used by projects and proficiency
 *   education.ts       education
 *   projects.ts        projects
 *   achievements.ts    achievements
 *   certifications.ts  certifications (hidden while empty)
 *   beyond.ts          sports, sitcoms, photography, extracurriculars
 */
export { profile, socials } from './profile.ts';
export { siteMeta, intro, sections } from './site.ts';
export type { SectionKey, SectionConfig } from './site.ts';
export { whatIDo } from './whatIDo.ts';
export { experience } from './experience.ts';
export { tech, techCategories, toolkit } from './tech.ts';
export type { TechName, TechCategory } from './tech.ts';
export { education } from './education.ts';
export { projects, projectFilters } from './projects.ts';
export { achievements } from './achievements.ts';
export { certifications } from './certifications.ts';
export { beyond } from './beyond.ts';
export type * from './types.ts';
