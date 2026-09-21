import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/navbar";
import { PagePreloader } from "@/components/page-preloader";
import { BackgroundEffect } from "@/components/background-effect";
import { ThemeToggle } from "@/components/theme-toggle";
import { SmoothScroll } from "@/components/smooth-scroll";
import { languageAlternates, localizedUrl, SITE_URL } from "@/lib/site";

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
  const url = localizedUrl(locale);

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: languageAlternates(),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "arclo",
      locale: locale === "es" ? "es_CR" : "en_US",
      type: "website",
      images: [
        { url: `${SITE_URL}/open-graph.png`, width: 1200, height: 630, alt: title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/open-graph.png`],
    },
  };
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SmoothScroll />
      <PagePreloader>
        <BackgroundEffect />
        <Navbar />
        {children}
      </PagePreloader>
      <ThemeToggle />
    </>
  );
}
