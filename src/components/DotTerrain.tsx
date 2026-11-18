"use client";

import React, { useEffect, useRef } from "react";

/**
 * Animated dot-matrix landscape (rolling waves in perspective) with labelled pins
 * that float above the terrain and ride its motion. Pins are HTML, so they stay crisp
 * and accessible; positions are updated every frame from the projected terrain.
 */

export interface TerrainPin {
  label: string;
  sub?: string;
  /** -1 (left) … 1 (right) */
  x: number;
  /** 0 (front) … 1 (back) */
  z: number;
  /** hide on narrow screens */
  wideOnly?: boolean;
}

interface Props {
  pins: TerrainPin[];
  className?: string;
  onPinClick?: (pin: TerrainPin, index: number) => void;
  /** dot colour as "r,g,b" */
  dotRgb?: string;
  /** Tailwind classes for the pin stems */
  stemClass?: string;
}

const COLS = 90;
const ROWS = 34;

export default function DotTerrain({ pins, className = "", onPinClick, dotRgb = "74,86,52", stemClass = "bg-[#141B08]/25" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pinRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    // terrain height at normalised (x, z) and time
    const height = (x: number, z: number, t: number) =>
      Math.sin(x * 3.1 + t * 0.6) * 0.32 +
      Math.sin(z * 5.2 - t * 0.45 + x * 1.3) * 0.22 +
      Math.cos((x + z) * 2.2 + t * 0.3) * 0.18;

    // simple perspective projection; z=0 is the front edge
    const project = (x: number, y: number, z: number) => {
      const depth = 1 + z * 3.2;
      const spread = w < 640 ? 0.4 : 0.62; // keep pins on screen on phones
      const sx = w / 2 + (x * w * spread) / depth;
      const horizon = h * 0.2;
      const sy = horizon + ((h * 0.95 - horizon) - y * h * 0.16) / depth;
      return { sx, sy, scale: 1 / depth };
    };

    let raf = 0;
    let visible = true;
    const start = performance.now();
    const draw = () => {
      const t = reduced ? 0 : (performance.now() - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      for (let r = ROWS - 1; r >= 0; r--) {
        const z = r / (ROWS - 1);
        for (let c = 0; c < COLS; c++) {
          const x = (c / (COLS - 1)) * 2.4 - 1.2;
          const y = height(x, z, t);
          const p = project(x, y, z);
          const size = 0.6 + p.scale * 1.6;
          const alpha = (0.15 + p.scale * 0.6) * (0.55 + (y + 0.7) * 0.45);
          ctx.fillStyle = `rgba(${dotRgb},${Math.min(alpha, 0.9)})`;
          ctx.fillRect(p.sx - size / 2, p.sy - size / 2, size, size);
        }
      }
      // pins ride the terrain
      pins.forEach((pin, i) => {
        const el = pinRefs.current[i];
        if (!el) return;
        const y = height(pin.x, pin.z, t);
        const p = project(pin.x, y, pin.z);
        const lift = 70 + p.scale * 40;
        el.style.transform = `translate(${p.sx}px, ${p.sy - lift}px)`;
        el.style.setProperty("--stem", `${lift}px`);
        el.style.zIndex = String(Math.round(p.scale * 100));
      });
    };
    const loop = () => {
      raf = 0;
      if (!visible || document.hidden) return;
      draw();
      if (!reduced) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(loop);
    });
    io.observe(wrap);
    const onVis = () => {
      if (!document.hidden && !raf) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [pins, dotRgb]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden isolate ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
      {pins.map((pin, i) => (
        <div
          key={pin.label}
          ref={(el) => {
            pinRefs.current[i] = el;
          }}
          className={`absolute left-0 top-0 will-change-transform ${pin.wideOnly ? "hidden md:block" : ""}`}
        >
          {/* stem down to the terrain */}
          <span
            className={`absolute left-0 top-0 w-px origin-top ${stemClass}`}
            style={{ height: "var(--stem, 80px)", transform: "translateY(0)" }}
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={() => onPinClick?.(pin, i)}
            className="absolute left-0 top-0 -translate-x-1/2 -translate-y-full whitespace-nowrap inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur border border-[#141B08]/10 shadow-[0_8px_24px_-12px_rgba(20,27,8,0.4)] pl-1.5 pr-3.5 py-1.5 text-[13px] text-[#141B08] hover:border-[#6B8E23]/50 transition-colors cursor-pointer"
          >
            <span className="w-5 h-5 rounded-full bg-[#1A2309] text-[#F4D03F] text-[9px] font-semibold flex items-center justify-center">
              {pin.label.slice(0, 2)}
            </span>
            {pin.sub && <span className="text-[#4A5634]/80 hidden sm:inline">{pin.sub}</span>}
            <span className="font-semibold">{pin.label}</span>
          </button>
        </div>
      ))}
    </div>
  );
}
