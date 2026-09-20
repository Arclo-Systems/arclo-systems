"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";

const SUAVE = [0.23, 1, 0.32, 1] as const;

// Fuera del render: `motion.create` en cada pase remonta el enlace y le corta
// la animación de entrada.
const MotionLink = motion.create(Link);

const ANCHO = { abierta: 296, escritorio: 200, movil: 128 } as const;

export interface EnlaceMenu {
  readonly texto: string;
  readonly href: string;
  readonly externo?: boolean;
}

export interface GrupoMenu {
  readonly titulo: string;
  readonly enlaces?: readonly EnlaceMenu[];
  /** Un grupo que no es una lista de enlaces dibuja esto en su lugar. */
  readonly contenido?: ReactNode;
  /** El primer grupo va en grande. */
  readonly grande?: boolean;
  /** Las redes van en fila, no en columna. */
  readonly enFila?: boolean;
}

// Los internos pasan por el Link del idioma; `mailto:` y las redes, por <a>.
const esInterno = (enlace: EnlaceMenu) =>
  !enlace.externo && enlace.href.startsWith("/");

interface Props {
  readonly abrir: string;
  readonly cerrar: string;
  readonly grupos: readonly GrupoMenu[];
}

// Trece elementos: sin tope el último abría a 1,13 s. Topeado cierra en 0,52 s.
const retraso = (i: number) => Math.min(0.04 + 0.03 * i, 0.22);

const ENTRADA = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.2, ease: SUAVE, delay: retraso(i) },
      y: {
        type: "spring" as const,
        duration: 0.3,
        bounce: 0.1,
        delay: retraso(i),
      },
    },
  }),
};

// Salir es más rápido que entrar: cerrar no pide que lo miren.
const pasoApertura = (seco: boolean | null, abriendo: boolean) =>
  seco ? { duration: 0.01 } : { duration: abriendo ? 0.24 : 0.16, ease: SUAVE };

function Aspa({ abierto, seco }: { abierto: boolean; seco: boolean | null }) {
  const paso = seco ? { duration: 0.01 } : { duration: 0.2, ease: SUAVE };
  const raya =
    "col-start-1 row-start-1 h-[1.6px] w-[15px] rounded-full bg-current";
  return (
    <span
      className="relative grid h-4 w-4 place-items-center"
      aria-hidden="true"
    >
      <motion.span
        className={raya}
        initial={false}
        animate={{ y: abierto ? 0 : -3, rotate: abierto ? 45 : 0 }}
        transition={paso}
      />
      <motion.span
        className={raya}
        initial={false}
        animate={{ y: abierto ? 0 : 3, rotate: abierto ? -45 : 0 }}
        transition={paso}
      />
    </span>
  );
}

function Rotulo({ valor, seco }: { valor: string; seco: boolean | null }) {
  const minWidth = `${Math.max(valor.length, 6)}ch`;

  // El marcado es el mismo con y sin movimiento reducido: `useReducedMotion`
  // devuelve null en el servidor y true en el cliente, así que ramificar la
  // estructura acá rompía la hidratación.
  return (
    <span
      className="relative grid items-center overflow-hidden"
      style={{ minWidth }}
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={valor}
          className="col-start-1 row-start-1 text-left whitespace-nowrap"
          initial={seco ? { opacity: 0 } : { y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={seco ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
          transition={seco ? { duration: 0.01 } : { duration: 0.28, ease: SUAVE }}
          aria-hidden="true"
        >
          {valor}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Avance() {
  const { scrollYProgress } = useScroll();
  const [porcentaje, setPorcentaje] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setPorcentaje(Math.round(100 * v)),
  );
  return (
    <span
      className="min-w-14 flex-none rounded-full bg-[color-mix(in_srgb,currentColor_16%,transparent)] px-3 py-1.5 text-center text-[0.8125rem] font-medium tabular-nums"
      aria-hidden="true"
    >
      {porcentaje}%
    </span>
  );
}

export function MenuPill({ abrir, cerrar, grupos }: Props) {
  const seco = useReducedMotion();
  const [abierto, setAbierto] = useState(false);
  const [escritorio, setEscritorio] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const consulta = window.matchMedia("(min-width: 768px)");
    const leer = () => setEscritorio(consulta.matches);
    leer();
    consulta.addEventListener("change", leer);
    return () => consulta.removeEventListener("change", leer);
  }, []);

  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(false);
        boton.current?.focus();
      }
    };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [abierto]);

  const cerrarPanel = () => setAbierto(false);

  // El escalón de entrada de cada pieza, calculado antes del marcado: con un
  // contador incrementado durante el render se rompe si alguien memoiza un trozo.
  const escalones = useMemo(() => {
    const mapa = new Map<string, number>();
    let n = 0;
    for (const grupo of grupos) {
      mapa.set(`titulo:${grupo.titulo}`, n++);
      for (const enlace of grupo.enlaces ?? [])
        mapa.set(`enlace:${enlace.href}`, n++);
    }
    return mapa;
  }, [grupos]);

  return (
    <>
      <motion.div
        className="relative rounded-[28px] p-2"
        initial={false}
        animate={{
          width: abierto
            ? ANCHO.abierta
            : escritorio
              ? ANCHO.escritorio
              : ANCHO.movil,
        }}
        transition={pasoApertura(seco, abierto)}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[28px] border border-border bg-background shadow-[0_30px_70px_-24px_rgba(0,0,0,0.25)]"
          initial={false}
          animate={{ opacity: abierto ? 1 : 0 }}
          transition={seco ? { duration: 0.01 } : { duration: 0.2, ease: SUAVE }}
        />

        <div className="relative">
          {/* La barra invierte los colores de la página: es lo que la separa
              del resto de la cabecera. */}
          <div className="flex h-[52px] w-full items-center justify-end gap-2 rounded-full bg-foreground px-1.5 text-background md:justify-between md:pr-2">
            <button
              ref={boton}
              type="button"
              className="flex cursor-pointer items-center gap-2.5 rounded-full px-3 py-1.5 text-sm font-medium text-inherit transition-[opacity,transform] duration-200 [-webkit-tap-highlight-color:transparent] active:scale-97 hover:opacity-80 [@media(pointer:coarse)]:min-h-11"
              aria-expanded={abierto}
              aria-controls="menu-panel"
              aria-label={abierto ? cerrar : abrir}
              onClick={() => setAbierto((v) => !v)}
            >
              <Aspa abierto={abierto} seco={seco} />
              <Rotulo valor={abierto ? cerrar : abrir} seco={seco} />
            </button>
            {escritorio && <Avance />}
          </div>

          <AnimatePresence initial={false}>
            {abierto && (
              <motion.nav
                key="panel"
                id="menu-panel"
                aria-label={abrir}
                className="overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                // AnimatePresence congela las props del nodo que sale, así que
                // la duración de cierre viaja dentro de `exit`.
                exit={{ height: 0, transition: pasoApertura(seco, false) }}
                transition={pasoApertura(seco, true)}
              >
                <div className="flex justify-center">
                  <motion.div
                    className="w-[280px] flex-none px-4 pt-7 pb-3"
                    initial={seco ? false : "hidden"}
                    animate={seco ? undefined : "visible"}
                  >
                    {grupos.map((grupo, g) => (
                      <div
                        key={grupo.titulo}
                        role="group"
                        aria-labelledby={`menu-grupo-${g}`}
                        className={
                          g > 0 ? "mt-6 border-t border-border pt-6" : ""
                        }
                      >
                        <motion.span
                          id={`menu-grupo-${g}`}
                          className="mb-1 block text-[0.6875rem] font-medium tracking-[0.06em] text-muted-foreground uppercase"
                          custom={escalones.get(`titulo:${grupo.titulo}`) ?? 0}
                          variants={ENTRADA}
                        >
                          {grupo.titulo}
                        </motion.span>
                        <div
                          className={
                            grupo.enFila
                              ? "flex flex-wrap gap-x-5 gap-y-2"
                              : "flex flex-col gap-2"
                          }
                        >
                          {grupo.contenido}
                          {(grupo.enlaces ?? []).map((enlace) => {
                            const comun = {
                              onClick: cerrarPanel,
                              className: `w-fit font-medium text-foreground no-underline transition-colors duration-200 hover:text-muted-foreground ${
                                grupo.grande
                                  ? "text-[1.625rem] leading-[1.2] tracking-[-0.025em]"
                                  : "text-sm"
                              }`,
                              custom: escalones.get(`enlace:${enlace.href}`) ?? 0,
                              variants: ENTRADA,
                            };
                            return esInterno(enlace) ? (
                              <MotionLink
                                key={enlace.href}
                                href={enlace.href}
                                {...comun}
                              >
                                {enlace.texto}
                              </MotionLink>
                            ) : (
                              <motion.a
                                key={enlace.href}
                                href={enlace.href}
                                target={enlace.externo ? "_blank" : undefined}
                                rel={
                                  enlace.externo
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                                {...comun}
                              >
                                {enlace.texto}
                              </motion.a>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Un clic fuera cierra el panel. `tabIndex={-1}`: cubre toda la ventana
          con z-index negativo, así que al tabular tomaba el foco sin verse.
          Con teclado cierra Escape. */}
      <AnimatePresence>
        {abierto && (
          <motion.button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            aria-label={cerrar}
            onClick={cerrarPanel}
            className="fixed inset-0 -z-10 cursor-default border-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={seco ? { duration: 0.01 } : { duration: 0.3, ease: SUAVE }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
