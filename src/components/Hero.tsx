"use client";

import React from "react";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import HeroParticles from "./HeroParticles";
import GlobeBadge from "./GlobeBadge";
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
    <section className="relative overflow-hidden bg-[#0E1207] text-[#F3ECE3] pt-36 pb-16 md:pt-40 md:pb-20">
      {/* subtle vignette + grain-like dot texture */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(70%_60%_at_70%_40%,rgba(107,142,35,0.16),transparent_70%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.35] bg-[radial-gradient(rgba(243,236,227,0.07)_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-8 items-center">
          {/* Copy */}
          <div className="lg:col-span-6">
            <GlobeBadge />

            <ArrowDownRight className="w-7 h-7 mt-12 mb-8 text-[#F3ECE3]/70" strokeWidth={1.5} aria-hidden="true" />

            <h1 className="text-[2.6rem] sm:text-6xl lg:text-[3.6rem] xl:text-[4.1rem] leading-[1.04] tracking-[-0.035em] font-light font-sans">
              <span className="block text-[#F3ECE3]">Software that ships.</span>
              <span className="block text-[#F3ECE3]/45">Engineers who stay.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#F3ECE3]/65 max-w-lg leading-relaxed">
              Qubryon builds custom software, AI, cloud and IoT products for companies worldwide, and embeds pre-vetted
              developers into your team in under 48 hours.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <button
                onClick={onOpenConsultation}
                className="key-signal-yellow px-6 py-3.5 rounded-full text-sm flex items-center gap-2 cursor-pointer group"
              >
                <span>Start a project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={onOpenTalentModal}
                className="text-sm text-[#F3ECE3]/85 hover:text-[#F4D03F] flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>Hire developers</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>
            </div>

            {/* Every service, one tap away */}
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Our services">
              {HERO_SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    className={`inline-flex rounded-full px-3 py-1.5 text-[13px] border transition-colors ${
                      s.highlight
                        ? "border-[#F4D03F]/60 text-[#F4D03F] hover:bg-[#F4D03F] hover:text-[#141B08]"
                        : "border-[#F3ECE3]/15 text-[#F3ECE3]/70 hover:border-[#F3ECE3]/40 hover:text-[#F3ECE3]"
                    }`}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Particle visual */}
          <div className="lg:col-span-6">
            <HeroParticles />
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 border-t border-[#F3ECE3]/10">
          {METRICS.map((m) => (
            <div key={m.label} className="pt-6 pb-2 pr-4">
              <div className="text-3xl sm:text-4xl font-light tracking-tight text-[#F3ECE3]">{m.value}</div>
              <div className="text-[13px] text-[#F3ECE3]/50 mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
