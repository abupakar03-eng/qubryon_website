import { ImageResponse } from "next/og";

// Social share preview (Open Graph / Twitter), generated at build time.
export const alt = "Qubryon Technologies — Software that ships. Engineers who stay.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(120% 90% at 80% 0%, #1F7D84 0%, #0A3A40 45%, #062529 100%)",
          color: "#F3ECE3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#F4D03F",
              color: "#072C31",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            Q
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, letterSpacing: 6 }}>QUBRYON</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 80, fontWeight: 300, lineHeight: 1.05, letterSpacing: -2 }}>
            Software that ships.
          </div>
          <div style={{ display: "flex", fontSize: 80, fontWeight: 300, lineHeight: 1.05, letterSpacing: -2, color: "#EDC9AF" }}>
            Engineers who stay.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "rgba(243,236,227,0.8)" }}>
          Custom software · AI · Cloud · IoT · IT staff augmentation
        </div>
      </div>
    ),
    { ...size },
  );
}
