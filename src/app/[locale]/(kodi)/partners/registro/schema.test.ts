import { describe, it, expect } from "vitest";
import { partnerSchema } from "./schema";

function isoInDays(days: number): string {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

const base = {
  business: {
    name: "Soda La Esquina",
    category: "Restaurante",
    canton: "San José",
    website: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    description: "Comida casera tica.",
    hasMultipleBranches: "no" as const,
  },
  branches: [],
  contact: {
    fullName: "Ana Jiménez",
    role: "Dueña",
    email: "ana@example.com",
    whatsapp: "88887777",
  },
  coupon: {
    discountType: "percentage" as const,
    discountValue: 20,
    description: "20% en cualquier plato",
    quantity: 50,
    deadline: isoInDays(30),
    branchesScope: [],
    conditions: "",
  },
  confirmation: { accepted: true },
  honeypot: "",
};

describe("partnerSchema", () => {
  it("acepta un registro válido sin sucursales", () => {
    expect(partnerSchema.safeParse(base).success).toBe(true);
  });
  it("rechaza nombre comercial > 60", () => {
    const v = { ...base, business: { ...base.business, name: "x".repeat(61) } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });
  it("rechaza WhatsApp que no son 8 dígitos", () => {
    const v = { ...base, contact: { ...base.contact, whatsapp: "1234" } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });
  it("rechaza nombre completo con números", () => {
    const v = { ...base, contact: { ...base.contact, fullName: "Ana 99" } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });
  it("acepta nombre con tildes y ñ", () => {
    const v = { ...base, contact: { ...base.contact, fullName: "Íñigo Núñez" } };
    expect(partnerSchema.safeParse(v).success).toBe(true);
  });
  it("rechaza porcentaje fuera de 5-100", () => {
    const v = { ...base, coupon: { ...base.coupon, discountType: "percentage", discountValue: 4 } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });
  it("rechaza monto fijo < 500", () => {
    const v = { ...base, coupon: { ...base.coupon, discountType: "fixed", discountValue: 499 } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });
  it("acepta monto fijo >= 500", () => {
    const v = { ...base, coupon: { ...base.coupon, discountType: "fixed", discountValue: 500 } };
    expect(partnerSchema.safeParse(v).success).toBe(true);
  });
  it("rechaza fecha límite a menos de 15 días", () => {
    const v = { ...base, coupon: { ...base.coupon, deadline: isoInDays(10) } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });
  it("rechaza fecha límite a más de 90 días", () => {
    const v = { ...base, coupon: { ...base.coupon, deadline: isoInDays(120) } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });
  it("acepta fecha límite exactamente en 15 días", () => {
    const v = { ...base, coupon: { ...base.coupon, deadline: isoInDays(15) } };
    expect(partnerSchema.safeParse(v).success).toBe(true);
  });
  it("acepta fecha límite exactamente en 90 días", () => {
    const v = { ...base, coupon: { ...base.coupon, deadline: isoInDays(90) } };
    expect(partnerSchema.safeParse(v).success).toBe(true);
  });
  it("rechaza cantidad de cupones fuera de 5-500", () => {
    const v = { ...base, coupon: { ...base.coupon, quantity: 4 } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });
  it("exige >=2 sucursales cuando hasMultipleBranches=yes", () => {
    const v = {
      ...base,
      business: { ...base.business, hasMultipleBranches: "yes" },
      branches: [{ name: "Local 1", canton: "San José", address: "" }],
    };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });
  it("exige branchesScope cuando hay sucursales", () => {
    const v = {
      ...base,
      business: { ...base.business, hasMultipleBranches: "yes" },
      branches: [
        { name: "Local 1", canton: "San José", address: "" },
        { name: "Local 2", canton: "Heredia", address: "" },
      ],
      coupon: { ...base.coupon, branchesScope: [] },
    };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });
  it("acepta yes con 2 sucursales y branchesScope no vacío", () => {
    const v = {
      ...base,
      business: { ...base.business, hasMultipleBranches: "yes" },
      branches: [
        { name: "Local 1", canton: "San José", address: "" },
        { name: "Local 2", canton: "Heredia", address: "Centro" },
      ],
      coupon: { ...base.coupon, branchesScope: ["Local 1"] },
    };
    expect(partnerSchema.safeParse(v).success).toBe(true);
  });
  it("rechaza si confirmation.accepted es false", () => {
    const v = { ...base, confirmation: { accepted: false } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });
  it("el schema acepta honeypot lleno (lo filtra el server action, no el schema)", () => {
    const v = { ...base, honeypot: "bot" };
    expect(partnerSchema.safeParse(v).success).toBe(true);
  });
  it("rechaza website con formato inválido", () => {
    const v = { ...base, business: { ...base.business, website: "no-es-url" } };
    expect(partnerSchema.safeParse(v).success).toBe(false);
  });
});
