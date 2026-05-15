"use client";

import { useTranslations } from "next-intl";
import { useFormField } from "@/components/ui/form";

/**
 * Reemplazo de <FormMessage/> de shadcn: shadcn renderiza el `error.message`
 * crudo (que en este form es una CLAVE i18n como "required"). Esto la traduce
 * vía next-intl y mantiene el `formMessageId` para que el aria-describedby
 * que pone <FormControl> siga resolviendo.
 */
export function FormErr() {
  const { error, formMessageId } = useFormField();
  const t = useTranslations("Partners");

  if (!error?.message) return null;

  const key = String(error.message);
  const msg = t.has(`errors.${key}`)
    ? t(`errors.${key}`)
    : t("errors.invalid");

  return (
    <p
      id={formMessageId}
      role="alert"
      className="text-sm text-[var(--kodi-coral)]"
    >
      {msg}
    </p>
  );
}
