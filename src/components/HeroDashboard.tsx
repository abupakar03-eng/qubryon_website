"use client";

import React from "react";
import { Activity, Cpu, Sparkles, Wifi, Thermometer, Zap } from "lucide-react";

/* Illustrative product UI for the hero: an IoT fleet dashboard. */

const LINE = [42, 46, 44, 51, 49, 55, 53, 58, 56, 61, 59, 64, 70, 66, 63, 67, 74, 88, 72, 69];
const BARS = [38, 52, 46, 61, 58, 72, 66, 54, 70, 63, 77, 68];

const DEVICES = [
  { name: "CNC-Line-04", meta: "Vibration · 4.2 mm/s", status: "Healthy", tone: "ok" as const },
  { name: "Chiller-B2", meta: "Temp · 6.8 °C", status: "Watch", tone: "warn" as const },
  { name: "Gateway-EU-12", meta: "MQTT · 18 ms", status: "Healthy", tone: "ok" as const },
];

function linePath(values: number[], w: number, h: number) {
  const max = 100;
  const stepX = w / (values.length - 1);
  return values.map((v, i) => `${i === 0 ? "M" : "L"} ${(i * stepX).toFixed(1)} ${(h - (v / max) * h).toFixed(1)}`).join(" ");
}

export default function HeroDashboard() {
  const W = 420;
  const H = 120;
  const line = linePath(LINE, W, H);
  const area = `${line} L ${W} ${H} L 0 ${H} Z`;
  const peakIndex = LINE.indexOf(Math.max(...LINE));
  const peakX = (peakIndex * W) / (LINE.length - 1);
  const peakY = H - (LINE[peakIndex] / 100) * H;

  return (
    <div className="relative mx-auto max-w-xl lg:max-w-none" aria-label="Illustration of a Qubryon IoT analytics dashboard" role="img">
      {/* Main window */}
      <div className="olive-carbon-panel rounded-3xl p-4 sm:p-5 text-[#F3ECE3]">
        {/* Window bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="ml-3 text-[13px] font-medium text-white/80">Plant telemetry · Line 4</span>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] text-[#C9DB9A]">
            <span className="hardware-led-olive animate-pulse" /> Live
          </span>
        </div>

        {/* KPI tiles */}
        <div className="grid grid-cols-3 gap-2.5 mt-4">
          {[
            { icon: Wifi, label: "Devices online", value: "1,248" },
            { icon: Zap, label: "Energy saved", value: "18.4%" },
            { icon: Activity, label: "Uptime", value: "99.98%" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-3">
              <div className="flex items-center gap-1.5 text-[11px] text-white/55">
                <Icon className="w-3.5 h-3.5" />
                <span className="truncate">{label}</span>
              </div>
              <div className="text-lg sm:text-xl font-semibold mt-1 tracking-tight">{value}</div>
            </div>
          ))}
        </div>

        {/* Line chart */}
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.07] p-3.5 mt-2.5">
          <div className="flex items-center justify-between text-[12px] mb-2">
            <span className="text-white/70">Spindle vibration (24h)</span>
            <span className="text-[#F4D03F]">Anomaly forecast</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-28" preserveAspectRatio="none">
            <defs>
              <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8BAE3A" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#8BAE3A" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((f) => (
              <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="rgba(255,255,255,0.06)" />
            ))}
            <path d={area} fill="url(#heroArea)" />
            <path d={line} fill="none" stroke="#B5CF6B" strokeWidth="2" className="hero-dash-line" vectorEffect="non-scaling-stroke" />
            <line x1={peakX} x2={peakX} y1="0" y2={H} stroke="#F4D03F" strokeDasharray="3 4" strokeOpacity="0.6" vectorEffect="non-scaling-stroke" />
            <circle cx={peakX} cy={peakY} r="4" fill="#F4D03F" />
          </svg>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-5 gap-2.5 mt-2.5">
          <div className="col-span-3 rounded-xl bg-white/[0.03] border border-white/[0.07] p-3">
            <div className="text-[12px] text-white/70 mb-2">Fleet health</div>
            <ul className="space-y-2">
              {DEVICES.map((d) => (
                <li key={d.name} className="flex items-center justify-between gap-2 text-[12px]">
                  <div className="flex items-center gap-2 min-w-0">
                    <Cpu className="w-3.5 h-3.5 text-white/40 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-white/90 truncate">{d.name}</div>
                      <div className="text-white/40 text-[11px] truncate">{d.meta}</div>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      d.tone === "ok" ? "bg-[#8BAE3A]/15 text-[#C9DB9A]" : "bg-[#F4D03F]/15 text-[#F4D03F]"
                    }`}
                  >
                    {d.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 rounded-xl bg-white/[0.03] border border-white/[0.07] p-3 flex flex-col">
            <div className="text-[12px] text-white/70 mb-2">Energy / hr</div>
            <div className="flex-1 flex items-end gap-1 min-h-[72px]">
              {BARS.map((b, i) => (
                <div
                  key={i}
                  className="hero-dash-bar flex-1 rounded-sm bg-gradient-to-t from-[#6B8E23] to-[#B5CF6B]"
                  style={{ height: `${b}%`, animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating AI alert */}
      <div className="absolute -left-4 sm:-left-10 -bottom-8 w-60 rounded-2xl bg-white/95 backdrop-blur border border-[#141B08]/10 shadow-[0_20px_50px_-20px_rgba(20,27,8,0.5)] p-3.5 hidden sm:block">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-[#141B08]">
          <span className="w-6 h-6 rounded-lg bg-[#F4D03F] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-[#141B08]" />
          </span>
          Edge AI insight
        </div>
        <p className="text-[12px] text-[#4A5634] mt-2 leading-snug">
          Bearing wear predicted on CNC-Line-04 in ~6 days. Maintenance window suggested.
        </p>
      </div>

      {/* Floating sensor chip */}
      <div className="absolute -right-3 sm:-right-6 -top-5 rounded-2xl bg-white/95 backdrop-blur border border-[#141B08]/10 shadow-[0_20px_50px_-20px_rgba(20,27,8,0.5)] px-3.5 py-2.5 hidden sm:flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-xl bg-[#6B8E23]/12 flex items-center justify-center">
          <Thermometer className="w-4 h-4 text-[#4F6B1A]" />
        </span>
        <div>
          <div className="text-[11px] text-[#4A5634]">Edge gateway</div>
          <div className="text-[13px] font-semibold text-[#141B08]">2.4M events / day</div>
        </div>
      </div>
    </div>
  );
}
