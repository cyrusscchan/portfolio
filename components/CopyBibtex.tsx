"use client";

import { useEffect, useState } from "react";

export function CopyBibtex({ bibtex }: { bibtex: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
    } catch {
      // Clipboard unavailable (insecure context or denied); leave the label unchanged.
    }
  };

  return (
    <>
      <button type="button" className="pf-linkbtn" onClick={copy}>
        {copied ? "Copied" : "Copy BibTeX"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "BibTeX copied to clipboard" : ""}
      </span>
    </>
  );
}
