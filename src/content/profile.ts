import type { SocialLink } from './types.ts';

/**
 * Who you are. The hero, navigation, contact section and page metadata
 * all read from here.
 */
export const profile = {
  firstName: 'Muhamed',
  middleName: 'Rizwan',
  lastName: 'Mehaboob',
  /** Used in the logo and the intro animation. */
  shortName: 'Rizwan',
  fullName: 'Muhamed Rizwan Mehaboob',

  role: 'Data Science and Engineering student',
  institution: 'IIT Palakkad',
  location: 'Palakkad, Kerala',
  /** IANA time zone for the live clock in the contact section. */
  timeZone: 'Asia/Kolkata',
  timeZoneLabel: 'IST',

  /** The one line under the name in the hero. Keep it short. */
  intro:
    'I build things that learn. Data in, something useful out, and an app on top that people actually end up using.',

  /**
   * Portrait in the hero. Drop a square file in public/images/ (a Bitmoji
   * export, a cutout photo) and point this at it, e.g. 'images/avatar.png'.
   * Leave it empty to keep the drawn one in Avatar.tsx.
   */
  avatar: '',

  email: 'muhamed.rizwan2005@gmail.com',

  /** Path inside /public. Replace the PDF in public/resume/ to update it. */
  resume: 'resume/Muhamed_Rizwan_Mehaboob_Resume.pdf',
};

/** Social links, in the order they appear in the hero and contact section. */
export const socials: SocialLink[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'muhamed-rizwan-mehaboob',
    href: 'https://www.linkedin.com/in/muhamed-rizwan-mehaboob-7068b4290/',
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: 'Rizzwan285',
    href: 'https://github.com/Rizzwan285',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@_rizz._wan_',
    href: 'https://www.instagram.com/_rizz._wan_/',
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'muhamed.rizwan2005@gmail.com',
    href: 'mailto:muhamed.rizwan2005@gmail.com',
  },
];
