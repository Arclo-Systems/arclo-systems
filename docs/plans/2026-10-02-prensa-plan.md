# Plan: sección "En los medios" en el home de arclo

Spec: `docs/plans/2026-10-02-prensa-spec.md` (aprobada 2026-10-02). Ubicación de spec y plan según el
estándar de Kodi, no `tasks/`.

## Resumen

Datos estáticos en `src/lib/press.ts` con su test, un componente `Press` que copia el patrón de
`Projects`, textos en `es.json` y `en.json`, y montaje en el home entre `#projects` y `#about`. Sin
dependencias nuevas. No cambia nada nativo ni de backend.

## Decisiones

- Los datos viven en `src/lib` y no dentro del componente, porque el test corre en `environment: node`
  (AUD-S-6).
- La fecha se formatea con `useFormatter().dateTime(..., { timeZone: "UTC" })` (AUD-S-1).
- Lo más riesgoso va primero: la fecha y la validación de datos (T1), y después la UI.
- La UI no lleva test automático (el repo no tiene tests de componentes); la verifica el founder a ojo.

## Tareas

### ✅ T1: datos y orden (S)

- **Qué:** `src/lib/press.ts` con el tipo `PressArticle`, las 2 notas (spec, tabla) y
  `sortByNewest(articles)` / `pressArticles` ya ordenado, comparando strings ISO.
- **Archivos:** `src/lib/press.ts`, `src/lib/press.test.ts`.
- **Aceptación:**
  - el test falla primero (rojo) y después pasa;
  - el test comprueba el orden descendente aunque la entrada venga desordenada;
  - el test comprueba URLs `https://` únicas;
  - el test comprueba fechas `/^\d{4}-\d{2}-\d{2}$/` con ida y vuelta por `toISOString`;
  - el test comprueba `lang ∈ {es, en}`.
- **Verificación:** `npx vitest run src/lib/press.test.ts`.
- **Depende de:** nada.

### ✅ T2: textos i18n (XS)

- **Qué:** namespace `Press` en `src/messages/es.json` y `en.json`:
  - `title`: "En los medios" / "In the press";
  - `subtitle`: "Medios que escribieron sobre Kodi." / "Outlets that wrote about Kodi." (el founder
    sacó "nuestro producto propio" el 2026-10-02: el hero ya dice que Kodi es de arclo);
  - `opensInNewTab`: "abre en otra pestaña" / "opens in a new tab".
- **Archivos:** los 2 JSON.
- **Aceptación:**
  - los JSON son válidos;
  - las mismas claves en ambos idiomas.
- **Verificación (AUD-2):** `node -e "const a=require('./src/messages/es.json').Press,b=require('./src/messages/en.json').Press;if(JSON.stringify(Object.keys(a).sort())!==JSON.stringify(Object.keys(b).sort()))process.exit(1)"`.
- **Depende de:** nada.

### Checkpoint 1 (después de T1 y T2)

`npm test`, `npx tsc --noEmit`, `npm run lint`.

### ✅ T3: componente y montaje (M)

- **Qué:** `src/components/press.tsx` como **Server Component** (sin `"use client"`; `getTranslations` y
  `getFormatter` de `next-intl/server`, AUD-3: la fecha se formatea solo en el servidor y desaparece el
  riesgo de hidratación) y `<Press />` en `page.tsx` después de `<Projects />`. `Reveal` y
  `BlurHighlight` siguen siendo client y se usan como hijos.
- **Detalles del componente:**
  - `<section id="press" className="w-full scroll-mt-24 py-16 sm:py-24">`;
  - el mismo encabezado que Proyectos (`BlurHighlight` + `Reveal`);
  - lista `divide-y`; cada fila es un `<a target="_blank" rel="noopener noreferrer">` sin `aria-label`;
  - dentro de cada fila, en este orden de DOM, que es también el visual (AUD-5):
    1. una línea meta en estilo tag (`text-brand uppercase`) con el medio · `<time dateTime>`;
    2. el titular, `<h3 lang={lang}>` (nivel correcto, AUD-4);
    3. `<span className="sr-only">{t("opensInNewTab")}</span>`;
    4. las 2 flechas con las clases exactas de `projects.tsx:82-106`.
  - Sin número grande a la izquierda, para no repetir el "01/02" de Proyectos. Es una decisión de diseño
    menor y se puede revertir.
- **Archivos:** `src/components/press.tsx`, `src/app/[locale]/(site)/page.tsx`.
- **Skills del ejecutor:** `incremental-implementation`, `frontend-ui-engineering`, `emil-design-eng`.
- **Aceptación:** criterios 1, 2, 3, 5, 6, 7 y 9 de la spec.
- **Verificación:**
  - `npx tsc --noEmit` y `npm run lint`;
  - `curl -s localhost:3000/es | grep` "id=\"press\"", el titular y "2 oct 2026";
  - lo mismo en `/en` con "Oct 2, 2026";
  - visual por el founder.
- **Depende de:** T1 y T2.

### Checkpoint final

- `npm test`, `npx tsc --noEmit` y `npm run lint`;
- `npm run build`, con el dev corriendo (AUD-1: en Next 16 el dev escribe en `.next/dev`,
  `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md:907-909`);
- revertir el ordenamiento de T1 y ver fallar el test de guardia;
- OK visual del founder.

## Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Fecha corrida un día por zona horaria | Medio | `timeZone: "UTC"` + verificación con curl en `/es` |
| Commit que arrastra los SVG modificados ajenos | Medio | `git add` solo de los archivos de esta tarea |
| Que un medio cambie o borre la URL | Bajo | Fuera de alcance; la nota se edita o se quita en `press.ts` |

## Auditoría (F3, 2026-10-02)

Subagente Opus con source-driven (Context7 `/amannn/next-intl`), security y code-review. Sin Critical.

- **AUD-1, Important, DEMOSTRADA (docs de Next 16):** el build puede correr con el dev levantado.
  Aplicado.
- **AUD-2, Important, DEMOSTRADA:** la verificación de T2 no comparaba las claves de los dos idiomas.
  Aplicado.
- **AUD-3, Suggestion, DEMOSTRADA (ejecutada):** la salida es "2 oct 2026" / "Oct 2, 2026". Pasa a
  Server Component. Aplicado.
- **AUD-4, Suggestion, DEMOSTRADA:** `h3` es el nivel correcto. Queda NO DEMOSTRADO que el lector de
  pantalla cambie de idioma dentro del nombre del enlace; se cierra con NVDA o VoiceOver.
- **AUD-5, Suggestion:** el orden del DOM es igual al visual. Aplicado.
- **AUD-6, Suggestion:** el registro del subtítulo. Lo resolvió además la auditoría de copywriting:
  subtítulo pendiente de elección del founder (A/B/C).

## Entrega

- **Canal:** F8.2 (Vercel), push a `main` con aviso y OK previo (regla 4).
- **Huella nativa:** no aplica, porque es web.
- **Orden:** solo landing; no depende del backend.
- **Reversión:** `git revert` del commit, o promover en Vercel el deployment anterior.

## Verificación F5 (orquestador, 2026-10-02)

Todo DEMOSTRADO (ejecutado).

- **Diff:** se leyó completo. Solo cambian `page.tsx` (import y `<Press />`), el namespace `Press` en los
  JSON y 3 archivos nuevos. No se tocó `public/assets/kodi/*`.
- **`npm test`:** 34/34.
- **`npx tsc --noEmit`:** exit 0.
- **`npx eslint` sobre los archivos tocados:** exit 0. `npm run lint` da 3 errores que ya estaban, en
  `partner-form.tsx:114`, `reveal.tsx:22` y `theme-toggle.tsx:15`; ninguno de esos archivos está
  modificado.
- **Test de guardia:** sin el `.sort`, 2 de 7 fallan; restaurado, 7/7.
- **curl a las páginas:**
  - `/es` → `id="press"`, "2 oct 2026", "30 sept 2026" (abreviatura CLDR) y el subtítulo nuevo;
  - `/en` → "Oct 2, 2026", "Sep 30, 2026" y el subtítulo nuevo.
- **`npm run build`:** OK, con el dev corriendo.
- **Hidratación (criterio 9):** la fecha se formatea solo en el servidor (Server Component) y el log de
  dev no tiene errores. Falta el OK visual del founder y mirar la consola del navegador.

## F6 Revisión (2026-10-02)

/ship con los 3 revisores de agent-skills en Opus. Decisión: **GO**.

- **code-reviewer:** APPROVE, sin Critical ni Required.
  - Optional: sacar un `SectionHeader` común; el test de `lang` es redundante con el tipo.
  - Nits: `pressArticles` readonly; spec desactualizada (corregida).
- **security-auditor:** sin hallazgos en el cambio.
  - Preexistente: `npm audit` marca `next` 16.3.5 con GHSA-vcvr-r3jv-pc5j (`next/og`, no se usa en
    `src`), para una tarea aparte.
  - Preexistente: el sitio no tiene CSP ni headers de seguridad.
- **test-engineer:** sin Required.
  - Optional: un test de paridad de claves es/en para todo el repo; un test del formato UTC.

## F7 (2026-10-02)

- **Canal:** F8.2 (Vercel), push a `main`.
- **Versión:** la landing va sin versión.
- **CHANGELOG:** entrada del 2026-10-02.
- **Plan de reversión:** promover el deployment anterior en Vercel y hacer `git revert` en `main`.
- **OK del founder:** dado el 2026-10-02.
