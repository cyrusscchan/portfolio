export function Footer({ name }: { name: string }) {
  return (
    <footer className="no-print border-t border-dashed border-rule">
      <div className="mx-auto flex max-w-wrap flex-wrap justify-between gap-4 px-6 pb-6 pt-4 text-small text-ink-muted md:px-12">
        <span>
          © {new Date().getFullYear()} {name}
        </span>
        <span>Print this page for a clean résumé</span>
      </div>
    </footer>
  );
}
