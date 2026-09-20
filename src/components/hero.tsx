"use client";

import { useTranslations } from "next-intl";
import { useContext } from "react";
import { CargaContext } from "@/components/page-preloader";
import ThreeDLetterSwap from "@/components/3d-letter-swap";
import { Reveal } from "@/components/reveal";
import { Link } from "@/i18n/navigation";

const WHATSAPP = "https://wa.me/50683165810";

// lucide-react 1.x quitó los íconos de marca, así que este va a mano.
function IconoWhatsApp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.465 3.488" />
    </svg>
  );
}

export function Hero() {
  const t = useTranslations("Hero");
  // El giro no puede gastarse detrás de la cortina: ahí nadie lo ve.
  const carga = useContext(CargaContext);
  const listo = carga?.listo ?? true;

  return (
    <section
      id="hero"
      className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 py-20 text-center sm:py-28 lg:px-8"
    >
      {/* Sin enlace a propósito: arriba sólo compiten los dos CTA. */}
      <Reveal>
        <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-background/60 py-2 pr-4 pl-3.5 backdrop-blur-sm">
          {/* El punto de "en vivo": el disco quieto y detrás un anillo que se
              expande y se desvanece. Dos capas, no una que parpadee. */}
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          <span className="text-sm text-muted-foreground">
            {t("badgeText")}
          </span>
        </p>
      </Reveal>

      {/* La primera línea entra plana y la segunda gira letra por letra: el
          contraste es lo que hace que se lea la promesa, no el efecto. */}
      {/* Fluido en vez de cuatro escalones: a 390px `text-4xl` no dejaba entrar
          "Necesita mejor software." en una línea. */}
      <h1 className="mt-8 max-w-5xl text-[clamp(1.625rem,6.5vw,4.5rem)] leading-[1.22] md:leading-[1.05] font-medium tracking-tight text-balance">
        <Reveal>
          <span className="block text-muted-foreground">{t("titleLead")}</span>
        </Reveal>
        {/* La opacidad va por clase y no envuelta en `Reveal`: un `div` dentro
            de un `h1` no es contenido válido, y acá alcanza con un estilo. */}
        <ThreeDLetterSwap
          as="span"
          className={`block text-foreground transition-opacity duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            listo ? "opacity-100" : "opacity-0"
          }`}
          playOnScroll
          readyToPlay={listo}
          staggerOrigin="first"
          staggerInterval={0.025}
          duration={0.55}
          blur
        >
          {t("titleAccent")}
        </ThreeDLetterSwap>
      </h1>

      <Reveal delay={120}>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
          {t("description")}
        </p>
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {/* Al WhatsApp del negocio y no al formulario: es un canal donde la
              respuesta llega el mismo día. */}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-foreground px-7 text-sm font-medium text-background no-underline transition-[opacity,transform] duration-200 active:scale-97 hover:opacity-85"
          >
            <IconoWhatsApp className="h-4 w-4 shrink-0" />
            {t("cta")}
          </a>
          <Link
            href="/#projects"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border px-7 text-sm font-medium text-foreground transition-[border-color,transform] duration-200 active:scale-97 hover:border-input"
          >
            {t("ourWork")}
          </Link>
        </div>
      </Reveal>

      {/* Lo que el comprador de empresa necesita saber antes de escribir. */}
      <Reveal delay={260}>
        <p className="mt-6 text-xs text-balance text-muted-foreground sm:text-sm">
          {t("trustLine")}
        </p>
      </Reveal>

    </section>
  );
}
