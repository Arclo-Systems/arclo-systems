"use client";

import { useFormContext, Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { PartnerFormValues } from "../schema";
import { BUSINESS_CATEGORIES, GAM_CANTONS } from "../data";
import { Field } from "../fields/field";
import {
  TextInput,
  Select,
  TextareaCounter,
  RadioGroup,
  AffixInput,
} from "../fields/inputs";

export function BusinessSection() {
  const t = useTranslations("Partners");
  const { register, control, formState: { errors } } =
    useFormContext<PartnerFormValues>();
  const e = errors.business;
  const err = (k?: string) => (k ? t(`errors.${k}`) : undefined);

  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-dongle text-3xl font-bold">{t("sections.business")}</h2>

      <Field label={t("fields.name")} required error={err(e?.name?.message)}>
        {({ id, describedBy }) => (
          <TextInput id={id} aria-describedby={describedBy} maxLength={60}
            aria-invalid={!!e?.name} {...register("business.name")} />
        )}
      </Field>

      <Field label={t("fields.category")} required error={err(e?.category?.message)}>
        {({ id, describedBy }) => (
          <Select id={id} aria-describedby={describedBy}
            aria-invalid={!!e?.category} {...register("business.category")}>
            <option value="">{t("fields.categoryPlaceholder")}</option>
            {BUSINESS_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.es}</option>
            ))}
          </Select>
        )}
      </Field>

      <Field label={t("fields.canton")} required error={err(e?.canton?.message)}>
        {({ id, describedBy }) => (
          <Select id={id} aria-describedby={describedBy}
            aria-invalid={!!e?.canton} {...register("business.canton")}>
            <option value="">{t("fields.cantonPlaceholder")}</option>
            {GAM_CANTONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        )}
      </Field>

      <Controller
        control={control}
        name="business.website"
        render={({ field }) => (
          <Field label={t("fields.website")} error={err(e?.website?.message)}>
            {({ id, describedBy }) => (
              <AffixInput
                prefix="https://"
                id={id}
                aria-describedby={describedBy}
                aria-invalid={!!e?.website}
                inputMode="url"
                placeholder="tunegocio.com"
                value={field.value ? field.value.replace(/^https?:\/\//i, "") : ""}
                onChange={(ev) => {
                  const raw = ev.target.value
                    .replace(/^https?:\/\//i, "")
                    .replace(/^\/+/, "");
                  field.onChange(raw ? `https://${raw}` : "");
                }}
                onBlur={field.onBlur}
              />
            )}
          </Field>
        )}
      />

      <Field label={t("fields.instagram")} error={err(e?.instagram?.message)}>
        {({ id, describedBy }) => (
          <AffixInput prefix="@" id={id} aria-describedby={describedBy}
            aria-invalid={!!e?.instagram} {...register("business.instagram")} />
        )}
      </Field>

      <Controller
        control={control}
        name="business.facebook"
        render={({ field }) => (
          <Field label={t("fields.facebook")} error={err(e?.facebook?.message)}>
            {({ id, describedBy }) => (
              <AffixInput
                prefix="https://"
                id={id}
                aria-describedby={describedBy}
                aria-invalid={!!e?.facebook}
                inputMode="url"
                placeholder="facebook.com/tunegocio"
                value={field.value ? field.value.replace(/^https?:\/\//i, "") : ""}
                onChange={(ev) => {
                  const raw = ev.target.value
                    .replace(/^https?:\/\//i, "")
                    .replace(/^\/+/, "");
                  field.onChange(raw ? `https://${raw}` : "");
                }}
                onBlur={field.onBlur}
              />
            )}
          </Field>
        )}
      />

      <Field label={t("fields.tiktok")} error={err(e?.tiktok?.message)}>
        {({ id, describedBy }) => (
          <AffixInput prefix="@" id={id} aria-describedby={describedBy}
            aria-invalid={!!e?.tiktok} {...register("business.tiktok")} />
        )}
      </Field>

      <Controller
        control={control}
        name="business.description"
        render={({ field }) => (
          <Field label={t("fields.description")} required
            error={err(e?.description?.message)}>
            {({ id, describedBy }) => (
              <TextareaCounter id={id} aria-describedby={describedBy}
                aria-invalid={!!e?.description} value={field.value ?? ""} max={250}
                onChange={field.onChange} onBlur={field.onBlur} />
            )}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="business.hasMultipleBranches"
        render={({ field }) => (
          <RadioGroup
            legend={t("fields.hasMultipleBranches")}
            name="hasMultipleBranches"
            value={field.value}
            onChange={field.onChange}
            options={[
              { value: "yes", label: t("fields.yes") },
              { value: "no", label: t("fields.no") },
            ]}
          />
        )}
      />
    </section>
  );
}
