# v1.0.0

> Primera versión de producción del sitio web de arclo.

## Highlights

- **Landing page completa** — Hero, Services (grid 6 cards), Projects (filas editoriales), Team, FAQ (accordion), Contact y Footer con newsletter.
- **Bilingüe** — Español e inglés con `next-intl`, locale switcher y middleware de routing.
- **Efectos visuales** — Fondo WebGL con partículas (Three.js), texto sobre path SVG animado (GSAP), blur-reveal, parallax 3D en hero image, preloader y animaciones de entrada.
- **SEO listo** — robots.txt, sitemap XML con hreflang, OpenGraph, Twitter Cards, JSON-LD (Organization + FAQPage + WebSite), canonical tags.
- **Accesible** — WCAG labels, aria attributes, focus management, prefers-reduced-motion en todas las animaciones.
- **Formularios funcionales** — Contacto por email y suscripción newsletter vía Brevo API con sanitización contra inyección HTML.
- **Páginas legales** — Términos de Servicio y Política de Privacidad como Server Components con metadata única.

## Stack

| Tecnología | Versión |
|-----------|---------|
| Next.js | 16.1.6 |
| React | 19.2.3 |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| Motion | 12.x |
| GSAP | 3.14 |
| Three.js | 0.183 |
| next-intl | 4.8 |

## Notas

- **Imagen OG pendiente**: agregar `public/og-image.jpg` (1200x630px) antes del deploy.
- **Favicon/iconos pendientes**: agregar `public/icon-192.png` y `public/icon-512.png` para el manifest.
- Verificar JSON-LD con [Rich Results Test](https://search.google.com/test/rich-results) tras desplegar.
