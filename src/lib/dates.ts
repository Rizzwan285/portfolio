import type { Period, YearMonth } from '../content/types.ts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parts(value: YearMonth): [year: number, month: number] {
  const [year, month] = value.split('-').map(Number);
  return [year, month];
}

export function formatYearMonth(value: YearMonth): string {
  const [year, month] = parts(value);
  return `${MONTHS[month - 1]} ${year}`;
}

/** "Aug – Nov 2025", "Oct 2025 – Aug 2026", "Apr 2026 – present". */
export function formatPeriod(period: Period): string {
  const [startYear, startMonth] = parts(period.start);
  if (period.end === 'present') return `${formatYearMonth(period.start)} – present`;
  const [endYear] = parts(period.end);
  if (startYear === endYear) return `${MONTHS[startMonth - 1]} – ${formatYearMonth(period.end)}`;
  return `${formatYearMonth(period.start)} – ${formatYearMonth(period.end)}`;
}

/** Sort key for chronological ordering ("2025-08" → 202508). */
export function periodKey(value: YearMonth): number {
  const [year, month] = parts(value);
  return year * 100 + month;
}
