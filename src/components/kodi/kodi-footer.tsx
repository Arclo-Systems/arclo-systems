export function KodiFooter() {
  return (
    <footer className="border-t border-[var(--kodi-border)] px-5 py-6 text-center text-xs text-[var(--kodi-ink-soft)]">
      © {new Date().getFullYear()} Kodi
    </footer>
  );
}
