# Spec: sección "En los medios" en el home de arclo

Estado: aprobada por el founder el 2026-10-02. Título "En los medios" / "In the press"; sin link en el
navbar y sin JSON-LD (preguntas abiertas cerradas con la propuesta).

## Objetivo

Mostrar en el home de arclosystems.com las notas de prensa sobre Kodi como prueba social de que lo que
hace arclo ya está en la calle. Quien llega al sitio (clientes potenciales, socios, prensa) ve qué medio
publicó, el titular, la fecha, y puede abrir la nota original.

Notas iniciales (DEMOSTRADA, leídas con WebFetch el 2026-10-02):

| Medio | Titular (original, en español) | Fecha | URL |
|---|---|---|---|
| El Financiero | Esta app puede ayudarle en sus exámenes de admisión a universidades, de manejo y del MEP | 2026-10-02 | https://www.elfinancierocr.com/tecnologia/esta-app-puede-ayudarle-en-sus-examenes-de/3PFRLCUYUZAAHJ3X43TXCPDHRU/story/ |
| NTG Costa Rica | Talento de Tilarán crea Kodi, una aplicación que busca cambiar la forma de estudiar para los exámenes | 2026-09-30 | https://ntgcostarica.com/talento-de-tilaran-crea-kodi-una-aplicacion-que-busca-cambiar-la-forma-de-estudiar-para-los-examenes/ |

Decisiones del founder (2026-10-02): sección dentro del home (no página aparte); sin fotos, solo texto.

## Criterios de aceptación

1. En `/es` y `/en` aparece una sección `<section id="press" className="… scroll-mt-24 …">` entre
   `#projects` y `#about` (AUD-S-5).
2. Cada nota muestra: medio, titular, fecha en `<time dateTime={publishedAt}>` formateada según el idioma
   (`2 oct 2026` / `Oct 2, 2026`) y un indicador de enlace externo. La fila entera es el enlace, abre en
   pestaña nueva con `rel="noopener noreferrer"`. **Sin `aria-label`**: el nombre accesible sale del
   contenido y "abre en otra pestaña" va en un `<span className="sr-only">` traducido (AUD-S-3).
3. La fecha mostrada coincide con `publishedAt` en cualquier zona horaria: se formatea con
   `useFormatter().dateTime(new Date(publishedAt), { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })`
   (AUD-S-1; sin `timeZone` en Costa Rica sale un día antes).
4. Las notas se ordenan de la más reciente a la más vieja comparando los strings ISO, sin depender del
   orden en que se escriben.
5. Los titulares quedan en su idioma original (no se traducen) y llevan siempre `lang={article.lang}`.
6. Título, subtítulo y el texto "abre en otra pestaña" vienen de `src/messages/{es,en}.json` (namespace
   `Press`).
7. Mismo lenguaje visual que Proyectos (filas divididas, `BlurHighlight` en el título, `Reveal` escalonado),
   sin animación nueva. Flechas como en `projects.tsx:82-106` (AUD-S-4): una chica visible salvo en
   `min-width:1024px and hover:hover and pointer:fine`, y una grande que entra con hover solo en ese media
   query; ambas `aria-hidden`. Funciona en claro y oscuro y a 375 px sin scroll horizontal.
8. Agregar una nota nueva = agregar un objeto en un solo archivo de datos.
9. Sin warnings de hidratación en la consola de `npm run dev`.

## Tech stack

Next.js 16.3.5 (App Router, Turbopack), React 19.3, next-intl 4.14.5 (instalado), Tailwind 4, lucide-react, vitest 5.
Sin dependencias nuevas.

## Commands

```
Dev:       npm run dev
Test:      npm test
Lint:      npm run lint
Typecheck: npx tsc --noEmit
Build:     npm run build
```

## Project structure

```
src/lib/press.ts             → datos tipados + orden por fecha; sin React ni "use client" porque
                               vitest corre en environment node (AUD-S-6)
src/lib/press.test.ts        → tests de los datos (vitest, environment node)
src/components/press.tsx     → la sección (Server Component, ver AUD-3 del plan)
src/app/[locale]/(site)/page.tsx → monta <Press /> después de <Projects />
src/messages/es.json, en.json → namespace Press
```

## Code style

Igual que `projects.tsx`: datos `as const` arriba o en `src/lib`, nombres en español donde el archivo ya lo
hace, comentarios solo para lo no obvio. Forma de los datos:

```ts
export type PressArticle = {
  outlet: string;
  title: string;
  url: `https://${string}`;
  publishedAt: `${number}-${number}-${number}`;
  lang: "es" | "en";
};
```

## Testing strategy

Vitest sobre `src/lib/press.ts` (el include actual es `src/**/*.test.ts`; no hay tests de componentes en
el repo y no se agregan): orden descendente por fecha, URLs `https` únicas, fechas que cumplen
`/^\d{4}-\d{2}-\d{2}$/` y `new Date(x).toISOString().slice(0, 10) === x` (AUD-S-2: el tipo template
literal acepta `2026-13-45`). La
verificación visual la hace el founder en `npm run dev`.

## Boundaries

- Siempre: typecheck + lint + tests antes de dar por terminado; build en el checkpoint.
- Preguntar: link en el navbar, JSON-LD nuevo, cualquier dependencia, cambios a secciones existentes.
- Nunca: `dangerouslySetInnerHTML` para los datos (AUD-S-8); descargar o enlazar imágenes de los medios; traducir los titulares; tocar los SVG modificados sin
  commitear que ya están en el árbol (`public/assets/kodi/*`); push a `main` sin OK (dispara deploy en Vercel).

## Entrega

Canal F8.2 (Vercel, push a `main`). Sin backend ni app.

## Auditoría (F1, 2026-10-02)

Subagente Opus con spec-driven, source-driven (Context7 `/amannn/next-intl`), security y code-review. Sin
Critical. Important: AUD-S-1 (fecha un día antes sin `timeZone: "UTC"`, ejecutada), AUD-S-2 (validar
fechas en test, ejecutada con tsc), AUD-S-3 (`aria-label` anula el `lang` del titular, por código).
Suggestion: AUD-S-4 a AUD-S-8. Todas aplicadas arriba. Pendiente NO DEMOSTRADA: ausencia de warnings de
hidratación (se cierra con la consola de `npm run dev`, criterio 9).

## Preguntas abiertas

1. ¿Link "Prensa" en el navbar? Propuesta: no, por ahora (2 notas).
2. ¿Agregar `subjectOf` con las notas al JSON-LD de la organización? Propuesta: no en esta tarea.
