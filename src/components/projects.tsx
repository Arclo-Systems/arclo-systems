"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { BlurHighlight } from "@/components/blur-highlight";

// Kodi de primero: es lo más fuerte que hay y antes quedaba al final.
const projects = [
  { key: "project1", href: "https://holakodi.com", enConstruccion: false },
  { key: "project2", href: "https://acaya.app", enConstruccion: false },
  { key: "project3", href: null, enConstruccion: true },
] as const;

export function Projects() {
  const t = useTranslations("Projects");

  return (
    <section id="projects" className="w-full scroll-mt-24 py-16 sm:py-24">
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
            <p className="mt-2 text-base text-muted-foreground sm:text-lg">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {projects.map((project, i) => {
            const num = String(i + 1).padStart(2, "0");
            // La fila entera es el enlace cuando lleva a algún lado.
            const Fila = project.href ? "a" : "div";
            const deEnlace = project.href
              ? {
                  href: project.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": `${t(`${project.key}.name`)} — ${t("visitProject")}`,
                }
              : {};
            return (
              <Reveal key={project.key} delay={i * 100}>
                <Fila
                  {...deEnlace}
                  className="group flex flex-col gap-4 py-8 no-underline transition-transform duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 sm:py-10 lg:flex-row lg:items-start lg:gap-12"
                >
                  <span
                    className={`font-outfit text-5xl leading-none font-bold text-border transition-colors duration-200 sm:text-6xl lg:min-w-[110px] lg:text-7xl ${
                      project.enConstruccion
                        ? ""
                        : "group-hover:text-brand/30"
                    }`}
                  >
                    {num}
                  </span>

                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-xl font-semibold transition-colors duration-200 sm:text-2xl ${
                          project.enConstruccion
                            ? "text-muted-foreground"
                            : "text-foreground group-hover:text-brand"
                        }`}
                      >
                        {t(`${project.key}.name`)}
                      </h3>
                      {/* Complementa a la flecha del hover, no la duplica: se
                          esconde justo donde esa aparece. Sin esto, en un
                          teléfono nada indica que la fila lleva a algún lado.
                          Decorativa: la fila entera ya es el enlace. */}
                      {project.href && (
                        <ArrowUpRight
                          className="h-4 w-4 flex-none text-muted-foreground [@media(min-width:1024px)_and_(hover:hover)_and_(pointer:fine)]:hidden"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <p className="text-xs font-medium tracking-widest text-brand uppercase">
                      {t(`${project.key}.tag`)}
                    </p>
                    <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {t(`${project.key}.description`)}
                    </p>
                  </div>

                  {/* Vive siempre en el DOM y entra corriéndose: sólo donde hay
                      puntero fino, y sólo en las filas que llevan a algún lado. */}
                  {project.href && (
                    <ArrowUpRight
                      className="hidden h-6 w-6 flex-none -translate-x-2 self-center text-foreground opacity-0 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0 group-hover:opacity-100 [@media(min-width:1024px)_and_(hover:hover)_and_(pointer:fine)]:block"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  )}
                </Fila>
              </Reveal>
            );
          })}
        </div>

        {/* Dice que hay demanda sin tener que inventar logos. */}
        <Reveal delay={320}>
          <p className="mt-8 text-sm text-muted-foreground">{t("moreSoon")}</p>
        </Reveal>
      </div>
    </section>
  );
}
