/** Services shown in the hero (3D orbit + HTML chips). Edit here to change both. */

export interface HeroService {
  id: string;
  title: string;
  subtitle: string;
  /** Section the card links to. */
  href: string;
  /** 24×24 stroke icon as an SVG path (lucide-style). */
  icon: string;
  highlight?: boolean;
}

export const HERO_SERVICES: HeroService[] = [
  {
    id: "software",
    title: "Custom Software",
    subtitle: "Web apps · SaaS · APIs",
    href: "#service-software",
    icon: "M16 18l6-6-6-6 M8 6l-6 6 6 6",
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    subtitle: "Vision · Predictive · MLOps",
    href: "#service-ai",
    icon: "M12 3l1.9 5.8L20 10.7l-6.1 1.9L12 18.5l-1.9-5.9L4 10.7l6.1-1.9z M19 3v4 M21 5h-4",
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    subtitle: "AWS · Azure · Serverless",
    href: "#service-cloud",
    icon: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z",
  },
  {
    id: "data",
    title: "Data & Analytics",
    subtitle: "Pipelines · Dashboards",
    href: "#service-data",
    icon: "M3 3v18h18 M7 16v-5 M12 16V8 M17 16v-3",
  },
  {
    id: "iot",
    title: "IoT Solutions",
    subtitle: "Connected products · IIoT",
    href: "#service-iot",
    icon: "M5 12.55a11 11 0 0 1 14.08 0 M1.42 9a16 16 0 0 1 21.16 0 M8.53 16.11a6 6 0 0 1 6.95 0 M12 20h.01",
  },
  {
    id: "embedded",
    title: "Embedded & Firmware",
    subtitle: "RTOS · Edge devices",
    href: "#service-embedded",
    icon: "M9 2v2 M15 2v2 M9 20v2 M15 20v2 M2 9h2 M2 15h2 M20 9h2 M20 15h2 M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M9 9h6v6H9z",
  },
  {
    id: "staffing",
    title: "IT Staff Augmentation",
    subtitle: "Vetted engineers in < 48 hrs",
    href: "#service-staffing",
    icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
    highlight: true,
  },
];

export const HERO_STACKS = ["React", "Next.js", "Python", "PyTorch", "AWS", "Azure", "Rust", "C / C++"];
