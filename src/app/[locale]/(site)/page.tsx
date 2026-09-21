import { getTranslations, getLocale } from "next-intl/server";
import { Hero } from "@/components/hero";
import { VideoSequence } from "@/components/video-sequence";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { Team } from "@/components/team";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { TextSeparator } from "@/components/text-separator";
import { SITE_URL } from "@/lib/site";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations("Separator");
  const tFaq = await getTranslations("Faq");
  const tMeta = await getTranslations("Metadata");

  const faqKeys = ["faq1", "faq2", "faq3", "faq4", "faq5", "faq6"] as const;

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "arclo",
    legalName: "Arclo Systems",
    url: SITE_URL,
    logo: `${SITE_URL}/open-graph.png`,
    description: tMeta("description"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "San José",
      addressCountry: "CR",
    },
    email: "info@arclosystems.com",
    sameAs: [
      "https://www.linkedin.com/company/arclo-systems/",
      "https://www.instagram.com/arclosystems/",
      "https://www.facebook.com/profile.php?id=61588236786696",
    ],
    serviceType: [
      "Automation",
      "System Integration",
      "AI Agents",
      "Custom Software Development",
      "Web Applications",
      "Mobile Applications",
    ],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "arclo",
    url: SITE_URL,
    inLanguage: [locale === "es" ? "es-CR" : "en-US"],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqKeys.map((key) => ({
      "@type": "Question",
      name: tFaq(`${key}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: tFaq(`${key}.answer`),
      },
    })),
  };

  return (
    <main className="pt-20">
      <JsonLd data={organizationLd} />
      <JsonLd data={websiteLd} />
      <JsonLd data={faqLd} />
      <Hero />
      <VideoSequence />
      <TextSeparator text={t("text")} />
      <Services />
      <Projects />
      <Team />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
