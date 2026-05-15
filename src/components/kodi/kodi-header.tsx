import Image from "next/image";
import { LanguageSwitcher } from "@/components/language-switcher";

export function KodiHeader() {
  return (
    <header className="sticky top-0 z-30 bg-[var(--kodi-teal-strong)]">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-3 lg:px-8">
        <Image
          src="/assets/kodi/kodi.svg"
          alt="Kodi"
          width={1206}
          height={391}
          priority
          className="h-7 w-auto sm:h-8"
        />
        <div className="[&_button]:border-white/50 [&_button]:text-white [&_span]:!text-white [&_.font-semibold]:!text-white">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
