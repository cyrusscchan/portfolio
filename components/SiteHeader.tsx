"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export type NavItem = { id: string; label: string };

export function SiteHeader({ name, items }: { name: string; items: NavItem[] }) {
  const [current, setCurrent] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll-spy: the last section whose top has passed the upper third of the viewport.
  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      let active: string | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) active = section.id;
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        active = sections.at(-1)?.id ?? active;
      }
      setCurrent(active);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  const links = items.map((item) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      aria-current={current === item.id ? "true" : undefined}
      onClick={() => setMenuOpen(false)}
    >
      {item.label}
    </a>
  ));

  return (
    <header className="site-header sticky top-0 z-10 border-b border-dashed border-rule bg-bg">
      <div className="mx-auto flex max-w-wrap items-center justify-between gap-4 px-6 py-4 md:px-12">
        <a href="#top" className="font-semibold no-underline">
          {name}
        </a>
        <nav aria-label="Sections" className="pf-nav no-print hidden items-center gap-5 md:flex">
          {links}
          <ThemeToggle />
        </nav>
        <div className="no-print flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="pf-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Sections"
          className="pf-nav no-print flex flex-col gap-4 border-t border-dashed border-rule px-6 py-4 md:hidden"
        >
          {links}
        </nav>
      )}
    </header>
  );
}
