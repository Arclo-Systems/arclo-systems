"use client";

import { useTranslations } from "next-intl";
import { Zap, Plug, Bot, Code2, Smartphone, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { BlurHighlight } from "@/components/blur-highlight";

// Integraciones va de segunda a propósito: casi nadie llega pidiendo un agente
// de IA, pero todo el mundo sabe que tiene dos sistemas que no se hablan.
const services = [
  { key: "automations", descKey: "automationsDesc", icon: Zap },
  { key: "integrations", descKey: "integrationsDesc", icon: Plug },
  { key: "ai", descKey: "aiDesc", icon: Bot },
  { key: "customDev", descKey: "customDevDesc", icon: Code2 },
  { key: "apps", descKey: "appsDesc", icon: Smartphone },
] as const;

export function Services() {
  const t = useTranslations("Services");

  return (
    <section id="services" className="w-full scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 sm:mb-16">
          <BlurHighlight
            as="h2"
            className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
            blurAmount={6}
            blurDuration={0.6}
            viewportOptions={{ once: true, amount: 0.3 }}
          >
            {t("title")}
          </BlurHighlight>
          <Reveal>
            <p className="mt-2 max-w-xl text-base text-muted-foreground sm:text-lg">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icono = service.icon;
            return (
              <Reveal key={service.key} delay={i * 50}>
                <div className="group flex h-full flex-col gap-4 bg-background p-7 transition-colors duration-300 hover:bg-card sm:p-8">
                  <Icono
                    className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-brand"
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(service.key)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(service.descKey)}
                  </p>
                </div>
              </Reveal>
            );
          })}

          {/* Cinco tarjetas en una grilla de tres dejan un hueco. En vez de
              reacomodarlas, el hueco dice lo que la lista no puede: que la
              lista no es el límite. */}
          <Reveal delay={services.length * 50}>
            <Link
              href="/#contact"
              className="group flex h-full flex-col gap-4 bg-card/60 p-7 transition-colors duration-300 hover:bg-card sm:p-8"
            >
              <ArrowUpRight
                className="h-5 w-5 text-muted-foreground transition-transform duration-300 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-0.5 group-hover:text-brand"
                aria-hidden="true"
              />
              <h3 className="text-lg font-semibold text-foreground">
                {t("moreTitle")}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("moreDesc")}
              </p>
              <span className="mt-auto pt-2 text-sm font-medium text-brand">
                {t("moreCta")}
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
