/**
 * Under a darkroom safelight only red light reaches the eye, so a colour's
 * brightness depends on its red channel alone: whites and golds glow,
 * blues go almost black. This maps any colour onto that red ramp.
 */
const DARK: [number, number, number] = [38, 12, 13];
const LIT: [number, number, number] = [255, 132, 112];

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace('#', '');
  const full = value.length === 3 ? value.replace(/./g, (c) => c + c) : value;
  const n = Number.parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function toSafelight(hex: string): string {
  const [red] = hexToRgb(hex);
  const t = Math.pow(red / 255, 1.25);
  const mix = DARK.map((d, i) => Math.round(d + (LIT[i] - d) * t));
  return `rgb(${mix.join(' ')})`;
}
