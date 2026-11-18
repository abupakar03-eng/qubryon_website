"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

export interface GalleryItem {
  /** Optional in-page anchor (e.g. "service-ai"): links to it walk the gallery to this item. */
  anchor?: string;
  title: string;
  subtitle: string;
  aspect?: number;
  makeDraw: (family: string, mono: string) => Draw;
}

interface Props {
  id: string;
  eyebrow: React.ReactNode;
  heading: React.ReactNode;
  intro: string;
  items: GalleryItem[];
  /** Detailed list view (also the no-WebGL fallback). */
  list: React.ReactNode;
  /** "Look closer" action. Default: switch to the list and scroll to the item's anchor. */
  onOpen?: (index: number) => void;
  openLabel?: string;
  /** "teal" = dark Abyss Teal room, "sand" = light Desert Sand room */
  theme?: "teal" | "sand";
}

const VH_PER_ITEM = 45;

const THEME = {
  teal: {
    section: "bg-[#0A3A40] text-[#F3ECE3]",
    eyebrow: "border-[#EDC9AF]/25 bg-[#EDC9AF]/10 text-[#EDC9AF]",
    intro: "text-[#F3ECE3]/70",
    toggle: "border-white/15 bg-white/5",
    toggleOn: "bg-[#EDC9AF] text-[#072C31]",
    toggleOff: "text-[#F3ECE3]/70 hover:text-white",
    muted: "text-[#F3ECE3]/50",
    sub: "text-[#F3ECE3]/70",
    link: "text-[#F3ECE3] decoration-[#F3ECE3]/40 hover:decoration-[#F3ECE3]",
    arrow: "border-white/25 bg-white/5 text-[#F3ECE3] hover:bg-white/15",
  },
  sand: {
    section: "bg-[#EDC9AF] text-[#141B08]",
    eyebrow: "border-[#0A3A40]/20 bg-[#0A3A40]/[0.07] text-[#0A3A40]",
    intro: "text-[#3B2F25]",
    toggle: "border-[#141B08]/15 bg-white/40",
    toggleOn: "bg-[#0A3A40] text-[#F3ECE3]",
    toggleOff: "text-[#141B08]/70 hover:text-[#141B08]",
    muted: "text-[#141B08]/50",
    sub: "text-[#3B2F25]",
    link: "text-[#141B08] decoration-[#141B08]/40 hover:decoration-[#141B08]",
    arrow: "border-[#141B08]/25 bg-white/50 hover:bg-white",
  },
} as const;

export default function GallerySection({ id, eyebrow, heading, intro, items, list, onOpen, openLabel = "Look closer", theme = "sand" }: Props) {
  const t = THEME[theme];
  const [view, setView] = useState<"gallery" | "list">("gallery");
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const n = items.length;
  const showGallery = view === "gallery" && !failed;

  /** Scroll so the camera stands in front of item i. */
  const walkTo = useCallback(
    (i: number, smooth = true) => {
      const track = trackRef.current;
      if (!track) return;
      const top = track.getBoundingClientRect().top + window.scrollY;
      const travel = track.offsetHeight - window.innerHeight;
      const y = top + (n > 1 ? (i / (n - 1)) * travel : 0);
      window.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
    },
    [n],
  );

  const open = useCallback(
    (i: number) => {
      if (onOpen) return onOpen(i);
      const anchor = items[i]?.anchor;
      setView("list");
      if (anchor) requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" }));
    },
    [items, onOpen],
  );

  // latest callbacks for the long-lived 3D scene, without rebuilding it
  const openRef = useRef(open);
  const walkRef = useRef(walkTo);
  useEffect(() => {
    openRef.current = open;
    walkRef.current = walkTo;
  }, [open, walkTo]);

  /* 3D scene lifecycle */
  useEffect(() => {
    if (!showGallery) return;
    const el = mountRef.current;
    if (!el) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    const webgl = (() => {
      try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl2") || c.getContext("webgl"));
      } catch {
        return false;
      }
    })();
    if (!webgl) {
      setFailed(true);
      return;
    }

    Promise.all([import("./three/galleryScene"), document.fonts?.ready])
      .then(([{ createGalleryScene }]) => {
        if (disposed) return;
        const css = getComputedStyle(document.documentElement);
        const family = css.getPropertyValue("--font-geist").trim() || "system-ui, sans-serif";
        const mono = css.getPropertyValue("--font-geist-mono").trim() || "ui-monospace, monospace";
        const scene = createGalleryScene(
          el,
          items.map((it) => ({ draw: it.makeDraw(family, mono), aspect: it.aspect ?? 4 / 3, tagTitle: it.title, tagSub: it.subtitle })),
          {
            fontFamily: family,
            theme,
            onReady: () => setReady(true),
            onSelect: (i) => (i === indexRef.current ? openRef.current(i) : walkRef.current(i)),
          },
        );

        // page scroll drives the walk
        const onScroll = () => {
          const track = trackRef.current;
          if (!track) return;
          const r = track.getBoundingClientRect();
          const travel = track.offsetHeight - window.innerHeight;
          const progress = travel > 0 ? Math.min(Math.max(-r.top / travel, 0), 1) : 0;
          const p = progress * (n - 1);
          scene.setPosition(p);
          const i = Math.round(p);
          if (i !== indexRef.current) {
            indexRef.current = i;
            setIndex(i);
          }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        onScroll();

        // horizontal drag walks too (vertical touch scrolling stays native)
        let dragging = false;
        let lastX = 0;
        const down = (e: PointerEvent) => {
          dragging = true;
          lastX = e.clientX;
        };
        const move = (e: PointerEvent) => {
          if (!dragging) return;
          const dx = e.clientX - lastX;
          lastX = e.clientX;
          const track = trackRef.current;
          if (!track || n < 2) return;
          const perItem = (track.offsetHeight - window.innerHeight) / (n - 1);
          window.scrollBy(0, (-dx / 260) * perItem);
        };
        const up = () => (dragging = false);
        el.addEventListener("pointerdown", down);
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", up);

        cleanup = () => {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
          el.removeEventListener("pointerdown", down);
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", up);
          scene.dispose();
        };
      })
      .catch(() => setFailed(true));

    return () => {
      disposed = true;
      cleanup?.();
      setReady(false);
    };
  }, [showGallery, items, n, theme]);

  /* In-page links to an item's anchor walk the gallery there instead */
  useEffect(() => {
    if (!showGallery) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const i = items.findIndex((it) => it.anchor && `#${it.anchor}` === a.getAttribute("href"));
      if (i < 0) return;
      e.preventDefault();
      walkTo(i);
    };
    document.addEventListener("click", onClick, true);
    const hash = window.location.hash.slice(1);
    const initial = items.findIndex((it) => it.anchor === hash);
    if (initial >= 0) setTimeout(() => walkTo(initial, false), 300);
    return () => document.removeEventListener("click", onClick, true);
  }, [showGallery, items, walkTo]);

  const current = items[index];

  return (
    <section id={id} className={`relative ${t.section}`}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div className="max-w-3xl">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs mb-4 ${t.eyebrow}`}>
            {eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-syne leading-[1.08] mb-4">{heading}</h2>
          <p className={`text-base sm:text-lg leading-relaxed ${t.intro}`}>{intro}</p>
        </div>
        {!failed && (
          <div className={`inline-flex self-start lg:self-auto rounded-full border p-1 ${t.toggle}`} role="group" aria-label="View">
            {(["gallery", "list"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={`px-4 py-1.5 rounded-full text-[12px] uppercase cursor-pointer transition-colors ${
                  view === v ? t.toggleOn : t.toggleOff
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        )}
      </div>

      {showGallery ? (
        <div ref={trackRef} className="relative" style={{ height: `calc(${(n - 1) * VH_PER_ITEM}vh + 100svh)` }}>
          <div className="sticky top-0 h-[100svh] overflow-hidden">
            <div
              ref={mountRef}
              className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
              style={{ touchAction: "pan-y" }}
              role="img"
              aria-label={`3D gallery. Now viewing ${current?.title}: ${current?.subtitle}`}
            />

            <div className={`absolute top-28 right-4 sm:right-8 text-[12px] uppercase tabular-nums ${t.muted}`}>
              {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </div>

            {/* Caption + controls */}
            <div className="absolute inset-x-0 bottom-24 sm:bottom-10 flex flex-col items-center text-center px-4 pointer-events-none">
              <div className={`text-[11px] uppercase ${t.muted}`}>You are walking past</div>
              <div className="mt-1.5 text-2xl sm:text-3xl font-bold font-syne tracking-tight">{current?.title}</div>
              <div className={`text-sm mt-1 ${t.sub}`}>{current?.subtitle}</div>
              <button
                onClick={() => open(index)}
                className={`pointer-events-auto mt-3 text-[12px] uppercase underline underline-offset-4 inline-flex items-center gap-1 cursor-pointer ${t.link}`}
              >
                {openLabel} <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <div className="mt-5 flex items-center gap-3 pointer-events-auto">
                <button
                  onClick={() => walkTo(Math.max(index - 1, 0))}
                  disabled={index === 0}
                  aria-label="Previous"
                  className={`w-12 h-12 rounded-full border backdrop-blur flex items-center justify-center disabled:opacity-35 cursor-pointer ${t.arrow}`}
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => walkTo(Math.min(index + 1, n - 1))}
                  disabled={index === n - 1}
                  aria-label="Next"
                  className={`w-12 h-12 rounded-full border backdrop-blur flex items-center justify-center disabled:opacity-35 cursor-pointer ${t.arrow}`}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className={`mt-4 text-[11px] uppercase hidden sm:block ${t.muted}`}>
                Scroll or drag to walk round · Click a panel to look closer
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">{list}</div>
      )}
    </section>
  );
}
