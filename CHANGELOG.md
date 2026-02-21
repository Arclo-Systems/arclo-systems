# Changelog

Todos los cambios relevantes del proyecto se documentan aquí.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y versionado con [Semantic Versioning](https://semver.org/lang/es/).

## [1.0.0] - 2026-02-20

### Agregado

**Sitio principal**
- Landing page con 8 secciones: Hero, TextSeparator, Services, Projects, Team, FAQ, Contact y Footer.
- Página de Términos de Servicio (`/terms`).
- Página de Política de Privacidad (`/privacy`).
- Navbar sticky con navegación por anchors, menú hamburguesa móvil con focus trap y cierre por Escape.

**Internacionalización**
- Soporte completo para español (es) e inglés (en) con `next-intl`.
- Locale switcher en navbar.
- Middleware de locale routing vía `proxy.ts` (convención Next.js 16).
- Traducciones completas para todas las secciones, metadata y páginas legales.

**Componentes de animación**
- `GlitterWarp` — fondo animado WebGL con partículas (Three.js).
- `TextPath` — texto animado sobre path SVG con scroll (GSAP).
- `BlurHighlight` — texto con desenfoque que se revela al entrar en viewport con highlight animado.
- `Reveal` — animación de entrada con fade y desplazamiento vertical (Motion).
- `StarBorder` — borde animado con gradiente cónico giratorio.
- `PagePreloader` — preloader con transición de entrada.
- `HeroImage` — imagen hero con efecto 3D parallax al hover (GSAP).
- `StaggeredText` — texto con animación escalonada por carácter.

**Formularios y acciones**
- Formulario de contacto con validación, envío por email vía Brevo API y sanitización HTML contra inyección.
- Newsletter con suscripción vía Brevo API.

**SEO**
- `robots.ts` — reglas de crawling con referencia a sitemap.
- `sitemap.ts` — mapa del sitio dinámico con alternates `es`/`en` por URL.
- `manifest.ts` — web app manifest con nombre, colores e iconos.
- Metadata con OpenGraph (og:title, og:description, og:image, og:url, og:locale), Twitter Cards y `metadataBase`.
- Canonical tags y hreflang alternates en todas las páginas.
- JSON-LD structured data: `ProfessionalService` (Organization), `WebSite` y `FAQPage`.
- Metadata individual con título y descripción únicos para Terms y Privacy.

**Accesibilidad**
- Labels `sr-only` y `autocomplete` en todos los campos de formulario.
- `aria-expanded` en accordion FAQ y menú hamburguesa.
- `aria-label` en botones/links de solo icono.
- `aria-live="polite"` para mensajes de estado asíncronos.
- `aria-hidden` en SVGs e iconos decorativos.
- `role="dialog"` y `aria-modal` en menú móvil.
- Focus trap con retorno de foco al cerrar menú.
- Soporte `prefers-reduced-motion` en todos los componentes animados (GlitterWarp, TextPath, HeroImage, Reveal, PagePreloader, BlurHighlight, StarBorder).
- `focus-visible:ring` en inputs reemplazando `outline-none`.

**Rendimiento**
- Dynamic imports para Three.js (`GlitterWarp`) y GSAP (`TextPath`) — zero SSR.
- Propiedades explícitas en `transition` en lugar de `transition-all` en 5 componentes.
- Server Components para Terms y Privacy (sin JS al cliente).

**Stack técnico**
- Next.js 16.1.6 con Turbopack y App Router.
- React 19.2.3.
- TypeScript estricto.
- Tailwind CSS v4 con `tw-animate-css`.
- Motion (Framer Motion) para animaciones declarativas.
- GSAP para animaciones imperativas y scroll-driven.
- Three.js para efectos WebGL.
- Brevo API para email y newsletter.
- Despliegue en Vercel.

[1.0.0]: https://github.com/arclo-systems/arclo/releases/tag/v1.0.0
