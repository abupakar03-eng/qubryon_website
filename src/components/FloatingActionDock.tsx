"use client";

import React, { useState, useEffect } from "react";
import { Calendar, ArrowUp, Users } from "lucide-react";
import { useModals } from "./ModalProvider";

/**
 * Floating quick actions. Appears only after the visitor scrolls past the hero,
 * where the same actions are already on screen, so CTAs aren't duplicated.
 */
export default function FloatingActionDock() {
  const { openConsultation, openTalent } = useModals();
  const [visible, setVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setVisible(y > window.innerHeight * 0.85);
      setShowScrollTop(y > window.innerHeight * 1.5);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 sm:right-8 z-40 transition-[opacity,transform] duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="flex items-center gap-2 p-1.5 rounded-2xl olive-chassis">
        <button
          type="button"
          onClick={openTalent}
          aria-label="Hire talent"
          className="key-tactical-olive flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs cursor-pointer"
        >
          <Users className="w-3.5 h-3.5 text-[#F4D03F]" aria-hidden="true" />
          <span className="hidden sm:inline">Hire talent</span>
        </button>

        <button
          type="button"
          onClick={openConsultation}
          className="key-signal-yellow flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Book a call</span>
        </button>

        {showScrollTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="key-tactical-olive w-8 h-8 rounded-xl flex items-center justify-center text-[#EDC9AF] hover:text-[#F4D03F] transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
