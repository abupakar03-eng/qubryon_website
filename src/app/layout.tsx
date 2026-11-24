import type { Metadata, Viewport } from "next";
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

// Public site URL, used for absolute OG/Twitter image links. Set NEXT_PUBLIC_SITE_URL when the domain is live.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://qubryon.com";

export const viewport: Viewport = {
  themeColor: "#0A3A40",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Qubryon Technologies | Software Development, AI & IT Staff Augmentation",
  description:
    "Qubryon Technologies is a global software engineering partner. We build custom software, AI, cloud, data and IoT products and embed pre-vetted developers into your team in under 48 hours, for clients across North America, Europe, the Middle East and Asia Pacific.",
  keywords: [
    "Qubryon Technologies",
    "Custom Software Development",
    "IT Staff Augmentation",
    "Hire Developers India",
    "Dedicated Development Team",
    "AI and Machine Learning Services",
    "Cloud and DevOps Services",
    "Data Engineering",
    "IoT Software Development",
    "React Next.js Developers",
    "Python Developers",
    "Offshore Software Development",
  ],
  authors: [{ name: "Qubryon Technologies Private Limited" }],
  openGraph: {
    title: "Qubryon Technologies — Software that ships. Engineers who stay.",
    description:
      "Custom software, AI, cloud and IoT products, plus pre-vetted engineers in your team in under 48 hours, with time-zone overlap for US, EU, GCC and APAC teams.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["en_GB", "en_IN", "en_AU"],
    siteName: "Qubryon Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qubryon Technologies — Software that ships. Engineers who stay.",
    description: "Custom software, AI, cloud and IoT products, plus pre-vetted engineers in under 48 hours.",
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
