"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CoreServices from "@/components/CoreServices";
import StaffAugmentation from "@/components/StaffAugmentation";
import Portfolio from "@/components/Portfolio";
import GlobalPresence from "@/components/GlobalPresence";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import InteractiveConsultationModal from "@/components/InteractiveConsultationModal";
import TalentRequestModal from "@/components/TalentRequestModal";
import FloatingActionDock from "@/components/FloatingActionDock";

export default function Home() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [talentModalOpen, setTalentModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F6F1EA] text-[#1C260D] flex flex-col relative overflow-x-clip font-sans">
      {/* Top Navbar */}
      <Navbar
        onOpenConsultation={() => setConsultationOpen(true)}
        onOpenTalentModal={() => setTalentModalOpen(true)}
      />

      {/* Section 1: Hero Section */}
      <Hero
        onOpenConsultation={() => setConsultationOpen(true)}
        onOpenTalentModal={() => setTalentModalOpen(true)}
      />

      {/* Section 2: Core Services Grid */}
      <CoreServices
        onOpenConsultation={() => setConsultationOpen(true)}
        onOpenTalentModal={() => setTalentModalOpen(true)}
      />

      {/* Section 3: Dedicated "Hire Tech Talent" (Staff Augmentation) */}
      <StaffAugmentation
        onSuccessSubmit={(data) => {
          console.log("Developer Inquiry Received:", data);
        }}
      />

      {/* Section 4: Portfolio / Case Studies */}
      <Portfolio />

      {/* Section 5: Global Delivery Network */}
      <GlobalPresence />

      {/* Section 5: Corporate Information & Contact Section */}
      <ContactSection
        onOpenConsultation={() => setConsultationOpen(true)}
        onOpenTalentModal={() => setTalentModalOpen(true)}
      />

      {/* Footer */}
      <Footer
        onOpenConsultation={() => setConsultationOpen(true)}
        onOpenTalentModal={() => setTalentModalOpen(true)}
      />

      {/* Modals & Floating Docks */}
      <InteractiveConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />

      <TalentRequestModal
        isOpen={talentModalOpen}
        onClose={() => setTalentModalOpen(false)}
      />

      <FloatingActionDock
        onOpenConsultation={() => setConsultationOpen(true)}
        onOpenTalentModal={() => setTalentModalOpen(true)}
      />
    </main>
  );
}
