"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/reveal";
import { BlurHighlight } from "@/components/blur-highlight";

const members = [
  { nameKey: "member1Name", roleKey: "member1Role", descKey: "member1Desc" },
  { nameKey: "member2Name", roleKey: "member2Role", descKey: "member2Desc" },
  { nameKey: "member3Name", roleKey: "member3Role", descKey: "member3Desc" },
  { nameKey: "member4Name", roleKey: "member4Role", descKey: "member4Desc" },
] as const;

export function Team() {
  const t = useTranslations("Team");

  return (
    <section id="about" className="w-full py-16 sm:py-24">
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
            <p className="mt-2 text-base text-neutral-600 sm:text-lg">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {members.map((member, i) => {
            const name = t(member.nameKey);
            const initial = name.charAt(0);

            return (
              <Reveal key={member.nameKey} delay={i * 80}>
                <div
                  className={`group px-0 lg:px-8 ${
                    i < members.length - 1 ? "lg:border-r lg:border-neutral-200" : ""
                  } ${i === 0 ? "lg:pl-0" : ""} ${i === members.length - 1 ? "lg:pr-0" : ""}`}
                >
                  <span className="font-outfit text-6xl font-bold leading-none text-neutral-200 transition-colors duration-300 group-hover:text-[#2563EB]/20 sm:text-7xl">
                    {initial}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                    {name}
                  </h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-widest text-[#2563EB]">
                    {t(member.roleKey)}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                    {t(member.descKey)}
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
