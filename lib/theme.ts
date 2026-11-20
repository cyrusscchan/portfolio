import { flushSync } from "react-dom";

// Run a state change inside a view transition where supported (and motion is allowed).
// `kind` is exposed as <html data-vt> for the duration so CSS can pick the animation.
export function withViewTransition(update: () => void, kind?: string) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduced) {
    update();
    return;
  }
  const root = document.documentElement;
  if (kind) root.dataset.vt = kind;
  const transition = document.startViewTransition(() => flushSync(update));
  transition.finished.finally(() => {
    if (root.dataset.vt === kind) delete root.dataset.vt;
  });
}

// Crossfade the theme swap.
export function switchTheme(setTheme: (theme: string) => void, next: "light" | "dark") {
  withViewTransition(() => setTheme(next));
}
