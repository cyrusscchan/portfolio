"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";
import { switchTheme } from "@/lib/theme";

// Print: open every project so the résumé shows full details, then restore.
// Keyboard: `t` toggles the theme (ignored while typing or with modifiers).
// Reveal: sections below the fold on load fade up the first time they scroll into view.
// Projects: rows grow and shrink to their new height instead of snapping open/shut.
export function PageEffects() {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const running = new WeakMap<HTMLDetailsElement, Animation>();
    const onClick = (event: MouseEvent) => {
      const summary = (event.target as HTMLElement | null)?.closest(".pf-project > summary");
      if (!summary || reduced.matches) return;
      event.preventDefault();
      const details = summary.parentElement as HTMLDetailsElement;
      // Measure before cancelling so a re-click mid-animation starts from where the row is now.
      const from = details.getBoundingClientRect().height;
      const opening = !details.open || details.dataset.anim === "closing";
      running.get(details)?.cancel();
      details.open = true;
      const top = details.getBoundingClientRect().top;
      const to = opening
        ? details.getBoundingClientRect().height
        : summary.getBoundingClientRect().bottom - top;
      details.dataset.anim = opening ? "opening" : "closing";
      details.style.overflow = "hidden";
      const animation = details.animate(
        { height: [`${from}px`, `${to}px`] },
        { duration: 260, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
      );
      running.set(details, animation);
      animation.onfinish = () => {
        if (!opening) details.open = false;
        details.style.overflow = "";
        delete details.dataset.anim;
        running.delete(details);
      };
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

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
      switchTheme(setTheme, resolvedTheme === "dark" ? "light" : "dark");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pending = Array.from(document.querySelectorAll<HTMLElement>("main section[id]")).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "done";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    pending.forEach((el) => {
      el.dataset.reveal = "pending";
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
