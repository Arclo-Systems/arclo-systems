"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { sendContactEmail } from "@/app/actions/contact";
import { Reveal } from "@/components/reveal";
import { Link } from "@/i18n/navigation";
import { BlurHighlight } from "@/components/blur-highlight";

export function Contact() {
  const t = useTranslations("Contact");
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const privacy = formData.get("privacy");

    if (!privacy) {
      setStatus("error");
      setErrorMsg(t("errorPrivacy"));
      return;
    }

    const texto = (v: FormDataEntryValue | null) =>
      typeof v === "string" ? v.trim() : "";

    const data = {
      firstName: texto(formData.get("firstName")),
      email: texto(formData.get("email")),
      message: texto(formData.get("message")),
    };

    if (!data.firstName || !data.email || !data.message) {
      setStatus("error");
      setErrorMsg(t("errorMissing"));
      return;
    }

    setStatus("sending");
    const result = await sendContactEmail(data);

    if (result.success) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setErrorMsg(t("errorSend"));
    }
  }

  const inputClassName =
    // El foco se marca con la línea de abajo, no con un anillo: el anillo
    // dibuja un rectángulo alrededor de un campo que sólo tiene borde inferior.
    "w-full border-b border-input bg-transparent pb-3 text-foreground placeholder-muted-foreground transition-colors duration-200 focus-visible:border-brand";

  return (
    <section id="contact" className="w-full scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 sm:mb-16">
          <BlurHighlight
            as="h2"
            className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
            blurAmount={6}
            blurDuration={0.6}
            viewportOptions={{ once: true, amount: 0.3 }}
          >
            {t("title")}
          </BlurHighlight>
          <Reveal>
            <p className="mt-2 text-base text-muted-foreground sm:text-lg">
              {t("subtitleLine1")}{" "}
              {t("subtitleLine2")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="max-w-xl space-y-8"
          >
            <div>
              <label htmlFor="firstName" className="sr-only">{t("firstName")}</label>
              <input
                id="firstName"
                name="firstName"
                placeholder={`${t("firstName")}…`}
                type="text"
                autoComplete="name"
                required
                className={inputClassName}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">{t("email")}</label>
              <input
                id="email"
                name="email"
                placeholder={`${t("email")}\u2026`}
                type="email"
                autoComplete="email"
                spellCheck={false}
                required
                className={inputClassName}
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">{t("message")}</label>
              <textarea
                id="message"
                name="message"
                placeholder={`${t("message")}\u2026`}
                rows={1}
                required
                className={`resize-none ${inputClassName}`}
              />
            </div>

            <label className="flex cursor-pointer items-start gap-3">
              <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                <input
                  name="privacy"
                  type="checkbox"
                  value="accepted"
                  className="peer h-5 w-5 appearance-none rounded-full border border-input transition-colors duration-200 checked:border-foreground checked:bg-foreground"
                />
                <svg
                  className="pointer-events-none absolute hidden h-3 w-3 text-background peer-checked:block"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="text-sm text-muted-foreground">
                {t("privacyPrefix")}{" "}
                <Link
                  href="/privacy"
                  className="underline transition-colors duration-200 hover:text-foreground"
                >
                  {t("privacyLink")}
                </Link>
              </span>
            </label>

            <div aria-live="polite">
              {status === "success" && (
                <p className="text-sm text-green-700 dark:text-green-400">{t("success")}</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600">{errorMsg}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-xl bg-foreground px-12 py-4 text-base font-medium text-background transition-[background-color,transform] duration-200 active:scale-97 hover:bg-brand disabled:opacity-50 disabled:hover:bg-foreground"
            >
              {status === "sending" ? t("sending") : t("submit")}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
