"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";

/**
 * Owns the two site-wide modals so the page itself can stay a server component.
 * The modal code is lazy-loaded the first time one is opened.
 */

const InteractiveConsultationModal = dynamic(() => import("./InteractiveConsultationModal"), { ssr: false });
const TalentRequestModal = dynamic(() => import("./TalentRequestModal"), { ssr: false });

interface ModalApi {
  openConsultation: () => void;
  openTalent: () => void;
}

const ModalContext = createContext<ModalApi | null>(null);

export function useModals(): ModalApi {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModals must be used inside <ModalProvider>");
  return ctx;
}

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [talentOpen, setTalentOpen] = useState(false);
  // only mount a modal's code once it has been requested
  const [loaded, setLoaded] = useState({ consultation: false, talent: false });

  const openConsultation = useCallback(() => {
    setLoaded((l) => (l.consultation ? l : { ...l, consultation: true }));
    setConsultationOpen(true);
  }, []);
  const openTalent = useCallback(() => {
    setLoaded((l) => (l.talent ? l : { ...l, talent: true }));
    setTalentOpen(true);
  }, []);
  const closeConsultation = useCallback(() => setConsultationOpen(false), []);
  const closeTalent = useCallback(() => setTalentOpen(false), []);

  const api = useMemo(() => ({ openConsultation, openTalent }), [openConsultation, openTalent]);

  return (
    <ModalContext.Provider value={api}>
      {children}
      {loaded.consultation && <InteractiveConsultationModal isOpen={consultationOpen} onClose={closeConsultation} />}
      {loaded.talent && <TalentRequestModal isOpen={talentOpen} onClose={closeTalent} />}
    </ModalContext.Provider>
  );
}
