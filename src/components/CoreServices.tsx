"use client";

import React from "react";
import {
  Cpu,
  Users,
  Radio,
  Layers,
  Network,
  Eye,
  CheckCircle2,
  ArrowRight,
  Server,
  Zap,
} from "lucide-react";

interface CoreServicesProps {
  onOpenConsultation: () => void;
  onOpenTalentModal: () => void;
}

export default function CoreServices({ onOpenConsultation, onOpenTalentModal }: CoreServicesProps) {
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
      ctaText: "ARCHITECT YOUR IOT SYSTEM",
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
        "Rapid Onboarding (< 48 Hours): Immediate sprint integration with full time-zone alignment and zero ramp-up friction.",
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
      ctaText: "REQUEST VETTED PROFILES",
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
      ctaText: "DISCUSS IIOT RETROFIT",
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
      ctaText: "EXPLORE EDGE AI VISION",
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
      ctaText: "REVIEW FIRMWARE ROADMAP",
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
      ctaText: "BUILD CLOUD DATA FABRIC",
      action: onOpenConsultation,
    },
  ];

  return (
    <section id="services" className="relative py-28 bg-[#E5BFA5] text-[#1C260D] sand-cyber-grid">
      {/* Top Hardware Rim Highlight in Olive Drab */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#6B8E23] to-transparent shadow-[0_0_12px_rgba(107,142,35,0.6)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Syne & DM Mono */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="olive-recessed-channel inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#6B8E23] text-[#F4D03F] font-mono text-xs mb-3 shadow-md">
            <Zap className="w-3.5 h-3.5 text-[#F4D03F]" />
            <span className="tracking-[0.18em] uppercase font-bold">
              CORE ENGINEERING SERVICES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#172108] mb-4 font-syne">
            <span className="block drop-shadow-sm">Custom IoT &amp; AI Systems.</span>
            <span className="block mt-1 text-[#466016]">
              Plus On-Demand Staff Augmentation.
            </span>
          </h2>
          <p className="text-[#3A4A1C] text-sm sm:text-base leading-relaxed font-mono">
            Whether you need a full turnkey cyber-physical deployment from scratch or pre-vetted senior engineers to bolster your existing in-house team, Qubryon delivers enterprise reliability.
          </p>
        </div>

        {/* 2 Primary Flagship Pillars (30% Olive Drab Palette) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.slice(0, 2).map((service, index) => {
            const Icon = service.icon;
            const isAugmentation = service.id === "staff-augmentation";

            return (
              <div
                key={service.id}
                className="relative rounded-3xl p-7 sm:p-9 transition-all duration-300 olive-chassis overflow-hidden group shadow-xl"
              >
                {/* Brass Rivet Accents */}
                <div className="brass-rivet absolute top-3.5 left-3.5" />
                <div className="brass-rivet absolute top-3.5 right-3.5" />
                <div className="brass-rivet absolute bottom-3.5 left-3.5" />
                <div className="brass-rivet absolute bottom-3.5 right-3.5" />

                {/* Flagship Header Banner */}
                <div className="flex items-center justify-between mb-6 border-b border-[#6B8E23]/40 pb-5">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-13 h-13 rounded-xl p-0.5 bg-gradient-to-b from-[#8BAE3A] via-[#6B8E23] to-[#172108] shadow-[0_4px_8px_rgba(0,0,0,0.5)] flex items-center justify-center">
                      <div className="w-full h-full rounded-[10px] bg-[#172108] flex items-center justify-center border border-[#6B8E23]">
                        <Icon className="w-6 h-6 text-[#F4D03F] drop-shadow-[0_0_8px_rgba(244,208,63,0.8)]" />
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.22em] text-[#F4D03F] font-bold uppercase block">
                        FLAGSHIP MODULE 0{index + 1}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-syne tracking-wide">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <span className="olive-recessed-channel text-[11px] font-mono px-3 py-1 rounded-md text-[#EDC9AF] hidden sm:inline-block border border-[#6B8E23]/50">
                    {service.category}
                  </span>
                </div>

                <p className="text-sm font-semibold text-[#F4D03F] mb-3 font-mono">{service.tagline}</p>
                <p className="text-xs sm:text-sm text-[#EDC9AF] mb-6 leading-relaxed font-mono">
                  {service.description}
                </p>

                {/* Key Capabilities in DM Mono */}
                <div className="space-y-3 mb-6 font-mono">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#FAF1E8]">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#F4D03F]" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills in Recessed Well */}
                <div className="pt-4 border-t border-[#6B8E23]/40 mb-7">
                  <div className="text-[10.5px] font-mono text-[#A2B682] mb-2 tracking-widest uppercase">
                    HARDWARE &amp; PROTOCOL SPEC:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.techBadge.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded text-xs font-mono olive-recessed-channel text-[#F4D03F] border border-[#6B8E23]/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA Button (10% Signal Yellow on Flagship 01) */}
                <button
                  onClick={service.action}
                  className={`w-full py-4 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider flex items-center justify-center space-x-2 cursor-pointer select-none group shadow-lg ${
                    isAugmentation ? "key-tactical-olive" : "key-signal-yellow"
                  }`}
                >
                  <span className={isAugmentation ? "text-[#F4D03F] font-bold" : "text-[#172108]"}>
                    {service.ctaText}
                  </span>
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isAugmentation ? "text-[#F4D03F]" : "text-[#172108]"}`} />
                </button>
              </div>
            );
          })}
        </div>

        {/* 4 Specialized Extended Capabilities Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8 border-b border-[#6B8E23]/40 pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#172108] font-syne tracking-wide">
                Specialized Engineering Domains
              </h3>
              <p className="text-xs sm:text-sm text-[#425227] font-mono mt-1">
                Modular expertise tailored for smart factories, medical hardware, clean energy, and autonomous robotics.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(2).map((item) => {
              const SubIcon = item.icon;
              return (
                <div
                  key={item.id}
                  className="olive-chassis p-6 rounded-2xl flex flex-col justify-between group hover:border-[#F4D03F] transition-all relative overflow-hidden shadow-md"
                >
                  <div className="brass-rivet absolute top-2 right-2" />

                  <div>
                    <div className="w-11 h-11 rounded-xl bg-[#172108] border border-[#6B8E23] flex items-center justify-center text-[#F4D03F] mb-4 group-hover:scale-105 shadow-inner transition-all">
                      <SubIcon className="w-5 h-5 drop-shadow-[0_0_6px_rgba(244,208,63,0.8)]" />
                    </div>
                    <span className="text-[10px] font-mono text-[#F4D03F] tracking-[0.2em] font-bold block mb-1 uppercase">
                      {item.category}
                    </span>
                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-[#F4D03F] transition-colors font-syne">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#EDC9AF] leading-relaxed mb-5 font-mono">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {item.techBadge.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded olive-recessed-channel text-[#EDC9AF] border border-[#6B8E23]/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={item.action}
                      className="key-tactical-olive w-full py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider text-[#EDC9AF] hover:text-[#F4D03F] transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <span>EXPLORE DOMAIN</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F4D03F]" />
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
