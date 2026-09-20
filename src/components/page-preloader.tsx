"use client";

import {
  createContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import StaggeredText from "@/components/staggered-text";

/** Lo consume `Reveal` para no gastar su entrada detrás de la cortina. */
export const CargaContext = createContext<{
  /** La cortina terminó de salir: `Reveal` ya puede animar. */
  listo: boolean;
  /** La cortina empezó a salir: lo pesado ya no compite con el logo. */
  bajando: boolean;
} | null>(null);

const SALIDA_MS = 700;
const RESCATE_MS = 3000;
/** Un instante sobre el logo ya completo, antes de que la cortina salga. */
const RESPIRO_MS = 600;
/**
 * Lo que tarda el logo: 6 letras × 100ms de escalón + 600ms de la última.
 *
 * Va como número y no como `onAnimationComplete`: Motion avisa "completado"
 * aunque la animación sea un no-op, y eso pasa en el primer render, cuando
 * `hasEnteredView` todavía es false y el destino es igual al origen. La cortina
 * se iba antes de que las letras se movieran.
 */
const LOGO_MS = 1100;

const CONSULTA_SECO = "(prefers-reduced-motion: reduce)";

const suscribirSeco = (avisar: () => void) => {
  const mq = window.matchMedia(CONSULTA_SECO);
  mq.addEventListener("change", avisar);
  return () => mq.removeEventListener("change", avisar);
};
const leerSeco = () => window.matchMedia(CONSULTA_SECO).matches;
const leerSecoEnServidor = () => false;

export function PagePreloader({ children }: { children: React.ReactNode }) {
  const seco = useSyncExternalStore(
    suscribirSeco,
    leerSeco,
    leerSecoEnServidor,
  );
  const [bajada, setBajada] = useState(false);
  const [liberado, setLiberado] = useState(false);

  // Quien pidió menos movimiento no ve cortina ni espera a que se levante.
  const visible = !bajada && !seco;
  const listo = liberado || seco;

  // Si el callback de la animación nunca llega, la cortina se quedaría encima
  // con el scroll bloqueado y sin salida.
  useEffect(() => {
    const rescate = setTimeout(() => {
      setBajada(true);
      setLiberado(true);
    }, RESCATE_MS);
    return () => clearTimeout(rescate);
  }, []);

  // El temporizador, y no `onExitComplete`, libera a `Reveal`: si la pestaña
  // está en segundo plano la animación de salida no reporta su final.
  useEffect(() => {
    if (visible) return;
    const liberar = setTimeout(() => setLiberado(true), SALIDA_MS);
    return () => clearTimeout(liberar);
  }, [visible]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    const salir = setTimeout(() => setBajada(true), LOGO_MS + RESPIRO_MS);
    return () => clearTimeout(salir);
  }, []);

  const carga = useMemo(
    () => ({ listo, bajando: !visible }),
    [listo, visible],
  );

  return (
    <>
      <AnimatePresence>
        {visible && (
          // El azul noche del tema oscuro, fijo en los dos temas: el logo del
          // arranque es blanco, así que no puede seguir a `--background`.
          <motion.div
            className="cortina-carga fixed inset-0 z-[200] flex items-center justify-center bg-[#0B111D]"
            exit={{ transform: "translateY(-100%)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-center gap-1">
              <StaggeredText
                text="arclo·"
                as="h1"
                className="font-outfit text-5xl font-bold text-white sm:text-6xl md:text-7xl [&_span:last-child]:text-brand"
                segmentBy="chars"
                delay={100}
                duration={0.6}
                direction="bottom"
                blur={false}
                easing={[0.23, 1, 0.32, 1]}
                staggerDirection="forward"
              />
              <StaggeredText
                text="SYSTEMS"
                as="p"
                className="font-outfit text-lg font-normal tracking-[0.5em] text-white sm:text-xl md:text-2xl"
                segmentBy="chars"
                delay={60}
                duration={0.5}
                direction="bottom"
                blur={false}
                easing={[0.23, 1, 0.32, 1]}
                staggerDirection="forward"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <CargaContext.Provider value={carga}>{children}</CargaContext.Provider>
    </>
  );
}
