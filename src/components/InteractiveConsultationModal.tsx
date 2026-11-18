"use client";

import React, { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  Cpu,
  Shield,
  ArrowRight,
  Globe,
  Sparkles,
} from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InteractiveConsultationModal({
  isOpen,
  onClose,
}: ConsultationModalProps) {
  const [step, setStep] = useState<"slot" | "details" | "confirmed">("slot");
  const [selectedTopic, setSelectedTopic] = useState("Custom IoT & Edge AI Architecture");
  const [selectedDate, setSelectedDate] = useState("Tomorrow");
  const [selectedTime, setSelectedTime] = useState("03:00 PM IST");
  const [timezone, setTimezone] = useState("IST (UTC+5:30)");
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    company: "",
    currentChallenge: "",
    ndaRequired: true,
  });

  if (!isOpen) return null;

  const topics = [
    "Custom IoT & Edge AI Architecture",
    "IT Staff Augmentation Scoping (< 48 hrs)",
    "Industrial IoT 4.0 / SCADA Modernization",
    "Firmware & RTOS Hardware Review",
    "General Technical Inquiry",
  ];

  const dates = [
    { label: "Today (Rush)", val: "Today" },
    { label: "Tomorrow", val: "Tomorrow" },
    { label: "In 2 Days", val: "In 2 Days" },
    { label: "Next Monday", val: "Next Monday" },
  ];

  const timeSlots = [
    "10:30 AM IST",
    "01:00 PM IST",
    "03:00 PM IST",
    "05:30 PM IST",
    "08:00 PM IST (US Morning)",
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmed");
  };

  const resetAndClose = () => {
    setStep("slot");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.3)] text-white">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-1.5">
            <Video className="w-4 h-4" />
            <span>30-MIN ARCHITECTURE CONSULTATION // CALENDLY SYNC</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Schedule a Technical Strategy Session
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Connect directly with a Principal IoT &amp; AI Solutions Architect from Qubryon Technologies.
          </p>
        </div>

        {step === "slot" && (
          <div className="space-y-6">
            {/* Step 1: Select Consultation Topic */}
            <div>
              <label className="block text-xs font-mono text-cyan-300 mb-2 font-bold uppercase">
                1. Select Discussion Topic
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTopic(t)}
                    className={`p-3 rounded-xl text-left text-xs font-mono transition-all border cursor-pointer ${
                      selectedTopic === t
                        ? "bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          selectedTopic === t ? "bg-cyan-400 animate-pulse" : "bg-slate-600"
                        }`}
                      />
                      <span>{t}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date Picker */}
            <div>
              <label className="block text-xs font-mono text-cyan-300 mb-2 font-bold uppercase">
                2. Select Preferred Date
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {dates.map((d) => (
                  <button
                    key={d.val}
                    type="button"
                    onClick={() => setSelectedDate(d.val)}
                    className={`p-2.5 rounded-lg text-center text-xs font-mono transition-all border cursor-pointer ${
                      selectedDate === d.val
                        ? "bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)]"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5 mx-auto mb-1" />
                    <span>{d.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Time Slot */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-mono text-cyan-300 font-bold uppercase">
                  3. Select Time Slot
                </label>
                <span className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
                  <Globe className="w-3 h-3 text-cyan-400" />
                  <span>Timezone: {timezone}</span>
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {timeSlots.map((ts) => (
                  <button
                    key={ts}
                    type="button"
                    onClick={() => setSelectedTime(ts)}
                    className={`p-2.5 rounded-lg text-center text-xs font-mono transition-all border cursor-pointer ${
                      selectedTime === ts
                        ? "bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)]"
                        : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 mx-auto mb-1" />
                    <span>{ts}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setStep("details")}
                className="w-full py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Continue to Attendee Information</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === "details" && (
          <form onSubmit={handleConfirm} className="space-y-4">
            {/* Slot summary pill */}
            <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-slate-400">Booking:</span>{" "}
                <span className="text-cyan-300 font-bold">{selectedDate} @ {selectedTime}</span>
              </div>
              <button
                type="button"
                onClick={() => setStep("slot")}
                className="text-cyan-400 hover:underline cursor-pointer"
              >
                Change
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-cyan-300 mb-1">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Senthil Kumar"
                  className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-cyan-300 mb-1">
                  WORK EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-cyan-300 mb-1">
                COMPANY OR PROJECT NAME *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Nexus Robotics Inc."
                className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-cyan-300 mb-1">
                BRIEF TECHNICAL CHALLENGE / REQUIREMENT
              </label>
              <textarea
                rows={3}
                value={formData.currentChallenge}
                onChange={(e) => setFormData({ ...formData, currentChallenge: e.target.value })}
                placeholder="Describe your current hardware architecture, telemetry bottlenecks, or hiring needs..."
                className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-white"
              />
            </div>

            {/* Mutual NDA Checkbox */}
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="nda"
                checked={formData.ndaRequired}
                onChange={(e) => setFormData({ ...formData, ndaRequired: e.target.checked })}
                className="w-4 h-4 rounded border-cyan-500 text-cyan-500 focus:ring-0 bg-slate-900 cursor-pointer"
              />
              <label htmlFor="nda" className="text-xs font-mono text-slate-300 cursor-pointer">
                Send mutual 2-way Non-Disclosure Agreement (NDA) prior to the call.
              </label>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setStep("slot")}
                className="w-1/3 py-3 rounded-xl font-mono text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700 hover:bg-slate-800 cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
              >
                Confirm Video Consultation
              </button>
            </div>
          </form>
        )}

        {step === "confirmed" && (
          <div className="text-center py-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 mx-auto shadow-[0_0_25px_rgba(6,182,212,0.5)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-2xl font-bold text-white">Consultation Confirmed!</h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                A calendar invitation with a secure Google Meet / Teams link has been generated for{" "}
                <strong className="text-cyan-300">{formData.workEmail || "your email"}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 max-w-md mx-auto text-left text-xs font-mono space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Date &amp; Time:</span>
                <span className="text-cyan-300 font-bold">{selectedDate} @ {selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Domain:</span>
                <span className="text-cyan-300">{selectedTopic}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Host:</span>
                <span className="text-white">Principal IoT Architect, Qubryon Tech</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="text-emerald-400">Encrypted Video Conference</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-8 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all cursor-pointer"
              >
                Return to Site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
