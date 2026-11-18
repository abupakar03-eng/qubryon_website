"use client";

import React from "react";
import { ArrowRight, Users, CheckCircle2 } from "lucide-react";
import TechParticleCanvas from "./TechParticleCanvas";

interface HeroProps {
  onOpenConsultation: () => void;
  onOpenTalentModal: () => void;
}

export default function Hero({ onOpenConsultation, onOpenTalentModal }: HeroProps) {
  return (
    <section className="relative min-h-screen pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden flex flex-col justify-center bg-[#EDC9AF] text-[#1C260D] sand-cyber-grid">
      {/* Background Subtle Warm Radial Halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#6B8E23]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[450px] h-[350px] bg-[#F4D03F]/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Incorporation & Enterprise Status Badge (30% Olive Drab) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-7">
          <div className="olive-recessed-channel inline-flex items-center space-x-2.5 px-4.5 py-1.5 rounded-full border border-[#6B8E23] text-[#F4D03F] text-xs font-mono shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_2px_8px_rgba(30,40,15,0.15)]">
            <span className="hardware-led-yellow animate-pulse" />
            <span className="font-bold tracking-[0.16em] uppercase">
              ENTERPRISE CYBER-PHYSICAL SYSTEMS
            </span>
            <span className="text-[#6B8E23]">|</span>
            <span className="text-[#EDC9AF] font-mono text-[11px] hidden sm:inline tracking-wider">
              CIN: U62013TN2026PTC199725
            </span>
          </div>
        </div>

        {/* Main Architectural Headline in Syne */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#172108] leading-[1.08] mb-6 font-syne">
            <span className="block drop-shadow-sm">
              Empowering the Physical World with
            </span>
            <span className="block mt-1 text-[#466016] drop-shadow-sm">
              AI &amp; IoT Solutions.
            </span>
          </h1>

          {/* Subtext in DM Mono */}
          <p className="text-base sm:text-lg md:text-xl text-[#3A4A1C] max-w-3xl mx-auto leading-relaxed font-mono">
            Architecting mission-critical <strong className="text-[#172108] font-bold">custom IoT applications</strong>,{" "}
            real-time <strong className="text-[#172108] font-bold">AI predictive analytics</strong> pipelines, and providing{" "}
            <strong className="text-[#172108] font-bold">top-tier IT staff augmentation</strong> with pre-vetted firmware, cloud, and machine learning engineers.
          </p>

          {/* Dual Tactile CTAs (10% Signal Yellow & 30% Tactical Olive) */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA: Signal Yellow */}
            <button
              onClick={onOpenConsultation}
              className="key-signal-yellow w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2.5 cursor-pointer group shadow-lg"
            >
              <span>BUILD YOUR SOLUTION</span>
              <ArrowRight className="w-4 h-4 text-[#172108] group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA: Tactical Olive */}
            <button
              onClick={onOpenTalentModal}
              className="key-tactical-olive w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2.5 cursor-pointer group shadow-md"
            >
              <Users className="w-4 h-4 text-[#F4D03F] group-hover:scale-110 transition-transform" />
              <span>HIRE EXPERT TALENT</span>
            </button>
          </div>

          {/* Quick value props in DM Mono */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs font-mono text-[#425227]">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#6B8E23]" />
              <span><span className="text-[#172108] font-bold">&lt; 48-Hr</span> Talent Match</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#6B8E23]" />
              <span>Strict <span className="text-[#172108] font-bold">NDA &amp; IP Protection</span></span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#6B8E23]" />
              <span>Edge to Cloud <span className="text-[#172108] font-bold">Full Stack</span></span>
            </div>
          </div>
        </div>

        {/* Interactive 3D Element / Tech Particle Animation Canvas */}
        <div className="relative mt-4 mb-12">
          {/* Decorative Corner Brackets in Olive Drab */}
          <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#6B8E23] z-20 pointer-events-none shadow-[0_0_10px_rgba(107,142,35,0.6)]" />
          <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#6B8E23] z-20 pointer-events-none shadow-[0_0_10px_rgba(107,142,35,0.6)]" />
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#6B8E23] z-20 pointer-events-none shadow-[0_0_10px_rgba(107,142,35,0.6)]" />
          <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#6B8E23] z-20 pointer-events-none shadow-[0_0_10px_rgba(107,142,35,0.6)]" />

          {/* Canvas Component */}
          <TechParticleCanvas />
        </div>

        {/* Live Metrics / Operational Telemetry Dashboard Cluster (30% Olive Drab) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="olive-chassis p-5 rounded-2xl text-center relative overflow-hidden group hover:border-[#F4D03F] transition-all shadow-md">
            <div className="brass-rivet absolute top-2 right-2" />
            <div className="text-2xl sm:text-3xl font-extrabold font-syne text-[#F4D03F] tracking-wider">
              99.98%
            </div>
            <div className="text-[11px] font-mono text-[#EDC9AF] mt-1.5 uppercase tracking-[0.16em]">
              TELEMETRY INGESTION SLA
            </div>
          </div>

          <div className="olive-chassis p-5 rounded-2xl text-center relative overflow-hidden group hover:border-[#F4D03F] transition-all shadow-md">
            <div className="brass-rivet absolute top-2 right-2" />
            <div className="text-2xl sm:text-3xl font-extrabold font-syne text-[#F4D03F] tracking-wider">
              &lt; 48 HRS
            </div>
            <div className="text-[11px] font-mono text-[#EDC9AF] mt-1.5 uppercase tracking-[0.16em]">
              ENGINEER DEPLOYMENT
            </div>
          </div>

          <div className="olive-chassis p-5 rounded-2xl text-center relative overflow-hidden group hover:border-[#F4D03F] transition-all shadow-md">
            <div className="brass-rivet absolute top-2 right-2" />
            <div className="text-2xl sm:text-3xl font-extrabold font-syne text-[#F4D03F] tracking-wider">
              40+
            </div>
            <div className="text-[11px] font-mono text-[#EDC9AF] mt-1.5 uppercase tracking-[0.16em]">
              HARDWARE &amp; IOT STACKS
            </div>
          </div>

          <div className="olive-chassis p-5 rounded-2xl text-center relative overflow-hidden group hover:border-[#F4D03F] transition-all shadow-md">
            <div className="brass-rivet absolute top-2 right-2" />
            <div className="text-2xl sm:text-3xl font-extrabold font-syne text-[#F4D03F] tracking-wider">
              100%
            </div>
            <div className="text-[11px] font-mono text-[#EDC9AF] mt-1.5 uppercase tracking-[0.16em]">
              IP &amp; CODE OWNERSHIP
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
