import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PartnerForm } from "./partner-form";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Partners" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      languages: {
        es: "https://arclosystems.com/es/partners/registro",
        en: "https://arclosystems.com/en/partners/registro",
      },
    },
  };
}

export default function PartnersRegistroPage() {
  return <PartnerForm />;
}
