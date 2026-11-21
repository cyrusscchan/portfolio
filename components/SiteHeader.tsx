"use client";

import { useEffect, useState } from "react";
import { NamecardToggle, useNamecard } from "./NamecardToggle";
import { ThemeToggle } from "./ThemeToggle";

export type NavItem = { id: string; label: string };

export function SiteHeader({ label, items }: { label?: string; items: NavItem[] }) {
  const [current, setCurrent] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const card = useNamecard();

  const toggleCard = () => {
    setMenuOpen(false);
    card.toggle();
  };

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
      className="pf-card-hide"
    >
      {item.label}
    </a>
  ));

  return (
    <header className="site-header sticky top-0 z-10 border-b border-dashed border-rule bg-bg">
      <div className="mx-auto flex max-w-wrap items-center justify-between gap-4 px-6 py-4 md:px-12">
        {/* Both variants render; CSS shows the one matching data-theme so there's no flash before hydration. */}
        <a href="#top" aria-label={label} className="pf-brand pf-card-hide no-underline">
          {/* eslint-disable @next/next/no-img-element -- static export; next/image can't optimize SVGs here */}
          <img src="/brand-light.svg" alt="" width={28} height={28} className="pf-brand-light" />
          <img src="/brand-dark.svg" alt="" width={28} height={28} className="pf-brand-dark" />
          {/* eslint-enable @next/next/no-img-element */}
        </a>
        <nav aria-label="Sections" className="pf-nav no-print hidden items-center gap-5 md:flex">
          {links}
          <NamecardToggle active={card.active} onToggle={toggleCard} />
          <span className="pf-card-hide contents">
            <ThemeToggle />
          </span>
        </nav>
        <div className="no-print flex items-center gap-3 md:hidden">
          <NamecardToggle active={card.active} onToggle={toggleCard} />
          <span className="pf-card-hide contents">
            <ThemeToggle />
          </span>
          <button
            type="button"
            className="pf-toggle pf-card-hide"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {/* Always rendered so it can animate shut; hidden from focus/AT while closed (see .pf-menu). */}
      <div id="mobile-nav" className="pf-menu pf-card-hide no-print md:hidden" data-open={menuOpen}>
        <nav aria-label="Sections" className="pf-nav">
          <div className="flex flex-col gap-4 border-t border-dashed border-rule px-6 py-4">{links}</div>
        </nav>
      </div>
    </header>
  );
}
