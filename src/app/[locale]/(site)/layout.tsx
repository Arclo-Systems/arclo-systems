import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/navbar";
import { PagePreloader } from "@/components/page-preloader";
import { BackgroundEffect } from "@/components/background-effect";

const BASE_URL = "https://arclosystems.com";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const title = t("title");
  const description = t("description");
  const url = `${BASE_URL}/${locale}`;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
      languages: { es: `${BASE_URL}/es`, en: `${BASE_URL}/en` },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "arclo",
      locale: locale === "es" ? "es_CR" : "en_US",
      type: "website",
      images: [
        { url: `${BASE_URL}/open-graph.png`, width: 1200, height: 630, alt: title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/open-graph.png`],
    },
  };
}

export default function SiteLayout({ children }: Props) {
  return (
    <>
      <BackgroundEffect />
      <PagePreloader>
        <Navbar />
        {children}
      </PagePreloader>
    </>
  );
}
