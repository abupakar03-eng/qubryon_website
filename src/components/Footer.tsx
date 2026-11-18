"use client";

import React from "react";

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenTalentModal: () => void;
}

type FooterLink = { label: string; href?: string; onClick?: () => void; external?: boolean };

export default function Footer({ onOpenConsultation, onOpenTalentModal }: FooterProps) {
  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: "Services",
      links: [
        { label: "Custom Software", href: "#service-software" },
        { label: "AI & Machine Learning", href: "#service-ai" },
        { label: "Cloud & DevOps", href: "#service-cloud" },
        { label: "Data & Analytics", href: "#service-data" },
        { label: "IoT & Embedded", href: "#service-iot" },
      ],
    },
    {
      title: "Hire talent",
      links: [
        { label: "Hire developers", onClick: onOpenTalentModal },
        { label: "How it works", href: "#talent" },
        { label: "Tech stacks", href: "#tech-stacks" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Case studies", href: "#case-studies" },
        { label: "Global delivery", href: "#global" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Follow",
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com", external: true },
        { label: "X", href: "https://x.com", external: true },
        { label: "GitHub", href: "https://github.com", external: true },
      ],
    },
  ];

  return (
    <footer className="texture-code relative text-[#F3ECE3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        {/* Closing statement */}
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.08] max-w-3xl font-sans">
          Have a product worth building? We&apos;ll build it like it&apos;s our own.
        </h2>
        <p className="mt-6 text-lg sm:text-xl text-[#F3ECE3]/80">
          Write to{" "}
          <a href="mailto:contact@qubryon.com" className="underline underline-offset-[6px] decoration-[#F3ECE3]/50 hover:text-[#F4D03F] hover:decoration-[#F4D03F]">
            contact@qubryon.com
          </a>{" "}
          or{" "}
          <button
            onClick={onOpenConsultation}
            className="underline underline-offset-[6px] decoration-[#F3ECE3]/50 hover:text-[#F4D03F] hover:decoration-[#F4D03F] cursor-pointer"
          >
            book a 30-minute call
          </button>
          .
        </p>

        {/* Link columns */}
        <nav aria-label="Footer" className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10">
          {columns.map((col) => (
            <div key={col.title}>
              <div className="text-[14px] text-[#F3ECE3]/55">{col.title}</div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.onClick ? (
                      <button onClick={l.onClick} className="text-[17px] hover:text-[#F4D03F] transition-colors cursor-pointer text-left">
                        {l.label}
                      </button>
                    ) : (
                      <a
                        href={l.href}
                        {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                        className="text-[17px] hover:text-[#F4D03F] transition-colors"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Embossed wordmark */}
      <div className="mt-16 select-none" aria-hidden="true">
        <div className="wordmark-emboss font-syne font-extrabold uppercase text-center leading-[0.85] tracking-[-0.02em] text-[11vw] whitespace-nowrap">
          Qubryon
        </div>
      </div>

      {/* Legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-[13px] text-[#F3ECE3]/50 border-t border-[#F3ECE3]/10">
        <div>© 2026 Qubryon Technologies Private Limited · Tiruchirappalli, India</div>
        <div className="flex gap-5">
          <span>Privacy policy</span>
          <span>Terms of service</span>
        </div>
      </div>
    </footer>
  );
}
