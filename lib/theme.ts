import { flushSync } from "react-dom";

// Crossfade the theme swap with a view transition where supported (and motion is allowed).
export function switchTheme(setTheme: (theme: string) => void, next: "light" | "dark") {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduced) {
    setTheme(next);
    return;
  }
  document.startViewTransition(() => flushSync(() => setTheme(next)));
}
