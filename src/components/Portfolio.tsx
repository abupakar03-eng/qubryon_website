"use client";

import React, { useCallback, useId, useMemo, useState } from "react";
import GallerySection, { type GalleryItem } from "./GallerySection";
import { useDialog } from "@/lib/useDialog";
import { drawCasePoster } from "./three/galleryArt";
import {
  Layers,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  X,
} from "lucide-react";

export default function Portfolio() {
  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const closeCase = useCallback(() => setSelectedCase(null), []);
  const caseDialogRef = useDialog<HTMLDivElement>(!!selectedCase, closeCase);
  const caseTitleId = useId();

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

  // gallery panels (data is static, so build them once)
  const galleryItems = useMemo<GalleryItem[]>(
    () =>
      caseStudies.map((c, i) => ({
        title: c.title,
        subtitle: c.clientSector,
        makeDraw: (family: string, mono: string) => drawCasePoster(c, i, family, mono),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const openCase = useCallback((i: number) => setSelectedCase(caseStudies[i]), []);

  const filteredCases =
    activeFilter === "all"
      ? caseStudies
      : caseStudies.filter((c) => c.category === activeFilter);

  const list = (
      <div>
        <div className="mb-10">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 olive-recessed-channel p-1.5 rounded-2xl inline-flex border border-[#6B8E23]/40 shadow-inner">
            {[
              { id: "all", label: "ALL CASE STUDIES" },
              { id: "industrial", label: "SMART MANUFACTURING" },
              { id: "logistics", label: "FLEET & COLD CHAIN" },
              { id: "energy", label: "CLEANTECH & ENERGY" },
              { id: "ai-vision", label: "EDGE AI & VISION" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-bold tracking-wider cursor-pointer transition-all ${
                  activeFilter === f.id ? "key-signal-yellow" : "key-tactical-olive"
                }`}
              >
                <span>{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid (30% Olive Drab Chassis) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCases.map((item) => (
            <div
              key={item.id}
              className="olive-chassis p-7 sm:p-9 rounded-3xl flex flex-col justify-between group relative overflow-hidden hover:border-[#F4D03F] transition-all shadow-xl"
            >
              <div className="brass-rivet absolute top-3.5 left-3.5" />
              <div className="brass-rivet absolute top-3.5 right-3.5" />
              <div className="brass-rivet absolute bottom-3.5 left-3.5" />
              <div className="brass-rivet absolute bottom-3.5 right-3.5" />

              <div>
                {/* Header Metrics Banner */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-[#6B8E23]/40">
                  <span className="olive-recessed-channel text-[10.5px] font-sans tracking-widest text-[#F4D03F] font-bold px-2.5 py-1 rounded border border-[#6B8E23]/60 uppercase">
                    {item.badge}
                  </span>
                  <div className="olive-recessed-channel flex items-center space-x-1.5 text-[#F4D03F] font-sans text-xs font-bold px-3 py-1 rounded border border-[#6B8E23]/60">
                    <TrendingUp className="w-3.5 h-3.5 text-[#F4D03F]" />
                    <span>{item.impactMetric}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#F4D03F] transition-colors font-syne tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs font-sans text-[#EDC9AF] mb-4">{item.clientSector}</p>
                <p className="text-xs sm:text-sm text-[#FAF1E8] leading-relaxed mb-6 font-sans">
                  {item.summary}
                </p>

                {/* Key Results list in DM Mono */}
                <div className="space-y-2 mb-6 font-sans">
                  {item.results.slice(0, 3).map((res: string, i: number) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-[#EDC9AF]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F4D03F] mt-0.5 shrink-0" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Stack Pills in Recessed Well */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#6B8E23]/40 mb-6 font-sans">
                  {item.techStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="text-[10px] font-sans px-2 py-0.5 rounded olive-recessed-channel border border-[#6B8E23]/40 text-[#EDC9AF]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Tactile Hardware Details Button */}
                <button
                  onClick={() => setSelectedCase(item)}
                  className="key-tactical-olive w-full py-3 rounded-xl text-xs font-sans font-bold tracking-wider text-[#EDC9AF] hover:text-[#F4D03F] transition-all flex items-center justify-center space-x-2 cursor-pointer group/btn"
                >
                  <span className="uppercase">EXAMINE SYSTEM ARCHITECTURE</span>
                  <ArrowUpRight className="w-4 h-4 text-[#F4D03F] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );

  return (
    <>
        <GallerySection
          id="case-studies"
          eyebrow={
            <>
              <Layers className="w-3.5 h-3.5" />
              <span className="font-medium">Case studies</span>
            </>
          }
          heading={
            <>
              Proven work, <span className="text-[#0C5A63]">measurable results.</span>
            </>
          }
          intro="Walk through projects where our product teams and embedded engineers delivered outcomes our clients could measure, from factory floors to cold-chain fleets."
          items={galleryItems}
          list={list}
          onOpen={openCase}
          openLabel="Open case study"
          theme="sand"
        />

        {/* Case Study Deep-Dive Modal */}
        {selectedCase && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            onMouseDown={(e) => e.target === e.currentTarget && closeCase()}
          >
            <div
              ref={caseDialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={caseTitleId}
              tabIndex={-1}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto overscroll-contain olive-carbon-panel p-7 sm:p-9 rounded-3xl text-[#EDC9AF] outline-none"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeCase}
                aria-label="Close case study"
                className="key-tactical-olive absolute top-5 right-5 p-2 rounded-xl text-[#EDC9AF] hover:text-[#F4D03F] cursor-pointer z-10"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="mb-4 pr-12">
                <span className="olive-recessed-channel text-[11px] font-sans text-[#F4D03F] px-3 py-1 rounded border border-[#6B8E23] inline-block mb-2 uppercase font-bold">
                  {selectedCase.badge}
                </span>
                <h2 id={caseTitleId} className="text-2xl font-bold text-white mb-2 font-syne">{selectedCase.title}</h2>
                <p className="text-xs font-sans text-[#EDC9AF]">{selectedCase.clientSector}</p>
              </div>

              {/* Verified Result Banner */}
              <div className="p-4 rounded-xl olive-recessed-channel border border-[#6B8E23] flex items-center justify-between mb-6">
                <div>
                  <div className="text-[10px] font-sans text-[#A2B682] uppercase tracking-wider">MEASURABLE ROI ACHIEVED</div>
                  <div className="text-xl font-bold font-syne text-[#F4D03F]">
                    {selectedCase.impactMetric}
                  </div>
                </div>
                <div className="text-right text-[11px] font-sans text-[#EDC9AF]">
                  <span>Turnkey Cyber-Physical + Staff Augmentation</span>
                </div>
              </div>

              {/* Problem vs Solution */}
              <div className="space-y-4 mb-6 font-sans">
                <div>
                  <h4 className="text-sm font-bold text-[#F4D03F] uppercase mb-1 tracking-wider">
                    The Engineering Challenge
                  </h4>
                  <p className="text-xs sm:text-sm text-[#EDC9AF] leading-relaxed olive-recessed-channel p-3.5 rounded-lg border border-[#6B8E23]/40">
                    {selectedCase.problem}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#8BAE3A] uppercase mb-1 tracking-wider">
                    The Qubryon Cyber-Physical Architecture
                  </h4>
                  <p className="text-xs sm:text-sm text-[#FAF1E8] leading-relaxed olive-recessed-channel p-3.5 rounded-lg border border-[#6B8E23]/40">
                    {selectedCase.solution}
                  </p>
                </div>
              </div>

              {/* System Architecture Data Flow */}
              <div className="mb-6">
                <h4 className="text-sm font-bold font-sans text-[#F4D03F] uppercase mb-2 tracking-wider">
                  System Architecture Pipeline
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                  {selectedCase.architecture.map((arch: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg olive-recessed-channel border border-[#6B8E23]/40 text-[#EDC9AF] flex items-center space-x-2"
                    >
                      <span className="text-[#F4D03F] font-bold">0{idx + 1}.</span>
                      <span>{arch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Results */}
              <div className="mb-6 font-sans">
                <h4 className="text-sm font-bold text-white uppercase mb-2 tracking-wider font-syne">
                  Verified Performance Outcomes
                </h4>
                <div className="space-y-2">
                  {selectedCase.results.map((r: string, idx: number) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-[#FAF1E8]">
                      <CheckCircle2 className="w-4 h-4 text-[#F4D03F] mt-0.5 shrink-0" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="pt-4 border-t border-[#6B8E23]/40 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="text-[11px] font-sans text-[#EDC9AF]">
                  Ready to deploy a similar architecture for your enterprise?
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="key-signal-yellow px-6 py-2.5 rounded-xl font-sans text-xs tracking-wider uppercase cursor-pointer"
                >
                  Close case study
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
