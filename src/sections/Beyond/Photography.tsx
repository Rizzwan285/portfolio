import { Camera } from 'lucide-react';
import { useEffect, useState, type CSSProperties } from 'react';
import { Button } from '../../components/ui/Button.tsx';
import { DarkroomImage } from '../../components/ui/DarkroomImage.tsx';
import { Develop } from '../../components/ui/Develop.tsx';
import { beyond } from '../../content/beyond.ts';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.ts';
import { cx } from '../../lib/cx.ts';
import { toSafelight } from '../../lib/safelight.ts';
import blockStyles from './Beyond.module.css';
import styles from './Photography.module.css';

/** Out-of-focus city lights for the empty viewfinder (x, y, size, colour). */
const BOKEH: [number, number, number, string][] = [
  [12, 28, 16, '#f4b860'],
  [26, 64, 22, '#e9783d'],
  [41, 22, 12, '#f7d488'],
  [55, 70, 26, '#5fa8a0'],
  [68, 34, 18, '#f2a65a'],
  [80, 66, 14, '#f7e3b1'],
  [90, 24, 20, '#d9614c'],
  [34, 86, 12, '#f4b860'],
  [74, 88, 16, '#82c0b6'],
];

/**
 * Photography, framed in a camera viewfinder. Hovering racks the focus;
 * the button fires the shutter and opens the album. Add photos in
 * content/beyond.ts and they play inside the viewfinder.
 */
export function Photography() {
  const { text, albumUrl, cta, photos } = beyond.photography;
  const [current, setCurrent] = useState(0);
  const [shots, setShots] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (photos.length < 2 || reducedMotion) return;
    const id = window.setInterval(() => setCurrent((i) => (i + 1) % photos.length), 4500);
    return () => window.clearInterval(id);
  }, [photos.length, reducedMotion]);

  return (
    <section className={blockStyles.block} aria-labelledby="beyond-photography">
      <Develop className={cx(styles.viewfinder, 'lights-scope')}>
        <div className={styles.scene}>
          {photos.length > 0 ? (
            photos.map((photo, i) => (
              <DarkroomImage
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                fallback={null}
                className={cx(styles.slide, i === current && styles.current)}
              />
            ))
          ) : (
            <div className={styles.bokeh} aria-hidden="true">
              {BOKEH.map(([x, y, size, color]) => (
                <span
                  key={`${x}-${y}`}
                  style={
                    {
                      left: `${x}%`,
                      top: `${y}%`,
                      '--size': `${size}%`,
                      '--day': color,
                      '--night': toSafelight(color),
                    } as CSSProperties
                  }
                />
              ))}
            </div>
          )}
        </div>

        <div className={styles.hud} aria-hidden="true">
          <span className={styles.thirds} />
          <span className={styles.focus} />
          <div className={styles.readouts}>
            <span>M</span>
            <span>1/250</span>
            <span>f/2.8</span>
            <span>ISO 400</span>
          </div>
          <div className={styles.meter}>
            <span>−2</span>
            <span>−1</span>
            <span>0</span>
            <span>+1</span>
            <span>+2</span>
          </div>
          <span className={styles.count}>{photos.length > 0 ? `${current + 1}/${photos.length}` : '[36]'}</span>
        </div>

        <div className={styles.copy}>
          <h3 id="beyond-photography" className={styles.title}>
            Photography
          </h3>
          <p className={styles.text}>{text}</p>
          <Button href={albumUrl} icon={<Camera />} onClick={() => setShots((n) => n + 1)}>
            {cta}
          </Button>
        </div>

        {shots > 0 && <span key={shots} className={styles.flash} aria-hidden="true" />}
      </Develop>

      {photos.length > 0 && (
        <ul role="list" className={styles.sheet} aria-label="Photographs">
          {photos.map((photo, i) => (
            <li key={photo.src} className="lights-scope">
              <button
                type="button"
                className={cx(styles.thumb, i === current && styles.thumbActive)}
                onClick={() => setCurrent(i)}
                aria-label={`Show photo ${i + 1}: ${photo.alt}`}
                aria-pressed={i === current}
              >
                <DarkroomImage src={photo.src} alt="" fallback={null} className={styles.thumbImage} />
              </button>
              {photo.caption && <p className={styles.caption}>{photo.caption}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
