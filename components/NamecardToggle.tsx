"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { withViewTransition } from "@/lib/theme";

const HASH = "#card";

// Namecard view state: sets <html data-view="card"> and CSS does the rest (see .pf-namecard).
// `#card` deep-links straight into it, Esc exits, and the screen is kept awake while it's up.
// Toggling animates through a view transition (see the pf-vt-* keyframes); the deep link doesn't.
export function useNamecard() {
  // null until the hash has been read, so mounting never rewrites the URL.
  const [active, setActive] = useState<boolean | null>(null);

  const setView = useCallback((next: boolean) => {
    withViewTransition(() => setActive(next), next ? "card-in" : "card-out");
  }, []);

  useEffect(() => {
    setActive(window.location.hash === HASH);
    const onHash = () => setView(window.location.hash === HASH);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [setView]);

  // Layout effect: flushSync runs it inside the transition, before the new state is captured.
  // Leaving restores the scroll position the page had when the card opened.
  useLayoutEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    const scrollY = window.scrollY;
    root.dataset.view = "card";
    window.scrollTo({ top: 0, behavior: "instant" });
    return () => {
      delete root.dataset.view;
      window.scrollTo({ top: scrollY, behavior: "instant" });
    };
  }, [active]);

  useEffect(() => {
    if (active === null) return;
    // Keep the URL in step so the card can be bookmarked or reopened.
    if (active !== (window.location.hash === HASH)) {
      history.replaceState(null, "", active ? HASH : window.location.pathname + window.location.search);
    }
    if (!active) return;

    let lock: WakeLockSentinel | null = null;
    let released = false;
    const acquire = () => {
      if (document.visibilityState !== "visible") return;
      navigator.wakeLock
        ?.request("screen")
        .then((sentinel) => {
          if (released) sentinel.release();
          else lock = sentinel;
        })
        .catch(() => {});
    };
    // The browser drops the lock when the tab is hidden; take it again on return.
    const onVisible = () => {
      if (!lock || lock.released) acquire();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setView(false);
    };
    acquire();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("keydown", onKey);
    return () => {
      released = true;
      lock?.release();
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("keydown", onKey);
    };
  }, [active, setView]);

  const toggle = useCallback(() => setView(!active), [active, setView]);
  return { active: active === true, toggle };
}

export function NamecardToggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className="pf-toggle pf-card-toggle no-print"
      aria-pressed={active}
      aria-label={active ? "Exit namecard view" : "Show namecard view"}
      onClick={onToggle}
    >
      <svg viewBox="0 0 14 14" aria-hidden="true" className="pf-icon" style={{ width: 14, height: 14 }}>
        <path d="M1.5 1.5h4v4h-4zM8.5 1.5h4v4h-4zM1.5 8.5h4v4h-4zM8.5 8.5h1.5v1.5M12.5 8.5v4h-4" />
      </svg>
      <span>{active ? "Exit" : "Card"}</span>
    </button>
  );
}
