import { routing } from "@/i18n/routing";

/**
 * El sitio se sirve en `www`: el apex redirige hacia acá.
 *
 * Toda URL que publicamos —sitemap, canonical, hreflang, OpenGraph— tiene que
 * ser la que responde 200, no la que rebota. Mientras esto dijo el apex,
 * Search Console marcó seis páginas como "Página con redirección" y dejó
 * indexadas dos de ocho: una canónica que redirige es una canónica que Google
 * descarta.
 */
export const SITE_URL = "https://www.arclosystems.com";

/** La URL de una ruta en un idioma: `/es`, `/en/privacy`. Sin barra final. */
export function localizedUrl(locale: string, path = "/"): string {
  return `${SITE_URL}/${locale}${path === "/" ? "" : path}`;
}

/**
 * Las `alternates.languages` de una ruta. `x-default` apunta al idioma base,
 * que es a donde manda el middleware a quien llega sin locale.
 */
export function languageAlternates(path = "/"): Record<string, string> {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, localizedUrl(locale, path)]),
    ),
    "x-default": localizedUrl(routing.defaultLocale, path),
  };
}
