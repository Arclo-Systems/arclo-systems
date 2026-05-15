"use client";

import { useFormContext } from "react-hook-form";
import type { UseFieldArrayReturn } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { PartnerFormValues } from "../schema";
import { GAM_CANTONS, LIMITS } from "../data";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { FormErr } from "../fields/form-err";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BranchesSection({
  array,
}: {
  array: UseFieldArrayReturn<PartnerFormValues, "branches">;
}) {
  const t = useTranslations("Partners");
  const form = useFormContext<PartnerFormValues>();
  const tx = (k: string) =>
    t.has(`errors.${k}`) ? t(`errors.${k}`) : t("errors.invalid");

  if (form.watch("business.hasMultipleBranches") !== "yes") return null;

  const arrayMessage = form.formState.errors.branches?.message;

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="flex flex-col gap-4"
    >
      <h2 className="text-lg font-semibold">{t("sections.branches")}</h2>
      {typeof arrayMessage === "string" && (
        <p role="alert" className="text-xs text-[var(--kodi-coral)]">
          {tx(arrayMessage)}
        </p>
      )}

      <AnimatePresence initial={false}>
        {array.fields.map((f, i) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -8,
              transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] },
            }}
            transition={{
              duration: 0.2,
              delay: i * 0.05,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="rounded-xl border p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">#{i + 1}</span>
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => array.remove(i)}
                  className="text-xs text-[var(--kodi-coral)] transition-transform duration-150 active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
                >
                  {t("fields.removeBranch")}
                </button>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name={`branches.${i}.name` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("fields.branchName")}
                      <span className="text-[var(--kodi-coral)]"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input maxLength={60} {...field} />
                    </FormControl>
                    <FormErr />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`branches.${i}.canton` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("fields.branchCanton")}
                      <span className="text-[var(--kodi-coral)]"> *</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={t("fields.cantonPlaceholder")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="kodi-theme">
                        {GAM_CANTONS.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormErr />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`branches.${i}.address` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fields.branchAddress")}</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormErr />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        type="button"
        disabled={array.fields.length >= LIMITS.branchesMax}
        onClick={() => array.append({ name: "", canton: "", address: "" })}
        className="self-start rounded-lg border border-[var(--kodi-teal)] px-3 py-2 text-sm font-medium text-[var(--kodi-teal)] transition-transform duration-150 active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 disabled:opacity-50"
      >
        {t("fields.addBranch")}
      </button>
    </motion.section>
  );
}
