"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { BlurHighlight } from "@/components/blur-highlight";

const projects = [
  {
    key: "project1",
    href: "https://milopay.app/",
    stack: ["Next.js", "NestJS", "TypeScript", "Tailwind CSS", "PostgreSQL"],
  },
  {
    key: "project2",
    href: null,
    stack: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "WebSockets"],
  },
  {
    key: "project3",
    href: null,
    stack: ["NestJS", "Expo", "TypeScript", "Tailwind CSS", "PostgreSQL"],
  },
] as const;

export function Projects() {
  const t = useTranslations("Projects");

  return (
    <section id="projects" className="w-full py-16 sm:py-24">
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

        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {projects.map((project, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={project.key} delay={i * 100}>
                <div className="group flex flex-col gap-6 py-8 transition-transform duration-300 hover:-translate-y-0.5 sm:py-10 lg:flex-row lg:items-center lg:gap-10">
                  <span className="font-outfit text-5xl font-bold leading-none text-neutral-200 transition-colors duration-300 group-hover:text-[#2563EB]/30 sm:text-6xl lg:min-w-[100px] lg:text-7xl">
                    {num}
                  </span>

                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
                        {t(`${project.key}.name`)}
                      </h3>
                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${t(`${project.key}.name`)} — ${t("visitProject")}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 transition-colors hover:border-[#2563EB] hover:bg-[#2563EB]/10"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5 text-neutral-600" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs font-medium uppercase tracking-widest text-[#2563EB]">
                      {t(`${project.key}.tag`)}
                    </p>
                    <p className="max-w-lg text-sm leading-relaxed text-neutral-600">
                      {t(`${project.key}.description`)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-500 transition-colors duration-300 group-hover:border-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
