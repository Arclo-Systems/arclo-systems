import Image from "next/image";

// Determinístico, sin breakpoints (los px fijos fallaban por el escalado
// de Windows: screenshot px != CSS px). El ANCHO de Koko = el gutter real
// que queda al lado de la columna del form (672px) menos un gap. Si no
// hay gutter, el clamp lo lleva a 0 y desaparece solo. Nunca puede ser
// más ancho que el espacio libre, así que JAMÁS se monta sobre el form
// ni se vuelve gigante; escala suave de chico (laptop) a grande (desktop).
export function KodiBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <Image
        src="/assets/kodi/Koko.svg"
        alt=""
        width={150}
        height={311}
        loading="lazy"
        style={{
          right: "16px",
          top: "96px",
          width: "clamp(0px, calc((100vw - 696px) / 2 - 16px), 360px)",
          height: "auto",
        }}
        className="absolute select-none opacity-[0.16] grayscale"
      />
    </div>
  );
}
