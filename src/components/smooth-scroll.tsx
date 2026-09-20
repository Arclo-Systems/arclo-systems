"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Scroll suavizado para toda la página, portado de la landing de Kodi.
 *
 * Es lo que hace que la página "se sienta" distinta, y no las curvas de las
 * animaciones: sin esto, la rueda del mouse la mueve a saltos y todo lo que
 * depende del scroll avanza igual de duro. Con esto, un giro de rueda se
 * desliza con inercia y cada animación hereda esa suavidad sin cambiar nada.
 *
 * Lenis mueve el scroll real de la ventana, así que `window.scrollY`, el evento
 * `scroll` y `useScroll` de Motion siguen funcionando igual.
 */
export function SmoothScroll() {
  useEffect(() => {
    // Quien pidió menos movimiento se queda con el scroll del sistema:
    // suavizarlo es justo el tipo de movimiento que esa preferencia apaga.
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      return;
    }

    const lenis = new Lenis({
      // Medido contra la referencia: con 1.1 la curva llegaba al final
      // demasiado pronto; con 1.7 calza.
      duration: 1.7,
      // Frena al final sin rebotar.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // El táctil NO se suaviza: el dedo ya arrastra la página, y agregarle
      // inercia artificial se siente como si el teléfono estuviera trabado.
      syncTouch: false,
    });

    let cuadro = 0;
    const latido = (tiempo: number) => {
      lenis.raf(tiempo);
      cuadro = requestAnimationFrame(latido);
    };
    cuadro = requestAnimationFrame(latido);

    // Los enlaces de ancla viajan con el mismo deslizamiento; si no, la página
    // salta de golpe y rompe la sensación que se acaba de construir.
    //
    // Dónde frena lo dice el `scroll-margin-top` ya resuelto del destino. Por
    // delegación y no enlace por enlace: los del panel del menú los pinta React
    // después, así que recorrer el documento una vez los dejaría afuera.
    const alHacerClic = (evento: MouseEvent) => {
      const objetivo = evento.target;
      if (!(objetivo instanceof Element)) return;
      const enlace = objetivo.closest<HTMLAnchorElement>("a[href]");
      if (!enlace) return;

      // Se comparan rutas y no el texto del `href`: los del menú son absolutos
      // (`/es/#services`) para funcionar también desde las legales.
      const url = new URL(enlace.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname !== location.pathname || !url.hash) return;

      const nodo = document.querySelector<HTMLElement>(url.hash);
      if (!nodo) return;

      evento.preventDefault();
      const respiro = parseFloat(getComputedStyle(nodo).scrollMarginTop) || 0;
      lenis.scrollTo(nodo, { offset: -respiro });

      // `preventDefault` también cancela el traslado del punto de tabulación,
      // así que el foco se mueve a mano; sin `tabindex` el destino no lo recibe.
      if (!nodo.hasAttribute("tabindex")) nodo.setAttribute("tabindex", "-1");
      nodo.focus({ preventScroll: true });
    };

    document.addEventListener("click", alHacerClic);

    return () => {
      document.removeEventListener("click", alHacerClic);
      cancelAnimationFrame(cuadro);
      lenis.destroy();
    };
  }, []);

  return null;
}
