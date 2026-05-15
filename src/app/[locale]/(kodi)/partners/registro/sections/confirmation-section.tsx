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
import { Checkbox } from "@/components/ui/checkbox";

export function ConfirmationSection() {
  const t = useTranslations("Partners");
  const form = useFormContext<PartnerFormValues>();

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">{t("sections.confirmation")}</h2>
      <FormField
        control={form.control}
        name="confirmation.accepted"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-start gap-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1"
                />
              </FormControl>
              <FormLabel className="font-normal leading-snug">
                {t("fields.accept")}
              </FormLabel>
            </div>
            <FormErr />
          </FormItem>
        )}
      />
    </section>
  );
}
