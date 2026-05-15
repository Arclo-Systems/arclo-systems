# Diseño: Formulario público de registro de partners (Kódi)

**Fecha:** 2026-05-15
**Estado:** Aprobado por el usuario (pendiente revisión del spec escrito)
**Ruta:** `/[locale]/partners/registro` (ES y EN)

---

## 1. Objetivo

Página pública (sin login, móvil + escritorio) donde un negocio se registra como partner de Kódi. El equipo Kódi recibe la información por correo y el negocio recibe una confirmación automática. Es una superficie de marca Kódi alojada dentro del repo `arclo`, sin afectar el sitio Arclo.

## 2. Decisiones cerradas

| Tema | Decisión |
|------|----------|
| Scope | Solo formulario (sin landing, sin hero/FAQ/stats blocks) |
| Backend | Server action + Brevo (mismo patrón que `contact.ts`); archivos como adjuntos |
| Idioma | Bilingüe ES/EN vía next-intl (namespace `Partners`) |
| Marca | Tokens Kódi en OKLCH, scoped al route group `(kodi)`; Dongle + Poppins |
| Fondo | Solo personajes Kódi custom, calmado, estático, baja opacidad |
| Shell | Refactor a route groups `(site)` / `(kodi)` |
| Validación | React Hook Form + Zod (esquema compartido cliente/servidor) |
| Cantones | Lista GAM de 31 (ver §9), marcada para verificación previa a lanzamiento |
| Logo | `kodi.svg` (trazo blanco, ratio ~3:1) sobre banda teal `#408D99` en el header |
| React Bits Pro | No se usa ningún bloque ni componente nuevo (no aporta a un form-only calmado) |

## 3. Arquitectura del shell (refactor route groups)

`[locale]/layout.tsx` hoy renderiza el chrome de Arclo (`Navbar` + `BackgroundEffect` glitter WebGL oscuro + `PagePreloader`) para **todas** las rutas. En App Router un layout anidado no puede remover lo que renderiza el padre, así que se reorganiza:

**Estructura final:**

```
src/app/
  layout.tsx                       (root: html/body, fuentes Geist/Outfit; sin cambios funcionales)
  [locale]/
    layout.tsx                     (SOLO: validación de locale + getMessages + NextIntlClientProvider)
    (site)/
      layout.tsx                   (chrome Arclo: BackgroundEffect + PagePreloader + Navbar + generateMetadata Arclo)
      page.tsx                     (home, movido)
      terms/page.tsx               (movido)
      privacy/page.tsx             (movido)
    (kodi)/
      layout.tsx                   (shell Kódi: header banda teal + logo + LanguageSwitcher; carga fuentes y tokens Kódi; KodiBackdrop; footer slim)
      kodi.css                     (tokens Kódi scoped, importado solo aquí)
      partners/
        registro/
          page.tsx                 (metadata propia + render del formulario)
          partner-form.tsx
          schema.ts
          data.ts
          sections/                (un componente por sección)
          fields/                  (primitivas Radix + Tailwind con marca Kódi)
```

- Los route groups `(site)` y `(kodi)` **no cambian las URLs**. Home sigue en `/[locale]`, terms en `/[locale]/terms`, el form en `/[locale]/partners/registro` (next-intl con prefijo de locale: `/es/...` y `/en/...`).
- `generateMetadata` actual de Arclo se mueve a `(site)/layout.tsx`. El sitio Arclo no cambia visualmente ni en SEO.
- `(kodi)` no usa `Navbar`, `BackgroundEffect` ni `PagePreloader` de Arclo.
- `[locale]/layout.tsx` mantiene `hasLocale`/`notFound`/`getMessages`/`NextIntlClientProvider` (i18n compartido).

## 4. Sistema de marca Kódi

Light-only (consistente con el host, que fuerza `colorScheme: light`). Tokens scoped vía selector en `kodi.css` (ej. `.kodi-scope { --... }` aplicado al contenedor raíz del layout `(kodi)`), sin tocar los tokens globales de Arclo.

**Color (estrategia Restrained, ley impeccable, todo OKLCH, nunca `#fff`/`#000`):**

Valores objetivo derivados de los hex del PRD §10 (verificar con conversor OKLCH al implementar; reducir chroma en extremos):

| Rol | Origen PRD | OKLCH objetivo |
|-----|-----------|----------------|
| Superficie base (casi blanco, tinte teal) | Blanco `#FEFEFE` | `oklch(0.99 0.006 200)` |
| Texto principal (casi negro, tinte café) | Café Oscuro `#422622` | `oklch(0.26 0.04 40)` |
| Acción / foco / enlaces | Teal `#408D99` | `oklch(0.62 0.075 205)` |
| Error / destructivo | Coral `#F47C6B` | `oklch(0.72 0.15 30)` |
| Acento puntual (badge mes gratis, check) | Dorado `#E3B23C` | `oklch(0.79 0.13 85)` |
| Disponibles fuera del form | Verde Lima / Azul Cielo / Durazno | según PRD, no usados en el form |

Escala neutral: tomar la escala neutral del PRD, convertir a OKLCH y tintar levemente hacia el hue teal (chroma 0.005–0.01). Solo paleta light.

**Tipografía (vía `next/font/google`, variables CSS cargadas solo en `(kodi)/layout.tsx`):**

- **Dongle** (700): títulos de pantalla, título de sección, pantalla de éxito. "Lo que el usuario siente."
- **Poppins** (400/500/600): body, labels, placeholders, inputs, botones, mensajes de error. "Lo que el usuario lee."
- Jerarquía por escala + peso, ratio ≥1.25 entre pasos.

**Voz (CR, PRD §10):** voseo tico, fresco y maduro. "Practicá", "Registrá tu negocio". Sin infantilismo.

## 5. Shell `(kodi)`

- **Header:** banda con fondo teal Kódi `#408D99`, alto compacto. `kodi.svg` a la izquierda (alto ~28–32px, ratio ~3:1, color blanco original que contrasta sobre el teal), `LanguageSwitcher` reutilizado a la derecha (adaptado a contraste sobre teal). Sticky opcional, sin sombra dura.
- **Footer slim:** una línea, © Kódi + año, enlaces a Privacidad/Términos si existen para Kódi (si no, omitir enlaces). No es el footer de Arclo.
- **KodiBackdrop:** ver §12.
- **Metadata:** `partners/registro/page.tsx` exporta su propio `generateMetadata` (title/description bilingüe desde `Partners`), `metadataBase` propio, indexable. No hereda OG de Arclo.

## 6. Formulario: arquitectura

Client component `PartnerForm` con **React Hook Form + Zod** (`@hookform/resolvers/zod`). Esquema Zod único en `schema.ts`, fuente de verdad usada en cliente y revalidada en el server action.

- `schema.ts`: esquema Zod de campos escalares + reglas condicionales. La validación de archivos (tipo, tamaño, dimensiones) va en un helper aparte usado en ambos lados (`File`/`Blob` no se modela en Zod).
- `data.ts`: 20 categorías `{ value, es, en }`, 31 cantones GAM (string, nombre propio igual en ambos idiomas), constantes (`MAX_LOGO_BYTES = 2_000_000`, `MAX_PHOTO_BYTES = 5_000_000`, `LOGO_MIN_PX = 400`, longitudes, mín/máx fecha).
- `partner-form.tsx`: orquestador (RHF, `useFieldArray` para sucursales, estado submit, `AnimatePresence`).
- `sections/`: `business-section`, `branches-section`, `contact-section`, `coupon-section`, `media-section`, `confirmation-section`.
- `fields/`: primitivas Radix + Tailwind marca Kódi: `field` (wrapper label + ayuda + error con `aria-describedby`/`aria-invalid`), `text-input`, `textarea-counter`, `select`, `radio-group`, `checkbox-group`, `file-upload`, `date-input`.

**Lógica condicional:**

- "¿Más de una sucursal?" = Sí → render Sección 2 (Sucursales) y, en Sección 4, el selector "¿En cuáles sucursales aplica?".
- Sucursales: `useFieldArray`, mínimo 2, máximo 20. La primera tarjeta no tiene botón eliminar; el resto sí.
- Valor del descuento: rango según tipo (% → 5–100; fijo → ≥500₡), validado en vivo.
- "¿En cuáles sucursales aplica?": checkboxes generados de las sucursales registradas + opción "Todas las sucursales" que marca todas. Obligatorio si hay sucursales.
- Contadores en vivo con `aria-live="polite"`: descripción negocio (250), descripción cupón (80), condiciones (150).
- Botón enviar deshabilitado hasta marcar el check de la Sección 6 (`aria-disabled` + razón visible).

## 7. Especificación de campos por sección

### Sección 1 — Datos del negocio
| Campo | Tipo | Reglas |
|-------|------|--------|
| Nombre comercial | text | obligatorio, máx 60 |
| Categoría | select | obligatorio, 20 opciones (ver §9) |
| Zona / cantón principal | select | obligatorio, lista GAM |
| Sitio web | url | opcional, formato URL válido |
| Instagram | text | opcional, handle sin `@` (se quita `@` inicial si lo escriben; patrón `^[A-Za-z0-9._]{1,30}$`) |
| Facebook | url | opcional, formato URL válido |
| TikTok | text | opcional, handle sin `@` (mismo patrón que Instagram) |
| Descripción del negocio | textarea | obligatorio, máx 250, contador en vivo |
| ¿Más de una sucursal? | radio | obligatorio, "Sí" / "No" |

### Sección 2 — Sucursales (solo si "Sí")
Tarjetas repetibles, botón "+ Agregar sucursal", mín 2, máx 20. Primera sin eliminar.
| Campo | Tipo | Reglas |
|-------|------|--------|
| Nombre de la sucursal | text | obligatorio, máx 60 |
| Zona / cantón | select | obligatorio, lista GAM |
| Dirección exacta | text | opcional |

### Sección 3 — Datos del contacto
| Campo | Tipo | Reglas |
|-------|------|--------|
| Nombre completo | text | obligatorio, solo letras y espacios, acentos/ñ permitidos (`^[\p{L} ]+$/u`) |
| Cargo | text | obligatorio |
| Correo electrónico | email | obligatorio, formato válido; recibe la confirmación automática |
| WhatsApp | tel | obligatorio, exactamente 8 dígitos CR (se limpian espacios/guiones; `^\d{8}$`) |

### Sección 4 — Configuración del cupón
| Campo | Tipo | Reglas |
|-------|------|--------|
| Tipo de descuento | radio | obligatorio, "Porcentaje (%)" / "Monto fijo (₡)" |
| Valor del descuento | number | obligatorio; % → 5–100; fijo → ≥500; validación en vivo según tipo |
| Descripción del cupón | text | obligatorio, máx 80, contador en vivo |
| Cantidad de cupones | number | obligatorio, entero, 5–500 |
| Fecha límite de canje | date | obligatorio, mín hoy+15 días, máx hoy+90 días (revalidado en servidor) |
| ¿En cuáles sucursales aplica? | checkbox group | solo si hay sucursales; obligatorio en ese caso; "Todas" marca todas |
| Condiciones adicionales | text | opcional, máx 150 |

### Sección 5 — Materiales visuales
| Campo | Tipo | Reglas |
|-------|------|--------|
| Logo | file | obligatorio; PNG o SVG; máx 2MB; PNG con mín 400×400px (chequeo de dimensiones cargando la imagen); SVG aceptado como vector (sin chequeo raster). Fondo transparente se comunica como guía en UI; no se valida programáticamente |
| Foto del negocio o producto | file | opcional; JPG o PNG; máx 5MB. Si no se sube: mostrar "Los partners con foto reciben 3x más clics dentro de la app" |

### Sección 6 — Confirmación y envío
- Checkbox obligatorio. Texto exacto (bilingüe): *"Entiendo que el primer mes es completamente gratuito y sin compromiso posterior. Al finalizar recibiré un reporte de resultados."*
- Botón enviar deshabilitado hasta marcar.

## 8. Categorías de negocio (20)

`Escuela de Manejo`, `Alquiler de Vehículo COSEVI`, `Restaurante`, `Hamburguesería`, `Café / Heladería`, `Comida Rápida`, `Delivery / Dark Kitchen`, `Tecnología`, `Ropa / Boutique`, `Calzado`, `Barbería / Salón`, `Gimnasio / Fitness`, `Academia de Idiomas`, `Librería / Papelería`, `Óptica`, `Entretenimiento`, `Fotografía`, `Salud / Bienestar`, `Supermercado`, `Otro`.

`value` estable (string en español, usado en el email); `es`/`en` para la etiqueta visible.

## 9. Cantones GAM (31) ⚠️ verificar antes de lanzar

**San José (13):** San José, Escazú, Desamparados, Aserrí, Mora, Goicoechea, Santa Ana, Alajuelita, Vázquez de Coronado, Tibás, Moravia, Montes de Oca, Curridabat.
**Alajuela (3):** Alajuela, Atenas, Poás.
**Cartago (5):** Cartago, Paraíso, La Unión, Oreamuno, El Guarco.
**Heredia (9):** Heredia, Barva, Santo Domingo, Santa Bárbara, San Rafael, San Isidro, Belén, Flores, San Pablo.

Nombre propio, idéntico ES/EN. El límite del GAM es difuso según la fuente; validar contra fuente oficial antes del lanzamiento (patrón ⚠️ del PRD).

## 10. Data flow (server action + Brevo)

Server action `submitPartnerRegistration` en `src/app/actions/partners.ts`:

1. Recibe `FormData` (campos escalares + `File` de logo y foto).
2. Revalida campos con el esquema Zod compartido; valida archivos (tipo, tamaño, y para PNG dimensiones mín) con el helper compartido. Si falla → `{ success: false, error }` sin enviar nada.
3. Anti-spam: campo honeypot oculto; si viene lleno → responder éxito falso sin enviar.
4. Email 1 al equipo Kódi (`PARTNER_RECIPIENT`, env nuevo): HTML formateado con todos los campos (escapados) + **logo y foto como adjuntos** (base64). Total adjuntos ≤ ~7MB (2MB + 5MB), bajo el límite Brevo.
5. Email 2 al partner (correo de contacto): confirmación automática en el locale enviado, con el texto del mes gratis y los próximos pasos.
6. Retorna `{ success: true }` o `{ success: false, error }`. El form muestra estado sin perder lo escrito si falla.

Helper nuevo `src/lib/email.ts`: `escapeHtml` + `sendBrevoEmail({ to, replyTo, subject, html, attachments })`. Usado solo por el nuevo action. `contact.ts`/`newsletter.ts` quedan intactos (fuera de scope; posible unificación futura).

Env (no commiteado): reutiliza `BREVO_API_KEY`, `BREVO_SENDER_EMAIL` (ya usados por `contact.ts`); agrega `PARTNER_RECIPIENT`. Documentar en `.env.example` si existe.

## 11. Estados de la UI

- **idle:** formulario editable.
- **submitting:** botón con spinner, campos deshabilitados, `aria-busy`.
- **success:** pantalla de éxito Kódi (ilustración de `public/assets/kodi`, mensaje cálido voseo, qué sigue: "te contactamos pronto"). Reemplaza el form.
- **error:** banner de error inline (no destruye datos), botón reintentar. Errores de validación: por campo, foco al primer inválido al intentar enviar.

## 12. KodiBackdrop (fondo de personajes, calmado)

Componente `src/components/kodi/kodi-backdrop.tsx`, renderizado en `(kodi)/layout.tsx`:

- 2–3 personajes grandes de `public/assets/kodi` (`profe_marta.svg`, `Llama.svg`) + acentos pequeños (`kolones.svg`, `Koko.svg`).
- Opacidad 0.05–0.07, desaturados/tintados a neutro-marca vía `filter`, posición `absolute`, grandes, descentrados, sangrando por los bordes.
- Gradiente radial muy tenue teal/dorado de fondo.
- **Estático** (sin animación, sin parallax, sin WebGL): seguro por construcción para `prefers-reduced-motion`.
- `aria-hidden="true"`, `pointer-events: none`, `z-index` detrás del contenido.

## 13. Accesibilidad y motion

- Cada campo con `<label>` asociado; grupos radio/checkbox en `fieldset`/`legend`.
- Errores con `aria-describedby` + `aria-invalid`; foco programático al primer error en submit fallido.
- Contadores y estado de envío con `aria-live="polite"`; `aria-busy` durante submit.
- Botón submit deshabilitado con razón textual visible mientras el check no esté marcado.
- Targets táctiles ≥44px; foco visible (anillo teal); contraste AA verificado (texto café sobre superficie clara, blanco sobre banda teal).
- Motion (emil): solo `transform`/`opacity`; `--ease-out: cubic-bezier(0.23,1,0.32,1)`; duraciones <300ms; botones `:active { transform: scale(0.97) }`.
- Entrada/salida de tarjetas de sucursal: `motion` + `AnimatePresence`, opacity + translateY (sin animar propiedades de layout), salida más rápida que entrada, stagger 40–60ms.
- Aparición de Sección 2 y del subcampo de Sección 4: fade + slide corto en montaje (sin tween de `height`).
- Todo el motion envuelto en `@media (prefers-reduced-motion: reduce)`: se mantiene opacidad, se eliminan desplazamientos.
- Revisión final contra Web Interface Guidelines (Vercel) antes de cerrar la implementación.

## 14. Dependencias y entorno nuevos

- npm: `react-hook-form`, `zod`, `@hookform/resolvers`.
- Fuentes: `Poppins` y `Dongle` vía `next/font/google` (ambas en Google Fonts).
- Env: `PARTNER_RECIPIENT` (correo del equipo Kódi). Reutiliza `BREVO_API_KEY` y `BREVO_SENDER_EMAIL`.

## 15. Mapa de archivos

**Creados:**
- `src/app/[locale]/(site)/layout.tsx`
- `src/app/[locale]/(kodi)/layout.tsx`
- `src/app/[locale]/(kodi)/kodi.css`
- `src/app/[locale]/(kodi)/partners/registro/page.tsx`
- `src/app/[locale]/(kodi)/partners/registro/partner-form.tsx`
- `src/app/[locale]/(kodi)/partners/registro/schema.ts`
- `src/app/[locale]/(kodi)/partners/registro/data.ts`
- `src/app/[locale]/(kodi)/partners/registro/sections/*` (6 componentes)
- `src/app/[locale]/(kodi)/partners/registro/fields/*` (primitivas)
- `src/components/kodi/kodi-header.tsx`, `src/components/kodi/kodi-backdrop.tsx`, `src/components/kodi/kodi-footer.tsx`
- `src/app/actions/partners.ts`
- `src/lib/email.ts`

**Movidos (sin cambio de URL):**
- `src/app/[locale]/page.tsx` → `src/app/[locale]/(site)/page.tsx`
- `src/app/[locale]/terms/page.tsx` → `src/app/[locale]/(site)/terms/page.tsx`
- `src/app/[locale]/privacy/page.tsx` → `src/app/[locale]/(site)/privacy/page.tsx`

**Modificados:**
- `src/app/[locale]/layout.tsx` (queda solo i18n; chrome y `generateMetadata` Arclo movidos a `(site)/layout.tsx`)
- `src/messages/es.json` y `en.json` (namespace `Partners`)
- `package.json` (deps)

## 16. Fuera de scope

Persistencia en base de datos, panel de partners, canje/gestión de cupones, analytics de redención, dark mode en `(kodi)`, el resto de la app Kódi, unificación de `contact.ts`/`newsletter.ts` con `email.ts`, bloques/componentes de React Bits Pro.

## 17. Riesgos / ítems a verificar

- ⚠️ Lista GAM (31) a validar contra fuente oficial antes de lanzar.
- Logo en banda teal es el default; revisar si la marca entrega variante a color.
- Transparencia/dimensiones de SVG no verificables de forma fiable en cliente: se valida tipo y, para PNG, dimensiones; transparencia se comunica como guía.
- Límite de adjuntos Brevo: 2MB + 5MB queda bajo el tope; validar tamaño antes de enviar.
- El refactor de route groups debe preservar URLs y SEO del sitio Arclo (verificar `terms`, `privacy`, home y metadata tras mover).
