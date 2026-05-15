import { z } from "zod";
import {
  LIMITS,
  HANDLE_RE,
  NAME_RE,
  WHATSAPP_RE,
  MIN_DEADLINE_DAYS,
  MAX_DEADLINE_DAYS,
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
  name: z.string().trim().min(1).max(LIMITS.businessName),
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
  description: z.string().trim().min(1).max(LIMITS.businessDescription),
  hasMultipleBranches: z.enum(["yes", "no"]),
});

const branchSchema = z.object({
  name: z.string().trim().min(1).max(LIMITS.branchName),
  canton: z.string().refine((v) => GAM_CANTONS.includes(v), {
    message: "invalid_canton",
  }),
  address: z.string().trim().max(200).optional().default(""),
});

const contactSchema = z.object({
  fullName: z.string().trim().min(1).regex(NAME_RE, { message: "name_letters_only" }),
  role: z.string().trim().min(1).max(80),
  email: z.string().trim().email(),
  whatsapp: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, ""))
    .refine((v) => WHATSAPP_RE.test(v), { message: "invalid_whatsapp" }),
});

const couponSchema = z.object({
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z
    .number({ invalid_type_error: "required" })
    .refine(Number.isFinite, { message: "required" }),
  description: z.string().trim().min(1).max(LIMITS.couponDescription),
  quantity: z
    .number({ invalid_type_error: "required" })
    .int()
    .min(LIMITS.couponQtyMin)
    .max(LIMITS.couponQtyMax),
  deadline: z.string().refine((v) => /^\d{4}-\d{2}-\d{2}$/.test(v), {
    message: "required",
  }),
  branchesScope: z.array(z.string()).default([]),
  conditions: z.string().trim().max(LIMITS.couponConditions).optional().default(""),
});

function deadlineWindow(): { min: Date; max: Date } {
  const min = new Date();
  min.setUTCHours(0, 0, 0, 0);
  min.setUTCDate(min.getUTCDate() + MIN_DEADLINE_DAYS);
  const max = new Date();
  max.setUTCHours(0, 0, 0, 0);
  max.setUTCDate(max.getUTCDate() + MAX_DEADLINE_DAYS);
  return { min, max };
}

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
    honeypot: z.string().max(0, { message: "spam" }).default(""),
  })
  .superRefine((data, ctx) => {
    const multi = data.business.hasMultipleBranches === "yes";

    if (multi) {
      if (data.branches.length < LIMITS.branchesMin) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["branches"], message: "branches_min" });
      }
      if (data.branches.length > LIMITS.branchesMax) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["branches"], message: "branches_max" });
      }
      if (data.coupon.branchesScope.length === 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["coupon", "branchesScope"], message: "scope_required" });
      }
    }

    const { discountType, discountValue } = data.coupon;
    if (discountType === "percentage") {
      if (discountValue < LIMITS.percentMin || discountValue > LIMITS.percentMax) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["coupon", "discountValue"], message: "percent_range" });
      }
    } else if (discountValue < LIMITS.fixedMin) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["coupon", "discountValue"], message: "fixed_min" });
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(data.coupon.deadline)) {
      const d = new Date(`${data.coupon.deadline}T00:00:00.000Z`);
      const { min, max } = deadlineWindow();
      if (d < min || d > max) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["coupon", "deadline"], message: "deadline_window" });
      }
    }
  });

export type PartnerFormValues = z.infer<typeof partnerSchema>;
