"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Users, ArrowUp, MessageCircle, Shield } from "lucide-react";

interface FloatingActionDockProps {
  onOpenConsultation: () => void;
  onOpenTalentModal: () => void;
}

export default function FloatingActionDock({
  onOpenConsultation,
  onOpenTalentModal,
}: FloatingActionDockProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-5 right-5 sm:right-8 z-40 flex items-center space-x-2">
      {/* Floating Action Pill */}
      <div className="flex items-center space-x-1.5 p-1.5 rounded-full bg-slate-950/90 backdrop-blur-xl border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.3)]">
        {/* Hire Talent button */}
        <button
          onClick={onOpenTalentModal}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/70 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all cursor-pointer shadow-sm"
          title="Hire Pre-Vetted IoT & AI Engineers"
        >
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Hire Talent</span>
        </button>

        {/* Book Call button */}
        <button
          onClick={onOpenConsultation}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.4)]"
          title="Schedule 30-min Strategy Call"
        >
          <Calendar className="w-3.5 h-3.5 text-slate-950" />
          <span>Book Call</span>
        </button>

        {/* Scroll To Top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 hover:border-cyan-400 flex items-center justify-center text-slate-400 hover:text-cyan-300 transition-all cursor-pointer"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
