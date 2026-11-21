/**
 * Page-wide "living glass" backdrop: a fixed layer behind every section with
 * softly drifting colour orbs (Abyss Teal family, aqua, Desert Sand, a hint of
 * Signal Yellow), a light vignette and fine grain. Translucent sections and
 * frosted-glass cards sit on top of it.
 */
export default function GlassBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* base */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#0E4A51_0%,#0A3A40_45%,#062529_100%)]" />

      {/* drifting orbs */}
      <div className="aurora-orb w-[46vw] h-[46vw] -top-[12vw] -left-[8vw] bg-[#1F7D84] opacity-45" />
      <div
        className="aurora-orb w-[38vw] h-[38vw] top-[22vh] -right-[10vw] bg-[#7FE6DA] opacity-[0.16]"
        style={{ animationDuration: "36s", animationDelay: "-8s" }}
      />
      <div
        className="aurora-orb w-[34vw] h-[34vw] bottom-[-10vw] left-[18vw] bg-[#EDC9AF] opacity-[0.14]"
        style={{ animationDuration: "42s", animationDelay: "-16s" }}
      />
      <div
        className="aurora-orb w-[22vw] h-[22vw] bottom-[18vh] right-[14vw] bg-[#F4D03F] opacity-[0.07]"
        style={{ animationDuration: "34s", animationDelay: "-22s" }}
      />

      {/* vignette + grain */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_50%,transparent_55%,rgba(2,18,21,0.55)_100%)]" />
      <div className="absolute inset-0 aurora-grain opacity-70" />
    </div>
  );
}
