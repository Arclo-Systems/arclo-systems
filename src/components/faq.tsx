"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { BlurHighlight } from "@/components/blur-highlight";

const faqKeys = ["faq1", "faq2", "faq3", "faq4", "faq5", "faq6"] as const;

export function Faq() {
  const t = useTranslations("Faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section id="faq" className="w-full scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
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
            <p className="mt-2 text-base text-muted-foreground sm:text-lg">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="flex flex-col">
            {faqKeys.map((key, i) => {
              const num = String(i + 1).padStart(2, "0");
              const isOpen = openIndex === i;
              const panelId = `faq-panel-${i}`;
              return (
                <div
                  key={key}
                  className="border-b border-border first:border-t"
                >
                  <button
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group flex w-full items-start justify-between gap-4 py-6 text-left sm:py-7"
                  >
                    <div className="flex items-start gap-4">
                      {/* Ancho fijo: el número + gap-4 tiene que dar el mismo
                          pl-9/pl-10 con el que arranca la respuesta. */}
                      <span className="mt-0.5 w-5 shrink-0 text-xs font-medium text-muted-foreground sm:w-6 sm:text-sm">
                        {num}
                      </span>
                      <span className="text-base font-medium text-foreground transition-colors duration-200 group-hover:text-muted-foreground sm:text-lg">
                        {t(`${key}.question`)}
                      </span>
                    </div>
                    <div
                      className="mt-1 shrink-0 transition-transform duration-200"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </button>
                  <div
                    id={panelId}
                    // `inert` y no `hidden`: sacar la respuesta cerrada del árbol
                    // de accesibilidad sin matar la transición del acordeón.
                    inert={!isOpen}
                    aria-hidden={!isOpen}
                    // La contención evita que cada cuadro de la animación
                    // remaquete todo lo que viene después en el flujo.
                    className="grid transition-[grid-template-rows] duration-300 [contain:layout_paint]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div
                        className="pb-6 pl-9 pr-9 transition-opacity duration-200 sm:pb-7 sm:pl-10"
                        // Al abrir el texto entra cuando ya hay lugar; al cerrar se va de una.
                        style={{
                          opacity: isOpen ? 1 : 0,
                          transitionDelay: isOpen ? "80ms" : "0ms",
                        }}
                      >
                        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {t(`${key}.answer`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
