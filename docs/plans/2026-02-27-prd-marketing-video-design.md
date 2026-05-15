# PRD: arclo Brand Reveal Video

## Contexto del Proyecto

**arclo** (Arclo Systems) es una empresa de desarrollo de software a medida con sede en San José, Costa Rica. Ofrece 6 servicios: Desarrollo a Medida, SaaS, IA y Agentes, Automatización, Apps Web y Apps Móvil. Su sitio web (arclosystems.com) fue lanzado en febrero 2026 con una estética dark/premium, animaciones WebGL con Three.js, y soporte bilingüe ES/EN.

El equipo está compuesto por 4 personas: CEO & Founder (Emilio Rodríguez B.), Co-Founder & CFO (Luis Ugalde C.), Project Management (Juan Díaz A.) y Software Engineering (Edgar Alvarado Z.).

Proyectos destacados: MiloPay (SaaS finanzas personales, en vivo), Transportes Acaya (plataforma logística, cliente privado), Kódi (en desarrollo).

---

## Objetivo

Producir un video de presentación de marca y ad para redes sociales usando **Remotion** (React + TypeScript). El video debe comunicar qué es arclo, qué hace, y generar confianza/autoridad.

## Audiencia

- Empresas y emprendedores en Costa Rica / LATAM que necesitan software a medida
- Tomadores de decisión no técnicos que buscan un partner tecnológico confiable

## Plataforma de Distribución

- Instagram (publicación cuadrada, no Reel)
- LinkedIn (publicación)
- Sitio web propio (embed opcional)

---

## Especificaciones del Video

| Propiedad | Valor |
|-----------|-------|
| Formato | Cuadrado (1:1) |
| Resolución | 1080x1080 |
| FPS | 30 |
| Duración | ~42 segundos (1260 frames) |
| Idioma | Español |
| Audio | Fuera de scope (post-producción) |
| Output | MP4 |
| Tecnología | Remotion + TypeScript |

---

## Estética Visual

- **Fondo:** Negro puro (#000000) constante
- **Texto:** Blanco (#FFFFFF)
- **Tipografía:** Inter (body) + Geist/Bold del sitio (headlines)
- **Partículas:** Campo de estrellas/partículas blancas con opacidad variable (0.2-0.8) como fondo constante durante todo el video
- **Transiciones:** Cross-fade suave de 0.5s entre actos
- **Estilo general:** Consistente con la landing de arclosystems.com — dark, premium, tipografía bold, sin colores vibrantes

---

## Storyboard

### Acto 1: Void (0s - 3s | Frames 0-90)

Pantalla negra. Partículas/estrellas emergen lentamente desde el centro, expandiéndose como un starfield.

- Animación: Fade-in de partículas, efecto de expansión radial
- Sin texto

### Acto 2: Logo Reveal (3s - 8s | Frames 90-240)

Las partículas se estabilizan como fondo. El texto "arclo·" aparece centrado con reveal por carácter (staggered), seguido de "SYSTEMS" debajo en un peso más ligero.

- Animación: Staggered character reveal con fade + slight scale
- El punto "·" después de "arclo" aparece con un beat/pausa
- "SYSTEMS" entra 0.3s después, fade-in desde abajo

### Acto 3: Tagline (8s - 14s | Frames 240-420)

El logo se reduce y sube. Debajo aparece: "Construimos software que impulsa tu negocio".

- Animación: Blur-to-clear reveal (mismo efecto del sitio web)
- La palabra "impulsa" tiene un highlight animado por debajo (underline que se dibuja)
- El logo permanece visible arriba, reducido

### Acto 4: Servicios (14s - 34s | Frames 420-1020)

Los 6 servicios aparecen uno por uno, centrados. Cada uno muestra su icono Lucide a la izquierda y el nombre a la derecha. Cada servicio se sostiene ~3 segundos.

Secuencia:
1. Desarrollo a Medida (icono: Code)
2. SaaS (icono: Cloud)
3. IA y Agentes (icono: Bot)
4. Automatización (icono: Workflow)
5. Apps Web (icono: Globe)
6. Apps Móvil (icono: Smartphone)

- Animación de entrada: Fade + slide desde abajo
- Animación de salida: Fade out
- Entre cada servicio: transición de 0.3s

### Acto 5: Cierre (34s - 42s | Frames 1020-1260)

Logo "arclo·SYSTEMS" vuelve al centro con scale-up.
Debajo aparece "arclosystems.com".
Debajo aparecen los íconos de redes sociales (LinkedIn, Instagram, Facebook).

- Animación: Scale-up suave del logo + fade-in secuencial de URL y redes
- Las partículas del fondo se intensifican ligeramente en el cierre

---

## Estructura Técnica (Remotion)

```
src/remotion/
├── index.ts                    # Root de composiciones
├── brand-reveal.tsx            # Composición principal (orquesta los actos)
├── sequences/
│   ├── void-particles.tsx      # Acto 1: Partículas emergiendo
│   ├── logo-reveal.tsx         # Acto 2: Logo arclo·SYSTEMS
│   ├── tagline.tsx             # Acto 3: Tagline con blur reveal
│   ├── services-carousel.tsx   # Acto 4: Servicios uno por uno
│   └── closing.tsx             # Acto 5: Logo + URL + redes
├── components/
│   ├── particle-field.tsx      # Background de partículas (Canvas 2D)
│   ├── blur-text.tsx           # Efecto blur-to-clear
│   └── staggered-text.tsx      # Texto con reveal por carácter
└── lib/
    ├── constants.ts            # Colores, fuentes, duraciones
    └── fonts.ts                # Carga de fuentes (Inter/Geist)
```

### Decisiones Técnicas

- **Canvas 2D para partículas** en lugar de Three.js/WebGL: más simple, determinista frame-by-frame, mejor compatibilidad con Remotion
- **Reutilizar conceptos del sitio** (blur-reveal, staggered text, partículas) pero reimplementados para Remotion
- **Lucide React** para los iconos de servicios (ya es dependencia del proyecto)

---

## Assets Necesarios

| Asset | Fuente | Notas |
|-------|--------|-------|
| Tipografía Inter | Google Fonts | Ya usada en el sitio |
| Tipografía Geist | Vercel | Ya usada en el sitio |
| Iconos Lucide | lucide-react | Code, Cloud, Bot, Workflow, Globe, Smartphone |
| Logo | Texto renderizado | "arclo·" + "SYSTEMS" con tipografía del sitio |
| Colores | Del sitio | #000000, #FFFFFF |

No se requieren assets externos (imágenes, videos, screenshots). Todo se genera programáticamente.

---

## Criterios de Éxito

1. El video se renderiza correctamente a 1080x1080 @30fps en formato MP4
2. La estética es consistente con el sitio web de arclo (dark, premium, tipografía bold)
3. Las animaciones son fluidas, sin saltos ni glitches
4. El video es auto-contenido: se entiende sin audio
5. El texto es legible en formato cuadrado de Instagram
6. El render completo tarda menos de 5 minutos en una máquina estándar

---

## Fuera de Scope

- Audio / música de fondo (se añade en post-producción)
- Versión en inglés (se puede hacer después reutilizando las composiciones con i18n)
- Versión vertical (9:16) para Reels/TikTok
- Screenshots o mockups de proyectos
- Subtítulos o voiceover
