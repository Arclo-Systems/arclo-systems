"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const TextPath = dynamic(() => import("@/components/text-path"), { ssr: false });

const WAVE_PATH =
  "M 0 80 Q 150 30 300 80 Q 450 130 600 80 Q 750 30 900 80 Q 1050 130 1200 80";

/**
 * El ancho del `viewBox` decide cuánto se ve, y con eso el tamaño aparente:
 * el SVG se estira a `w-full`, así que la escala es `ancho / viewBox`. Angostar
 * el recorte agranda el texto sin tocar la tipografía, y en una cinta que se
 * desplaza no importa ver menos tramo de la onda.
 *
 * Con estos tres, la letra se ve entre 29 y 43px según la pantalla.
 */
const RECORTE = { movil: 680, tablet: 950, escritorio: 1200 } as const;

const suscribir = (consulta: string) => (avisar: () => void) => {
  const mq = window.matchMedia(consulta);
  mq.addEventListener("change", avisar);
  return () => mq.removeEventListener("change", avisar);
};

const DESDE_SM = "(min-width: 40rem)";
const DESDE_LG = "(min-width: 64rem)";

export function TextSeparator({ text }: { text: string }) {
  const sm = useSyncExternalStore(
    suscribir(DESDE_SM),
    () => window.matchMedia(DESDE_SM).matches,
    () => true,
  );
  const lg = useSyncExternalStore(
    suscribir(DESDE_LG),
    () => window.matchMedia(DESDE_LG).matches,
    () => true,
  );

  const ancho = lg
    ? RECORTE.escritorio
    : sm
      ? RECORTE.tablet
      : RECORTE.movil;

  return (
    <div className="w-full py-4 text-border sm:py-8">
      <TextPath
        text={text}
        path={WAVE_PATH}
        fontSize="50px"
        letterSpacing="0"
        duration={21}
        reversed
        viewBox={`0 0 ${ancho} 160`}
        pathScale={1}
      />
    </div>
  );
}
