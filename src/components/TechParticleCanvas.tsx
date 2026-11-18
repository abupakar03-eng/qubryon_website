"use client";

import React, { useEffect, useRef, useState } from "react";
import { Cpu, Activity, RefreshCw, Zap, ShieldCheck } from "lucide-react";

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
      // Golden spiral spherical distribution
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);

      const type = nodeTypes[i % nodeTypes.length];
      let color = "#06b6d4"; // cyan
      if (type === "gateway") color = "#0284c7"; // sky
      if (type === "ai_node") color = "#38bdf8"; // neon light cyan
      if (type === "cloud") color = "#3b82f6"; // electric blue

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

    // Initialize Telemetry Data Packets
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
        color: i % 2 === 0 ? "#00f0ff" : "#60a5fa",
      });
    }

    let angleX = 0.002;
    let angleY = 0.003;
    let rotX = 0;
    let rotY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle cybernetic radial glow in background of canvas
      const bgGlow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        width * 0.45
      );
      bgGlow.addColorStop(0, "rgba(6, 182, 212, 0.08)");
      bgGlow.addColorStop(0.5, "rgba(14, 165, 233, 0.03)");
      bgGlow.addColorStop(1, "rgba(3, 7, 18, 0)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle orbital rings
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.strokeStyle = "rgba(6, 182, 212, 0.09)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.ellipse(0, 0, sphereRadius * 1.15, sphereRadius * 0.45, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(59, 130, 246, 0.08)";
      ctx.beginPath();
      ctx.ellipse(0, 0, sphereRadius * 1.25, sphereRadius * 0.5, -Math.PI / 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Smooth mouse-influenced rotation
      if (mouseRef.current.isHovering) {
        const targetRotY = (mouseRef.current.x - width / 2) * 0.00008;
        const targetRotX = -(mouseRef.current.y - height / 2) * 0.00008;
        rotY += (targetRotY - rotY) * 0.05;
        rotX += (targetRotX - rotX) * 0.05;
      } else {
        rotY = angleY * 0.7;
        rotX = angleX * 0.7;
      }

      // Rotate nodes around center
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
        // Y-axis rotation
        let x1 = node.x * cosY + node.z * sinY;
        let y1 = node.y;
        let z1 = -node.x * sinY + node.z * cosY;

        // X-axis rotation
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        node.x = x2;
        node.y = y2;
        node.z = z2;

        // Perspective projection
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

      // Filter nodes based on activeMode
      const shouldDrawNode = (type: Node3D["type"]) => {
        if (activeMode === "all") return true;
        if (activeMode === "edge" && (type === "sensor" || type === "gateway")) return true;
        if (activeMode === "ai" && (type === "ai_node" || type === "cloud")) return true;
        if (activeMode === "twin") return true;
        return false;
      };

      // Draw connection vectors
      const maxDistance = sphereRadius * 0.85;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p1 = projectedNodes[i];
          const p2 = projectedNodes[j];

          if (!shouldDrawNode(p1.node.type) || !shouldDrawNode(p2.node.type)) continue;

          // 3D Euclidean distance
          const dx = p1.node.x - p2.node.x;
          const dy = p1.node.y - p2.node.y;
          const dz = p1.node.z - p2.node.z;
          const dist3d = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3d < maxDistance) {
            const alpha = (1 - dist3d / maxDistance) * 0.35 * Math.min(p1.scale, p2.scale);
            ctx.beginPath();
            ctx.moveTo(p1.x2d, p1.y2d);
            ctx.lineTo(p2.x2d, p2.y2d);

            if (p1.node.type === "ai_node" || p2.node.type === "ai_node") {
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 1.3})`;
            } else {
              ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            }
            ctx.lineWidth = 1 * Math.min(p1.scale, p2.scale);
            ctx.stroke();
          }
        }
      }

      // Draw Shockwave if active
      if (shockwaveRef.current.active) {
        const sw = shockwaveRef.current;
        ctx.save();
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, sw.radius, 0, Math.PI * 2);
        const waveAlpha = Math.max(0, 1 - sw.radius / sw.maxRadius);
        ctx.strokeStyle = `rgba(0, 240, 255, ${waveAlpha * 0.8})`;
        ctx.lineWidth = 3;
        ctx.shadowColor = "#00f0ff";
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
        ctx.arc(currentX, currentY, 2.2 * currentScale, 0, Math.PI * 2);
        ctx.fillStyle = pkt.color;
        ctx.shadowColor = pkt.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      });

      // Sort nodes by depth (z) to render back-to-front
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
            ? "rgba(56, 189, 248, 0.15)"
            : "rgba(6, 182, 212, 0.12)";
        ctx.fill();

        // Core Node
        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.node.color;
        ctx.shadowColor = p.node.color;
        ctx.shadowBlur = 12 * p.scale;
        ctx.fill();

        // Inner specular highlight
        ctx.beginPath();
        ctx.arc(p.x2d - radius * 0.25, p.y2d - radius * 0.25, radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Label on larger nodes or when depth is near
        if (p.scale > 1.05 && (p.node.type === "ai_node" || p.node.type === "cloud")) {
          ctx.font = `${Math.floor(10 * p.scale)}px ui-monospace, monospace`;
          ctx.fillStyle = "rgba(224, 242, 254, 0.85)";
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
      className="relative w-full h-[540px] md:h-[600px] rounded-2xl overflow-hidden glass-panel border border-cyan-500/20 bg-slate-950/80 shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col justify-between"
    >
      {/* HUD Header Bar */}
      <div className="z-10 flex items-center justify-between px-4 py-3 border-b border-cyan-500/20 bg-slate-900/60 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-mono tracking-wider text-cyan-300 font-semibold uppercase">
            3D Cyber-Physical Mesh Engine
          </span>
        </div>

        {/* Telemetry Snapshot */}
        <div className="hidden sm:flex items-center space-x-4 text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-1">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Pkt/s:</span>
            <span className="text-cyan-300 font-bold">{activeTelemetry.packetsPerSec}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>Latency:</span>
            <span className="text-blue-300 font-bold">{activeTelemetry.syncLatency}</span>
          </div>
        </div>

        {/* Pulse Shockwave Action */}
        <button
          onClick={triggerShockwave}
          className="flex items-center space-x-1 px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-100 text-xs font-mono transition-all cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.2)]"
          title="Send packet surge pulse across the IoT network"
        >
          <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400" />
          <span>Pulse Surge</span>
        </button>
      </div>

      {/* Main 3D Canvas */}
      <canvas
        ref={canvasRef}
        onClick={triggerShockwave}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Interactive Cyber HUD Overlays */}
      <div className="z-10 pointer-events-none p-4 flex flex-col justify-end space-y-3">
        {/* Real-time Status Card Bottom Left */}
        <div className="pointer-events-auto max-w-xs p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-cyan-500/20 shadow-lg">
          <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 mb-1.5 border-b border-cyan-500/20 pb-1">
            <span className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              QUBRYON TELEMETRY BUS
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
              ACTIVE
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-300">
            <div>
              <span className="text-slate-500 block">PROTOCOL</span>
              <span className="text-cyan-300 font-semibold">MQTT v5 / TLS 1.3</span>
            </div>
            <div>
              <span className="text-slate-500 block">AI INFERENCE</span>
              <span className="text-cyan-300 font-semibold">TensorRT Edge</span>
            </div>
            <div>
              <span className="text-slate-500 block">FIRMWARE</span>
              <span className="text-cyan-300 font-semibold">Zephyr RTOS 3.6</span>
            </div>
            <div>
              <span className="text-slate-500 block">LOCATION</span>
              <span className="text-cyan-300 font-semibold">TN, India (HQ)</span>
            </div>
          </div>
        </div>

        {/* Mode Selector Bottom Center/Right */}
        <div className="pointer-events-auto flex flex-wrap items-center justify-between gap-2 bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-cyan-500/20">
          <div className="flex items-center space-x-1 text-xs">
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
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  activeMode === mode.id
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                    : "text-slate-400 hover:text-cyan-200 hover:bg-slate-800/60"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
            <span>Speed:</span>
            <button
              onClick={() => setDataFlowSpeed((s) => (s === 1 ? 2 : s === 2 ? 0.5 : 1))}
              className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 hover:border-cyan-500/50 cursor-pointer"
            >
              {dataFlowSpeed === 1 ? "1.0x" : dataFlowSpeed === 2 ? "2.0x" : "0.5x"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
