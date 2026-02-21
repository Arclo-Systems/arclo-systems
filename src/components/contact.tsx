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

    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      message: formData.get("message") as string,
    };

    if (!data.firstName || !data.lastName || !data.email || !data.message) {
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
    "w-full border-b border-neutral-300 bg-transparent pb-3 text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus-visible:border-[#2563EB] focus-visible:ring-1 focus-visible:ring-[#2563EB]/30";

  return (
    <section id="contact" className="w-full py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 sm:mb-16">
          <BlurHighlight
            className="text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl md:text-5xl lg:text-6xl"
            blurAmount={6}
            blurDuration={0.6}
            viewportOptions={{ once: true, amount: 0.3 }}
          >
            {t("title")}
          </BlurHighlight>
          <Reveal>
            <p className="mt-4 text-xl text-neutral-600 sm:text-2xl">
              {t("subtitleLine1")}{" "}
              {t("subtitleLine2")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="sr-only">{t("firstName")}</label>
                <input
                  id="firstName"
                  name="firstName"
                  placeholder={`${t("firstName")}\u2026`}
                  type="text"
                  autoComplete="given-name"
                  required
                  className={inputClassName}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">{t("lastName")}</label>
                <input
                  id="lastName"
                  name="lastName"
                  placeholder={`${t("lastName")}\u2026`}
                  type="text"
                  autoComplete="family-name"
                  required
                  className={inputClassName}
                />
              </div>
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
              <label htmlFor="company" className="sr-only">{t("company")}</label>
              <input
                id="company"
                name="company"
                placeholder={`${t("company")}\u2026`}
                type="text"
                autoComplete="organization"
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
                  className="peer h-5 w-5 appearance-none rounded-full border border-neutral-400 transition-colors checked:border-neutral-900 checked:bg-neutral-900"
                />
                <svg
                  className="pointer-events-none absolute hidden h-3 w-3 text-white peer-checked:block"
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
              <span className="text-sm text-neutral-600">
                {t("privacyPrefix")}{" "}
                <Link
                  href="/privacy"
                  className="underline transition-colors hover:text-neutral-900"
                >
                  {t("privacyLink")}
                </Link>
              </span>
            </label>

            <div aria-live="polite">
              {status === "success" && (
                <p className="text-sm text-green-600">{t("success")}</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600">{errorMsg}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-xl bg-neutral-900 px-12 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-[#2563EB] disabled:opacity-50 disabled:hover:bg-neutral-900"
            >
              {status === "sending" ? t("sending") : t("submit")}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
