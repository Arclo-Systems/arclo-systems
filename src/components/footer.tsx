"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions/newsletter";
import { Reveal } from "@/components/reveal";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("Footer");
  const emailRef = useRef<HTMLInputElement>(null);
  const [nlStatus, setNlStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    const email = emailRef.current?.value.trim();
    if (!email) return;

    setNlStatus("loading");
    const result = await subscribeNewsletter(email);

    if (result.success) {
      setNlStatus("success");
      if (emailRef.current) emailRef.current.value = "";
    } else {
      setNlStatus("error");
    }
  }

  const infoSections = [
    {
      title: t("servicesTitle"),
      items: [
        t("services.customDev"),
        t("services.saas"),
        t("services.ai"),
        t("services.automations"),
      ],
    },
    {
      title: t("solutionsTitle"),
      items: [
        t("solutions.webApps"),
        t("solutions.mobileApps"),
        t("solutions.consulting"),
        t("solutions.mvp"),
      ],
    },
  ];

  const footerSections = [
    {
      title: t("companyTitle"),
      links: [
        { label: "WhatsApp", href: "https://wa.me/50683165810" },
        { label: "LinkedIn", href: "https://www.linkedin.com/company/arclo-systems/" },
        { label: "Instagram", href: "https://www.instagram.com/arclosystems/" },
        { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61588236786696" },
      ],
    },
    {
      title: t("resourcesTitle"),
      links: [
        { label: t("resources.contact"), href: "/#contact" },
        { label: t("resources.terms"), href: "/terms" },
        { label: t("resources.privacy"), href: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="w-full">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <Reveal>
        <div className="py-16 sm:py-24">
          <h2 className="text-3xl font-medium tracking-tight leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl whitespace-pre-line text-balance">
            {t("headline")}
          </h2>
        </div>
        </Reveal>
      </div>

      <div className="border-y border-border">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1.5fr]">
            <div className="border-b border-border py-10 sm:py-12 lg:border-b-0 lg:border-r lg:pr-8">
              <div>
                <h3 className="mb-6 text-lg font-medium tracking-tight text-foreground sm:text-xl">
                  {t("newsletterTitle")}
                </h3>
                <form onSubmit={handleSubscribe} className="mb-6 flex">
                  <label htmlFor="newsletter-email" className="sr-only">{t("emailPlaceholder")}</label>
                  <input
                    id="newsletter-email"
                    ref={emailRef}
                    placeholder={`${t("emailPlaceholder")}\u2026`}
                    className="flex-1 border border-r-0 border-input bg-transparent px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus-visible:border-ring sm:px-6 sm:py-4 sm:text-base"
                    type="email"
                    autoComplete="email"
                    spellCheck={false}
                    required
                  />
                  <button
                    type="submit"
                    disabled={nlStatus === "loading"}
                    className="flex items-center justify-center border border-input bg-muted px-4 transition-colors duration-200 hover:bg-border disabled:opacity-50 sm:px-6"
                    aria-label={t("subscribeLabel")}
                  >
                    {nlStatus === "loading" ? (
                      <Loader2 className="h-5 w-5 animate-spin text-foreground sm:h-6 sm:w-6" />
                    ) : nlStatus === "success" ? (
                      <Check className="h-5 w-5 text-green-700 sm:h-6 sm:w-6 dark:text-green-400" />
                    ) : (
                      <ArrowRight className="h-5 w-5 text-foreground sm:h-6 sm:w-6" />
                    )}
                  </button>
                </form>
                <div aria-live="polite">
                  {nlStatus === "success" && (
                    <p className="mb-2 text-xs text-green-700 sm:text-sm dark:text-green-400">{t("subscribeSuccess")}</p>
                  )}
                  {nlStatus === "error" && (
                    <p className="mb-2 text-xs text-red-600 sm:text-sm">{t("subscribeError")}</p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  {t("disclaimer")}
                </p>
              </div>
            </div>

            <div className="py-10 sm:py-12 lg:pl-8">
              {/* A cuatro columnas recién en xl: a 1024px la columna quedaría en 118px. */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:grid-cols-4">
                {infoSections.map((section) => (
                  <div key={section.title}>
                    <h4 className="mb-4 text-sm font-medium tracking-tight text-foreground sm:mb-6 sm:text-base">
                      {section.title}
                    </h4>
                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li key={item} className="text-sm tracking-tight text-muted-foreground sm:text-base">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {footerSections.map((section) => (
                  <div key={section.title}>
                    <h4 className="mb-4 text-sm font-medium tracking-tight text-foreground sm:mb-6 sm:text-base">
                      {section.title}
                    </h4>
                    <ul className="space-y-3">
                      {section.links.map((link) => {
                        const isExternal = link.href.startsWith("http");
                        const linkClassName = "text-sm tracking-tight text-muted-foreground transition-colors duration-200 hover:text-foreground sm:text-base";
                        return (
                          <li key={link.label}>
                            {isExternal ? (
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClassName}
                              >
                                {link.label}
                              </a>
                            ) : (
                              <Link href={link.href} className={linkClassName}>
                                {link.label}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="py-10 sm:py-12">
          <div className="mb-4">
            {/* Los dos se dibujan y el CSS muestra el que toca, para que el
                logo salga correcto en el primer pintado. */}
            <Image
              src="/logo-light.svg"
              alt=""
              aria-hidden="true"
              width={550}
              height={279}
              className="h-14 w-auto sm:h-16 md:h-20 lg:h-28 dark:hidden"
            />
            <Image
              src="/logo-dark.svg"
              alt=""
              aria-hidden="true"
              width={1138}
              height={594}
              className="hidden h-14 w-auto sm:h-16 md:h-20 lg:h-28 dark:block"
            />
          </div>
          <div className="flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:text-sm">
            <p>&copy;{t("copyright", { year: new Date().getFullYear() })}</p>
            <span className="hidden sm:inline">&bull;</span>
            <Link
              href="/privacy"
              className="transition-colors duration-200 hover:text-foreground"
            >
              {t("privacyPolicy")}
            </Link>
            <span className="hidden sm:inline">&bull;</span>
            <Link
              href="/terms"
              className="transition-colors duration-200 hover:text-foreground"
            >
              {t("termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
