"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { BlurHighlight } from "@/components/blur-highlight";

const faqKeys = ["faq1", "faq2", "faq3", "faq4", "faq5"] as const;

export function Faq() {
  const t = useTranslations("Faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section id="faq" className="w-full py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
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
            <p className="mt-2 text-base text-neutral-600 sm:text-lg">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="flex flex-col">
            {faqKeys.map((key, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <div
                  key={key}
                  className="border-b border-neutral-200 first:border-t"
                >
                  <button
                    onClick={() => toggle(i)}
                    aria-expanded={openIndex === i}
                    className="group flex w-full items-start justify-between gap-4 py-6 text-left sm:py-7"
                  >
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 text-xs font-medium text-neutral-400 sm:text-sm">
                        {num}
                      </span>
                      <span className="text-base font-medium text-neutral-900 transition-colors duration-200 group-hover:text-neutral-600 sm:text-lg">
                        {t(`${key}.question`)}
                      </span>
                    </div>
                    <div
                      className="mt-1 shrink-0 transition-transform duration-300"
                      style={{
                        transform:
                          openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <ChevronDown className="h-5 w-5 text-neutral-400" />
                    </div>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-300"
                    style={{
                      gridTemplateRows: openIndex === i ? "1fr" : "0fr",
                      opacity: openIndex === i ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-6 pl-9 pr-8 sm:pb-7 sm:pl-10">
                        <p className="text-sm leading-relaxed text-neutral-600 sm:text-base">
                          {t(`${key}.answer`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
