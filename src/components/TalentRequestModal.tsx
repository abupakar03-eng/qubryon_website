"use client";

import React, { useId, useState } from "react";
import { X, Users, CheckCircle2, Send } from "lucide-react";
import { useDialog } from "@/lib/useDialog";
import { submitInquiry } from "@/lib/submitInquiry";

interface TalentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROLES = [
  "Senior React / Next.js Engineer",
  "Backend Engineer (Python / Rust)",
  "ML / AI Engineer (PyTorch)",
  "DevOps / Cloud Engineer (AWS / Azure)",
  "Data Engineer (Kafka / SQL)",
  "Embedded / Firmware Engineer (C / C++)",
  "Dedicated cross-functional pod",
];
const SENIORITY = ["Senior (5-8 yrs)", "Lead / Principal (8+ yrs)", "Mid-level (3-5 yrs)"];
const HEADCOUNT = ["1 engineer", "2 engineers", "3-5 engineers", "5+ engineers"];
const URGENCY = ["As soon as possible", "Within 1-2 weeks", "Next month"];

export default function TalentRequestModal({ isOpen, onClose }: TalentModalProps) {
  const ids = useId();
  const titleId = `${ids}-title`;
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    role: ROLES[0],
    seniority: SENIORITY[0],
    count: HEADCOUNT[0],
    urgency: URGENCY[0],
    name: "",
    email: "",
    company: "",
    website: "",
  });

  const resetAndClose = () => {
    setSubmitted(false);
    setError("");
    onClose();
  };
  const dialogRef = useDialog<HTMLDivElement>(isOpen, resetAndClose);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    const result = await submitInquiry("talent", { ...form });
    setSending(false);
    if (result.ok) setSubmitted(true);
    else setError(result.message);
  };

  const field = "w-full px-3 py-2.5 rounded-lg text-sm sand-glass-input";
  const labelCls = "block text-[11px] text-[#F4D03F] mb-1 tracking-wider uppercase font-bold";

  const select = (key: "role" | "seniority" | "count" | "urgency", label: string, options: string[]) => (
    <div>
      <label htmlFor={`${ids}-${key}`} className={labelCls}>
        {label}
      </label>
      <select
        id={`${ids}-${key}`}
        name={key}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className={`${field} cursor-pointer`}
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#072C31] text-[#F3ECE3]">
            {o}
          </option>
        ))}
      </select>
    </div>
  );

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
            <Users className="w-4 h-4" aria-hidden="true" />
            <span className="tracking-widest uppercase font-bold">IT staff augmentation</span>
          </div>
          <h2 id={titleId} className="text-2xl sm:text-3xl font-extrabold text-white font-syne tracking-wide">
            Request pre-vetted engineers
          </h2>
          <p className="text-sm text-[#EDC9AF] mt-1">
            Tell us who you need. We aim to share matching profiles within 48 hours, with a 2-week risk-free trial.
          </p>
        </div>

        {submitted ? (
          <div role="status" className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F4D03F]/20 border border-[#F4D03F] flex items-center justify-center text-[#F4D03F] mx-auto">
              <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-white font-syne">Request received</h3>
            <p className="text-sm text-[#EDC9AF] max-w-md mx-auto leading-relaxed">
              Thanks, {form.name || "there"}. We&apos;ll email <span className="text-[#F4D03F]">{form.email}</span> about your{" "}
              <strong className="text-[#F4D03F]">{form.count}</strong> ({form.role}) request and the next steps.
            </p>
            <button type="button" onClick={resetAndClose} className="key-signal-yellow px-8 py-3 rounded-xl text-sm cursor-pointer">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {select("role", "Role *", ROLES)}
              {select("seniority", "Seniority *", SENIORITY)}
              {select("count", "Headcount", HEADCOUNT)}
              {select("urgency", "When to start", URGENCY)}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${ids}-name`} className={labelCls}>Your name *</label>
                <input
                  id={`${ids}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Alex Johnson…"
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
                  placeholder="alex@company.com"
                  className={field}
                />
              </div>
            </div>

            <div>
              <label htmlFor={`${ids}-company`} className={labelCls}>Company *</label>
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

            {error && (
              <p role="alert" className="text-sm rounded-xl border border-[#F4D03F]/40 bg-[#F4D03F]/10 text-[#F7E7A8] px-3.5 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="key-signal-yellow w-full py-4 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {sending ? (
                <span>Sending request…</span>
              ) : (
                <>
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Request candidate profiles</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
