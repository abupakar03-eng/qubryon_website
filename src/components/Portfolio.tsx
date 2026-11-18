"use client";

import React, { useState } from "react";
import {
  Layers,
  ArrowUpRight,
  Cpu,
  Activity,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  X,
  Server,
  Zap,
} from "lucide-react";

export default function Portfolio() {
  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const caseStudies = [
    {
      id: "iiot-predictive-maintenance",
      category: "industrial",
      badge: "IIOT & PREDICTIVE ANALYTICS",
      title: "Smart Factory Floor Predictive Maintenance & Telemetry Fabric",
      clientSector: "Precision Automotive & Heavy Machinery Manufacturing",
      impactMetric: "41.8% Downtime Reduction",
      summary:
        "High-density retrofitting of 140+ CNC milling machines with multi-axis vibration & thermal MEMS sensors, edge anomaly detection, and cloud streaming.",
      problem:
        "Unplanned spindle bearing burnouts caused unpredictable production line stoppages, costing the client over $35,000 per hour in idle machinery and delayed orders.",
      solution:
        "Qubryon designed and deployed custom ESP32-S3 and ARM Cortex-M4 industrial sensor nodes running Zephyr RTOS. High-frequency FFT vibration analysis was performed on-device to flag high-frequency harmonic abnormalities, streaming telemetry via MQTT to an AWS IoT Core and TimescaleDB back-end.",
      results: [
        "41.8% reduction in unscheduled machine downtime within the first 90 days.",
        "Over 3.4 million sensor data points processed per minute with 99.98% gateway uptime.",
        "Estimated annual savings exceeding $720,000 in prevented equipment failure.",
        "Deployed 3 dedicated Qubryon embedded firmware & data engineers via staff augmentation.",
      ],
      techStack: ["ESP32-S3", "Zephyr RTOS", "MQTT v5", "AWS IoT Core", "Python ML", "Grafana", "TimescaleDB"],
      architecture: [
        "Sensors: 3-Axis Accelerometers & Thermal Infrared",
        "Edge: Fast Fourier Transform (FFT) on ARM Cortex",
        "Transport: MQTT over TLS with cellular fallback",
        "Cloud: AWS IoT Rules Engine -> Kafka -> TimescaleDB",
      ],
    },
    {
      id: "cold-chain-telematics",
      category: "logistics",
      badge: "CONNECTED TELEMATICS & AI",
      title: "Pharmaceutical Cold-Chain Fleet Telematics & AI Spoilage Prevention",
      clientSector: "Global Biopharma Logistics & Temperature-Sensitive Distribution",
      impactMetric: "$1.4M Spoilage Prevented",
      summary:
        "Ultra-low-power cellular and LoRaWAN sensor arrays continuously monitoring vaccines and biologics in transit with predictive thermal decay modeling.",
      problem:
        "Refrigerated transit trucks encountered intermittent reefer compressor faults, leading to temperature spikes and catastrophic pharmaceutical batch disposal.",
      solution:
        "Qubryon built an ultra-low-power telemetry tracker utilizing STM32 microcontrollers with LTE-M and LoRaWAN fallback. An AI predictive decay model running in the cloud dynamically forecasted compartment temperature breach 45 minutes before critical thresholds, alerting drivers in real-time.",
      results: [
        "Zero spoiled batches across 12,000+ monitored cross-country shipments.",
        "$1.4M saved in preserved biopharma cargo in Year 1.",
        "Battery life of 24 months on a single lithium thionyl chloride pack.",
        "Qubryon supplied 2 senior embedded C developers and 1 React dashboard engineer.",
      ],
      techStack: ["STM32L4", "LoRaWAN", "Cellular LTE-M", "Azure IoT Hub", "PyTorch", "Next.js", "Docker"],
      architecture: [
        "Sensors: NIST-Calibrated Temperature & Humidity Probes",
        "Edge: STM32 Ultra-Low Power Deep-Sleep Schedulers",
        "Transport: Dual-Band LoRaWAN Gateway & Global eSIM",
        "AI: Thermal Inversion Predictive Regression Model",
      ],
    },
    {
      id: "microgrid-optimizer",
      category: "energy",
      badge: "CLEANTECH & EDGE COMPUTING",
      title: "Smart Microgrid & Commercial Energy Storage Optimizer",
      clientSector: "Renewable Energy Parks & Commercial Microgrid Operators",
      impactMetric: "32.4% Peak Energy Cost Savings",
      summary:
        "Sub-second edge control integration for hybrid solar photovoltaic, battery energy storage systems (BESS), and industrial grid-tie inverters.",
      problem:
        "High peak-demand tariff penalties and fluctuating solar yield created excessive electricity bills for a 45-acre industrial tech park.",
      solution:
        "Qubryon engineered an industrial edge controller interfacing via Modbus TCP to solar inverters and battery BMS. An AI reinforcement learning agent continuously forecasts 24-hour tariff rates and solar irradiance, executing sub-second charge/discharge commands to maximize ROI.",
      results: [
        "32.4% reduction in peak demand electricity charges.",
        "Sub-200ms automated switching during unexpected utility grid power outages.",
        "Complete web-based digital twin showing live battery cell health and energy flows.",
        "Continuous staff augmentation of 2 senior Rust & Industrial protocol specialists.",
      ],
      techStack: ["Rust", "Modbus TCP", "Edge Impulse", "TimescaleDB", "React", "Three.js", "Kubernetes"],
      architecture: [
        "Inverters: Modbus TCP / SunSpec Protocol Bridge",
        "Edge: Rust deterministic event controller",
        "AI: Dynamic Tariff Arbitrage Reinforcement Agent",
        "Visualization: Interactive Three.js 3D Microgrid View",
      ],
    },
    {
      id: "edge-vision-quality",
      category: "ai-vision",
      badge: "COMPUTER VISION & ROBOTICS",
      title: "High-Speed Edge Computer Vision for Surface Defect Detection",
      clientSector: "Automotive Precision Electronics & Semiconductor Assembly",
      impactMetric: "99.64% Defect Accuracy at 120 FPS",
      summary:
        "Real-time visual inspection on high-speed conveyor belts utilizing NVIDIA Jetson Orin edge devices running quantized YOLO neural networks.",
      problem:
        "Manual optical inspection allowed micro-fractures and soldering bridge flaws to pass undetected, resulting in warranty recall claims and customer escalations.",
      solution:
        "Qubryon developed an on-premise edge vision rig with industrial high-speed global shutter cameras and NVIDIA Jetson edge inference nodes. The custom TensorRT neural network processes 120 frames per second, instantly triggering a pneumatic reject gate for defective units.",
      results: [
        "Inspection accuracy elevated from 88.2% (manual) to 99.64% (automated edge AI).",
        "Zero line slowdown: 120 frames per second throughput with 6.2ms inference latency.",
        "Direct integration with plant MES (Manufacturing Execution System).",
        "Qubryon embedded a dedicated Senior Computer Vision Engineer to optimize inference models.",
      ],
      techStack: ["NVIDIA Jetson", "TensorRT", "OpenCV", "Python", "WebSockets", "FastAPI", "C++"],
      architecture: [
        "Optics: High-speed GigE Global Shutter Industrial Camera",
        "Edge Compute: NVIDIA Jetson Orin Nano with CUDA acceleration",
        "Model: Quantized INT8 YOLO Defect Detection Network",
        "Actuation: GPIO-triggered high-speed pneumatic rejector",
      ],
    },
  ];

  const filteredCases =
    activeFilter === "all"
      ? caseStudies
      : caseStudies.filter((c) => c.category === activeFilter);

  return (
    <section id="case-studies" className="relative py-24 bg-slate-950/95 text-white cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-3">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>DEPLOYMENT TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Proven Case Studies &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
              Measurable ROI.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Examine how Qubryon&apos;s custom IoT hardware architectures and embedded AI intelligence deliver tangible business outcomes in harsh physical environments.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              { id: "all", label: "All Case Studies" },
              { id: "industrial", label: "Smart Manufacturing" },
              { id: "logistics", label: "Fleet & Cold Chain" },
              { id: "energy", label: "CleanTech & Energy" },
              { id: "ai-vision", label: "Edge AI & Vision" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.5)]"
                    : "text-slate-400 bg-slate-900 border border-slate-800 hover:text-cyan-300 hover:border-cyan-500/40"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCases.map((item) => (
            <div
              key={item.id}
              className="glass-panel-card p-6 sm:p-8 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 flex flex-col justify-between group transition-all"
            >
              <div>
                {/* Header Metrics Banner */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-800">
                  <span className="text-[11px] font-mono tracking-wider text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30">
                    {item.badge}
                  </span>
                  <div className="flex items-center space-x-1 text-emerald-400 font-mono text-xs font-bold bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/30">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{item.impactMetric}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-4">{item.clientSector}</p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {item.summary}
                </p>

                {/* Key Results list */}
                <div className="space-y-2 mb-6">
                  {item.results.slice(0, 3).map((res: string, i: number) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800 mb-6">
                  {item.techStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Case Details Button */}
                <button
                  onClick={() => setSelectedCase(item)}
                  className="w-full py-2.5 rounded-xl text-xs font-mono font-bold text-cyan-300 bg-cyan-950/50 border border-cyan-500/40 hover:bg-cyan-500/20 hover:text-white transition-all flex items-center justify-center space-x-2 cursor-pointer group/btn shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                >
                  <span>Examine System Architecture &amp; Methodology</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Case Study Deep-Dive Modal */}
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-white">
              {/* Close Button */}
              <button
                onClick={() => setSelectedCase(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-[11px] font-mono text-cyan-400 px-2.5 py-1 rounded bg-cyan-950/90 border border-cyan-500/30 inline-block mb-2">
                  {selectedCase.badge}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedCase.title}</h3>
                <p className="text-xs font-mono text-slate-400">{selectedCase.clientSector}</p>
              </div>

              {/* Verified Result Banner */}
              <div className="p-4 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-between mb-6">
                <div>
                  <div className="text-[10px] font-mono text-slate-400">MEASURABLE ROI ACHIEVED</div>
                  <div className="text-xl font-bold font-mono text-emerald-400">
                    {selectedCase.impactMetric}
                  </div>
                </div>
                <div className="text-right text-[11px] font-mono text-cyan-300">
                  <span>Architecture: Turnkey + Staff Augmentation</span>
                </div>
              </div>

              {/* Problem vs Solution */}
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-sm font-bold font-mono text-rose-400 uppercase mb-1">
                    The Engineering Challenge
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
                    {selectedCase.problem}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold font-mono text-cyan-400 uppercase mb-1">
                    The Qubryon Cyber-Physical Architecture
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
                    {selectedCase.solution}
                  </p>
                </div>
              </div>

              {/* System Architecture Data Flow */}
              <div className="mb-6">
                <h4 className="text-sm font-bold font-mono text-cyan-300 uppercase mb-2">
                  System Architecture Pipeline
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {selectedCase.architecture.map((arch: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded bg-slate-900 border border-cyan-500/20 text-slate-300 flex items-center space-x-2"
                    >
                      <span className="text-cyan-400 font-bold">0{idx + 1}.</span>
                      <span>{arch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Results */}
              <div className="mb-6">
                <h4 className="text-sm font-bold font-mono text-white uppercase mb-2">
                  Verified Performance Outcomes
                </h4>
                <div className="space-y-2">
                  {selectedCase.results.map((r: string, idx: number) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="text-[11px] font-mono text-slate-400">
                  Ready to deploy a similar architecture for your enterprise?
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="px-5 py-2 rounded-lg font-mono text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
