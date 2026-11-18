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
  Clock,
  Globe,
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
    <section id="contact" className="relative py-28 bg-[#F6F1EA] text-[#1C260D] sand-cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Syne & DM Mono */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="olive-recessed-channel inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#6B8E23] text-[#F4D03F] font-sans text-xs mb-3 shadow-md">
            <MessageSquare className="w-3.5 h-3.5 text-[#F4D03F]" />
            <span className="tracking-[0.18em] uppercase font-bold">
              GLOBAL B2B ENGAGEMENT &amp; INQUIRY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#172108] mb-4 font-syne">
            <span className="block drop-shadow-sm">Let&apos;s Build the Future of</span>
            <span className="block mt-1 text-[#466016]">Cyber-Physical Tech.</span>
          </h2>
          <p className="text-[#3A4A1C] text-sm sm:text-base leading-relaxed font-sans">
            Wherever you are, in North America, Europe, the Middle East or Asia Pacific, connect with our engineering leadership or book a strategy call with our principal IoT and AI architects in your time zone.
          </p>

          {/* Quick Schedule Tactile Trigger Bar (10% Signal Yellow & 30% Tactical Olive) */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="key-signal-yellow px-6 py-3.5 rounded-xl font-sans text-xs sm:text-sm tracking-wider uppercase flex items-center space-x-2 cursor-pointer shadow-lg"
            >
              <Calendar className="w-4 h-4 text-[#172108]" />
              <span>Book an architecture call</span>
            </button>

            <button
              onClick={onOpenTalentModal}
              className="key-tactical-olive px-6 py-3.5 rounded-xl font-sans text-xs sm:text-sm tracking-wider uppercase flex items-center space-x-2 cursor-pointer shadow-md"
            >
              <UserCheck className="w-4 h-4 text-[#F4D03F]" />
              <span>Request engineer profiles</span>
            </button>
          </div>
        </div>

        {/* Corporate Information & Contact Grid */}
        <div id="corporate" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Company Info & Contact (30% Olive Drab) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="olive-chassis p-7 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl">
              <div className="brass-rivet absolute top-3.5 left-3.5" />
              <div className="brass-rivet absolute top-3.5 right-3.5" />
              <div className="brass-rivet absolute bottom-3.5 left-3.5" />
              <div className="brass-rivet absolute bottom-3.5 right-3.5" />

              <div className="flex items-center space-x-2 border-b border-[#6B8E23]/40 pb-4 mb-5">
                <Building2 className="w-5 h-5 text-[#F4D03F]" />
                <span className="font-sans text-xs font-bold text-[#F4D03F] tracking-wider">
                  QUBRYON TECHNOLOGIES PRIVATE LIMITED
                </span>
              </div>

              <div className="space-y-4 text-xs font-sans">
                <p className="text-[#EDC9AF] leading-relaxed">
                  A registered cyber-physical engineering firm specializing in custom IoT hardware architectures, edge AI predictive analytics, and enterprise IT staff augmentation — headquartered in Tiruchirappalli, Tamil Nadu, India.
                </p>

                <div>
                  <span className="text-[#A2B682] block text-[10px] tracking-wider uppercase font-bold">REGISTERED OFFICE</span>
                  <div className="text-[#FAF1E8] flex items-start space-x-2 mt-1">
                    <MapPin className="w-4 h-4 text-[#F4D03F] shrink-0 mt-0.5" />
                    <span className="font-sans text-xs">
                      Tennur, Tiruchirappalli, Tamil Nadu, India, 620017.
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#6B8E23]/40 text-[11px] text-[#EDC9AF] flex items-center justify-between">
                  <span>Domain:</span>
                  <span className="text-[#F4D03F] font-bold">IoT &amp; AI Integration Engineering</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Channels */}
            <div className="olive-chassis p-6 rounded-2xl space-y-4 shadow-md">
              <h4 className="text-xs font-sans text-[#F4D03F] font-bold uppercase tracking-wider">
                Direct Engineering Desk
              </h4>

              <div className="space-y-2.5 text-xs font-sans">
                <a
                  href="mailto:contact@qubryon.com"
                  className="olive-recessed-channel flex items-center space-x-3 text-[#EDC9AF] hover:text-[#F4D03F] transition-colors p-2.5 rounded-lg border border-[#6B8E23]/40"
                >
                  <Mail className="w-4 h-4 text-[#F4D03F]" />
                  <span>contact@qubryon.com</span>
                </a>

                <a
                  href="mailto:solutions@qubryon.com"
                  className="olive-recessed-channel flex items-center space-x-3 text-[#EDC9AF] hover:text-[#F4D03F] transition-colors p-2.5 rounded-lg border border-[#6B8E23]/40"
                >
                  <Mail className="w-4 h-4 text-[#F4D03F]" />
                  <span>solutions@qubryon.com (RFP &amp; Staffing)</span>
                </a>

                <div className="olive-recessed-channel flex items-center space-x-3 text-[#EDC9AF] p-2.5 rounded-lg border border-[#6B8E23]/40">
                  <Phone className="w-4 h-4 text-[#F4D03F]" />
                  <span>+91 431 279 8900 / +91 94890 12026</span>
                </div>

                <div className="olive-recessed-channel flex items-center space-x-3 text-[#A2B682] p-2.5 rounded-lg border border-[#6B8E23]/40">
                  <Clock className="w-4 h-4 text-[#F4D03F]" />
                  <span>09:00 - 18:30 IST (Mon - Fri)</span>
                </div>

                <div className="olive-recessed-channel flex items-center space-x-3 text-[#A2B682] p-2.5 rounded-lg border border-[#6B8E23]/40">
                  <Globe className="w-4 h-4 text-[#F4D03F]" />
                  <span>Extended overlap shifts for US, UK/EU, GCC &amp; APAC clients</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct RFP & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="olive-carbon-panel p-7 sm:p-9 rounded-3xl border-2 border-[#6B8E23] shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#6B8E23]/40">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-syne tracking-wide">
                    Send an RFP or Technical Inquiry
                  </h3>
                  <p className="text-xs text-[#EDC9AF] font-sans mt-0.5">
                    Guaranteed response within 4 hours by a Solutions Lead.
                  </p>
                </div>

                {/* Inquiry Type Selector (10% Signal Yellow on Active) */}
                <div className="flex gap-1 olive-recessed-channel p-1 rounded-xl border border-[#6B8E23]/40">
                  <button
                    type="button"
                    onClick={() => setInquiryType("iot")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold tracking-wider cursor-pointer ${
                      inquiryType === "iot" ? "key-signal-yellow" : "key-tactical-olive"
                    }`}
                  >
                    <span>Custom IoT</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryType("staffing")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold tracking-wider cursor-pointer ${
                      inquiryType === "staffing" ? "key-signal-yellow" : "key-tactical-olive"
                    }`}
                  >
                    <span>Staffing</span>
                  </button>
                </div>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#F4D03F]/20 border border-[#F4D03F] flex items-center justify-center text-[#F4D03F] mx-auto shadow-[0_0_25px_rgba(244,208,63,0.5)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white font-syne">Inquiry Successfully Transmitted!</h4>
                  <p className="text-xs sm:text-sm text-[#EDC9AF] max-w-md mx-auto font-sans">
                    Thank you, <strong className="text-[#F4D03F]">{formData.name || "Partner"}</strong>. Our leadership team has received your message. A technical director will review your specifications and contact you shortly at{" "}
                    <span className="text-[#F4D03F] font-sans">{formData.email}</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="key-signal-yellow px-6 py-2.5 rounded-xl text-xs font-sans tracking-wider uppercase cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans">
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
                        placeholder="e.g. Sarah Mitchell"
                        className="w-full px-3 py-2 rounded-lg text-xs font-sans sand-glass-input"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans text-[#F4D03F] mb-1 tracking-wider uppercase font-bold">
                        CORPORATE WORK EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@company.com"
                        className="w-full px-3 py-2 rounded-lg text-xs font-sans sand-glass-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-sans text-[#F4D03F] mb-1 tracking-wider uppercase font-bold">
                        PHONE / WHATSAPP NUMBER
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 415 555 0134"
                        className="w-full px-3 py-2 rounded-lg text-xs font-sans sand-glass-input"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans text-[#F4D03F] mb-1 tracking-wider uppercase font-bold">
                        COMPANY NAME &amp; COUNTRY *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Siemens / Germany"
                        className="w-full px-3 py-2 rounded-lg text-xs font-sans sand-glass-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans text-[#F4D03F] mb-1 tracking-wider uppercase font-bold">
                      PROJECT SPECIFICATIONS / SPRINT OBJECTIVES *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding your target microcontrollers, telemetry bandwidth, required AI inference speeds, or staff augmentation headcount..."
                      className="w-full px-3 py-2 rounded-lg text-xs font-sans sand-glass-input"
                    />
                  </div>

                  {/* 10% Signal Yellow Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="key-signal-yellow w-full py-4 rounded-xl font-sans text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 shadow-lg"
                  >
                    {submitting ? (
                      <span>Sending…</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#172108]" />
                        <span>Send inquiry</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[10px] font-sans text-[#EDC9AF] pt-1">
                    <span className="flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#F4D03F]" />
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
