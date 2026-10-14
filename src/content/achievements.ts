import type { Achievement } from './types.ts';

/**
 * Achievements, shown as a results table. Numeric results count up when
 * they scroll into view; text results (like "Semifinalist") show as-is.
 */
export const achievements: Achievement[] = [
  {
    event: 'Inter IIT Tech Meet 14.0',
    resultPrefix: 'Rank',
    result: '18',
    detail: 'Represented IIT Palakkad on the Adobe problem statement.',
  },
  {
    event: 'Flipkart GRiD 8.0',
    result: 'Semifinalist',
    detail: 'AI Engineering track, competing with participants nationwide.',
  },
  {
    event: 'LeetCode',
    result: 'Knight',
    detail: 'Earned the Knight badge, which sits in the top 5% of contest ratings.',
  },
  {
    event: 'LeetCode',
    result: '500+',
    detail: 'Problems solved.',
  },
];
