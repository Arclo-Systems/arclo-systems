import { getFormatter, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { BlurHighlight } from "@/components/blur-highlight";
import { pressArticles } from "@/lib/press";

export async function Press() {
  const t = await getTranslations("Press");
  const format = await getFormatter();

  return (
    <section id="press" className="w-full scroll-mt-24 py-16 sm:py-24">
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
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {pressArticles.map((article, i) => (
            <Reveal key={article.url} delay={i * 100}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 py-8 no-underline transition-transform duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 sm:py-10 lg:gap-12"
              >
                <div className="flex flex-1 flex-col gap-2">
                  <p className="text-xs font-medium tracking-widest text-brand uppercase">
                    {article.outlet}
                    <span aria-hidden="true"> · </span>
                    {/* UTC: sin esto, en Costa Rica la fecha sale un día antes. */}
                    <time dateTime={article.publishedAt}>
                      {format.dateTime(new Date(article.publishedAt), {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        timeZone: "UTC",
                      })}
                    </time>
                  </p>
                  <h3
                    lang={article.lang}
                    className="max-w-3xl text-xl font-semibold text-balance text-foreground transition-colors duration-200 group-hover:text-brand sm:text-2xl"
                  >
                    {article.title}
                  </h3>
                  <span className="sr-only">{t("opensInNewTab")}</span>
                </div>

                <ArrowUpRight
                  className="mt-0.5 h-4 w-4 flex-none text-muted-foreground [@media(min-width:1024px)_and_(hover:hover)_and_(pointer:fine)]:hidden"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <ArrowUpRight
                  className="hidden h-6 w-6 flex-none -translate-x-2 self-center text-foreground opacity-0 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0 group-hover:opacity-100 [@media(min-width:1024px)_and_(hover:hover)_and_(pointer:fine)]:block"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
