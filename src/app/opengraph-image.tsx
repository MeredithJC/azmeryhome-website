import { ImageResponse } from "next/og";

// Generated default social-share image (spec §15). Charcoal + gold brand.
export const alt =
  "AZMERYHOME — Houston residential real estate investment company";
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
          background: "#181d21",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
            <path
              d="M6 24 L24 8 L42 24"
              stroke="#b78423"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 22 V40 H37 V22"
              stroke="#b78423"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ display: "flex", color: "#ffffff", fontSize: 34, fontWeight: 700, letterSpacing: 1 }}>
            <span>AZMERY</span>
            <span style={{ color: "#b78423" }}>HOME</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#ffffff", fontSize: 60, fontWeight: 700, lineHeight: 1.1 }}>
            Investing in Houston.
          </div>
          <div style={{ color: "#ffffff", fontSize: 60, fontWeight: 700, lineHeight: 1.1 }}>
            Improving Homes.
          </div>
          <div style={{ color: "#b78423", fontSize: 60, fontWeight: 700, lineHeight: 1.1 }}>
            Creating Long-Term Value.
          </div>
        </div>

        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 26 }}>
          Fix &amp; Flip · Buy &amp; Hold · Rentals · Greater Houston, Texas
        </div>
      </div>
    ),
    { ...size },
  );
}
