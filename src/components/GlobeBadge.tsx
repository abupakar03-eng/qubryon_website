"use client";

import React, { useEffect, useRef, useState } from "react";
import { landPoints } from "./geo/land";

/** Small rotating dot-matrix globe with live Tiruchirappalli time vs. London. */

const HQ = { lat: 10.8, lon: 78.7 };

function minutesIn(tz: string, d: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz }).formatToParts(d);
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return h * 60 + m;
}

function aheadOfLondon(d: Date) {
  let diff = minutesIn("Asia/Kolkata", d) - minutesIn("Europe/London", d);
  if (diff > 720) diff -= 1440;
  if (diff < -720) diff += 1440;
  const h = Math.floor(Math.abs(diff) / 60);
  const m = Math.abs(diff) % 60;
  const span = m ? `${h}h ${m}m` : `${h} hours`;
  return `${span} ${diff >= 0 ? "ahead of" : "behind"} London`;
}

export default function GlobeBadge() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const SIZE = 64;
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);
    const land = landPoints(4.5);
    const R = SIZE / 2 - 3;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // start with India facing the viewer
    let rot = HQ.lon - 10;
    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.beginPath();
      ctx.arc(SIZE / 2, SIZE / 2, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(237,230,218,0.28)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const project = (lat: number, lon: number) => {
        const la = (lat * Math.PI) / 180;
        const lo = ((lon - rot) * Math.PI) / 180;
        return { x: Math.cos(la) * Math.sin(lo), y: Math.sin(la), z: Math.cos(la) * Math.cos(lo) };
      };
      for (const p of land) {
        const v = project(p.lat, p.lon);
        if (v.z <= 0) continue;
        ctx.fillStyle = `rgba(237,230,218,${0.25 + v.z * 0.7})`;
        ctx.fillRect(SIZE / 2 + v.x * R - 0.7, SIZE / 2 - v.y * R - 0.7, 1.4, 1.4);
      }
      const hq = project(HQ.lat, HQ.lon);
      if (hq.z > 0) {
        ctx.beginPath();
        ctx.arc(SIZE / 2 + hq.x * R, SIZE / 2 - hq.y * R, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#F4D03F";
        ctx.fill();
      }
    };

    // animate only while on screen and the tab is visible
    let visible = true;
    const loop = () => {
      raf = 0;
      if (!visible || document.hidden) return;
      rot += 0.12;
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!reduced && !raf) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);
    const onVisibility = () => !document.hidden && start();
    document.addEventListener("visibilitychange", onVisibility);
    draw();
    start();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const time = now
    ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }).format(now)
    : "--:--";

  return (
    <div className="inline-flex items-center gap-4">
      <canvas ref={canvasRef} className="w-16 h-16 shrink-0" aria-hidden="true" />
      <div className="text-left">
        <div className="text-[15px] text-[#F3ECE3]">
          <span className="font-semibold">Tiruchirappalli, India</span>{" "}
          <span className="tabular-nums text-[#F3ECE3]/60">{time}</span>
        </div>
        <div className="text-[13px] text-[#F3ECE3]/75 mt-0.5">
          {now ? aheadOfLondon(now) : " "} · serving clients worldwide
        </div>
      </div>
    </div>
  );
}
