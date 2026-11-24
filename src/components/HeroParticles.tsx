"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { PARTICLE_SHAPES, SHAPE_DURATION } from "./three/particleScene";

/**
 * Particle point-cloud that morphs through each Qubryon service.
 * three.js loads lazily after mount; without WebGL only the caption list is shown.
 */
export default function HeroParticles() {
  const mountRef = useRef<HTMLDivElement>(null);
  const goToRef = useRef<((i: number) => void) | null>(null);
  const setPausedRef = useRef<((p: boolean) => void) | null>(null);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    let disposed = false;
    let dispose: (() => void) | undefined;

    const ok = (() => {
      try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl2") || c.getContext("webgl"));
      } catch {
        return false;
      }
    })();
    if (!ok) {
      setFailed(true);
      return;
    }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(reducedMotion);

    Promise.all([import("./three/particleScene"), document.fonts?.ready])
      .then(([{ createParticleScene }]) => {
        if (disposed) return;
        const s = createParticleScene(el, {
          reducedMotion,
          onReady: () => setReady(true),
          onShapeChange: setIndex,
        });
        goToRef.current = s.goTo;
        setPausedRef.current = s.setPaused;
        dispose = s.dispose;
      })
      .catch(() => setFailed(true));

    return () => {
      disposed = true;
      dispose?.();
    };
  }, []);

  const active = PARTICLE_SHAPES[index];

  const togglePaused = () => {
    const next = !paused;
    setPaused(next);
    setPausedRef.current?.(next);
  };

  return (
    <div className="relative w-full">
      {!failed && (
        <div
          className="relative mx-auto w-full max-w-[560px] aspect-square"
          role="img"
          aria-label={`Particle animation illustrating Qubryon services. Currently showing: ${active.label}`}
        >
          <div className="absolute inset-[20%] rounded-full bg-[#F4D03F]/10 blur-[80px] pointer-events-none" />
          <div
            ref={mountRef}
            className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      )}

      {/* Caption: current service + selector */}
      <div className="mx-auto w-full max-w-[560px] mt-2">
        <div className="flex items-end justify-between gap-4">
          <a href={active.href} className="group min-w-0">
            <div className="text-[11px] uppercase text-[#F3ECE3]/45 tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(PARTICLE_SHAPES.length).padStart(2, "0")}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-lg text-[#F3ECE3] group-hover:text-[#F4D03F] transition-colors">
              <span className="truncate">{active.label}</span>
              <ArrowUpRight className="w-4 h-4 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
          <div className="flex items-center gap-3 pb-0.5">
            <div className="flex items-center gap-1.5" role="group" aria-label="Choose a theme">
              {PARTICLE_SHAPES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={i === index}
                  aria-label={s.label}
                  onClick={() => goToRef.current?.(i)}
                  className="h-6 flex items-center cursor-pointer"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-[width,background-color] ${
                      i === index ? "w-6 bg-[#F4D03F]" : "w-1.5 bg-[#F3ECE3]/30 hover:bg-[#F3ECE3]/60"
                    }`}
                  />
                </button>
              ))}
            </div>
            {!reduced && !failed && (
              <button
                type="button"
                onClick={togglePaused}
                aria-label={paused ? "Play animation" : "Pause animation"}
                className="w-8 h-8 rounded-full border border-[#F3ECE3]/25 bg-white/5 text-[#F3ECE3] flex items-center justify-center hover:bg-white/15 hover:border-[#F3ECE3]/50 transition-colors cursor-pointer"
              >
                {paused ? <Play className="w-3.5 h-3.5" aria-hidden="true" /> : <Pause className="w-3.5 h-3.5" aria-hidden="true" />}
              </button>
            )}
          </div>
        </div>
        <div className="mt-3 h-px w-full bg-[#F3ECE3]/12 overflow-hidden">
          {!reduced && !failed && (
            <div
              key={index}
              className="hero-progress h-full bg-[#F4D03F]/70"
              style={{ animationDuration: `${SHAPE_DURATION}s`, animationPlayState: paused ? "paused" : "running" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
