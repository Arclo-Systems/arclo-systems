"use client";

import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { PartnerFormValues } from "../schema";
import { Field } from "../fields/field";
import { TextInput } from "../fields/inputs";

export function ContactSection() {
  const t = useTranslations("Partners");
  const { register, formState: { errors } } = useFormContext<PartnerFormValues>();
  const e = errors.contact;
  const err = (k?: string) => (k ? t(`errors.${k}`) : undefined);

  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-dongle text-3xl font-bold">{t("sections.contact")}</h2>

      <Field label={t("fields.fullName")} required error={err(e?.fullName?.message)}>
        {({ id, describedBy }) => (
          <TextInput id={id} aria-describedby={describedBy}
            aria-invalid={!!e?.fullName} {...register("contact.fullName")} />
        )}
      </Field>

      <Field label={t("fields.role")} required error={err(e?.role?.message)}>
        {({ id, describedBy }) => (
          <TextInput id={id} aria-describedby={describedBy}
            aria-invalid={!!e?.role} {...register("contact.role")} />
        )}
      </Field>

      <Field label={t("fields.email")} required error={err(e?.email?.message)}>
        {({ id, describedBy }) => (
          <TextInput id={id} type="email" aria-describedby={describedBy}
            aria-invalid={!!e?.email} {...register("contact.email")} />
        )}
      </Field>

      <Field label={t("fields.whatsapp")} required error={err(e?.whatsapp?.message)}>
        {({ id, describedBy }) => (
          <TextInput id={id} inputMode="numeric" aria-describedby={describedBy}
            aria-invalid={!!e?.whatsapp} placeholder="88887777"
            {...register("contact.whatsapp")} />
        )}
      </Field>
    </section>
  );
}
