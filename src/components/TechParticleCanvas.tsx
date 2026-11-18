"use client";

import React, { useEffect, useRef, useState } from "react";
import { Cpu, Activity, Zap, ShieldCheck } from "lucide-react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  baseRadius: number;
  color: string;
  type: "sensor" | "gateway" | "ai_node" | "cloud";
  label: string;
  pulsePhase: number;
}

interface Packet {
  sourceIndex: number;
  targetIndex: number;
  progress: number;
  speed: number;
  color: string;
}

export default function TechParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeMode, setActiveMode] = useState<"all" | "edge" | "ai" | "twin">("all");
  const [dataFlowSpeed, setDataFlowSpeed] = useState<number>(1);
  const [activeTelemetry, setActiveTelemetry] = useState({
    packetsPerSec: 1420,
    activeNodes: 42,
    syncLatency: "3.8ms",
    status: "ONLINE // OPTIMAL",
  });

  const mouseRef = useRef({ x: 0, y: 0, isHovering: false });
  const shockwaveRef = useRef<{ radius: number; maxRadius: number; active: boolean }>({
    radius: 0,
    maxRadius: 300,
    active: false,
  });

  const triggerShockwave = () => {
    shockwaveRef.current = {
      radius: 10,
      maxRadius: 350,
      active: true,
    };
    setActiveTelemetry((prev) => ({
      ...prev,
      packetsPerSec: Math.floor(2000 + Math.random() * 800),
      syncLatency: "2.1ms",
    }));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initialize 3D nodes
    const nodeCount = 38;
    const nodes: Node3D[] = [];
    const sphereRadius = Math.min(width, height) * 0.38;

    const nodeTypes: Array<Node3D["type"]> = ["sensor", "gateway", "ai_node", "cloud"];
    const labels = [
      "ESP32-S3 Edge",
      "MQTT Broker",
      "ARM Cortex-M55",
      "PyTorch Edge Engine",
      "AWS IoT Gateway",
      "CAN-Bus Master",
      "Zephyr RTOS Pod",
      "TimescaleDB Node",
      "LoRaWAN Gateway",
      "TensorRT Engine",
      "Vision AI Core",
      "Modbus RTU Hub",
    ];

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);

      const type = nodeTypes[i % nodeTypes.length];
      // Earthy-tech palette: Signal Yellow, Olive Drab, Sand Tones
      let color = "#F4D03F"; // Signal Yellow (Sensors)
      if (type === "gateway") color = "#8BAE3A"; // Olive Drab light
      if (type === "ai_node") color = "#FFF275"; // Vibrant Light Yellow
      if (type === "cloud") color = "#EDC9AF"; // Desert Sand

      nodes.push({
        x,
        y,
        z,
        baseRadius: type === "cloud" || type === "ai_node" ? 4.5 : 3,
        color,
        type,
        label: labels[i % labels.length],
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Initialize Telemetry Data Packets (Signal Yellow sparks)
    const packets: Packet[] = [];
    for (let i = 0; i < 18; i++) {
      const src = Math.floor(Math.random() * nodeCount);
      let target = Math.floor(Math.random() * nodeCount);
      while (target === src) target = Math.floor(Math.random() * nodeCount);
      packets.push({
        sourceIndex: src,
        targetIndex: target,
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.008,
        color: i % 2 === 0 ? "#F4D03F" : "#EDC9AF",
      });
    }

    let angleX = 0.002;
    let angleY = 0.003;
    let rotX = 0;
    let rotY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep Olive / Desert Sand radial backdrop
      const bgGlow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        width * 0.45
      );
      bgGlow.addColorStop(0, "rgba(107, 142, 35, 0.18)");
      bgGlow.addColorStop(0.5, "rgba(244, 208, 63, 0.06)");
      bgGlow.addColorStop(1, "rgba(18, 26, 7, 0)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Orbital rings in Olive Drab & Sand
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.strokeStyle = "rgba(107, 142, 35, 0.25)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.ellipse(0, 0, sphereRadius * 1.15, sphereRadius * 0.45, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(244, 208, 63, 0.18)";
      ctx.beginPath();
      ctx.ellipse(0, 0, sphereRadius * 1.25, sphereRadius * 0.5, -Math.PI / 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Mouse-influenced rotation
      if (mouseRef.current.isHovering) {
        const targetRotY = (mouseRef.current.x - width / 2) * 0.00008;
        const targetRotX = -(mouseRef.current.y - height / 2) * 0.00008;
        rotY += (targetRotY - rotY) * 0.05;
        rotX += (targetRotX - rotX) * 0.05;
      } else {
        rotY = angleY * 0.7;
        rotX = angleX * 0.7;
      }

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projectedNodes: Array<{
        x2d: number;
        y2d: number;
        scale: number;
        node: Node3D;
        originalIndex: number;
      }> = [];

      nodes.forEach((node, idx) => {
        let x1 = node.x * cosY + node.z * sinY;
        let y1 = node.y;
        let z1 = -node.x * sinY + node.z * cosY;

        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        node.x = x2;
        node.y = y2;
        node.z = z2;

        const fov = 450;
        const scale = fov / (fov + z2);
        const x2d = width / 2 + x2 * scale;
        const y2d = height / 2 + y2 * scale;

        node.pulsePhase += 0.04;

        projectedNodes.push({
          x2d,
          y2d,
          scale,
          node,
          originalIndex: idx,
        });
      });

      const shouldDrawNode = (type: Node3D["type"]) => {
        if (activeMode === "all") return true;
        if (activeMode === "edge" && (type === "sensor" || type === "gateway")) return true;
        if (activeMode === "ai" && (type === "ai_node" || type === "cloud")) return true;
        if (activeMode === "twin") return true;
        return false;
      };

      // Draw connection vectors in Olive Drab
      const maxDistance = sphereRadius * 0.85;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p1 = projectedNodes[i];
          const p2 = projectedNodes[j];

          if (!shouldDrawNode(p1.node.type) || !shouldDrawNode(p2.node.type)) continue;

          const dx = p1.node.x - p2.node.x;
          const dy = p1.node.y - p2.node.y;
          const dz = p1.node.z - p2.node.z;
          const dist3d = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3d < maxDistance) {
            const alpha = (1 - dist3d / maxDistance) * 0.4 * Math.min(p1.scale, p2.scale);
            ctx.beginPath();
            ctx.moveTo(p1.x2d, p1.y2d);
            ctx.lineTo(p2.x2d, p2.y2d);

            if (p1.node.type === "ai_node" || p2.node.type === "ai_node") {
              ctx.strokeStyle = `rgba(244, 208, 63, ${alpha * 1.4})`;
            } else {
              ctx.strokeStyle = `rgba(107, 142, 35, ${alpha * 1.6})`;
            }
            ctx.lineWidth = 1 * Math.min(p1.scale, p2.scale);
            ctx.stroke();
          }
        }
      }

      // Draw Signal Yellow Shockwave if active
      if (shockwaveRef.current.active) {
        const sw = shockwaveRef.current;
        ctx.save();
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, sw.radius, 0, Math.PI * 2);
        const waveAlpha = Math.max(0, 1 - sw.radius / sw.maxRadius);
        ctx.strokeStyle = `rgba(244, 208, 63, ${waveAlpha * 0.9})`;
        ctx.lineWidth = 3;
        ctx.shadowColor = "#F4D03F";
        ctx.shadowBlur = 18;
        ctx.stroke();
        ctx.restore();

        sw.radius += 9 * dataFlowSpeed;
        if (sw.radius >= sw.maxRadius) {
          sw.active = false;
        }
      }

      // Update & Draw Telemetry Data Packets
      packets.forEach((pkt) => {
        const src = projectedNodes[pkt.sourceIndex];
        const tgt = projectedNodes[pkt.targetIndex];
        if (!src || !tgt) return;

        pkt.progress += pkt.speed * dataFlowSpeed;
        if (pkt.progress >= 1) {
          pkt.progress = 0;
          pkt.sourceIndex = Math.floor(Math.random() * nodeCount);
          pkt.targetIndex = Math.floor(Math.random() * nodeCount);
        }

        const currentX = src.x2d + (tgt.x2d - src.x2d) * pkt.progress;
        const currentY = src.y2d + (tgt.y2d - src.y2d) * pkt.progress;
        const currentScale = src.scale + (tgt.scale - src.scale) * pkt.progress;

        ctx.save();
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2.4 * currentScale, 0, Math.PI * 2);
        ctx.fillStyle = pkt.color;
        ctx.shadowColor = pkt.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      });

      projectedNodes.sort((a, b) => a.node.z - b.node.z);

      // Draw Nodes
      projectedNodes.forEach((p) => {
        if (!shouldDrawNode(p.node.type)) return;

        const pulse = 1 + Math.sin(p.node.pulsePhase) * 0.25;
        const radius = p.node.baseRadius * p.scale * pulse;

        ctx.save();

        // Outer glow
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle =
          p.node.type === "ai_node"
            ? "rgba(244, 208, 63, 0.2)"
            : "rgba(107, 142, 35, 0.22)";
        ctx.fill();

        // Core Node
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.node.color;
        ctx.shadowColor = p.node.color;
        ctx.shadowBlur = 12 * p.scale;
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.arc(p.x2d - radius * 0.25, p.y2d - radius * 0.25, radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Label on larger nodes
        if (p.scale > 1.05 && (p.node.type === "ai_node" || p.node.type === "cloud")) {
          ctx.font = `${Math.floor(10 * p.scale)}px "DM Mono", monospace`;
          ctx.fillStyle = "rgba(244, 208, 63, 0.9)";
          ctx.fillText(p.node.label, p.x2d + radius + 6, p.y2d + 3);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeMode, dataFlowSpeed]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovering: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.isHovering = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[540px] md:h-[600px] rounded-3xl overflow-hidden olive-chassis border-2 border-[#6B8E23] shadow-[0_16px_40px_rgba(25,35,10,0.5)] flex flex-col justify-between"
    >
      {/* Top Brass Rivets */}
      <div className="brass-rivet absolute top-3 left-3 z-20" />
      <div className="brass-rivet absolute top-3 right-3 z-20" />
      <div className="brass-rivet absolute bottom-3 left-3 z-20" />
      <div className="brass-rivet absolute bottom-3 right-3 z-20" />

      {/* HUD Header Bar (30% Olive Drab) */}
      <div className="z-10 flex items-center justify-between px-6 py-3.5 border-b border-[#6B8E23]/60 bg-[#1A250B]/90 backdrop-blur-md">
        <div className="flex items-center space-x-2.5">
          <span className="hardware-led-yellow animate-pulse" />
          <span className="text-xs font-mono tracking-[0.2em] text-[#F4D03F] font-bold uppercase">
            3D CYBER-PHYSICAL MESH ENGINE
          </span>
        </div>

        {/* Telemetry Snapshot */}
        <div className="hidden sm:flex items-center space-x-5 text-xs font-mono text-[#EDC9AF]">
          <div className="flex items-center space-x-1.5">
            <Activity className="w-3.5 h-3.5 text-[#F4D03F]" />
            <span>PKT/S:</span>
            <span className="text-[#F4D03F] font-bold">{activeTelemetry.packetsPerSec}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#8BAE3A]" />
            <span>LATENCY:</span>
            <span className="text-[#8BAE3A] font-bold">{activeTelemetry.syncLatency}</span>
          </div>
        </div>

        {/* Pulse Shockwave Action (10% Signal Yellow Button) */}
        <button
          onClick={triggerShockwave}
          className="key-signal-yellow px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 cursor-pointer shadow-md"
          title="Send packet surge pulse across the IoT network"
        >
          <Zap className="w-3 h-3 text-[#172108] fill-[#172108]" />
          <span>PULSE SURGE</span>
        </button>
      </div>

      {/* Main 3D Canvas */}
      <canvas
        ref={canvasRef}
        onClick={triggerShockwave}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing bg-[#141E07]"
      />

      {/* Interactive Cyber HUD Overlays */}
      <div className="z-10 pointer-events-none p-5 flex flex-col justify-end space-y-3">
        {/* Real-time Status Card Bottom Left */}
        <div className="pointer-events-auto max-w-xs p-3.5 rounded-xl olive-chassis-deep border border-[#6B8E23]/60 shadow-xl">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#F4D03F] mb-2 border-b border-[#6B8E23]/40 pb-1">
            <span className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F4D03F]" />
              QUBRYON TELEMETRY BUS
            </span>
            <span className="text-[10px] text-[#172108] bg-[#F4D03F] font-bold px-1.5 py-0.5 rounded">
              ONLINE
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#EDC9AF]">
            <div>
              <span className="text-[#A2B682] block text-[9px]">PROTOCOL</span>
              <span className="text-[#FAF1E8] font-bold">MQTT v5 / TLS 1.3</span>
            </div>
            <div>
              <span className="text-[#A2B682] block text-[9px]">AI INFERENCE</span>
              <span className="text-[#FAF1E8] font-bold">TensorRT Edge</span>
            </div>
            <div>
              <span className="text-[#A2B682] block text-[9px]">FIRMWARE</span>
              <span className="text-[#FAF1E8] font-bold">Zephyr RTOS 3.6</span>
            </div>
            <div>
              <span className="text-[#A2B682] block text-[9px]">LOCATION</span>
              <span className="text-[#F4D03F] font-bold">TN, India (HQ)</span>
            </div>
          </div>
        </div>

        {/* Mode Selector Bottom Center/Right */}
        <div className="pointer-events-auto flex flex-wrap items-center justify-between gap-2 bg-[#1A250B]/90 backdrop-blur-md p-2 rounded-xl border border-[#6B8E23]/60 shadow-lg">
          <div className="flex items-center space-x-1.5 text-xs">
            {(
              [
                { id: "all", label: "Full Mesh" },
                { id: "edge", label: "Edge IoT" },
                { id: "ai", label: "Neural Net" },
                { id: "twin", label: "Digital Twin" },
              ] as const
            ).map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono tracking-wider font-bold transition-all cursor-pointer ${
                  activeMode === mode.id
                    ? "key-signal-yellow"
                    : "text-[#EDC9AF] hover:text-[#F4D03F] hover:bg-[#283710]"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#EDC9AF]">
            <span>Speed:</span>
            <button
              onClick={() => setDataFlowSpeed((s) => (s === 1 ? 2 : s === 2 ? 0.5 : 1))}
              className="key-tactical-olive px-2 py-0.5 rounded text-xs cursor-pointer"
            >
              {dataFlowSpeed === 1 ? "1.0x" : dataFlowSpeed === 2 ? "2.0x" : "0.5x"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
