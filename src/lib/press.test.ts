import { describe, it, expect } from "vitest";
import { pressArticles, sortByNewest, type PressArticle } from "./press";

const article = (
  publishedAt: PressArticle["publishedAt"],
  url: PressArticle["url"],
): PressArticle => ({
  outlet: "Medio",
  title: "Titular",
  url,
  publishedAt,
  lang: "es",
});

describe("sortByNewest", () => {
  it("ordena de la más reciente a la más vieja aunque la entrada venga desordenada", () => {
    const desordenadas = [
      article("2026-09-30", "https://a.example/1"),
      article("2026-10-02", "https://a.example/2"),
      article("2025-12-31", "https://a.example/3"),
    ];

    const fechas = sortByNewest(desordenadas).map((a) => a.publishedAt);

    expect(fechas).toEqual(["2026-10-02", "2026-09-30", "2025-12-31"]);
  });

  it("no modifica el arreglo de entrada", () => {
    const entrada = [
      article("2026-09-30", "https://a.example/1"),
      article("2026-10-02", "https://a.example/2"),
    ];

    sortByNewest(entrada);

    expect(entrada.map((a) => a.publishedAt)).toEqual([
      "2026-09-30",
      "2026-10-02",
    ]);
  });
});

describe("pressArticles", () => {
  it("tiene al menos una nota", () => {
    expect(pressArticles.length).toBeGreaterThan(0);
  });

  it("viene ordenado de la más reciente a la más vieja", () => {
    const fechas = pressArticles.map((a) => a.publishedAt);
    const esperado = [...fechas].sort((a, b) => b.localeCompare(a));

    expect(fechas).toEqual(esperado);
  });

  it("usa URLs https únicas", () => {
    const urls = pressArticles.map((a) => a.url);

    for (const url of urls) {
      expect(new URL(url).protocol).toBe("https:");
    }
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("usa fechas ISO válidas (AAAA-MM-DD que existen en el calendario)", () => {
    for (const { publishedAt } of pressArticles) {
      expect(publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(new Date(publishedAt).toISOString().slice(0, 10)).toBe(
        publishedAt,
      );
    }
  });

  it("marca el idioma del titular como es o en", () => {
    for (const { lang } of pressArticles) {
      expect(["es", "en"]).toContain(lang);
    }
  });
});
