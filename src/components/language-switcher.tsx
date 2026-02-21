"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function toggleLocale() {
    const next = locale === "es" ? "en" : "es";
    router.replace(pathname, { locale: next });
  }

  return (
    <button
      onClick={toggleLocale}
      aria-label={locale === "es" ? "Switch to English" : "Cambiar a Español"}
      className="flex h-9 items-center gap-1 rounded-full border border-neutral-200 px-3 text-sm font-medium text-neutral-500 transition-colors hover:border-neutral-300"
    >
      <span className={locale === "es" ? "font-semibold text-neutral-900" : ""}>
        ES
      </span>
      <span className="text-neutral-300">/</span>
      <span className={locale === "en" ? "font-semibold text-neutral-900" : ""}>
        EN
      </span>
    </button>
  );
}
