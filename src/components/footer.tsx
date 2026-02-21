"use client";

import { useState, useRef } from "react";
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
        { label: "WhatsApp", href: "https://wa.me/50683470356" },
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
        <div className="py-12">
          <h2 className="text-3xl font-medium tracking-tight leading-tight text-neutral-900 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl whitespace-pre-line text-balance">
            {t("headline")}
          </h2>
        </div>
        </Reveal>
      </div>

      <div className="border-y border-neutral-200">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1.5fr]">
            <div className="border-b border-neutral-200 py-8 lg:border-b-0 lg:border-r lg:py-8 lg:pr-8">
              <div>
                <h3 className="mb-6 text-lg font-medium tracking-tight text-neutral-900 sm:text-xl">
                  {t("newsletterTitle")}
                </h3>
                <form onSubmit={handleSubscribe} className="mb-6 flex">
                  <label htmlFor="newsletter-email" className="sr-only">{t("emailPlaceholder")}</label>
                  <input
                    id="newsletter-email"
                    ref={emailRef}
                    placeholder={`${t("emailPlaceholder")}\u2026`}
                    className="flex-1 border border-r-0 border-neutral-300 bg-transparent px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus-visible:border-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-400/30 sm:px-6 sm:py-4 sm:text-base"
                    type="email"
                    autoComplete="email"
                    spellCheck={false}
                    required
                  />
                  <button
                    type="submit"
                    disabled={nlStatus === "loading"}
                    className="flex items-center justify-center border border-neutral-300 bg-neutral-100 px-4 transition-colors hover:bg-neutral-200 disabled:opacity-50 sm:px-6"
                    aria-label={t("subscribeLabel")}
                  >
                    {nlStatus === "loading" ? (
                      <Loader2 className="h-5 w-5 animate-spin text-neutral-900 sm:h-6 sm:w-6" />
                    ) : nlStatus === "success" ? (
                      <Check className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" />
                    ) : (
                      <ArrowRight className="h-5 w-5 text-neutral-900 sm:h-6 sm:w-6" />
                    )}
                  </button>
                </form>
                <div aria-live="polite">
                  {nlStatus === "success" && (
                    <p className="mb-2 text-xs text-green-600 sm:text-sm">{t("subscribeSuccess")}</p>
                  )}
                  {nlStatus === "error" && (
                    <p className="mb-2 text-xs text-red-600 sm:text-sm">{t("subscribeError")}</p>
                  )}
                </div>
                <p className="text-xs text-neutral-600 sm:text-sm">
                  {t("disclaimer")}
                </p>
              </div>
            </div>

            <div className="py-8 lg:py-8 lg:pl-8">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                {infoSections.map((section) => (
                  <div key={section.title}>
                    <h4 className="mb-4 text-sm font-medium tracking-tight text-neutral-900 sm:mb-6 sm:text-base">
                      {section.title}
                    </h4>
                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li key={item} className="text-sm tracking-tight text-neutral-600 sm:text-base">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {footerSections.map((section) => (
                  <div key={section.title}>
                    <h4 className="mb-4 text-sm font-medium tracking-tight text-neutral-900 sm:mb-6 sm:text-base">
                      {section.title}
                    </h4>
                    <ul className="space-y-3">
                      {section.links.map((link) => {
                        const isExternal = link.href.startsWith("http");
                        const linkClassName = "text-sm tracking-tight text-neutral-600 transition-colors hover:text-neutral-900 sm:text-base";
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
        <div className="py-8">
          <div className="mb-4">
            <p aria-hidden="true" className="font-outfit text-5xl font-bold text-neutral-900 sm:text-6xl md:text-7xl lg:text-8xl">
              arclo<span className="text-[#2563EB]">·</span>
            </p>
          </div>
          <div className="flex flex-col gap-4 text-xs text-neutral-600 sm:flex-row sm:items-center sm:text-sm">
            <p>&copy;{t("copyright")}</p>
            <span className="hidden sm:inline">&bull;</span>
            <Link
              href="/privacy"
              className="transition-colors hover:text-neutral-900"
            >
              {t("privacyPolicy")}
            </Link>
            <span className="hidden sm:inline">&bull;</span>
            <Link
              href="/terms"
              className="transition-colors hover:text-neutral-900"
            >
              {t("termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
