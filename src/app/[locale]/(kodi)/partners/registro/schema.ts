import { z } from "zod";
import {
  LIMITS,
  HANDLE_RE,
  NAME_RE,
  WHATSAPP_RE,
  BUSINESS_CATEGORIES,
  GAM_CANTONS,
} from "./data";

const optionalUrl = z
  .string()
  .trim()
  .refine((v) => v === "" || z.string().url().safeParse(v).success, {
    message: "invalid_url",
  });

const optionalHandle = z
  .string()
  .trim()
  .transform((v) => v.replace(/^@/, ""))
  .refine((v) => v === "" || HANDLE_RE.test(v), { message: "invalid_handle" });

const categoryValues = BUSINESS_CATEGORIES.map((c) => c.value);

const businessSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "required" })
    .max(LIMITS.businessName, { message: "max" }),
  category: z.string().refine((v) => categoryValues.includes(v), {
    message: "invalid_category",
  }),
  canton: z.string().refine((v) => GAM_CANTONS.includes(v), {
    message: "invalid_canton",
  }),
  website: optionalUrl,
  instagram: optionalHandle,
  facebook: optionalUrl,
  tiktok: optionalHandle,
  description: z
    .string()
    .trim()
    .min(1, { message: "required" })
    .max(LIMITS.businessDescription, { message: "max" }),
  hasMultipleBranches: z.enum(["yes", "no"]),
});

const branchSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "required" })
    .max(LIMITS.branchName, { message: "max" }),
  canton: z.string().refine((v) => GAM_CANTONS.includes(v), {
    message: "invalid_canton",
  }),
  address: z
    .string()
    .trim()
    .max(200, { message: "max" })
    .optional()
    .default(""),
});

const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, { message: "required" })
    .regex(NAME_RE, { message: "name_letters_only" }),
  role: z
    .string()
    .trim()
    .min(1, { message: "required" })
    .max(80, { message: "max" }),
  email: z.string().trim().email({ message: "invalid_email" }),
  whatsapp: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, ""))
    .refine((v) => WHATSAPP_RE.test(v), { message: "invalid_whatsapp" }),
});

const couponSchema = z.object({
  formats: z
    .array(z.enum(["cupon", "video", "banner"]))
    .min(1, { message: "required" }),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.number({ invalid_type_error: "required" }),
  description: z
    .string()
    .trim()
    .max(LIMITS.couponDescription, { message: "max" }),
  quantity: z.number({ invalid_type_error: "required" }),
  branchesScope: z
    .array(z.string().max(LIMITS.branchName, { message: "max" }))
    .default([]),
  conditions: z
    .string()
    .trim()
    .max(LIMITS.couponConditions, { message: "max" })
    .optional()
    .default(""),
});

export const partnerSchema = z
  .object({
    business: businessSchema,
    branches: z.array(branchSchema).default([]),
    contact: contactSchema,
    coupon: couponSchema,
    confirmation: z.object({
      accepted: z.literal(true, {
        errorMap: () => ({ message: "must_accept" }),
      }),
    }),
    honeypot: z.string().default(""),
  })
  .superRefine((data, ctx) => {
    const multi = data.business.hasMultipleBranches === "yes";
    const wantsCoupon = data.coupon.formats.includes("cupon");

    if (multi) {
      if (data.branches.length < LIMITS.branchesMin) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["branches"], message: "branches_min" });
      }
      if (data.branches.length > LIMITS.branchesMax) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["branches"], message: "branches_max" });
      }
    }

    // El cupón y todo su detalle solo se exige si el partner eligió el
    // formato "cupon".
    if (!wantsCoupon) return;

    const { discountType, discountValue, description, quantity } = data.coupon;

    if (!Number.isFinite(discountValue)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["coupon", "discountValue"], message: "required" });
    } else if (discountType === "percentage") {
      if (discountValue < LIMITS.percentMin || discountValue > LIMITS.percentMax) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["coupon", "discountValue"], message: "percent_range" });
      }
    } else if (discountValue < LIMITS.fixedMin || !Number.isInteger(discountValue)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["coupon", "discountValue"], message: "fixed_min" });
    }

    if (description.trim().length === 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["coupon", "description"], message: "required" });
    }

    if (!Number.isInteger(quantity) || quantity < LIMITS.couponQtyMin || quantity > LIMITS.couponQtyMax) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["coupon", "quantity"], message: "quantity_range" });
    }

    if (multi && data.coupon.branchesScope.length === 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["coupon", "branchesScope"], message: "scope_required" });
    }
  });

export type PartnerFormValues = z.infer<typeof partnerSchema>;
