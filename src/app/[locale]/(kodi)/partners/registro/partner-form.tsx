"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MotionConfig } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { partnerSchema, type PartnerFormValues } from "./schema";
import { MAX_LOGO_BYTES, MAX_PHOTO_BYTES, LOGO_MIN_PX } from "./data";
import { validateUpload, getImageMinPxOk } from "@/lib/file-validation";
import { submitPartnerRegistration } from "@/app/actions/partners";
import { BusinessSection } from "./sections/business-section";
import { BranchesSection } from "./sections/branches-section";
import { ContactSection } from "./sections/contact-section";
import { CouponSection } from "./sections/coupon-section";
import { MediaSection } from "./sections/media-section";
import { ConfirmationSection } from "./sections/confirmation-section";

const DEFAULTS = {
  business: {
    name: "",
    category: "",
    canton: "",
    website: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    description: "",
    hasMultipleBranches: "no" as const,
  },
  branches: [] as PartnerFormValues["branches"],
  contact: { fullName: "", role: "", email: "", whatsapp: "" },
  coupon: {
    formats: [] as PartnerFormValues["coupon"]["formats"],
    discountType: "percentage" as const,
    discountValue: 0,
    description: "",
    quantity: 0,
    branchesScope: [] as string[],
    conditions: "",
  },
  confirmation: { accepted: false as unknown as true },
  honeypot: "",
} satisfies PartnerFormValues;

function SubmitBar({
  pending,
  submitError,
}: {
  pending: boolean;
  submitError: string | null;
}) {
  const t = useTranslations("Partners");
  const accepted = useWatch({ name: "confirmation.accepted" }) as
    | boolean
    | undefined;
  const blocked = pending || !accepted;

  return (
    <>
      {submitError ? (
        <p role="alert" className="text-sm text-[var(--kodi-coral)]">
          {submitError}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={blocked}
        aria-disabled={blocked}
        className="transition-[transform,color,box-shadow] duration-150 ease-out active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
      >
        {pending ? (
          <>
            <span
              className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              aria-hidden
            />
            {t("fields.submitting")}
          </>
        ) : (
          t("fields.submit")
        )}
      </Button>

      {accepted ? null : (
        <p className="text-xs text-muted-foreground">
          {t("fields.submitDisabled")}
        </p>
      )}
    </>
  );
}

export function PartnerForm() {
  const t = useTranslations("Partners");
  const locale = useLocale();
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // El form (RHF + shadcn/Radix con useId + motion) se renderiza solo en
  // cliente: evita el mismatch de hidratación de useId. El encabezado sí
  // hace SSR (no usa useId).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: DEFAULTS,
    mode: "onBlur",
  });

  const branchesArray = useFieldArray({
    control: form.control,
    name: "branches",
  });

  async function onValid(values: PartnerFormValues) {
    setFileError(null);
    setSubmitError(null);

    const logoCheck = validateUpload(logo, {
      accept: ["image/png", "image/svg+xml"],
      maxBytes: MAX_LOGO_BYTES,
      required: true,
    });
    if (!logoCheck.ok) {
      setFileError(t(`errors.file_${logoCheck.error}`));
      return;
    }
    if (logo && !(await getImageMinPxOk(logo, LOGO_MIN_PX))) {
      setFileError(t("errors.file_dimensions"));
      return;
    }
    const photoCheck = validateUpload(photo, {
      accept: ["image/jpeg", "image/png"],
      maxBytes: MAX_PHOTO_BYTES,
      required: false,
    });
    if (!photoCheck.ok) {
      setFileError(t(`errors.file_${photoCheck.error}`));
      return;
    }

    const fd = new FormData();
    fd.set("payload", JSON.stringify(values));
    fd.set("locale", locale);
    if (logo) fd.set("logo", logo);
    if (photo) fd.set("photo", photo);

    startTransition(async () => {
      const res = await submitPartnerRegistration(fd);
      if (res.success) {
        setDone(true);
        return;
      }
      const key =
        res.error === "server_config"
          ? "submit_server_config"
          : res.error === "send_failed"
            ? "submit_send_failed"
            : "submit_validation";
      setSubmitError(t(`errors.${key}`));
    });
  }

  if (done) {
    return (
      <div className="mx-auto w-full max-w-2xl px-5 py-20 text-center lg:px-8">
        <h1 className="text-2xl font-bold sm:text-3xl text-[var(--kodi-teal)]">
          {t("success.title")}
        </h1>
        <p className="mt-3 text-[var(--kodi-ink-soft)]">{t("success.body")}</p>
      </div>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto w-full max-w-2xl px-5 py-10 lg:px-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold sm:text-3xl text-[var(--kodi-ink)]">
            {t("header.title")}
          </h1>
          <p className="mt-1 text-[var(--kodi-ink-soft)]">
            {t("header.subtitle")}
          </p>
        </header>

        {!mounted ? (
          <div className="min-h-[60vh]" aria-hidden />
        ) : (
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onValid)}
            aria-busy={pending}
            className="flex flex-col gap-10"
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute left-[-9999px]"
              {...form.register("honeypot")}
            />

            <fieldset disabled={pending} className="contents">
              <BusinessSection />
              <BranchesSection array={branchesArray} />
              <ContactSection />
              <CouponSection />
              <MediaSection
                logo={logo}
                photo={photo}
                onLogo={setLogo}
                onPhoto={setPhoto}
                fileError={fileError}
              />
              <ConfirmationSection />
            </fieldset>

            <SubmitBar pending={pending} submitError={submitError} />
          </form>
        </Form>
        )}
      </div>
    </MotionConfig>
  );
}
