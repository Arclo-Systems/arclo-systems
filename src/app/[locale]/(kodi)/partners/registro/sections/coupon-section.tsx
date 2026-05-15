"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { PartnerFormValues } from "../schema";
import { LIMITS } from "../data";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { FormErr } from "../fields/form-err";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FORMATS = ["cupon", "video", "banner"] as const;

export function CouponSection() {
  const t = useTranslations("Partners");
  const form = useFormContext<PartnerFormValues>();
  const branches =
    useWatch({ control: form.control, name: "branches" }) ?? [];
  const hasBranches =
    form.watch("business.hasMultipleBranches") === "yes" &&
    branches.length > 0;
  const branchNames = branches.map((b) => b.name).filter(Boolean);
  const wantsCoupon = (form.watch("coupon.formats") ?? []).includes("cupon");

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold">{t("sections.coupon")}</h2>

      <FormField
        control={form.control}
        name="coupon.formats"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("fields.sponsorshipPackage")}
              <span className="text-[var(--kodi-coral)]"> *</span>
            </FormLabel>
            <div className="flex flex-col gap-2">
              {FORMATS.map((f) => {
                const selected = field.value ?? [];
                return (
                  <label
                    key={f}
                    className="flex items-start gap-2 text-sm"
                  >
                    <Checkbox
                      className="mt-0.5"
                      checked={selected.includes(f)}
                      onCheckedChange={() =>
                        field.onChange(
                          selected.includes(f)
                            ? selected.filter((x) => x !== f)
                            : [...selected, f],
                        )
                      }
                    />
                    {t(`fields.fmt_${f}`)}
                  </label>
                );
              })}
            </div>
            <FormDescription>
              {t("fields.sponsorshipHelp")}
            </FormDescription>
            <FormErr />
          </FormItem>
        )}
      />

      <AnimatePresence initial={false}>
        {wantsCoupon && (
          <motion.div
            key="coupon-fields"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -8,
              transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] },
            }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-5"
          >
      <FormField
        control={form.control}
        name="coupon.discountType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("fields.discountType")}
              <span className="text-[var(--kodi-coral)]"> *</span>
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex gap-6"
              >
                {[
                  { v: "percentage", l: t("fields.percentage") },
                  { v: "fixed", l: t("fields.fixed") },
                ].map((o) => (
                  <div key={o.v} className="flex items-center gap-2">
                    <RadioGroupItem value={o.v} id={`dt-${o.v}`} />
                    <label htmlFor={`dt-${o.v}`} className="text-sm">
                      {o.l}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormErr />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="coupon.discountValue"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("fields.discountValue")}
              <span className="text-[var(--kodi-coral)]"> *</span>
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === ""
                      ? undefined
                      : e.target.valueAsNumber,
                  )
                }
              />
            </FormControl>
            <FormErr />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="coupon.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("fields.couponDescription")}
              <span className="text-[var(--kodi-coral)]"> *</span>
            </FormLabel>
            <FormControl>
              <Textarea
                maxLength={80}
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <div className="flex justify-end">
              <span
                aria-live="polite"
                className="text-xs text-muted-foreground"
              >
                {(field.value ?? "").length}/80
              </span>
            </div>
            <FormErr />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="coupon.quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("fields.quantity")}
              <span className="text-[var(--kodi-coral)]"> *</span>
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === ""
                      ? undefined
                      : e.target.valueAsNumber,
                  )
                }
              />
            </FormControl>
            <FormErr />
          </FormItem>
        )}
      />

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
            <FormField
              control={form.control}
              name="coupon.branchesScope"
              render={({ field }) => {
                const selected = field.value ?? [];
                const allChecked =
                  branchNames.length > 0 &&
                  selected.length === branchNames.length;
                return (
                  <FormItem>
                    <FormLabel>{t("fields.branchesScope")}</FormLabel>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-sm font-medium">
                        <Checkbox
                          checked={allChecked}
                          onCheckedChange={(c) =>
                            field.onChange(c ? branchNames : [])
                          }
                        />
                        {t("fields.allBranches")}
                      </label>
                      <div className="flex flex-col gap-1 pl-1">
                        {branchNames.map((b) => (
                          <label
                            key={b}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Checkbox
                              checked={selected.includes(b)}
                              onCheckedChange={() =>
                                field.onChange(
                                  selected.includes(b)
                                    ? selected.filter((x) => x !== b)
                                    : [...selected, b],
                                )
                              }
                            />
                            {b}
                          </label>
                        ))}
                      </div>
                    </div>
                    <FormErr />
                  </FormItem>
                );
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <FormField
        control={form.control}
        name="coupon.conditions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("fields.conditions")}</FormLabel>
            <FormControl>
              <Textarea
                maxLength={LIMITS.couponConditions}
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <div className="flex justify-end">
              <span
                aria-live="polite"
                className="text-xs text-muted-foreground"
              >
                {(field.value ?? "").length}/{LIMITS.couponConditions}
              </span>
            </div>
            <FormErr />
          </FormItem>
        )}
      />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
