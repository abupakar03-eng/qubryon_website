"use client";

import React from "react";
import { useModals } from "./ModalProvider";
import {
  ArrowRight,
  BrainCircuit,
  Briefcase,
  CheckCircle2,
  ChartColumn,
  Cloud,
  CodeXml,
  Cpu,
  Layers,
  Repeat,
  UsersRound,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import GallerySection, { type GalleryItem } from "./GallerySection";
import { HERO_SERVICES } from "./three/heroServices";
import { drawServicePoster } from "./three/galleryArt";

interface Flagship {
  id: string;
  eyebrow: string;
  title: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  features: string[];
  stack: string[];
  cta: string;
  variant: "dark" | "yellow";
}

interface Specialty {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  points: string[];
  stack: string[];
  span: string;
}

const SPECIALTIES: Specialty[] = [
  {
    id: "service-ai",
    title: "AI & Machine Learning",
    icon: BrainCircuit,
    description:
      "Predictive models, computer vision and ML pipelines that move from notebook to production and keep improving.",
    points: ["Predictive analytics & anomaly detection", "Computer vision & edge inference", "MLOps, monitoring & retraining"],
    stack: ["PyTorch", "TensorRT", "OpenCV", "ONNX"],
    span: "lg:col-span-3",
  },
  {
    id: "service-cloud",
    title: "Cloud & DevOps",
    icon: Cloud,
    description:
      "Secure, scalable infrastructure on AWS and Azure, with infrastructure as code, containers and automated CI/CD.",
    points: ["Cloud architecture & migration", "Terraform, Docker & Kubernetes", "CI/CD, observability & cost control"],
    stack: ["AWS", "Azure", "Terraform", "Kubernetes"],
    span: "lg:col-span-3",
  },
  {
    id: "service-data",
    title: "Data & Analytics",
    icon: ChartColumn,
    description: "Streaming pipelines, time-series warehouses and dashboards that turn raw data into decisions.",
    points: ["Real-time data pipelines", "BI & operational dashboards"],
    stack: ["Kafka", "PostgreSQL", "TimescaleDB", "Grafana"],
    span: "lg:col-span-2",
  },
  {
    id: "service-iot",
    title: "IoT Solutions",
    icon: Wifi,
    description: "Connected products and Industrial IoT: device connectivity, digital twins and live monitoring.",
    points: ["Device-to-cloud connectivity", "Industrial IoT & digital twins"],
    stack: ["MQTT", "AWS IoT Core", "OPC-UA", "Modbus"],
    span: "lg:col-span-2",
  },
  {
    id: "service-embedded",
    title: "Embedded & Firmware",
    icon: Cpu,
    description: "Reliable RTOS and bare-metal firmware for edge devices, with secure over-the-air updates.",
    points: ["RTOS & low-power firmware", "Secure OTA & test automation"],
    stack: ["Zephyr RTOS", "FreeRTOS", "C / C++", "Rust"],
    span: "lg:col-span-2",
  },
];

const ENGAGEMENTS = [
  { icon: Briefcase, title: "Fixed-scope projects", body: "Clear milestones and a fixed budget for well-defined products." },
  { icon: Repeat, title: "Time & material", body: "Flexible capacity for evolving roadmaps, billed monthly." },
  { icon: UsersRound, title: "Dedicated teams", body: "Engineers who work only on your product, in your tools and time zone." },
];

export default function CoreServices() {
  const { openConsultation: onOpenConsultation, openTalent: onOpenTalentModal } = useModals();
  const flagships: (Flagship & { action: () => void })[] = [
    {
      id: "service-software",
      eyebrow: "Product engineering",
      title: "Custom Software Development",
      icon: CodeXml,
      tagline: "From idea to production: web platforms, SaaS products and APIs built to scale.",
      description:
        "Cross-functional pods handle discovery, UX, architecture, development, QA and launch, then stay on to support and evolve your product.",
      features: [
        "Web apps & SaaS platforms with React, Next.js and TypeScript",
        "Scalable backends, APIs and microservices in Python and Rust",
        "Client portals, admin systems and real-time dashboards",
        "Automated testing, CI/CD and security-first code reviews",
      ],
      stack: ["React", "Next.js", "TypeScript", "Python", "PostgreSQL", "Docker"],
      cta: "Start a project",
      variant: "dark",
      action: onOpenConsultation,
    },
    {
      id: "service-staffing",
      eyebrow: "Pre-vetted talent",
      title: "IT Staff Augmentation",
      icon: UsersRound,
      tagline: "Add senior engineers to your team in under 48 hours.",
      description:
        "Skip months of hiring. We match vetted developers, ML engineers and DevOps specialists to your stack, time zone and sprint rhythm.",
      features: [
        "Engineers across React/Next.js, Python, PyTorch, AWS/Azure, Rust and C/C++",
        "Profiles in under 48 hours, onboarded into your Slack, Jira and GitHub",
        "Individual engineers, fractional specialists or fully managed pods",
        "100% IP assignment, strict NDAs and a 2-week risk-free trial",
      ],
      stack: ["Full-stack", "Backend", "ML / AI", "DevOps", "Data", "Embedded"],
      cta: "Request engineer profiles",
      variant: "yellow",
      action: onOpenTalentModal,
    },
  ];

  const list = (
      <div>
        {/* Flagship services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {flagships.map((s) => {
            const Icon = s.icon;
            const yellow = s.variant === "yellow";
            return (
              <article
                key={s.id}
                id={s.id}
                className={`scroll-mt-28 relative rounded-3xl p-7 sm:p-9 flex flex-col overflow-hidden ${
                  yellow
                    ? "bg-[#F4D03F] text-[#141B08] shadow-[0_24px_60px_-28px_rgba(212,172,13,0.9)]"
                    : "olive-carbon-panel text-[#F3ECE3]"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      yellow ? "bg-[#141B08]" : "bg-[#F4D03F]"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${yellow ? "text-[#F4D03F]" : "text-[#141B08]"}`} />
                  </div>
                  <span
                    className={`text-[11px] uppercase rounded-full px-3 py-1 ${
                      yellow ? "bg-[#141B08]/10 text-[#141B08]" : "bg-white/10 text-[#E6DED3]"
                    }`}
                  >
                    {s.eyebrow}
                  </span>
                </div>

                <h3 className={`text-2xl sm:text-3xl font-bold font-syne mb-3 ${yellow ? "text-[#141B08]" : "text-white"}`}>
                  {s.title}
                </h3>
                <p className={`text-base font-medium mb-2 ${yellow ? "text-[#141B08]" : "text-[#F4D03F]"}`}>{s.tagline}</p>
                <p className={`text-sm leading-relaxed mb-6 ${yellow ? "text-[#3A3410]" : "text-[#E6DED3]/80"}`}>
                  {s.description}
                </p>

                <ul className="space-y-2.5 mb-7">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${yellow ? "text-[#141B08]" : "text-[#F4D03F]"}`} />
                      <span className={yellow ? "text-[#141B08]" : "text-[#F3ECE3]"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-8">
                  {s.stack.map((t) => (
                    <span
                      key={t}
                      className={`text-xs rounded-full px-2.5 py-1 ${
                        yellow ? "bg-[#141B08]/10 text-[#141B08]" : "bg-white/[0.06] border border-white/10 text-[#E6DED3]"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={s.action}
                  className={`mt-auto w-full sm:w-auto self-start px-6 py-3.5 rounded-full text-sm flex items-center justify-center gap-2 cursor-pointer group ${
                    yellow ? "key-tactical-olive" : "key-signal-yellow"
                  }`}
                >
                  <span>{s.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </article>
            );
          })}
        </div>

        {/* Specialist services — bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {SPECIALTIES.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.id}
                id={s.id}
                className={`scroll-mt-28 sand-recessed-channel rounded-3xl p-6 sm:p-7 flex flex-col ${s.span}`}
              >
                <div className="w-11 h-11 rounded-xl bg-[#1A2309] flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-[#F4D03F]" />
                </div>
                <h3 className="text-xl font-bold font-syne text-[#141B08] mb-2">{s.title}</h3>
                <p className="text-sm text-[#4A5634] leading-relaxed mb-4">{s.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-[13px] text-[#2A3517]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6B8E23] shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#141B08]/10">
                  <div className="flex flex-wrap gap-1.5">
                    {s.stack.map((t) => (
                      <span key={t} className="text-[11px] rounded-full px-2 py-0.5 bg-[#141B08]/[0.06] text-[#2A3517]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={onOpenConsultation}
                    aria-label={`Discuss ${s.title}`}
                    className="w-9 h-9 rounded-full bg-[#141B08] text-[#F4D03F] flex items-center justify-center hover:bg-[#2C3A14] transition-colors cursor-pointer shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Engagement models */}
        <div className="mt-6 rounded-3xl border border-[#141B08]/10 bg-[#F3ECE3] text-[#141B08] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
          <div>
            <div className="text-[11px] uppercase text-[#4A5634] mb-1">How we work with you</div>
            <h3 className="text-xl font-bold font-syne text-[#141B08]">Pick the model that fits.</h3>
          </div>
          {ENGAGEMENTS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#6B8E23]/12 flex items-center justify-center shrink-0">
                <Icon className="w-4.5 h-4.5 text-[#4F6B1A]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#141B08]">{title}</div>
                <div className="text-[13px] text-[#4A5634] leading-snug">{body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );

  return (
    <GallerySection
      id="services"
      eyebrow={
        <>
          <Layers className="w-3.5 h-3.5" />
          <span className="font-medium">What we do</span>
        </>
      }
      heading={
        <>
          Software engineering and expert talent, <span className="text-[#EDC9AF]">under one roof.</span>
        </>
      }
      intro="Hand us a whole product to build, or add senior engineers to the team you already have. Either way you get the same engineering standards, transparent communication and full ownership of your code."
      items={GALLERY_ITEMS}
      list={list}
      openLabel="See the details"
      theme="teal"
    />
  );
}

/* Gallery panels: the same services as the hero, flagships first. */
const GALLERY_ORDER = ["software", "staffing", "ai", "cloud", "data", "iot", "embedded"];
const GALLERY_ITEMS: GalleryItem[] = GALLERY_ORDER.map((id, i) => {
  const s = HERO_SERVICES.find((x) => x.id === id)!;
  return {
    anchor: s.href.replace("#", ""),
    title: s.title,
    subtitle: s.subtitle,
    makeDraw: (family: string, mono: string) => drawServicePoster(s, i, family, mono),
  };
});
