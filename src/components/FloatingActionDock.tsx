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
      {/* Tactile Hardware Chassis Housing */}
      <div className="flex items-center space-x-2 p-1.5 rounded-2xl hardware-chassis shadow-[0_12px_32px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.25)]">
        {/* Hire Talent Tactile Key */}
        <button
          onClick={onOpenTalentModal}
          className="hardware-key-titanium flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider cursor-pointer"
          title="Hire Pre-Vetted IoT & AI Engineers"
        >
          <span className="hardware-led-cyan" />
          <span className="hidden sm:inline text-etched-cyan">HIRE TALENT</span>
        </button>

        {/* Book Call Tactile Key */}
        <button
          onClick={onOpenConsultation}
          className="hardware-key-cyan flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-black tracking-wider text-slate-950 cursor-pointer"
          title="Schedule 30-min Strategy Call"
        >
          <Calendar className="w-3.5 h-3.5 text-slate-950" />
          <span>BOOK CALL</span>
        </button>

        {/* Scroll To Top Key */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="hardware-key w-8 h-8 rounded-xl flex items-center justify-center text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
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
