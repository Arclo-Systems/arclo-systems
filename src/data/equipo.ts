/**
 * El equipo. Los textos viven en `messages`; acá van foto y LinkedIn, que no
 * se traducen.
 *
 * `foto`: ruta desde `public/` (por ejemplo `/equipo/emilio.jpg`). Mientras sea
 * `null` la tarjeta dibuja el monograma. Conviene el mismo encuadre y el mismo
 * fondo en las cuatro, cuadradas y de al menos 256×256.
 *
 * `linkedin`: URL completa del perfil, o `null` para no dibujar el ícono.
 */
export interface Socio {
  readonly nameKey: string;
  readonly roleKey: string;
  readonly descKey: string;
  readonly foto: string | null;
  readonly linkedin: string | null;
}

export const EQUIPO: readonly Socio[] = [
  {
    nameKey: "member1Name",
    roleKey: "member1Role",
    descKey: "member1Desc",
    foto: null,
    linkedin: "https://www.linkedin.com/in/emiliojrb/",
  },
  {
    nameKey: "member2Name",
    roleKey: "member2Role",
    descKey: "member2Desc",
    foto: null,
    linkedin: "https://www.linkedin.com/in/luis-ugalde-chaves-cr/",
  },
  {
    nameKey: "member3Name",
    roleKey: "member3Role",
    descKey: "member3Desc",
    foto: null,
    linkedin: "https://www.linkedin.com/in/juan-esteban-d%C3%ADaz-115025304/",
  },
  {
    nameKey: "member4Name",
    roleKey: "member4Role",
    descKey: "member4Desc",
    foto: null,
    linkedin: null,
  },
];
