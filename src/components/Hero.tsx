"use client";

import React from "react";
import { ArrowRight, Users, Shield, Cpu, Sparkles, Activity, CheckCircle2 } from "lucide-react";
import TechParticleCanvas from "./TechParticleCanvas";

interface HeroProps {
  onOpenConsultation: () => void;
  onOpenTalentModal: () => void;
}

export default function Hero({ onOpenConsultation, onOpenTalentModal }: HeroProps) {
  return (
    <section className="relative min-h-screen pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden flex flex-col justify-center cyber-grid">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[400px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Incorporation & Enterprise Tactile Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-7">
          <div className="hardware-recessed-channel inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),0_1px_1px_rgba(255,255,255,0.1)]">
            <span className="hardware-led-green animate-pulse" />
            <span className="font-bold tracking-[0.16em] uppercase text-etched-cyan">
              ENTERPRISE CYBER-PHYSICAL SYSTEMS
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 font-mono text-[11px] hidden sm:inline tracking-wider">
              CIN: U62013TN2026PTC199725
            </span>
          </div>
        </div>

        {/* Main Industrial Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 font-sans">
            <span className="text-metallic-titanium block">
              Empowering the Physical World with
            </span>
            <span className="text-metallic-cyan block mt-1">
              AI &amp; IoT Solutions.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Architecting mission-critical <strong className="text-white font-bold">custom IoT applications</strong>,{" "}
            real-time <strong className="text-white font-bold">AI predictive analytics</strong> pipelines, and providing{" "}
            <strong className="text-white font-bold">top-tier IT staff augmentation</strong> with pre-vetted firmware, cloud, and machine learning engineers.
          </p>

          {/* Dual Tactile Skeuomorphic Call-to-Action (CTA) Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary Tactile Key: Build Your Solution */}
            <button
              onClick={onOpenConsultation}
              className="hardware-key-cyan w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2.5 cursor-pointer group"
            >
              <span>BUILD YOUR SOLUTION</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Tactile Key: Hire Expert Talent */}
            <button
              onClick={onOpenTalentModal}
              className="hardware-key-titanium w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2.5 cursor-pointer group"
            >
              <Users className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-etched-cyan">HIRE EXPERT TALENT</span>
            </button>
          </div>

          {/* Quick value props / hardware specs */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs font-mono text-slate-400">
            <div className="flex items-center space-x-1.5">
              <span className="hardware-led-cyan" />
              <span><span className="text-slate-100 font-bold">&lt; 48-Hr</span> Talent Match</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="hardware-led-cyan" />
              <span>Strict <span className="text-slate-100 font-bold">NDA &amp; IP Protection</span></span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="hardware-led-cyan" />
              <span>Edge to Cloud <span className="text-slate-100 font-bold">Full Stack</span></span>
            </div>
          </div>
        </div>

        {/* Interactive 3D Element / Tech Particle Animation Canvas with Chamfered Hardware Housing */}
        <div className="relative mt-4 mb-12">
          {/* Decorative Machined Corner Brackets */}
          <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
          <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
          <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none shadow-[0_0_10px_rgba(6,182,212,0.8)]" />

          {/* Canvas Component */}
          <TechParticleCanvas />
        </div>

        {/* Live Metrics / Operational Telemetry Dashboard Cluster */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="hardware-chassis p-4 rounded-xl text-center relative overflow-hidden group hover:border-cyan-500/60 transition-all">
            <div className="hardware-rivet absolute top-2 right-2" />
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-metallic-cyan tracking-wider">
              99.98%
            </div>
            <div className="text-[11px] font-mono text-etched mt-1 uppercase tracking-[0.16em]">
              TELEMETRY INGESTION SLA
            </div>
          </div>

          <div className="hardware-chassis p-4 rounded-xl text-center relative overflow-hidden group hover:border-cyan-500/60 transition-all">
            <div className="hardware-rivet absolute top-2 right-2" />
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-metallic-cyan tracking-wider">
              &lt; 48 HRS
            </div>
            <div className="text-[11px] font-mono text-etched mt-1 uppercase tracking-[0.16em]">
              ENGINEER DEPLOYMENT
            </div>
          </div>

          <div className="hardware-chassis p-4 rounded-xl text-center relative overflow-hidden group hover:border-cyan-500/60 transition-all">
            <div className="hardware-rivet absolute top-2 right-2" />
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-metallic-cyan tracking-wider">
              40+
            </div>
            <div className="text-[11px] font-mono text-etched mt-1 uppercase tracking-[0.16em]">
              HARDWARE &amp; IOT STACKS
            </div>
          </div>

          <div className="hardware-chassis p-4 rounded-xl text-center relative overflow-hidden group hover:border-cyan-500/60 transition-all">
            <div className="hardware-rivet absolute top-2 right-2" />
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-metallic-cyan tracking-wider">
              100%
            </div>
            <div className="text-[11px] font-mono text-etched mt-1 uppercase tracking-[0.16em]">
              IP &amp; CODE OWNERSHIP
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
