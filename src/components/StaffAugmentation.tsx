"use client";

import React, { useState } from "react";
import {
  Users,
  CheckCircle2,
  Clock,
  Shield,
  FileCheck,
  Send,
  Zap,
  Code2,
  Cpu,
  BrainCircuit,
  Cloud,
  Layers,
  ArrowRight,
  Terminal,
} from "lucide-react";

interface StaffAugmentationProps {
  onSuccessSubmit?: (data: any) => void;
}

export default function StaffAugmentation({ onSuccessSubmit }: StaffAugmentationProps) {
  // Tech stack filter state
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Quick Developer Request Form State
  const [formData, setFormData] = useState({
    roleNeeded: "Embedded C / IoT Firmware Engineer",
    seniority: "Senior (5-8 yrs)",
    teamSize: "2 Engineers",
    duration: "6+ Months",
    workModel: "Dedicated Full-Time (160 hrs/mo)",
    primaryTech: "Embedded C, FreeRTOS, MQTT, AWS IoT",
    clientName: "",
    workEmail: "",
    companyName: "",
    projectBrief: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const techStacks = [
    {
      name: "Embedded C / C++",
      category: "embedded",
      icon: Cpu,
      level: "Kernel / Bare-metal / RTOS",
      popularFor: "STM32, ESP32, ARM Cortex, nRF52",
      badgeColor: "border-cyan-500/40 text-cyan-300",
    },
    {
      name: "Python & PyTorch",
      category: "ai",
      icon: BrainCircuit,
      level: "Production AI / MLOps",
      popularFor: "Anomaly Detection, Edge ML, Computer Vision",
      badgeColor: "border-sky-500/40 text-sky-300",
    },
    {
      name: "AWS IoT & Cloud Fabric",
      category: "cloud",
      icon: Cloud,
      level: "Serverless & Streaming",
      popularFor: "AWS IoT Core, Lambda, Kinesis, DynamoDB",
      badgeColor: "border-blue-500/40 text-blue-300",
    },
    {
      name: "MQTT & Industrial Protocols",
      category: "protocols",
      icon: Terminal,
      level: "High-Frequency Telemetry",
      popularFor: "MQTT v5, CoAP, Modbus RTU/TCP, CAN Bus",
      badgeColor: "border-teal-500/40 text-teal-300",
    },
    {
      name: "React & Next.js",
      category: "frontend",
      icon: Code2,
      level: "Modern Telemetry Dashboards",
      popularFor: "WebSockets, Three.js 3D Twins, Real-time Charts",
      badgeColor: "border-cyan-400/40 text-cyan-200",
    },
    {
      name: "AI/ML & Edge Impulse",
      category: "ai",
      icon: BrainCircuit,
      level: "TinyML & Quantized Models",
      popularFor: "TensorFlow Lite, ONNX, Vibration Analytics",
      badgeColor: "border-sky-400/40 text-sky-200",
    },
    {
      name: "Rust Systems Programming",
      category: "embedded",
      icon: Cpu,
      level: "Memory-Safe Embedded & Cloud",
      popularFor: "Embedded HAL, High-Performance Microservices",
      badgeColor: "border-amber-500/40 text-amber-300",
    },
    {
      name: "Zephyr RTOS & FreeRTOS",
      category: "embedded",
      icon: Layers,
      level: "Multi-threaded Deterministic OS",
      popularFor: "Nordic BLE, ESP-IDF, Ultra-low Power Sleep",
      badgeColor: "border-cyan-500/40 text-cyan-300",
    },
    {
      name: "Azure IoT & Time Series",
      category: "cloud",
      icon: Cloud,
      level: "Enterprise Telemetry Pipelines",
      popularFor: "Azure IoT Hub, TimescaleDB, Grafana, Docker",
      badgeColor: "border-blue-400/40 text-blue-200",
    },
  ];

  const filteredTech =
    activeCategory === "all"
      ? techStacks
      : techStacks.filter((t) => t.category === activeCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      if (onSuccessSubmit) {
        onSuccessSubmit(formData);
      }
    }, 800);
  };

  return (
    <section id="talent" className="relative py-24 bg-slate-950 text-white cyber-grid-dense">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-sky-950/70 border border-sky-500/30 text-sky-300 font-mono text-xs mb-3">
            <Users className="w-3.5 h-3.5 text-sky-400" />
            <span>ELITE ENGINEERING ON-DEMAND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Dedicated IT Staff Augmentation for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
              IoT & AI Teams.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Eliminate 3-month hiring cycles. Scale your product development with vetted senior engineers who have battle-tested experience in low-power firmware, high-throughput cloud streaming, and predictive AI models.
          </p>
        </div>

        {/* 3-Step Hiring Process Layout */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-bold font-mono text-cyan-300">
              The 3-Step High-Velocity Hiring Process
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              From requirement definition to sprint onboarding in under 48 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="glass-panel-card p-6 rounded-2xl border border-cyan-500/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-cyan-950/80 border-b border-l border-cyan-500/40 rounded-bl-xl font-mono text-xs font-bold text-cyan-300">
                STEP 01
              </div>
              <div className="w-12 h-12 rounded-xl bg-cyan-950/90 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mb-5 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <FileCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                1. Share Your Requirement
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                Define your exact technology stack, target microcontrollers, cloud platform, seniority level, and time-zone preferences via our inquiry wizard.
              </p>
              <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-400 flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Response Time: &lt; 2 Hours</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="glass-panel-card p-6 rounded-2xl border border-sky-500/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-sky-950/80 border-b border-l border-sky-500/40 rounded-bl-xl font-mono text-xs font-bold text-sky-300">
                STEP 02
              </div>
              <div className="w-12 h-12 rounded-xl bg-sky-950/90 border border-sky-400/40 flex items-center justify-center text-sky-400 mb-5 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                2. Interview Vetted Experts
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                Receive 2–3 pre-screened senior profiles matching your exact architecture within 24 to 48 hours. Conduct your technical interview directly with the candidates.
              </p>
              <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-sky-400 flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>2-Week Risk-Free Trial Guarantee</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="glass-panel-card p-6 rounded-2xl border border-blue-500/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-blue-950/80 border-b border-l border-blue-500/40 rounded-bl-xl font-mono text-xs font-bold text-blue-300">
                STEP 03
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-950/90 border border-blue-400/40 flex items-center justify-center text-blue-400 mb-5 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                3. Scale Your Team Seamlessly
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                Integrate chosen engineers into your Slack, Jira, and GitHub on Day 1. Complete IP assignment, strict NDA protection, and zero administrative or HR overhead.
              </p>
              <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-blue-400 flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero Onboarding Overhead</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stacks Showcase & Matrix */}
        <div id="tech-stacks" className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-mono text-cyan-400 mb-1">PROVEN TALENT CAPABILITIES</div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Vetted Across Core IoT, AI & Cloud Stacks
              </h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
              {[
                { id: "all", label: "All Stacks" },
                { id: "embedded", label: "Embedded & Hardware" },
                { id: "ai", label: "AI & ML" },
                { id: "cloud", label: "Cloud & Ingestion" },
                { id: "protocols", label: "IoT Protocols" },
                { id: "frontend", label: "Dashboards / UI" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                      : "text-slate-400 hover:text-cyan-200 hover:bg-slate-800"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTech.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="glass-panel p-4 rounded-xl border border-slate-800/80 hover:border-cyan-500/40 transition-all group flex items-start space-x-3.5"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/50 group-hover:scale-105 transition-all shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                        {tech.name}
                      </h4>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${tech.badgeColor} bg-slate-900/80`}>
                        VERIFIED
                      </span>
                    </div>
                    <p className="text-xs text-cyan-400 font-mono mb-1">{tech.level}</p>
                    <p className="text-[11px] text-slate-400 truncate">{tech.popularFor}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Inquiry Form for Clients to Request Developers */}
        <div className="glass-panel-card p-8 sm:p-10 rounded-3xl border border-cyan-500/30 relative overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.15)]">
          {/* Subtle Cyber scanline accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
                <span>TALENT DEPLOYMENT ACCELERATOR</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Request Pre-Vetted Developers
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Specify your engineering profile requirements. Our Technical Director will curate vetted profiles and arrange technical interviews within 48 hours.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>2-Week Risk-Free Trial Period</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Direct Communication via Slack / Teams / GitHub</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Full IP Assignment & Strict NDA Guaranteed</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Time-Zone Alignment (US, EU, APAC, India)</span>
                </div>
              </div>

              {/* Developer availability live ticker */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 mt-4">
                <div className="text-cyan-400 font-bold mb-1 flex items-center justify-between">
                  <span>CURRENT BENCH CAPACITY</span>
                  <span className="text-emerald-400">14 ENGINEERS READY</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Embedded C (4), PyTorch/Edge AI (3), AWS IoT Cloud (4), React/Next.js (3).
                </p>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-8 rounded-2xl bg-cyan-950/40 border border-cyan-500/50 text-center space-y-4 animate-in fade-in zoom-in-95">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 mx-auto shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Developer Request Dispatched!</h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <strong className="text-cyan-300">{formData.clientName || "Valued Partner"}</strong>. Our technical talent director at Qubryon Technologies has received your request for{" "}
                    <span className="text-cyan-300 font-mono">{formData.roleNeeded}</span>. We will share 2–3 vetted candidate dossiers to{" "}
                    <span className="text-cyan-300 font-mono">{formData.workEmail}</span> within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 rounded-lg text-xs font-mono text-slate-950 font-bold bg-cyan-400 hover:bg-cyan-300 cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Role Needed */}
                    <div>
                      <label className="block text-[11px] font-mono text-cyan-300 mb-1">
                        ROLE REQUIRED *
                      </label>
                      <select
                        value={formData.roleNeeded}
                        onChange={(e) => setFormData({ ...formData, roleNeeded: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg text-xs font-mono glass-input text-white cursor-pointer"
                        required
                      >
                        <option value="Embedded C / IoT Firmware Engineer" className="bg-slate-900">
                          Embedded C / IoT Firmware Engineer
                        </option>
                        <option value="AI / Edge ML Telemetry Specialist" className="bg-slate-900">
                          AI / Edge ML Telemetry Specialist
                        </option>
                        <option value="AWS / Cloud IoT Systems Architect" className="bg-slate-900">
                          AWS / Cloud IoT Systems Architect
                        </option>
                        <option value="Full-Stack React & Next.js IoT Engineer" className="bg-slate-900">
                          Full-Stack React & Next.js IoT Engineer
                        </option>
                        <option value="Complete Dedicated Pod (Firmware + AI + Cloud)" className="bg-slate-900">
                          Complete Dedicated Pod (Firmware + AI + Cloud)
                        </option>
                      </select>
                    </div>

                    {/* Seniority */}
                    <div>
                      <label className="block text-[11px] font-mono text-cyan-300 mb-1">
                        EXPERIENCE LEVEL *
                      </label>
                      <select
                        value={formData.seniority}
                        onChange={(e) => setFormData({ ...formData, seniority: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg text-xs font-mono glass-input text-white cursor-pointer"
                        required
                      >
                        <option value="Senior (5-8 yrs)" className="bg-slate-900">
                          Senior (5-8 yrs) - Recommended
                        </option>
                        <option value="Lead / Principal Architect (8+ yrs)" className="bg-slate-900">
                          Lead / Principal Architect (8+ yrs)
                        </option>
                        <option value="Mid-Level (3-5 yrs)" className="bg-slate-900">
                          Mid-Level (3-5 yrs)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Team Size */}
                    <div>
                      <label className="block text-[11px] font-mono text-cyan-300 mb-1">
                        DEVELOPER HEADCOUNT
                      </label>
                      <select
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg text-xs font-mono glass-input text-white cursor-pointer"
                      >
                        <option value="1 Dedicated Engineer" className="bg-slate-900">
                          1 Dedicated Engineer
                        </option>
                        <option value="2 Engineers" className="bg-slate-900">
                          2 Engineers (Pair Pod)
                        </option>
                        <option value="3-5 Engineers" className="bg-slate-900">
                          3–5 Engineers (Cross-Functional Squad)
                        </option>
                        <option value="5+ Engineers" className="bg-slate-900">
                          5+ Engineers (Enterprise Division)
                        </option>
                      </select>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-[11px] font-mono text-cyan-300 mb-1">
                        ENGAGEMENT HORIZON
                      </label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg text-xs font-mono glass-input text-white cursor-pointer"
                      >
                        <option value="3-6 Months" className="bg-slate-900">
                          3–6 Months
                        </option>
                        <option value="6+ Months" className="bg-slate-900">
                          6+ Months (Long-term)
                        </option>
                        <option value="1-3 Months (Sprint Blitz)" className="bg-slate-900">
                          1–3 Months (Sprint Blitz)
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Primary Tech Stack / Hardware */}
                  <div>
                    <label className="block text-[11px] font-mono text-cyan-300 mb-1">
                      PRIMARY TECH STACK & HARDWARE (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      value={formData.primaryTech}
                      onChange={(e) => setFormData({ ...formData, primaryTech: e.target.value })}
                      placeholder="e.g., STM32, FreeRTOS, MQTT, AWS IoT Core, PyTorch"
                      className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Client Name */}
                    <div>
                      <label className="block text-[11px] font-mono text-cyan-300 mb-1">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        placeholder="e.g. Alex Johnson"
                        className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-white"
                      />
                    </div>

                    {/* Work Email */}
                    <div>
                      <label className="block text-[11px] font-mono text-cyan-300 mb-1">
                        WORK EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="alex@enterprise.com"
                        className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-white"
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-[11px] font-mono text-cyan-300 mb-1">
                      COMPANY / ORGANIZATION NAME
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Industrial Automation Corp"
                      className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-white"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:from-cyan-300 hover:to-sky-200 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Matching Qualified Engineers...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-slate-950" />
                        <span>Request Candidate Profiles (Under 48 Hours)</span>
                      </>
                    )}
                  </button>

                  <div className="text-[10px] font-mono text-slate-500 text-center">
                    Protected by strict NDA. No spam. 100% confidential talent scoping.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
