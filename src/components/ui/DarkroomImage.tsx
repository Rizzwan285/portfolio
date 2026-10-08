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
  className?: string;
}

/**
 * An image slot that sits under the red safelight: monochrome red until the
 * visitor hovers it or turns the lights on (an ancestor with
 * data-lights="on"). Any photo dropped in gets the same treatment, so a
 * mixed set of images still reads as one series.
 */
export function DarkroomImage({ src, alt, fallback, className }: DarkroomImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = Boolean(src) && failedSrc !== src;

  return (
    <div className={cx(styles.frame, className)}>
      {showImage && src ? (
        <>
          <img
            className={styles.image}
            src={asset(src)}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={() => setFailedSrc(src)}
          />
          <span className={styles.safelight} aria-hidden="true" />
        </>
      ) : (
        <div className={styles.fallback} aria-hidden="true">
          {fallback}
        </div>
      )}
    </div>
  );
}
