"use client";

import { useFormContext } from "react-hook-form";
import type { UseFieldArrayReturn } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { PartnerFormValues } from "../schema";
import { GAM_CANTONS, LIMITS } from "../data";
import { Field } from "../fields/field";
import { TextInput, Select } from "../fields/inputs";

export function BranchesSection({
  array,
}: {
  array: UseFieldArrayReturn<PartnerFormValues, "branches">;
}) {
  const t = useTranslations("Partners");
  const { register, watch, formState: { errors } } =
    useFormContext<PartnerFormValues>();
  const show = watch("business.hasMultipleBranches") === "yes";
  const err = (k?: string) => (k ? t(`errors.${k}`) : undefined);

  if (!show) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="flex flex-col gap-4"
    >
      <h2 className="font-dongle text-3xl font-bold">{t("sections.branches")}</h2>
      {typeof errors.branches?.message === "string" && (
        <p role="alert" className="text-xs text-[var(--kodi-coral)]">
          {err(errors.branches.message)}
        </p>
      )}

      <AnimatePresence initial={false}>
        {array.fields.map((f, i) => (
          <motion.div
            key={f.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="rounded-xl border border-[var(--kodi-border)] p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">#{i + 1}</span>
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => array.remove(i)}
                  className="text-xs text-[var(--kodi-coral)] transition-transform duration-150 active:scale-[0.97]"
                >
                  {t("fields.removeBranch")}
                </button>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Field label={t("fields.branchName")} required>
                {({ id }) => (
                  <TextInput id={id} maxLength={60}
                    {...register(`branches.${i}.name` as const)} />
                )}
              </Field>
              <Field label={t("fields.branchCanton")} required>
                {({ id }) => (
                  <Select id={id} {...register(`branches.${i}.canton` as const)}>
                    <option value="">{t("fields.cantonPlaceholder")}</option>
                    {GAM_CANTONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </Select>
                )}
              </Field>
              <Field label={t("fields.branchAddress")}>
                {({ id }) => (
                  <TextInput id={id}
                    {...register(`branches.${i}.address` as const)} />
                )}
              </Field>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        type="button"
        disabled={array.fields.length >= LIMITS.branchesMax}
        onClick={() => array.append({ name: "", canton: "", address: "" })}
        className="self-start rounded-lg border border-[var(--kodi-teal)] px-3 py-2 text-sm font-medium text-[var(--kodi-teal)] transition-transform duration-150 active:scale-[0.97] disabled:opacity-50"
      >
        {t("fields.addBranch")}
      </button>
    </motion.section>
  );
}
