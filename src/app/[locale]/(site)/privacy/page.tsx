import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return {
    title: `${t("title")} | arclo`,
    description:
      locale === "es"
        ? "Política de Privacidad de Arclo Systems. Cómo recopilamos, usamos y protegemos tus datos personales."
        : "Privacy Policy for Arclo Systems. How we collect, use, and protect your personal data.",
    alternates: {
      canonical: `https://arclosystems.com/${locale}/privacy`,
      languages: {
        es: "https://arclosystems.com/es/privacy",
        en: "https://arclosystems.com/en/privacy",
      },
    },
  };
}

const SECTIONS = Array.from({ length: 10 }, (_, i) => i + 1);

export default async function PrivacyPage() {
  const t = await getTranslations("Privacy");

  return (
    <main>
      <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-32 lg:px-8">
        <Reveal>
          <h1 className="mb-2 text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mb-12 text-sm text-neutral-500">{t("lastUpdated")}</p>
          <p className="mb-10 text-base leading-relaxed text-neutral-700">
            {t("intro")}
          </p>
        </Reveal>

        {SECTIONS.map((n) => (
          <Reveal key={n}>
            <section className="mb-8">
              <h2 className="mb-3 text-xl font-medium tracking-tight text-neutral-900">
                {t(`section${n}Title`)}
              </h2>
              <p className="text-base leading-relaxed text-neutral-700">
                {t(`section${n}Content`)}
              </p>
            </section>
          </Reveal>
        ))}
      </div>

      <Footer />
    </main>
  );
}
