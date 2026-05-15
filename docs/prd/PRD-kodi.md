# PRD: Kodi — La App de Exámenes de Centroamérica

**Versión:** 1.1
**Fecha:** 2026-04-24
**Estado:** Validado con equipo fundador

---

## Tabla de Contenido

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [El Problema](#2-el-problema)
3. [Mercado Objetivo](#3-mercado-objetivo)
   - [3.1 TAM Regional](#31-tam-regional)
   - [3.2 Segmentos por País](#32-segmentos-por-país)
   - [3.3 Módulos y Materias por País](#33-módulos-y-materias-por-país)
4. [Propuesta de Valor](#4-propuesta-de-valor)
5. [Monetización](#5-monetización)
   - [5.1 Modelo Híbrido 50/50](#51-modelo-híbrido-5050)
   - [5.2 Pilar 1: Suscripciones IAP](#52-pilar-1-suscripciones-iap)
   - [5.3 Pilar 2: Patrocinios B2B](#53-pilar-2-patrocinios-b2b)
   - [5.4 Sistema Dual de Monedas](#54-sistema-dual-de-monedas)
   - [5.5 Cupones de Marcas Patrocinadoras](#55-cupones-de-marcas-patrocinadoras)
   - [5.6 Tienda de Estilo](#56-tienda-de-estilo)
   - [5.7 Integridad Competitiva](#57-integridad-competitiva)
   - [5.8 Resumen de Flujos de Ingreso](#58-resumen-de-flujos-de-ingreso)
6. [Flujo de Usuario](#6-flujo-de-usuario)
   - [6.1 Onboarding](#61-onboarding----practicá-antes-de-registrarte)
   - [6.2 Navegación Principal — 5 Tabs](#62-navegación-principal--5-tabs)
   - [6.2.1 Noticias](#621-noticias)
   - [6.3 Tab Práctica](#63-tab-práctica)
   - [6.3.1 Cortes de Admisión](#631-cortes-de-admisión-módulos-universitarios)
   - [6.4 Tab Jugar](#64-tab-jugar)
   - [6.5 Tab Rankings](#65-tab-rankings)
   - [6.6 Tab Beneficios](#66-tab-beneficios)
   - [6.7 Tab Perfil](#67-tab-perfil)
7. [Gamificación & Retención](#7-gamificación--retención)
   - [7.1 Rachas](#71-rachas)
   - [7.2 Meta Diaria de Aprendizaje](#72-meta-diaria-de-aprendizaje)
   - [7.3 Misiones Diarias](#73-misiones-diarias)
   - [7.4 Modos Rápidos](#74-modos-rápidos-básico)
   - [7.5 Partida Kodi — Modo Principal Multijugador](#75-partida-kodi--modo-principal-multijugador)
   - [7.5.1 Arena de Supervivencia](#751-arena-de-supervivencia)
   - [7.6 Combo System](#76-combo-system)
   - [7.7 Revancha en Duelos](#77-revancha-en-duelos)
   - [7.8 Ruta de Estudio Adaptativa](#78-ruta-de-estudio-adaptativa-pluspro)
   - [7.9 Tutor IA "Explicame"](#79-tutor-ia-explicame-pro)
   - [7.9.1 Coach IA Personal](#791-coach-ia-personal-pro)
   - [7.10 Predictor de Nota](#710-predictor-de-nota-pro)
   - [7.11 Ligas Semanales](#711-ligas-semanales-todos)
   - [7.12 Examen Sorpresa](#712-examen-sorpresa-pluspro)
   - [7.13 Personajes Regionales](#713-personajes-regionales--profesores-por-zona)
   - [7.14 Logros, Insignias, Avatares y XP](#714-logros-insignias-avatares-y-xp)
   - [7.15 Sistema de Amigos](#715-sistema-de-amigos)
   - [7.16 Share Cards](#716-share-cards--motor-viral)
   - [7.17 Retención Post-Examen](#717-retención-post-examen)
   - [7.18 Modo Offline](#718-modo-offline)
   - [7.19 Sorteos "Ganá Estudiando"](#719-sorteos-ganá-estudiando)
   - [7.20 Widgets (Home Screen)](#720-widgets-home-screen)
8. [Notificaciones Push](#8-notificaciones-push)
9. [Deep Linking](#9-deep-linking)
10. [Identidad de Marca](#10-identidad-de-marca)
11. [Legal (pre-lanzamiento)](#11-legal-pre-lanzamiento)
12. [Efectos de Sonido](#12-efectos-de-sonido)

---

## 1. Resumen Ejecutivo

**Kodi** es una app móvil gamificada para preparación de exámenes estandarizados en Centroamérica. Combina la metodología de aprendizaje de **Duolingo**, la experiencia social y competitiva de **Preguntados**, y la profundidad de contenido de **Brilliant** — enfocada 100% en exámenes reales de la región.

**Nombre:** Kodi
**Tagline:** "Preparáte a tu ritmo"
**Mascota:** Perezoso con lentes (relajado pero confiable)
**Moneda virtual:** Kolones (actividad) + Kokos (cosmético)

**Mercado:** Lanzamiento inicial en Costa Rica. Expansión progresiva a Guatemala, El Salvador, Honduras y Panamá.

**Modelo:** Nada es gratis por defecto. Tres formas de acceder: suscripciones IAP, videos patrocinados, y moneda virtual canjeable por cupones de marcas reales. Los sponsors tienen acceso a TODA la base de usuarios, incluyendo los de pago, mediante videos opcionales por Kokos.

---

## 2. El Problema

- No existe una herramienta moderna para prepararse para exámenes estandarizados en Centroamérica
- Los estudiantes estudian con fotocopias, PDFs y métodos desactualizados
- No hay gamificación, adaptación ni comunidad en las opciones existentes
- PracticaTest es el único rival parcial (solo COSEVI en CR, sin gamificación)
- **Quiziz** (Pixlab, CR) es el competidor directo más relevante: app costarricense gratuita que cubre bachillerato, pruebas de manejo y admisión universitaria. Sin gamificación social, sin multijugador, sin ligas, sin IA, sin modelo regional — pero es gratis y tiene tracción local
- En Guatemala, El Salvador, Honduras y Panamá la situación es peor: cero herramientas digitales especializadas

---

## 3. Mercado Objetivo

### 3.1 TAM Regional

> Estimaciones basadas en datos oficiales de graduandos (Ministerios de Educación), registros vehiculares y proyecciones de población. Números anuales de candidatos por examen, no usuarios únicos.

| País | Población | TAM estimado/año | Penetración internet |
|------|-----------|-----------------|---------------------|
| Costa Rica | 5.2M | ~310,000 | 92.5% |
| Guatemala | 18M | ~800,000+ | 65% |
| El Salvador | 6.5M | ~300,000 | 63% |
| Honduras | 10M | ~450,000+ | 48% |
| Panamá | 4.3M | ~200,000 | 73% |
| **Total** | **44M** | **~2,060,000+** | |

**Países excluidos:** Belice (anglófono) y Nicaragua.

### 3.2 Segmentos por País

Cada mercado tiene sus propios exámenes estandarizados. v1: el mercado es Costa Rica — asignado automáticamente. v2+: el usuario seleccionará su país al registrarse y verá solo los módulos de su mercado.

**🇨🇷 Costa Rica:**

| Segmento | Examen | Estimación anual |
|----------|--------|----------------:|
| Estudiantes 6.° escuela | PNE Primaria | ~70,000 |
| Estudiantes 5.° colegio | PNE Secundaria | ~50,000 |
| Último año / bachilleres | PAA (UCR/TEC/UNA) | ~40,000 |
| Licencia de carro | Teórico Manejo Auto | ~100,000+ |
| Licencia de moto | Teórico Manejo Moto | ~50,000+ |

**🇬🇹 Guatemala:**

| Segmento | Examen | Estimación anual |
|----------|--------|----------------:|
| Graduandos diversificado | Evaluación DIGEDUCA | ~156,000 |
| Aspirantes universidad pública | Admisión USAC (3 fases) | ~80,000+ |
| Licencia de carro | Teórico Manejo PNC | ~150,000+ |

**🇸🇻 El Salvador:**

| Segmento | Examen | Estimación anual |
|----------|--------|----------------:|
| Graduandos bachillerato | AVANZO 2025 | ~80,000 |
| Aspirantes universidad pública | Admisión UES | ~40,000+ |
| Licencia de carro | Teórico Manejo VMT | ~60,000+ |

**🇭🇳 Honduras:**

| Segmento | Examen | Estimación anual |
|----------|--------|----------------:|
| Aspirantes universidad pública | PHUMA — UNAH | ~80,000+ |
| Licencia de carro | Teórico Manejo DNVT | ~100,000+ |

**🇵🇦 Panamá:**

| Segmento | Examen | Estimación anual |
|----------|--------|----------------:|
| Aspirantes Universidad de Panamá | PCA + PCG | ~30,000+ |
| Licencia de carro | Teórico Manejo SERTRACEN | ~50,000+ |

---

### 3.3 Módulos y Materias por País

> Investigación realizada en abril 2026. Ítems marcados ⚠️ requieren verificación manual con documentos oficiales.

> **Producción de contenido:** las preguntas se generan a partir de documentos oficiales de cada examen (manuales, tablas de especificaciones, guías de estudio) usando IA como herramienta de producción. Todo el contenido generado requiere revisión humana antes de publicarse.

#### 🇨🇷 Costa Rica

**COSEVI Auto (B1)** ⚠️ *Nuevo manual 2025 en distribución — estructura basada en manual anterior*

| Cap. | Materia | Subtemas clave |
|------|---------|----------------|
| 1 | Aspectos generales de tránsito | Marco legal, Ley 9078 |
| 2 | Legislación de Tránsito | Ley de tránsito y reglamentos |
| 3 | Señales de Tránsito | Reglamentarias · Preventivas · Informativas · Demarcaciones |
| 4 | Normas de Circulación | Velocidades · Preferencia de paso · Maniobras |
| 5 | Factor Humano | Alcohol · Drogas · Fatiga · Distracciones |
| 6 | Seguridad Vial | Cinturón · Sillas infantiles · Airbags |
| 7 | Rotondas | Reglas específicas de rotonda |
| 8 | Primeros Auxilios | Atención básica en accidentes |
| 9 | Conducción Técnica | Mecánica básica · Eficiencia de combustible |

**COSEVI Moto (A)** — Caps. 1–9 + Cap. 10: Conducción en motocicleta (equipo de protección · técnicas específicas · convivencia moto-auto)

**PNE Primaria — Sexto grado** ⚠️ *Tablas de especificaciones MEP verificar en dgec.mep.go.cr*

| Materia | Subtemas |
|---------|---------|
| Español | Comprensión lectora · Gramática · Ortografía · Expresión escrita |
| Matemáticas | Números y operaciones · Fracciones · Geometría · Medidas · Estadística |
| Ciencias | Seres vivos · Cuerpo humano · Materia y energía · La Tierra |
| Estudios Sociales y Cívica | Historia CR · Geografía · Ciudadanía · Economía básica |

**PNE Secundaria — Bachillerato (11°)** ⚠️ *Tablas de especificaciones MEP verificar en dgec.mep.go.cr*

| Materia | Subtemas |
|---------|---------|
| Español | Comprensión lectora · Literatura CR e hispanoamericana · Gramática · Redacción |
| Matemáticas | Álgebra · Funciones · Geometría · Trigonometría · Estadística |
| Estudios Sociales | Historia CR · Historia mundial · Geografía · Economía |
| Educación Cívica | Estado costarricense · Derechos humanos · Participación ciudadana |
| Ciencias | Biología celular · Genética · Ecología · Fisiología *(o Física+Química según rama)* |
| Inglés | Reading · Grammar · Vocabulary · Writing |

**PAA — UCR / TEC / UNA** *(45 ítems · razonamiento puro · no evalúa conocimientos de materias)*

| Materia | Subtemas |
|---------|---------|
| Razonamiento Verbal | Vocabulario en contexto · Comprensión lectora · Síntesis · Inferencia |
| Razonamiento Matemático | Resolución de problemas · Razonamiento deductivo/inductivo · Sucesiones |
| Razonamiento con Figuras | Patrones geométricos · Rotación · Proyecciones 3D→2D · Simetría |

---

#### 🇬🇹 Guatemala

**Licencia Auto — PNC** *(50 preguntas · aprueba con 80%)*

| Materia |
|---------|
| Señalización vial (reglamentarias · preventivas · informativas · demarcaciones) |
| Legislación de Tránsito guatemalteca |
| Normas de circulación y velocidades |
| Factor humano (alcohol · drogas · distracciones) |
| Manejo defensivo |

**Evaluación de Graduandos — DIGEDUCA** *(diagnóstica · no afecta diploma · 100% online · 3h)*

| Materia | Duración |
|---------|---------|
| Lectura | 60 min |
| Matemáticas | 90 min |

**Admisión USAC** *(3 fases)*

| Fase | Prueba | Materias |
|------|--------|---------|
| I | Orientación Vocacional | Habilidades lógico-matemáticas · Verbales · Abstractas · Intereses profesionales |
| II | Conocimientos Básicos (PCB) | Biología · Física · Lenguaje · Matemáticas · Química |
| III | Pruebas Específicas | Varía por carrera y facultad |

---

#### 🇸🇻 El Salvador

**Licencia Auto — VMT** *(30 preguntas)*

| Materia |
|---------|
| Ley de Transporte Terrestre, Tránsito y Seguridad Vial |
| Señalización Vial (preventivas · reglamentarias · informativas) |
| Reglamento General de Tránsito |
| Examen Psicológico (aptitudes mentales y conductuales) |

**AVANZO 2025** *(reemplazó a PAES · 5 instrumentos × 35 ítems)*

| Materia |
|---------|
| Precálculo |
| Ciudadanía y Valores |
| Ciencia y Tecnología |
| Lengua y Literatura |
| Inglés |

**Admisión UES** *(100 preguntas · 2 etapas · aprueba con 50+)*

| Materia |
|---------|
| Matemáticas |
| Lenguaje y Literatura |
| Estudios Sociales |
| Ciencias Naturales |

---

#### 🇭🇳 Honduras

**Licencia Auto — DNVT** *(sistema digital 2025)*

| Materia |
|---------|
| Señales de tránsito |
| Legislación vial hondureña |
| Normas de circulación |
| Manejo defensivo y seguridad |

**Admisión UNAH — PHUMA** *(120 preguntas · 2h50min)*

| Competencia | Subtemas |
|-------------|---------|
| Comunicativas | Comprensión lectora · Expresión escrita |
| Matemáticas | Aritmética · Álgebra · Geometría · Estadística |
| Entorno Natural | Física · Química · Biología |
| Entorno Social | Historia HN · Historia universal · Geografía · Cívica · Sociología |
| Habilidades Blandas | Pensamiento crítico · Trabajo en equipo · Comunicación |

---

#### 🇵🇦 Panamá

**Licencia Auto — SERTRACEN/ATTT** *(10 preguntas · muy básico)*

| Materia |
|---------|
| Reglamento de Tránsito vehicular |
| Señales básicas de tránsito |
| Definiciones (peatones · derecho de vía · tipos de vía) |

**Admisión Universidad de Panamá** ⚠️ *Temario exacto verificar en diradmision.up.ac.pa*

| Prueba | Para quién | Materias |
|--------|-----------|---------|
| PCA *(obligatoria todos)* | Todos los aspirantes | Capacidades Verbales · Capacidades Numéricas |
| PCG Científica | Ingeniería · Medicina · Enfermería · Ciencias | Ciencias exactas y naturales |
| PCG Humanística | Derecho y Ciencias Políticas | Humanidades y ciencias sociales |

---

#### Riqueza de contenido por país

| País | Módulos | Materias totales aprox. |
|------|:-------:|:-----------------------:|
| 🇨🇷 CR | 5 | ~35 |
| 🇸🇻 SV | 3 | ~18 |
| 🇬🇹 GT | 3 | ~15 |
| 🇭🇳 HN | 2 | ~10 |
| 🇵🇦 PA | 2 | ~6 |

---

## 4. Propuesta de Valor

### Para el estudiante

- **Contenido 100% local** — única app con exámenes reales de su país: COSEVI, PAA, PNE, PHUMA, AVANZO, DIGEDUCA, USAC, UES, UP y más
- **Estudiar es competir** — duelos 1v1, ligas semanales con rifas mensuales, Arena entre amigos y rankings hacen del estudio una experiencia social y adictiva (Duolingo × Preguntados × Brilliant)
- **Premios reales** — los mejores en el ranking ganan premios tangibles (gift cards, productos, descuentos) por convenios con sponsors o financiados directamente por Kodi — no solo insignias digitales
- **IA personal** (Pro) — tutor que explica cada respuesta y un plan de estudio diario que se adapta a tus aciertos y errores
- **Valor por estudiar** — Kolones canjeables por cupones de marcas reales del país; estudiar tiene recompensa concreta
- **Sin barrera de entrada** — acceso gratuito vía videos patrocinados; se paga cuando se experimenta el valor
- **Funciona offline** — práctica disponible sin internet, vital en mercados con conectividad inestable
- **Competencia justa** — cero pay-to-win, rankings basados 100% en mérito; lo que comprás es estilo, no ventaja
- **Por qué pagar si Quiziz es gratis** — Quiziz es un PDF digital con calificación. Kodi es una experiencia: competís, ganás, te reconocen. La diferencia es la misma que entre ver un partido solo o jugarlo con amigos

### Para el sponsor

- **Visibilidad frente a estudiantes activos** — tu marca aparece mientras el usuario está estudiando, no scrolleando un feed; atención real, no pasiva
- **Múltiples formatos de presencia** — videos obligatorios, banners, cupones en el marketplace, sponsoreo de rankings y convenios de premios; cada marca elige cómo aparecer
- **Videos que se ven completos** — el usuario ve los 15-30s para desbloquear preguntas; no hay skip posible
- **Cupones medibles** — cada redención se trackea; el sponsor sabe exactamente cuántos estudiantes fueron a su negocio
- **Asociación con el mérito** — financiar los premios del ranking mensual asocia la marca con los mejores estudiantes del país
- **Presencia en toda la base** — los videos opcionales por Kokos llegan a usuarios de pago también, no solo a los gratuitos
- **Audiencia amplia y local** — estudiantes de 14-25 años en módulos educativos, más adultos de cualquier edad en el módulo de teórico de manejo; todos en el momento en que están más motivados a aprobar y avanzar

---

## 5. Monetización

### 5.1 Modelo Híbrido 50/50

Dos pilares de revenue equivalentes: suscripciones de usuarios (B2C) + patrocinios de marcas (B2B).

### 5.2 Pilar 1: Suscripciones IAP

Pagos exclusivamente vía App Store y Google Play. Sin pasarelas terceras.

**Trial gratuito:** 3-7 días de Plus gratis para nuevos usuarios. Se activa automáticamente al completar el onboarding. El usuario experimenta simulacros y ruta adaptativa antes de pagar.

#### Funcionalidades por Plan

| Funcionalidad | Sin plan | Básico | Plus | Pro |
|---|---|---|---|---|
| Preguntas de práctica | 15/día (3 videos × 5 preguntas) | Ilimitadas | Ilimitadas | Ilimitadas |
| Modos rápidos (Contrarreloj/Supervivencia) | Video por partida | Ilimitados | Ilimitados | Ilimitados |
| Partida Kodi (vs aleatorio + vs amigo) | Video por partida | Ilimitado | Ilimitado | Ilimitado |
| Rankings / Ligas | Sí | Sí | Sí | Sí |
| Simulacros | No | No | Sí | Sí |
| Ruta adaptativa | No | No | Completa | Completa |
| Examen sorpresa (push) | No | No | Sí | Sí |
| Tutor IA ("Explicame") | No | No | No | 40/día por módulo |
| Coach IA Personal | No | No | No | Sí |
| Predictor de nota | No | No | No | Sí |
| Publicidad forzada | Videos + banners | **Sin publicidad** | **Sin publicidad** | **Sin publicidad** |
| Videos opcionales por Kokos | Sí (5/día) | Sí (5/día) | Sí (5/día) | Sí (5/día) |
| Kolones | Sí | Sí | Sí | Sí |
| Cupones de marcas | Sí | Sí | Sí | Sí + exclusivas |
| Meta diaria | Sí | Sí | Sí | Sí |

> **Nota sobre Partida Kodi para usuarios free:** El video por partida aplica tanto para vs aleatorio como vs amigo. Cada reto es una invitación implícita a descargar la app — motor de viralidad orgánica.

#### Pricing Costa Rica — Mensual

| Plan | 1 módulo | Pack 2 | Pack 3 | Pack 4 |
|------|:--------:|:------:|:------:|:------:|
| **Básico** | ₡2,500 | ₡4,000 | ₡5,000 | ₡6,000 |
| **Plus** | ₡4,500 | ₡7,200 | ₡9,000 | ₡10,800 |
| **Pro** | ₡7,000 | ₡11,200 | ₡14,000 | ₡16,800 |

#### Pricing Costa Rica — Trimestral

| Plan | 1 módulo | Pack 2 | Pack 3 | Pack 4 |
|------|:--------:|:------:|:------:|:------:|
| **Básico** | ₡6,000 | ₡9,600 | ₡12,000 | ₡13,500 |
| **Plus** | ₡10,800 | ₡17,280 | ₡21,600 | ₡24,300 |
| **Pro** | ₡16,800 | ₡26,880 | ₡33,600 | ₡37,800 |

#### Pricing Costa Rica — Anual

| Plan | 1 módulo | Pack 2 | Pack 3 | Pack 4 |
|------|:--------:|:------:|:------:|:------:|
| **Básico** | ₡18,000 | ₡28,800 | ₡36,000 | ₡40,000 |
| **Plus** | ₡32,400 | ₡51,840 | ₡64,800 | ₡72,000 |
| **Pro** | ₡50,400 | ₡80,640 | ₡100,800 | ₡112,000 |

---

#### Pricing Guatemala — Mensual

| Plan | 1 módulo | Pack 2 | Pack 3 | Pack 4 |
|------|:--------:|:------:|:------:|:------:|
| **Básico** | Q25 | Q40 | Q50 | Q60 |
| **Plus** | Q45 | Q72 | Q90 | Q108 |
| **Pro** | Q75 | Q120 | Q150 | Q180 |

#### Pricing Guatemala — Trimestral

| Plan | 1 módulo | Pack 2 | Pack 3 | Pack 4 |
|------|:--------:|:------:|:------:|:------:|
| **Básico** | Q60 | Q96 | Q120 | Q144 |
| **Plus** | Q108 | Q173 | Q216 | Q259 |
| **Pro** | Q180 | Q288 | Q360 | Q432 |

#### Pricing Guatemala — Anual

| Plan | 1 módulo | Pack 2 | Pack 3 | Pack 4 |
|------|:--------:|:------:|:------:|:------:|
| **Básico** | Q180 | Q288 | Q360 | Q432 |
| **Plus** | Q324 | Q518 | Q648 | Q778 |
| **Pro** | Q540 | Q864 | Q1,080 | Q1,296 |

---

#### Pricing Honduras — Mensual

| Plan | 1 módulo | Pack 2 | Pack 3 | Pack 4 |
|------|:--------:|:------:|:------:|:------:|
| **Básico** | L70 | L110 | L140 | L168 |
| **Plus** | L125 | L200 | L250 | L300 |
| **Pro** | L200 | L320 | L400 | L480 |

#### Pricing Honduras — Trimestral

| Plan | 1 módulo | Pack 2 | Pack 3 | Pack 4 |
|------|:--------:|:------:|:------:|:------:|
| **Básico** | L170 | L264 | L336 | L403 |
| **Plus** | L300 | L480 | L600 | L720 |
| **Pro** | L480 | L768 | L960 | L1,152 |

#### Pricing Honduras — Anual

| Plan | 1 módulo | Pack 2 | Pack 3 | Pack 4 |
|------|:--------:|:------:|:------:|:------:|
| **Básico** | L505 | L792 | L1,008 | L1,210 |
| **Plus** | L900 | L1,440 | L1,800 | L2,160 |
| **Pro** | L1,440 | L2,304 | L2,880 | L3,456 |

---

#### Pricing El Salvador — Mensual

| Plan | 1 módulo | Pack 2 | Pack 3 |
|------|:--------:|:------:|:------:|
| **Básico** | $3.50 | $5.60 | $7.00 |
| **Plus** | $6.50 | $10.40 | $13.00 |
| **Pro** | $10.00 | $16.00 | $20.00 |

#### Pricing El Salvador — Trimestral

| Plan | 1 módulo | Pack 2 | Pack 3 |
|------|:--------:|:------:|:------:|
| **Básico** | $8.40 | $13.44 | $16.80 |
| **Plus** | $15.60 | $24.96 | $31.20 |
| **Pro** | $24.00 | $38.40 | $48.00 |

#### Pricing El Salvador — Anual

| Plan | 1 módulo | Pack 2 | Pack 3 |
|------|:--------:|:------:|:------:|
| **Básico** | $25.20 | $40.32 | $50.40 |
| **Plus** | $46.80 | $74.88 | $93.60 |
| **Pro** | $72.00 | $115.20 | $144.00 |

---

#### Pricing Panamá — Mensual

| Plan | 1 módulo | Pack 2 |
|------|:--------:|:------:|
| **Básico** | $5.95 | $9.52 |
| **Plus** | $10.75 | $17.20 |
| **Pro** | $16.50 | $26.40 |

#### Pricing Panamá — Trimestral

| Plan | 1 módulo | Pack 2 |
|------|:--------:|:------:|
| **Básico** | $14.30 | $22.85 |
| **Plus** | $25.80 | $41.28 |
| **Pro** | $39.60 | $63.36 |

#### Pricing Panamá — Anual

| Plan | 1 módulo | Pack 2 |
|------|:--------:|:------:|
| **Básico** | $42.85 | $68.54 |
| **Plus** | $77.40 | $123.84 |
| **Pro** | $118.80 | $190.08 |

---

**Descuentos por pack:**
- Pack 2: 20% descuento
- Pack 3: 33% descuento (CR, GT, HN, SV)
- Pack 4: 40% descuento — pagás 2.4 módulos, te llevás 4 (CR, GT, HN)

**Descuentos por período:**
- Trimestral: 20% vs mensual
- Anual: 40% vs mensual
- Combinados: ahorro máximo hasta 55% (anual + Pack 4)

**Estructura:** 36 tiers en CR/GT/HN (3 planes × 4 packs × 3 períodos); 27 tiers en SV (3 planes × 3 packs × 3 períodos); 18 tiers en PA (3 planes × 2 packs × 3 períodos). Precios pack calculados aplicando descuentos estándar sobre base mensual por módulo. Fuente autoritativa: Grupo Arclo — _Precios Regionales_ (aprobado 2026-03-24).

#### Posicionamiento

- **Básico** — "Empezá a prepararte": práctica ilimitada, duelos ilimitados, sin publicidad forzada.
- **Plus** — "Preparación seria" (el más popular): + simulacros, ruta adaptativa, examen sorpresa.
- **Pro** — "Todo incluido": + Tutor IA, predictor, cupones exclusivos.

#### Gestión de Suscripciones

- Cancelación: acceso hasta fin del período pagado
- Upgrade plan: aplica inmediatamente (prorrateo)
- Downgrade plan: aplica al renovar
- Agregar módulo: prorrateo del diferencial
- Quitar módulo: aplica al renovar
- Grace period: 3 días tras fallo de cobro

### 5.3 Pilar 2: Patrocinios B2B

#### Operación por País

| Mercado | Operación | Comisión | Fase |
|---------|-----------|---------|------|
| Costa Rica | Equipo propio de ventas | — | v1 — lanzamiento |
| Guatemala | Partner local | Por definir | Expansión |
| El Salvador | Partner local | Por definir | Expansión |
| Honduras | Partner local | Por definir | Expansión |
| Panamá | Partner local | Por definir | Expansión |

#### Formatos de Patrocinio

| Formato | Audiencia | Mecánica |
|---|---|---|
| **Videos para desbloquear preguntas** | Solo free | 3 videos/día = 5 preguntas por video (15 en total). Video de 15-30s de sponsor local. Expiración: medianoche hora local. Pool independiente del video por partida. |
| **Videos opcionales por Kokos** | Todos (free + pago) | 5 videos/día = 5 Kokos máx. Voluntario en la Tienda. Da acceso a sponsors a TODA la base |
| **Cupones de marcas** | Todos | Canjear Kokos por descuentos reales en marcas locales del país |
| **Ranking patrocinado** | Básico+ | Un sponsor "presenta" el ranking mensual por examen. Logo visible + sponsor pone premios para top |
| **Banners** | Solo free | Banners rotativos de sponsors en pantallas de la app |

> Los videos opcionales por Kokos son clave: dan a los sponsors acceso a usuarios de pago sin romper la promesa de "sin publicidad forzada". El usuario elige voluntariamente ver el video.

#### Paquetes de Patrocinio

| Paquete | Qué incluye | Precio/mes |
|---------|-------------|----------:|
| **Cupón** | Cupón en marketplace + analytics de redenciones | Por definir |
| **Básico** | Cupón + banner rotativo en 1 módulo | Por definir |
| **Avanzado** | Cupón + banner + video patrocinado en 1 módulo | Por definir |
| **Ranking** | Todo anterior + logo en ranking mensual + premios para top | Por definir |

#### Sponsors Naturales por Módulo

| Módulo | Sponsors potenciales | Disposición |
|--------|---------------------|-------------|
| Manejo Auto/Moto | Autoescuelas, aseguradoras, talleres, concesionarios | **Alta** (en todos los países) |
| Admisión universitaria | Universidades privadas, academias, librerías | **Muy alta** |
| Pruebas nacionales secundaria | Academias de tutoría, librerías, editoriales | **Media-alta** |
| Pruebas nacionales primaria | Academias, tiendas de útiles | **Media** |
| App-wide | Telecoms (Tigo, Claro, Movistar), fast food, bancos | **Alta** |

#### Valor para el Patrocinador

- **Audiencia cautiva:** el usuario está estudiando activamente, atención máxima
- **Segmentación por examen y país:** una autoescuela llega SOLO a quienes estudian manejo en su país
- **Interacción garantizada:** el usuario VE el video completo (15-30s)
- **Acceso a usuarios de pago:** videos opcionales por Kokos llegan a TODA la base
- **Cupón medible:** cada redención se trackea, ROI demostrable
- **Escasez:** slots limitados por módulo
- **Frecuencia:** usuarios activos entran 8-18 días al mes

### 5.4 Sistema Dual de Monedas

| Moneda | Cómo se obtiene | Para qué |
|--------|----------------|----------|
| **Kolones** | Actividad (respuestas, rachas, misiones, logros, simulacros, ligas) | Cupones de marcas reales |
| **Kokos** | Logros especiales + compra IAP + videos opcionales (5/día = 5 Kokos máx) | Tienda de Estilo (cosméticos + funcionales) |

Economías completamente separadas.

#### Ganancia de Kolones

| Actividad | Kolones |
|-----------|------:|
| Respuesta correcta | +1 |
| Racha mantenida (por día) | +5 |
| Misión diaria completada | +10 |
| Meta diaria cumplida | +10 |
| Modo juego (partida) | +5 |
| Duelo ganado | +5 |
| Logro desbloqueado | +15 |
| Simulacro completado | +20 |
| Ascenso de liga | +30 a +350 (escala por nivel, ver §7.11) |

### 5.5 Cupones de Marcas Patrocinadoras

Sección "Beneficios" donde los usuarios canjean Kolones por cupones de descuento reales de marcas locales de su país.

**Flujo:** Ver cupones disponibles → "20% en Librería X — 50 Kolones" → Canjear → Genera código 8 chars + QR → Muestra en establecimiento → Expira en 30 días.

**Cupones exclusivos Pro:** mejores descuentos o marcas premium.

**Estructura de tiers:** el equipo comercial asigna cada cupón a un tier según el valor percibido del beneficio ofrecido por el sponsor.

| Tier | Definición | Rango Kolones |
|------|-----------|--------------|
| Básico | Beneficio pequeño — descuento leve, detalle | 300–600 |
| Estándar | Beneficio mediano — producto, servicio, ahorro real | 800–1,500 |
| Premium | Beneficio alto — item de valor, experiencia | 2,000–3,500 |

Con las ganancias actuales, un usuario activo (~50-60 Kolones/día) puede alcanzar un cupón Básico en ~1 semana, Estándar en ~2-3 semanas, Premium en ~5-6 semanas.

**Stock de cupones:** cada cupón puede tener cantidad limitada (ej: "solo 200 disponibles — primero en canjear, primero en obtener") o cantidad ilimitada, según lo defina el patrocinador. Los cupones con stock limitado muestran disponibilidad restante en la UI.

**Marcas objetivo por categoría (aplica en todos los países con marcas locales):**

| Categoría | Ejemplos |
|-----------|----------|
| Academias/tutorías | Preparación de exámenes |
| Librerías | Cadenas locales |
| Restaurantes/cafeterías | Cadenas locales, sodas |
| Tecnología | Tiendas de accesorios |
| Autoescuelas | Escuelas de manejo |
| Universidades privadas | Publicidad institucional |
| Transporte | Apps de transporte |

### 5.6 Tienda de Estilo

Se compra con Kokos. Todo localizado por país.

| Categoría | Items |
|-----------|-------|
| **Cosméticos** | Marcos de perfil, avatares premium, títulos exclusivos, temas de app, animaciones de respuesta — con identidad de cada país |
| **Funcionales** | Protector de Racha (no perdés tu racha), Segunda Oportunidad (recuperar 1 vida en Supervivencia) |

**Precios por tier:**

| Tier | Tipo de item | Precio Kokos |
|------|-------------|-------------:|
| Básico | Funcionales (Protector de Racha, Segunda Oportunidad) | 50–80 |
| Estándar | Cosméticos simples (marco de perfil, título exclusivo) | 150–250 |
| Premium | Cosméticos elaborados (tema de app, avatar premium, animación) | 400–700 |

**Packs de Kokos (IAP):**

| Pack | Kokos | Precio (CR) |
|------|------:|-------:|
| Puñado | 50 | $0.99 |
| Bolsa | 150 | $2.49 |
| Cofre | 500 | $4.99 |

Precios localizados por país vía IAP.

**Reglas de la Tienda:**
- Ningún item da ventaja competitiva
- Cosméticos son puramente visuales
- Protector de Racha: la racha es personal, no afecta ranking
- Segunda Oportunidad: solo afecta Supervivencia individual

### 5.7 Integridad Competitiva

**Principio: "Estudiá para competir. Comprá para brillar."**

| Métrica | Cómo se gana | ¿Comprable? |
|---------|-------------|-------------|
| XP de estudio (rankings, ligas, sorteos) | Solo respondiendo correctamente | **Nunca** |
| Kolones (cupones de marcas) | Actividad | No |
| Kokos (Tienda de Estilo) | Logros + IAP + videos opcionales | Sí, pero solo cosméticos y funcionales |

**Reglas duras:**
- Rankings y ligas se calculan SOLO con XP de estudio
- Sorteos: elegibilidad basada SOLO en posición de liga (mérito puro)
- No existe ningún item comprable que afecte XP, posición o elegibilidad a premios
- Multijugador otorga XP moderado (menos que práctica/simulacros)

### 5.8 Resumen de Flujos de Ingreso

| Canal | Fuente | Tipo |
|-------|--------|------|
| Suscripciones IAP (plan × pack) | Usuarios | B2C — ingreso principal |
| Videos obligatorios + banners | Marcas locales | B2B — solo users free |
| Videos opcionales por Kokos | Marcas locales | B2B — todos los users |
| Ranking patrocinado mensual | Marcas locales | B2B — formato premium |
| Cupones de marcas | Marcas/empresas | B2B — por presencia/canjeo |
| Kokos (IAP) | Usuarios | B2C — ingreso secundario |

---

## 6. Flujo de Usuario

### 6.1 Onboarding — "Practicá antes de registrarte"

```
Splash screen (logo Kodi + perezoso)
  → Confirmación de mercado: "Kódi está en Costa Rica 🇨🇷" (v1: sin selección — mercado fijo)
      [v2+: "¿En qué país estás?" → selección cuando haya ≥ 2 mercados activos]
    → "¿Qué estás preparando?" → selección de módulos (checkboxes, máx 4)
      → 5-10 preguntas inmediatas SIN registro (primera sesión mágica)
        → Resultado con animación + primer logro desbloqueado
          → "Guardá tu progreso" → Registro (email o Google) + fecha de nacimiento
            → Si < 13 años: pedir email de padre/madre → enviar link kodi.app/consent?token=X
                → Pantalla de espera (progreso guardado 48h) → padre aprueba → cuenta activada
                → Si no responde en 48h → cuenta eliminada
            → Si ≥ 13 años: continuar normalmente
              → "¿Cuánto querés estudiar al día?" → meta diaria (10/20/30/50, default 20)
                → Continuar practicando (planes se muestran después, no aquí)
```

**Principio:** El usuario experimenta valor ANTES de pedirle registro o dinero. Paywalls contextuales aparecen después, en momentos de máxima disposición a pagar (ej: tras simulacro con nota baja, al intentar acceder a feature premium).

### 6.2 Navegación Principal — 5 Tabs

```
┌────────┬────────┬────────┬────────┬────────┐
│Práctica│ Jugar  │Ranking │Benefic.│ Perfil │
└────────┴────────┴────────┴────────┴────────┘
```

**Módulo activo — pill en el header:**

Un pill con el nombre corto del módulo activo (ej: "COSEVI", "PAA", "PHUMA") aparece en el header de todas las tabs excepto Perfil. Tap → bottom sheet con todos los módulos disponibles del país — los suscritos aparecen primero, el resto accesibles en modo free (con video). Seleccionar uno lo activa globalmente.

El módulo activo persiste entre sesiones. Su efecto por tab:
- **Práctica:** el módulo activo aparece destacado al inicio de la lista; los demás módulos siguen accesibles
- **Jugar:** todas las partidas y modos usan el módulo activo
- **Rankings:** filtra automáticamente por módulo activo

### 6.2.1 Noticias

Ícono de noticias (periódico) en el header de todas las tabs excepto Perfil, al lado del pill de módulo activo. Sin badge ni indicadores — el usuario lo abre si quiere informarse.

Al tocar abre una pantalla con dos secciones:

- **"Tu examen"** — noticias filtradas por módulo activo: convocatorias, cambios de temario, fechas de examen, actualizaciones oficiales
- **"Educación"** — contenido general del país: becas, tips de estudio, novedades educativas

Cada artículo: título, resumen, fecha, imagen opcional. Al tocar abre el contenido completo dentro de la app.

**Acceso:** todos los usuarios (free y pago), sin paywall.

**Gestión de contenido:** el equipo Kódi publica artículos vía CMS interno. Cada artículo se etiqueta con el o los módulos a los que aplica (o "Educación" para la segunda sección) y el país. El usuario ve solo lo relevante a su módulo activo y país.

### 6.3 Tab Práctica

- **Card meta diaria:** barra de progreso, conteo, botón "Reclamar" al completar
- **Lista de módulos** del usuario → materias → temas → preguntas
  - Dentro de cada módulo: **ruta adaptativa** (Plus/Pro) — tema recomendado según debilidades del módulo
  - Dentro de cada módulo: **Simulacros** (Plus/Pro) — crear simulacro de ese módulo
  - Dentro de módulos universitarios (PAA-CR, PHUMA-HN, UP-PA): **Cortes de admisión** — ver sección §6.3.1
- Cada respuesta: feedback inmediato (correcta/incorrecta). Explicación detallada solo vía Tutor IA "Explicame" (Pro)
- **Resumen de sesión** al terminar: preguntas respondidas, % correcto, mejora vs ayer, Kolones ganados, mejor racha de correctas. Incluye botón de compartir (share card)
- Sin plan: requiere preguntas desbloqueadas por video (máx 15/día). Al agotar el límite diario aparece un paywall con tres opciones: ver un video para desbloquear 5 preguntas más (si quedan videos disponibles), suscribirse a un plan, o volver mañana (reseteo a medianoche hora local).
- Con plan: ilimitado

**Simulacros (Plus/Pro) — dentro de cada módulo:**
- Crear simulacro: elegir examen, materia (o mixto), duración
- Cronómetro visible, preguntas secuenciales sin feedback inmediato (simula examen real)
- **No se puede pausar ni reanudar** — salir = abandonar, sin XP parcial
- Resultado: puntuación + desglose por materia + share card

**§6.3.1 Cortes de Admisión (módulos universitarios)**

Disponible dentro del módulo en la tab Práctica para los países que publican cortes oficiales por carrera: PAA (CR), PHUMA (HN), UP (PA). No aplica para GT ni SV en v1.

Aparece como sección "Cortes [año anterior]" (ej: "Cortes 2025") dentro de la pantalla del módulo universitario.

**Pantalla de cortes:**
- Buscador por nombre de carrera
- Filtro por facultad/área (Ciencias de la Salud, Ingeniería, Humanidades, etc.)
- Cada ítem: carrera, sede/campus si aplica, puntaje de corte, año

**Acceso:** todos los usuarios con ese módulo activo (free y pago), sin paywall. Es información pública de referencia.

**Gestión de contenido:** el equipo Kódi carga los datos una vez al año, después de que cada universidad publica resultados oficiales. Campos: universidad, carrera, sede, puntaje de corte, año, país.

### 6.4 Tab Jugar

Centro de modos de juego — las features más divertidas y virales con máxima visibilidad. El módulo activo se selecciona desde el pill global en el header.

**Modo Principal — Partida Kodi** *(estilo Preguntados)*
- Ruleta dinámica con un sector por materia del módulo — sin mínimo de materias; si el módulo tiene 2-3, se juega con esas (las categorías pueden repetirse en la ruleta)
- Turnos asincrónicos: girás y respondés preguntas de esa materia hasta que fallás — al primer error termina tu turno y le toca al rival. Cada turno tiene **24 horas** para jugarse — si expira, la partida se cancela y el rival gana por abandono
- Capturar una materia: respondé todas las preguntas del turno sin fallar → ganás la corona de esa materia
- Condición de victoria: primer jugador en capturar todas las materias gana
- Podés tener múltiples partidas abiertas simultáneamente con distintos rivales
- Modos: vs aleatorio (matchmaking por país y módulo) o vs amigo (reto directo)

**Modos Rápidos** *(individual)*
- **Contrarreloj** — 60 segundos (Básico+)
- **Supervivencia** — 3 vidas (Básico+)

**Arena de Supervivencia** *(multijugador en tiempo real)*
- Respondé preguntas para sobrevivir — un error y quedás eliminado
- Último sobreviviente gana (ver recompensas en §7.5.1)
- Tres variantes:
  - **Arena Rápida:** on-demand, mínimo 10 jugadores, se rellena con bots silenciosamente si no hay suficientes reales
  - **Arena Especial:** 1 vez por semana a hora fija, solo jugadores reales, premio mayor
  - **Arena entre amigos:** lobby privado creado por el anfitrión, se invita a amigos, arranca cuando el anfitrión decide — sin mínimo de jugadores
- Validación de módulo y acceso free (video) aplica igual que en los demás modos

**Reglas de acceso:**
- **Usuarios free:** ver un video patrocinado para iniciar cada partida o modo rápido
- **Reto a amigo / Arena entre amigos:** el retador elige el módulo. El retado debe tener ese módulo registrado para aceptar; si no lo tiene, recibe prompt para agregarlo (gratis) antes de aceptar. Si el retado es free en ese módulo, aplica la regla de video por partida.

### 6.5 Tab Rankings

Rankings siempre filtrados por **país y módulo activo**. Dos vistas:

- **Tu liga** — tu posición dentro del grupo de ~30 de tu liga semanal
- **Amigos** — ranking solo entre tus amigos

Accesible para **todos los planes**. Los usuarios de pago tienen ventaja natural por acceso a más features (simulacros, ruta adaptativa, más partidas) — esto actúa como incentivo de conversión. Mi posición destacada aunque esté abajo. **Ranking patrocinado:** logo del sponsor del mes + premios para el top.

### 6.6 Tab Beneficios

Balance de Kolones y Kokos visible en el header. Dos sub-tabs:

**Sub-tab Cupones**
- Grid de cupones de marcas locales del país → canjear con Kolones
- Videos opcionales → ver video de sponsor = 1 Kokos (máx 5/día)
- **Mis cupones activos** — código + QR + fecha de expiración de cada cupón canjeado

**Sub-tab Tienda**
- Cosméticos y funcionales → comprar con Kokos
- Packs de Kokos (IAP)
- Inventario de items comprados

### 6.7 Tab Perfil

- Avatar, nombre, título activo
- Racha, liga, nivel, XP
- Meta diaria (configurar, racha de metas)
- Estadísticas (básicas free / avanzadas premium)
- Predictor de nota (Pro)
- Logros e insignias
- **Amigos:** conteo + preview de últimos activos → tap abre pantalla dedicada con buscador, lista (racha y liga de cada amigo), solicitudes pendientes, agregar por usuario o link, acceso rápido a retar
- Configuración: país, módulos, plan, notificaciones, legal
- Cerrar sesión / eliminar cuenta

---

## 7. Gamificación & Retención

### 7.1 Rachas

Un día con al menos 1 práctica = racha mantenida. Se reinicia a 0 si no practicás (a menos que tengas protección). +5 Kolones/día por mantener racha.

**Protección de racha (dos niveles):**
- **Streak freeze gratis:** 1 por semana, activado manualmente por el usuario (POST /streak/freeze). No se acumula — si no se usa, se pierde al inicio de la siguiente semana. Red de seguridad para días sin internet o disponibilidad. Vital en mercados con conectividad inestable (Honduras, Guatemala).
- **Protector de Racha (Kokos):** ilimitado si tenés Kokos. Se activa manualmente como respaldo adicional al freeze gratuito semanal.

### 7.2 Meta Diaria de Aprendizaje

- Configurable: 10/20/30/50 preguntas/día
- Cualquier pregunta cuenta (práctica, simulacro, juego, ruta, sorpresa, duelo, modo grupal)
- Al completar: +15 XP + 10 Kolones (claim explícito con animación)
- Racha de metas: días consecutivos cumplidos
- Accesible para **todos los planes** (incluyendo free)

### 7.3 Misiones Diarias

2-3 misiones/día contextuales al examen activo. Ej: "Responde 10 preguntas", "5 de verbal", "Ganá 1 duelo". Las misiones expiran a medianoche (hora local) sin rollover — al día siguiente se generan nuevas.

### 7.4 Modos Rápidos (Básico+)

**Contrarreloj:** 60 segundos, respondé tantas preguntas como puedas. +10 XP por correcta, +5 bonus si <3s.

**Supervivencia:** 3 vidas, sin límite de tiempo. Cada 5 correctas sube dificultad. Error = pierde vida. 0 vidas = Game Over. Segunda Oportunidad (1 vida, 1 vez por partida) disponible con Kokos.

Free: ver video patrocinado para iniciar cada partida. Básico+: ilimitadas.

### 7.5 Partida Kodi — Modo Principal Multijugador

Mecánica central inspirada en Preguntados que transforma Kodi en experiencia social y competitiva:

#### Mecánica de juego
- **Ruleta dinámica:** sectores = materias del módulo activo — sin mínimo de materias; si el módulo tiene 2-3, se juega con esas (las categorías pueden repetirse en la ruleta)
- **Turnos asincrónicos:** girás y respondés preguntas hasta que fallás — al primer error termina tu turno; el rival recibe notificación push. Cada turno tiene **24 horas** para jugarse — si el tiempo expira, la partida se cancela automáticamente y el rival gana por abandono
- **Capturar materia:** respondé todas las preguntas del turno sin fallar → ganás la corona. Si fallás, el rival puede intentar robarla en su turno
- **Victoria:** primer jugador en capturar todas las materias del módulo gana
- **Partidas simultáneas:** podés tener múltiples partidas abiertas con distintos rivales

#### Modos de partida
- **vs Aleatorio:** matchmaking por país y módulo. Si no hay match en ~20s: bot con IA simula rival real con nombre y avatar de usuario ficticio — el jugador no sabe que es un bot
- **vs Amigo:** reto directo desde la app. Motor principal de viralidad orgánica

#### Acceso por plan

| Modo | Free | Básico | Plus/Pro |
|------|------|--------|----------|
| Partida Kodi vs aleatorio | Video por partida | Ilimitado | Ilimitado |
| Partida Kodi vs amigo | Video por partida | Ilimitado | Ilimitado |
| Contrarreloj | Video por partida | Ilimitado | Ilimitado |
| Supervivencia | Video por partida | Ilimitado | Ilimitado |

**XP en multijugador:** cuenta para ligas, pero moderado — menos que práctica y simulacros. El estudio serio sigue siendo el camino principal a los rankings.

### 7.5.1 Arena de Supervivencia

Battle royale de trivia en tiempo real. Respondé correctamente para sobrevivir — un error y quedás eliminado. Último sobreviviente gana.

**Variantes:**
- **Arena Rápida (on-demand):** mínimo 10 jugadores para arrancar. Si no hay suficientes reales en ~30s, se rellena silenciosamente con bots. Disponible en cualquier momento
- **Arena Especial (programada):** 1 vez por semana a hora fija, solo jugadores reales, premio mayor. Genera FOMO y retención semanal
- **Arena entre amigos:** lobby privado — el anfitrión crea la sala, invita amigos y decide cuándo arrancar. Sin mínimo de jugadores

**Reglas:** todas las arenas son por módulo activo. Validación de módulo aplica igual que en Partida Kodi. Usuarios free ven un video para entrar.

**Gran recompensa al ganador:**

| Arena | Pack |
|-------|------|
| Rápida | 50 Kolones + 30 Kokos + Título exclusivo |
| Especial | 150 Kolones + 100 Kokos + Marco de perfil + Título exclusivo |

### 7.6 Combo System

Respuestas correctas consecutivas acumulan un multiplicador de XP:
- 3 seguidas = x1.5 XP
- 5 seguidas = x2 XP
- 10 seguidas = x3 XP + animación especial

Cada error resetea el combo. Cerrar la app también resetea el combo — es por sesión continua. Aplica en práctica, modos de juego y multijugador. No aplica en simulacros (sin feedback inmediato). Transforma cada pregunta en un mini-reto de mantener la racha.

### 7.7 Revancha en Duelos

Al perder un duelo, botón inmediato "Revancha" que notifica al oponente. Si acepta, se juega otro duelo con las mismas condiciones. Extiende sesiones por orgullo y crea rivalidades naturales.

### 7.8 Ruta de Estudio Adaptativa (Plus/Pro)

La app analiza rendimiento por tema y genera una ruta diaria que prioriza temas débiles. Lógica determinística basada en los últimos 10 intentos por tema (mínimo 5 para clasificar):

| Estado | Criterio |
|--------|---------|
| Sin intentar | 0 intentos |
| Sin datos | 1–4 intentos — se trata como débil hasta tener suficientes datos |
| Débil | ≥ 5 intentos + < 60% correctas |
| En progreso | ≥ 5 intentos + 60–79% correctas |
| Dominado | ≥ 5 intentos + ≥ 80% correctas |

**Prioridad de la ruta diaria:** Débil → Sin intentar/Sin datos → En progreso → Dominado (spaced repetition: solo si hace más de 14 días que se dominó).

**Plus:** ruta determinística — ordena temas según las reglas anteriores, sin explicación.
**Pro:** ruta con Coach IA — misma lógica de base, pero cada tema recomendado incluye un razonamiento generado por IA explicando el *por qué* y su impacto estimado en la nota (ver §7.9.1).

### 7.9 Tutor IA "Explicame" (Pro)

Después de responder, el usuario toca "Explicame" y recibe una explicación personalizada por IA. Hasta 2 follow-ups ("No entendí", "Dame un ejemplo"). 40 explicaciones/día por módulo activo — el contador es independiente por módulo.

### 7.9.1 Coach IA Personal (Pro)

Suite de features de IA que convierte Pro en un tutor personal, no solo "más funciones". Todas usan Claude Haiku. Costo estimado: ~$0.49/usuario Pro/mes (realista, asumiendo ~50% de uso del tope de Explicame).

**① Plan Diario con Razonamiento**
El tema recomendado del día en Tab Práctica incluye una explicación IA del *por qué*:
> *"Hoy: Señales preventivas — fallaste 4 de tus últimas 6 preguntas aquí. Este tema representa el 18% del examen. Dominarlo puede subir tu nota estimada en ~8 puntos."*
Se genera una vez por día por módulo activo. 1 llamada/día.

**② Debrief de Sesión IA**
Al terminar una sesión, el resumen estadístico existente se complementa con un insight generado por IA sobre patrones de error:
> *"Tus errores se concentran en preguntas con dos opciones similares — señal de que memorizás en lugar de entender el concepto."*
1 llamada por sesión completada.

**③ Debrief Semanal**
Cada lunes, el Coach genera un análisis de la semana anterior: patrón de errores, progreso por materia, comparación vs semana anterior y foco recomendado para la semana nueva. Se muestra como card dismissible en Tab Práctica. 1 llamada/semana, generada por BullMQ.

**④ Plan hacia el Examen**
Si el usuario registra la fecha de su examen real, el Coach genera un plan de semanas desglosado:
> *"Tenés 5 semanas. Semanas 1-2: señales (crítico). Semanas 3-4: legislación + factor humano. Semana 5: repaso general + 2 simulacros."*
Se actualiza semanalmente o si cambia la fecha. 1 llamada al configurar + 1 semanal si hay cambios.

**⑤ Análisis IA de Simulacro**
Después de cada simulacro (Plus/Pro), el Coach genera un análisis del resultado: qué falló, qué patrón hay, qué priorizar antes del próximo intento. Complementa el desglose estadístico existente. ~10 simulacros/mes por usuario activo.

**⑥ "¿Por qué sigo fallando esto?" — Diagnóstico Proactivo**
Se activa automáticamente cuando el usuario falla 3 respuestas incorrectas seguidas en la misma materia dentro de una sesión. El Coach interrumpe con una card entre preguntas:
> *"Notamos que fallaste 3 veces seguidas en Señales Preventivas. El problema probablemente no es memorización — es que las triangulares y las circulares se confunden en contexto. Aquí la diferencia clave antes de seguir:"*
El usuario puede descartarla o expandirla. Se dispara máximo 1 vez por materia por sesión. ~2-3 disparos/día por usuario activo.

### 7.10 Predictor de Nota (Pro)

Nota estimada para el examen real basada en rendimiento histórico (cálculo estadístico ponderado por materia, sin IA). Muestra nota numérica + top temas a mejorar con impacto estimado. Mínimo 20 intentos por módulo para mostrar predicción.

### 7.11 Ligas Semanales (Todos)

Grupos de ~30 usuarios del mismo examen **y mismo país**. 4 niveles: Aprendiz → Avanzado → Experto → Genio. Top 10 suben, bottom 5 bajan. Ciclo de lunes a domingo (semana ISO 8601), arranca el lunes 00:00 UTC.

**Por qué semanal:** feedback frecuente y camino visible al techo. Llegar de Aprendiz a Genio toma mínimo 3 semanas consecutivas como top 10 — alcanzable en menos de un mes para usuarios constantes, en lugar de 9 meses como pasaría con sub-niveles mensuales.

**Sponsors y rifas siguen siendo mensuales** — un mes contiene ~4 ciclos de liga. Las rifas premian al user con mejor `final_rank` de Genio dentro del mes (dedupeado por usuario).

**Protección de nuevos usuarios:** en el primer ciclo de liga completo, el usuario no puede descender sin importar su posición final. A partir del segundo ciclo aplican las reglas normales.

**XP semanal:** +10 correcta, +50 simulacro, +20 misión, +15 meta diaria completada, +5 racha/día, +15 modo juego, +8 duelo ganado.

**Premios por ascenso de liga:**

| Liga alcanzada | Kolones | Kokos | Insignia | Pack Tienda |
|----------------|--------:|------:|:--------:|:------------|
| Aprendiz | 40 | 8 | ✓ | Protector de Racha + Segunda Oportunidad + Título exclusivo |
| Avanzado | 100 | 25 | ✓ | Marco de perfil temático + Título exclusivo |
| Experto | 200 | 60 | ✓ | Animación de respuesta + Avatar premium + Título exclusivo |
| Genio | 350 | 120 | ✓ | Tema de app + 50 Kokos bonus + Título exclusivo |

La insignia exclusiva se otorga al **primer ascenso** a cada tier (Aprendiz, Avanzado, Experto, Genio), no en cada ciclo semanal.

### 7.12 Examen Sorpresa (Plus/Pro)

Push diario a hora aleatoria (10:00-20:00 hora local): "5 preguntas, doble XP." Ventana de 2-4 horas para completarlo (no 5 minutos — un estudiante en clase o sin datos no puede responder al instante). Si completa dentro de la ventana, XP × 2.

### 7.13 Personajes Regionales — "Profesores" por Zona

Un cast de personajes (animales + plantas + humanos estilizados) que funcionan como "profesores" de cada zona. Aparecen cuando practicás temas de su región con mensajes de motivación y flavor text localizado. Kodi el perezoso sigue siendo la mascota general de la app — coexisten.

**Función en la app:**
- Guías de aprendizaje de su región
- Tips y motivación con flavor text localizado al practicar temas de su zona
- Reaccionan a respuestas correctas/incorrectas en su zona

**Escalabilidad a Centroamérica:**
- Cada país define su propio número de personajes según su diversidad cultural
- No hay regla fija (Guatemala puede tener 5 por regiones, Panamá 3)
- Se diseñan cuando haya tracción en cada país
- Arquitectura lo soporta desde día 1 (personajes ligados a país + región)

**Dónde NO aparecen:** no son avatares del usuario, no aparecen en duelos/rankings, no se compran ni desbloquean.

### 7.14 Logros, Insignias, Avatares y XP

- **Insignias:** por hitos (racha 7 días, 10 correctas seguidas, simulacro completado, duelo ganado, etc.)
- **Títulos:** texto bajo el nombre ("En racha", "Simulador", "Conductor seguro", "Duelista")
- **Avatares:** conjunto fijo + premium en Tienda de Estilo, localizados por país
- **XP y niveles:** por actividad, recompensa solo cosmética

**Kokos por logro — tiers:**

Los logros especiales son la fuente principal de Kokos gratuitos. Cada logro pertenece a un tier:

| Tier | Cuándo se desbloquea | Kokos |
|------|---------------------|------:|
| Común | Hitos del primer día / primera semana | 5–15 |
| Poco común | Hitos de semanas 2–4 | 20–40 |
| Raro | Hitos de 1–3 meses de uso | 50–100 |
| Épico | Hitos excepcionales (100 días de racha, liga Genio, etc.) | 150–300 |

Con ~25-30 logros totales, un usuario que los complete todos acumula ~1,300-1,400 Kokos de por vida. Los videos opcionales (5 Kokos/día) son fuente secundaria. IAP para quien quiere items premium sin esperar.

### 7.15 Sistema de Amigos

#### Agregar amigos (4 métodos)
- **Código de amigo:** cada usuario tiene un código único (ej: "KODI-4829"), buscar por username o código
- **Contactos del teléfono:** importar contactos, detectar quiénes ya tienen Kodi
- **Redes sociales:** conectar Facebook, Google o Apple para encontrar amigos que usen Kodi
- **Desde interacciones:** al terminar un duelo con alguien, opción "Agregar como amigo"

#### Estado y actividad
- **Online/offline:** indicador verde (online) / gris (offline) en lista de amigos
- **Feed de hitos:** solo eventos importantes — ascenso de liga, racha milestone, logro nuevo, simulacro completado. Sin spam.

#### Ubicación en la app
- **Tab Perfil:** lista completa de amigos, gestionar (agregar, eliminar, bloquear), feed de hitos
- **Tab Jugar:** sección "Amigos online" con acceso rápido para retar en tiempo real

#### Límites y privacidad
- Máximo 200 amigos por cuenta
- Solicitud de amistad requiere aceptación
- Opción de bloquear usuarios

### 7.16 Share Cards — Motor Viral

Share cards visuales branded compartibles en WhatsApp, Instagram Stories y TikTok. Botón "Compartir" nativo optimizado para WhatsApp (canal #1 en Centroamérica).

**Momentos de share:**
- Resultado de simulacro (nota + desglose)
- Racha milestone (7, 30, 100 días)
- Ascenso de liga
- Duelo ganado
- "Aprobé mi examen con Kodi" (post-examen)
- Resumen de sesión

Cada share card incluye branding de Kodi + deep link para que quien la vea pueda descargar la app.

### 7.17 Retención Post-Examen

El usuario reporta manualmente que aprobó desde Tab Perfil: "¿Ya hiciste tu examen?" → "¿Lo aprobaste?" → Sí. Esto activa:
- **Badge "Aprobado":** insignia especial visible en perfil
- **Share card post-examen:** "Aprobé con Kodi" — branded, compartible, funciona como testimonio social
- **Cross-sell:** "Ya sacaste licencia de auto, ¿y la de moto?" / "Pasaste la PNE, preparáte para la PAA"

### 7.18 Modo Offline

Cache local de preguntas ya descargadas. Al menos práctica individual funciona sin internet. XP, Kolones y progreso se sincronizan cuando vuelve la conexión. Vital en mercados con conectividad inestable (Honduras 48%, Guatemala 65% penetración).

Duelos, Arena entre amigos y otras features en tiempo real requieren conexión.

### 7.19 Sorteos "Ganá Estudiando"

- Frecuencia: **1 por mes por país**
- Separados por país, premios locales relevantes
- **Mecánica:** no es rifa al azar — ganan los users con mejor `final_rank` de Genio entre todas las semanas del mes (dedupeado: un user que llegó a Genio varias semanas entra una sola vez con su mejor posición). Mérito puro: hay que llegar a Genio y rendir ahí.
- **Cantidad de premios:** variable según patrocinador del mes
- **Elegibilidad:** exclusiva para usuarios en liga Genio — Free, Plus y Pro por igual. No comprable.
- CR: premios financiados/donados por sponsors propios
- GT, SV, HN, PA: premios financiados/coordinados por partners locales
- **Compliance:** validar regulación local de sorteos/promociones en cada país antes de lanzar

### 7.20 Widgets (Home Screen)

Widgets nativos iOS/Android disponibles solo para suscriptores **Plus y Pro**. Solo muestran información — tap abre la app. Datos actualizados desde caché local; se sincronizan al abrir la app.

Un solo widget "Kodi" en tres tamaños:

| Tamaño | Contenido | Tap |
|--------|-----------|-----|
| **Small (2×2)** | Racha de días (número grande + flama) | Abre Tab Práctica |
| **Medium (4×2)** | Racha + barra de progreso meta diaria (X/Y XP) | Abre Tab Práctica |
| **Large (4×4)** | Racha + meta diaria + posición en liga ("Liga Genio · #3") + misión activa del día | Abre Tab Práctica |

---

## 8. Notificaciones Push

| Tipo | Contenido | Frecuencia | Audiencia |
|------|-----------|------------|-----------|
| Racha en peligro | "No perdás tu racha de X días" | Diaria 20:00 si no practicó | Todos |
| Examen sorpresa | "Examen sorpresa: 5 preguntas con doble XP. Respondé antes que expire." | Diaria 10:00-20:00 aleatoria | Plus/Pro |
| Liga semanal | "Subiste a Avanzado" / "Cuidado, zona de descenso" | Semanal (lunes) | Todos |
| Misión completada | "Misión completada" | Al completar | Todos |
| Partida Kodi — turno activo | "Es tu turno — X está esperando" | Al tocar turno | Todos |
| Partida Kodi — expiración próxima | "Tu turno vence en 2 horas — jugá antes de perder la partida" | A las 22h del turno activo | Todos |
| Reto de amigo | "X te retó a un duelo" | Al recibir reto | Todos |
| Arena Especial | "Arena Especial comienza en 30 minutos — ¿vas a competir?" | Semanal (30 min antes) | Todos |
| Sorteo | "Sorteo del mes — estudiá, llegá a Genio y ganá" | Mensual | Todos |

---

## 9. Deep Linking

| Ruta | Acción |
|------|--------|
| `kodi.app/challenge/:id` | Reto entre amigos |
| `kodi.app/share/:type/:id` | Ver resultado compartido — tipos válidos: `simulacro`, `racha`, `liga`, `duelo`, `examen` |
| `kodi.app/reset-password?token=X` | Recuperar contraseña |
| `kodi.app/consent?token=X` | Consentimiento parental |
| `kodi.app/coupon/:code` | Canjear cupón |

---

## 10. Identidad de Marca

### Personalidad

**Tono:** Fresco pero maduro. No infantil, no corporativo. Un amigo centroamericano que sabe del tema.

**Voz localizada por país:**

| País | Voseo/tuteo | Expresiones | Ejemplos |
|------|-------------|-------------|----------|
| Costa Rica | Voseo tico | "Pura vida", "Mae", "Diay" | "Practicá", "Dale mae" |
| Guatemala | Voseo + tú | "Cabal", "Mish", "A huevos" | "Estudiá", "Qué cabal" |
| El Salvador | Voseo | "Chivo", "Púchica", "Cabal" | "Practicá", "Qué chivo" |
| Honduras | Voseo | "Maje", "Mirá pues", "Catracho" | "Practicá maje", "Mirá pues" |
| Panamá | Tú | "Chuleta", "Ñeque", "Xopa" | "Practica", "Dale que tú puedes" |

**Valores:** Confianza, progreso a tu ritmo, accesibilidad, orgullo centroamericano.

### Mascota — Kodi el Perezoso

- Perezoso de dos dedos (especie emblemática de Centroamérica)
- Lentes redondos (toque estudioso)
- Estilo flat/semi-flat con líneas suaves

| Estado | Descripción | Cuándo aparece |
|--------|-------------|----------------|
| Neutro/bienvenida | Colgado de rama, sonrisa relajada | Onboarding, home |
| Celebración | Brazos arriba, ojos brillantes | Racha, logro, correcta, duelo ganado |
| Motivación | Señalando con el dedo | CTA upgrade |
| Decepción suave | Cabeza ladeada | Incorrecta, simulacro bajo, duelo perdido |
| Dormido | Z's flotando | Racha rota, inactividad |
| Sorpresa | Ojos grandes, lentes torcidos | Examen sorpresa |

Aparece solo en momentos clave — presencia puntual para máximo impacto.

### Paleta de Colores

#### Colores de Marca

| Nombre | Hex |
|--------|-----|
| Blanco Kodi | `#FEFEFE` |
| Teal Kodi | `#408D99` |
| Café Oscuro | `#422622` |
| Coral | `#F47C6B` |
| Dorado | `#E3B23C` |
| Verde Lima | `#9BCB6C` |
| Azul Cielo | `#5DB7E8` |
| Durazno | `#F6B38E` |

#### Escala Neutral

| Token | Light | Dark |
|-------|-------|------|
| `neutral-base` | `#FFFFFF` | `#000000` |
| `neutral-50` | `#FAFAFA` | `#0A0A0A` |
| `neutral-100` | `#F5F5F5` | `#171717` |
| `neutral-200` | `#E5E5E5` | `#262626` |
| `neutral-300` | `#D4D4D4` | `#373737` |
| `neutral-400` | `#A3A3A3` | `#525252` |
| `neutral-500` | `#737373` | `#8A8A8A` |
| `neutral-600` | `#525252` | `#A3A3A3` |
| `neutral-700` | `#404040` | `#D4D4D4` |
| `neutral-800` | `#262626` | `#E5E5E5` |
| `neutral-900` | `#171717` | `#F5F5F5` |
| `neutral-950` | `#0A0A0A` | `#FAFAFA` |

---

### Tipografía

Dos fuentes con roles distintos:

#### Dongle — Display / Especiales
Para headlines, títulos de pantalla, mascota, momentos de celebración. Transmite calidez y personalidad centroamericana.

| Uso | Peso | Tamaño |
|-----|------|--------|
| Títulos principales | Bold (700) | 28-40px |
| Subtítulos de sección | Bold (700) | 20-24px |
| Scores / números grandes | Bold (700) | 48-72px |
| Copy de mascota / celebración | Bold (700) | 18-22px |

#### Poppins — Body / Normal
Para texto de interfaz, instrucciones, preguntas, opciones, labels. Limpia y legible en cualquier tamaño.

| Uso | Peso | Tamaño |
|-----|------|--------|
| Body / instrucciones | Regular (400) | 16px |
| Labels / placeholders | Regular (400) | 13-14px |
| Botones | SemiBold (600) | 15-16px |
| Preguntas del examen | Medium (500) | 16-18px |
| Opciones de respuesta | Regular (400) | 15px |
| Texto secundario / hints | Regular (400) | 12-13px |

> **Regla:** Dongle para lo que el usuario *siente*, Poppins para lo que el usuario *lee*.

### Política de Contenido

- **Apropiada para todos los públicos** (incluye menores de 11-12 años)
- **Pantallas de carga:** datos curiosos sobre el país del usuario
- **Prohibido:** marcas de alcohol, tabaco, apuestas, contenido no apto para menores
- **Categorías de patrocinadores permitidas:** academias, librerías, restaurantes, tecnología, autoescuelas, universidades, transporte

---

## 11. Legal (pre-lanzamiento)

### Política de Privacidad
- Datos recopilados: email, nombre, país, progreso, estadísticas
- Contactos del teléfono: acceso opcional con permiso explícito (opt-in) — solo para detectar amigos con Kodi, no se almacenan en servidores
- Datos de pago: procesados por Apple/Google (Kodi no almacena tarjetas)
- Menores: consentimiento parental según regulación de cada país
- Terceros: servicio de push notifications, reporte de crashes, Tutor IA (solo texto, sin datos personales)
- Derecho a eliminar cuenta y todos los datos

### Términos de Servicio
- Planes de suscripción y política de cancelación
- Kolones y Kokos: sin valor monetario real, no reembolsables
- Cupones: sujetos a disponibilidad y términos del patrocinador de cada país
- Contenido educativo: no sustituye la preparación oficial
- Prohibiciones: compartir cuentas, usar bots, abusar de videos

### Requisitos de stores que afectan desarrollo
- Account deletion: soft-delete → hard-delete a 30 días (requerido por Apple)
- Age gate: fecha de nacimiento obligatoria al registrarse. Usuarios menores de 13 años requieren consentimiento parental (umbral mínimo por App Store/Google Play). Verificar umbrales específicos por país con asesor legal antes del lanzamiento.
- Apple Developer: $99/año — Google Play Console: $25 único

---

## 12. Efectos de Sonido

Efectos de UI para momentos de gameplay. Sin música de fondo. Estilo universal/gaming (referencia: Duolingo).

**Configuración:** toggle "Efectos de sonido: ON/OFF" en Configuración (Tab Perfil). Activado por defecto. Respeta el modo silencio del dispositivo.

**Regla general de cuenta regresiva:** cualquier contador visible en pantalla activa `snd_countdown` en sus últimos 3 segundos.

### Inventario

| ID | Evento | Descripción del sonido | Contexto |
|----|--------|----------------------|----------|
| `snd_correct` | Respuesta correcta | Ding ascendente, brillante, corto (~0.4s) | Práctica, duelos, Arena, modos rápidos |
| `snd_incorrect` | Respuesta incorrecta | Tono grave descendente, suave (~0.3s) | Todos los modos |
| `snd_combo_3` | Combo ×1.5 | Ding + shimmer, más vivo que correct | Al llegar a 3 correctas seguidas |
| `snd_combo_5` | Combo ×2 | Ascendente + campana doble | Al llegar a 5 correctas seguidas |
| `snd_combo_10` | Combo ×3 | Fanfare corto, eufórico (~0.6s) | Al llegar a 10 correctas seguidas |
| `snd_combo_break` | Combo roto | Tonito decaído, distinto a incorrect | Al romper combo |
| `snd_streak_saved` | Racha mantenida | Cheerful ding + eco | Al completar día con racha activa |
| `snd_streak_lost` | Racha rota | Tono sombrío corto | Al perder racha |
| `snd_daily_goal` | Meta diaria cumplida | Fanfare celebratorio mediano (~1s) | Al reclamar meta diaria |
| `snd_mission_done` | Misión completada | Pop + shimmer ascendente | Al completar misión |
| `snd_achievement` | Logro desbloqueado | Fanfare distintivo, memorable (~1.2s) | Al desbloquear logro o insignia |
| `snd_level_up` | Ascenso de liga | Fanfare épico (~1.5s) | Al subir de liga |
| `snd_ruleta_spin` | Ruleta girando | Tick-tick acelerado, mecánico | Durante el giro de la ruleta en Partida Kodi |
| `snd_ruleta_land` | Ruleta aterriza | Click + resonancia corta | Cuando la ruleta para |
| `snd_crown_capture` | Captura de materia | Sonido de poder, épico corto | Al ganar corona en Partida Kodi |
| `snd_match_win` | Victoria en partida | Fanfare victorioso (~1.5s) | Al ganar Partida Kodi o Arena |
| `snd_match_lose` | Derrota en partida | Melodía descendente suave | Al perder Partida Kodi |
| `snd_arena_eliminate` | Eliminado en Arena | Sonido de "out", grave y definitivo | Al quedar eliminado en Arena de Supervivencia |
| `snd_arena_last` | Último sobreviviente | Stinger de tensión + silencio | Al quedar 2 jugadores en Arena |
| `snd_countdown` | Cuenta regresiva final | Tick ×3 + ding final | Últimos 3s de cualquier contador visible: Contrarreloj, ventana de Examen Sorpresa, Arena, y cualquier timer futuro |
| `snd_life_lost` | Vida perdida | Corazón roto, suave pero claro | Al perder vida en Supervivencia |
| `snd_game_over` | Game over | Melodía corta de derrota | Al quedarse sin vidas en Supervivencia |
| `snd_surprise_exam` | Examen sorpresa | Stinger de alerta, cheerful | Al recibir notificación de examen sorpresa |
| `snd_coupon_redeemed` | Cupón canjeado | Coin drop o cha-ching | Al canjear cupón con Kolones |

