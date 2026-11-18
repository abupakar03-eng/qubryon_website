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
    <section className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden flex flex-col justify-center cyber-grid">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[400px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Incorporation & Enterprise Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-3" />
            <span className="font-semibold tracking-wide">ENTERPRISE CYBER-PHYSICAL SYSTEMS</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 hidden sm:inline">CIN: U62013TN2026PTC199725</span>
          </div>
        </div>

        {/* Main Headings */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Empowering the Physical World with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 glow-text-cyan">
              AI & IoT Solutions.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Architecting mission-critical <strong className="text-white font-semibold">custom IoT applications</strong>,{" "}
            real-time <strong className="text-white font-semibold">AI predictive analytics</strong> pipelines, and providing{" "}
            <strong className="text-white font-semibold">top-tier IT staff augmentation</strong> with pre-vetted firmware, cloud, and machine learning engineers.
          </p>

          {/* Dual Call-to-Action (CTA) Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA: Build Your Solution */}
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-mono text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:from-cyan-300 hover:to-sky-200 transition-all shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.8)] flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>Build Your Solution</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA: Hire Expert Talent */}
            <button
              onClick={onOpenTalentModal}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-mono text-sm font-semibold text-cyan-300 bg-slate-900/80 border border-cyan-500/40 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] flex items-center justify-center space-x-2 cursor-pointer group"
            >
              <Users className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Hire Expert Talent</span>
            </button>
          </div>

          {/* Quick value props / guarantees */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs font-mono text-slate-400">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span><span className="text-slate-200 font-semibold">48-Hr</span> Talent Match</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Strict <span className="text-slate-200 font-semibold">NDA & IP Protection</span></span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Edge to Cloud <span className="text-slate-200 font-semibold">Full Stack</span></span>
            </div>
          </div>
        </div>

        {/* Interactive 3D Element / Tech Particle Animation Canvas */}
        <div className="relative mt-4 mb-12">
          {/* Decorative neon corner accents */}
          <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
          <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
          <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

          {/* Canvas Component */}
          <TechParticleCanvas />
        </div>

        {/* Live Metrics / Operational Trust Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="glass-panel-card p-4 rounded-xl border border-cyan-500/20 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
              99.98%
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
              Telemetry Ingestion SLA
            </div>
          </div>

          <div className="glass-panel-card p-4 rounded-xl border border-cyan-500/20 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
              &lt; 48 Hrs
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
              Engineer Deployment
            </div>
          </div>

          <div className="glass-panel-card p-4 rounded-xl border border-cyan-500/20 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
              40+
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
              Hardware & IoT Stacks
            </div>
          </div>

          <div className="glass-panel-card p-4 rounded-xl border border-cyan-500/20 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
              100%
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
              IP & Code Ownership
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
