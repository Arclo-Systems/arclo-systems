import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { languageAlternates, localizedUrl } from "@/lib/site";

/**
 * `lastModified` va declarado, NO `new Date()`.
 *
 * Con la fecha del build las ocho URLs dicen "hoy" en cada despliegue aunque
 * no se haya tocado una coma: la señal deja de distinguir lo que cambió de lo
 * que no, y Google deja de mirarla. Al editar de verdad una página, mover su
 * fecha acá.
 */
const routes = [
  { path: "/", lastModified: "2026-09-20", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/terms", lastModified: "2026-09-20", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/privacy", lastModified: "2026-09-20", changeFrequency: "yearly" as const, priority: 0.3 },
  {
    path: "/partners/registro",
    lastModified: "2026-05-15",
    changeFrequency: "monthly" as const,
    priority: 0.6,
  },
];

/** Medianoche en Costa Rica, que es donde se publica. */
const enCostaRica = (fecha: string) => new Date(`${fecha}T00:00:00-06:00`);

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, route.path),
      lastModified: enCostaRica(route.lastModified),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages: languageAlternates(route.path) },
    })),
  );
}
