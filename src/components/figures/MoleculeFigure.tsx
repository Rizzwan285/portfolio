import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../hooks/usePrefersReducedMotion.ts';
import { molecule, type Element } from '../../lib/molecule.data.ts';
import styles from './MoleculeFigure.module.css';

const ATOM_STYLE: Record<Element, { radius: number; fill: string; glow?: string }> = {
  C: { radius: 4.4, fill: '243, 232, 221' },
  N: { radius: 5.4, fill: '255, 160, 140', glow: 'rgba(255, 140, 120, 0.55)' },
  O: { radius: 6, fill: '255, 74, 58', glow: 'rgba(255, 74, 58, 0.75)' },
};

const CAMERA = 3.2;
/** The molecule lies on a diagonal and rolls around its own long axis. */
const TILT = -0.5;
const AUTO_SPEED = 0.00035; // radians per ms

/**
 * A slowly rotating ball-and-stick model of imatinib, drawn on a canvas
 * with simple perspective and depth fog. Drag (or swipe) to spin it.
 * Rendering pauses whenever the figure is off-screen or the tab is hidden.
 */
export function MoleculeFigure() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = prefersReducedMotion();
    const state = {
      /** Roll around the molecule's long axis (auto + vertical drags). */
      spin: 0.4,
      /** Turn around the vertical axis (horizontal drags); eases back to 0. */
      yaw: 0,
      velocity: 0,
      dragging: false,
      lastX: 0,
      lastY: 0,
      visible: true,
      width: 0,
      height: 0,
      dpr: 1,
      last: performance.now(),
      frame: 0,
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.width = rect.width;
      state.height = rect.height;
      canvas.width = Math.round(rect.width * state.dpr);
      canvas.height = Math.round(rect.height * state.dpr);
      draw();
    };

    const projected = molecule.atoms.map(() => ({ x: 0, y: 0, z: 0, s: 1 }));

    function draw() {
      if (!ctx) return;
      const { width, height, dpr, yaw, spin } = state;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const scale = Math.min(width, height) * 0.46;
      const cx = width / 2;
      const cy = height / 2;
      const cosS = Math.cos(spin);
      const sinS = Math.sin(spin);
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosT = Math.cos(TILT);
      const sinT = Math.sin(TILT);

      molecule.atoms.forEach((atom, i) => {
        const [x0, y0, z0] = atom.p;
        // roll around x (the long axis)
        const y1 = y0 * cosS - z0 * sinS;
        const z1 = y0 * sinS + z0 * cosS;
        // turn around y
        const x2 = x0 * cosY + z1 * sinY;
        const z2 = -x0 * sinY + z1 * cosY;
        // lay it on the diagonal (rotate in the screen plane)
        const x3 = x2 * cosT - y1 * sinT;
        const y3 = x2 * sinT + y1 * cosT;
        const s = CAMERA / (CAMERA - z2);
        projected[i] = { x: cx + x3 * s * scale, y: cy + y3 * s * scale, z: z2, s };
      });

      const fog = (z: number) => 0.28 + 0.72 * ((z + 1) / 2);

      // Bonds, far to near
      const bonds = [...molecule.bonds].sort(
        (a, b) => projected[a[0]].z + projected[a[1]].z - (projected[b[0]].z + projected[b[1]].z),
      );
      ctx.lineCap = 'round';
      for (const [from, to, order] of bonds) {
        const a = projected[from];
        const b = projected[to];
        const depth = fog((a.z + b.z) / 2);
        ctx.strokeStyle = `rgba(243, 232, 221, ${0.18 + 0.5 * depth})`;
        ctx.lineWidth = 1.5 * ((a.s + b.s) / 2);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        if (order > 1) {
          // Second line for double/aromatic bonds, offset perpendicular to the bond.
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const len = Math.hypot(dx, dy) || 1;
          const ox = (-dy / len) * 3.2;
          const oy = (dx / len) * 3.2;
          ctx.strokeStyle = `rgba(243, 232, 221, ${(order === 2 ? 0.5 : 0.22) * depth})`;
          ctx.setLineDash(order === 2 ? [] : [3, 3]);
          ctx.beginPath();
          ctx.moveTo(a.x + ox * 0.6 + dx * 0.12, a.y + oy * 0.6 + dy * 0.12);
          ctx.lineTo(b.x + ox * 0.6 - dx * 0.12, b.y + oy * 0.6 - dy * 0.12);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Atoms, far to near
      const order = projected.map((_, i) => i).sort((a, b) => projected[a].z - projected[b].z);
      for (const i of order) {
        const p = projected[i];
        const look = ATOM_STYLE[molecule.atoms[i].e];
        const depth = fog(p.z);
        ctx.shadowBlur = look.glow ? 12 * depth : 0;
        ctx.shadowColor = look.glow ?? 'transparent';
        ctx.fillStyle = `rgba(${look.fill}, ${0.35 + 0.65 * depth})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, look.radius * p.s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    const loop = (now: number) => {
      const dt = Math.min(48, now - state.last);
      state.last = now;
      if (!state.dragging) {
        state.spin += state.velocity * dt + (reduced ? 0 : AUTO_SPEED * dt);
        state.velocity *= Math.pow(0.94, dt / 16);
        state.yaw *= Math.pow(0.96, dt / 16);
      }
      draw();
      state.frame = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (state.frame || !state.visible || document.hidden) return;
      state.last = performance.now();
      state.frame = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      cancelAnimationFrame(state.frame);
      state.frame = 0;
    };

    const onPointerDown = (event: PointerEvent) => {
      state.dragging = true;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      state.velocity = 0;
      canvas.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!state.dragging) return;
      const dx = event.clientX - state.lastX;
      const dy = event.clientY - state.lastY;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      state.yaw = Math.max(-1.3, Math.min(1.3, state.yaw + dx * 0.008));
      state.spin += dy * 0.009;
      state.velocity = dy * 0.0006;
      if (!state.frame) draw();
    };
    const onPointerUp = (event: PointerEvent) => {
      state.dragging = false;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    };
    const onVisibility = () => (document.hidden ? stopLoop() : startLoop());

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      state.visible = entry.isIntersecting;
      if (state.visible) startLoop();
      else stopLoop();
    });
    intersection.observe(canvas);

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    document.addEventListener('visibilitychange', onVisibility);

    resize();
    startLoop();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersection.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      role="img"
      aria-label={`A rotating 3D model of the ${molecule.name.toLowerCase()} molecule. Drag to turn it.`}
    />
  );
}
