import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MenuPill, type GrupoMenu } from "@/components/menu-pill";
import { LanguageLinks } from "@/components/language-links";

// La cabecera de Kodi, replicada: a la izquierda el sello en un círculo y una
// píldora con las secciones; al centro la píldora del menú, que se ensancha,
// muestra el avance de la página y despliega el resto; a la derecha el
// destacado. El menú del centro es cliente (Motion anima ancho, alto y los
// enlaces uno detrás de otro); lo demás es servidor.
export function Navbar() {
  const t = useTranslations("Navbar");

  const grupos: readonly GrupoMenu[] = [
    {
      titulo: t("menu"),
      grande: true,
      enlaces: [
        { texto: t("services"), href: "/#services" },
        { texto: t("work"), href: "/#projects" },
        { texto: t("about"), href: "/#about" },
        { texto: t("faq"), href: "/#faq" },
      ],
    },
    {
      titulo: t("others"),
      enlaces: [
        { texto: t("terms"), href: "/terms" },
        { texto: t("privacy"), href: "/privacy" },
        { texto: t("support"), href: "mailto:info@arclosystems.com" },
      ],
    },
    {
      titulo: t("language"),
      contenido: <LanguageLinks />,
    },
    {
      titulo: t("social"),
      enFila: true,
      enlaces: [
        {
          texto: "LinkedIn",
          href: "https://www.linkedin.com/company/arclo-systems/",
          externo: true,
        },
        {
          texto: "Instagram",
          href: "https://www.instagram.com/arclosystems/",
          externo: true,
        },
        {
          texto: "Facebook",
          href: "https://www.facebook.com/profile.php?id=61588236786696",
          externo: true,
        },
      ],
    },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* A todo el ancho y sin `max-w`, como la cabecera de Kodi: el sello vive
          pegado al borde de la ventana, no alineado con la columna de texto. */}
      <div className="relative flex h-20 items-center justify-between px-[clamp(20px,3vw,40px)]">
        <div className="flex items-center gap-3">
          {/* El sello: la a de arclo en Outfit 700 sobre la superficie. */}
          <Link
            href="/"
            aria-label="arclo, ir al inicio"
            className="inline-flex rounded-full"
          >
            <span className="grid h-13 w-13 place-items-center rounded-full border border-border bg-background font-outfit text-[2.125rem] leading-none font-bold text-foreground">
              {/* La `a` no tiene ascendente: con `leading-none` la base de
                  Outfit cae a 0.85em del tope, así que su centro de tinta
                  queda 0.1em por debajo del centro de la caja. */}
              <span className="-translate-y-[0.1em]">a</span>
            </span>
          </Link>

          {/* Las secciones viven en una píldora desde 768: en móvil ya están
              dentro del menú. */}
          <nav
            aria-label={t("sections")}
            className="hidden h-13 items-center gap-1 rounded-full border border-border bg-background p-1.5 md:flex"
          >
            <Link
              href="/#services"
              className="flex h-10 items-center rounded-full px-5 text-sm font-medium text-muted-foreground no-underline transition-colors duration-200 hover:text-foreground"
            >
              {t("services")}
            </Link>
            <Link
              href="/#projects"
              className="flex h-10 items-center rounded-full px-5 text-sm font-medium text-muted-foreground no-underline transition-colors duration-200 hover:text-foreground"
            >
              {t("work")}
            </Link>
          </nav>
        </div>

        <div className="absolute top-1.5 right-5 z-50 md:right-auto md:left-1/2 md:-translate-x-1/2">
          <MenuPill abrir={t("menu")} cerrar={t("close")} grupos={grupos} />
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="hidden h-13 items-center rounded-full bg-foreground px-6 text-sm font-medium whitespace-nowrap text-background no-underline transition-[opacity,transform] duration-200 active:scale-97 hover:opacity-85 md:inline-flex"
          >
            {t("contact")}
          </Link>
        </div>
      </div>
    </header>
  );
}
