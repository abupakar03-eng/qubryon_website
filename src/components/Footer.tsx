"use client";

import React from "react";
import Link from "next/link";
import {
  Cpu,
  Shield,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  CheckCircle,
} from "lucide-react";

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenTalentModal: () => void;
}

export default function Footer({ onOpenConsultation, onOpenTalentModal }: FooterProps) {
  return (
    <footer className="relative bg-slate-950 text-white border-t border-cyan-500/20 overflow-hidden">
      {/* Decorative top glowing gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06b6d4]" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Col 1 & 2: Brand & Corporate Verification */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-wider text-white">
                  QUBRYON
                </span>
                <span className="text-xs font-mono font-bold ml-2 px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  TECH
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              <strong className="text-slate-200">Qubryon Technologies Private Limited</strong> is a registered cyber-physical engineering firm specializing in custom IoT hardware architectures, edge AI predictive analytics, and enterprise IT staff augmentation.
            </p>

            {/* Incorporation Credentials */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Corporate Identity (CIN):</span>
                <span className="text-cyan-300 font-bold">U62013TN2026PTC199725</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Incorporation Date:</span>
                <span className="text-slate-300">November 3, 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Registered Office:</span>
                <span className="text-slate-300">Tennur, Tiruchirappalli, TN 620017</span>
              </div>
              <div className="pt-1 border-t border-slate-800 flex justify-between text-[10px]">
                <span className="text-slate-500">Directors:</span>
                <span className="text-cyan-200 truncate ml-2">
                  Senthilkumar Vivek Santha Kumar &bull; Abubakkar Mohamed Sathik
                </span>
              </div>
            </div>

            {/* Social Icons (SVGs) */}
            <div className="flex items-center space-x-3 pt-2">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 flex items-center justify-center text-slate-400 hover:text-cyan-300 transition-all cursor-pointer"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.05 1.53 1.53 0 0 0 0 3.05m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 flex items-center justify-center text-slate-400 hover:text-cyan-300 transition-all cursor-pointer"
                aria-label="X (formerly Twitter)"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 flex items-center justify-center text-slate-400 hover:text-cyan-300 transition-all cursor-pointer"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 3: Core Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Core Engineering
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">
                  Custom IoT Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">
                  Edge AI &amp; Predictive Analytics
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">
                  Industrial IoT 4.0 &amp; SCADA
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">
                  Firmware &amp; Zephyr RTOS
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">
                  AWS &amp; Azure IoT Fabrics
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">
                  Digital Twin 3D Dashboards
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Staff Augmentation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Hire Tech Talent
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>
                <button
                  onClick={onOpenTalentModal}
                  className="hover:text-cyan-300 transition-colors text-left cursor-pointer"
                >
                  Hire Embedded C Developers
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTalentModal}
                  className="hover:text-cyan-300 transition-colors text-left cursor-pointer"
                >
                  Hire Python &amp; PyTorch Specialists
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTalentModal}
                  className="hover:text-cyan-300 transition-colors text-left cursor-pointer"
                >
                  Hire AWS IoT Cloud Architects
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTalentModal}
                  className="hover:text-cyan-300 transition-colors text-left cursor-pointer"
                >
                  Hire React &amp; Next.js Engineers
                </button>
              </li>
              <li>
                <a href="#talent" className="hover:text-cyan-300 transition-colors">
                  3-Step Hiring Process
                </a>
              </li>
              <li>
                <a href="#talent" className="hover:text-cyan-300 transition-colors">
                  2-Week Risk-Free Trial
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Consultation & Quick Action */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Direct Engagement
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have an active RFP or immediate sprint vacancy? Connect with our technical directors directly.
            </p>

            <button
              onClick={onOpenConsultation}
              className="w-full py-2.5 px-3 rounded-xl font-mono text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-950" />
              <span>Book Calendly Strategy Call</span>
            </button>

            <div className="pt-2 border-t border-slate-900 space-y-1.5 text-[11px] font-mono text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>100% IP &amp; Source Ownership</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Strict Mutual NDA Governance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>SOC 2 Type II Aligned Practices</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; 2026 Qubryon Technologies Private Limited. All rights reserved. Registered in Tiruchirappalli, Tamil Nadu, India.
          </div>

          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span>&bull;</span>
            <span className="hover:text-slate-300 cursor-pointer">Security Standards</span>
            <span>&bull;</span>
            <span className="text-cyan-400">CIN: U62013TN2026PTC199725</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
