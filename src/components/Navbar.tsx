"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cpu, Menu, X, ArrowRight, ChevronRight, Users } from "lucide-react";

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
          ? "py-2 bg-[#EDC9AF]/90 backdrop-blur-xl border-b border-[#6B8E23]/40 shadow-[0_10px_30px_rgba(30,40,15,0.15)]"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hardware Container (30% Olive Drab Palette) */}
        <div className="relative rounded-2xl olive-chassis px-4 py-2.5 sm:px-5 sm:py-3 shadow-[0_12px_28px_rgba(25,35,10,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-between">
          
          {/* Brass Rivets (Hardware Detailing) */}
          <div className="brass-rivet absolute -top-1 -left-1 hidden sm:block" />
          <div className="brass-rivet absolute -top-1 -right-1 hidden sm:block" />
          <div className="brass-rivet absolute -bottom-1 -left-1 hidden sm:block" />
          <div className="brass-rivet absolute -bottom-1 -right-1 hidden sm:block" />

          {/* Left: Brand Identity with Machined Olive Bezel */}
          <Link href="/" className="flex items-center space-x-3.5 group select-none">
            <div className="relative w-11 h-11 rounded-xl p-0.5 bg-gradient-to-b from-[#8BAE3A] via-[#6B8E23] to-[#1A250B] shadow-[0_4px_8px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(244,208,63,0.6)] transition-all">
              <div className="w-full h-full rounded-[10px] bg-[#172108] border border-[#6B8E23] flex items-center justify-center relative overflow-hidden">
                <Cpu className="w-5 h-5 text-[#F4D03F] drop-shadow-[0_0_8px_rgba(244,208,63,0.8)] group-hover:scale-110 transition-transform relative z-10" />
              </div>
            </div>

            {/* Typography: Syne Headline & DM Mono Subtitle */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-2">
                <span className="font-syne font-extrabold text-xl tracking-[0.08em] uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  QUBRYON
                </span>
                <span className="olive-recessed-channel px-2 py-0.5 rounded text-[10px] font-mono font-bold text-[#F4D03F] border border-[#6B8E23]/60">
                  TECH
                </span>
              </div>
              <span className="text-[9.5px] font-mono tracking-[0.24em] uppercase text-[#EDC9AF] font-medium mt-0.5">
                IOT &amp; AI INTEGRATION SYSTEMS
              </span>
            </div>
          </Link>

          {/* Center: Recessed Channel with Tactile Navigation Keys in DM Mono */}
          <nav className="hidden xl:flex items-center space-x-1 p-1 rounded-xl olive-recessed-channel">
            {navLinks.map((link) => {
              const isHovered = activeItem === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onMouseEnter={() => setActiveItem(link.id)}
                  onMouseLeave={() => setActiveItem("")}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider text-[#EDC9AF] hover:text-[#F4D03F] transition-all flex flex-col items-center justify-center group relative cursor-pointer"
                >
                  <span className="group-hover:drop-shadow-[0_0_8px_rgba(244,208,63,0.8)]">
                    {link.name}
                  </span>
                  {/* Miniature Signal Yellow LED under each key */}
                  <span
                    className={`mt-1 transition-all duration-150 ${
                      isHovered
                        ? "hardware-led-yellow"
                        : "w-1 h-1 rounded-full bg-[#3B4D1A]"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right: Tactile Action Buttons (10% Signal Yellow Highlight) */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Tactile Olive Key: Hire Talent */}
            <button
              onClick={onOpenTalentModal}
              className="key-tactical-olive px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider text-[#EDC9AF] flex items-center space-x-2 cursor-pointer select-none group"
            >
              <span className="hardware-led-yellow group-hover:animate-ping" />
              <span>HIRE TALENT</span>
              <Users className="w-3.5 h-3.5 text-[#F4D03F] group-hover:scale-110 transition-transform" />
            </button>

            {/* Tactile Signal Yellow CTA: Book Consultation */}
            <button
              onClick={onOpenConsultation}
              className="key-signal-yellow px-4.5 py-2 rounded-xl text-xs font-mono font-black tracking-wider text-[#172108] flex items-center space-x-2 cursor-pointer select-none group"
            >
              <span>BOOK CONSULTATION</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#172108] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="key-tactical-olive p-2 rounded-xl text-[#F4D03F] focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (30% Olive Drab) */}
      {mobileMenuOpen && (
        <div className="xl:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 animate-in fade-in slide-in-from-top-4 duration-150">
          <div className="olive-chassis rounded-2xl p-5 border border-[#6B8E23] shadow-2xl space-y-4">
            
            <div className="text-[10px] font-mono tracking-[0.2em] text-[#F4D03F] font-bold uppercase border-b border-[#6B8E23]/40 pb-2 flex items-center justify-between">
              <span>SYSTEM DIRECTORY // FIRMWARE v2.6</span>
              <span className="hardware-led-yellow" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="key-tactical-olive px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-wider text-[#EDC9AF] flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#F4D03F]" />
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-[#6B8E23]/40 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTalentModal();
                }}
                className="w-full key-tactical-olive py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider text-[#EDC9AF] flex items-center justify-center space-x-2"
              >
                <Users className="w-4 h-4 text-[#F4D03F]" />
                <span>HIRE EXPERT TALENT (&lt; 48 HRS)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full key-signal-yellow py-2.5 rounded-xl text-xs font-mono font-black tracking-wider text-[#172108] flex items-center justify-center space-x-2"
              >
                <span>BOOK STRATEGY CALL</span>
                <ArrowRight className="w-4 h-4 text-[#172108]" />
              </button>
            </div>

            <div className="text-[10px] font-mono text-[#EDC9AF] text-center pt-1 border-t border-[#6B8E23]/30">
              CIN: U62013TN2026PTC199725 &bull; Tennur, Tiruchirappalli, TN 620017
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
