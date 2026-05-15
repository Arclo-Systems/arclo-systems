"use client";

import { useTranslations } from "next-intl";
import { Field } from "../fields/field";
import { FileInput } from "../fields/inputs";

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
      <h2 className="font-dongle text-3xl font-bold">{t("sections.media")}</h2>

      <Field label={t("fields.logo")} required hint={t("fields.logoHint")}
        error={fileError ?? undefined}>
        {() => (
          <FileInput
            accept="image/png,image/svg+xml"
            onChange={onLogo}
            fileName={logo?.name}
            buttonLabel={t("fields.selectFile")}
          />
        )}
      </Field>

      <Field label={t("fields.photo")} hint={t("fields.photoHint")}>
        {() => (
          <FileInput
            accept="image/jpeg,image/png"
            onChange={onPhoto}
            fileName={photo?.name}
            buttonLabel={t("fields.selectFile")}
          />
        )}
      </Field>

      {!photo && (
        <p className="rounded-lg bg-[var(--kodi-gold)]/15 px-3 py-2 text-sm text-[var(--kodi-ink)]">
          {t("fields.photoNudge")}
        </p>
      )}
    </section>
  );
}
