"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { BlurHighlight } from "@/components/blur-highlight";
import { EQUIPO } from "@/data/equipo";

// lucide-react 1.x quitó los íconos de marca, así que este va a mano.
function IconoLinkedIn({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function Team() {
  const t = useTranslations("Team");

  return (
    <section id="about" className="w-full scroll-mt-24 py-16 sm:py-24">
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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {EQUIPO.map((member, i) => {
            const name = t(member.nameKey);
            const initial = name.charAt(0);

            return (
              <Reveal key={member.nameKey} delay={i * 50}>
                <div
                  // En una columna la línea va abajo; desde `sm` la grilla se
                  // parte en dos y una raya horizontal quedaría a media fila,
                  // así que ahí manda el divisor vertical de `lg`.
                  className={`group h-full px-0 lg:px-8 ${
                    i < EQUIPO.length - 1
                      ? "border-b border-border pb-8 sm:border-b-0 sm:pb-0 lg:border-r lg:border-border"
                      : ""
                  } ${i === 0 ? "lg:pl-0" : ""} ${i === EQUIPO.length - 1 ? "lg:pr-0" : ""}`}
                >
                  {/* La cara es lo que transfiere confianza. El monograma es
                      el respaldo mientras no haya foto, no el protagonista. */}
                  {member.foto ? (
                    <Image
                      src={member.foto}
                      alt={name}
                      width={256}
                      height={256}
                      className="h-16 w-16 rounded-full object-cover ring-1 ring-border"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-muted font-outfit text-xl font-bold text-muted-foreground ring-1 ring-border transition-colors duration-300 group-hover:text-brand"
                    >
                      {initial}
                    </span>
                  )}

                  <div className="mt-5 flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {name}
                    </h3>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${name} — LinkedIn`}
                        // El margen negativo agranda el área táctil a 44×44 sin mover el ícono.
                        className="-m-3 inline-flex h-11 w-11 items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-brand"
                      >
                        <IconoLinkedIn className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="mt-1 text-xs font-medium tracking-widest text-brand uppercase">
                    {t(member.roleKey)}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {t(member.descKey)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
