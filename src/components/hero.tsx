import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HeroImage } from "@/components/hero-image";
import { StarBorder } from "@/components/star-border";

const avatars = [
  { initials: "ER", bg: "bg-neutral-900" },
  { initials: "LU", bg: "bg-neutral-700" },
  { initials: "JD", bg: "bg-neutral-500" },
  { initials: "EA", bg: "bg-neutral-400" },
];

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative w-full overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-8">
            <StarBorder
              as="div"
              color="#2563EB"
              speed="4s"
              className="rounded-full"
            >
              <div className="flex items-center gap-2 px-4 py-1.5">
                <span className="rounded-full bg-neutral-900 px-2.5 py-0.5 text-xs font-medium text-white">
                  {t("badgeLabel")}
                </span>
                <span className="hidden text-sm font-normal text-neutral-700 sm:inline">{t("badgeText")}</span>
                <span className="text-sm font-normal text-neutral-700 sm:hidden">{t("badgeTextShort")}</span>
              </div>
            </StarBorder>

            <div className="flex flex-col gap-5">
              <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
                {t("title")}
              </h1>
              <p className="max-w-md text-lg leading-relaxed text-neutral-500">
                {t("description")}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full px-7 text-base font-medium"
              >
                <Link href="/#projects">{t("ourWork")}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 rounded-full px-7 text-base font-medium"
              >
                <a href="https://wa.me/50683470356" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {avatars.map((avatar) => (
                  <div
                    key={avatar.initials}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-xs font-semibold text-white transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:scale-110 hover:z-10 ${avatar.bg}`}
                  >
                    {avatar.initials}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-lg font-semibold text-neutral-900">
                  {t("projectsCount")}
                </p>
                <p className="text-sm text-neutral-500">{t("projectsLabel")}</p>
              </div>
            </div>
          </div>

          <div className="relative w-full">
            <HeroImage
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1740&auto=format&fit=crop"
              alt={t("imageAlt")}
            >
              <div className="absolute bottom-0 right-0 flex flex-col items-end">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M0 200C156 200 200 156.3 200 0V200H0Z"
                    className="fill-white"
                  />
                </svg>
                <div className="relative">
                  <div className="h-24 w-24 rounded-tl-4xl bg-white pl-4 pt-4">
                    <a href="#contact" aria-label={t("contact")} className="flex h-full w-full cursor-pointer items-center justify-center rounded-[1.2em] border-none bg-black transition-opacity hover:opacity-90">
                      <ArrowRight className="h-6 w-6 -rotate-45 text-white" aria-hidden="true" />
                    </a>
                  </div>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-0 -left-[40px]"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 200C156 200 200 156.3 200 0V200H0Z"
                      className="fill-white"
                    />
                  </svg>
                </div>
              </div>
            </HeroImage>
          </div>
        </div>
      </div>
    </section>
  );
}
