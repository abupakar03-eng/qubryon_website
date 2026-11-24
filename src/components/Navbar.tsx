"use client";

import React, { useState, useEffect } from "react";
import { useModals } from "./ModalProvider";
import Link from "next/link";
import { Cpu, Menu, X, ArrowRight, ChevronRight, Users } from "lucide-react";

export default function Navbar() {
  const { openConsultation: onOpenConsultation, openTalent: onOpenTalentModal } = useModals();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services", id: "services" },
    { name: "Talent", href: "#talent", id: "talent" },
    { name: "Tech stacks", href: "#tech-stacks", id: "tech-stacks" },
    { name: "Case studies", href: "#case-studies", id: "case-studies" },
    { name: "Global", href: "#global", id: "global" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[padding] duration-300 ${
        scrolled
          ? "py-2 bg-transparent"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hardware Container (30% Olive Drab Palette) */}
        <div className="relative rounded-2xl olive-chassis px-4 py-2.5 sm:px-5 sm:py-3 shadow-[0_12px_28px_rgba(25,35,10,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-between">
          

          {/* Left: Brand Identity with Machined Olive Bezel */}
          <Link href="/" className="flex items-center space-x-3.5 group select-none">
            <div className="relative w-11 h-11 rounded-xl p-0.5 bg-gradient-to-b from-[#8BAE3A] via-[#6B8E23] to-[#1A250B] shadow-[0_4px_8px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(244,208,63,0.6)] transition-shadow">
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
                <span className="olive-recessed-channel px-2 py-0.5 rounded text-[10px] font-sans font-bold text-[#F4D03F] border border-[#6B8E23]/60">
                  TECH
                </span>
              </div>
              <span className="text-[9.5px] font-sans tracking-[0.24em] uppercase text-[#EDC9AF] font-medium mt-0.5">
                SOFTWARE · AI · STAFFING
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
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    isHovered ? "bg-white/10 text-white" : "text-[#E6DED3]"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right: Tactile Action Buttons (10% Signal Yellow Highlight) */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Tactile Olive Key: Hire Talent */}
            <button
              onClick={onOpenTalentModal}
              className="key-tactical-olive px-4 py-2 rounded-full text-[13px] whitespace-nowrap flex items-center gap-2 cursor-pointer select-none"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Hire talent</span>
            </button>

            {/* Tactile Signal Yellow CTA: Book Consultation */}
            <button
              onClick={onOpenConsultation}
              className="key-signal-yellow px-4 py-2 rounded-full text-[13px] whitespace-nowrap flex items-center gap-2 cursor-pointer select-none group"
            >
              <span>Book a call</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#172108] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="key-tactical-olive p-2 rounded-xl text-[#F4D03F] cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (30% Olive Drab) */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="xl:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 animate-in fade-in slide-in-from-top-4 duration-150">
          <div className="olive-chassis rounded-2xl p-5 border border-[#6B8E23] shadow-2xl space-y-4">
            
            <div className="text-[10px] font-sans tracking-[0.2em] text-[#F4D03F] font-bold uppercase border-b border-[#6B8E23]/40 pb-2 flex items-center justify-between">
              <span>Menu</span>
              <span className="hardware-led-yellow" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans">
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
                className="w-full key-tactical-olive py-2.5 rounded-xl text-xs font-sans font-bold tracking-wider text-[#EDC9AF] flex items-center justify-center space-x-2"
              >
                <Users className="w-4 h-4 text-[#F4D03F]" />
                <span>Hire expert talent (&lt; 48 hrs)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full key-signal-yellow py-2.5 rounded-xl text-xs font-sans font-black tracking-wider text-[#172108] flex items-center justify-center space-x-2"
              >
                <span>Book a strategy call</span>
                <ArrowRight className="w-4 h-4 text-[#172108]" />
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
