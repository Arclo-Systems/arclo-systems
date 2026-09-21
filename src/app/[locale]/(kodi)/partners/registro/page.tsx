import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PartnerForm } from "./partner-form";
import { languageAlternates, localizedUrl, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Partners" });
  const title = t("meta.title");
  const description = t("meta.description");
  const url = localizedUrl(locale, "/partners/registro");

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: languageAlternates("/partners/registro"),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Kodi",
      locale: locale === "es" ? "es_CR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default function PartnersRegistroPage() {
  return <PartnerForm />;
}
