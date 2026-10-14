import { useState, type ReactNode } from 'react';
import { asset } from '../../lib/asset.ts';
import { cx } from '../../lib/cx.ts';
import styles from './DarkroomImage.module.css';

interface DarkroomImageProps {
  /** Path inside /public. Leave empty to show the fallback artwork. */
  src?: string;
  alt: string;
  /** Artwork shown when there is no image (or it fails to load). */
  fallback: ReactNode;
  /**
   * 'photo' keeps the picture and tints it red under the safelight.
   * 'logo' flattens a transparent wordmark to ivory, so dark logos stay
   * readable on the dark page and the whole wall reads as one set.
   */
  tone?: 'photo' | 'logo';
  className?: string;
}

/**
 * An image slot that sits under the red safelight. It stays monochrome until
 * the visitor hovers it or turns the lights on (an ancestor with
 * data-lights="on"), so a mixed set of pictures still reads as one series.
 */
export function DarkroomImage({ src, alt, fallback, tone = 'photo', className }: DarkroomImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = Boolean(src) && failedSrc !== src;

  return (
    <div className={cx(styles.frame, className)}>
      {showImage && src ? (
        <>
          <img
            className={cx(styles.image, tone === 'logo' ? styles.logo : styles.photo)}
            src={asset(src)}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={() => setFailedSrc(src)}
          />
          {tone === 'photo' && <span className={styles.safelight} aria-hidden="true" />}
        </>
      ) : (
        <div className={styles.fallback} aria-hidden="true">
          {fallback}
        </div>
      )}
    </div>
  );
}
