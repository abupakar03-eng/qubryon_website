import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GlassBackdrop from "@/components/GlassBackdrop";

export const metadata: Metadata = {
  title: "Privacy Policy | Qubryon Technologies",
  description: "How Qubryon Technologies handles the information you share through this website.",
};

/*
 * Plain-language privacy notice describing what this website actually does today:
 * form submissions are emailed to the team; there is no analytics or ad tracking.
 * Have it reviewed by a legal adviser before relying on it, and update it whenever
 * the site starts collecting anything new (analytics, cookies, CRM, newsletters).
 */

const UPDATED = "24 November 2026";

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Who we are",
    body: (
      <p>
        This website is run by Qubryon Technologies Private Limited, Tennur, Tiruchirappalli, Tamil Nadu 620017, India.
        For any privacy question, email{" "}
        <a href="mailto:contact@qubryon.com" className="underline underline-offset-4">
          contact@qubryon.com
        </a>
        .
      </p>
    ),
  },
  {
    title: "What we collect",
    body: (
      <>
        <p>We only collect what you choose to send us through the forms on this site:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>your name, work email and company;</li>
          <li>details about your project, the engineers you need, or a preferred call time;</li>
          <li>any other information you type into a message.</li>
        </ul>
        <p>
          This website does not use analytics, advertising or tracking cookies. Like any website, our hosting provider may keep
          standard server logs (such as IP address and browser type) for security and reliability.
        </p>
      </>
    ),
  },
  {
    title: "How we use it",
    body: (
      <p>
        When you submit a form, its contents are emailed to our team so we can reply to you, arrange calls, prepare proposals,
        or share engineer profiles you asked for. We don&apos;t use your details for unrelated marketing, and we never sell them.
      </p>
    ),
  },
  {
    title: "Who we share it with",
    body: (
      <p>
        Only the service providers that run this website and deliver our email, and only so they can provide that service.
        If we work together, we may share relevant project details with the engineers assigned to you, under NDA.
      </p>
    ),
  },
  {
    title: "How long we keep it",
    body: (
      <p>
        We keep inquiry emails for as long as we need them to respond and to keep normal business records. You can ask us to
        delete them at any time.
      </p>
    ),
  },
  {
    title: "Your choices and rights",
    body: (
      <p>
        You can ask to see, correct or delete the information you sent us, or ask us to stop contacting you. Email{" "}
        <a href="mailto:contact@qubryon.com" className="underline underline-offset-4">
          contact@qubryon.com
        </a>{" "}
        and we&apos;ll respond within a reasonable time, in line with the data protection laws that apply to you (such as
        India&apos;s DPDP Act or the GDPR).
      </p>
    ),
  },
  {
    title: "Changes to this notice",
    body: <p>If our practices change, we&apos;ll update this page and the date below.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <GlassBackdrop />
      <main id="main-content" className="relative min-h-screen text-[#F3ECE3] px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#F3ECE3]/80 hover:text-[#F4D03F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Qubryon
          </Link>

          <h1 className="mt-10 text-4xl sm:text-6xl font-light tracking-[-0.03em] leading-[1.05]">Privacy policy</h1>
          <p className="mt-4 text-[15px] text-[#F3ECE3]/75">Last updated {UPDATED}</p>

          <div className="mt-10 glass rounded-3xl p-6 sm:p-10 space-y-9 text-[16px] leading-relaxed text-[#F3ECE3]/90">
            {sections.map((s) => (
              <section key={s.title} className="space-y-3">
                <h2 className="text-xl font-semibold text-white">{s.title}</h2>
                {s.body}
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
