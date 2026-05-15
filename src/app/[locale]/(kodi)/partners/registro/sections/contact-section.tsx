"use client";

import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { PartnerFormValues } from "../schema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { FormErr } from "../fields/form-err";
import { Input } from "@/components/ui/input";
import { AffixInput } from "../fields/affix-input";

export function ContactSection() {
  const t = useTranslations("Partners");
  const form = useFormContext<PartnerFormValues>();

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold">{t("sections.contact")}</h2>

      <FormField
        control={form.control}
        name="contact.fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("fields.fullName")}
              <span className="text-[var(--kodi-coral)]"> *</span>
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormErr />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="contact.role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("fields.role")}
              <span className="text-[var(--kodi-coral)]"> *</span>
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormErr />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="contact.email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("fields.email")}
              <span className="text-[var(--kodi-coral)]"> *</span>
            </FormLabel>
            <FormControl>
              <Input type="email" {...field} />
            </FormControl>
            <FormErr />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="contact.whatsapp"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("fields.whatsapp")}
              <span className="text-[var(--kodi-coral)]"> *</span>
            </FormLabel>
            <FormControl>
              <AffixInput
                prefix="+506"
                inputMode="numeric"
                placeholder="88887777"
                {...field}
              />
            </FormControl>
            <FormErr />
          </FormItem>
        )}
      />
    </section>
  );
}
