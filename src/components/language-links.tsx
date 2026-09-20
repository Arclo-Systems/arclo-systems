"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const NOMBRE: Record<string, string> = { es: "Español", en: "English" };

/** El idioma dentro del panel del menú: texto plano, como el resto de la lista. */
export function LanguageLinks() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {routing.locales.map((codigo) => {
        const activo = codigo === locale;
        return (
          <button
            key={codigo}
            type="button"
            lang={codigo}
            aria-current={activo ? "true" : undefined}
            onClick={() => router.replace(pathname, { locale: codigo })}
            className={`w-fit cursor-pointer text-sm font-medium transition-colors duration-200 ${
              activo
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {NOMBRE[codigo] ?? codigo.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
