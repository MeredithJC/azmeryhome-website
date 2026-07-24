import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

// Generated default social-share image (spec §30, §40). Uses the official
// AZMERYHOME logo (reversed variant) on a charcoal brand background.
export const runtime = "nodejs";
export const alt =
  "AZMERYHOME LLC — Houston residential real estate investment company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const logo = readFileSync(
    join(process.cwd(), "public/brand/azmeryhome-logo-light.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#181d21",
          fontFamily: "sans-serif",
          padding: "64px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={620} height={308} alt="AZMERYHOME LLC" />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "36px",
          }}
        >
          <div style={{ color: "#ffffff", fontSize: 38, fontWeight: 600 }}>
            Investing in Houston. Improving Homes.
          </div>
          <div style={{ color: "#c79532", fontSize: 38, fontWeight: 700 }}>
            Creating Long-Term Value.
          </div>
        </div>

        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 24, marginTop: "28px" }}>
          Fix &amp; Flip · Buy &amp; Hold · Rentals · Greater Houston, Texas
        </div>
      </div>
    ),
    { ...size },
  );
}
