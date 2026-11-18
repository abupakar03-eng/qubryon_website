import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Qubryon Technologies | IoT & AI Integration & IT Staff Augmentation",
  description:
    "Qubryon Technologies Private Limited (CIN: U62013TN2026PTC199725) is an enterprise IoT and AI integration software service provider offering custom IoT applications, AI predictive analytics, and top-tier IT staff augmentation based in Tiruchirappalli, Tamil Nadu, India.",
  keywords: [
    "Qubryon Technologies",
    "IoT Software Service Provider",
    "AI Integration",
    "IT Staff Augmentation",
    "Embedded C Developers",
    "PyTorch Engineers",
    "AWS IoT Core",
    "Zephyr RTOS",
    "Tiruchirappalli Tech Company",
    "Industrial IoT 4.0",
    "Predictive Maintenance",
  ],
  authors: [{ name: "Qubryon Technologies Private Limited" }],
  openGraph: {
    title: "Qubryon Technologies - Empowering the Physical World with AI & IoT Solutions",
    description:
      "Enterprise custom IoT development, edge AI predictive analytics, and pre-vetted IT staff augmentation deployed in under 48 hours.",
    type: "website",
    locale: "en_US",
    siteName: "Qubryon Technologies",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#030712] text-slate-100 selection:bg-cyan-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
