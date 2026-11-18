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
      badgeColor: "border-[#6B8E23] text-[#F4D03F]",
    },
    {
      name: "Python & PyTorch",
      category: "ai",
      icon: BrainCircuit,
      level: "Production AI / MLOps",
      popularFor: "Anomaly Detection, Edge ML, Computer Vision",
      badgeColor: "border-[#6B8E23] text-[#F4D03F]",
    },
    {
      name: "AWS IoT & Cloud Fabric",
      category: "cloud",
      icon: Cloud,
      level: "Serverless & Streaming",
      popularFor: "AWS IoT Core, Lambda, Kinesis, DynamoDB",
      badgeColor: "border-[#6B8E23] text-[#F4D03F]",
    },
    {
      name: "MQTT & Industrial Protocols",
      category: "protocols",
      icon: Terminal,
      level: "High-Frequency Telemetry",
      popularFor: "MQTT v5, CoAP, Modbus RTU/TCP, CAN Bus",
      badgeColor: "border-[#6B8E23] text-[#F4D03F]",
    },
    {
      name: "React & Next.js",
      category: "frontend",
      icon: Code2,
      level: "Modern Telemetry Dashboards",
      popularFor: "WebSockets, Three.js 3D Twins, Real-time Charts",
      badgeColor: "border-[#6B8E23] text-[#F4D03F]",
    },
    {
      name: "AI/ML & Edge Impulse",
      category: "ai",
      icon: BrainCircuit,
      level: "TinyML & Quantized Models",
      popularFor: "TensorFlow Lite, ONNX, Vibration Analytics",
      badgeColor: "border-[#6B8E23] text-[#F4D03F]",
    },
    {
      name: "Rust Systems Programming",
      category: "embedded",
      icon: Cpu,
      level: "Memory-Safe Embedded & Cloud",
      popularFor: "Embedded HAL, High-Performance Microservices",
      badgeColor: "border-[#6B8E23] text-[#F4D03F]",
    },
    {
      name: "Zephyr RTOS & FreeRTOS",
      category: "embedded",
      icon: Layers,
      level: "Multi-threaded Deterministic OS",
      popularFor: "Nordic BLE, ESP-IDF, Ultra-low Power Sleep",
      badgeColor: "border-[#6B8E23] text-[#F4D03F]",
    },
    {
      name: "Azure IoT & Time Series",
      category: "cloud",
      icon: Cloud,
      level: "Enterprise Telemetry Pipelines",
      popularFor: "Azure IoT Hub, TimescaleDB, Grafana, Docker",
      badgeColor: "border-[#6B8E23] text-[#F4D03F]",
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
    <section id="talent" className="relative py-28 bg-[#F6F1EA] text-[#1C260D] sand-cyber-grid-dense">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Syne & DM Mono */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="olive-recessed-channel inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#6B8E23] text-[#F4D03F] font-sans text-xs mb-3 shadow-md">
            <Users className="w-3.5 h-3.5 text-[#F4D03F]" />
            <span className="tracking-[0.18em] uppercase font-bold">
              ELITE ENGINEERING ON-DEMAND
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#172108] mb-4 font-syne">
            <span className="block drop-shadow-sm">Dedicated IT Staff Augmentation for</span>
            <span className="block mt-1 text-[#466016]">IoT &amp; AI Teams.</span>
          </h2>
          <p className="text-[#3A4A1C] text-sm sm:text-base leading-relaxed font-sans">
            Eliminate 3-month hiring cycles. Scale your product development with vetted senior engineers who have battle-tested experience in low-power firmware, high-throughput cloud streaming, and predictive AI models.
          </p>
        </div>

        {/* 3-Step Hiring Process Layout (30% Olive Drab Enclosures) */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-bold font-syne text-[#172108] tracking-wide">
              THE 3-STEP HIGH-VELOCITY HIRING PROCESS
            </h3>
            <p className="text-xs sm:text-sm text-[#425227] font-sans mt-1">
              From requirement definition to sprint onboarding in under 48 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="olive-chassis p-7 rounded-2xl relative overflow-hidden group shadow-lg">
              <div className="brass-rivet absolute top-3.5 right-3.5" />
              <div className="olive-recessed-channel inline-block px-3 py-1 rounded-md text-[11px] font-sans font-bold text-[#F4D03F] mb-4 border border-[#6B8E23]">
                STEP 01 // DISPATCH
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#172108] border border-[#6B8E23] flex items-center justify-center text-[#F4D03F] mb-5 shadow-inner">
                <FileCheck className="w-6 h-6 drop-shadow-[0_0_8px_rgba(244,208,63,0.8)]" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#F4D03F] transition-colors font-syne">
                1. Share Your Requirement
              </h4>
              <p className="text-xs sm:text-sm text-[#EDC9AF] leading-relaxed mb-4 font-sans">
                Define your exact technology stack, target microcontrollers, cloud platform, seniority level, and time-zone preferences via our inquiry wizard.
              </p>
              <div className="pt-3 border-t border-[#6B8E23]/40 text-[11px] font-sans text-[#F4D03F] flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Response SLA: &lt; 2 Hours</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="olive-chassis p-7 rounded-2xl relative overflow-hidden group shadow-lg">
              <div className="brass-rivet absolute top-3.5 right-3.5" />
              <div className="olive-recessed-channel inline-block px-3 py-1 rounded-md text-[11px] font-sans font-bold text-[#F4D03F] mb-4 border border-[#6B8E23]">
                STEP 02 // SCREENING
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#172108] border border-[#6B8E23] flex items-center justify-center text-[#F4D03F] mb-5 shadow-inner">
                <Users className="w-6 h-6 drop-shadow-[0_0_8px_rgba(244,208,63,0.8)]" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#F4D03F] transition-colors font-syne">
                2. Interview Vetted Experts
              </h4>
              <p className="text-xs sm:text-sm text-[#EDC9AF] leading-relaxed mb-4 font-sans">
                Receive 2–3 pre-screened senior profiles matching your exact architecture within 24 to 48 hours. Conduct your technical interview directly with the candidates.
              </p>
              <div className="pt-3 border-t border-[#6B8E23]/40 text-[11px] font-sans text-[#F4D03F] flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>2-Week Risk-Free Trial Guarantee</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="olive-chassis p-7 rounded-2xl relative overflow-hidden group shadow-lg">
              <div className="brass-rivet absolute top-3.5 right-3.5" />
              <div className="olive-recessed-channel inline-block px-3 py-1 rounded-md text-[11px] font-sans font-bold text-[#F4D03F] mb-4 border border-[#6B8E23]">
                STEP 03 // ONBOARD
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#172108] border border-[#6B8E23] flex items-center justify-center text-[#F4D03F] mb-5 shadow-inner">
                <Zap className="w-6 h-6 drop-shadow-[0_0_8px_rgba(244,208,63,0.8)]" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#F4D03F] transition-colors font-syne">
                3. Scale Your Team Seamlessly
              </h4>
              <p className="text-xs sm:text-sm text-[#EDC9AF] leading-relaxed mb-4 font-sans">
                Integrate chosen engineers into your Slack, Jira, and GitHub on Day 1. Complete IP assignment, strict NDA protection, and zero administrative or HR overhead.
              </p>
              <div className="pt-3 border-t border-[#6B8E23]/40 text-[11px] font-sans text-[#F4D03F] flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero Onboarding Overhead</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stacks Showcase & Matrix */}
        <div id="tech-stacks" className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#6B8E23]/40 pb-4">
            <div>
              <div className="text-xs font-sans text-[#466016] mb-1 tracking-widest uppercase font-bold">
                PROVEN TALENT CAPABILITIES
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#172108] font-syne tracking-wide">
                Vetted Across Core IoT, AI &amp; Cloud Stacks
              </h3>
            </div>

            {/* Tactile Category Filter Keys (10% Signal Yellow Active) */}
            <div className="flex flex-wrap gap-2 olive-recessed-channel p-1.5 rounded-xl border border-[#6B8E23]/40">
              {[
                { id: "all", label: "ALL STACKS" },
                { id: "embedded", label: "EMBEDDED & HARDWARE" },
                { id: "ai", label: "AI & ML" },
                { id: "cloud", label: "CLOUD & INGESTION" },
                { id: "protocols", label: "IOT PROTOCOLS" },
                { id: "frontend", label: "DASHBOARDS" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold tracking-wider cursor-pointer ${
                    activeCategory === cat.id ? "key-signal-yellow" : "key-tactical-olive"
                  }`}
                >
                  <span>{cat.label}</span>
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
                  className="olive-chassis p-5 rounded-2xl transition-all group flex items-start space-x-3.5 hover:border-[#F4D03F] shadow-md"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#172108] border border-[#6B8E23] flex items-center justify-center text-[#F4D03F] group-hover:scale-105 shadow-inner transition-all shrink-0">
                    <Icon className="w-5 h-5 drop-shadow-[0_0_6px_rgba(244,208,63,0.8)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-[#F4D03F] transition-colors truncate font-syne">
                        {tech.name}
                      </h4>
                      <span className="text-[10px] font-sans px-2 py-0.5 rounded olive-recessed-channel text-[#F4D03F] border border-[#6B8E23]/60">
                        VERIFIED
                      </span>
                    </div>
                    <p className="text-xs text-[#F4D03F] font-sans mb-1">{tech.level}</p>
                    <p className="text-[11px] text-[#EDC9AF] truncate font-sans">{tech.popularFor}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Inquiry Form for Clients to Request Developers */}
        <div className="olive-carbon-panel p-8 sm:p-10 rounded-3xl border-2 border-[#6B8E23] relative overflow-hidden shadow-2xl">
          {/* Top Yellow Bevel Highlight */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#F4D03F] to-transparent shadow-[0_0_12px_rgba(244,208,63,0.8)]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-5 space-y-4">
              <div className="olive-recessed-channel inline-flex items-center space-x-2 px-3 py-1 rounded-md border border-[#6B8E23] text-[#F4D03F] font-sans text-xs">
                <span>TALENT DEPLOYMENT ACCELERATOR</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-syne tracking-wide">
                Request Pre-Vetted Developers
              </h3>
              <p className="text-xs sm:text-sm text-[#EDC9AF] leading-relaxed font-sans">
                Specify your engineering profile requirements. Our Technical Director will curate vetted profiles and arrange technical interviews within 48 hours.
              </p>

              <div className="space-y-3 pt-2 font-sans">
                <div className="flex items-center space-x-2.5 text-xs text-[#FAF1E8]">
                  <span className="hardware-led-yellow" />
                  <span>2-Week Risk-Free Trial Period</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-[#FAF1E8]">
                  <span className="hardware-led-yellow" />
                  <span>Direct Communication via Slack / Teams / GitHub</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-[#FAF1E8]">
                  <span className="hardware-led-yellow" />
                  <span>Full IP Assignment &amp; Strict NDA Guaranteed</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-[#FAF1E8]">
                  <span className="hardware-led-yellow" />
                  <span>Time-Zone Alignment (US, EU, APAC, India)</span>
                </div>
              </div>

              {/* Developer availability live ticker */}
              <div className="p-4 rounded-xl olive-recessed-channel border border-[#6B8E23]/60 text-xs font-sans text-[#EDC9AF] mt-4">
                <div className="text-[#F4D03F] font-bold mb-1 flex items-center justify-between">
                  <span>CURRENT BENCH CAPACITY</span>
                  <span className="text-[#8BAE3A] flex items-center space-x-1.5">
                    <span className="hardware-led-yellow animate-pulse" />
                    <span>14 ENGINEERS READY</span>
                  </span>
                </div>
                <p className="text-[11px] text-[#A2B682]">
                  Embedded C (4), PyTorch/Edge AI (3), AWS IoT Cloud (4), React/Next.js (3).
                </p>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-8 rounded-2xl olive-chassis text-center space-y-4 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-[#F4D03F]/20 border border-[#F4D03F] flex items-center justify-center text-[#F4D03F] mx-auto shadow-[0_0_20px_rgba(244,208,63,0.5)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white font-syne">
                    Developer Request Dispatched!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#EDC9AF] max-w-md mx-auto font-sans">
                    Thank you, <strong className="text-[#F4D03F]">{formData.clientName || "Valued Partner"}</strong>. Our technical talent director at Qubryon Technologies has received your request for{" "}
                    <span className="text-[#F4D03F] font-sans">{formData.roleNeeded}</span>. We will share 2–3 vetted candidate dossiers to{" "}
                    <span className="text-[#F4D03F] font-sans">{formData.workEmail}</span> within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="key-signal-yellow px-6 py-2.5 rounded-xl text-xs font-sans tracking-wider uppercase cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Role Needed */}
                    <div>
                      <label className="block text-[11px] font-sans text-[#F4D03F] mb-1 tracking-wider uppercase font-bold">
                        ROLE REQUIRED *
                      </label>
                      <select
                        value={formData.roleNeeded}
                        onChange={(e) => setFormData({ ...formData, roleNeeded: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg text-xs font-sans sand-glass-input cursor-pointer"
                        required
                      >
                        <option value="Embedded C / IoT Firmware Engineer" className="bg-[#172108]">
                          Embedded C / IoT Firmware Engineer
                        </option>
                        <option value="AI / Edge ML Telemetry Specialist" className="bg-[#172108]">
                          AI / Edge ML Telemetry Specialist
                        </option>
                        <option value="AWS / Cloud IoT Systems Architect" className="bg-[#172108]">
                          AWS / Cloud IoT Systems Architect
                        </option>
                        <option value="Full-Stack React & Next.js IoT Engineer" className="bg-[#172108]">
                          Full-Stack React &amp; Next.js IoT Engineer
                        </option>
                        <option value="Complete Dedicated Pod (Firmware + AI + Cloud)" className="bg-[#172108]">
                          Complete Dedicated Pod (Firmware + AI + Cloud)
                        </option>
                      </select>
                    </div>

                    {/* Seniority */}
                    <div>
                      <label className="block text-[11px] font-sans text-[#F4D03F] mb-1 tracking-wider uppercase font-bold">
                        EXPERIENCE LEVEL *
                      </label>
                      <select
                        value={formData.seniority}
                        onChange={(e) => setFormData({ ...formData, seniority: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg text-xs font-sans sand-glass-input cursor-pointer"
                        required
                      >
                        <option value="Senior (5-8 yrs)" className="bg-[#172108]">
                          Senior (5-8 yrs) - Recommended
                        </option>
                        <option value="Lead / Principal Architect (8+ yrs)" className="bg-[#172108]">
                          Lead / Principal Architect (8+ yrs)
                        </option>
                        <option value="Mid-Level (3-5 yrs)" className="bg-[#172108]">
                          Mid-Level (3-5 yrs)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Team Size */}
                    <div>
                      <label className="block text-[11px] font-sans text-[#F4D03F] mb-1 tracking-wider uppercase font-bold">
                        DEVELOPER HEADCOUNT
                      </label>
                      <select
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg text-xs font-sans sand-glass-input cursor-pointer"
                      >
                        <option value="1 Dedicated Engineer" className="bg-[#172108]">
                          1 Dedicated Engineer
                        </option>
                        <option value="2 Engineers" className="bg-[#172108]">
                          2 Engineers (Pair Pod)
                        </option>
                        <option value="3-5 Engineers" className="bg-[#172108]">
                          3–5 Engineers (Cross-Functional Squad)
                        </option>
                        <option value="5+ Engineers" className="bg-[#172108]">
                          5+ Engineers (Enterprise Division)
                        </option>
                      </select>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-[11px] font-sans text-[#F4D03F] mb-1 tracking-wider uppercase font-bold">
                        ENGAGEMENT HORIZON
                      </label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg text-xs font-sans sand-glass-input cursor-pointer"
                      >
                        <option value="3-6 Months" className="bg-[#172108]">
                          3–6 Months
                        </option>
                        <option value="6+ Months" className="bg-[#172108]">
                          6+ Months (Long-term)
                        </option>
                        <option value="1-3 Months (Sprint Blitz)" className="bg-[#172108]">
                          1–3 Months (Sprint Blitz)
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Primary Tech Stack / Hardware */}
                  <div>
                    <label className="block text-[11px] font-sans text-[#F4D03F] mb-1 tracking-wider uppercase font-bold">
                      PRIMARY TECH STACK &amp; HARDWARE (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      value={formData.primaryTech}
                      onChange={(e) => setFormData({ ...formData, primaryTech: e.target.value })}
                      placeholder="e.g., STM32, FreeRTOS, MQTT, AWS IoT Core, PyTorch"
                      className="w-full px-3 py-2 rounded-lg text-xs font-sans sand-glass-input"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Client Name */}
                    <div>
                      <label className="block text-[11px] font-sans text-[#F4D03F] mb-1 tracking-wider uppercase font-bold">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        placeholder="e.g. Alex Johnson"
                        className="w-full px-3 py-2 rounded-lg text-xs font-sans sand-glass-input"
                      />
                    </div>

                    {/* Work Email */}
                    <div>
                      <label className="block text-[11px] font-sans text-[#F4D03F] mb-1 tracking-wider uppercase font-bold">
                        WORK EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="alex@enterprise.com"
                        className="w-full px-3 py-2 rounded-lg text-xs font-sans sand-glass-input"
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-[11px] font-sans text-[#F4D03F] mb-1 tracking-wider uppercase font-bold">
                      COMPANY / ORGANIZATION NAME
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Industrial Automation Corp"
                      className="w-full px-3 py-2 rounded-lg text-xs font-sans sand-glass-input"
                    />
                  </div>

                  {/* 10% Accent CTA Button in Signal Yellow */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="key-signal-yellow w-full py-4 rounded-xl font-sans text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 select-none shadow-lg"
                  >
                    {submitting ? (
                      <span>Matching engineers…</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#172108]" />
                        <span>Request candidate profiles (under 48 hours)</span>
                      </>
                    )}
                  </button>

                  <div className="text-[10px] font-sans text-[#EDC9AF] text-center pt-1">
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
