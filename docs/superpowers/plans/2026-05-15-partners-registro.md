# Formulario de registro de partners (Kódi) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la página pública bilingüe `/[locale]/partners/registro` con marca Kódi, formulario de 6 secciones validado y envío por correo Brevo, sin afectar el sitio Arclo.

**Architecture:** Refactor del `[locale]/layout.tsx` a route groups `(site)` (chrome Arclo) y `(kodi)` (shell Kódi). Lógica de validación pura (Zod schema, validación de archivos, helpers de email) cubierta con tests Vitest en TDD. UI (refactor de layouts, tokens CSS, componentes de formulario) verificada con typecheck + lint + build + smoke en dev, ya que el proyecto no tiene harness de componentes y agregarlo para una página de formulario sería desproporcionado.

**Tech Stack:** Next.js 16 (App Router), React 19, next-intl 4, Tailwind v4, Radix UI, React Hook Form + Zod, Vitest (solo lógica), Brevo (email, patrón existente).

---

## Decomposición de archivos

| Archivo | Responsabilidad |
|---------|-----------------|
| `src/app/[locale]/layout.tsx` (modificar) | Solo i18n: validación de locale + `NextIntlClientProvider` |
| `src/app/[locale]/(site)/layout.tsx` (crear) | Chrome Arclo: `BackgroundEffect` + `PagePreloader` + `Navbar` + `generateMetadata` Arclo |
| `src/app/[locale]/(kodi)/layout.tsx` (crear) | Shell Kódi: scope de tokens/fuentes + header + backdrop + footer |
| `src/app/[locale]/(kodi)/kodi.css` (crear) | Tokens Kódi OKLCH scoped |
| `src/app/[locale]/(kodi)/fonts.ts` (crear) | Fuentes Poppins + Dongle |
| `src/components/kodi/kodi-header.tsx` (crear) | Header banda teal + logo + idioma |
| `src/components/kodi/kodi-backdrop.tsx` (crear) | Personajes de fondo estáticos |
| `src/components/kodi/kodi-footer.tsx` (crear) | Footer slim © Kódi |
| `src/app/[locale]/(kodi)/partners/registro/page.tsx` (crear) | Metadata + render del formulario |
| `src/app/[locale]/(kodi)/partners/registro/data.ts` (crear) | Categorías, cantones, constantes |
| `src/app/[locale]/(kodi)/partners/registro/schema.ts` (crear) | Esquema Zod + tipos |
| `src/app/[locale]/(kodi)/partners/registro/partner-form.tsx` (crear) | Orquestador RHF |
| `src/app/[locale]/(kodi)/partners/registro/sections/*.tsx` (crear) | 6 secciones |
| `src/app/[locale]/(kodi)/partners/registro/fields/*.tsx` (crear) | Primitivas de campo Kódi |
| `src/lib/file-validation.ts` (crear) | Validación de tipo/tamaño/dimensiones |
| `src/lib/email.ts` (crear) | `escapeHtml` + `sendBrevoEmail` |
| `src/app/actions/partners.ts` (crear) | Server action de envío |
| `src/messages/es.json` / `en.json` (modificar) | Namespace `Partners` |
| `vitest.config.ts`, `package.json` (modificar) | Tooling de tests + deps |

---

## Fase 0 — Tooling

### Task 0.1: Instalar dependencias

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Instalar deps de runtime**

Run:
```bash
npm install react-hook-form@^7 zod@^3 @hookform/resolvers@^3
```

- [ ] **Step 2: Instalar Vitest (dev)**

Run:
```bash
npm install -D vitest@^2
```

- [ ] **Step 3: Agregar script de test a `package.json`**

En `package.json`, dentro de `"scripts"`, agregar la línea `"test": "vitest run"` después de `"lint": "eslint"`:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest run"
  },
```

- [ ] **Step 4: Verificar instalación**

Run: `npm ls react-hook-form zod @hookform/resolvers vitest`
Expected: las cuatro listadas sin `UNMET`.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "🔧 chore: agregar react-hook-form, zod y vitest"
```

### Task 0.2: Configurar Vitest

**Files:**
- Create: `vitest.config.ts`

- [ ] **Step 1: Crear `vitest.config.ts`**

```typescript
import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
```

- [ ] **Step 2: Crear test sentinela `src/lib/__sanity.test.ts`**

```typescript
import { describe, it, expect } from "vitest";

describe("vitest", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 3: Ejecutar**

Run: `npm test`
Expected: PASS, 1 test.

- [ ] **Step 4: Borrar el sentinela**

Run: `git rm -f --quiet src/lib/__sanity.test.ts 2>$null; Remove-Item -ErrorAction SilentlyContinue src/lib/__sanity.test.ts`
(o eliminar el archivo manualmente)

- [ ] **Step 5: Commit**

```bash
git add vitest.config.ts
git commit -m "🔧 chore: configurar Vitest para tests de lógica"
```

### Task 0.3: Documentar variable de entorno

**Files:**
- Create: `.env.example`

- [ ] **Step 1: Crear `.env.example`** (`.env*` está en `.gitignore`; `.env.example` también lo estaría por el patrón `.env*`, así que se fuerza el add)

```
# Brevo (ya usado por contact.ts / newsletter.ts)
BREVO_API_KEY=
BREVO_SENDER_EMAIL=
CONTACT_RECIPIENT=
# Nuevo: correo del equipo Kódi que recibe registros de partners
PARTNER_RECIPIENT=
```

- [ ] **Step 2: Commit (forzando el add por el ignore de .env\*)**

```bash
git add -f .env.example
git commit -m "📝 docs: documentar PARTNER_RECIPIENT en .env.example"
```

---

## Fase A — Refactor a route groups

Objetivo: el sitio Arclo queda idéntico (URLs y SEO), pero el chrome Arclo baja a `(site)` y `(kodi)` queda libre.

### Task A.1: Crear `(site)/layout.tsx` con el chrome Arclo

**Files:**
- Create: `src/app/[locale]/(site)/layout.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Crear `src/app/[locale]/(site)/layout.tsx`** (mueve chrome + `generateMetadata` desde el layout de locale)

```tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/navbar";
import { PagePreloader } from "@/components/page-preloader";
import { BackgroundEffect } from "@/components/background-effect";

const BASE_URL = "https://arclosystems.com";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const title = t("title");
  const description = t("description");
  const url = `${BASE_URL}/${locale}`;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
      languages: { es: `${BASE_URL}/es`, en: `${BASE_URL}/en` },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "arclo",
      locale: locale === "es" ? "es_CR" : "en_US",
      type: "website",
      images: [
        { url: `${BASE_URL}/open-graph.png`, width: 1200, height: 630, alt: title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/open-graph.png`],
    },
  };
}

export default function SiteLayout({ children }: Props) {
  return (
    <>
      <BackgroundEffect />
      <PagePreloader>
        <Navbar />
        {children}
      </PagePreloader>
    </>
  );
}
```

- [ ] **Step 2: Reemplazar `src/app/[locale]/layout.tsx` por solo i18n** (sin chrome, sin metadata Arclo)

```tsx
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add "src/app/[locale]/(site)/layout.tsx" "src/app/[locale]/layout.tsx"
git commit -m "♻️ refactor: separar chrome Arclo en route group (site)"
```

### Task A.2: Mover las páginas Arclo a `(site)`

**Files:**
- Move: `src/app/[locale]/page.tsx` → `src/app/[locale]/(site)/page.tsx`
- Move: `src/app/[locale]/terms/page.tsx` → `src/app/[locale]/(site)/terms/page.tsx`
- Move: `src/app/[locale]/privacy/page.tsx` → `src/app/[locale]/(site)/privacy/page.tsx`

- [ ] **Step 1: Mover con git (preserva historia, no cambia URLs)**

```bash
git mv "src/app/[locale]/page.tsx" "src/app/[locale]/(site)/page.tsx"
git mv "src/app/[locale]/terms/page.tsx" "src/app/[locale]/(site)/terms/page.tsx"
git mv "src/app/[locale]/privacy/page.tsx" "src/app/[locale]/(site)/privacy/page.tsx"
```

- [ ] **Step 2: Eliminar carpetas vacías `terms/` y `privacy/` si quedaron**

Run (PowerShell):
```powershell
Remove-Item -ErrorAction SilentlyContinue "src/app/[locale]/terms","src/app/[locale]/privacy"
```

- [ ] **Step 3: Typecheck y build**

Run: `npx tsc --noEmit; npm run build`
Expected: build OK. Rutas generadas: `/[locale]`, `/[locale]/terms`, `/[locale]/privacy` (sin cambios de URL; los route groups no afectan rutas).

- [ ] **Step 4: Smoke en dev**

Run: `npm run dev` y abrir `http://localhost:3000/es` y `/es/terms` y `/es/privacy`.
Expected: el sitio Arclo se ve idéntico (navbar, fondo glitter, preloader, footer).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "♻️ refactor: mover páginas Arclo a (site) sin cambiar URLs"
```

---

## Fase B — Shell Kódi

### Task B.1: Fuentes y tokens Kódi

**Files:**
- Create: `src/app/[locale]/(kodi)/fonts.ts`
- Create: `src/app/[locale]/(kodi)/kodi.css`

- [ ] **Step 1: Crear `src/app/[locale]/(kodi)/fonts.ts`**

```typescript
import { Poppins, Dongle } from "next/font/google";

export const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const dongle = Dongle({
  variable: "--font-dongle",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});
```

- [ ] **Step 2: Crear `src/app/[locale]/(kodi)/kodi.css`** (tokens OKLCH scoped, sin tocar tokens Arclo; valores derivados del PRD §10)

```css
.kodi-scope {
  --kodi-surface: oklch(0.99 0.006 200);
  --kodi-surface-2: oklch(0.972 0.008 200);
  --kodi-ink: oklch(0.26 0.04 40);
  --kodi-ink-soft: oklch(0.46 0.03 40);
  --kodi-teal: oklch(0.62 0.075 205);
  --kodi-teal-strong: oklch(0.55 0.085 205);
  --kodi-coral: oklch(0.72 0.15 30);
  --kodi-gold: oklch(0.79 0.13 85);
  --kodi-border: oklch(0.9 0.01 205);
  --kodi-ring: oklch(0.62 0.075 205);
  --kodi-ease: cubic-bezier(0.23, 1, 0.32, 1);

  background-color: var(--kodi-surface);
  color: var(--kodi-ink);
  font-family: var(--font-poppins), system-ui, sans-serif;
  min-height: 100dvh;
}

.kodi-scope .font-dongle {
  font-family: var(--font-dongle), var(--font-poppins), sans-serif;
}

.kodi-scope ::selection {
  background: var(--kodi-teal);
  color: white;
}
```

- [ ] **Step 3: Commit**

```bash
git add "src/app/[locale]/(kodi)/fonts.ts" "src/app/[locale]/(kodi)/kodi.css"
git commit -m "✨ feat: fuentes y tokens de marca Kódi scoped"
```

### Task B.2: Header, backdrop y footer Kódi

**Files:**
- Create: `src/components/kodi/kodi-header.tsx`
- Create: `src/components/kodi/kodi-backdrop.tsx`
- Create: `src/components/kodi/kodi-footer.tsx`

- [ ] **Step 1: Crear `src/components/kodi/kodi-header.tsx`** (banda teal, logo blanco, switcher de idioma reutilizado)

```tsx
import Image from "next/image";
import { LanguageSwitcher } from "@/components/language-switcher";

export function KodiHeader() {
  return (
    <header className="sticky top-0 z-30 bg-[var(--kodi-teal)]">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-3 lg:px-8">
        <Image
          src="/assets/kodi/kodi.svg"
          alt="Kódi"
          width={1206}
          height={391}
          priority
          className="h-7 w-auto sm:h-8"
        />
        <div className="[&_button]:border-white/40 [&_button]:text-white/80 [&_span]:!text-white/60 [&_.font-semibold]:!text-white">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Crear `src/components/kodi/kodi-backdrop.tsx`** (personajes estáticos, baja opacidad, sin animación)

```tsx
import Image from "next/image";

export function KodiBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 0%, oklch(0.62 0.075 205 / 0.06), transparent), radial-gradient(50% 40% at 10% 100%, oklch(0.79 0.13 85 / 0.05), transparent)",
        }}
      />
      <Image
        src="/assets/kodi/profe_marta.svg"
        alt=""
        width={520}
        height={520}
        className="absolute -right-24 top-24 w-[420px] opacity-[0.06] grayscale sm:w-[520px]"
      />
      <Image
        src="/assets/kodi/Llama.svg"
        alt=""
        width={480}
        height={480}
        className="absolute -left-28 bottom-[-60px] w-[380px] opacity-[0.05] grayscale sm:w-[480px]"
      />
      <Image
        src="/assets/kodi/kolones.svg"
        alt=""
        width={120}
        height={120}
        className="absolute left-[12%] top-[18%] w-20 opacity-[0.05]"
      />
    </div>
  );
}
```

- [ ] **Step 3: Crear `src/components/kodi/kodi-footer.tsx`**

```tsx
export function KodiFooter() {
  return (
    <footer className="border-t border-[var(--kodi-border)] px-5 py-6 text-center text-xs text-[var(--kodi-ink-soft)]">
      © {new Date().getFullYear()} Kódi
    </footer>
  );
}
```

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: sin errores.

- [ ] **Step 5: Commit**

```bash
git add src/components/kodi
git commit -m "✨ feat: header, backdrop y footer del shell Kódi"
```

### Task B.3: Layout `(kodi)` y página placeholder

**Files:**
- Create: `src/app/[locale]/(kodi)/layout.tsx`
- Create: `src/app/[locale]/(kodi)/partners/registro/page.tsx`

- [ ] **Step 1: Crear `src/app/[locale]/(kodi)/layout.tsx`**

```tsx
import { poppins, dongle } from "./fonts";
import "./kodi.css";
import { KodiHeader } from "@/components/kodi/kodi-header";
import { KodiBackdrop } from "@/components/kodi/kodi-backdrop";
import { KodiFooter } from "@/components/kodi/kodi-footer";

export default function KodiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`kodi-scope flex flex-col ${poppins.variable} ${dongle.variable}`}>
      <KodiBackdrop />
      <KodiHeader />
      <main className="flex-1">{children}</main>
      <KodiFooter />
    </div>
  );
}
```

- [ ] **Step 2: Crear página placeholder `src/app/[locale]/(kodi)/partners/registro/page.tsx`**

```tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Partners" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      languages: {
        es: "https://arclosystems.com/es/partners/registro",
        en: "https://arclosystems.com/en/partners/registro",
      },
    },
  };
}

export default function PartnersRegistroPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 lg:px-8">
      <h1 className="font-dongle text-5xl font-bold">Kódi Partners</h1>
    </div>
  );
}
```

> Nota: `page.tsx` usa el namespace `Partners`, que se crea en la Fase D. Si se ejecuta antes que la Fase D, agregar temporalmente `"Partners": { "meta": { "title": "Kódi Partners", "description": "Registro de partners" } }` a `es.json`/`en.json`; la Fase D lo reemplaza por el bloque completo.

- [ ] **Step 3: Build y smoke**

Run: `npm run build` y luego `npm run dev`, abrir `http://localhost:3000/es/partners/registro`.
Expected: superficie clara Kódi, header banda teal con logo blanco visible, sin navbar Arclo ni fondo glitter. `/es` sigue Arclo intacto.

- [ ] **Step 4: Commit**

```bash
git add "src/app/[locale]/(kodi)/layout.tsx" "src/app/[locale]/(kodi)/partners/registro/page.tsx"
git commit -m "✨ feat: layout del shell Kódi y ruta /partners/registro"
```

---

## Fase C — Lógica (TDD)

### Task C.1: Datos y constantes

**Files:**
- Create: `src/app/[locale]/(kodi)/partners/registro/data.ts`

- [ ] **Step 1: Crear `data.ts`**

```typescript
export const MAX_LOGO_BYTES = 2_000_000;
export const MAX_PHOTO_BYTES = 5_000_000;
export const LOGO_MIN_PX = 400;
export const MIN_DEADLINE_DAYS = 15;
export const MAX_DEADLINE_DAYS = 90;

export const LIMITS = {
  businessName: 60,
  businessDescription: 250,
  branchName: 60,
  couponDescription: 80,
  couponConditions: 150,
  branchesMin: 2,
  branchesMax: 20,
  couponQtyMin: 5,
  couponQtyMax: 500,
  percentMin: 5,
  percentMax: 100,
  fixedMin: 500,
} as const;

export const HANDLE_RE = /^[A-Za-z0-9._]{1,30}$/;
export const NAME_RE = /^[\p{L} ]+$/u;
export const WHATSAPP_RE = /^\d{8}$/;

export type BusinessCategory = { value: string; es: string; en: string };

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
  { value: "Escuela de Manejo", es: "Escuela de Manejo", en: "Driving School" },
  { value: "Alquiler de Vehículo COSEVI", es: "Alquiler de Vehículo COSEVI", en: "COSEVI Vehicle Rental" },
  { value: "Restaurante", es: "Restaurante", en: "Restaurant" },
  { value: "Hamburguesería", es: "Hamburguesería", en: "Burger Joint" },
  { value: "Café / Heladería", es: "Café / Heladería", en: "Café / Ice Cream" },
  { value: "Comida Rápida", es: "Comida Rápida", en: "Fast Food" },
  { value: "Delivery / Dark Kitchen", es: "Delivery / Dark Kitchen", en: "Delivery / Dark Kitchen" },
  { value: "Tecnología", es: "Tecnología", en: "Technology" },
  { value: "Ropa / Boutique", es: "Ropa / Boutique", en: "Clothing / Boutique" },
  { value: "Calzado", es: "Calzado", en: "Footwear" },
  { value: "Barbería / Salón", es: "Barbería / Salón", en: "Barber / Salon" },
  { value: "Gimnasio / Fitness", es: "Gimnasio / Fitness", en: "Gym / Fitness" },
  { value: "Academia de Idiomas", es: "Academia de Idiomas", en: "Language Academy" },
  { value: "Librería / Papelería", es: "Librería / Papelería", en: "Bookstore / Stationery" },
  { value: "Óptica", es: "Óptica", en: "Optical" },
  { value: "Entretenimiento", es: "Entretenimiento", en: "Entertainment" },
  { value: "Fotografía", es: "Fotografía", en: "Photography" },
  { value: "Salud / Bienestar", es: "Salud / Bienestar", en: "Health / Wellness" },
  { value: "Supermercado", es: "Supermercado", en: "Supermarket" },
  { value: "Otro", es: "Otro", en: "Other" },
];

// ⚠️ Verificar contra fuente oficial antes de lanzar (PRD §3.3 / spec §9).
export const GAM_CANTONS: string[] = [
  "San José", "Escazú", "Desamparados", "Aserrí", "Mora", "Goicoechea",
  "Santa Ana", "Alajuelita", "Vázquez de Coronado", "Tibás", "Moravia",
  "Montes de Oca", "Curridabat",
  "Alajuela", "Atenas", "Poás",
  "Cartago", "Paraíso", "La Unión", "Oreamuno", "El Guarco",
  "Heredia", "Barva", "Santo Domingo", "Santa Bárbara", "San Rafael",
  "San Isidro", "Belén", "Flores", "San Pablo",
];
```

- [ ] **Step 2: Verificar conteos con un test temporal** (TDD: probamos invariantes de datos)

Create `src/app/[locale]/(kodi)/partners/registro/data.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { BUSINESS_CATEGORIES, GAM_CANTONS } from "./data";

describe("data", () => {
  it("tiene 20 categorías con value único", () => {
    expect(BUSINESS_CATEGORIES).toHaveLength(20);
    expect(new Set(BUSINESS_CATEGORIES.map((c) => c.value)).size).toBe(20);
  });
  it("tiene 30 cantones GAM únicos", () => {
    expect(GAM_CANTONS).toHaveLength(30);
    expect(new Set(GAM_CANTONS).size).toBe(30);
  });
});
```

- [ ] **Step 3: Ejecutar**

Run: `npm test`
Expected: PASS, 2 tests.

- [ ] **Step 4: Commit**

```bash
git add "src/app/[locale]/(kodi)/partners/registro/data.ts" "src/app/[locale]/(kodi)/partners/registro/data.test.ts"
git commit -m "✨ feat: datos de categorías, cantones GAM y constantes"
```

### Task C.2: Esquema Zod (TDD)

**Files:**
- Create: `src/app/[locale]/(kodi)/partners/registro/schema.ts`
- Test: `src/app/[locale]/(kodi)/partners/registro/schema.test.ts`

- [ ] **Step 1: Escribir los tests primero**

Create `src/app/[locale]/(kodi)/partners/registro/schema.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { partnerSchema } from "./schema";

function isoInDays(days: number): string {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

const base = {
  business: {
    name: "Soda La Esquina",
    category: "Restaurante",
    canton: "San José",
    website: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    description: "Comida casera tica.",
    hasMultipleBranches: "no" as const,
  },
  branches: [],
  contact: {
    fullName: "Ana Jiménez",
    role: "Dueña",
    email: "ana@example.com",
    whatsapp: "88887777",
  },
  coupon: {
    discountType: "percentage" as const,
    discountValue: 20,
    description: "20% en cualquier plato",
    quantity: 50,
    deadline: isoInDays(30),
    branchesScope: [],
    conditions: "",
  },
  confirmation: { accepted: true },
  honeypot: "",
};

describe("partnerSchema", () => {
  it("acepta un registro válido sin sucursales", () => {
    expect(partnerSchema.safeParse(base).success).toBe(true);
  });

  it("rechaza nombre comercial > 60", () => {
    const v = { ...base, business: { ...base.business, name: "x".repeat(61) } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });

  it("rechaza WhatsApp que no son 8 dígitos", () => {
    const v = { ...base, contact: { ...base.contact, whatsapp: "1234" } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });

  it("rechaza nombre completo con números", () => {
    const v = { ...base, contact: { ...base.contact, fullName: "Ana 99" } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });

  it("acepta nombre con tildes y ñ", () => {
    const v = { ...base, contact: { ...base.contact, fullName: "Íñigo Núñez" } };
    expect(partnerSchema.safeParse(v).success).toBe(true);
  });

  it("rechaza porcentaje fuera de 5-100", () => {
    const v = { ...base, coupon: { ...base.coupon, discountType: "percentage", discountValue: 4 } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });

  it("rechaza monto fijo < 500", () => {
    const v = { ...base, coupon: { ...base.coupon, discountType: "fixed", discountValue: 499 } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });

  it("acepta monto fijo >= 500", () => {
    const v = { ...base, coupon: { ...base.coupon, discountType: "fixed", discountValue: 500 } };
    expect(partnerSchema.safeParse(v).success).toBe(true);
  });

  it("rechaza fecha límite a menos de 15 días", () => {
    const v = { ...base, coupon: { ...base.coupon, deadline: isoInDays(10) } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });

  it("rechaza fecha límite a más de 90 días", () => {
    const v = { ...base, coupon: { ...base.coupon, deadline: isoInDays(120) } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });

  it("rechaza cantidad de cupones fuera de 5-500", () => {
    const v = { ...base, coupon: { ...base.coupon, quantity: 4 } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });

  it("exige >=2 sucursales cuando hasMultipleBranches=yes", () => {
    const v = {
      ...base,
      business: { ...base.business, hasMultipleBranches: "yes" },
      branches: [{ name: "Local 1", canton: "San José", address: "" }],
    };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });

  it("exige branchesScope cuando hay sucursales", () => {
    const v = {
      ...base,
      business: { ...base.business, hasMultipleBranches: "yes" },
      branches: [
        { name: "Local 1", canton: "San José", address: "" },
        { name: "Local 2", canton: "Heredia", address: "" },
      ],
      coupon: { ...base.coupon, branchesScope: [] },
    };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });

  it("acepta yes con 2 sucursales y branchesScope no vacío", () => {
    const v = {
      ...base,
      business: { ...base.business, hasMultipleBranches: "yes" },
      branches: [
        { name: "Local 1", canton: "San José", address: "" },
        { name: "Local 2", canton: "Heredia", address: "Centro" },
      ],
      coupon: { ...base.coupon, branchesScope: ["Local 1"] },
    };
    expect(partnerSchema.safeParse(v).success).toBe(true);
  });

  it("rechaza si confirmation.accepted es false", () => {
    const v = { ...base, confirmation: { accepted: false } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });

  it("rechaza si el honeypot viene lleno", () => {
    const v = { ...base, honeypot: "bot" };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });

  it("rechaza website con formato inválido", () => {
    const v = { ...base, business: { ...base.business, website: "no-es-url" } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });
});
```

- [ ] **Step 2: Ejecutar para ver fallar**

Run: `npm test -- schema`
Expected: FAIL ("Cannot find module './schema'").

- [ ] **Step 3: Implementar `schema.ts`**

```typescript
import { z } from "zod";
import {
  LIMITS,
  HANDLE_RE,
  NAME_RE,
  WHATSAPP_RE,
  MIN_DEADLINE_DAYS,
  MAX_DEADLINE_DAYS,
  BUSINESS_CATEGORIES,
  GAM_CANTONS,
} from "./data";

const optionalUrl = z
  .string()
  .trim()
  .refine((v) => v === "" || z.string().url().safeParse(v).success, {
    message: "invalid_url",
  });

const optionalHandle = z
  .string()
  .trim()
  .transform((v) => v.replace(/^@/, ""))
  .refine((v) => v === "" || HANDLE_RE.test(v), { message: "invalid_handle" });

const categoryValues = BUSINESS_CATEGORIES.map((c) => c.value);

const businessSchema = z.object({
  name: z.string().trim().min(1).max(LIMITS.businessName),
  category: z.string().refine((v) => categoryValues.includes(v), {
    message: "invalid_category",
  }),
  canton: z.string().refine((v) => GAM_CANTONS.includes(v), {
    message: "invalid_canton",
  }),
  website: optionalUrl,
  instagram: optionalHandle,
  facebook: optionalUrl,
  tiktok: optionalHandle,
  description: z.string().trim().min(1).max(LIMITS.businessDescription),
  hasMultipleBranches: z.enum(["yes", "no"]),
});

const branchSchema = z.object({
  name: z.string().trim().min(1).max(LIMITS.branchName),
  canton: z.string().refine((v) => GAM_CANTONS.includes(v), {
    message: "invalid_canton",
  }),
  address: z.string().trim().max(200).optional().default(""),
});

const contactSchema = z.object({
  fullName: z.string().trim().min(1).regex(NAME_RE, { message: "name_letters_only" }),
  role: z.string().trim().min(1).max(80),
  email: z.string().trim().email(),
  whatsapp: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, ""))
    .refine((v) => WHATSAPP_RE.test(v), { message: "invalid_whatsapp" }),
});

const couponSchema = z.object({
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z
    .number({ invalid_type_error: "required" })
    .refine(Number.isFinite, { message: "required" }),
  description: z.string().trim().min(1).max(LIMITS.couponDescription),
  quantity: z
    .number({ invalid_type_error: "required" })
    .int()
    .min(LIMITS.couponQtyMin)
    .max(LIMITS.couponQtyMax),
  deadline: z.string().refine((v) => /^\d{4}-\d{2}-\d{2}$/.test(v), {
    message: "required",
  }),
  branchesScope: z.array(z.string()).default([]),
  conditions: z.string().trim().max(LIMITS.couponConditions).optional().default(""),
});

function deadlineWindow(): { min: Date; max: Date } {
  const min = new Date();
  min.setUTCHours(0, 0, 0, 0);
  min.setUTCDate(min.getUTCDate() + MIN_DEADLINE_DAYS);
  const max = new Date();
  max.setUTCHours(0, 0, 0, 0);
  max.setUTCDate(max.getUTCDate() + MAX_DEADLINE_DAYS);
  return { min, max };
}

export const partnerSchema = z
  .object({
    business: businessSchema,
    branches: z.array(branchSchema).default([]),
    contact: contactSchema,
    coupon: couponSchema,
    confirmation: z.object({
      accepted: z.literal(true, {
        errorMap: () => ({ message: "must_accept" }),
      }),
    }),
    honeypot: z.string().max(0, { message: "spam" }).default(""),
  })
  .superRefine((data, ctx) => {
    const multi = data.business.hasMultipleBranches === "yes";

    if (multi) {
      if (data.branches.length < LIMITS.branchesMin) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["branches"],
          message: "branches_min",
        });
      }
      if (data.branches.length > LIMITS.branchesMax) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["branches"],
          message: "branches_max",
        });
      }
      if (data.coupon.branchesScope.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["coupon", "branchesScope"],
          message: "scope_required",
        });
      }
    }

    const { discountType, discountValue } = data.coupon;
    if (discountType === "percentage") {
      if (discountValue < LIMITS.percentMin || discountValue > LIMITS.percentMax) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["coupon", "discountValue"],
          message: "percent_range",
        });
      }
    } else if (discountValue < LIMITS.fixedMin) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["coupon", "discountValue"],
        message: "fixed_min",
      });
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(data.coupon.deadline)) {
      const d = new Date(`${data.coupon.deadline}T00:00:00.000Z`);
      const { min, max } = deadlineWindow();
      if (d < min || d > max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["coupon", "deadline"],
          message: "deadline_window",
        });
      }
    }
  });

export type PartnerFormValues = z.infer<typeof partnerSchema>;
```

- [ ] **Step 4: Ejecutar hasta PASS**

Run: `npm test -- schema`
Expected: PASS, todos los tests del bloque `partnerSchema`.

- [ ] **Step 5: Commit**

```bash
git add "src/app/[locale]/(kodi)/partners/registro/schema.ts" "src/app/[locale]/(kodi)/partners/registro/schema.test.ts"
git commit -m "✨ feat: esquema Zod de registro de partners (TDD)"
```

### Task C.3: Validación de archivos (TDD)

**Files:**
- Create: `src/lib/file-validation.ts`
- Test: `src/lib/file-validation.test.ts`

- [ ] **Step 1: Escribir tests**

Create `src/lib/file-validation.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { validateUpload } from "./file-validation";
import { MAX_LOGO_BYTES } from "@/app/[locale]/(kodi)/partners/registro/data";

function fakeFile(name: string, type: string, size: number): File {
  const blob = new Blob([new Uint8Array(1)], { type });
  Object.defineProperty(blob, "size", { value: size });
  return new File([blob], name, { type });
}

describe("validateUpload", () => {
  it("acepta PNG de logo dentro de tamaño", () => {
    const r = validateUpload(fakeFile("logo.png", "image/png", 1000), {
      accept: ["image/png", "image/svg+xml"],
      maxBytes: MAX_LOGO_BYTES,
      required: true,
    });
    expect(r.ok).toBe(true);
  });

  it("rechaza tipo no permitido", () => {
    const r = validateUpload(fakeFile("logo.gif", "image/gif", 1000), {
      accept: ["image/png", "image/svg+xml"],
      maxBytes: MAX_LOGO_BYTES,
      required: true,
    });
    expect(r.ok).toBe(false);
    expect(r.error).toBe("invalid_type");
  });

  it("rechaza archivo demasiado grande", () => {
    const r = validateUpload(fakeFile("logo.png", "image/png", MAX_LOGO_BYTES + 1), {
      accept: ["image/png", "image/svg+xml"],
      maxBytes: MAX_LOGO_BYTES,
      required: true,
    });
    expect(r.ok).toBe(false);
    expect(r.error).toBe("too_large");
  });

  it("rechaza ausencia cuando es requerido", () => {
    const r = validateUpload(null, {
      accept: ["image/png"],
      maxBytes: MAX_LOGO_BYTES,
      required: true,
    });
    expect(r.ok).toBe(false);
    expect(r.error).toBe("required");
  });

  it("acepta ausencia cuando es opcional", () => {
    const r = validateUpload(null, {
      accept: ["image/png"],
      maxBytes: MAX_LOGO_BYTES,
      required: false,
    });
    expect(r.ok).toBe(true);
  });
});
```

- [ ] **Step 2: Ejecutar para ver fallar**

Run: `npm test -- file-validation`
Expected: FAIL ("Cannot find module './file-validation'").

- [ ] **Step 3: Implementar `src/lib/file-validation.ts`**

```typescript
export type UploadRule = {
  accept: string[];
  maxBytes: number;
  required: boolean;
};

export type UploadResult =
  | { ok: true }
  | { ok: false; error: "required" | "invalid_type" | "too_large" };

export function validateUpload(
  file: File | null | undefined,
  rule: UploadRule,
): UploadResult {
  if (!file || file.size === 0) {
    return rule.required ? { ok: false, error: "required" } : { ok: true };
  }
  if (!rule.accept.includes(file.type)) {
    return { ok: false, error: "invalid_type" };
  }
  if (file.size > rule.maxBytes) {
    return { ok: false, error: "too_large" };
  }
  return { ok: true };
}

// Solo cliente: verifica dimensiones mínimas de un PNG. SVG se acepta como vector.
export function getImageMinPxOk(
  file: File,
  minPx: number,
): Promise<boolean> {
  if (file.type === "image/svg+xml") return Promise.resolve(true);
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img.naturalWidth >= minPx && img.naturalHeight >= minPx);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(false);
    };
    img.src = url;
  });
}
```

- [ ] **Step 4: Ejecutar hasta PASS**

Run: `npm test -- file-validation`
Expected: PASS, 5 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/file-validation.ts src/lib/file-validation.test.ts
git commit -m "✨ feat: validación de uploads de logo y foto (TDD)"
```

### Task C.4: Helper de email (TDD)

**Files:**
- Create: `src/lib/email.ts`
- Test: `src/lib/email.test.ts`

- [ ] **Step 1: Escribir tests (solo `escapeHtml`; `sendBrevoEmail` se prueba por integración manual)**

Create `src/lib/email.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { escapeHtml } from "./email";

describe("escapeHtml", () => {
  it("escapa caracteres peligrosos", () => {
    expect(escapeHtml(`<b>"a"&'b'</b>`)).toBe(
      "&lt;b&gt;&quot;a&quot;&amp;&#39;b&#39;&lt;/b&gt;",
    );
  });
  it("deja texto plano intacto", () => {
    expect(escapeHtml("Soda La Esquina")).toBe("Soda La Esquina");
  });
});
```

- [ ] **Step 2: Ejecutar para ver fallar**

Run: `npm test -- email`
Expected: FAIL ("Cannot find module './email'").

- [ ] **Step 3: Implementar `src/lib/email.ts`**

```typescript
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type BrevoAttachment = { name: string; content: string };

export type BrevoEmailInput = {
  to: { email: string; name?: string };
  replyTo?: { email: string; name?: string };
  subject: string;
  htmlContent: string;
  attachments?: BrevoAttachment[];
};

export async function sendBrevoEmail(
  input: BrevoEmailInput,
): Promise<{ ok: boolean }> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !senderEmail) return { ok: false };

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: "Kódi", email: senderEmail },
      to: [input.to],
      ...(input.replyTo ? { replyTo: input.replyTo } : {}),
      subject: input.subject,
      htmlContent: input.htmlContent,
      ...(input.attachments && input.attachments.length
        ? { attachment: input.attachments }
        : {}),
    }),
  });

  return { ok: res.ok };
}
```

- [ ] **Step 4: Ejecutar hasta PASS**

Run: `npm test -- email`
Expected: PASS, 2 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/email.ts src/lib/email.test.ts
git commit -m "✨ feat: helper de email Brevo con escapeHtml (TDD)"
```

### Task C.5: Server action de envío

**Files:**
- Create: `src/app/actions/partners.ts`

- [ ] **Step 1: Implementar `src/app/actions/partners.ts`**

```typescript
"use server";

import { partnerSchema } from "@/app/[locale]/(kodi)/partners/registro/schema";
import {
  MAX_LOGO_BYTES,
  MAX_PHOTO_BYTES,
} from "@/app/[locale]/(kodi)/partners/registro/data";
import { validateUpload } from "@/lib/file-validation";
import { escapeHtml, sendBrevoEmail, type BrevoAttachment } from "@/lib/email";

export type SubmitResult =
  | { success: true }
  | { success: false; error: "validation" | "server_config" | "send_failed" };

async function fileToAttachment(
  file: File,
  fallbackName: string,
): Promise<BrevoAttachment> {
  const buf = Buffer.from(await file.arrayBuffer());
  return { name: file.name || fallbackName, content: buf.toString("base64") };
}

export async function submitPartnerRegistration(
  formData: FormData,
): Promise<SubmitResult> {
  const raw = formData.get("payload");
  if (typeof raw !== "string") return { success: false, error: "validation" };

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(raw);
  } catch {
    return { success: false, error: "validation" };
  }

  const parsed = partnerSchema.safeParse(parsedJson);
  if (!parsed.success) return { success: false, error: "validation" };

  const honeypotOk = parsed.data.honeypot === "";
  if (!honeypotOk) return { success: true }; // descarta bots en silencio

  const logo = formData.get("logo");
  const photo = formData.get("photo");

  const logoCheck = validateUpload(logo instanceof File ? logo : null, {
    accept: ["image/png", "image/svg+xml"],
    maxBytes: MAX_LOGO_BYTES,
    required: true,
  });
  if (!logoCheck.ok) return { success: false, error: "validation" };

  const photoCheck = validateUpload(photo instanceof File ? photo : null, {
    accept: ["image/jpeg", "image/png"],
    maxBytes: MAX_PHOTO_BYTES,
    required: false,
  });
  if (!photoCheck.ok) return { success: false, error: "validation" };

  const recipient = process.env.PARTNER_RECIPIENT;
  if (!recipient || !process.env.BREVO_API_KEY || !process.env.BREVO_SENDER_EMAIL) {
    return { success: false, error: "server_config" };
  }

  const d = parsed.data;
  const localeRaw = formData.get("locale");
  const locale = localeRaw === "en" ? "en" : "es";

  const attachments: BrevoAttachment[] = [];
  if (logo instanceof File && logo.size > 0) {
    attachments.push(await fileToAttachment(logo, "logo"));
  }
  if (photo instanceof File && photo.size > 0) {
    attachments.push(await fileToAttachment(photo, "foto"));
  }

  const branchesHtml =
    d.business.hasMultipleBranches === "yes"
      ? d.branches
          .map(
            (b) =>
              `<li>${escapeHtml(b.name)} — ${escapeHtml(b.canton)}${
                b.address ? ` (${escapeHtml(b.address)})` : ""
              }</li>`,
          )
          .join("")
      : "<li>Una sola ubicación</li>";

  const teamHtml = `
    <h2>Nuevo registro de partner</h2>
    <h3>Negocio</h3>
    <p><strong>Nombre:</strong> ${escapeHtml(d.business.name)}</p>
    <p><strong>Categoría:</strong> ${escapeHtml(d.business.category)}</p>
    <p><strong>Cantón:</strong> ${escapeHtml(d.business.canton)}</p>
    <p><strong>Sitio:</strong> ${escapeHtml(d.business.website || "-")}</p>
    <p><strong>Instagram:</strong> ${escapeHtml(d.business.instagram || "-")}</p>
    <p><strong>Facebook:</strong> ${escapeHtml(d.business.facebook || "-")}</p>
    <p><strong>TikTok:</strong> ${escapeHtml(d.business.tiktok || "-")}</p>
    <p><strong>Descripción:</strong> ${escapeHtml(d.business.description)}</p>
    <h3>Sucursales</h3><ul>${branchesHtml}</ul>
    <h3>Contacto</h3>
    <p><strong>Nombre:</strong> ${escapeHtml(d.contact.fullName)}</p>
    <p><strong>Cargo:</strong> ${escapeHtml(d.contact.role)}</p>
    <p><strong>Email:</strong> ${escapeHtml(d.contact.email)}</p>
    <p><strong>WhatsApp:</strong> ${escapeHtml(d.contact.whatsapp)}</p>
    <h3>Cupón</h3>
    <p><strong>Tipo:</strong> ${escapeHtml(d.coupon.discountType)}</p>
    <p><strong>Valor:</strong> ${escapeHtml(String(d.coupon.discountValue))}</p>
    <p><strong>Descripción:</strong> ${escapeHtml(d.coupon.description)}</p>
    <p><strong>Cantidad:</strong> ${escapeHtml(String(d.coupon.quantity))}</p>
    <p><strong>Fecha límite:</strong> ${escapeHtml(d.coupon.deadline)}</p>
    <p><strong>Aplica en:</strong> ${escapeHtml(
      d.coupon.branchesScope.length ? d.coupon.branchesScope.join(", ") : "Todas / única",
    )}</p>
    <p><strong>Condiciones:</strong> ${escapeHtml(d.coupon.conditions || "-")}</p>
  `;

  const teamRes = await sendBrevoEmail({
    to: { email: recipient },
    replyTo: { email: d.contact.email, name: d.contact.fullName },
    subject: `Nuevo partner: ${d.business.name}`,
    htmlContent: teamHtml,
    attachments,
  });
  if (!teamRes.ok) return { success: false, error: "send_failed" };

  const confirmEs = `
    <h2>¡Recibimos tu registro, ${escapeHtml(d.business.name)}!</h2>
    <p>Entendemos que el primer mes es completamente gratuito y sin compromiso posterior. Al finalizar recibirás un reporte de resultados.</p>
    <p>Nuestro equipo te contactará pronto al WhatsApp ${escapeHtml(d.contact.whatsapp)}.</p>
    <p>— Equipo Kódi</p>
  `;
  const confirmEn = `
    <h2>We got your registration, ${escapeHtml(d.business.name)}!</h2>
    <p>You understand the first month is completely free with no further commitment. At the end you will receive a results report.</p>
    <p>Our team will contact you soon at WhatsApp ${escapeHtml(d.contact.whatsapp)}.</p>
    <p>— Kódi Team</p>
  `;

  await sendBrevoEmail({
    to: { email: d.contact.email, name: d.contact.fullName },
    subject: locale === "en" ? "Kódi — registration received" : "Kódi — registro recibido",
    htmlContent: locale === "en" ? confirmEn : confirmEs,
  });

  return { success: true };
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/app/actions/partners.ts
git commit -m "✨ feat: server action de registro de partners (Brevo + adjuntos)"
```

---

## Fase D — i18n

### Task D.1: Namespace `Partners` en es.json y en.json

**Files:**
- Modify: `src/messages/es.json`
- Modify: `src/messages/en.json`

- [ ] **Step 1: Agregar a `src/messages/es.json`** la siguiente propiedad de primer nivel (dentro del objeto raíz, agregando la coma necesaria respecto a la propiedad previa):

```json
"Partners": {
  "meta": { "title": "Sé partner de Kódi", "description": "Registrá tu negocio como partner de Kódi y llegá a estudiantes de todo el país." },
  "header": { "title": "Registrá tu negocio", "subtitle": "Llená el formulario y nuestro equipo te contacta para activarte." },
  "sections": {
    "business": "Datos del negocio",
    "branches": "Sucursales",
    "contact": "Datos del contacto",
    "coupon": "Configuración del cupón",
    "media": "Materiales visuales",
    "confirmation": "Confirmación y envío"
  },
  "fields": {
    "name": "Nombre comercial",
    "category": "Categoría del negocio",
    "categoryPlaceholder": "Elegí una categoría",
    "canton": "Zona / cantón principal",
    "cantonPlaceholder": "Elegí un cantón",
    "website": "Sitio web",
    "instagram": "Instagram (sin @)",
    "facebook": "Facebook",
    "tiktok": "TikTok (sin @)",
    "description": "Descripción del negocio",
    "hasMultipleBranches": "¿Tiene más de una sucursal?",
    "yes": "Sí",
    "no": "No",
    "branchName": "Nombre de la sucursal",
    "branchCanton": "Zona / cantón",
    "branchAddress": "Dirección exacta",
    "addBranch": "+ Agregar sucursal",
    "removeBranch": "Eliminar sucursal",
    "fullName": "Nombre completo",
    "role": "Cargo",
    "email": "Correo electrónico",
    "whatsapp": "WhatsApp",
    "discountType": "Tipo de descuento",
    "percentage": "Porcentaje (%)",
    "fixed": "Monto fijo (₡)",
    "discountValue": "Valor del descuento",
    "couponDescription": "Descripción del cupón",
    "quantity": "Cantidad de cupones",
    "deadline": "Fecha límite de canje",
    "branchesScope": "¿En cuáles sucursales aplica?",
    "allBranches": "Todas las sucursales",
    "conditions": "Condiciones adicionales",
    "logo": "Logo",
    "logoHint": "PNG o SVG con fondo transparente. Máx. 2MB. Mínimo 400x400px.",
    "photo": "Foto del negocio o producto",
    "photoHint": "JPG o PNG. Máx. 5MB.",
    "photoNudge": "Los partners con foto reciben 3x más clics dentro de la app",
    "accept": "Entiendo que el primer mes es completamente gratuito y sin compromiso posterior. Al finalizar recibiré un reporte de resultados.",
    "submit": "Enviar registro",
    "submitting": "Enviando…",
    "submitDisabled": "Aceptá los términos para enviar"
  },
  "errors": {
    "required": "Campo obligatorio",
    "max": "Excede el máximo permitido",
    "invalid_url": "URL inválida",
    "invalid_handle": "Usuario inválido (solo letras, números, punto y guion bajo)",
    "name_letters_only": "Solo letras y espacios",
    "invalid_whatsapp": "Deben ser exactamente 8 dígitos",
    "percent_range": "El porcentaje debe estar entre 5 y 100",
    "fixed_min": "El monto fijo mínimo es 500 colones",
    "deadline_window": "La fecha debe estar entre 15 y 90 días desde hoy",
    "branches_min": "Mínimo 2 sucursales",
    "branches_max": "Máximo 20 sucursales",
    "scope_required": "Elegí al menos una sucursal",
    "must_accept": "Debés aceptar los términos",
    "file_required": "Subí el logo",
    "file_invalid_type": "Tipo de archivo no permitido",
    "file_too_large": "El archivo es muy grande",
    "file_dimensions": "El logo debe ser al menos 400x400px",
    "submit_failed": "No se pudo enviar. Intentá de nuevo."
  },
  "success": {
    "title": "¡Listo! Recibimos tu registro",
    "body": "Nuestro equipo te contacta pronto para activarte. El primer mes es gratis y sin compromiso."
  }
}
```

- [ ] **Step 2: Agregar a `src/messages/en.json`** la propiedad equivalente:

```json
"Partners": {
  "meta": { "title": "Become a Kódi partner", "description": "Register your business as a Kódi partner and reach students across the country." },
  "header": { "title": "Register your business", "subtitle": "Fill the form and our team will contact you to activate you." },
  "sections": {
    "business": "Business details",
    "branches": "Branches",
    "contact": "Contact details",
    "coupon": "Coupon setup",
    "media": "Visual materials",
    "confirmation": "Confirmation and submit"
  },
  "fields": {
    "name": "Business name",
    "category": "Business category",
    "categoryPlaceholder": "Choose a category",
    "canton": "Main zone / canton",
    "cantonPlaceholder": "Choose a canton",
    "website": "Website",
    "instagram": "Instagram (no @)",
    "facebook": "Facebook",
    "tiktok": "TikTok (no @)",
    "description": "Business description",
    "hasMultipleBranches": "More than one branch?",
    "yes": "Yes",
    "no": "No",
    "branchName": "Branch name",
    "branchCanton": "Zone / canton",
    "branchAddress": "Exact address",
    "addBranch": "+ Add branch",
    "removeBranch": "Remove branch",
    "fullName": "Full name",
    "role": "Role",
    "email": "Email",
    "whatsapp": "WhatsApp",
    "discountType": "Discount type",
    "percentage": "Percentage (%)",
    "fixed": "Fixed amount (₡)",
    "discountValue": "Discount value",
    "couponDescription": "Coupon description",
    "quantity": "Coupon quantity",
    "deadline": "Redemption deadline",
    "branchesScope": "Which branches does it apply to?",
    "allBranches": "All branches",
    "conditions": "Additional conditions",
    "logo": "Logo",
    "logoHint": "PNG or SVG with transparent background. Max 2MB. Minimum 400x400px.",
    "photo": "Business or product photo",
    "photoHint": "JPG or PNG. Max 5MB.",
    "photoNudge": "Partners with a photo get 3x more clicks in the app",
    "accept": "I understand the first month is completely free with no further commitment. At the end I will receive a results report.",
    "submit": "Submit registration",
    "submitting": "Submitting…",
    "submitDisabled": "Accept the terms to submit"
  },
  "errors": {
    "required": "Required field",
    "max": "Exceeds the allowed maximum",
    "invalid_url": "Invalid URL",
    "invalid_handle": "Invalid handle (letters, numbers, dot and underscore only)",
    "name_letters_only": "Letters and spaces only",
    "invalid_whatsapp": "Must be exactly 8 digits",
    "percent_range": "Percentage must be between 5 and 100",
    "fixed_min": "Minimum fixed amount is 500 colones",
    "deadline_window": "Date must be between 15 and 90 days from today",
    "branches_min": "Minimum 2 branches",
    "branches_max": "Maximum 20 branches",
    "scope_required": "Pick at least one branch",
    "must_accept": "You must accept the terms",
    "file_required": "Upload the logo",
    "file_invalid_type": "File type not allowed",
    "file_too_large": "File is too large",
    "file_dimensions": "Logo must be at least 400x400px",
    "submit_failed": "Could not submit. Try again."
  },
  "success": {
    "title": "Done! We received your registration",
    "body": "Our team will contact you soon to activate you. The first month is free with no commitment."
  }
}
```

- [ ] **Step 3: Validar JSON**

Run: `node -e "require('./src/messages/es.json');require('./src/messages/en.json');console.log('ok')"`
Expected: imprime `ok` (JSON válido en ambos).

- [ ] **Step 4: Commit**

```bash
git add src/messages/es.json src/messages/en.json
git commit -m "🌐 feat: i18n del formulario de partners (ES/EN)"
```

---

## Fase E — Primitivas de campo

### Task E.1: Primitiva `Field` (label + ayuda + error)

**Files:**
- Create: `src/app/[locale]/(kodi)/partners/registro/fields/field.tsx`

- [ ] **Step 1: Crear `fields/field.tsx`**

```tsx
"use client";

import { useId } from "react";

export function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: (ids: { id: string; describedBy?: string }) => React.ReactNode;
}) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[var(--kodi-ink)]">
        {label}
        {required && <span className="ml-0.5 text-[var(--kodi-coral)]">*</span>}
      </label>
      {hint && (
        <p id={hintId} className="text-xs text-[var(--kodi-ink-soft)]">
          {hint}
        </p>
      )}
      {children({ id, describedBy })}
      {error && (
        <p id={errId} role="alert" className="text-xs text-[var(--kodi-coral)]">
          {error}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add "src/app/[locale]/(kodi)/partners/registro/fields/field.tsx"
git commit -m "✨ feat: primitiva Field con a11y (label/hint/error)"
```

### Task E.2: Primitivas de input, textarea con contador, select, radio, checkbox, file, date

**Files:**
- Create: `src/app/[locale]/(kodi)/partners/registro/fields/inputs.tsx`

- [ ] **Step 1: Crear `fields/inputs.tsx`** (todas las primitivas controladas; estilo Kódi; foco teal)

```tsx
"use client";

import { forwardRef } from "react";

const base =
  "w-full rounded-lg border border-[var(--kodi-border)] bg-[var(--kodi-surface-2)] px-3 py-2 text-sm text-[var(--kodi-ink)] outline-none transition-[border-color,box-shadow] duration-150 focus-visible:border-[var(--kodi-teal)] focus-visible:ring-2 focus-visible:ring-[var(--kodi-ring)]/40 disabled:opacity-50";

export const TextInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(function TextInput(props, ref) {
  return <input ref={ref} className={base} {...props} />;
});

export const DateInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(function DateInput(props, ref) {
  return <input ref={ref} type="date" className={base} {...props} />;
});

export const Select = forwardRef<
  HTMLSelectElement,
  React.ComponentProps<"select">
>(function Select(props, ref) {
  return <select ref={ref} className={base} {...props} />;
});

export function TextareaCounter({
  value,
  max,
  ...props
}: React.ComponentProps<"textarea"> & { value: string; max: number }) {
  return (
    <div className="flex flex-col gap-1">
      <textarea
        className={`${base} min-h-24 resize-y`}
        maxLength={max}
        value={value}
        {...props}
      />
      <span aria-live="polite" className="self-end text-xs text-[var(--kodi-ink-soft)]">
        {value.length}/{max}
      </span>
    </div>
  );
}

export function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
  error,
}: {
  legend: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <fieldset className="flex flex-col gap-1.5">
      <legend className="text-sm font-medium text-[var(--kodi-ink)]">
        {legend}
      </legend>
      <div className="flex gap-4">
        {options.map((o) => (
          <label key={o.value} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="accent-[var(--kodi-teal)]"
            />
            {o.label}
          </label>
        ))}
      </div>
      {error && (
        <p role="alert" className="text-xs text-[var(--kodi-coral)]">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function CheckboxGroup({
  legend,
  options,
  selected,
  onToggle,
  allLabel,
  onToggleAll,
  error,
}: {
  legend: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  allLabel: string;
  onToggleAll: (checked: boolean) => void;
  error?: string;
}) {
  const allChecked = options.length > 0 && selected.length === options.length;
  return (
    <fieldset className="flex flex-col gap-1.5">
      <legend className="text-sm font-medium text-[var(--kodi-ink)]">
        {legend}
      </legend>
      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={allChecked}
          onChange={(e) => onToggleAll(e.target.checked)}
          className="accent-[var(--kodi-teal)]"
        />
        {allLabel}
      </label>
      <div className="flex flex-col gap-1 pl-1">
        {options.map((o) => (
          <label key={o} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selected.includes(o)}
              onChange={() => onToggle(o)}
              className="accent-[var(--kodi-teal)]"
            />
            {o}
          </label>
        ))}
      </div>
      {error && (
        <p role="alert" className="text-xs text-[var(--kodi-coral)]">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function FileInput({
  accept,
  onChange,
  fileName,
  ...props
}: Omit<React.ComponentProps<"input">, "type" | "onChange"> & {
  accept: string;
  onChange: (file: File | null) => void;
  fileName?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <label className="cursor-pointer rounded-lg border border-[var(--kodi-border)] bg-[var(--kodi-surface-2)] px-3 py-2 text-sm transition-transform duration-150 active:scale-[0.97]">
        <input
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          {...props}
        />
        {fileName ? fileName : "Seleccionar archivo"}
      </label>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add "src/app/[locale]/(kodi)/partners/registro/fields/inputs.tsx"
git commit -m "✨ feat: primitivas de campo Kódi (input, select, radio, checkbox, file, date)"
```

---

## Fase F — Formulario

### Task F.1: Orquestador `partner-form.tsx`

**Files:**
- Create: `src/app/[locale]/(kodi)/partners/registro/partner-form.tsx`

- [ ] **Step 1: Crear el orquestador** (RHF + Zod, secciones, submit, estados)

```tsx
"use client";

import { useState, useTransition } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { partnerSchema, type PartnerFormValues } from "./schema";
import {
  MAX_LOGO_BYTES,
  MAX_PHOTO_BYTES,
  LOGO_MIN_PX,
} from "./data";
import { validateUpload, getImageMinPxOk } from "@/lib/file-validation";
import { submitPartnerRegistration } from "@/app/actions/partners";
import { BusinessSection } from "./sections/business-section";
import { BranchesSection } from "./sections/branches-section";
import { ContactSection } from "./sections/contact-section";
import { CouponSection } from "./sections/coupon-section";
import { MediaSection } from "./sections/media-section";
import { ConfirmationSection } from "./sections/confirmation-section";

const DEFAULTS: PartnerFormValues = {
  business: {
    name: "",
    category: "",
    canton: "",
    website: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    description: "",
    hasMultipleBranches: "no",
  },
  branches: [],
  contact: { fullName: "", role: "", email: "", whatsapp: "" },
  coupon: {
    discountType: "percentage",
    discountValue: 0,
    description: "",
    quantity: 0,
    deadline: "",
    branchesScope: [],
    conditions: "",
  },
  confirmation: { accepted: false },
  honeypot: "",
};

export function PartnerForm() {
  const t = useTranslations("Partners");
  const locale = useLocale();
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const methods = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: DEFAULTS,
    mode: "onBlur",
  });

  const branchesArray = useFieldArray({
    control: methods.control,
    name: "branches",
  });

  async function onValid(values: PartnerFormValues) {
    setFileError(null);
    setSubmitError(null);

    const logoCheck = validateUpload(logo, {
      accept: ["image/png", "image/svg+xml"],
      maxBytes: MAX_LOGO_BYTES,
      required: true,
    });
    if (!logoCheck.ok) {
      setFileError(t(`errors.file_${logoCheck.error}`));
      return;
    }
    if (logo && !(await getImageMinPxOk(logo, LOGO_MIN_PX))) {
      setFileError(t("errors.file_dimensions"));
      return;
    }
    const photoCheck = validateUpload(photo, {
      accept: ["image/jpeg", "image/png"],
      maxBytes: MAX_PHOTO_BYTES,
      required: false,
    });
    if (!photoCheck.ok) {
      setFileError(t(`errors.file_${photoCheck.error}`));
      return;
    }

    const fd = new FormData();
    fd.set("payload", JSON.stringify(values));
    fd.set("locale", locale);
    if (logo) fd.set("logo", logo);
    if (photo) fd.set("photo", photo);

    startTransition(async () => {
      const res = await submitPartnerRegistration(fd);
      if (res.success) setDone(true);
      else setSubmitError(t("errors.submit_failed"));
    });
  }

  if (done) {
    return (
      <div className="mx-auto w-full max-w-2xl px-5 py-20 text-center lg:px-8">
        <h1 className="font-dongle text-5xl font-bold text-[var(--kodi-teal)]">
          {t("success.title")}
        </h1>
        <p className="mt-3 text-[var(--kodi-ink-soft)]">{t("success.body")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10 lg:px-8">
      <header className="mb-8">
        <h1 className="font-dongle text-5xl font-bold text-[var(--kodi-ink)]">
          {t("header.title")}
        </h1>
        <p className="mt-1 text-[var(--kodi-ink-soft)]">{t("header.subtitle")}</p>
      </header>

      <FormProvider {...methods}>
        <form
          noValidate
          onSubmit={methods.handleSubmit(onValid)}
          className="flex flex-col gap-10"
        >
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute left-[-9999px]"
            {...methods.register("honeypot")}
          />

          <BusinessSection />
          <BranchesSection array={branchesArray} />
          <ContactSection />
          <CouponSection branches={methods.watch("branches")} />
          <MediaSection
            logo={logo}
            photo={photo}
            onLogo={setLogo}
            onPhoto={setPhoto}
            fileError={fileError}
          />
          <ConfirmationSection />

          {submitError && (
            <p role="alert" className="text-sm text-[var(--kodi-coral)]">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={pending || !methods.watch("confirmation.accepted")}
            className="rounded-xl bg-[var(--kodi-teal)] px-6 py-3 font-semibold text-white transition-[transform,background-color] duration-150 hover:bg-[var(--kodi-teal-strong)] active:scale-[0.97] disabled:opacity-50"
            aria-disabled={pending || !methods.watch("confirmation.accepted")}
          >
            {pending ? t("fields.submitting") : t("fields.submit")}
          </button>
          {!methods.watch("confirmation.accepted") && (
            <p className="text-xs text-[var(--kodi-ink-soft)]">
              {t("fields.submitDisabled")}
            </p>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck** (fallará hasta crear las secciones; se permite continuar)

Run: `npx tsc --noEmit`
Expected: errores solo por imports de `./sections/*` aún inexistentes.

- [ ] **Step 3: Commit**

```bash
git add "src/app/[locale]/(kodi)/partners/registro/partner-form.tsx"
git commit -m "✨ feat: orquestador del formulario de partners (RHF + Zod)"
```

### Task F.2: Sección Negocio

**Files:**
- Create: `src/app/[locale]/(kodi)/partners/registro/sections/business-section.tsx`

- [ ] **Step 1: Crear `sections/business-section.tsx`**

```tsx
"use client";

import { useFormContext, Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { PartnerFormValues } from "../schema";
import { BUSINESS_CATEGORIES, GAM_CANTONS } from "../data";
import { Field } from "../fields/field";
import { TextInput, Select, TextareaCounter, RadioGroup } from "../fields/inputs";

export function BusinessSection() {
  const t = useTranslations("Partners");
  const { register, control, watch, formState: { errors } } =
    useFormContext<PartnerFormValues>();
  const e = errors.business;
  const err = (k?: string) => (k ? t(`errors.${k}`) : undefined);

  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-dongle text-3xl font-bold">{t("sections.business")}</h2>

      <Field label={t("fields.name")} required error={err(e?.name?.message)}>
        {({ id, describedBy }) => (
          <TextInput id={id} aria-describedby={describedBy} maxLength={60}
            aria-invalid={!!e?.name} {...register("business.name")} />
        )}
      </Field>

      <Field label={t("fields.category")} required error={err(e?.category?.message)}>
        {({ id, describedBy }) => (
          <Select id={id} aria-describedby={describedBy}
            aria-invalid={!!e?.category} {...register("business.category")}>
            <option value="">{t("fields.categoryPlaceholder")}</option>
            {BUSINESS_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.es}</option>
            ))}
          </Select>
        )}
      </Field>

      <Field label={t("fields.canton")} required error={err(e?.canton?.message)}>
        {({ id, describedBy }) => (
          <Select id={id} aria-describedby={describedBy}
            aria-invalid={!!e?.canton} {...register("business.canton")}>
            <option value="">{t("fields.cantonPlaceholder")}</option>
            {GAM_CANTONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        )}
      </Field>

      <Field label={t("fields.website")} error={err(e?.website?.message)}>
        {({ id, describedBy }) => (
          <TextInput id={id} aria-describedby={describedBy}
            placeholder="https://" {...register("business.website")} />
        )}
      </Field>

      <Field label={t("fields.instagram")} error={err(e?.instagram?.message)}>
        {({ id, describedBy }) => (
          <TextInput id={id} aria-describedby={describedBy}
            {...register("business.instagram")} />
        )}
      </Field>

      <Field label={t("fields.facebook")} error={err(e?.facebook?.message)}>
        {({ id, describedBy }) => (
          <TextInput id={id} aria-describedby={describedBy}
            placeholder="https://" {...register("business.facebook")} />
        )}
      </Field>

      <Field label={t("fields.tiktok")} error={err(e?.tiktok?.message)}>
        {({ id, describedBy }) => (
          <TextInput id={id} aria-describedby={describedBy}
            {...register("business.tiktok")} />
        )}
      </Field>

      <Controller
        control={control}
        name="business.description"
        render={({ field }) => (
          <Field label={t("fields.description")} required
            error={err(e?.description?.message)}>
            {() => (
              <TextareaCounter value={field.value ?? ""} max={250}
                onChange={field.onChange} onBlur={field.onBlur} />
            )}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="business.hasMultipleBranches"
        render={({ field }) => (
          <RadioGroup
            legend={t("fields.hasMultipleBranches")}
            name="hasMultipleBranches"
            value={field.value}
            onChange={field.onChange}
            options={[
              { value: "yes", label: t("fields.yes") },
              { value: "no", label: t("fields.no") },
            ]}
          />
        )}
      />

      {/* watch para forzar suscripción si se necesitara en el futuro */}
      <input type="hidden" value={watch("business.hasMultipleBranches")} readOnly />
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/[locale]/(kodi)/partners/registro/sections/business-section.tsx"
git commit -m "✨ feat: sección Datos del negocio"
```

### Task F.3: Sección Sucursales (condicional + array animado)

**Files:**
- Create: `src/app/[locale]/(kodi)/partners/registro/sections/branches-section.tsx`

- [ ] **Step 1: Crear `sections/branches-section.tsx`**

```tsx
"use client";

import { useFormContext } from "react-hook-form";
import type { UseFieldArrayReturn } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { PartnerFormValues } from "../schema";
import { GAM_CANTONS, LIMITS } from "../data";
import { Field } from "../fields/field";
import { TextInput, Select } from "../fields/inputs";

export function BranchesSection({
  array,
}: {
  array: UseFieldArrayReturn<PartnerFormValues, "branches">;
}) {
  const t = useTranslations("Partners");
  const { register, watch, formState: { errors } } =
    useFormContext<PartnerFormValues>();
  const show = watch("business.hasMultipleBranches") === "yes";
  const err = (k?: string) => (k ? t(`errors.${k}`) : undefined);

  if (!show) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="flex flex-col gap-4"
    >
      <h2 className="font-dongle text-3xl font-bold">{t("sections.branches")}</h2>
      {typeof errors.branches?.message === "string" && (
        <p role="alert" className="text-xs text-[var(--kodi-coral)]">
          {err(errors.branches.message)}
        </p>
      )}

      <AnimatePresence initial={false}>
        {array.fields.map((f, i) => (
          <motion.div
            key={f.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="rounded-xl border border-[var(--kodi-border)] p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">#{i + 1}</span>
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => array.remove(i)}
                  className="text-xs text-[var(--kodi-coral)] transition-transform duration-150 active:scale-[0.97]"
                >
                  {t("fields.removeBranch")}
                </button>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Field label={t("fields.branchName")} required>
                {({ id }) => (
                  <TextInput id={id} maxLength={60}
                    {...register(`branches.${i}.name` as const)} />
                )}
              </Field>
              <Field label={t("fields.branchCanton")} required>
                {({ id }) => (
                  <Select id={id} {...register(`branches.${i}.canton` as const)}>
                    <option value="">{t("fields.cantonPlaceholder")}</option>
                    {GAM_CANTONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </Select>
                )}
              </Field>
              <Field label={t("fields.branchAddress")}>
                {({ id }) => (
                  <TextInput id={id}
                    {...register(`branches.${i}.address` as const)} />
                )}
              </Field>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        type="button"
        disabled={array.fields.length >= LIMITS.branchesMax}
        onClick={() => array.append({ name: "", canton: "", address: "" })}
        className="self-start rounded-lg border border-[var(--kodi-teal)] px-3 py-2 text-sm font-medium text-[var(--kodi-teal)] transition-transform duration-150 active:scale-[0.97] disabled:opacity-50"
      >
        {t("fields.addBranch")}
      </button>
    </motion.section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/[locale]/(kodi)/partners/registro/sections/branches-section.tsx"
git commit -m "✨ feat: sección Sucursales (condicional, array animado)"
```

### Task F.4: Sección Contacto

**Files:**
- Create: `src/app/[locale]/(kodi)/partners/registro/sections/contact-section.tsx`

- [ ] **Step 1: Crear `sections/contact-section.tsx`**

```tsx
"use client";

import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { PartnerFormValues } from "../schema";
import { Field } from "../fields/field";
import { TextInput } from "../fields/inputs";

export function ContactSection() {
  const t = useTranslations("Partners");
  const { register, formState: { errors } } = useFormContext<PartnerFormValues>();
  const e = errors.contact;
  const err = (k?: string) => (k ? t(`errors.${k}`) : undefined);

  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-dongle text-3xl font-bold">{t("sections.contact")}</h2>

      <Field label={t("fields.fullName")} required error={err(e?.fullName?.message)}>
        {({ id, describedBy }) => (
          <TextInput id={id} aria-describedby={describedBy}
            aria-invalid={!!e?.fullName} {...register("contact.fullName")} />
        )}
      </Field>

      <Field label={t("fields.role")} required error={err(e?.role?.message)}>
        {({ id, describedBy }) => (
          <TextInput id={id} aria-describedby={describedBy}
            aria-invalid={!!e?.role} {...register("contact.role")} />
        )}
      </Field>

      <Field label={t("fields.email")} required error={err(e?.email?.message)}>
        {({ id, describedBy }) => (
          <TextInput id={id} type="email" aria-describedby={describedBy}
            aria-invalid={!!e?.email} {...register("contact.email")} />
        )}
      </Field>

      <Field label={t("fields.whatsapp")} required error={err(e?.whatsapp?.message)}>
        {({ id, describedBy }) => (
          <TextInput id={id} inputMode="numeric" aria-describedby={describedBy}
            aria-invalid={!!e?.whatsapp} placeholder="88887777"
            {...register("contact.whatsapp")} />
        )}
      </Field>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/[locale]/(kodi)/partners/registro/sections/contact-section.tsx"
git commit -m "✨ feat: sección Datos del contacto"
```

### Task F.5: Sección Cupón (cross-field + scope condicional)

**Files:**
- Create: `src/app/[locale]/(kodi)/partners/registro/sections/coupon-section.tsx`

- [ ] **Step 1: Crear `sections/coupon-section.tsx`**

```tsx
"use client";

import { useFormContext, Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { PartnerFormValues } from "../schema";
import { LIMITS } from "../data";
import { Field } from "../fields/field";
import { TextInput, DateInput, RadioGroup, CheckboxGroup, TextareaCounter } from "../fields/inputs";

export function CouponSection({
  branches,
}: {
  branches: PartnerFormValues["branches"];
}) {
  const t = useTranslations("Partners");
  const { register, control, watch, formState: { errors } } =
    useFormContext<PartnerFormValues>();
  const e = errors.coupon;
  const err = (k?: string) => (k ? t(`errors.${k}`) : undefined);
  const hasBranches =
    watch("business.hasMultipleBranches") === "yes" && branches.length > 0;
  const branchNames = branches.map((b) => b.name).filter(Boolean);

  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-dongle text-3xl font-bold">{t("sections.coupon")}</h2>

      <Controller
        control={control}
        name="coupon.discountType"
        render={({ field }) => (
          <RadioGroup
            legend={t("fields.discountType")}
            name="discountType"
            value={field.value}
            onChange={field.onChange}
            options={[
              { value: "percentage", label: t("fields.percentage") },
              { value: "fixed", label: t("fields.fixed") },
            ]}
          />
        )}
      />

      <Field label={t("fields.discountValue")} required
        error={err(e?.discountValue?.message)}>
        {({ id, describedBy }) => (
          <TextInput id={id} type="number" inputMode="numeric"
            aria-describedby={describedBy} aria-invalid={!!e?.discountValue}
            {...register("coupon.discountValue", { valueAsNumber: true })} />
        )}
      </Field>

      <Controller
        control={control}
        name="coupon.description"
        render={({ field }) => (
          <Field label={t("fields.couponDescription")} required
            error={err(e?.description?.message)}>
            {() => (
              <TextareaCounter value={field.value ?? ""} max={80}
                onChange={field.onChange} onBlur={field.onBlur} />
            )}
          </Field>
        )}
      />

      <Field label={t("fields.quantity")} required error={err(e?.quantity?.message)}>
        {({ id, describedBy }) => (
          <TextInput id={id} type="number" inputMode="numeric"
            aria-describedby={describedBy} aria-invalid={!!e?.quantity}
            {...register("coupon.quantity", { valueAsNumber: true })} />
        )}
      </Field>

      <Field label={t("fields.deadline")} required error={err(e?.deadline?.message)}>
        {({ id, describedBy }) => (
          <DateInput id={id} aria-describedby={describedBy}
            aria-invalid={!!e?.deadline} {...register("coupon.deadline")} />
        )}
      </Field>

      {hasBranches && (
        <Controller
          control={control}
          name="coupon.branchesScope"
          render={({ field }) => (
            <CheckboxGroup
              legend={t("fields.branchesScope")}
              options={branchNames}
              selected={field.value ?? []}
              allLabel={t("fields.allBranches")}
              error={err(
                typeof errors.coupon?.branchesScope?.message === "string"
                  ? errors.coupon.branchesScope.message
                  : undefined,
              )}
              onToggle={(v) =>
                field.onChange(
                  field.value?.includes(v)
                    ? field.value.filter((x) => x !== v)
                    : [...(field.value ?? []), v],
                )
              }
              onToggleAll={(checked) =>
                field.onChange(checked ? branchNames : [])
              }
            />
          )}
        />
      )}

      <Controller
        control={control}
        name="coupon.conditions"
        render={({ field }) => (
          <Field label={t("fields.conditions")}>
            {() => (
              <TextareaCounter value={field.value ?? ""} max={LIMITS.couponConditions}
                onChange={field.onChange} onBlur={field.onBlur} />
            )}
          </Field>
        )}
      />
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/[locale]/(kodi)/partners/registro/sections/coupon-section.tsx"
git commit -m "✨ feat: sección Configuración del cupón"
```

### Task F.6: Sección Materiales

**Files:**
- Create: `src/app/[locale]/(kodi)/partners/registro/sections/media-section.tsx`

- [ ] **Step 1: Crear `sections/media-section.tsx`**

```tsx
"use client";

import { useTranslations } from "next-intl";
import { Field } from "../fields/field";
import { FileInput } from "../fields/inputs";

export function MediaSection({
  logo,
  photo,
  onLogo,
  onPhoto,
  fileError,
}: {
  logo: File | null;
  photo: File | null;
  onLogo: (f: File | null) => void;
  onPhoto: (f: File | null) => void;
  fileError: string | null;
}) {
  const t = useTranslations("Partners");

  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-dongle text-3xl font-bold">{t("sections.media")}</h2>

      <Field label={t("fields.logo")} required hint={t("fields.logoHint")}
        error={fileError ?? undefined}>
        {() => (
          <FileInput
            accept="image/png,image/svg+xml"
            onChange={onLogo}
            fileName={logo?.name}
          />
        )}
      </Field>

      <Field label={t("fields.photo")} hint={t("fields.photoHint")}>
        {() => (
          <FileInput
            accept="image/jpeg,image/png"
            onChange={onPhoto}
            fileName={photo?.name}
          />
        )}
      </Field>

      {!photo && (
        <p className="rounded-lg bg-[var(--kodi-gold)]/15 px-3 py-2 text-sm text-[var(--kodi-ink)]">
          {t("fields.photoNudge")}
        </p>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/[locale]/(kodi)/partners/registro/sections/media-section.tsx"
git commit -m "✨ feat: sección Materiales visuales"
```

### Task F.7: Sección Confirmación

**Files:**
- Create: `src/app/[locale]/(kodi)/partners/registro/sections/confirmation-section.tsx`

- [ ] **Step 1: Crear `sections/confirmation-section.tsx`**

```tsx
"use client";

import { useFormContext, Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { PartnerFormValues } from "../schema";

export function ConfirmationSection() {
  const t = useTranslations("Partners");
  const { control, formState: { errors } } = useFormContext<PartnerFormValues>();

  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-dongle text-3xl font-bold">
        {t("sections.confirmation")}
      </h2>
      <Controller
        control={control}
        name="confirmation.accepted"
        render={({ field }) => (
          <label className="flex items-start gap-3 text-sm text-[var(--kodi-ink)]">
            <input
              type="checkbox"
              checked={field.value}
              onChange={(ev) => field.onChange(ev.target.checked)}
              className="mt-1 accent-[var(--kodi-teal)]"
            />
            <span>{t("fields.accept")}</span>
          </label>
        )}
      />
      {typeof errors.confirmation?.accepted?.message === "string" && (
        <p role="alert" className="text-xs text-[var(--kodi-coral)]">
          {t(`errors.${errors.confirmation.accepted.message}`)}
        </p>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Typecheck completo**

Run: `npx tsc --noEmit`
Expected: sin errores (todas las secciones existen ahora).

- [ ] **Step 3: Commit**

```bash
git add "src/app/[locale]/(kodi)/partners/registro/sections/confirmation-section.tsx"
git commit -m "✨ feat: sección Confirmación y envío"
```

---

## Fase G — Integración y verificación

### Task G.1: Conectar el formulario a la página

**Files:**
- Modify: `src/app/[locale]/(kodi)/partners/registro/page.tsx`

- [ ] **Step 1: Reemplazar el cuerpo de `page.tsx`** (mantener `generateMetadata`, renderizar el formulario)

```tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PartnerForm } from "./partner-form";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Partners" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      languages: {
        es: "https://arclosystems.com/es/partners/registro",
        en: "https://arclosystems.com/en/partners/registro",
      },
    },
  };
}

export default function PartnersRegistroPage() {
  return <PartnerForm />;
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: build OK, ruta `/[locale]/partners/registro` generada.

- [ ] **Step 3: Commit**

```bash
git add "src/app/[locale]/(kodi)/partners/registro/page.tsx"
git commit -m "✨ feat: conectar formulario de partners a la página"
```

### Task G.2: Suite completa de tests y lint

- [ ] **Step 1: Tests**

Run: `npm test`
Expected: PASS, todos los archivos (`data`, `schema`, `file-validation`, `email`).

- [ ] **Step 2: Lint y typecheck**

Run: `npm run lint; npx tsc --noEmit`
Expected: sin errores ni warnings nuevos.

- [ ] **Step 3: Commit (si lint aplicó autofixes)**

```bash
git add -A
git commit -m "✅ chore: lint y verificación de tests" --allow-empty
```

### Task G.3: Smoke manual end-to-end

- [ ] **Step 1: Dev**

Run: `npm run dev`

- [ ] **Step 2: Checklist en `http://localhost:3000/es/partners/registro`**

Verificar:
- Header banda teal con logo blanco visible; sin navbar Arclo ni fondo glitter.
- "No" en sucursales oculta Sección 2 y el selector de scope; "Sí" los muestra; agregar/eliminar sucursal anima (mín 2, primera sin eliminar, máx 20 deshabilita el botón).
- Contadores en vivo (descripción 250, cupón 80, condiciones 150).
- Validación: enviar vacío marca errores por campo con foco; WhatsApp != 8 dígitos falla; % fuera de 5-100 falla; fijo < 500 falla; fecha < 15 o > 90 días falla; nombre con números falla.
- Logo obligatorio (PNG < 400px falla por dimensiones; SVG pasa); foto opcional muestra el nudge si está vacía.
- Botón enviar deshabilitado hasta marcar el check.
- Envío con `PARTNER_RECIPIENT`/Brevo configurados → pantalla de éxito; el equipo recibe el correo con adjuntos y el partner la confirmación en su idioma.
- Repetir en `/en/partners/registro` (todo en inglés).
- `/es` y `/es/terms` siguen siendo el sitio Arclo intacto.

- [ ] **Step 3: Revisión Web Interface Guidelines**

Invocar la skill `web-design-guidelines` sobre los archivos de `src/app/[locale]/(kodi)/` y `src/components/kodi/`. Corregir hallazgos de alta prioridad (foco visible, targets táctiles, contraste, labels). Commit:

```bash
git add -A
git commit -m "♿ fix: ajustes de accesibilidad por Web Interface Guidelines" --allow-empty
```

### Task G.4: Cierre

- [ ] **Step 1: Revisar diff completo contra el spec**

Run: `git log --oneline main..feat/partners-registro`
Verificar que cada sección del spec `docs/superpowers/specs/2026-05-15-partners-registro-design.md` tiene cobertura.

- [ ] **Step 2: Finalizar rama**

Invocar la skill `superpowers:finishing-a-development-branch` para decidir merge/PR.

---

## Self-Review (autor del plan)

**1. Cobertura del spec:**
- §3 shell route groups → Fase A. §4 tokens/fuentes → Task B.1. §5 shell → Task B.2/B.3. §6 arquitectura form → Fase F. §7 campos/validación → Task C.2 + Fase F. §8 categorías / §9 cantones → Task C.1. §10 data flow Brevo → Task C.4/C.5. §11 estados → Task F.1. §12 backdrop → Task B.2. §13 a11y/motion → primitivas E + Task G.3. §14 deps/env → Fase 0. §15 mapa de archivos → cubierto. §16 fuera de scope → respetado (sin DB, sin React Bits). §17 riesgos → cantones marcados ⚠️ en `data.ts`. Sin huecos.

**2. Placeholders:** No hay "TBD/TODO"; todo step con código muestra el código completo. La nota en Task B.3 da contenido temporal explícito, no un placeholder vago.

**3. Consistencia de tipos:** `partnerSchema`/`PartnerFormValues` definidos en Task C.2 y consumidos consistentemente en action (C.5) y form (F.1). `validateUpload`/`UploadResult` (C.3) usados igual en C.5 y F.1. `sendBrevoEmail`/`BrevoAttachment` (C.4) usados en C.5. Claves i18n de D.1 referenciadas con los mismos nombres en las secciones F.2–F.7. Nombres de campos RHF (`business.*`, `branches.*`, `contact.*`, `coupon.*`, `confirmation.accepted`, `honeypot`) coinciden con el esquema Zod.
