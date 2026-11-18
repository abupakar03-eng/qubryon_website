"use client";

import React from "react";
import { ArrowRight, Users, CheckCircle2 } from "lucide-react";
import Hero3D from "./Hero3D";
import { HERO_SERVICES } from "./three/heroServices";

interface HeroProps {
  onOpenConsultation: () => void;
  onOpenTalentModal: () => void;
}

const METRICS = [
  { value: "< 48 hrs", label: "To match vetted engineers" },
  { value: "40+", label: "Technology stacks covered" },
  { value: "100%", label: "IP & code ownership" },
  { value: "4 regions", label: "US · EU · GCC · APAC overlap" },
];

export default function Hero({ onOpenConsultation, onOpenTalentModal }: HeroProps) {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-[#F6F1EA] text-[#141B08] sand-cyber-grid">
      {/* Soft colour wash */}
      <div className="absolute -top-32 right-[-10%] w-[720px] h-[720px] bg-[#6B8E23]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-[480px] h-[480px] bg-[#F4D03F]/25 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Copy */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6B8E23]/25 bg-white/60 backdrop-blur px-3.5 py-1.5 text-xs text-[#3D5214] mb-7 shadow-sm">
              <span className="hardware-led-olive" />
              <span className="font-medium">Software development &amp; IT staff augmentation</span>
            </div>

            <h1 className="text-[2.3rem] sm:text-[3.4rem] lg:text-[3rem] xl:text-[3.35rem] font-bold tracking-[-0.03em] text-[#141B08] leading-[1.06] mb-6 font-syne">
              Build better software.{" "}
              <span className="relative text-[#4F6B1A]">
                Scale with expert engineers.
                <span className="absolute left-0 right-0 -bottom-1 h-3 bg-[#F4D03F]/60 -z-10 rounded-sm" />
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#4A5634] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Qubryon is your global software engineering partner. We design and build custom software, AI, cloud, data
              and IoT solutions, and embed pre-vetted developers into your team in under 48 hours.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onOpenConsultation}
                className="key-signal-yellow w-full sm:w-auto px-6 py-3.5 rounded-full text-sm flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Start a project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenTalentModal}
                className="key-tactical-olive w-full sm:w-auto px-6 py-3.5 rounded-full text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>Hire developers</span>
              </button>
            </div>

            {/* Every service, one tap away */}
            <div className="mt-9">
              <div className="text-[11px] uppercase text-[#4A5634]/80 mb-2.5">What we do</div>
              <ul className="flex flex-wrap justify-center lg:justify-start gap-2">
                {HERO_SERVICES.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      className={`inline-flex items-center rounded-full px-3 py-1.5 text-[13px] border transition-colors ${
                        s.highlight
                          ? "bg-[#F4D03F] border-[#D4AC0D]/40 text-[#141B08] font-semibold hover:bg-[#F7DC6F]"
                          : "bg-white/70 border-[#141B08]/10 text-[#2A3517] hover:border-[#6B8E23]/50 hover:text-[#141B08]"
                      }`}
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-[13px] text-[#4A5634]">
              {["NDA & full IP protection", "Fixed-bid, T&M or dedicated teams"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6B8E23]" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3D services orbit */}
          <div className="lg:col-span-6">
            <Hero3D />
          </div>
        </div>

        {/* Metrics strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-[#141B08]/10 bg-white/50 backdrop-blur divide-x divide-y md:divide-y-0 divide-[#141B08]/10 overflow-hidden">
          {METRICS.map((m) => (
            <div key={m.label} className="px-6 py-6 text-center md:text-left">
              <div className="text-3xl font-bold font-syne tracking-tight text-[#141B08]">{m.value}</div>
              <div className="text-[13px] text-[#4A5634] mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
