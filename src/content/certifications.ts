import type { Certification } from './types.ts';

/**
 * Certifications. The resume doesn't list any yet, so this starts empty and
 * the section stays hidden (see `sections` in site.ts) until you add one:
 *
 *   {
 *     title: 'Name of the certificate',
 *     issuer: 'Issuing organization',
 *     date: 'Mon YYYY',
 *     credentialUrl: 'https://link-to-the-credential',
 *   },
 */
export const certifications: Certification[] = [];
