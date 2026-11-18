"use client";

import React, { useState } from "react";
import {
  X,
  Users,
  CheckCircle2,
  Send,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto olive-carbon-panel p-6 sm:p-8 rounded-3xl border-2 border-[#6B8E23] shadow-2xl text-[#EDC9AF]">
        {/* Brass Corner Rivets */}
        <div className="brass-rivet absolute top-3.5 left-3.5" />
        <div className="brass-rivet absolute top-3.5 right-3.5" />
        <div className="brass-rivet absolute bottom-3.5 left-3.5" />
        <div className="brass-rivet absolute bottom-3.5 right-3.5" />

        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="key-tactical-olive absolute top-5 right-5 p-2 rounded-xl text-[#EDC9AF] hover:text-[#F4D03F] cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="olive-recessed-channel inline-flex items-center space-x-2 px-3 py-1 rounded-md text-[#F4D03F] text-xs font-sans mb-2 border border-[#6B8E23]">
            <Users className="w-4 h-4 text-[#F4D03F]" />
            <span className="tracking-widest uppercase font-bold">
              IT STAFF AUGMENTATION DISPATCH // 48-HR SLA
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-syne tracking-wide">
            Deploy Pre-Vetted IoT &amp; AI Engineers
          </h3>
          <p className="text-xs sm:text-sm text-[#EDC9AF] mt-1 font-sans">
            Access pre-screened talent from Qubryon Technologies with a 2-week risk-free trial.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-[#F4D03F]/20 border border-[#F4D03F] flex items-center justify-center text-[#F4D03F] mx-auto shadow-[0_0_25px_rgba(244,208,63,0.5)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-white font-syne">Talent Request Received!</h4>
            <p className="text-xs sm:text-sm text-[#EDC9AF] max-w-md mx-auto leading-relaxed font-sans">
              Our Technical Director has initiated the matching protocol for{" "}
              <strong className="text-[#F4D03F]">{formData.count}</strong> ({formData.role}).
              Candidate resumes and technical code reviews will arrive at{" "}
              <span className="text-[#F4D03F] font-sans">{formData.email}</span> within 24 to 48 hours.
            </p>

            <div className="olive-recessed-channel p-4 rounded-xl border border-[#6B8E23] max-w-md mx-auto text-left text-xs font-sans space-y-1">
              <div className="flex justify-between">
                <span className="text-[#A2B682]">Match SLA:</span>
                <span className="text-[#8BAE3A] font-bold">&lt; 48 Hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A2B682]">Trial Period:</span>
                <span className="text-[#F4D03F] font-bold">2 Weeks Risk-Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A2B682]">Assigned Recruiter:</span>
                <span className="text-white">Qubryon Engineering Resource Desk</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="key-signal-yellow px-8 py-3 rounded-xl text-xs font-sans tracking-wider uppercase cursor-pointer"
            >
              DONE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-sans text-[#F4D03F] mb-1 tracking-wider uppercase font-bold">
                  ENGINEERING ROLE NEEDED *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg text-xs font-sans sand-glass-input cursor-pointer"
                  required
                >
                  <option value="Embedded C & IoT Firmware Specialist" className="bg-[#172108]">
                    Embedded C &amp; IoT Firmware Specialist
                  </option>
                  <option value="AI / Machine Learning Edge Engineer" className="bg-[#172108]">
                    AI / Machine Learning Edge Engineer
                  </option>
                  <option value="AWS IoT Cloud & Pipeline Architect" className="bg-[#172108]">
                    AWS IoT Cloud &amp; Pipeline Architect
                  </option>
                  <option value="Full-Stack React & Next.js Telemetry Dev" className="bg-[#172108]">
                    Full-Stack React &amp; Next.js Telemetry Dev
                  </option>
                  <option value="Cross-Functional IoT Squad (Pod)" className="bg-[#172108]">
                    Cross-Functional IoT Squad (Pod)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-sans text-[#F4D03F] mb-1 tracking-wider uppercase font-bold">
                  SENIORITY LEVEL *
                </label>
                <select
                  value={formData.seniority}
                  onChange={(e) => setFormData({ ...formData, seniority: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg text-xs font-sans sand-glass-input cursor-pointer"
                  required
                >
                  <option value="Senior (5-8 yrs)" className="bg-[#172108]">
                    Senior (5-8 yrs) - Enterprise Standard
                  </option>
                  <option value="Lead / Principal Architect (8+ yrs)" className="bg-[#172108]">
                    Lead / Principal Architect (8+ yrs)
                  </option>
                  <option value="Mid-Level (3-5 yrs)" className="bg-[#172108]">
                    Mid-Level (3-5 yrs)
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-sans text-[#F4D03F] mb-1 tracking-wider uppercase font-bold">
                  HEADCOUNT *
                </label>
                <select
                  value={formData.count}
                  onChange={(e) => setFormData({ ...formData, count: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg text-xs font-sans sand-glass-input cursor-pointer"
                >
                  <option value="1 Engineer" className="bg-[#172108]">1 Dedicated Engineer</option>
                  <option value="2 Engineers" className="bg-[#172108]">2 Engineers</option>
                  <option value="3-5 Engineers" className="bg-[#172108]">3-5 Engineers (Squad)</option>
                  <option value="5+ Engineers" className="bg-[#172108]">5+ Engineers</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-sans text-[#F4D03F] mb-1 tracking-wider uppercase font-bold">
                  TIMELINE TO ONBOARD *
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg text-xs font-sans sand-glass-input cursor-pointer"
                >
                  <option value="Immediate (< 48 hrs)" className="bg-[#172108]">Immediate (&lt; 48 hrs)</option>
                  <option value="Within 1-2 Weeks" className="bg-[#172108]">Within 1-2 Weeks</option>
                  <option value="Next Month" className="bg-[#172108]">Next Month</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-sans text-[#F4D03F] mb-1 tracking-wider uppercase font-bold">
                  YOUR FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-3 py-2 rounded-lg text-xs font-sans sand-glass-input"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans text-[#F4D03F] mb-1 tracking-wider uppercase font-bold">
                  BUSINESS WORK EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@enterprise.com"
                  className="w-full px-3 py-2 rounded-lg text-xs font-sans sand-glass-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-sans text-[#F4D03F] mb-1 tracking-wider uppercase font-bold">
                COMPANY OR PRODUCT NAME *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Continental Automation Lab"
                className="w-full px-3 py-2 rounded-lg text-xs font-sans sand-glass-input"
              />
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-sans text-[#EDC9AF] py-1">
              <div className="flex items-center space-x-1.5">
                <span className="hardware-led-yellow" />
                <span>2-Week Risk-Free Trial</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="hardware-led-yellow" />
                <span>100% IP Assignment</span>
              </div>
            </div>

            {/* 10% Signal Yellow Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="key-signal-yellow w-full py-4 rounded-xl font-sans text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 shadow-lg"
            >
              {submitting ? (
                <span>Sending request…</span>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#172108]" />
                  <span>Receive vetted profiles within 48 hours</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
