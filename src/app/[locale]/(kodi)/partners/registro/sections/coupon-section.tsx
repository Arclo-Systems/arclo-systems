"use client";

import { useFormContext, Controller } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { PartnerFormValues } from "../schema";
import { LIMITS } from "../data";
import { Field } from "../fields/field";
import {
  TextInput,
  DateInput,
  RadioGroup,
  CheckboxGroup,
  TextareaCounter,
} from "../fields/inputs";

export function CouponSection({
  branches,
}: {
  branches: PartnerFormValues["branches"];
}) {
  const t = useTranslations("Partners");
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<PartnerFormValues>();
  const e = errors.coupon;
  const err = (k?: string) => (k ? t(`errors.${k}`) : undefined);
  const hasBranches =
    watch("business.hasMultipleBranches") === "yes" && branches.length > 0;
  const branchNames = branches.map((b) => b.name).filter(Boolean);

  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-dongle text-3xl font-bold">{t("sections.coupon")}</h2>

      <Controller
        control={control}
        name="coupon.discountType"
        render={({ field }) => (
          <RadioGroup
            legend={t("fields.discountType")}
            name="discountType"
            value={field.value}
            onChange={field.onChange}
            options={[
              { value: "percentage", label: t("fields.percentage") },
              { value: "fixed", label: t("fields.fixed") },
            ]}
          />
        )}
      />

      <Field
        label={t("fields.discountValue")}
        required
        error={err(e?.discountValue?.message)}
      >
        {({ id, describedBy }) => (
          <TextInput
            id={id}
            type="number"
            inputMode="numeric"
            aria-describedby={describedBy}
            aria-invalid={!!e?.discountValue}
            {...register("coupon.discountValue", { valueAsNumber: true })}
          />
        )}
      </Field>

      <Controller
        control={control}
        name="coupon.description"
        render={({ field }) => (
          <Field
            label={t("fields.couponDescription")}
            required
            error={err(e?.description?.message)}
          >
            {({ id, describedBy }) => (
              <TextareaCounter
                id={id}
                aria-describedby={describedBy}
                aria-invalid={!!e?.description}
                value={field.value ?? ""}
                max={80}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          </Field>
        )}
      />

      <Field
        label={t("fields.quantity")}
        required
        error={err(e?.quantity?.message)}
      >
        {({ id, describedBy }) => (
          <TextInput
            id={id}
            type="number"
            inputMode="numeric"
            aria-describedby={describedBy}
            aria-invalid={!!e?.quantity}
            {...register("coupon.quantity", { valueAsNumber: true })}
          />
        )}
      </Field>

      <Field
        label={t("fields.deadline")}
        required
        error={err(e?.deadline?.message)}
      >
        {({ id, describedBy }) => (
          <DateInput
            id={id}
            aria-describedby={describedBy}
            aria-invalid={!!e?.deadline}
            {...register("coupon.deadline")}
          />
        )}
      </Field>

      <AnimatePresence initial={false}>
        {hasBranches && (
          <motion.div
            key="scope"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -8,
              transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] },
            }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <Controller
              control={control}
              name="coupon.branchesScope"
              render={({ field }) => (
                <CheckboxGroup
                  legend={t("fields.branchesScope")}
                  options={branchNames}
                  selected={field.value ?? []}
                  allLabel={t("fields.allBranches")}
                  error={err(
                    typeof errors.coupon?.branchesScope?.message === "string"
                      ? errors.coupon.branchesScope.message
                      : undefined,
                  )}
                  onToggle={(v) =>
                    field.onChange(
                      field.value?.includes(v)
                        ? field.value.filter((x) => x !== v)
                        : [...(field.value ?? []), v],
                    )
                  }
                  onToggleAll={(checked) =>
                    field.onChange(checked ? branchNames : [])
                  }
                />
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Controller
        control={control}
        name="coupon.conditions"
        render={({ field }) => (
          <Field label={t("fields.conditions")}>
            {({ id, describedBy }) => (
              <TextareaCounter
                id={id}
                aria-describedby={describedBy}
                value={field.value ?? ""}
                max={LIMITS.couponConditions}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          </Field>
        )}
      />
    </section>
  );
}
