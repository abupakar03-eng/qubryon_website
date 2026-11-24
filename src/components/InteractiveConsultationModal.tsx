"use client";

import React, { useId, useState } from "react";
import { X, Calendar, Clock, Video, CheckCircle2, ArrowRight, Globe } from "lucide-react";
import { useDialog } from "@/lib/useDialog";
import { submitInquiry } from "@/lib/submitInquiry";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOPICS = [
  "Custom software or SaaS product",
  "IT staff augmentation (< 48 hrs)",
  "AI & machine learning",
  "Cloud, data or DevOps",
  "IoT or embedded systems",
  "General inquiry",
];

const DATES = ["Today", "Tomorrow", "In 2 days", "Next Monday"];

const TIME_SLOTS = ["10:30 AM IST", "01:00 PM IST", "03:00 PM IST", "05:30 PM IST", "08:00 PM IST (US morning)"];

const TIMEZONE = "IST (UTC+5:30)";

function ChoiceGroup({
  legend,
  options,
  value,
  onChange,
  icon: Icon,
  columns,
}: {
  legend: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  icon?: React.ElementType;
  columns: string;
}) {
  return (
    <fieldset>
      <legend className="block text-xs text-[#F4D03F] mb-2 font-bold uppercase tracking-wider">{legend}</legend>
      <div className={`grid gap-2 ${columns}`}>
        {options.map((o) => {
          const active = value === o;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o)}
              className={`p-2.5 rounded-xl text-xs transition-colors cursor-pointer ${
                Icon ? "text-center" : "text-left"
              } ${active ? "key-signal-yellow" : "key-tactical-olive"}`}
            >
              {Icon && <Icon aria-hidden="true" className={`w-3.5 h-3.5 mx-auto mb-1 ${active ? "text-[#172108]" : "text-[#F4D03F]"}`} />}
              <span className={active ? "text-[#172108] font-bold" : "text-[#EDC9AF]"}>{o}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function InteractiveConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const ids = useId();
  const titleId = `${ids}-title`;
  const [step, setStep] = useState<"slot" | "details" | "confirmed">("slot");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [date, setDate] = useState("Tomorrow");
  const [time, setTime] = useState("03:00 PM IST");
  const [form, setForm] = useState({ name: "", email: "", company: "", challenge: "", nda: true, website: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const resetAndClose = () => {
    setStep("slot");
    setError("");
    onClose();
  };
  const dialogRef = useDialog<HTMLDivElement>(isOpen, resetAndClose);

  if (!isOpen) return null;

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    const result = await submitInquiry("consultation", {
      name: form.name,
      email: form.email,
      company: form.company,
      topic,
      preferredDate: date,
      preferredTime: `${time} (${TIMEZONE})`,
      challenge: form.challenge,
      ndaRequested: form.nda ? "yes" : "no",
      website: form.website,
    });
    setSending(false);
    if (result.ok) setStep("confirmed");
    else setError(result.message);
  };

  const field = "w-full px-3 py-2 rounded-lg text-sm sand-glass-input";
  const labelCls = "block text-[11px] text-[#F4D03F] mb-1 tracking-wider uppercase font-bold";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
      onMouseDown={(e) => e.target === e.currentTarget && resetAndClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto overscroll-contain olive-carbon-panel p-6 sm:p-8 rounded-3xl text-[#EDC9AF] outline-none"
      >
        <button
          type="button"
          onClick={resetAndClose}
          aria-label="Close dialog"
          className="key-tactical-olive absolute top-5 right-5 p-2 rounded-xl text-[#EDC9AF] hover:text-[#F4D03F] cursor-pointer z-10"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="mb-6 pr-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[#F4D03F] text-xs mb-2 border border-white/15 bg-white/5">
            <Video className="w-4 h-4" aria-hidden="true" />
            <span className="tracking-widest uppercase font-bold">30-min intro call</span>
          </div>
          <h2 id={titleId} className="text-2xl sm:text-3xl font-extrabold text-white font-syne tracking-wide">
            Book an intro call
          </h2>
          <p className="text-sm text-[#EDC9AF] mt-1">
            Pick a topic and a preferred slot. We&apos;ll email you to confirm the time and share a meeting link.
          </p>
        </div>

        {step === "slot" && (
          <div className="space-y-6">
            <ChoiceGroup legend="1. Topic" options={TOPICS} value={topic} onChange={setTopic} columns="grid-cols-1 sm:grid-cols-2" />
            <ChoiceGroup legend="2. Preferred date" options={DATES} value={date} onChange={setDate} icon={Calendar} columns="grid-cols-2 sm:grid-cols-4" />
            <div>
              <ChoiceGroup legend="3. Preferred time" options={TIME_SLOTS} value={time} onChange={setTime} icon={Clock} columns="grid-cols-2 sm:grid-cols-3" />
              <p className="mt-2 text-[11px] text-[#EDC9AF]/80 flex items-center gap-1">
                <Globe className="w-3 h-3 text-[#F4D03F]" aria-hidden="true" /> Times shown in {TIMEZONE}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStep("details")}
              className="key-signal-yellow w-full py-4 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to your details</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}

        {step === "details" && (
          <form onSubmit={handleConfirm} className="space-y-4" noValidate={false}>
            <div className="p-3.5 rounded-xl flex items-center justify-between text-sm border border-white/15 bg-white/5">
              <div>
                <span className="text-[#EDC9AF]/80">Preferred slot:</span>{" "}
                <span className="text-[#F4D03F] font-bold">
                  {date} @ {time}
                </span>
              </div>
              <button type="button" onClick={() => setStep("slot")} className="text-[#F4D03F] underline underline-offset-2 cursor-pointer">
                Change
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${ids}-name`} className={labelCls}>Full name *</label>
                <input
                  id={`${ids}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  data-autofocus
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Sarah Mitchell…"
                  className={field}
                />
              </div>
              <div>
                <label htmlFor={`${ids}-email`} className={labelCls}>Work email *</label>
                <input
                  id={`${ids}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  spellCheck={false}
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@company.com"
                  className={field}
                />
              </div>
            </div>

            <div>
              <label htmlFor={`${ids}-company`} className={labelCls}>Company or project *</label>
              <input
                id={`${ids}-company`}
                name="company"
                type="text"
                autoComplete="organization"
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="e.g. Acme Inc.…"
                className={field}
              />
            </div>

            <div>
              <label htmlFor={`${ids}-challenge`} className={labelCls}>What would you like to discuss?</label>
              <textarea
                id={`${ids}-challenge`}
                name="challenge"
                rows={3}
                value={form.challenge}
                onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                placeholder="Your product, the problem to solve, or the engineers you need…"
                className={field}
              />
            </div>

            {/* honeypot — hidden from people and assistive tech */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id={`${ids}-nda`}
                name="nda"
                checked={form.nda}
                onChange={(e) => setForm({ ...form, nda: e.target.checked })}
                className="w-4 h-4 cursor-pointer accent-[#F4D03F]"
              />
              <label htmlFor={`${ids}-nda`} className="text-sm text-[#EDC9AF] cursor-pointer">
                Send a mutual NDA before the call
              </label>
            </div>

            {error && (
              <p role="alert" className="text-sm rounded-xl border border-[#F4D03F]/40 bg-[#F4D03F]/10 text-[#F7E7A8] px-3.5 py-2.5">
                {error}
              </p>
            )}

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setStep("slot")}
                className="key-tactical-olive w-1/3 py-3 rounded-xl text-sm cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={sending}
                className="key-signal-yellow w-2/3 py-3 rounded-xl text-sm flex items-center justify-center cursor-pointer disabled:opacity-60"
              >
                {sending ? "Sending request…" : "Request this slot"}
              </button>
            </div>
          </form>
        )}

        {step === "confirmed" && (
          <div role="status" className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#F4D03F]/20 border border-[#F4D03F] flex items-center justify-center text-[#F4D03F] mx-auto">
              <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white font-syne">Request sent</h3>
              <p className="text-sm text-[#EDC9AF] max-w-md mx-auto mt-2 leading-relaxed">
                Thanks, {form.name || "there"}. We&apos;ll email <strong className="text-[#F4D03F]">{form.email}</strong> to
                confirm your <strong className="text-[#F4D03F]">{date} @ {time}</strong> slot and send the meeting link.
              </p>
            </div>
            <button
              type="button"
              onClick={resetAndClose}
              className="key-signal-yellow px-8 py-3 rounded-xl text-sm cursor-pointer"
            >
              Back to the site
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
