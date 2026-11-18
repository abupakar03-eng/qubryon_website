"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cpu, Menu, X, ArrowRight, ShieldCheck, ChevronRight, PhoneCall, Users } from "lucide-react";

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenTalentModal: () => void;
}

export default function Navbar({ onOpenConsultation, onOpenTalentModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Core Services", href: "#services" },
    { name: "Staff Augmentation", href: "#talent" },
    { name: "Tech Stacks", href: "#tech-stacks" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Company", href: "#corporate" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-cyan-500/20 py-3 shadow-[0_4px_30px_rgba(3,7,18,0.8)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-sky-600 to-blue-700 p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg tracking-wider text-white">
                  QUBRYON
                </span>
                <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950/90 text-cyan-300 border border-cyan-500/30">
                  TECH
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase hidden sm:block">
                IoT & AI Integration Systems
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 p-1 rounded-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-300 rounded-full hover:bg-slate-800/70 transition-all font-mono"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={onOpenTalentModal}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-500/40 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.15)]"
            >
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hire Talent</span>
            </button>

            <button
              onClick={onOpenConsultation}
              className="relative group overflow-hidden px-4 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
            >
              <span className="relative z-10 flex items-center space-x-1">
                <span>Book Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-cyan-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-cyan-500/20 px-4 pt-3 pb-6 mt-3 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1 font-mono text-xs">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-slate-300 hover:text-cyan-300 hover:bg-slate-900/70 transition-all flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTalentModal();
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/40"
            >
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Hire Expert Talent</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg text-xs font-mono font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <span>Book Strategy Call</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>

          <div className="pt-2 text-[10px] font-mono text-slate-500 text-center">
            CIN: U62013TN2026PTC199725 • Tiruchirappalli, TN, India
          </div>
        </div>
      )}
    </header>
  );
}
