"use client";

import { useTranslations } from "next-intl";
import { Code2, Cloud, Bot, Zap, Globe, Smartphone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { BlurHighlight } from "@/components/blur-highlight";

const services = [
  { key: "customDev", descKey: "customDevDesc", icon: Code2 },
  { key: "saas", descKey: "saasDesc", icon: Cloud },
  { key: "ai", descKey: "aiDesc", icon: Bot },
  { key: "automations", descKey: "automationsDesc", icon: Zap },
  { key: "webApps", descKey: "webAppsDesc", icon: Globe },
  { key: "mobileApps", descKey: "mobileAppsDesc", icon: Smartphone },
] as const;

export function Services() {
  const t = useTranslations("Services");

  return (
    <section id="services" className="w-full py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 sm:mb-16">
          <BlurHighlight
            className="text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl md:text-5xl"
            blurAmount={6}
            blurDuration={0.6}
            viewportOptions={{ once: true, amount: 0.3 }}
          >
            {t("title")}
          </BlurHighlight>
          <Reveal>
            <p className="mt-4 max-w-2xl text-base text-neutral-600 sm:text-lg">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.key} delay={i * 80} className="flex">
                <div className="group flex flex-1 flex-col rounded-2xl border border-neutral-200 p-8 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#2563EB] hover:shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 transition-colors duration-300 group-hover:bg-[#2563EB]/10">
                    <Icon className="h-5 w-5 text-neutral-700 transition-colors duration-300 group-hover:text-[#2563EB]" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold tracking-tight text-neutral-900">
                    {t(service.key)}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {t(service.descKey)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
