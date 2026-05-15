"use client";

import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { PartnerFormValues } from "../schema";
import { BUSINESS_CATEGORIES, GAM_CANTONS } from "../data";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { FormErr } from "../fields/form-err";
import { AffixInput } from "../fields/affix-input";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function BusinessSection() {
  const t = useTranslations("Partners");
  const form = useFormContext<PartnerFormValues>();

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold">{t("sections.business")}</h2>

      <FormField
        control={form.control}
        name="business.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("fields.name")}
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
        name="business.category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("fields.category")}
              <span className="text-[var(--kodi-coral)]"> *</span>
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("fields.categoryPlaceholder")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="kodi-theme">
                {BUSINESS_CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.es}
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
        name="business.canton"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("fields.canton")}
              <span className="text-[var(--kodi-coral)]"> *</span>
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("fields.cantonPlaceholder")} />
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
        name="business.website"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("fields.website")}</FormLabel>
            <FormControl>
              <AffixInput
                prefix="https://"
                inputMode="url"
                placeholder="tunegocio.com"
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                value={
                  field.value
                    ? String(field.value).replace(/^https?:\/\//i, "")
                    : ""
                }
                onChange={(ev) => {
                  const raw = ev.target.value
                    .replace(/^https?:\/\//i, "")
                    .replace(/^\/+/, "");
                  field.onChange(raw ? `https://${raw}` : "");
                }}
              />
            </FormControl>
            <FormErr />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="business.instagram"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("fields.instagram")}</FormLabel>
            <FormControl>
              <AffixInput prefix="@" {...field} />
            </FormControl>
            <FormErr />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="business.facebook"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("fields.facebook")}</FormLabel>
            <FormControl>
              <AffixInput
                prefix="https://"
                inputMode="url"
                placeholder="facebook.com/tunegocio"
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                value={
                  field.value
                    ? String(field.value).replace(/^https?:\/\//i, "")
                    : ""
                }
                onChange={(ev) => {
                  const raw = ev.target.value
                    .replace(/^https?:\/\//i, "")
                    .replace(/^\/+/, "");
                  field.onChange(raw ? `https://${raw}` : "");
                }}
              />
            </FormControl>
            <FormErr />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="business.tiktok"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("fields.tiktok")}</FormLabel>
            <FormControl>
              <AffixInput prefix="@" {...field} />
            </FormControl>
            <FormErr />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="business.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("fields.description")}
              <span className="text-[var(--kodi-coral)]"> *</span>
            </FormLabel>
            <FormControl>
              <Textarea maxLength={250} {...field} value={field.value ?? ""} />
            </FormControl>
            <div className="flex justify-end">
              <span
                aria-live="polite"
                className="text-xs text-muted-foreground"
              >
                {(field.value ?? "").length}/250
              </span>
            </div>
            <FormErr />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="business.hasMultipleBranches"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("fields.hasMultipleBranches")}
              <span className="text-[var(--kodi-coral)]"> *</span>
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex gap-6"
              >
                {[
                  { v: "yes", l: t("fields.yes") },
                  { v: "no", l: t("fields.no") },
                ].map((o) => (
                  <div key={o.v} className="flex items-center gap-2">
                    <RadioGroupItem value={o.v} id={`hmb-${o.v}`} />
                    <label htmlFor={`hmb-${o.v}`} className="text-sm">
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
    </section>
  );
}
