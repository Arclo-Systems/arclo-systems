"use client";

import { ArrowDown, Play } from "lucide-react";
import { useEffect, useRef } from "react";
import { VIDEO } from "@/data/video";

// Un solo avance manda sobre todo: el hero que se apaga, el rótulo que sube,
// el recuadro que crece y el aviso que aparece al final. La sección mide 1,8
// pantallas sobre un hero de una, así que el avance se completa en 0,8
// pantallas de scroll. Crece hasta el 55%; el aviso vive entre 55% y 98%.
const FIN_CRECIMIENTO = 0.55;
const ENTRADA_AVISO: readonly [number, number] = [0.55, 0.65];
const SALIDA_AVISO: readonly [number, number] = [0.9, 0.98];
const DESVANECIDO_HERO = 0.45;
const SEPARACION_ROTULO = 44;
const MARGEN_SUPERIOR = 96;
const ANCHO_INICIAL = 400;
const ALTO_INICIAL = 260;
// Arranca cuando el recuadro ya tomó la pantalla, no mientras crece.
const VISIBLE_PARA_REPRODUCIR = 0.95;

const limitar = (valor: number) => Math.min(1, Math.max(0, valor));
const entre = (valor: number, desde: number, hasta: number) =>
  limitar((valor - desde) / (hasta - desde));

export function VideoSequence() {
  const seccion = useRef<HTMLDivElement>(null);
  const pegado = useRef<HTMLDivElement>(null);
  const marco = useRef<HTMLDivElement>(null);
  const rotulo = useRef<HTMLParagraphElement>(null);
  const aviso = useRef<HTMLDivElement>(null);
  const pieza = useRef<HTMLVideoElement>(null);
  const imagen = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hero = document.getElementById("hero");

    let anchoFinal = ANCHO_INICIAL;
    let altoFinal = ALTO_INICIAL;
    let bajadaInicial = 0;
    let altoSeccion = 0;
    let altoPegado = 0;
    let altoHero = window.innerHeight;
    let pendiente = false;

    const medir = () => {
      const s = seccion.current;
      const m = marco.current;
      if (!s || !m) return;
      // Del DOM y no de `window.innerHeight`: la sección va en
      // `--alto-ventana`, que la barra del navegador no mueve, y la ventana sí.
      altoSeccion = s.getBoundingClientRect().height;
      altoPegado = pegado.current
        ? pegado.current.getBoundingClientRect().height
        : window.innerHeight;
      bajadaInicial = altoPegado - 50 - MARGEN_SUPERIOR;
      anchoFinal = m.offsetWidth || ANCHO_INICIAL;
      altoFinal = m.offsetHeight || ALTO_INICIAL;
      altoHero = hero ? hero.getBoundingClientRect().height : window.innerHeight;
      // El hero de Arclo no mide una pantalla exacta: el margen negativo se ata
      // a su altura real.
      s.style.setProperty("--alto-hero", `${altoHero}px`);
    };

    const limpiar = () => {
      marco.current?.removeAttribute("style");
      pieza.current?.removeAttribute("style");
      imagen.current?.removeAttribute("style");
      rotulo.current?.removeAttribute("style");
      aviso.current?.removeAttribute("style");
      if (hero) hero.style.opacity = "";
      seccion.current?.removeAttribute("style");
    };

    const pintar = () => {
      pendiente = false;
      const s = seccion.current;
      const m = marco.current;
      if (!s || !m || quieto.matches) return;

      const avance = limitar(window.scrollY / (altoSeccion - altoPegado));
      const crecer = limitar(avance / FIN_CRECIMIENTO);
      const arriba = MARGEN_SUPERIOR + bajadaInicial * (1 - crecer);

      const escalaX =
        (ANCHO_INICIAL + (anchoFinal - ANCHO_INICIAL) * crecer) / anchoFinal;
      const escalaY =
        (ALTO_INICIAL + (altoFinal - ALTO_INICIAL) * crecer) / altoFinal;

      // `transform` directo en cada elemento y no variables CSS en el padre:
      // tocar una variable en el marco recalcula el estilo de todo el subárbol.
      m.style.transform = `translate(-50%, ${arriba}px) scale(${escalaX}, ${escalaY})`;

      const contenido = pieza.current ?? imagen.current;
      if (contenido) {
        contenido.style.transform = `scale(${1 / escalaX}, ${1 / escalaY})`;
      }

      if (rotulo.current) {
        rotulo.current.style.transform = `translate(-50%, ${arriba - SEPARACION_ROTULO}px)`;
        rotulo.current.style.opacity = String(1 - entre(avance, 0, 0.1));
      }

      if (aviso.current) {
        aviso.current.style.opacity = String(
          entre(avance, ENTRADA_AVISO[0], ENTRADA_AVISO[1]) *
            (1 - entre(avance, SALIDA_AVISO[0], SALIDA_AVISO[1])),
        );
      }

      // El hero se apaga en el primer 45% de su propia altura, no del avance de
      // la secuencia: así no depende de cuán alto sea el recuadro.
      if (hero) {
        hero.style.opacity = String(
          1 - entre(window.scrollY, 0, altoHero * DESVANECIDO_HERO),
        );
      }
    };

    const agendar = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(pintar);
    };

    const alRedimensionar = () => {
      medir();
      agendar();
    };

    const alCambiarPreferencia = () => {
      limpiar();
      alRedimensionar();
    };

    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", alRedimensionar);
    quieto.addEventListener("change", alCambiarPreferencia);
    medir();
    pintar();

    const v = pieza.current;
    const observador = v
      ? new IntersectionObserver(
          ([entrada]) => {
            if (entrada.intersectionRatio >= VISIBLE_PARA_REPRODUCIR) {
              v.play().catch(() => {});
            } else {
              v.pause();
            }
          },
          { threshold: [0, VISIBLE_PARA_REPRODUCIR, 1] },
        )
      : null;
    if (v && observador) observador.observe(v);

    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", alRedimensionar);
      quieto.removeEventListener("change", alCambiarPreferencia);
      observador?.disconnect();
      limpiar();
    };
  }, []);

  if (!VIDEO.archivo && !VIDEO.portada) return null;

  return (
    <div className="secuencia" ref={seccion}>
      <div className="secuencia__pegado" ref={pegado}>
        <p className="secuencia__rotulo" ref={rotulo} aria-hidden="true">
          <Play className="secuencia__play" size={13} strokeWidth={2.5} fill="currentColor" />
          {VIDEO.rotulo}
        </p>

        <div className="secuencia__marco" ref={marco}>
          {VIDEO.archivo ? (
            <video
              ref={pieza}
              className="secuencia__pieza"
              src={VIDEO.archivo}
              poster={VIDEO.portada ?? undefined}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={VIDEO.descripcion}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={imagen}
              className="secuencia__pieza"
              src={VIDEO.portada as string}
              alt={VIDEO.descripcion}
              loading="lazy"
            />
          )}

          <div className="secuencia__aviso" ref={aviso} aria-hidden="true">
            <span className="secuencia__aviso-texto">{VIDEO.aviso}</span>
            <ArrowDown className="secuencia__flecha" size={14} strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </div>
  );
}
