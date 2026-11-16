"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

// Print: open every project so the résumé shows full details, then restore.
// Keyboard: `t` toggles the theme (ignored while typing or with modifiers).
export function PageEffects() {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    let reopened: HTMLDetailsElement[] = [];
    const beforePrint = () => {
      reopened = Array.from(document.querySelectorAll<HTMLDetailsElement>("details:not([open])"));
      reopened.forEach((el) => (el.open = true));
    };
    const afterPrint = () => {
      reopened.forEach((el) => (el.open = false));
      reopened = [];
    };
    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);
    return () => {
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "t" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable]")) return;
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [resolvedTheme, setTheme]);

  return null;
}
