"use client";

import { useState, useTransition } from "react";
import { useForm, useFieldArray, FormProvider, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
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
    discountType: "percentage" as const,
    discountValue: 0,
    description: "",
    quantity: 0,
    deadline: "",
    branchesScope: [] as string[],
    conditions: "",
  },
  confirmation: { accepted: false as unknown as true },
  honeypot: "",
} satisfies PartnerFormValues;

export function PartnerForm() {
  const t = useTranslations("Partners");
  const locale = useLocale();
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const methods = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: DEFAULTS,
    mode: "onBlur",
  });

  const branchesArray = useFieldArray({
    control: methods.control,
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
      if (res.success) setDone(true);
      else setSubmitError(t("errors.submit_failed"));
    });
  }

  if (done) {
    return (
      <div className="mx-auto w-full max-w-2xl px-5 py-20 text-center lg:px-8">
        <h1 className="font-dongle text-5xl font-bold text-[var(--kodi-teal)]">
          {t("success.title")}
        </h1>
        <p className="mt-3 text-[var(--kodi-ink-soft)]">{t("success.body")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10 lg:px-8">
      <header className="mb-8">
        <h1 className="font-dongle text-5xl font-bold text-[var(--kodi-ink)]">
          {t("header.title")}
        </h1>
        <p className="mt-1 text-[var(--kodi-ink-soft)]">{t("header.subtitle")}</p>
      </header>

      <FormProvider {...methods}>
        <form
          noValidate
          onSubmit={methods.handleSubmit(onValid)}
          className="flex flex-col gap-10"
        >
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute left-[-9999px]"
            {...methods.register("honeypot")}
          />

          <BusinessSection />
          <BranchesSection array={branchesArray} />
          <ContactSection />
          <CouponSection branches={methods.watch("branches")} />
          <MediaSection
            logo={logo}
            photo={photo}
            onLogo={setLogo}
            onPhoto={setPhoto}
            fileError={fileError}
          />
          <ConfirmationSection />

          {submitError && (
            <p role="alert" className="text-sm text-[var(--kodi-coral)]">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={pending || !methods.watch("confirmation.accepted")}
            className="rounded-xl bg-[var(--kodi-teal)] px-6 py-3 font-semibold text-white transition-[transform,background-color] duration-150 hover:bg-[var(--kodi-teal-strong)] active:scale-[0.97] disabled:opacity-50"
            aria-disabled={pending || !methods.watch("confirmation.accepted")}
          >
            {pending ? t("fields.submitting") : t("fields.submit")}
          </button>
          {!methods.watch("confirmation.accepted") && (
            <p className="text-xs text-[var(--kodi-ink-soft)]">
              {t("fields.submitDisabled")}
            </p>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
