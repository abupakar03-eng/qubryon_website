"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cpu, Menu, X, ArrowRight, ShieldCheck, ChevronRight, Users, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenTalentModal: () => void;
}

export default function Navbar({ onOpenConsultation, onOpenTalentModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "CORE SERVICES", href: "#services", id: "services" },
    { name: "STAFF AUGMENTATION", href: "#talent", id: "talent" },
    { name: "TECH STACKS", href: "#tech-stacks", id: "tech-stacks" },
    { name: "CASE STUDIES", href: "#case-studies", id: "case-studies" },
    { name: "COMPANY", href: "#corporate", id: "corporate" },
    { name: "CONTACT", href: "#contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-[#050913]/95 backdrop-blur-xl border-b border-cyan-500/30 shadow-[0_12px_36px_rgba(0,0,0,0.9),0_0_24px_rgba(6,182,212,0.18)]"
          : "py-4 bg-[#070c17]/90 backdrop-blur-lg border-b border-slate-800/80 shadow-[0_8px_24px_rgba(0,0,0,0.7)]"
      }`}
    >
      {/* Top Brushed Metal Rim-Light Line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-slate-300/40 to-transparent pointer-events-none" />

      {/* Main Hardware Container Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl brushed-metal-dark border border-slate-700/60 border-t-slate-500/40 border-b-black px-4 py-2.5 sm:px-5 sm:py-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.9),0_8px_24px_rgba(0,0,0,0.7)] flex items-center justify-between">
          
          {/* Hardware Corner Rivets (Physical Skeuomorphic Detailing) */}
          <div className="hardware-rivet absolute -top-1 -left-1 hidden sm:block" />
          <div className="hardware-rivet absolute -top-1 -right-1 hidden sm:block" />
          <div className="hardware-rivet absolute -bottom-1 -left-1 hidden sm:block" />
          <div className="hardware-rivet absolute -bottom-1 -right-1 hidden sm:block" />

          {/* Left: Brand Identity with Machined Metallic Housing */}
          <Link href="/" className="flex items-center space-x-3.5 group select-none">
            {/* Machined Metal Bezel Logo */}
            <div className="relative w-11 h-11 rounded-xl p-0.5 bg-gradient-to-b from-slate-400 via-slate-700 to-slate-950 shadow-[0_4px_8px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.4)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all">
              <div className="w-full h-full rounded-[10px] bg-gradient-to-b from-[#111726] to-[#060a14] border border-cyan-500/40 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-radial from-cyan-500/20 to-transparent opacity-60" />
                <Cpu className="w-5 h-5 text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] group-hover:scale-110 transition-transform relative z-10" />
              </div>
            </div>

            {/* Typography: Titanium Gradient Brand Name & Laser-Etched Hardware Subtitle */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-[0.14em] uppercase text-metallic-titanium font-sans">
                  QUBRYON
                </span>
                {/* Recessed chamber badge */}
                <span className="hardware-recessed-channel px-2 py-0.5 rounded text-[10px] font-mono font-black text-cyan-300 border border-cyan-500/30 text-shadow-[0_0_8px_rgba(6,182,212,0.8)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]">
                  TECH
                </span>
              </div>
              {/* Laser-Etched Hardware Label with Subtext Tracking */}
              <span className="text-[9.5px] font-mono tracking-[0.28em] uppercase text-etched font-semibold mt-0.5">
                IOT &amp; AI INTEGRATION SYSTEMS
              </span>
            </div>
          </Link>

          {/* Center: Recessed Hardware Channel with Tactile Navigation Keys */}
          <nav className="hidden xl:flex items-center space-x-1.5 p-1 rounded-xl hardware-recessed-channel">
            {navLinks.map((link) => {
              const isHovered = activeItem === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onMouseEnter={() => setActiveItem(link.id)}
                  onMouseLeave={() => setActiveItem("")}
                  className="hardware-key px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider text-slate-300 hover:text-cyan-200 transition-all flex flex-col items-center justify-center group relative cursor-pointer"
                >
                  <span className="text-etched group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                    {link.name}
                  </span>
                  {/* Miniature LED under each key */}
                  <span
                    className={`mt-1 transition-all duration-150 ${
                      isHovered
                        ? "hardware-led-cyan"
                        : "w-1 h-1 rounded-full bg-slate-700/60"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right: Tactile Physical Hardware Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Tactile Hardware Key: "Hire Talent" */}
            <button
              onClick={onOpenTalentModal}
              className="hardware-key-titanium px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider text-cyan-300 flex items-center space-x-2 cursor-pointer select-none group"
            >
              <span className="hardware-led-cyan group-hover:animate-ping" />
              <span className="text-etched-cyan">HIRE TALENT</span>
              <Users className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </button>

            {/* Tactile Cyan Anodized Key: "Book Consultation" */}
            <button
              onClick={onOpenConsultation}
              className="hardware-key-cyan px-4.5 py-2 rounded-xl text-xs font-mono font-black tracking-wider text-slate-950 flex items-center space-x-2 cursor-pointer select-none group"
            >
              <span>BOOK CONSULTATION</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Hardware Menu Button */}
          <div className="flex xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hardware-key p-2 rounded-xl text-cyan-400 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Hardware Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 animate-in fade-in slide-in-from-top-4 duration-150">
          <div className="carbon-fiber-panel rounded-2xl p-5 border border-cyan-500/40 border-t-slate-500/50 shadow-[0_16px_36px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.2)] space-y-4">
            
            <div className="text-[10px] font-mono tracking-[0.2em] text-cyan-400 font-bold uppercase border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>SYSTEM DIRECTORY // FIRMWARE v2.6</span>
              <span className="hardware-led-green" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hardware-key px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-wider text-slate-200 flex items-center justify-between"
                >
                  <span className="text-etched">{link.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTalentModal();
                }}
                className="w-full hardware-key-titanium py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider text-cyan-300 flex items-center justify-center space-x-2"
              >
                <Users className="w-4 h-4 text-cyan-400" />
                <span>HIRE EXPERT TALENT (&lt; 48 HRS)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full hardware-key-cyan py-2.5 rounded-xl text-xs font-mono font-black tracking-wider text-slate-950 flex items-center justify-center space-x-2"
              >
                <span>BOOK STRATEGY CALL</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>

            <div className="text-[10px] font-mono text-slate-500 text-center pt-1 border-t border-slate-800/60">
              CIN: U62013TN2026PTC199725 &bull; Tennur, Tiruchirappalli, TN 620017
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
