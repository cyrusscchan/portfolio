"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = mounted && resolvedTheme === "dark";
  const next = dark ? "Light" : "Dark";

  return (
    <button
      type="button"
      className="pf-toggle no-print"
      aria-label={`Switch to ${next.toLowerCase()} theme`}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      <svg viewBox="0 0 14 14" aria-hidden="true" className="pf-icon" style={{ width: 14, height: 14 }}>
        <circle cx="7" cy="7" r="5" />
        <path d="M7 2a5 5 0 0 0 0 10z" fill="currentColor" />
      </svg>
      {/* Label is unknown until mounted; keep width stable. */}
      <span style={{ visibility: mounted ? "visible" : "hidden" }}>{next}</span>
    </button>
  );
}
