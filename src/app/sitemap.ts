import type { MetadataRoute } from "next";

const BASE_URL = "https://arclosystems.com";

const routes = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  {
    path: "/partners/registro",
    priority: 0.6,
    changeFrequency: "monthly" as const,
  },
];

const locales = ["es", "en"] as const;
const DEFAULT_LOCALE = "es";

const localizedUrl = (locale: string, path: string) =>
  `${BASE_URL}/${locale}${path === "/" ? "" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: localizedUrl(locale, route.path),
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((l) => [l, localizedUrl(l, route.path)]),
          ),
          "x-default": localizedUrl(DEFAULT_LOCALE, route.path),
        },
      },
    })),
  );
}
