"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useContext } from "react";
import { CargaContext } from "@/components/page-preloader";

const GlitterWarp = dynamic(() => import("@/components/glitter-warp"), {
  ssr: false,
});

const ESTRELLAS = { light: "#171717", dark: "#E6EDFF" } as const;

export function BackgroundEffect() {
  const { resolvedTheme } = useTheme();
  const carga = useContext(CargaContext);
  const color = resolvedTheme === "dark" ? ESTRELLAS.dark : ESTRELLAS.light;

  // Crear el contexto WebGL y compilar el shader es trabajo sincrónico en el
  // hilo principal, y detrás de la cortina no se ve nada: esperar a que empiece
  // a salir deja el logo animando solo.
  if (carga && !carga.bajando) return <div className="fixed inset-0 -z-10 bg-background" />;

  return (
    <div className="fixed inset-0 -z-10 bg-background">
      <GlitterWarp
        speed={0.3}
        color={color}
        density={20}
        brightness={0.5}
        starSize={0.08}
        turbulence={0.1}
        className="h-full w-full"
      />
    </div>
  );
}
