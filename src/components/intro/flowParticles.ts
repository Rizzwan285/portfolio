/**
 * The maths behind the intro animation.
 *
 * Every particle starts as a sample of 2-D Gaussian noise and travels a
 * straight path to a point on the rasterised word — the same picture as
 * flow matching / rectified flow, where noise is transported to data along
 * (nearly) straight lines as time t goes from 0 to 1.
 */
export interface Particle {
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  /** When this particle starts moving, as a fraction of the timeline. */
  delay: number;
  phase: number;
  /** Amplitude of the residual "noise" wobble, which decays to zero. */
  wobble: number;
  size: number;
  /** Particles of the full stop stay safelight red. */
  hot: boolean;
}

const FONT_FAMILY = '"Archivo Variable", "Archivo", ui-sans-serif, system-ui, sans-serif';

/** Fraction of the timeline each particle spends travelling. */
export const TRAVEL = 0.62;

export async function waitForFont(timeoutMs = 900): Promise<void> {
  if (!('fonts' in document)) return;
  try {
    await Promise.race([
      document.fonts.load(`800 100px ${FONT_FAMILY}`),
      new Promise((resolve) => window.setTimeout(resolve, timeoutMs)),
    ]);
  } catch {
    /* fall back to whatever font is available */
  }
}

function gaussian(): number {
  // Box–Muller transform
  let u = 0;
  while (u === 0) u = Math.random();
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

interface Target {
  x: number;
  y: number;
  hot: boolean;
  /** Sampling gap in px — particle size scales with it. */
  gap: number;
}

/** Rasterises `word` + "." and samples points on the glyphs. */
function sampleWord(word: string, width: number, height: number): Target[] {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];

  const setFont = (size: number) => {
    ctx.font = `800 ${size}px ${FONT_FAMILY}`;
    if ('fontStretch' in ctx) ctx.fontStretch = 'extra-condensed';
  };

  setFont(100);
  const unitWidth = ctx.measureText(word).width + ctx.measureText('.').width;
  const size = Math.min((width * 0.8) / (unitWidth / 100), height * 0.4, 380);

  setFont(size);
  const wordWidth = ctx.measureText(word).width;
  const total = wordWidth + ctx.measureText('.').width;
  const left = (width - total) / 2;
  const baseline = height * 0.47 + size * 0.34;

  ctx.fillStyle = '#ff0000';
  ctx.fillText(word, left, baseline);
  ctx.fillStyle = '#00ff00';
  ctx.fillText('.', left + wordWidth, baseline);

  const top = Math.max(0, Math.floor(baseline - size));
  const boxHeight = Math.min(height - top, Math.ceil(size * 1.3));
  const boxLeft = Math.max(0, Math.floor(left - 4));
  const boxWidth = Math.min(width - boxLeft, Math.ceil(total + 8));
  if (boxWidth <= 0 || boxHeight <= 0) return [];

  const { data } = ctx.getImageData(boxLeft, top, boxWidth, boxHeight);
  const gap = Math.max(2, Math.round(size / 60));
  const targets: Target[] = [];

  for (let y = 0; y < boxHeight; y += gap) {
    for (let x = 0; x < boxWidth; x += gap) {
      const i = (y * boxWidth + x) * 4;
      if (data[i + 3] > 140) {
        targets.push({
          x: boxLeft + x + (Math.random() - 0.5) * gap * 0.6,
          y: top + y + (Math.random() - 0.5) * gap * 0.6,
          hot: data[i + 1] > data[i],
          gap,
        });
      }
    }
  }

  // Cap the count for performance; thinning a grid by k widens its spacing by √k.
  const max = width < 700 ? 1500 : 3400;
  if (targets.length > max) {
    const spacing = gap * Math.sqrt(targets.length / max);
    for (let i = targets.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [targets[i], targets[j]] = [targets[j], targets[i]];
    }
    targets.length = max;
    for (const target of targets) target.gap = spacing;
  }
  return targets;
}

export function createParticles(word: string, width: number, height: number): Particle[] {
  const sigma = Math.min(width, height) * 0.3;
  return sampleWord(word, width, height).map(({ x, y, hot, gap }) => ({
    sx: width / 2 + gaussian() * sigma * 1.35,
    sy: height / 2 + gaussian() * sigma,
    tx: x,
    ty: y,
    // A slight left-to-right sweep plus randomness, so the word "reads" in.
    delay: (x / width) * 0.14 + Math.random() * (1 - TRAVEL - 0.14),
    phase: Math.random() * Math.PI * 2,
    wobble: 3 + Math.random() * 11,
    size: gap * (0.38 + Math.random() * 0.26),
    hot,
  }));
}

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Colour ramp from safelight-dim red (noise) to print ivory (settled). */
const STEPS = 7;
const RAMP = Array.from({ length: STEPS }, (_, i) => {
  const k = i / (STEPS - 1);
  const from = [196, 62, 48];
  const to = [243, 232, 221];
  const [r, g, b] = from.map((f, c) => Math.round(f + (to[c] - f) * k));
  const alpha = 0.62 + 0.38 * k;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
});
const HOT = 'rgb(255, 74, 58)';

/**
 * Returns a draw function for the given particles. Buffers are allocated
 * once, so the animation loop produces no garbage.
 */
export function createRenderer(particles: Particle[]) {
  const positions = new Float32Array(particles.length * 3);
  const buckets: number[][] = Array.from({ length: STEPS + 1 }, () => []);

  /** Draws the field at time t ∈ [0, 1]. */
  return function draw(ctx: CanvasRenderingContext2D, t: number, now: number, dpr: number): void {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (const bucket of buckets) bucket.length = 0;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const local = Math.min(1, Math.max(0, (t - p.delay) / TRAVEL));
      const e = easeInOutCubic(local);
      const residual = (1 - e) * (1 - e) * p.wobble;
      positions[i * 3] = p.sx + (p.tx - p.sx) * e + Math.sin(now * 0.003 + p.phase) * residual;
      positions[i * 3 + 1] = p.sy + (p.ty - p.sy) * e + Math.cos(now * 0.0026 + p.phase * 1.3) * residual;
      positions[i * 3 + 2] = p.size * (0.85 + 0.45 * e);
      buckets[p.hot ? STEPS : Math.min(STEPS - 1, Math.floor(e * STEPS))].push(i);
    }

    for (let b = 0; b <= STEPS; b++) {
      const list = buckets[b];
      if (list.length === 0) continue;
      ctx.fillStyle = b === STEPS ? HOT : RAMP[b];
      for (const i of list) {
        const s = positions[i * 3 + 2] * dpr;
        ctx.fillRect(positions[i * 3] * dpr - s / 2, positions[i * 3 + 1] * dpr - s / 2, s, s);
      }
    }
  };
}
