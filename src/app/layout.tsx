import type { Metadata } from "next";
import { Syne, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Qubryon Technologies | Software Development, AI & IT Staff Augmentation",
  description:
    "Qubryon Technologies is a global IoT and AI engineering partner delivering custom IoT applications, edge AI predictive analytics and pre-vetted IT staff augmentation to clients across North America, Europe, the Middle East and Asia Pacific from its delivery center in India.",
  keywords: [
    "Qubryon Technologies",
    "IoT Software Development Company",
    "AI Integration Services",
    "Offshore IoT Development",
    "IT Staff Augmentation India",
    "Dedicated Embedded Engineers",
    "Embedded C Developers",
    "PyTorch Engineers",
    "AWS IoT Core",
    "Zephyr RTOS",
    "Industrial IoT 4.0",
    "Predictive Maintenance",
    "Nearshore Offshore Engineering USA UK Europe",
  ],
  authors: [{ name: "Qubryon Technologies Private Limited" }],
  openGraph: {
    title: "Qubryon Technologies - Empowering the Physical World with AI & IoT Solutions",
    description:
      "Global IoT & AI engineering partner: custom IoT development, edge AI predictive analytics and pre-vetted engineers deployed in under 48 hours, with time-zone overlap for US, EU, GCC and APAC teams.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["en_GB", "en_IN", "en_AU"],
    siteName: "Qubryon Technologies",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Qubryon Technologies Private Limited",
  email: "contact@qubryon.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tiruchirappalli",
    addressRegion: "Tamil Nadu",
    postalCode: "620017",
    addressCountry: "IN",
  },
  areaServed: ["US", "CA", "GB", "DE", "FR", "NL", "AE", "SA", "SG", "AU", "NZ", "IN"],
  knowsAbout: ["Internet of Things", "Edge AI", "Predictive Maintenance", "Embedded Systems", "IT Staff Augmentation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A3A40] text-[#1E260F] selection:bg-[#F4D03F] selection:text-[#1E260F] font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
