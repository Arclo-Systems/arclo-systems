"use client";

import { useFormContext, Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { PartnerFormValues } from "../schema";

export function ConfirmationSection() {
  const t = useTranslations("Partners");
  const { control, formState: { errors } } = useFormContext<PartnerFormValues>();

  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-dongle text-3xl font-bold">
        {t("sections.confirmation")}
      </h2>
      <Controller
        control={control}
        name="confirmation.accepted"
        render={({ field }) => (
          <label className="flex items-start gap-3 text-sm text-[var(--kodi-ink)]">
            <input
              type="checkbox"
              checked={field.value}
              onChange={(ev) => field.onChange(ev.target.checked)}
              className="mt-1 accent-[var(--kodi-teal)]"
            />
            <span>{t("fields.accept")}</span>
          </label>
        )}
      />
      {typeof errors.confirmation?.accepted?.message === "string" && (
        <p role="alert" className="text-xs text-[var(--kodi-coral)]">
          {t(`errors.${errors.confirmation.accepted.message}`)}
        </p>
      )}
    </section>
  );
}
