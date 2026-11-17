import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const dynamic = "force-static";
export const alt = `${profile.name} ${profile.surname}`;
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
          justifyContent: "center",
          padding: 96,
          background: "#ecebe6",
          color: "#1a1a18",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: "0.08em", color: "#55544f" }}>PORTFOLIO</div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 88, fontWeight: 600, marginTop: 24 }}>
          {profile.name}
          <div style={{ width: 52, height: 92, background: "#1a1a18", marginLeft: 12 }} />
        </div>
        <div style={{ fontSize: 32, lineHeight: 1.4, marginTop: 32, maxWidth: 960 }}>{profile.tagline}</div>
        <div style={{ borderTop: "2px dashed #c4c2bb", marginTop: 48, width: "100%" }} />
      </div>
    ),
    size,
  );
}
