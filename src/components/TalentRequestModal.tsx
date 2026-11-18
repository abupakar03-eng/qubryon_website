"use client";

import React, { useState } from "react";
import {
  X,
  Users,
  CheckCircle2,
  Send,
  Shield,
  Clock,
  Sparkles,
  Cpu,
  Layers,
} from "lucide-react";

interface TalentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TalentRequestModal({ isOpen, onClose }: TalentModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    role: "Embedded C & IoT Firmware Specialist",
    count: "2 Engineers",
    seniority: "Senior (5-8 yrs)",
    timeZone: "Full Time (US / EU / APAC Aligned)",
    skills: "Embedded C, FreeRTOS, MQTT, AWS IoT",
    name: "",
    email: "",
    company: "",
    urgency: "Immediate (< 48 hrs)",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto carbon-fiber-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.25)] text-white">
        {/* Hardware Corner Rivets */}
        <div className="hardware-rivet absolute top-3 left-3" />
        <div className="hardware-rivet absolute top-3 right-3" />
        <div className="hardware-rivet absolute bottom-3 left-3" />
        <div className="hardware-rivet absolute bottom-3 right-3" />

        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="hardware-key absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="hardware-recessed-channel inline-flex items-center space-x-2 px-3 py-1 rounded-md text-cyan-400 text-xs font-mono mb-2 border border-cyan-500/30">
            <Users className="w-4 h-4" />
            <span className="tracking-widest uppercase font-bold text-etched-cyan">
              IT STAFF AUGMENTATION DISPATCH // 48-HR SLA
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-wide">
            Deploy Pre-Vetted IoT &amp; AI Engineers
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Access pre-screened talent from Qubryon Technologies with a 2-week risk-free trial.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 mx-auto shadow-[0_0_25px_rgba(6,182,212,0.4)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-white font-sans">Talent Request Received!</h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Our Technical Director has initiated the matching protocol for{" "}
              <strong className="text-cyan-300">{formData.count}</strong> ({formData.role}).
              Candidate resumes and technical code reviews will arrive at{" "}
              <span className="text-cyan-300 font-mono">{formData.email}</span> within 24 to 48 hours.
            </p>

            <div className="hardware-recessed-channel p-4 rounded-xl border border-cyan-500/30 max-w-md mx-auto text-left text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Match SLA:</span>
                <span className="text-emerald-400 font-bold">&lt; 48 Hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Trial Period:</span>
                <span className="text-cyan-300 font-bold">2 Weeks Risk-Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned Recruiter:</span>
                <span className="text-white">Qubryon Engineering Resource Desk</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="hardware-key-cyan px-8 py-3 rounded-xl text-xs font-mono tracking-wider uppercase cursor-pointer"
            >
              DONE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-cyan-300 mb-1 tracking-wider uppercase font-bold">
                  ENGINEERING ROLE NEEDED *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg text-xs font-mono glass-input text-white cursor-pointer"
                  required
                >
                  <option value="Embedded C & IoT Firmware Specialist" className="bg-slate-900">
                    Embedded C &amp; IoT Firmware Specialist
                  </option>
                  <option value="AI / Machine Learning Edge Engineer" className="bg-slate-900">
                    AI / Machine Learning Edge Engineer
                  </option>
                  <option value="AWS IoT Cloud & Pipeline Architect" className="bg-slate-900">
                    AWS IoT Cloud &amp; Pipeline Architect
                  </option>
                  <option value="Full-Stack React & Next.js Telemetry Dev" className="bg-slate-900">
                    Full-Stack React &amp; Next.js Telemetry Dev
                  </option>
                  <option value="Cross-Functional IoT Squad (Pod)" className="bg-slate-900">
                    Cross-Functional IoT Squad (Pod)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-cyan-300 mb-1 tracking-wider uppercase font-bold">
                  SENIORITY LEVEL *
                </label>
                <select
                  value={formData.seniority}
                  onChange={(e) => setFormData({ ...formData, seniority: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg text-xs font-mono glass-input text-white cursor-pointer"
                  required
                >
                  <option value="Senior (5-8 yrs)" className="bg-slate-900">
                    Senior (5-8 yrs) - Enterprise Standard
                  </option>
                  <option value="Lead / Principal Architect (8+ yrs)" className="bg-slate-900">
                    Lead / Principal Architect (8+ yrs)
                  </option>
                  <option value="Mid-Level (3-5 yrs)" className="bg-slate-900">
                    Mid-Level (3-5 yrs)
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-cyan-300 mb-1 tracking-wider uppercase font-bold">
                  HEADCOUNT *
                </label>
                <select
                  value={formData.count}
                  onChange={(e) => setFormData({ ...formData, count: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg text-xs font-mono glass-input text-white cursor-pointer"
                >
                  <option value="1 Engineer" className="bg-slate-900">1 Dedicated Engineer</option>
                  <option value="2 Engineers" className="bg-slate-900">2 Engineers</option>
                  <option value="3-5 Engineers" className="bg-slate-900">3-5 Engineers (Squad)</option>
                  <option value="5+ Engineers" className="bg-slate-900">5+ Engineers</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-cyan-300 mb-1 tracking-wider uppercase font-bold">
                  TIMELINE TO ONBOARD *
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg text-xs font-mono glass-input text-white cursor-pointer"
                >
                  <option value="Immediate (< 48 hrs)" className="bg-slate-900">Immediate (&lt; 48 hrs)</option>
                  <option value="Within 1-2 Weeks" className="bg-slate-900">Within 1-2 Weeks</option>
                  <option value="Next Month" className="bg-slate-900">Next Month</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-cyan-300 mb-1 tracking-wider uppercase font-bold">
                  YOUR FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-cyan-300 mb-1 tracking-wider uppercase font-bold">
                  BUSINESS WORK EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@enterprise.com"
                  className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-cyan-300 mb-1 tracking-wider uppercase font-bold">
                COMPANY OR PRODUCT NAME *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Continental Automation Lab"
                className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-white"
              />
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 py-1">
              <div className="flex items-center space-x-1.5">
                <span className="hardware-led-cyan" />
                <span>2-Week Risk-Free Trial</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="hardware-led-cyan" />
                <span>100% IP Assignment</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="hardware-key-cyan w-full py-4 rounded-xl font-mono text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <span>DISPATCHING TALENT REQUEST...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>RECEIVE VETTED PROFILES WITHIN 48 HOURS</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
