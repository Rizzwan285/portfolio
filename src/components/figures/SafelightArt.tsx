import type { CSSProperties } from 'react';
import { toSafelight } from '../../lib/safelight.ts';
import styles from './SafelightArt.module.css';

/**
 * Built-in artwork for the interest cards: a football pitch, a basketball
 * court and abstract "posters". All original drawings, painted with the
 * safelight/daylight colour pairs from SafelightArt.module.css.
 */

/** Turns daylight colours into the --dX / --nX custom properties. */
function paletteVars(day: string[]): CSSProperties {
  const vars: Record<string, string> = {};
  day.forEach((color, i) => {
    vars[`--d${i}`] = color;
    vars[`--n${i}`] = toSafelight(color);
  });
  return vars as CSSProperties;
}

/** Shared grain filter, rendered once in App. */
export function ArtDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <filter id="art-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </svg>
  );
}

function Grain() {
  return <rect className={styles.grain} width="100%" height="100%" filter="url(#art-grain)" />;
}

export function PitchArt() {
  return (
    <svg
      className={styles.art}
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid slice"
      style={paletteVars(['#1d4f2f', '#25633a', '#f4f1e8'])}
    >
      <rect className={styles.f0} width="320" height="200" />
      {[0, 64, 128, 192, 256].map((x) => (
        <rect key={x} className={styles.f1} x={x} width="32" height="200" />
      ))}
      <g className={styles.s2} strokeWidth="2" strokeLinecap="round">
        <rect x="14" y="14" width="292" height="172" />
        <line x1="160" y1="14" x2="160" y2="186" />
        <circle cx="160" cy="100" r="24" />
        <rect x="14" y="56" width="46" height="88" />
        <rect x="14" y="80" width="16" height="40" />
        <path d="M60 80.5A24 24 0 0 1 60 119.5" />
        <rect x="260" y="56" width="46" height="88" />
        <rect x="290" y="80" width="16" height="40" />
        <path d="M260 80.5A24 24 0 0 0 260 119.5" />
        <path d="M14 20a6 6 0 0 0 6-6M300 14a6 6 0 0 0 6 6M306 180a6 6 0 0 0-6 6M20 186a6 6 0 0 0-6-6" />
      </g>
      <g className={styles.f2}>
        <circle cx="160" cy="100" r="2.4" />
        <circle cx="46" cy="100" r="2" />
        <circle cx="274" cy="100" r="2" />
      </g>
      <Grain />
    </svg>
  );
}

export function CourtArt() {
  return (
    <svg
      className={styles.art}
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid slice"
      style={paletteVars(['#a8713f', '#966236', '#f7f2e8', '#7e3a22'])}
    >
      <rect className={styles.f0} width="320" height="200" />
      {[22, 58, 94, 130, 166].map((y) => (
        <rect key={y} className={styles.f1} y={y} width="320" height="10" opacity="0.6" />
      ))}
      <rect className={styles.f3} x="14" y="76" width="58" height="48" />
      <rect className={styles.f3} x="248" y="76" width="58" height="48" />
      <g className={styles.s2} strokeWidth="2" strokeLinecap="round">
        <rect x="14" y="14" width="292" height="172" />
        <line x1="160" y1="14" x2="160" y2="186" />
        <circle cx="160" cy="100" r="18" />
        <circle cx="160" cy="100" r="6" />
        <rect x="14" y="76" width="58" height="48" />
        <circle cx="72" cy="100" r="18" />
        <path d="M14 32H54.4A73.7 73.7 0 0 1 54.4 168H14" />
        <line x1="20" y1="91" x2="20" y2="109" />
        <circle cx="26" cy="100" r="3" />
        <rect x="248" y="76" width="58" height="48" />
        <circle cx="248" cy="100" r="18" />
        <path d="M306 32H265.6A73.7 73.7 0 0 0 265.6 168H306" />
        <line x1="300" y1="91" x2="300" y2="109" />
        <circle cx="294" cy="100" r="3" />
      </g>
      <Grain />
    </svg>
  );
}

const POSTER_PALETTES = [
  ['#e9b949', '#d2452b', '#2a1e1c'],
  ['#22543d', '#f0e6d2', '#d8692e'],
  ['#162f3f', '#f2a541', '#f06a2a'],
  ['#e8c872', '#1e4851', '#e2694b'],
  ['#5e4b6b', '#edb49a', '#e1626a'],
  ['#0e2e46', '#f7c04a', '#d33a2c'],
  ['#efe9d8', '#3b3f58', '#7faf92'],
];

/** Abstract poster artwork; `variant` picks one of seven compositions. */
export function PosterArt({ variant }: { variant: number }) {
  const v = ((variant % 7) + 7) % 7;
  return (
    <svg
      className={styles.art}
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
      style={paletteVars(POSTER_PALETTES[v])}
    >
      <rect className={styles.f0} width="200" height="300" />
      {v === 0 && (
        <>
          <circle className={styles.f1} cx="100" cy="196" r="72" />
          <rect className={styles.f2} y="212" width="200" height="88" />
        </>
      )}
      {v === 1 && (
        <>
          <rect className={styles.f1} x="28" y="70" width="32" height="230" />
          <rect className={styles.f1} x="84" y="120" width="32" height="180" />
          <rect className={styles.f1} x="140" y="40" width="32" height="260" />
          <circle className={styles.f2} cx="156" cy="40" r="16" />
        </>
      )}
      {v === 2 && (
        <g className={styles.s1} strokeWidth="7">
          {[22, 40, 58, 76, 94].map((r) => (
            <circle key={r} cx="100" cy="160" r={r} />
          ))}
          <circle className={styles.f2} cx="100" cy="160" r="9" stroke="none" />
        </g>
      )}
      {v === 3 && (
        <>
          <path className={styles.f1} d="M0 300 200 96V300Z" />
          <circle className={styles.f2} cx="62" cy="92" r="28" />
        </>
      )}
      {v === 4 && (
        <g className={styles.f1}>
          {Array.from({ length: 54 }, (_, i) => {
            const col = i % 6;
            const row = Math.floor(i / 6);
            const accent = col === 4 && row === 5;
            return (
              <circle
                key={i}
                className={accent ? styles.f2 : undefined}
                cx={30 + col * 28}
                cy={38 + row * 28}
                r={accent ? 10 : 5}
              />
            );
          })}
        </g>
      )}
      {v === 5 && (
        <>
          <path className={styles.f1} d="M28 300V176A72 72 0 0 1 172 176V300Z" />
          <path className={styles.f2} d="M62 300V196A38 38 0 0 1 138 196V300Z" />
        </>
      )}
      {v === 6 && (
        <>
          <path className={styles.f1} d="M22 282 100 46 178 282Z" />
          <circle className={styles.f2} cx="100" cy="206" r="22" />
        </>
      )}
      <rect className={styles.s2} x="9" y="9" width="182" height="282" strokeWidth="1" opacity="0.5" />
      <Grain />
    </svg>
  );
}
