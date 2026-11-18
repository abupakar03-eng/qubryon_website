"use client";

import React, { useState, useEffect } from "react";
import { Calendar, ArrowUp } from "lucide-react";

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
      {/* Tactical Olive Chassis Housing with Signal Yellow Key */}
      <div className="flex items-center space-x-2 p-1.5 rounded-2xl olive-chassis shadow-[0_12px_32px_rgba(20,28,8,0.45)] border border-[#6B8E23]">
        {/* Hire Talent Tactile Olive Key */}
        <button
          onClick={onOpenTalentModal}
          className="key-tactical-olive flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-sans font-bold tracking-wider cursor-pointer"
          title="Hire Pre-Vetted IoT & AI Engineers"
        >
          <span className="hardware-led-yellow" />
          <span className="hidden sm:inline">Hire talent</span>
        </button>

        {/* Book Call 10% Signal Yellow Key */}
        <button
          onClick={onOpenConsultation}
          className="key-signal-yellow flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-sans font-black tracking-wider text-[#172108] cursor-pointer shadow-md"
          title="Schedule 30-min Strategy Call"
        >
          <Calendar className="w-3.5 h-3.5 text-[#172108]" />
          <span>Book a call</span>
        </button>

        {/* Scroll To Top Key */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="key-tactical-olive w-8 h-8 rounded-xl flex items-center justify-center text-[#EDC9AF] hover:text-[#F4D03F] transition-all cursor-pointer"
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
