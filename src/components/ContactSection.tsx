"use client";

import React, { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Building2,
  ShieldCheck,
  Calendar,
  Send,
  UserCheck,
  CheckCircle2,
  MessageSquare,
  Globe,
  Clock,
  Sparkles,
} from "lucide-react";

interface ContactSectionProps {
  onOpenConsultation: () => void;
  onOpenTalentModal: () => void;
}

export default function ContactSection({
  onOpenConsultation,
  onOpenTalentModal,
}: ContactSectionProps) {
  const [inquiryType, setInquiryType] = useState<"iot" | "staffing" | "consultation">("iot");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#02050f] text-white cyber-grid">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="hardware-recessed-channel inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tracking-[0.18em] uppercase font-bold text-etched-cyan">
              GLOBAL B2B ENGAGEMENT &amp; INQUIRY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            <span className="text-metallic-titanium block">Let&apos;s Build the Future of</span>
            <span className="text-metallic-cyan block mt-1">Cyber-Physical Tech.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Connect with our engineering leadership in Tiruchirappalli or book a direct strategy call with our principal IoT and AI architects.
          </p>

          {/* Quick Schedule Tactile Trigger Bar */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="hardware-key-cyan px-6 py-3.5 rounded-xl font-mono text-xs sm:text-sm tracking-wider uppercase flex items-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>BOOK ARCHITECTURE CALL (CALENDLY SYNC)</span>
            </button>

            <button
              onClick={onOpenTalentModal}
              className="hardware-key-titanium px-6 py-3.5 rounded-xl font-mono text-xs sm:text-sm tracking-wider uppercase flex items-center space-x-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span className="text-etched-cyan">REQUEST STAFF AUGMENTATION PROFILES</span>
            </button>
          </div>
        </div>

        {/* Corporate Information & Contact Grid */}
        <div id="corporate" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Official Corporate Entity Verification Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="hardware-chassis p-7 sm:p-8 rounded-2xl relative overflow-hidden">
              <div className="hardware-rivet absolute top-3 left-3" />
              <div className="hardware-rivet absolute top-3 right-3" />
              <div className="hardware-rivet absolute bottom-3 left-3" />
              <div className="hardware-rivet absolute bottom-3 right-3" />

              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-cyan-400" />
                  <span className="font-mono text-xs font-bold text-cyan-300 tracking-wider">
                    REGISTERED CORPORATE ENTITY
                  </span>
                </div>
                <span className="hardware-recessed-channel text-[10px] font-mono px-2 py-0.5 rounded text-emerald-400 border border-emerald-500/30">
                  GOVT. OF INDIA VERIFIED
                </span>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px] tracking-wider uppercase font-bold">LEGAL COMPANY NAME</span>
                  <span className="text-white font-bold text-sm block font-sans tracking-wide mt-0.5">
                    Qubryon Technologies Private Limited
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 block text-[10px] tracking-wider uppercase font-bold">CORPORATE ID (CIN)</span>
                    <span className="text-cyan-300 font-bold">U62013TN2026PTC199725</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] tracking-wider uppercase font-bold">INCORPORATION DATE</span>
                    <span className="text-slate-200">November 3, 2026</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] tracking-wider uppercase font-bold">REGISTERED OFFICE ADDRESS</span>
                  <div className="text-slate-300 flex items-start space-x-2 mt-1">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="font-sans text-xs">
                      Tennur, Tiruchirappalli, Tamil Nadu, India, 620017.
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] tracking-wider uppercase font-bold">REGISTERED DIRECTORS</span>
                  <div className="space-y-1.5 mt-1.5">
                    <div className="flex items-center space-x-2 text-slate-200">
                      <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Senthilkumar Vivek Santha Kumar</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-200">
                      <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Abubakkar Mohamed Sathik</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Authorized Industry:</span>
                  <span className="text-cyan-300">IoT &amp; AI Integration Engineering</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Channels */}
            <div className="hardware-chassis p-6 rounded-2xl space-y-4">
              <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Direct Engineering Desk
              </h4>

              <div className="space-y-2.5 text-xs font-mono">
                <a
                  href="mailto:contact@qubryon.com"
                  className="hardware-recessed-channel flex items-center space-x-3 text-slate-300 hover:text-cyan-300 transition-colors p-2.5 rounded-lg border border-slate-800"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>contact@qubryon.com</span>
                </a>

                <a
                  href="mailto:solutions@qubryon.com"
                  className="hardware-recessed-channel flex items-center space-x-3 text-slate-300 hover:text-cyan-300 transition-colors p-2.5 rounded-lg border border-slate-800"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>solutions@qubryon.com (RFP &amp; Staffing)</span>
                </a>

                <div className="hardware-recessed-channel flex items-center space-x-3 text-slate-300 p-2.5 rounded-lg border border-slate-800">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>+91 431 279 8900 / +91 94890 12026</span>
                </div>

                <div className="hardware-recessed-channel flex items-center space-x-3 text-slate-400 p-2.5 rounded-lg border border-slate-800">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>09:00 - 18:30 IST (Mon - Fri)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct RFP & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="carbon-fiber-panel p-7 sm:p-9 rounded-3xl border border-cyan-500/30 shadow-[0_16px_40px_rgba(0,0,0,0.95)]">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-wide">
                    Send an RFP or Technical Inquiry
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Guaranteed response within 4 hours by a Solutions Lead.
                  </p>
                </div>

                {/* Tactile Inquiry Type Selector */}
                <div className="flex gap-1 hardware-recessed-channel p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setInquiryType("iot")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider cursor-pointer ${
                      inquiryType === "iot" ? "hardware-key-cyan" : "hardware-key text-slate-400"
                    }`}
                  >
                    <span>CUSTOM IOT</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryType("staffing")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider cursor-pointer ${
                      inquiryType === "staffing" ? "hardware-key-cyan" : "hardware-key text-slate-400"
                    }`}
                  >
                    <span>STAFFING</span>
                  </button>
                </div>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 mx-auto shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white font-sans">Inquiry Successfully Transmitted!</h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <strong className="text-cyan-300">{formData.name || "Partner"}</strong>. Our leadership team has received your message. A technical director will review your specifications and contact you shortly at{" "}
                    <span className="text-cyan-300 font-mono">{formData.email}</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="hardware-key-cyan px-6 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        placeholder="e.g. Senthil Kumar"
                        className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-cyan-300 mb-1 tracking-wider uppercase font-bold">
                        CORPORATE WORK EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="senthil@company.com"
                        className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-cyan-300 mb-1 tracking-wider uppercase font-bold">
                        PHONE / WHATSAPP NUMBER
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-cyan-300 mb-1 tracking-wider uppercase font-bold">
                        COMPANY NAME &amp; COUNTRY *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Siemens / Germany"
                        className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-cyan-300 mb-1 tracking-wider uppercase font-bold">
                      PROJECT SPECIFICATIONS / SPRINT OBJECTIVES *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding your target microcontrollers, telemetry bandwidth, required AI inference speeds, or staff augmentation headcount..."
                      className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="hardware-key-cyan w-full py-4 rounded-xl font-mono text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>TRANSMITTING ENCRYPTED DISPATCH...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-slate-950" />
                        <span>SEND TECHNICAL RFP / DISPATCH MESSAGE</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                    <span className="flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Encrypted SSL Transmission</span>
                    </span>
                    <span>Qubryon Technologies Private Limited</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
