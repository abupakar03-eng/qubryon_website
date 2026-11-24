"use client";

import React, { useState } from "react";
import { useModals } from "./ModalProvider";
import { ArrowUpRight, Plus, CheckCircle2 } from "lucide-react";
import { submitInquiry } from "@/lib/submitInquiry";

const NEEDS = ["Custom software", "Staff augmentation", "AI & ML", "Cloud & DevOps", "IoT / embedded", "Not sure yet"];
const TIMELINES = ["As soon as possible", "Within a month", "In 1–3 months", "Just exploring"];

const FAQS = [
  {
    q: "What does Qubryon do?",
    a: "We build custom software, AI, cloud, data and IoT products for companies worldwide, and we embed pre-vetted engineers into existing teams through IT staff augmentation.",
  },
  {
    q: "How does working together start?",
    a: "With a short intro call. We clarify your goals, scope and constraints, then send either a project proposal or a shortlist of engineer profiles, usually within 48 hours.",
  },
  {
    q: "Can you work in our time zone?",
    a: "Yes. Our teams plan overlap hours for North America, the UK and Europe, the Gulf and Asia Pacific, and use async hand-offs for the rest of the day.",
  },
  {
    q: "Who owns the code and the IP?",
    a: "You do. Every engagement includes full IP assignment and a mutual NDA, and code lives in your repositories from day one.",
  },
  {
    q: "What engagement models do you offer?",
    a: "Fixed-scope projects with clear milestones, time & material for evolving roadmaps, and dedicated teams that work only on your product.",
  },
  {
    q: "How quickly can engineers start?",
    a: "We share vetted profiles within 48 hours. Once you have interviewed and approved them, they can usually start right away, with a 2-week risk-free trial.",
  },
];

function Chips({ options, value, onChange, label }: { options: string[]; value: string; onChange: (v: string) => void; label: string }) {
  return (
    <fieldset>
      <legend className="text-[13px] text-[#5A4636] mb-2.5">
        {label} <span className="text-[#5A4636]/60">(optional)</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? "" : o)}
              className={`px-3.5 py-1.5 text-[15px] rounded-md transition-colors cursor-pointer ${
                active ? "bg-[#0A3A40] text-[#F3ECE3]" : "bg-[#141B08]/[0.07] text-[#2A3517] hover:bg-[#141B08]/[0.12]"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function ContactSection() {
  const { openConsultation: onOpenConsultation, openTalent: onOpenTalentModal } = useModals();
  const [form, setForm] = useState({ name: "", email: "", company: "", need: "", timeline: "", message: "", website: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const result = await submitInquiry("contact", { ...form });
    setSubmitting(false);
    if (result.ok) setSubmitted(true);
    else setError(result.message);
  };

  return (
    <section id="contact" className="relative">
      {/* ---------- Intro band ---------- */}
      <div className="texture-code text-[#F3ECE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.035em] leading-[1.02] max-w-3xl font-sans">
            Have a project in mind? Let&apos;s build it together.
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-[#F3ECE3]/75 max-w-xl leading-relaxed">
            Whether you need a whole product built or senior engineers added to your team, one conversation is enough to
            get started.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <button
              onClick={onOpenConsultation}
              className="group inline-flex items-center gap-4 bg-[#F3ECE3] text-[#141B08] pl-5 pr-2 py-2 text-[17px] hover:bg-white transition-colors cursor-pointer"
            >
              Book a 30-min intro call
              <span className="w-8 h-8 bg-[#0A3A40] text-[#F3ECE3] flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
            <a
              href="mailto:contact@qubryon.com"
              className="text-[17px] underline underline-offset-[6px] decoration-[#F3ECE3]/50 hover:decoration-[#F4D03F] hover:text-[#F4D03F] transition-colors"
            >
              contact@qubryon.com
            </a>
          </div>
        </div>
      </div>

      {/* ---------- Form + details ---------- */}
      <div className="texture-grain text-[#141B08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form */}
          <div className="lg:col-span-8 lg:order-1">
            <h3 className="flex items-center gap-3 text-2xl font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0A3A40]" /> Tell us about your project
            </h3>
            <p className="mt-2 text-[15px] text-[#5A4636]">A few details help us bring the right people to the first call.</p>

            {submitted ? (
              <div role="status" className="mt-10 border-t border-[#141B08]/15 pt-10">
                <CheckCircle2 className="w-9 h-9 text-[#0A3A40]" aria-hidden="true" />
                <h4 className="mt-4 text-2xl font-medium">Thanks, {form.name || "we've got it"}.</h4>
                <p className="mt-2 text-[#5A4636] max-w-lg">
                  Your message is with our team. We&apos;ll reply personally at{" "}
                  <span className="text-[#141B08] font-medium">{form.email}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-[15px] underline underline-offset-4 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 space-y-9">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-9">
                  <label className="block">
                    <span className="text-[13px] text-[#5A4636]">Name</span>
                    <input
                      required
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name…"
                      className="line-input"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[13px] text-[#5A4636]">Work email</span>
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      spellCheck={false}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className="line-input"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-[13px] text-[#5A4636]">
                    Company &amp; country <span className="text-[#5A4636]/60">(optional)</span>
                  </span>
                  <input
                    name="company"
                    autoComplete="organization"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. Acme Inc., Germany…"
                    className="line-input"
                  />
                </label>

                <Chips label="What do you need?" options={NEEDS} value={form.need} onChange={(v) => setForm({ ...form, need: v })} />
                <Chips
                  label="When would you like to start?"
                  options={TIMELINES}
                  value={form.timeline}
                  onChange={(v) => setForm({ ...form, timeline: v })}
                />

                <label className="block">
                  <span className="text-[13px] text-[#5A4636]">The project</span>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="What are you building, who is it for, and what do you need from us?"
                    className="line-input resize-y"
                  />
                </label>

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
                  <p role="alert" className="text-[15px] border-l-2 border-[#0A3A40] bg-white/40 px-4 py-3 text-[#3B2F25]">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center gap-4 bg-[#0A3A40] text-[#F3ECE3] pl-5 pr-2 py-2 text-[17px] hover:bg-[#0F4E57] transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? "Sending…" : "Send message"}
                  <span className="w-8 h-8 bg-[#F3ECE3] text-[#141B08] flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Direct details */}
          <aside id="corporate" className="lg:col-span-4 lg:order-2 space-y-10 lg:pt-1">
            <div>
              <h3 className="flex items-center gap-3 text-2xl font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0A3A40]" /> Talk to us directly
              </h3>
              <dl className="mt-6 divide-y divide-[#141B08]/12 border-y border-[#141B08]/12">
                {[
                  ["General", <a key="g" href="mailto:contact@qubryon.com" className="hover:underline">contact@qubryon.com</a>],
                  ["Projects & staffing", <a key="s" href="mailto:solutions@qubryon.com" className="hover:underline">solutions@qubryon.com</a>],
                  ["Phone", <span key="p">+91 431 279 8900<br />+91 94890 12026</span>],
                  ["Hours", <span key="h">Mon–Fri, 09:00–18:30 IST<br />plus overlap for US, EU, GCC &amp; APAC</span>],
                ].map(([k, v]) => (
                  <div key={k as string} className="py-4 grid grid-cols-[120px_1fr] gap-4 text-[15px]">
                    <dt className="text-[#5A4636]">{k}</dt>
                    <dd className="text-[#141B08]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <div className="text-[13px] text-[#5A4636]">Registered office</div>
              <p className="mt-1.5 text-[15px] leading-relaxed">
                Qubryon Technologies Private Limited
                <br />
                Tennur, Tiruchirappalli, Tamil Nadu 620017, India
              </p>
            </div>
            <button
              onClick={onOpenTalentModal}
              className="text-[15px] underline underline-offset-4 decoration-[#141B08]/40 hover:decoration-[#141B08] inline-flex items-center gap-1 cursor-pointer"
            >
              Looking to hire engineers? Request profiles <ArrowUpRight className="w-4 h-4" />
            </button>
          </aside>
        </div>

        {/* FAQs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
          <h3 className="flex items-center gap-3 text-2xl font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0A3A40]" /> FAQs
          </h3>
          <div className="mt-6 border-t border-[#141B08]/15">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-b border-[#141B08]/15">
                <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none text-lg">
                  {f.q}
                  <Plus className="w-5 h-5 shrink-0 text-[#5A4636] transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <p className="pb-6 -mt-1 text-[16px] text-[#5A4636] leading-relaxed max-w-3xl">{f.a}</p>
              </details>
            ))}
          </div>
          <button
            onClick={onOpenConsultation}
            className="group mt-10 inline-flex items-center gap-4 bg-[#0A3A40] text-[#F3ECE3] pl-5 pr-2 py-2 text-[17px] hover:bg-[#0F4E57] transition-colors cursor-pointer"
          >
            Book an intro call
            <span className="w-8 h-8 bg-[#F3ECE3] text-[#141B08] flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
