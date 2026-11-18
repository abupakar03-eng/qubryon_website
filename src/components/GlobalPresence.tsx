"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Globe, Clock, ShieldCheck, Coins, Handshake } from "lucide-react";
import { LAND_BANDS } from "./geo/land";

/* ----------------------------------------------------------
   Stylised dot-matrix world map (equirectangular projection)
   Land is described as longitude ranges per 6° latitude band.
   ---------------------------------------------------------- */
const MAP_W = 900;
const MAP_H = 330;
const LAT_TOP = 78;
const LAT_BOTTOM = -54;


const project = (lon: number, lat: number) => ({
  x: ((lon + 180) / 360) * MAP_W,
  y: ((LAT_TOP - lat) / (LAT_TOP - LAT_BOTTOM)) * MAP_H,
});

function buildLandDots() {
  const dots: { x: number; y: number }[] = [];
  const step = 4;
  for (let lat = LAT_TOP - step / 2; lat > LAT_BOTTOM; lat -= step) {
    const band = LAND_BANDS.find((b) => lat <= b.top && lat > b.top - 6);
    if (!band) continue;
    for (let lon = -180 + step / 2; lon < 180; lon += step) {
      if (band.ranges.some(([a, b]) => lon >= a && lon <= b)) {
        dots.push(project(lon, lat));
      }
    }
  }
  return dots;
}

const HQ = { name: "Tiruchirappalli HQ", lon: 78.7, lat: 10.8 };

type Anchor = "start" | "middle" | "end";
const HUBS: { name: string; lon: number; lat: number; dx: number; dy: number; anchor: Anchor }[] = [
  { name: "San Francisco", lon: -122.4, lat: 37.8, dx: 0, dy: -9, anchor: "middle" },
  { name: "New York", lon: -74, lat: 40.7, dx: 0, dy: -9, anchor: "middle" },
  { name: "London", lon: -0.1, lat: 51.5, dx: -6, dy: -6, anchor: "end" },
  { name: "Frankfurt", lon: 8.7, lat: 50.1, dx: 6, dy: 14, anchor: "start" },
  { name: "Dubai", lon: 55.3, lat: 25.2, dx: -6, dy: 4, anchor: "end" },
  { name: "Singapore", lon: 103.8, lat: 1.35, dx: 8, dy: 4, anchor: "start" },
  { name: "Sydney", lon: 151.2, lat: -33.9, dx: 0, dy: 16, anchor: "middle" },
];

/* ----------------------------------------------------------
   Regions served, with live local clocks
   ---------------------------------------------------------- */
const REGIONS = [
  { region: "North America", city: "New York", tz: "America/New_York", overlap: "08:00 – 11:30 ET" },
  { region: "UK & Europe", city: "London", tz: "Europe/London", overlap: "09:00 – 15:00 GMT" },
  { region: "Middle East (GCC)", city: "Dubai", tz: "Asia/Dubai", overlap: "Full business day" },
  { region: "Asia Pacific", city: "Singapore", tz: "Asia/Singapore", overlap: "Full business day" },
  { region: "Australia & NZ", city: "Sydney", tz: "Australia/Sydney", overlap: "10:00 – 17:00 AEST" },
  { region: "Global HQ — India", city: "Tiruchirappalli", tz: "Asia/Kolkata", overlap: "Delivery center" },
];

const PILLARS = [
  {
    icon: Clock,
    title: "Follow-the-Sun Delivery",
    body: "Engineering pods with planned time-zone overlap for US, UK/EU, GCC and APAC teams, plus async hand-offs so work moves while you sleep.",
  },
  {
    icon: ShieldCheck,
    title: "Data Protection by Design",
    body: "Engagements structured around GDPR, CCPA and India's DPDP Act requirements, with NDA and full IP assignment under your preferred jurisdiction.",
  },
  {
    icon: Coins,
    title: "Flexible Global Commercials",
    body: "Invoicing in USD, EUR, GBP, AED or INR. Fixed-bid, time & material or dedicated-team models with transparent monthly reporting.",
  },
  {
    icon: Handshake,
    title: "Remote-First Collaboration",
    body: "We plug into your Slack or Teams, Jira and GitHub. Weekly demos, shared dashboards and on-site kickoffs available on request.",
  },
];

function useNow(intervalMs = 30_000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

function localInfo(now: Date, tz: string) {
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: tz,
  }).format(now);
  const parts = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    hour: "numeric",
    hour12: false,
    timeZone: tz,
  }).formatToParts(now);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const open = !["Sat", "Sun"].includes(weekday) && hour >= 9 && hour < 18;
  return { time, weekday, open };
}

export default function GlobalPresence() {
  const dots = useMemo(buildLandDots, []);
  const now = useNow();
  const hq = project(HQ.lon, HQ.lat);

  return (
    <section id="global" className="relative py-28 bg-[#0A3A40] text-[#F3ECE3] overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#EDC9AF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#EDC9AF]/25 bg-[#EDC9AF]/10 text-[#EDC9AF] text-xs mb-3">
            <Globe className="w-3.5 h-3.5 text-[#EDC9AF]" />
            <span className="tracking-[0.18em] uppercase font-bold">GLOBAL DELIVERY NETWORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F3ECE3] mb-4 font-syne">
            <span className="block drop-shadow-sm">Engineered in India.</span>
            <span className="block mt-1 text-[#EDC9AF]">Deployed Worldwide.</span>
          </h2>
          <p className="text-[#F3ECE3]/70 text-sm sm:text-base leading-relaxed font-sans">
            One delivery center, every major market. We partner with product companies, OEMs and enterprises across
            North America, Europe, the Middle East and Asia Pacific, working in your time zone and to your standards.
          </p>
        </div>

        {/* World Map Console */}
        <div className="olive-carbon-panel relative rounded-3xl p-4 sm:p-6 shadow-2xl mb-10">
          <div className="brass-rivet absolute top-3 left-3" />
          <div className="brass-rivet absolute top-3 right-3" />
          <div className="brass-rivet absolute bottom-3 left-3" />
          <div className="brass-rivet absolute bottom-3 right-3" />

          <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-3 mb-2 border-b border-white/10 text-[10px] sm:text-[11px] font-sans tracking-[0.16em] uppercase">
            <span className="text-[#F4D03F] font-bold flex items-center gap-2">
              <span className="hardware-led-yellow animate-pulse" /> LIVE DELIVERY UPLINKS
            </span>
            <span className="text-[#F3ECE3]/55">ORIGIN: TIRUCHIRAPPALLI, IN · 10.8°N 78.7°E</span>
          </div>

          <svg
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            className="w-full h-auto"
            role="img"
            aria-label="World map showing delivery links from India to North America, Europe, the Middle East, Singapore and Australia"
          >
            {dots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={1.9} fill="#EDC9AF" opacity={0.38} />
            ))}

            {HUBS.map((h) => {
              const p = project(h.lon, h.lat);
              const mx = (hq.x + p.x) / 2;
              const lift = Math.min(140, Math.abs(p.x - hq.x) * 0.35 + 30);
              const my = Math.min(hq.y, p.y) - lift;
              const path = `M ${hq.x} ${hq.y} Q ${mx} ${my} ${p.x} ${p.y}`;
              return (
                <g key={h.name}>
                  <path d={path} fill="none" stroke="#F4D03F" strokeOpacity={0.25} strokeWidth={1.5} />
                  <path
                    d={path}
                    fill="none"
                    stroke="#F4D03F"
                    strokeWidth={1.8}
                    strokeDasharray="6 10"
                    className="global-arc"
                  />
                  <circle cx={p.x} cy={p.y} r={7} fill="#F4D03F" opacity={0.18} className="global-ping" />
                  <circle cx={p.x} cy={p.y} r={3.4} fill="#F4D03F" stroke="#172108" strokeWidth={1} />
                  <text
                    x={p.x + h.dx}
                    y={p.y + h.dy}
                    textAnchor={h.anchor}
                    className="font-sans"
                    fontSize={11}
                    fill="#FAF1E8"
                    style={{ paintOrder: "stroke", stroke: "#172108", strokeWidth: 3 }}
                  >
                    {h.name}
                  </text>
                </g>
              );
            })}

            {/* HQ marker */}
            <circle cx={hq.x} cy={hq.y} r={14} fill="#F4D03F" opacity={0.2} className="global-ping" />
            <circle cx={hq.x} cy={hq.y} r={6} fill="#F4D03F" stroke="#FFFFFF" strokeWidth={1.5} />
            <text
              x={hq.x - 10}
              y={hq.y + 24}
              textAnchor="end"
              fontSize={12}
              fontWeight={700}
              fill="#F4D03F"
              style={{ paintOrder: "stroke", stroke: "#172108", strokeWidth: 3 }}
            >
              QUBRYON HQ · INDIA
            </text>
          </svg>
        </div>

        {/* Live regional clocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {REGIONS.map((r) => {
            const info = now ? localInfo(now, r.tz) : null;
            return (
              <div key={r.region} className="olive-chassis rounded-2xl p-5 relative overflow-hidden shadow-md">
                <div className="brass-rivet absolute top-2.5 right-2.5" />
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-sans tracking-[0.18em] uppercase text-[#9FC9C4] font-bold">
                      {r.region}
                    </div>
                    <div className="text-sm font-sans text-[#FAF1E8] mt-0.5">{r.city}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold font-syne text-[#F4D03F] tabular-nums tracking-wider">
                      {info ? info.time : "--:--"}
                    </div>
                    <div className="text-[10px] font-sans text-[#EDC9AF] uppercase tracking-wider">
                      {info ? info.weekday : " "}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-sans">
                  <span className="text-[#EDC9AF]">
                    Overlap: <span className="text-[#FAF1E8] font-bold">{r.overlap}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-[#9FC9C4]">
                    <span className={info?.open ? "hardware-led-yellow" : "hardware-led-olive opacity-60"} />
                    {info ? (info.open ? "OPEN" : "AFTER HRS") : ""}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Delivery pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl p-6 bg-[#EDC9AF] text-[#141B08] transition-transform hover:-translate-y-0.5">
              <div className="w-10 h-10 rounded-xl olive-chassis flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[#F4D03F]" />
              </div>
              <h3 className="text-lg font-bold font-syne text-[#072C31] mb-2">{title}</h3>
              <p className="text-xs font-sans leading-relaxed text-[#3B2F25]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
