import type { Domain } from '../../content/types.ts';

export const DOMAIN_LABELS: Record<Domain, string> = {
  ai: 'AI and ML',
  data: 'Data',
  web: 'Full-stack',
};

export function domainList(domains: Domain[]): string {
  return domains.map((d) => DOMAIN_LABELS[d]).join(', ');
}
