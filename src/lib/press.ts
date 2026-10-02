export type PressArticle = {
  outlet: string;
  title: string;
  url: `https://${string}`;
  publishedAt: `${number}-${number}-${number}`;
  lang: "es" | "en";
};

export function sortByNewest(articles: readonly PressArticle[]): PressArticle[] {
  // Las fechas ISO AAAA-MM-DD ordenan bien como texto, sin pasar por Date.
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

const articles: readonly PressArticle[] = [
  {
    outlet: "NTG Costa Rica",
    title:
      "Talento de Tilarán crea Kodi, una aplicación que busca cambiar la forma de estudiar para los exámenes",
    url: "https://ntgcostarica.com/talento-de-tilaran-crea-kodi-una-aplicacion-que-busca-cambiar-la-forma-de-estudiar-para-los-examenes/",
    publishedAt: "2026-09-30",
    lang: "es",
  },
  {
    outlet: "El Financiero",
    title:
      "Esta app puede ayudarle en sus exámenes de admisión a universidades, de manejo y del MEP",
    url: "https://www.elfinancierocr.com/tecnologia/esta-app-puede-ayudarle-en-sus-examenes-de/3PFRLCUYUZAAHJ3X43TXCPDHRU/story/",
    publishedAt: "2026-10-02",
    lang: "es",
  },
];

export const pressArticles = sortByNewest(articles);
