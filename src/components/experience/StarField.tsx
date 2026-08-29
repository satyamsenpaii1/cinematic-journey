import { useEffect, useRef } from "react";

/**
 * A sparse, slow, canvas-drawn night sky.
 *
 * Three depth layers drift at different speeds for parallax. When
 * `traveling` flips true, every star eases into a gentle forward warp —
 * the field feels like the camera is pushing through the night rather
 * than a sparkle effect. Honors prefers-reduced-motion by rendering a
 * single static frame.
 */

type Star = {
  /** 0..1 position in a virtual field wider/taller than the viewport */
  x: number;
  y: number;
  /** 0 (far) .. 1 (near) */
  depth: number;
  radius: number;
  baseAlpha: number;
  /** individual twinkle phase/speed — extremely slow */
  phase: number;
  twinkleSpeed: number;
};

type StarFieldProps = {
  /** 0..1 master visibility, animated by the parent */
  visibility?: number;
  /** push the field forward, camera-into-the-night */
  traveling?: boolean;
  /** extra global dim while scenes transition */
  dim?: number;
};

const LAYERS = 3;
const STARS_PER_LAYER = 26; // sparse on purpose
const DRIFT = 0.004; // fraction of viewport per second — barely moving
const WARP_EASE_SECONDS = 2.4; // how slowly warp ramps up
const WARP_SPEED = 0.55; // fraction of viewport per second at full warp

function makeStars(): Star[] {
  const stars: Star[] = [];
  for (let layer = 0; layer < LAYERS; layer++) {
    const depth = (layer + 1) / LAYERS; // 0.33, 0.66, 1
    for (let i = 0; i < STARS_PER_LAYER; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        depth,
        radius: 0.35 + depth * 1.1 * Math.random() + depth * 0.35,
        baseAlpha: 0.18 + depth * 0.5 * (0.5 + Math.random() * 0.5),
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.08 + Math.random() * 0.18,
      });
    }
  }
  return stars;
}

export function StarField({ traveling = false, dim = 0 }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const travelingRef = useRef(traveling);
  const dimRef = useRef(dim);
  travelingRef.current = traveling;
  dimRef.current = dim;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stars = makeStars();
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let warp = 0; // 0..1 eased warp intensity
    let last = performance.now();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number, dt: number, animate: boolean) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const target = travelingRef.current ? 1 : 0;
      const rate = dt / WARP_EASE_SECONDS;
      warp += (target - warp) * Math.min(1, rate * 3);
      if (Math.abs(target - warp) < 0.001) warp = target;

      const cx = width / 2;
      const cy = height / 2;
      const globalDim = 1 - dimRef.current * 0.85;
      const t = now / 1000;

      for (const s of stars) {
        if (animate) {
          // slow lateral drift, scaled by depth for parallax
          s.x += DRIFT * s.depth * dt * 0.6;
          s.y += DRIFT * s.depth * dt * 0.22;
          if (s.x > 1.05) s.x = -0.05;
          if (s.y > 1.05) s.y = -0.05;

          // forward warp: push outward from center
          if (warp > 0.001) {
            const px = s.x * width - cx;
            const py = s.y * height - cy;
            const dist = Math.hypot(px, py) || 1;
            const push = WARP_SPEED * warp * s.depth * dt * Math.max(width, height) * 0.22;
            s.x += ((px / dist) * push) / width;
            s.y += ((py / dist) * push) / height;
            // respawn near center once flung out
            if (s.x < -0.1 || s.x > 1.1 || s.y < -0.1 || s.y > 1.1) {
              s.x = 0.5 + (Math.random() - 0.5) * 0.25;
              s.y = 0.5 + (Math.random() - 0.5) * 0.25;
            }
          }
        }

        const twinkle = animate
          ? 0.75 + 0.25 * Math.sin(s.phase + t * s.twinkleSpeed * Math.PI * 2)
          : 0.9;
        const alpha = s.baseAlpha * twinkle * globalDim;
        if (alpha <= 0.01) continue;

        const px = s.x * width;
        const py = s.y * height;

        // warp elongation: faint radial streak
        if (warp > 0.05 && animate) {
          const dx = px - cx;
          const dy = py - cy;
          const dist = Math.hypot(dx, dy) || 1;
          const len = warp * s.depth * 22;
          ctx.strokeStyle = `rgba(226, 230, 244, ${alpha * 0.5})`;
          ctx.lineWidth = s.radius * 0.8;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + (dx / dist) * len, py + (dy / dist) * len);
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(232, 236, 248, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (reduced) {
      draw(performance.now(), 0, false);
    } else {
      const loop = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.1);
        last = now;
        draw(now, dt, true);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 h-full w-full"
    />
  );
}
