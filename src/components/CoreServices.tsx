"use client";

import React, { useState } from "react";
import {
  Cpu,
  Users,
  Radio,
  Layers,
  Network,
  Eye,
  CheckCircle2,
  ArrowRight,
  Database,
  ShieldAlert,
  Server,
  Zap,
} from "lucide-react";

interface CoreServicesProps {
  onOpenConsultation: () => void;
  onOpenTalentModal: () => void;
}

export default function CoreServices({ onOpenConsultation, onOpenTalentModal }: CoreServicesProps) {
  const [selectedService, setSelectedService] = useState<number>(0);

  const services = [
    {
      id: "iot-ai-dev",
      flagship: true,
      title: "Custom IoT & AI Development",
      category: "FULL-STACK HARDWARE & SOFTWARE",
      icon: Cpu,
      tagline: "Connecting physical sensors to enterprise intelligence with sub-second latency.",
      description:
        "We build end-to-end custom IoT solutions—from low-level microcontroller firmware to resilient cloud ingestion fabrics and on-device edge AI predictive models.",
      features: [
        "Smart Device Connectivity: ESP32, ARM Cortex, STM32, Nordic nRF, Zephyr RTOS, FreeRTOS.",
        "Resilient Cloud Pipelines: High-throughput ingestion with AWS IoT Core, Azure IoT Hub, Apache Kafka, and TimescaleDB.",
        "Real-Time AI & Predictive Analytics: On-device anomaly detection, vibration telemetry, predictive maintenance, and operational digital twins.",
        "Ultra-low Power & Mesh Protocols: BLE 5.3, LoRaWAN, Cellular NB-IoT/LTE-M, Modbus RTU/TCP, and MQTT v5 with TLS 1.3.",
      ],
      deliverables: [
        "Production-ready Embedded Firmware",
        "Cloud Ingestion & Streaming Data Architecture",
        "Edge AI Inference Models (TensorFlow Lite / ONNX)",
        "Executive & Operational Live Telemetry Dashboards",
      ],
      techBadge: ["ESP-IDF", "Zephyr", "MQTT", "AWS IoT", "PyTorch", "TimescaleDB"],
      ctaText: "Architect Your IoT System",
      action: onOpenConsultation,
    },
    {
      id: "staff-augmentation",
      flagship: true,
      title: "IT Staff Augmentation",
      category: "PRE-VETTED TALENT DEPLOYMENT",
      icon: Users,
      tagline: "Scale your engineering velocity with elite IoT, AI, firmware, and cloud specialists.",
      description:
        "Bypass recruitment bottlenecks. We embed senior engineers vetted through rigorous hardware-in-the-loop and algorithmic benchmarks directly into your sprint teams.",
      features: [
        "Top 2% Vetted Engineers: Embedded C/C++, Rust, Python, PyTorch, AWS/Azure Cloud, and React/Next.js.",
        "Rapid Onboarding (&lt; 48 Hours): Immediate sprint integration with full time-zone alignment and zero ramp-up friction.",
        "Flexible Engagement Models: Dedicated full-time individual contributors, fractional domain specialists, or complete managed delivery pods.",
        "Enterprise IP Protection: 100% intellectual property assignment, robust NDAs, and strict SOC-2 compliant code governance.",
      ],
      deliverables: [
        "Dedicated Senior Engineers or Tech Leads",
        "2-Week Risk-Free Trial Period",
        "Direct Jira / Slack / GitHub Integration",
        "Weekly Velocity & Sprint Delivery Reports",
      ],
      techBadge: ["Embedded C", "Rust", "Python", "AWS Cloud", "Edge AI", "React"],
      ctaText: "Request Vetted Profiles",
      action: onOpenTalentModal,
    },
    {
      id: "industrial-iot",
      flagship: false,
      title: "Industrial IoT 4.0 & Digital Twins",
      category: "SMART MANUFACTURING & AUTOMATION",
      icon: Network,
      tagline: "Modernizing legacy manufacturing floors with SCADA bridges and virtual replicas.",
      description:
        "Connect legacy machinery via Modbus, OPC-UA, and CAN-bus. We aggregate high-frequency vibration, thermal, and electrical telemetry to prevent costly factory downtime.",
      features: [
        "Legacy Machine Integration: Non-invasive sensor retrofitting and PLC/SCADA bridges.",
        "Digital Twin Models: Real-time 3D telemetry synchronized with physical asset states.",
        "Overall Equipment Effectiveness (OEE): Automated bottleneck identification and energy consumption auditing.",
      ],
      deliverables: [
        "Industrial Gateway Gateway Setup",
        "Modbus/OPC-UA Cloud Connector",
        "Real-Time OEE Analytics Suite",
      ],
      techBadge: ["OPC-UA", "Modbus TCP", "CAN Bus", "Grafana", "Timescale"],
      ctaText: "Discuss IIoT Retrofit",
      action: onOpenConsultation,
    },
    {
      id: "edge-ai-vision",
      flagship: false,
      title: "Edge AI & Computer Vision",
      category: "ON-DEVICE DEEP LEARNING",
      icon: Eye,
      tagline: "Ultra-fast neural inference right at the sensor edge without cloud latency.",
      description:
        "Deploy lightweight computer vision and deep learning models to NVIDIA Jetson, Raspberry Pi, and edge microcontrollers for automated defect detection, worker safety, and spatial monitoring.",
      features: [
        "Sub-Millimeter Defect Detection: High-speed conveyor camera inspection at 120+ FPS.",
        "Edge Model Quantization: TensorRT and TensorFlow Lite optimizations for low-wattage silicon.",
        "Autonomous Visual Triggers: Real-time edge alarms without reliance on continuous cloud connectivity.",
      ],
      deliverables: [
        "Trained & Quantized Vision Models",
        "Jetson / Edge Hardware Firmware",
        "Event Triggering & Cloud Sync API",
      ],
      techBadge: ["TensorRT", "OpenCV", "YOLOv10", "Jetson Orin", "Python"],
      ctaText: "Explore Edge AI Vision",
      action: onOpenConsultation,
    },
    {
      id: "firmware-engineering",
      flagship: false,
      title: "Embedded Firmware & Hardware Prototyping",
      category: "SILICON & EMBEDDED RTOS",
      icon: Radio,
      tagline: "Hardened, battery-optimized embedded software with fail-safe OTA updates.",
      description:
        "We develop rock-solid bare-metal and RTOS firmware designed for mission-critical environmental extremes, multi-year battery lifespans, and cryptographically signed OTA security.",
      features: [
        "Real-Time Operating Systems: Zephyr RTOS, FreeRTOS, and custom dual-core task schedulers.",
        "Cryptographic Over-The-Air (OTA) Updates: Dual-bank A/B partitioning with automatic rollback.",
        "Ultra-Low Power Profiling: Deep sleep states yielding 5+ years on primary coin cells.",
      ],
      deliverables: [
        "Modular C/C++ / Rust Codebase",
        "Hardware-in-the-Loop Test Suites",
        "Schematic & PCB Design Review",
      ],
      techBadge: ["ARM Cortex-M", "ESP32-S3", "STM32", "Zephyr RTOS", "JTAG"],
      ctaText: "Review Firmware Roadmap",
      action: onOpenConsultation,
    },
    {
      id: "enterprise-cloud-iot",
      flagship: false,
      title: "Enterprise IoT Cloud & Analytics Fabric",
      category: "CLOUD DATA PLATFORMS",
      icon: Server,
      tagline: "Scalable data ingestion pipelines handling millions of sensor telemetry events.",
      description:
        "Transform raw sensor bytes into actionable business intelligence. We construct secure multi-tenant cloud backends, time-series data warehouses, and interactive live dashboards.",
      features: [
        "Billion-Message Scaling: Serverless and containerized event streams built on AWS and Azure.",
        "Time-Series Data Warehousing: Optimized for sub-second analytical queries across millions of devices.",
        "Custom Client Portals: Modern Next.js and Three.js 3D telemetry dashboards with granular RBAC.",
      ],
      deliverables: [
        "Infrastructure as Code (Terraform)",
        "Microservices & WebSocket APIs",
        "Multi-Tenant Admin & Customer Portals",
      ],
      techBadge: ["AWS IoT Core", "Kafka", "PostgreSQL", "Next.js", "Docker"],
      ctaText: "Build Cloud Data Fabric",
      action: onOpenConsultation,
    },
  ];

  return (
    <section id="services" className="relative py-24 bg-slate-950/90 text-white cyber-grid">
      {/* Decorative Top Separator with glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-3">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>CORE ENGINEERING SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Custom IoT & AI Systems. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
              Plus On-Demand Staff Augmentation.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Whether you need a full turnkey cyber-physical deployment from scratch or pre-vetted senior engineers to bolster your existing in-house team, Qubryon delivers enterprise reliability.
          </p>
        </div>

        {/* 2 Primary Flagship Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.slice(0, 2).map((service, index) => {
            const Icon = service.icon;
            const isAugmentation = service.id === "staff-augmentation";

            return (
              <div
                key={service.id}
                className={`relative rounded-2xl p-8 transition-all duration-300 glass-panel-card border ${
                  isAugmentation
                    ? "border-sky-500/40 hover:border-sky-400 hover:shadow-[0_0_35px_rgba(14,165,233,0.25)]"
                    : "border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]"
                }`}
              >
                {/* Flagship Banner */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isAugmentation
                          ? "bg-sky-950/80 border border-sky-400/40 text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                          : "bg-cyan-950/80 border border-cyan-400/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono tracking-wider text-cyan-400 font-bold block">
                        FLAGSHIP PILLAR 0{index + 1}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{service.title}</h3>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hidden sm:inline-block">
                    {service.category}
                  </span>
                </div>

                <p className="text-sm font-medium text-cyan-300/90 mb-3">{service.tagline}</p>
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">{service.description}</p>

                {/* Key Capabilities */}
                <div className="space-y-2.5 mb-6">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          isAugmentation ? "text-sky-400" : "text-cyan-400"
                        }`}
                      />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-4 border-t border-slate-800/80 mb-6">
                  <div className="text-[11px] font-mono text-slate-400 mb-2">KEY TECHNOLOGIES:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {service.techBadge.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded text-xs font-mono bg-slate-900 border border-cyan-500/20 text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  onClick={service.action}
                  className={`w-full py-3 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    isAugmentation
                      ? "bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 hover:from-sky-300 hover:to-blue-400 shadow-[0_0_20px_rgba(14,165,233,0.4)]"
                      : "bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  }`}
                >
                  <span>{service.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* 4 Specialized Extended Capabilities Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Specialized Engineering Domains
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
                Modular expertise tailored for smart factories, medical hardware, clean energy, and autonomous robotics.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(2).map((item, idx) => {
              const SubIcon = item.icon;
              return (
                <div
                  key={item.id}
                  className="glass-panel-card p-6 rounded-xl border border-slate-800 hover:border-cyan-500/40 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-slate-900 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 group-hover:border-cyan-400/50 transition-all">
                      <SubIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 tracking-wider font-semibold block mb-1">
                      {item.category}
                    </span>
                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.techBadge.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={item.action}
                      className="w-full py-2 rounded-lg text-xs font-mono font-medium text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <span>Explore Domain</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
