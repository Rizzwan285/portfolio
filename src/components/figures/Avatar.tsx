import { useState } from 'react';
import { profile } from '../../content/profile.ts';
import { asset } from '../../lib/asset.ts';
import { cx } from '../../lib/cx.ts';
import styles from './Avatar.module.css';

interface AvatarProps {
  className?: string;
}

/**
 * The portrait in the hero.
 *
 * Drop a file at the path named by `profile.avatar` (a Bitmoji export, a
 * cutout photo, anything square with a transparent or dark background) and
 * it is used as-is. Until then the drawn one below stands in, so the hero
 * never has a hole in it.
 */
export function Avatar({ className }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const src = profile.avatar;

  return (
    <div className={cx(styles.avatar, className)}>
      <span className={styles.halo} aria-hidden="true" />
      <span className={styles.ring} aria-hidden="true" />
      {src && !failed ? (
        <img
          className={styles.photo}
          src={asset(src)}
          alt={`${profile.fullName}, portrait`}
          width={240}
          height={240}
          onError={() => setFailed(true)}
        />
      ) : (
        <DrawnAvatar />
      )}
    </div>
  );
}

/** A flat, hand-built portrait. No photo needed, and it scales to any size. */
function DrawnAvatar() {
  return (
    <svg className={styles.drawn} viewBox="0 0 240 240" role="img" aria-label={`${profile.fullName}, illustrated portrait`}>
      <defs>
        <clipPath id="avatar-clip">
          <circle cx="120" cy="120" r="108" />
        </clipPath>
        <linearGradient id="avatar-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a1a1b" />
          <stop offset="100%" stopColor="#1d0d0e" />
        </linearGradient>
        <linearGradient id="avatar-shirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3e8dd" />
          <stop offset="100%" stopColor="#d9c6bc" />
        </linearGradient>
      </defs>

      <g clipPath="url(#avatar-clip)">
        <circle cx="120" cy="120" r="108" fill="url(#avatar-bg)" />

        {/* Shoulders and collar */}
        <path d="M34 240c0-40 30-66 86-66s86 26 86 66z" fill="url(#avatar-shirt)" />
        <path d="M100 176c6 12 13 18 20 18s14-6 20-18l-12-5h-16z" fill="#c9b4a9" />

        {/* Neck */}
        <path d="M104 148h32v26c0 9-7 14-16 14s-16-5-16-14z" fill="#9c6646" />

        {/* Ears sit behind the head, so only their outer edge shows. */}
        <ellipse cx="82" cy="116" rx="7.5" ry="10.5" fill="#a76d49" />
        <ellipse cx="158" cy="116" rx="7.5" ry="10.5" fill="#a76d49" />

        {/* Head */}
        <ellipse cx="120" cy="112" rx="39" ry="46" fill="#b2764f" />

        {/* Hair: short, with a little volume on top */}
        <path
          d="M81 108c-4-33 15-52 39-52s43 19 39 52c-2-15-8-23-16-26-9 8-21 11-36 9-13-2-21 2-26 10-2 3-4 6-5 7z"
          fill="#231312"
        />

        {/* Brows */}
        <path d="M98 104c5-4 13-4 18-1" stroke="#231312" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M124 103c5-3 13-3 18 1" stroke="#231312" strokeWidth="4.5" strokeLinecap="round" fill="none" />

        {/* Eyes */}
        <ellipse cx="106" cy="117" rx="4.6" ry="5.4" fill="#231312" />
        <ellipse cx="134" cy="117" rx="4.6" ry="5.4" fill="#231312" />
        <circle cx="107.6" cy="115.2" r="1.5" fill="#f3e8dd" opacity="0.9" />
        <circle cx="135.6" cy="115.2" r="1.5" fill="#f3e8dd" opacity="0.9" />

        {/* Nose and smile */}
        <path d="M120 122v9c0 2-2 4-4 4" stroke="#8d5637" strokeWidth="3.2" strokeLinecap="round" fill="none" />
        <path d="M108 141c4 5 20 5 25 0" stroke="#7d4a2f" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
