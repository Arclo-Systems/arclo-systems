"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Los mismos hex que los tokens --background. El meta theme-color no entiende
// oklch, así que no se pueden leer del CSS.
const BARRA = { light: "#ffffff", dark: "#0B111D" } as const;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);

  const oscuro = resolvedTheme === "dark";

  // La barra del navegador en el teléfono se pinta con este meta. Sin
  // actualizarla, queda clara sobre una página oscura.
  useEffect(() => {
    if (!montado) return;
    for (const meta of document.querySelectorAll<HTMLMetaElement>(
      'meta[name="theme-color"]',
    )) {
      meta.removeAttribute("media");
      meta.content = oscuro ? BARRA.dark : BARRA.light;
    }
  }, [montado, oscuro]);

  return (
    <div className="fixed right-6 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-50">
      {/* El botón mide 44px por el objetivo táctil; el disco visible sigue en 40px. */}
      <button
        type="button"
        onClick={() => setTheme(oscuro ? "light" : "dark")}
        aria-pressed={montado ? oscuro : undefined}
        className="group flex h-11 w-11 items-center justify-center rounded-full opacity-75 transition-opacity duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [-webkit-tap-highlight-color:transparent] focus-visible:opacity-100 hover:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-55"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-[0_4px_12px_rgb(0_0_0/0.1)] transition-[box-shadow,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-active:scale-97 group-hover:shadow-[0_8px_24px_rgb(0_0_0/0.16)] motion-reduce:transition-none">
          {/* Los dos se dibujan siempre y el CSS muestra el que toca, para que el
              botón salga correcto en el primer pintado. De día se ofrece la luna
              y de noche el sol: el ícono es a dónde vas, no dónde estás. */}
          <Moon className="h-5 w-5 shrink-0 dark:hidden" aria-hidden="true" />
          <Sun className="hidden h-5 w-5 shrink-0 dark:block" aria-hidden="true" />
        </span>
        <span className="sr-only">
          {montado && oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        </span>
      </button>
    </div>
  );
}
