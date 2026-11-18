"use client";

import React, { useEffect, useRef, useState } from "react";
import { HERO_SERVICES } from "./three/heroServices";

/**
 * Hero visual: real-time Three.js scene with every Qubryon service orbiting a central core.
 * three.js loads lazily after mount. Without WebGL, a plain service grid is shown instead.
 */

function scrollToHref(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    let disposed = false;
    let dispose: (() => void) | undefined;

    const supportsWebGL = (() => {
      try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl2") || c.getContext("webgl"));
      } catch {
        return false;
      }
    })();
    if (!supportsWebGL) {
      setFailed(true);
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // wait for web fonts so the 3D card labels render in Geist
    Promise.all([import("./three/servicesScene"), document.fonts?.ready])
      .then(([{ createServicesScene }]) => {
        if (disposed) return;
        const scene = createServicesScene(el, {
          reducedMotion,
          onReady: () => setReady(true),
          onSelect: (svc) => scrollToHref(svc.href),
        });
        dispose = scene.dispose;
      })
      .catch(() => setFailed(true));

    return () => {
      disposed = true;
      dispose?.();
    };
  }, []);

  if (failed) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {HERO_SERVICES.map((s) => (
          <a
            key={s.id}
            href={s.href}
            className={`rounded-2xl p-4 border ${
              s.highlight ? "bg-[#F4D03F] border-[#141B08]/20" : "bg-white/80 border-[#141B08]/10"
            }`}
          >
            <div className="font-semibold text-[#141B08]">{s.title}</div>
            <div className="text-[13px] text-[#4A5634] mt-0.5">{s.subtitle}</div>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative mx-auto w-full max-w-xl lg:max-w-none aspect-square sm:aspect-[5/4] lg:aspect-square"
      role="img"
      aria-label="Interactive 3D view of Qubryon services: custom software, AI and machine learning, cloud and DevOps, data and analytics, IoT, embedded firmware and IT staff augmentation"
    >
      {/* Ambient glow */}
      <div className="absolute inset-[18%] rounded-full bg-[#F4D03F]/25 blur-[90px] pointer-events-none" />
      <div className="absolute inset-[28%] rounded-full bg-[#6B8E23]/20 blur-[70px] pointer-events-none" />

      {/* WebGL mount */}
      <div
        ref={mountRef}
        className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
      />

      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-24 rounded-full bg-[#1A2309]/70 animate-pulse" />
        </div>
      )}

      <div className="absolute bottom-0 right-2 text-[11px] text-[#4A5634]/80 hidden lg:block pointer-events-none">
        Click a service to explore
      </div>
    </div>
  );
}
