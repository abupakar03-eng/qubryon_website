"use client";

import React, { useId, useState } from "react";
import {
  CheckCircle2,
  Clock,
  FileCheck,
  Send,
  Users,
  Video,
  Workflow,
  ChartColumn,
  Search,
  ArrowRight,
} from "lucide-react";
import DotTerrain, { type TerrainPin } from "./DotTerrain";
import { submitInquiry } from "@/lib/submitInquiry";

interface StaffAugmentationProps {
  onSuccessSubmit?: (data: Record<string, string>) => void;
}

/* ======================= Talent: hiring process as stacked cards ======================= */

interface Step {
  name: string;
  title: string;
  body: string;
  outcome: string;
  tint: string;
  accent: string;
  tiles: { icon: React.ElementType; caption: string; mock: React.ReactNode }[];
}

const Row = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex items-center justify-between gap-3 rounded-xl bg-white border border-[#141B08]/8 px-3 py-2 text-[13px] ${className}`}>
    {children}
  </div>
);

const Avatar = ({ text }: { text: string }) => (
  <span className="w-7 h-7 rounded-full bg-[#1A2309] text-[#F4D03F] text-[10px] font-semibold flex items-center justify-center shrink-0">
    {text}
  </span>
);

const STEPS: Step[] = [
  {
    name: "Brief",
    title: "Tell us exactly who you need",
    body: "Share the role, seniority, tech stack, time zone and engagement length. A solutions lead reviews it and replies within 2 hours.",
    outcome: "A clear, written role profile agreed with you before any search begins.",
    tint: "from-[#0F4C53]/75 to-[#0A3A40]/60",
    accent: "#F4D03F",
    tiles: [
      {
        icon: FileCheck,
        caption: "Role, stack and time-zone needs captured in one brief",
        mock: (
          <div className="space-y-2">
            <Row>
              <span className="text-[#4A5634]">Role</span>
              <span className="font-medium">Senior React Engineer</span>
            </Row>
            <Row>
              <span className="text-[#4A5634]">Stack</span>
              <span className="font-medium">Next.js · TypeScript · AWS</span>
            </Row>
            <Row>
              <span className="text-[#4A5634]">Overlap</span>
              <span className="font-medium">US Eastern, 4 hrs</span>
            </Row>
          </div>
        ),
      },
      {
        icon: Clock,
        caption: "Reply from a solutions lead within 2 hours",
        mock: (
          <div className="space-y-2.5">
            <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-[#1A2309] text-[#F3ECE3] px-3.5 py-2 text-[13px]">
              We need two senior React developers for Q3.
            </div>
            <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-white border border-[#141B08]/8 px-3.5 py-2 text-[13px]">
              Got it. Your shortlist will be ready within 48 hours.
            </div>
          </div>
        ),
      },
    ],
  },
  {
    name: "Match",
    title: "Interview pre-vetted engineers",
    body: "Within 48 hours you receive 2–3 profiles matched to your architecture. You run the technical interview and make the call.",
    outcome: "Engineers you have personally interviewed and approved, backed by a 2-week risk-free trial.",
    tint: "from-[#0B4047]/80 to-[#072E33]/65",
    accent: "#EDC9AF",
    tiles: [
      {
        icon: Users,
        caption: "A shortlist of vetted profiles in under 48 hours",
        mock: (
          <div className="space-y-2">
            {[
              ["FE", "Frontend · React / Next.js", "Strong match"],
              ["BE", "Backend · Python / Rust", "Available now"],
              ["ML", "ML Engineer · PyTorch", "Strong match"],
            ].map(([a, r, tag]) => (
              <Row key={a}>
                <span className="flex items-center gap-2.5 min-w-0">
                  <Avatar text={a} />
                  <span className="truncate">{r}</span>
                </span>
                <span className="text-[11px] rounded-full bg-[#6B8E23]/12 text-[#3D5214] px-2 py-0.5 shrink-0">{tag}</span>
              </Row>
            ))}
          </div>
        ),
      },
      {
        icon: Video,
        caption: "You interview candidates directly",
        mock: (
          <div className="rounded-2xl bg-white border border-[#141B08]/8 p-4">
            <div className="text-[11px] uppercase text-[#4A5634]">Technical interview</div>
            <div className="mt-1 font-semibold">Thursday · 10:00 ET · 45 min</div>
            <div className="mt-3 flex items-center gap-2">
              <Avatar text="FE" />
              <span className="text-[13px] text-[#4A5634]">with your engineering lead</span>
            </div>
            <div className="mt-4 inline-flex rounded-full bg-[#F4D03F] px-3 py-1 text-[12px] font-medium">Join call</div>
          </div>
        ),
      },
    ],
  },
  {
    name: "Onboard",
    title: "Scale your team from day one",
    body: "Engineers join your Slack, Jira and GitHub on day one and follow your sprint rhythm. We handle contracts, payroll and HR.",
    outcome: "More delivery capacity without hiring overhead, with full IP assignment and strict NDAs.",
    tint: "from-[#12585F]/75 to-[#0A3A40]/60",
    accent: "#8FD0C9",
    tiles: [
      {
        icon: Workflow,
        caption: "Working inside your tools and rituals",
        mock: (
          <div className="space-y-2">
            {["Slack", "Jira", "GitHub"].map((tool) => (
              <Row key={tool}>
                <span className="font-medium">{tool}</span>
                <span className="flex items-center gap-1 text-[12px] text-[#3D5214]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                </span>
              </Row>
            ))}
          </div>
        ),
      },
      {
        icon: ChartColumn,
        caption: "Weekly progress and velocity reports",
        mock: (
          <div className="rounded-2xl bg-white border border-[#141B08]/8 p-4 space-y-3">
            <div className="text-[11px] uppercase text-[#4A5634]">This sprint</div>
            {[
              ["Stories done", "w-[80%]"],
              ["PRs merged", "w-[65%]"],
              ["Bugs closed", "w-[90%]"],
            ].map(([label, width]) => (
              <div key={label}>
                <div className="text-[12px] text-[#141B08] mb-1">{label}</div>
                <div className="h-2 rounded-full bg-[#141B08]/8">
                  <div className={`h-2 rounded-full bg-[#6B8E23] ${width}`} />
                </div>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
];

/* ======================= Tech stacks ======================= */

const TECH_PINS: TerrainPin[] = [
  { label: "React", sub: "Frontend", x: -0.78, z: 0.12 },
  { label: "Python", sub: "Backend", x: -0.32, z: 0.05 },
  { label: "AWS", sub: "Cloud", x: 0.2, z: 0.1 },
  { label: "PyTorch", sub: "AI / ML", x: 0.66, z: 0.06 },
  { label: "Next.js", x: -0.55, z: 0.42, wideOnly: true },
  { label: "Rust", x: -0.05, z: 0.38, wideOnly: true },
  { label: "Kubernetes", x: 0.42, z: 0.4, wideOnly: true },
  { label: "Azure", x: 0.86, z: 0.36, wideOnly: true },
  { label: "TypeScript", x: -0.88, z: 0.72, wideOnly: true },
  { label: "Kafka", x: -0.3, z: 0.75, wideOnly: true },
  { label: "C / C++", x: 0.18, z: 0.7, wideOnly: true },
  { label: "MQTT", x: 0.62, z: 0.78, wideOnly: true },
];

const STACK_GROUPS = [
  {
    title: "Web & product engineering",
    body: "Modern web apps, client portals and real-time dashboards.",
    stack: ["React", "Next.js", "TypeScript", "Three.js", "WebSockets"],
  },
  {
    title: "Backend & cloud",
    body: "Serverless and streaming backends on AWS and Azure that scale with you.",
    stack: ["Python", "Rust", "AWS", "Azure", "Docker", "Kubernetes"],
  },
  {
    title: "AI & machine learning",
    body: "Production ML, computer vision and on-device TinyML models.",
    stack: ["PyTorch", "TensorFlow Lite", "ONNX", "TensorRT", "Edge Impulse"],
  },
  {
    title: "Data & analytics",
    body: "Pipelines, time-series storage and analytics for high-volume data.",
    stack: ["Kafka", "PostgreSQL", "TimescaleDB", "Grafana"],
  },
  {
    title: "Embedded & IoT",
    body: "Reliable firmware and device connectivity for connected products.",
    stack: ["C / C++", "Rust", "Zephyr RTOS", "FreeRTOS", "MQTT v5", "Modbus"],
  },
];

export default function StaffAugmentation({ onSuccessSubmit }: StaffAugmentationProps) {
  const [highlight, setHighlight] = useState<number | null>(null);

  const onPinClick = (pin: TerrainPin) => {
    const i = STACK_GROUPS.findIndex((g) => g.stack.some((s) => s.toLowerCase().startsWith(pin.label.toLowerCase())));
    if (i < 0) return;
    setHighlight(i);
    document.getElementById(`stack-group-${i}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      {/* ---------------------------- TALENT ---------------------------- */}
      <section id="talent" className="relative text-[#F3ECE3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-16 text-center">
          <div className="text-[12px] uppercase tracking-[0.18em] text-[#EDC9AF] font-semibold">IT staff augmentation</div>
          <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] leading-[1.05] font-sans">
            Senior engineers in your team, within 48 hours.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#F3ECE3]/70 leading-relaxed max-w-2xl mx-auto">
            Skip three-month hiring cycles. We match vetted developers, ML engineers and DevOps specialists to your stack,
            time zone and sprint rhythm, in three simple steps.
          </p>
        </div>

        {/* Stacked, sticky step cards */}
        <div className="relative">
          {STEPS.map((step, i) => (
            <div
              key={step.name}
              className={`lg:sticky lg:top-0 lg:min-h-screen flex items-center bg-gradient-to-b ${step.tint} backdrop-blur-2xl border-t border-white/10`}
              style={{ zIndex: i + 1 }}
            >
              <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28 pb-12">
                <div className="rounded-3xl bg-white/[0.06] backdrop-blur border border-white/10 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] p-6 sm:p-9">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">{step.name}</div>
                    <div className="text-[12px] text-[#F3ECE3]/55 tabular-nums">
                      {String(i + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
                    </div>
                  </div>
                  <h3 className="mt-3 text-2xl sm:text-4xl font-light tracking-[-0.02em] font-sans">{step.title}</h3>
                  <p className="mt-3 text-[15px] text-[#F3ECE3]/70 max-w-3xl leading-relaxed">{step.body}</p>
                  <div className="mt-6 h-6 w-px" style={{ background: step.accent }} />
                  <div className="mt-3 text-[11px] uppercase tracking-[0.14em] font-semibold">Outcome</div>
                  <p className="mt-1 text-[15px] text-[#F3ECE3]/90">{step.outcome}</p>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {step.tiles.map(({ icon: Icon, caption, mock }) => (
                    <div key={caption} className="rounded-3xl bg-white/[0.05] backdrop-blur border border-white/10 p-4 sm:p-5">
                      <div className="rounded-2xl bg-[#F3ECE3] text-[#141B08] p-3 sm:p-4 min-h-[150px]">{mock}</div>
                      <div className="mt-4 flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-[#EDC9AF] flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-[#072C31]" />
                        </span>
                        <span className="text-[14px] text-[#F3ECE3]/85">{caption}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <RequestDevelopers onSuccessSubmit={onSuccessSubmit} />
        </div>
      </section>

      {/* ---------------------------- TECH STACKS ---------------------------- */}
      <section id="tech-stacks" className="relative text-[#F3ECE3] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 text-center">
          <div className="text-[12px] uppercase tracking-[0.18em] text-[#EDC9AF] font-semibold">One team. Every layer.</div>
          <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] leading-[1.05] font-sans">
            Engineers across 40+ technology stacks
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#F3ECE3]/70 leading-relaxed max-w-2xl mx-auto">
            From the browser to the cloud to the device, our engineers already know the tools your product runs on.
            Tap a technology to see where it fits.
          </p>
        </div>

        <DotTerrain
          pins={TECH_PINS}
          onPinClick={onPinClick}
          dotRgb="237,201,175"
          stemClass="bg-[#EDC9AF]/40"
          className="h-[420px] sm:h-[520px] -mt-4"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 -mt-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {STACK_GROUPS.map((g, i) => (
              <div
                key={g.title}
                id={`stack-group-${i}`}
                className={`rounded-3xl p-6 border backdrop-blur transition-all duration-300 ${
                  highlight === i
                    ? "bg-[#EDC9AF] border-[#EDC9AF] text-[#072C31] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.7)] -translate-y-1"
                    : "bg-white/[0.06] border-white/12 text-[#F3ECE3] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                }`}
              >
                <div className={`text-[12px] tabular-nums ${highlight === i ? "text-[#0A3A40]" : "text-[#F3ECE3]/50"}`}>
                  {String(i + 1).padStart(2, "0")} / {String(STACK_GROUPS.length).padStart(2, "0")}
                </div>
                <h3 className="mt-2 text-lg font-semibold leading-snug">{g.title}</h3>
                <p className={`mt-2 text-[13px] leading-relaxed ${highlight === i ? "text-[#3B2F25]" : "text-[#F3ECE3]/65"}`}>{g.body}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {g.stack.map((s) => (
                    <span
                      key={s}
                      className={`text-[12px] rounded-full px-2.5 py-1 ${
                        highlight === i ? "bg-[#072C31]/10 text-[#072C31]" : "bg-white/[0.07] text-[#F3ECE3]/85"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ======================= Request developers form ======================= */

function RequestDevelopers({ onSuccessSubmit }: StaffAugmentationProps) {
  const ids = useId();
  const [formData, setFormData] = useState({
    role: "Senior React / Next.js Engineer",
    seniority: "Senior (5-8 yrs)",
    count: "1 engineer",
    duration: "6+ months",
    stack: "",
    name: "",
    email: "",
    company: "",
    website: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const result = await submitInquiry("talent", { ...formData });
    setSubmitting(false);
    if (result.ok) {
      setSubmitted(true);
      onSuccessSubmit?.(formData);
    } else {
      setError(result.message);
    }
  };

  const labelCls = "block text-[12px] text-[#E6DED3]/85 mb-1.5";
  const field = "w-full px-3 py-2.5 rounded-xl text-sm sand-glass-input";

  const select = (key: "role" | "seniority" | "count" | "duration", label: string, options: string[]) => (
    <div>
      <label htmlFor={`${ids}-${key}`} className={labelCls}>
        {label}
      </label>
      <select
        id={`${ids}-${key}`}
        name={key}
        value={formData[key]}
        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
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
    <div className="olive-carbon-panel rounded-3xl p-7 sm:p-10 text-[#F3ECE3]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5">
          <div className="text-[12px] uppercase tracking-[0.16em] text-[#F4D03F] font-semibold">Start in 48 hours</div>
          <h3 className="mt-3 text-3xl sm:text-4xl font-light tracking-[-0.02em] text-white">Request pre-vetted developers</h3>
          <p className="mt-4 text-[15px] text-[#E6DED3]/75 leading-relaxed">
            Tell us the profile you need. A technical lead curates matching candidates and sets up interviews within 48 hours.
          </p>
          <ul className="mt-6 space-y-3 text-[14px]">
            {[
              "2-week risk-free trial",
              "Works in your Slack, Teams, Jira and GitHub",
              "Full IP assignment and strict NDAs",
              "Time-zone overlap for US, EU, GCC and APAC",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#F4D03F] shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <div role="status" className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center">
              <CheckCircle2 className="w-10 h-10 text-[#F4D03F] mx-auto" aria-hidden="true" />
              <h4 className="mt-4 text-xl font-semibold text-white">Request received</h4>
              <p className="mt-2 text-sm text-[#E6DED3]/80 max-w-md mx-auto">
                Thank you, {formData.name || "there"}. We&apos;ll email <span className="text-[#F4D03F]">{formData.email}</span> about
                your <span className="text-[#F4D03F]">{formData.role}</span> request and the next steps.
              </p>
              <button type="button" onClick={() => setSubmitted(false)} className="key-signal-yellow mt-6 px-6 py-2.5 rounded-full text-sm cursor-pointer">
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {select("role", "Role *", [
                  "Senior React / Next.js Engineer",
                  "Backend Engineer (Python / Rust)",
                  "ML / AI Engineer (PyTorch)",
                  "DevOps / Cloud Engineer (AWS / Azure)",
                  "Data Engineer (Kafka / SQL)",
                  "Embedded / Firmware Engineer (C / C++)",
                  "Dedicated cross-functional pod",
                ])}
                {select("seniority", "Experience *", ["Senior (5-8 yrs)", "Lead / Principal (8+ yrs)", "Mid-level (3-5 yrs)"])}
                {select("count", "Headcount", ["1 engineer", "2 engineers", "3-5 engineers", "5+ engineers"])}
                {select("duration", "Engagement length", ["1-3 months", "3-6 months", "6+ months"])}
              </div>
              <div>
                <label htmlFor={`${ids}-stack`} className={labelCls}>
                  Main tech stack
                </label>
                <input
                  id={`${ids}-stack`}
                  name="stack"
                  type="text"
                  autoComplete="off"
                  value={formData.stack}
                  onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
                  placeholder="e.g. Next.js, Python, AWS, PostgreSQL…"
                  className={field}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`${ids}-name`} className={labelCls}>
                    Your name *
                  </label>
                  <input
                    id={`${ids}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Johnson…"
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor={`${ids}-email`} className={labelCls}>
                    Work email *
                  </label>
                  <input
                    id={`${ids}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    spellCheck={false}
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className={field}
                  />
                </div>
              </div>
              <div>
                <label htmlFor={`${ids}-company`} className={labelCls}>
                  Company
                </label>
                <input
                  id={`${ids}-company`}
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />

              {error && (
                <p role="alert" className="text-sm rounded-xl border border-[#F4D03F]/40 bg-[#F4D03F]/10 text-[#F7E7A8] px-3.5 py-2.5">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="key-signal-yellow w-full py-3.5 rounded-full text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {submitting ? (
                  <span>Sending request…</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Request candidate profiles</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-[12px] text-[#E6DED3]/60 text-center flex items-center justify-center gap-1.5">
                <Search className="w-3.5 h-3.5" /> Confidential talent scoping, protected by NDA.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
