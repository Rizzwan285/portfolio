import { useEffect, useRef, useState } from 'react';
import { cx } from '../../lib/cx.ts';
import { createParticles, createRenderer, waitForFont } from './flowParticles.ts';
import styles from './IntroLoader.module.css';

interface IntroLoaderProps {
  word: string;
  durationMs: number;
  /** Called as the overlay starts to fade; the hero begins its entrance. */
  onReveal: () => void;
  /** Called once the overlay has fully faded and can be removed. */
  onDone: () => void;
}

/** How long the finished word holds before the overlay fades. */
const HOLD_MS = 520;
/** Must match the fade duration in IntroLoader.module.css. */
const EXIT_MS = 760;

/**
 * Intro: a field of noise flows into the name, then the "safelight" lifts
 * and the page develops underneath. Click, tap or press any key to skip.
 */
export function IntroLoader({ word, durationMs, onReveal, onDone }: IntroLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const finishRef = useRef<() => void>(() => {});
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      onReveal();
      onDone();
      return;
    }

    let frame = 0;
    let cancelled = false;
    let finished = false;
    let exitTimer = 0;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(frame);
      setExiting(true);
      onReveal();
      exitTimer = window.setTimeout(onDone, EXIT_MS);
    };
    finishRef.current = finish;

    const updateReadout = (t: number) => {
      const clamped = Math.min(1, t);
      if (timeRef.current) timeRef.current.textContent = clamped.toFixed(2);
      if (barRef.current) barRef.current.style.transform = `scaleX(${clamped})`;
      if (statusRef.current && clamped >= 1) statusRef.current.textContent = 'Developed';
    };

    const start = async () => {
      await waitForFont();
      if (cancelled) return;
      const draw = createRenderer(createParticles(word, width, height));
      const startedAt = performance.now();

      const tick = (now: number) => {
        const t = (now - startedAt) / durationMs;
        draw(ctx, Math.min(t, 1), now, dpr);
        updateReadout(t);
        if (now - startedAt >= durationMs + HOLD_MS) {
          finish();
          return;
        }
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    void start();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
    };
  }, [word, durationMs, onReveal, onDone]);

  // Any key or click skips the intro.
  useEffect(() => {
    const skip = () => finishRef.current();
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, []);

  return (
    <div className={cx(styles.intro, exiting && styles.exiting)}>
      <p className="visually-hidden">Loading the portfolio of {word}.</p>
      <div className={styles.glow} aria-hidden="true" />
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.readout} aria-hidden="true">
        <span ref={statusRef} className={styles.status}>
          Developing from noise
        </span>
        <span className={styles.time}>
          t = <span ref={timeRef}>0.00</span>
        </span>
        <span className={styles.bar}>
          <span ref={barRef} />
        </span>
      </div>
      <button type="button" className={styles.skip} onClick={() => finishRef.current()}>
        Skip intro
      </button>
    </div>
  );
}
