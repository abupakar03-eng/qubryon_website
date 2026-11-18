"use client";

import React from "react";
import Link from "next/link";
import {
  Cpu,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
} from "lucide-react";

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenTalentModal: () => void;
}

export default function Footer({ onOpenConsultation, onOpenTalentModal }: FooterProps) {
  return (
    <footer className="relative bg-[#172108] text-[#EDC9AF] border-t-2 border-[#6B8E23] overflow-hidden">
      {/* Top Signal Yellow Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F4D03F] to-transparent shadow-[0_0_15px_#F4D03F]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Col 1 & 2: Brand & Corporate Verification */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl p-0.5 bg-gradient-to-b from-[#8BAE3A] via-[#6B8E23] to-[#121A06] shadow-[0_4px_8px_rgba(0,0,0,0.5)] flex items-center justify-center">
                <div className="w-full h-full rounded-[10px] bg-[#121A06] flex items-center justify-center border border-[#6B8E23]">
                  <Cpu className="w-5 h-5 text-[#F4D03F] drop-shadow-[0_0_8px_rgba(244,208,63,0.8)]" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="font-syne font-extrabold text-xl tracking-[0.08em] uppercase text-white drop-shadow-md">
                    QUBRYON
                  </span>
                  <span className="olive-recessed-channel px-2 py-0.5 rounded text-[10px] font-mono font-black text-[#F4D03F] border border-[#6B8E23]">
                    TECH
                  </span>
                </div>
                <span className="text-[9.5px] font-mono tracking-[0.24em] uppercase text-[#EDC9AF] font-semibold">
                  IOT &amp; AI INTEGRATION SYSTEMS
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#E0C7B4] leading-relaxed max-w-sm font-mono">
              <strong className="text-white">Qubryon Technologies Private Limited</strong> is a registered cyber-physical engineering firm specializing in custom IoT hardware architectures, edge AI predictive analytics, and enterprise IT staff augmentation.
            </p>

            {/* Incorporation Credentials with Hardware Chassis */}
            <div className="olive-chassis p-4 rounded-xl text-[11px] font-mono space-y-1.5 text-[#EDC9AF] relative border border-[#6B8E23]/60 shadow-md">
              <div className="brass-rivet absolute top-2 right-2" />
              <div className="flex justify-between">
                <span className="text-[#A2B682]">Corporate Identity (CIN):</span>
                <span className="text-[#F4D03F] font-bold">U62013TN2026PTC199725</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A2B682]">Incorporation Date:</span>
                <span className="text-[#FAF1E8]">November 3, 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A2B682]">Registered Office:</span>
                <span className="text-[#FAF1E8]">Tennur, Tiruchirappalli, TN 620017</span>
              </div>
              <div className="pt-1 border-t border-[#6B8E23]/40 flex justify-between text-[10px]">
                <span className="text-[#A2B682]">Directors:</span>
                <span className="text-[#F4D03F] truncate ml-2">
                  Senthilkumar Vivek Santha Kumar &bull; Abubakkar Mohamed Sathik
                </span>
              </div>
            </div>

            {/* Social Tactile Buttons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="key-tactical-olive w-9 h-9 rounded-xl flex items-center justify-center text-[#EDC9AF] hover:text-[#F4D03F] transition-all cursor-pointer"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.05 1.53 1.53 0 0 0 0 3.05m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="key-tactical-olive w-9 h-9 rounded-xl flex items-center justify-center text-[#EDC9AF] hover:text-[#F4D03F] transition-all cursor-pointer"
                aria-label="X (formerly Twitter)"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="key-tactical-olive w-9 h-9 rounded-xl flex items-center justify-center text-[#EDC9AF] hover:text-[#F4D03F] transition-all cursor-pointer"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 3: Core Solutions */}
          <div className="space-y-3 font-mono">
            <h4 className="text-xs font-syne font-bold uppercase tracking-wider text-[#F4D03F]">
              Core Engineering
            </h4>
            <ul className="space-y-2 text-xs text-[#EDC9AF]">
              <li>
                <a href="#services" className="hover:text-[#F4D03F] transition-colors">
                  Custom IoT Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F4D03F] transition-colors">
                  Edge AI &amp; Predictive Analytics
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F4D03F] transition-colors">
                  Industrial IoT 4.0 &amp; SCADA
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F4D03F] transition-colors">
                  Firmware &amp; Zephyr RTOS
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F4D03F] transition-colors">
                  AWS &amp; Azure IoT Fabrics
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F4D03F] transition-colors">
                  Digital Twin 3D Dashboards
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Staff Augmentation */}
          <div className="space-y-3 font-mono">
            <h4 className="text-xs font-syne font-bold uppercase tracking-wider text-[#F4D03F]">
              Hire Tech Talent
            </h4>
            <ul className="space-y-2 text-xs text-[#EDC9AF]">
              <li>
                <button
                  onClick={onOpenTalentModal}
                  className="hover:text-[#F4D03F] transition-colors text-left cursor-pointer"
                >
                  Hire Embedded C Developers
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTalentModal}
                  className="hover:text-[#F4D03F] transition-colors text-left cursor-pointer"
                >
                  Hire Python &amp; PyTorch Specialists
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTalentModal}
                  className="hover:text-[#F4D03F] transition-colors text-left cursor-pointer"
                >
                  Hire AWS IoT Cloud Architects
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTalentModal}
                  className="hover:text-[#F4D03F] transition-colors text-left cursor-pointer"
                >
                  Hire React &amp; Next.js Engineers
                </button>
              </li>
              <li>
                <a href="#talent" className="hover:text-[#F4D03F] transition-colors">
                  3-Step Hiring Process
                </a>
              </li>
              <li>
                <a href="#talent" className="hover:text-[#F4D03F] transition-colors">
                  2-Week Risk-Free Trial
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Consultation & Quick Action (10% Signal Yellow) */}
          <div className="space-y-4 font-mono">
            <h4 className="text-xs font-syne font-bold uppercase tracking-wider text-[#F4D03F]">
              Direct Engagement
            </h4>
            <p className="text-xs text-[#EDC9AF] leading-relaxed">
              Have an active RFP or immediate sprint vacancy? Connect with our technical directors directly.
            </p>

            <button
              onClick={onOpenConsultation}
              className="key-signal-yellow w-full py-3 px-3 rounded-xl font-mono text-xs tracking-wider uppercase flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
            >
              <Calendar className="w-3.5 h-3.5 text-[#172108]" />
              <span>BOOK STRATEGY CALL</span>
            </button>

            <div className="pt-2 border-t border-[#6B8E23]/40 space-y-1.5 text-[11px] text-[#A2B682]">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#F4D03F]" />
                <span>100% IP &amp; Source Ownership</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#F4D03F]" />
                <span>Strict Mutual NDA Governance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#F4D03F]" />
                <span>SOC 2 Type II Aligned Practices</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 border-t border-[#6B8E23]/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#EDC9AF]">
          <div>
            &copy; 2026 Qubryon Technologies Private Limited. All rights reserved. Registered in Tiruchirappalli, Tamil Nadu, India.
          </div>

          <div className="flex items-center space-x-4">
            <span className="hover:text-[#F4D03F] cursor-pointer">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:text-[#F4D03F] cursor-pointer">Terms of Service</span>
            <span>&bull;</span>
            <span className="hover:text-[#F4D03F] cursor-pointer">Security Standards</span>
            <span>&bull;</span>
            <span className="text-[#F4D03F] font-bold">CIN: U62013TN2026PTC199725</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
