import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NavbarClient } from "./navbar-client";

export function Navbar() {
  const t = useTranslations("Navbar");

  const links = [
    { label: t("services"), href: "/#services" },
    { label: t("about"), href: "/#about" },
    { label: t("faq"), href: "/#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/50 bg-white/60 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="font-outfit text-2xl font-bold text-neutral-900">
          arclo<span className="text-[#2563EB]">·</span>
        </Link>

        <NavbarClient links={links} contactLabel={t("contact")} />
      </nav>
    </header>
  );
}
