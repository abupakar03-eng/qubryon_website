import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CoreServices from "@/components/CoreServices";
import StaffAugmentation from "@/components/StaffAugmentation";
import Portfolio from "@/components/Portfolio";
import GlobalPresence from "@/components/GlobalPresence";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingActionDock from "@/components/FloatingActionDock";
import GlassBackdrop from "@/components/GlassBackdrop";
import ModalProvider from "@/components/ModalProvider";

/**
 * Server component. Interactive sections are client components; site-wide
 * modal state lives in <ModalProvider>.
 */
export default function Home() {
  return (
    <ModalProvider>
      {/* Skip link for keyboard and screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-[#F4D03F] focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[#072C31] focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Living glass backdrop behind every section */}
      <GlassBackdrop />

      <Navbar />

      <main id="main-content" tabIndex={-1} className="min-h-screen text-[#1C260D] flex flex-col relative overflow-x-clip font-sans outline-none">
        <Hero />
        <CoreServices />
        <StaffAugmentation />
        <Portfolio />
        <GlobalPresence />
        <ContactSection />
      </main>

      <Footer />
      <FloatingActionDock />
    </ModalProvider>
  );
}
