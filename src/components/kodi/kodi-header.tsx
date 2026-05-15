import Image from "next/image";
import { LanguageSwitcher } from "@/components/language-switcher";

export function KodiHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--kodi-border)] bg-[var(--kodi-surface)]">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between px-5 py-3 sm:py-4 lg:px-8">
        <Image
          src="/assets/kodi/kodi.svg"
          alt="Kodi"
          width={1206}
          height={391}
          priority
          className="h-7 w-auto sm:h-8"
        />
        <div className="[&_.font-semibold]:!text-[var(--kodi-teal)] [&_button:hover]:border-[var(--kodi-teal)] [&_button]:border-[var(--kodi-border)] [&_button]:text-[var(--kodi-ink-soft)]">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
