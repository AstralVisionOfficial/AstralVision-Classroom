import { useEffect, useRef } from "react";

/**
 * Lightweight GPU-friendly starfield. Fixed to the viewport; renders behind
 * everything at z-index -10 with pointer-events: none.
 */
export function Starfield({ density = 0.00018 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;

    type Star = { x: number; y: number; r: number; a: number; da: number; hue: number };
    let stars: Star[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(w * h * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random() * 0.7 + 0.2,
        da: (Math.random() * 0.6 + 0.2) * (Math.random() < 0.5 ? -1 : 1),
        hue: Math.random() < 0.15 ? 55 : 220,
      }));
    };

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        if (!prefersReducedMotion) {
          s.a += s.da * 0.008;
          if (s.a < 0.15) { s.a = 0.15; s.da *= -1; }
          if (s.a > 0.95) { s.a = 0.95; s.da *= -1; }
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.hue === 55
          ? `oklch(0.85 0.14 55 / ${s.a})`
          : `oklch(0.95 0.02 220 / ${s.a})`;
        ctx.fill();
      }
      if (running) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ background: "var(--gradient-hero)" }}
    />
  );
}
