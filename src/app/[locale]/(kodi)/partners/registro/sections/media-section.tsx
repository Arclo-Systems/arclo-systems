"use client";

import { useTranslations } from "next-intl";

export function MediaSection({
  logo,
  photo,
  onLogo,
  onPhoto,
  fileError,
}: {
  logo: File | null;
  photo: File | null;
  onLogo: (f: File | null) => void;
  onPhoto: (f: File | null) => void;
  fileError: string | null;
}) {
  const t = useTranslations("Partners");

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold">{t("sections.media")}</h2>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">
          {t("fields.logo")}
          <span className="text-[var(--kodi-coral)]"> *</span>
        </p>
        <p className="text-xs text-muted-foreground">{t("fields.logoHint")}</p>
        <label className="inline-flex w-fit cursor-pointer items-center rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] hover:border-ring active:scale-[0.98]">
          <input
            type="file"
            accept="image/png,image/svg+xml"
            className="sr-only"
            onChange={(e) => onLogo(e.target.files?.[0] ?? null)}
          />
          {logo?.name ?? t("fields.selectFile")}
        </label>
        {fileError && (
          <p role="alert" className="text-sm text-[var(--kodi-coral)]">
            {fileError}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">{t("fields.photo")}</p>
        <p className="text-xs text-muted-foreground">{t("fields.photoHint")}</p>
        <label className="inline-flex w-fit cursor-pointer items-center rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] hover:border-ring active:scale-[0.98]">
          <input
            type="file"
            accept="image/jpeg,image/png"
            className="sr-only"
            onChange={(e) => onPhoto(e.target.files?.[0] ?? null)}
          />
          {photo?.name ?? t("fields.selectFile")}
        </label>
      </div>

      {!photo && (
        <p className="rounded-md bg-[var(--kodi-gold)]/15 px-3 py-2 text-sm">
          {t("fields.photoNudge")}
        </p>
      )}
    </section>
  );
}
