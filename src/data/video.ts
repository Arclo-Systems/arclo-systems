/**
 * El video que crece con el scroll, portado de la landing de Kodi.
 *
 * La sección se dibuja si hay VIDEO o si hay PORTADA. Con solo la portada se
 * ve el efecto completo —el recuadro crece— pero con una imagen quieta.
 *
 * Si los dos son `null`, la sección no se dibuja: un recuadro vacío con la
 * palabra "video" es peor que no tener sección.
 *
 * Para encenderla:
 *   1. Poné el archivo en `arclo/public/video/` (por ejemplo `arclo.mp4`).
 *   2. Poné un fotograma de portada al lado (`arclo-portada.jpg`).
 *   3. Cambiá `archivo` y `portada` acá abajo.
 *
 * Qué video conviene: apaisado 16:9, porque el marco lo es y uno vertical
 * quedaría con dos franjas negras. Sin audio necesario, que corre en silencio
 * y en bucle. De 10 a 20 segundos, con el corte del bucle disimulado. Y por
 * debajo de unos 3 MB, que arriba de eso se nota en datos móviles.
 */
interface VideoSeccion {
  /** Ruta desde `public/`, o `null` mientras no exista. */
  readonly archivo: string | null;
  /** Fotograma que se ve antes de que el video arranque. */
  readonly portada: string | null;
  /** El rótulo chico de arriba. */
  readonly rotulo: string;
  /** La píldora dentro del recuadro, una vez que llena la pantalla. */
  readonly aviso: string;
  /** Descripción para quien no puede ver el video. */
  readonly descripcion: string;
}

export const VIDEO: VideoSeccion = {
  archivo: null,
  portada: null,
  rotulo: "Mirá el video — cómo trabajamos",
  aviso: "Seguí bajando",
  descripcion:
    "Video de Arclo: cómo llevamos un proyecto de la idea a la calle.",
};
